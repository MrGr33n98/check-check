class Banner < ApplicationRecord
  # Enums
  enum status: { draft: 0, active: 1, paused: 2, expired: 3 }
  enum banner_type: { 
    header: 0, 
    sidebar: 1, 
    footer: 2, 
    hero: 3, 
    category_top: 4, 
    category_bottom: 5,
    solution_top: 6,
    solution_bottom: 7,
    mobile_sticky: 8,
    popup: 9,
    newsletter: 10
  }
  enum device_target: { all_devices: 0, desktop_only: 1, mobile_only: 2, tablet_only: 3 }

  # Associations
  has_one_attached :desktop_image
  has_one_attached :mobile_image
  has_one_attached :tablet_image
  has_and_belongs_to_many :categories
  belongs_to :provider, optional: true

  # Validations
  validates :title, presence: true
  validates :banner_type, presence: true
  validates :status, presence: true
  validates :priority, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :link_url, presence: true, format: { with: URI::DEFAULT_PARSER.make_regexp(%w[http https]), message: 'deve ser uma URL válida' }
  validates :starts_at, presence: true
  validate :end_date_after_start_date
  validate :at_least_one_image_attached

  # Scopes
  scope :active, -> { where(status: :active).where('starts_at <= ? AND (ends_at IS NULL OR ends_at >= ?)', Time.current, Time.current) }
  scope :by_type, ->(type) { where(banner_type: type) }
  scope :by_device, ->(device) { where(device_target: [device, :all_devices]) }
  scope :by_category, ->(category) { joins(:categories).where(categories: { id: category }) }
  scope :ordered, -> { order(priority: :asc, created_at: :desc) }
  scope :current, -> { where('starts_at <= ? AND (ends_at IS NULL OR ends_at >= ?)', Time.current, Time.current) }
  scope :by_position, ->(position) { where(banner_type: position) }

  # Ransack configuration for ActiveAdmin search
  def self.ransackable_associations(auth_object = nil)
    ["categories", "provider"]
  end

  def self.ransackable_attributes(auth_object = nil)
    ["banner_type", "created_at", "description", "device_target", "ends_at", "id", 
     "link_url", "priority", "provider_id", "starts_at", "status", "title", "updated_at",
     "click_count", "impression_count", "conversion_tracking_code"]
  end

  # Callbacks
  before_validation :set_defaults
  after_create :log_creation
  after_update :log_status_change

  # Methods
  def active?
    status == 'active' && current?
  end

  def current?
    starts_at <= Time.current && (ends_at.nil? || ends_at >= Time.current)
  end

  def expired?
    ends_at.present? && ends_at < Time.current
  end

  def days_remaining
    return nil unless ends_at
    return 0 if expired?
    (ends_at.to_date - Time.current.to_date).to_i
  end

  def click_through_rate
    return 0 if impression_count.zero?
    (click_count.to_f / impression_count * 100).round(2)
  end

  def increment_clicks!
    increment!(:click_count)
  end

  def increment_impressions!
    increment!(:impression_count)
  end

  def image_for_device(device = :desktop)
    case device.to_sym
    when :mobile
      mobile_image.attached? ? mobile_image : desktop_image
    when :tablet
      tablet_image.attached? ? tablet_image : desktop_image
    else
      desktop_image
    end
  end

  def display_schedule
    if ends_at.present?
      "#{starts_at.strftime('%d/%m/%Y %H:%M')} - #{ends_at.strftime('%d/%m/%Y %H:%M')}"
    else
      "A partir de #{starts_at.strftime('%d/%m/%Y %H:%M')}"
    end
  end

  def as_json(options = {})
    super({
      only: [:id, :title, :description, :link_url, :banner_type, :status, :device_target,
             :priority, :starts_at, :ends_at, :show_close_button, :display_frequency,
             :custom_css, :custom_html, :conversion_tracking_code],
      methods: [:image_url, :background_color, :text_color, :position]
    }.merge(options))
  end

  def image_url
    # Prioriza desktop_image, mas pode ser ajustado para mobile/tablet se necessário
    if desktop_image.attached?
      Rails.application.routes.url_helpers.rails_blob_url(desktop_image, only_path: false)
    elsif mobile_image.attached?
      Rails.application.routes.url_helpers.rails_blob_url(mobile_image, only_path: false)
    elsif tablet_image.attached?
      Rails.application.routes.url_helpers.rails_blob_url(tablet_image, only_path: false)
    else
      nil
    end
  rescue
    nil
  end

  def background_color
    # Implemente a lógica para obter a cor de fundo do banner
    # Exemplo: pode ser um atributo no banco de dados ou um valor padrão
    "#f3f3f3" # Cor padrão, ajuste conforme necessário
  end

  def text_color
    # Implemente a lógica para obter a cor do texto do banner
    # Exemplo: pode ser um atributo no banco de dados ou um valor padrão
    "#333333" # Cor padrão, ajuste conforme necessário
  end

  def position
    banner_type # Mapeia banner_type para position para compatibilidade com o frontend
  end

  private

  def set_defaults
    self.starts_at ||= Time.current
    self.status ||= :draft
    self.priority ||= 0
    self.click_count ||= 0
    self.impression_count ||= 0
    self.device_target ||= :all_devices
  end

  def end_date_after_start_date
    return unless starts_at && ends_at
    errors.add(:ends_at, 'deve ser posterior à data de início') if ends_at < starts_at
  end

  def at_least_one_image_attached
    unless desktop_image.attached? || mobile_image.attached? || tablet_image.attached?
      errors.add(:base, 'Pelo menos uma imagem deve ser anexada (desktop, mobile ou tablet)')
    end
  end

  def log_creation
    Rails.logger.info "Banner criado: #{title} (ID: #{id})"
  end

  def log_status_change
    if saved_change_to_status?
      Rails.logger.info "Status do banner #{title} (ID: #{id}) alterado para: #{status}"
    end
  end
end