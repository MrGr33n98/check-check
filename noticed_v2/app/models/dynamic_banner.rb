class DynamicBanner < ApplicationRecord
  has_one_attached :image

  validates :title, presence: true, length: { maximum: 255 }
  validates :description, presence: true, length: { maximum: 500 }
  validates :link_url, presence: true, format: { with: URI::DEFAULT_PARSER.make_regexp(%w[http https]), message: "deve ser uma URL válida" }
  validates :display_order, presence: true, numericality: { greater_than: 0 }
  validates :image, presence: true

  scope :active, -> { where(active: true) }
  scope :ordered, -> { order(:display_order) }
  scope :active_ordered, -> { active.ordered }

  before_validation :set_default_order, on: :create

  def image_url
    return nil unless image.attached?
    Rails.application.routes.url_helpers.rails_blob_url(image, only_path: false)
  end

  def to_json_api
    {
      id: id,
      title: title,
      description: description,
      link_url: link_url,
      display_order: display_order,
      active: active,
      image_url: image_url,
      created_at: created_at,
      updated_at: updated_at
    }
  end

  def self.active_banners_for_api
    active_ordered.map(&:to_json_api)
  end

  private

  def set_default_order
    return if display_order.present?
    
    max_order = self.class.maximum(:display_order) || 0
    self.display_order = max_order + 1
  end
end