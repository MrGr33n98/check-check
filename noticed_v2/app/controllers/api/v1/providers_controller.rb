class Api::V1::ProvidersController < Api::V1::BaseController
  # GET /api/v1/providers
  def index
    @providers = Provider.active.includes(:categories)
    
    # Filter by category
    if params[:category_id].present?
      @providers = @providers.joins(:categories).where(categories: { id: params[:category_id] })
    elsif params[:category_slug].present?
      @providers = @providers.joins(:categories).where(categories: { slug: params[:category_slug] })
    end
    
    # Filter by rating (minimum rating)
    if params[:min_rating].present?
      # This would require a calculated field or separate rating table
      # For now, we'll skip this filter
    end
    
    # Sort options
    case params[:sort_by]
    when 'rating'
      # Would need to implement rating calculation
      @providers = @providers.order(:name)
    when 'capacity'
      # Extract capacity from tags for sorting
      @providers = @providers.order(:name)
    when 'reviews'
      # Would need to implement review count
      @providers = @providers.order(:name)
    else
      @providers = @providers.order(:name)
    end
    
    # Limit results
    @providers = @providers.limit(params[:limit] || 50)
    
    render json: @providers.map { |provider| provider_json(provider) }
  end
  
  # GET /api/v1/providers/:id
  def show
    @provider = Provider.find_by!(slug: params[:id]) || Provider.find(params[:id])
    render json: provider_json(@provider)
  end

  def create
    # Existing params processing
    provider_params_with_tags = provider_params.except(
      :cnpj, :employee_count, :city, :state, :zip_code, :email, :website,
      :experience_years, :projects_completed, :installed_capacity_mw,
      :business_type, :service_areas, :services_offered, :specialties, :certifications,
      :social_media, :auto_verified
    )

    @provider = Provider.new(provider_params_with_tags)
    
    # Check for auto-verification based on corporate email
    is_auto_verified = provider_params[:auto_verified] == 'true'
    @provider.status = is_auto_verified ? 'active' : 'pending'

    # Map additional fields to tags
    @provider.tags ||= []
    @provider.tags << "cnpj:#{provider_params[:cnpj]}" if provider_params[:cnpj].present?
    @provider.tags << "employees:#{provider_params[:employee_count]}" if provider_params[:employee_count].present?
    @provider.tags << "location:#{provider_params[:city]},#{provider_params[:state]},#{provider_params[:zip_code]}" if provider_params[:city].present? || provider_params[:state].present? || provider_params[:zip_code].present?
    @provider.tags << "email:#{provider_params[:email]}" if provider_params[:email].present?
    @provider.tags << "website:#{provider_params[:website]}" if provider_params[:website].present?
    @provider.tags << "experience:#{provider_params[:experience_years]}" if provider_params[:experience_years].present?
    @provider.tags << "projects:#{provider_params[:projects_completed]}" if provider_params[:projects_completed].present?
    @provider.tags << "capacity:#{provider_params[:installed_capacity_mw]}MW" if provider_params[:installed_capacity_mw].present?

    # Add array fields to tags
    @provider.tags.concat(provider_params[:business_type]) if provider_params[:business_type].present?
    @provider.tags.concat(provider_params[:service_areas]) if provider_params[:service_areas].present?
    @provider.tags.concat(provider_params[:services_offered]) if provider_params[:services_offered].present?
    @provider.tags.concat(provider_params[:specialties]) if provider_params[:specialties].present?
    @provider.tags.concat(provider_params[:certifications]) if provider_params[:certifications].present?

    # Map social media links
    @provider.social_links ||= []
    if provider_params[:social_media].present?
      provider_params[:social_media].each do |platform, url|
        @provider.social_links << "#{platform}:#{url}" if url.present?
      end
    end

    # Handle file attachments
    @provider.logo.attach(params[:logo]) if params[:logo].present?
    @provider.cover_image.attach(params[:coverImage]) if params[:coverImage].present?
    
    if params[:documents].present? && params[:documents].is_a?(Array)
      params[:documents].each { |doc| @provider.documents.attach(doc) }
    end
    if params[:licenses].present? && params[:licenses].is_a?(Array)
      params[:licenses].each { |license| @provider.licenses.attach(license) }
    end
    if params[:portfolioImages].present? && params[:portfolioImages].is_a?(Array)
      params[:portfolioImages].each { |image| @provider.portfolio_images.attach(image) }
    end

    # Handle user creation if user params are provided
    if params[:user].present?
      user_params = params.require(:user).permit(:name, :email, :password, :password_confirmation)
      @user = User.new(user_params)
      @user.role = 'empresa'  # or appropriate role
      if @user.save
        CompanyMember.create!(provider: @provider, user: @user, role: 'owner')  # Assuming role 'owner'
      else
        render json: { errors: @user.errors }, status: :unprocessable_entity
        return
      end
    end

    if @provider.save
      # Send notification emails
      if is_auto_verified
        # Send approval email for auto-verified companies
        ProviderMailer.company_approved(@provider).deliver_later
      end
      
      # Notify admin about new company registration
      ProviderMailer.new_company_registered(@provider).deliver_later
      
      # Auto-login if user was created
      if @user
        sign_in @user
        render json: { provider: @provider, user: @user, token: current_user.authentication_token }, status: :created
      else
        render json: @provider, status: :created
      end
    else
      render json: { errors: @provider.errors }, status: :unprocessable_entity
    end
  end

  private

  def provider_json(provider)
    {
      id: provider.id,
      name: provider.name,
      slug: provider.slug,
      short_description: provider.short_description,
      description: provider.description,
      country: provider.country,
      address: provider.address,
      phone: provider.phone,
      foundation_year: provider.foundation_year,
      members_count: provider.members_count,
      status: provider.status,
      premium: provider.premium?,
      tags: provider.tags,
      social_links: provider.social_links,
      categories: provider.categories.map { |cat| { id: cat.id, name: cat.name, slug: cat.slug } },
      logo_url: provider.logo.attached? ? url_for(provider.logo) : nil,
      cover_image_url: provider.cover_image.attached? ? url_for(provider.cover_image) : nil,
      banner_image_url: provider.banner_image.attached? ? url_for(provider.banner_image) : nil,
      rating: provider.overall_average_rating,
      review_count: provider.overall_reviews_count,
      installed_capacity_mw: extract_capacity_from_tags(provider.tags),
      location: extract_location_from_tags(provider.tags),
      specialties: extract_specialties_from_tags(provider.tags)
    }
  end

  def extract_capacity_from_tags(tags)
    capacity_tag = tags.find { |tag| tag.start_with?('capacity:') }
    return 0 unless capacity_tag
    capacity_tag.gsub('capacity:', '').gsub('MW', '').to_f
  end

  def extract_location_from_tags(tags)
    location_tag = tags.find { |tag| tag.start_with?('location:') }
    return '' unless location_tag
    location_tag.gsub('location:', '')
  end

  def extract_specialties_from_tags(tags)
    # Filter out system tags and return relevant specialties
    system_prefixes = ['cnpj:', 'employees:', 'location:', 'email:', 'website:', 'experience:', 'projects:', 'capacity:']
    tags.reject { |tag| system_prefixes.any? { |prefix| tag.start_with?(prefix) } }
  end

  def provider_params
    params.require(:provider).permit(
      :name, :foundation_year, :short_description, :address, :phone, :country,
      :cnpj, :employee_count, :city, :state, :zip_code, :email, :website,
      :experience_years, :projects_completed, :installed_capacity_mw, :auto_verified,
      business_type: [], service_areas: [], services_offered: [], specialties: [], certifications: [],
      social_media: [:facebook, :instagram, :linkedin]
    )
  end
end

def current
  if current_user && current_user.provider
    provider = current_user.provider
    if provider.status == 'active'
      render json: provider
    else
      render json: { error: 'Company not approved' }, status: :forbidden
    end
  else
    render json: { error: 'No company associated' }, status: :not_found
  end
end
