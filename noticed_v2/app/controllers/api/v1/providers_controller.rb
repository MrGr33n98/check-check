class Api::V1::ProvidersController < Api::V1::BaseController
  # GET /api/v1/providers
  def index
    Rails.logger.info('API::V1::ProvidersController#index called')
    @providers = Provider.active.includes(:categories, :solutions => :reviews)
                         .with_attached_logo
                         .with_attached_cover_image
                         .with_attached_banner_image
    
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

  # GET /api/v1/providers/search
  def search
    Rails.logger.info('API::V1::ProvidersController#search called')
    @providers = Provider.active.includes(:categories, :solutions => :reviews)
                         .with_attached_logo
                         .with_attached_cover_image
                         .with_attached_banner_image

    # Search by location (city, state, or address)
    if params[:location].present?
      location_query = params[:location].downcase
      @providers = @providers.where(
        "LOWER(address) LIKE ? OR LOWER(country) LIKE ? OR EXISTS (
          SELECT 1 FROM unnest(tags) AS tag
          WHERE LOWER(tag) LIKE ?
        )",
        "%#{location_query}%",
        "%#{location_query}%",
        "%#{location_query}%"
      )
    end

    # Search by company name or description
    if params[:query].present?
      search_query = params[:query].downcase
      @providers = @providers.where(
        "LOWER(name) LIKE ? OR LOWER(short_description) LIKE ? OR LOWER(title) LIKE ?",
        "%#{search_query}%",
        "%#{search_query}%",
        "%#{search_query}%"
      )
    end

    # Filter by services/specialties
    if params[:services].present?
      services = params[:services].split(',').map(&:strip).map(&:downcase)
      @providers = @providers.where("tags && ARRAY[?]::varchar[]", services)
    end

    # Filter by minimum rating
    if params[:rating].present? && params[:rating].to_f > 0
      min_rating = params[:rating].to_f
      # Assuming overall_average_rating is a method or column on Provider
      @providers = @providers.where("overall_average_rating >= ?", min_rating)
    end

    # Filter by experience (foundation_year)
    if params[:experience].present?
      experience_ranges = params[:experience].split(',').map(&:strip)
      current_year = Date.current.year
      experience_conditions = []

      experience_ranges.each do |range|
        case range
        when '0-2-anos'
          experience_conditions << "foundation_year >= #{current_year - 2}"
        when '2-5-anos'
          experience_conditions << "(foundation_year >= #{current_year - 5} AND foundation_year < #{current_year - 2})"
        when '5-10-anos'
          experience_conditions << "(foundation_year >= #{current_year - 10} AND foundation_year < #{current_year - 5})"
        when '10-anos'
          experience_conditions << "foundation_year < #{current_year - 10}"
        end
      end
      @providers = @providers.where(experience_conditions.join(' OR ')) if experience_conditions.any?
    end

    # Filter by certifications
    if params[:certifications].present?
      certifications = params[:certifications].split(',').map(&:strip).map(&:downcase)
      @providers = @providers.where("tags && ARRAY[?]::varchar[]", certifications)
    end

    # Sort results
    case params[:sort_by]
    when 'rating'
      @providers = @providers.order(overall_average_rating: :desc)
    when 'size'
      @providers = @providers.order(members_count: :desc)
    when 'capacity'
      @providers = @providers.order(members_count: :desc) # Use members as proxy for capacity
    else
      @providers = @providers.order(:name)
    end

    # Pagination
    page = params[:page]&.to_i || 1
    per_page = params[:per_page]&.to_i || 20
    offset = (page - 1) * per_page

    total_count = @providers.count
    @providers = @providers.offset(offset).limit(per_page)

    # Add mock ratings and additional data for frontend
    results = @providers.map do |provider|
      provider_data = provider_json(provider)

      # Add mock rating based on company characteristics
      rating = calculate_mock_rating(provider)
      review_count = calculate_mock_review_count(provider)

      provider_data.merge({
        rating: rating,
        review_count: review_count,
        price: calculate_mock_price(provider),
        experience: "#{Date.current.year - provider.foundation_year} anos",
        services: extract_services_from_tags(provider.tags),
        certifications: extract_certifications_from_tags(provider.tags)
      })
    end

    render json: {
      results: results,
      pagination: {
        current_page: page,
        per_page: per_page,
        total_pages: (total_count.to_f / per_page).ceil,
        total_count: total_count
      }
    }
  end
  
  # GET /api/v1/providers/:id
  def show
    @provider = Provider.find_by(slug: params[:id]) # Try finding by slug first
    @provider ||= Provider.find_by(id: params[:id]) # If not found by slug, try finding by ID

    if @provider
      render json: provider_json(@provider)
    else
      render json: { error: "Provider not found" }, status: :not_found
    end
  end

  # GET /api/v1/providers/by_slug/:slug
  def by_slug
    @provider = Provider.find_by(slug: params[:slug])

    if @provider
      render json: provider_json(@provider)
    else
      render json: { error: "Provider not found" }, status: :not_found
    end
  end

  def create
    # Existing params processing
    provider_params_with_tags = provider_params.except(
      :employee_count, :city, :state, :zip_code, :email, :website,
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
      description: provider.short_description,
      country: provider.country,
      address: provider.address,
      phone: provider.phone,
      foundation_year: provider.foundation_year,
      members_count: provider.members_count,
      status: provider.status,
      premium: provider.premium?,
      premium_effect_active: provider.premium_effect_active,
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
    system_prefixes = ['employees:', 'location:', 'email:', 'website:', 'experience:', 'projects:', 'capacity:']
    tags.reject { |tag| system_prefixes.any? { |prefix| tag.start_with?(prefix) } }
  end

  def extract_services_from_tags(tags)
    service_keywords = ['residencial', 'comercial', 'industrial', 'rural', 'sustentabilidade', 'energia solar', 'fotovoltaica']
    tags.select { |tag| service_keywords.any? { |keyword| tag.downcase.include?(keyword) } }
  end

  def extract_certifications_from_tags(tags)
    cert_keywords = ['inmetro', 'aneel', 'iso', 'certificação', 'cresesb']
    tags.select { |tag| cert_keywords.any? { |keyword| tag.downcase.include?(keyword) } }
  end

  def calculate_mock_rating(provider)
    # Calculate rating based on company characteristics
    base_rating = 3.5
    
    # Bonus for older companies (more experience)
    age_bonus = [(Date.current.year - provider.foundation_year) * 0.05, 1.0].min
    
    # Bonus for larger companies
    size_bonus = [provider.members_count / 500.0, 0.5].min
    
    # Bonus for more tags (more services/specialties)
    service_bonus = [provider.tags.length * 0.02, 0.3].min
    
    rating = base_rating + age_bonus + size_bonus + service_bonus
    [rating, 5.0].min.round(1)
  end

  def calculate_mock_review_count(provider)
    # Calculate review count based on company size and age
    base_reviews = 10
    age_factor = Date.current.year - provider.foundation_year
    size_factor = provider.members_count / 10
    
    (base_reviews + age_factor * 3 + size_factor).to_i
  end

  def calculate_mock_price(provider)
    # Calculate starting price based on company characteristics
    base_price = 15000
    
    # Larger companies might charge more
    size_multiplier = 1 + (provider.members_count / 1000.0)
    
    # Older companies might charge premium
    experience_multiplier = 1 + [(Date.current.year - provider.foundation_year) * 0.02, 0.3].min
    
    (base_price * size_multiplier * experience_multiplier).to_i
  end

  def provider_params
    params.require(:provider).permit(
      :name, :foundation_year, :short_description, :address, :phone, :country,
      :employee_count, :city, :state, :zip_code, :email, :website,
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
