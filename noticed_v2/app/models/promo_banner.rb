class PromoBanner < ApplicationRecord
  # Attachments
  has_one_attached :background_image

  # Defaults
  attribute :show_title, :boolean, default: true
  attribute :show_subtitle, :boolean, default: true
  attribute :overlay_enabled, :boolean, default: true
  attribute :overlay_color, :string, default: "#000000"
  attribute :overlay_opacity, :integer, default: 35
  attribute :text_align, :string, default: "center"
  # NOTE: The text_color default is already handled by the existing validation and form.
  # We will ensure it defaults to #FFFFFF in the form and migration.

  # Validations
  validates :title, presence: true, length: { maximum: 60 }
  validates :subtitle, length: { maximum: 90 }
  validates :position, presence: true, inclusion: { in: %w[sidebar header footer] }
  validates :background_color, format: { with: /\A#[0-9A-Fa-f]{3,6}\z/, message: "deve ser uma cor hexadecimal válida (ex: #3B82F6)" }
  validates :text_color, format: { with: /\A#[0-9A-Fa-f]{3,6}\z/, message: "deve ser uma cor hexadecimal válida (ex: #FFFFFF)" }
  validates :priority, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :text_align, inclusion: { in: %w[left center right] }
  validates :overlay_opacity, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }
  validates :overlay_color, format: { with: /\A#[0-9A-Fa-f]{3,6}\z/i, message: "must be a valid hex color" }
  validate :validate_button_urls

  # Scopes
  scope :active, -> { where(active: true) }
  scope :by_position, ->(position) { where(position: position) }
  scope :ordered, -> { order(:priority, :created_at) }

  # Callbacks
  before_save :normalize_urls

  # Methods
  def background_image_url
    return nil unless background_image.attached?
    Rails.application.routes.url_helpers.rails_blob_url(background_image, host: 'http://localhost:3000')
  end

  def self.for_position(position)
    active.by_position(position).ordered.first
  end

  def self.sidebar_banner
    for_position('sidebar')
  end

  def self.header_banner
    for_position('header')
  end

  def self.footer_banner
    for_position('footer')
  end

  def position_label
    case position
    when 'sidebar' then 'Barra Lateral'
    when 'header' then 'Cabeçalho'
    when 'footer' then 'Rodapé'
    else position.humanize
    end
  end

  # Ransack configuration for ActiveAdmin search
  def self.ransackable_associations(auth_object = nil)
    ["background_image_attachment", "background_image_blob"]
  end

  def self.ransackable_attributes(auth_object = nil)
    ["active", "background_color", "button_secondary_text", "button_secondary_url",
     "button_text", "button_url", "created_at", "id", "position", "priority",
     "subtitle", "text_color", "title", "updated_at", "show_title", "show_subtitle",
     "overlay_enabled", "overlay_color", "overlay_opacity", "text_align"]
  end

  private

  def normalize_urls
    self.button_url = normalize_url(button_url) if button_url.present?
    self.button_secondary_url = normalize_url(button_secondary_url) if button_secondary_url.present?
  end

  def normalize_url(url)
    return url if url.blank? || url.match?(%r{\A(https?://|/|mailto:|tel:)})
    "https://#{url}"
  end

  def validate_button_urls
    validate_url_format(:button_url, self.button_url)
    validate_url_format(:button_secondary_url, self.button_secondary_url)
  end

  def validate_url_format(attribute, value)
    return if value.blank?
    # A simple check for common protocols or a relative path.
    # More robust validation can be added if needed.
    unless value.match?(%r{\A(https?://|/|mailto:|tel:).+})
      errors.add(attribute, "deve ser uma URL válida com http(s) ou um caminho relativo (ex: /contato)")
    end
  end
end
