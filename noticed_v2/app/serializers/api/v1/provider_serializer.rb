class Api::V1::ProviderSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :slug, :short_description, :description,
             :country, :address, :phone, :foundation_year, :members_count,
             :status, :premium, :premium_effect_active, :tags, :social_links,
             :logo_url, :cover_image_url, :banner_image_url,
             :rating, :review_count, :installed_capacity_mw,
             :location, :specialties

  has_many :categories, serializer: Api::V1::CategorySerializer

  def premium
    object.premium?
  end

  def logo_url
    rails_blob_url(object.logo, only_path: false) if object.logo.attached?
  end

  def cover_image_url
    rails_blob_url(object.cover_image, only_path: false) if object.cover_image.attached?
  end

  def banner_image_url
    rails_blob_url(object.banner_image, only_path: false) if object.banner_image.attached?
  end

  def rating
    object.overall_average_rating
  end

  def review_count
    object.overall_reviews_count
  end

  def installed_capacity_mw
    capacity_tag = object.tags&.find { |tag| tag.start_with?("capacity:") }
    return 0 unless capacity_tag
    capacity_tag.gsub('capacity:', '').gsub('MW', '').to_f
  end

  def location
    location_tag = object.tags&.find { |tag| tag.start_with?("location:") }
    return "" unless location_tag
    location_tag.gsub('location:', '')
  end

  def specialties
    system_prefixes = ['employees:', 'location:', 'email:', 'website:', 'experience:', 'projects:', 'capacity:']
    (object.tags || []).reject { |tag| system_prefixes.any? { |prefix| tag.start_with?(prefix) } }
  end
end
