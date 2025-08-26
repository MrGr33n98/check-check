class Api::V1::ProvidersController < Api::V1::BaseController
  def create
    provider_params_with_tags = provider_params.except(
      :cnpj, :employee_count, :city, :state, :zip_code, :email, :website,
      :experience_years, :projects_completed, :installed_capacity_mw,
      :business_type, :service_areas, :services_offered, :specialties, :certifications,
      :social_media
    )

    @provider = Provider.new(provider_params_with_tags)

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

    if @provider.save
      render json: @provider, status: :created
    else
      render json: { errors: @provider.errors }, status: :unprocessable_entity
    end
  end

  private

  def provider_params
    params.require(:provider).permit(
      :name,
      :foundation_year,
      :short_description, # maps to description from frontend
      :address,
      :phone,
      :country, # Add this line
      # Fields to be mapped to tags or social_links
      :cnpj,
      :employee_count,
      :city,
      :state,
      :zip_code,
      :email,
      :website,
      :experience_years,
      :projects_completed,
      :installed_capacity_mw,
      business_type: [],
      service_areas: [],
      services_offered: [],
      specialties: [],
      certifications: [],
      social_media: [:facebook, :instagram, :linkedin] # Permit social media as a hash
    )
  end
end
