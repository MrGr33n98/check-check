class Api::V1::CategorySerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :description, :slug, :featured, :photo_url

  def photo_url
    if object.photo.attached?
      rails_blob_url(object.photo, only_path: false)
    end
  end
end
