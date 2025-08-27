class CtaBanner < ApplicationRecord
  has_one_attached :background_image

  validates :title, presence: true
  validates :subtitle, presence: true
  validates :button1_text, presence: true
  validates :button1_url, presence: true
  validates :button2_text, presence: true
  validates :button2_url, presence: true
  validates :background_type, inclusion: { in: %w[solid image] }
  validates :background_color, presence: true, if: -> { background_type == 'solid' }
  validates :background_image, presence: true, if: -> { background_type == 'image' }

  scope :enabled, -> { where(enabled: true) }
  scope :active, -> { enabled.order(created_at: :desc) }

  def self.current
    active.first
  end

  def background_image_url
    return nil unless background_image.attached?
    Rails.application.routes.url_helpers.rails_blob_url(background_image, only_path: false)
  end

  def to_json_api
    {
      id: id,
      title: title,
      subtitle: subtitle,
      button1_text: button1_text,
      button1_url: button1_url,
      button2_text: button2_text,
      button2_url: button2_url,
      background_type: background_type,
      background_color: background_color,
      background_image_url: background_image_url,
      enabled: enabled,
      position: position
    }
  end
end