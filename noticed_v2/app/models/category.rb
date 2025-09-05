class Category < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  belongs_to :parent, class_name: 'Category', optional: true
  has_many :children, class_name: 'Category', foreign_key: 'parent_id'

  has_one_attached :photo
  has_one_attached :banner_image

  has_and_belongs_to_many :providers
  has_and_belongs_to_many :solutions
  has_and_belongs_to_many :sponsoreds

  validates :name, presence: true
  validates :promotional_text, length: { maximum: 160 }, allow_blank: true
  
  # Ransack configuration for ActiveAdmin search
  def self.ransackable_associations(auth_object = nil)
    ["solutions"]
  end

  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "id", "name", "slug", "updated_at"]
  end

  def as_json(options = {})
    super({
      methods: [:photo_url, :banner_image_url],
      only: [
        :id, :name, :slug, :description, :featured, :image_url, :banner_image_url,
        :title_color, :subtitle_color, :title_font_size, :subtitle_font_size
      ]
    }.merge(options))
  end

  def photo_url
    if photo.attached?
      Rails.application.routes.url_helpers.rails_blob_url(photo, only_path: false)
    else
      nil
    end
  end

  def banner_image_url
    if banner_image.attached?
      Rails.application.routes.url_helpers.rails_blob_url(banner_image, only_path: false)
    else
      nil
    end
  end
end
