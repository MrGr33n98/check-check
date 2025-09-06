class Api::V1::CategorySerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  cache key: -> { [object, I18n.locale] }, expires_in: 12.hours

  attributes :id, :name, :description, :slug, :featured, :photo_url, :banner_image_url

  has_many :children, serializer: Api::V1::CategorySerializer

  def photo_url
    if object.photo.attached?
      rails_blob_url(object.photo, only_path: false)
    end
  end

  def banner_image_url
    if object.banner_image.attached?
      rails_blob_url(object.banner_image, only_path: false)
    end
  end
end
