class PromotionalBanner < ApplicationRecord
  # Associações
  belongs_to :provider, optional: true # Empresa vinculada (assumindo que existe model Provider)
  has_one_attached :icon # Upload opcional de ícone/imagem

  # Validações
  validates :title, presence: true, length: { maximum: 200 }
  validates :background_color, presence: true
  validates :text_color, presence: true
  validates :link_url, presence: true, format: { with: URI::DEFAULT_PARSER.make_regexp(%w[http https]), message: "deve ser uma URL válida" }
  validates :display_order, presence: true, numericality: { greater_than: 0 }
  validates :utm_source, length: { maximum: 100 }, allow_blank: true
  validates :utm_medium, length: { maximum: 100 }, allow_blank: true
  validates :utm_campaign, length: { maximum: 100 }, allow_blank: true
  validates :utm_content, length: { maximum: 100 }, allow_blank: true
  validates :utm_term, length: { maximum: 100 }, allow_blank: true

  # Scopes
  scope :active, -> { where(active: true) }
  scope :ordered, -> { order(:display_order, :created_at) }
  scope :for_homepage, -> { where(position: 'homepage') }
  scope :by_position, ->(position) { where(position: position) }

  # Enums
  enum position: {
    homepage: 'homepage',
    category_page: 'category_page',
    search_results: 'search_results',
    company_profile: 'company_profile'
  }

  # Callbacks
  before_validation :set_default_colors, on: :create
  before_validation :normalize_colors
  before_save :build_utm_url

  # Métodos de classe
  def self.current_banners(position = 'homepage')
    active.for_homepage.ordered.limit(5)
  end

  def self.next_display_order
    (maximum(:display_order) || 0) + 1
  end

  # Métodos de instância
  def company_name
    provider&.name || 'Sem empresa vinculada'
  end

  def final_url
    return link_url if utm_params.blank?
    
    separator = link_url.include?('?') ? '&' : '?'
    "#{link_url}#{separator}#{utm_params}"
  end

  def utm_params
    params = []
    params << "utm_source=#{utm_source}" if utm_source.present?
    params << "utm_medium=#{utm_medium}" if utm_medium.present?
    params << "utm_campaign=#{utm_campaign}" if utm_campaign.present?
    params << "utm_content=#{utm_content}" if utm_content.present?
    params << "utm_term=#{utm_term}" if utm_term.present?
    params.join('&')
  end

  def external_link?
    !link_url.start_with?('/')
  end

  def icon_url
    return nil unless icon.attached?
    Rails.application.routes.url_helpers.rails_blob_url(icon, only_path: false)
  end

  def api_data
    {
      id: id,
      title: title,
      background_color: background_color,
      text_color: text_color,
      link_url: final_url,
      display_order: display_order,
      active: active,
      position: position,
      company_name: company_name,
      icon_url: icon_url,
      external_link: external_link?,
      utm_tracking: utm_params.present?
    }
  end

  private

  def set_default_colors
    self.background_color ||= '#f97316' # Orange padrão
    self.text_color ||= '#ffffff' # Branco padrão
    self.display_order ||= self.class.next_display_order
    self.position ||= 'homepage'
  end

  def normalize_colors
    # Garantir que as cores estejam no formato hex
    self.background_color = normalize_color(background_color)
    self.text_color = normalize_color(text_color)
  end

  def normalize_color(color)
    return color if color.blank?
    
    # Se for uma classe Tailwind, converter para hex
    tailwind_colors = {
      'bg-orange-500' => '#f97316',
      'bg-blue-500' => '#3b82f6',
      'bg-green-500' => '#10b981',
      'bg-red-500' => '#ef4444',
      'bg-purple-500' => '#8b5cf6',
      'bg-yellow-500' => '#eab308',
      'text-white' => '#ffffff',
      'text-black' => '#000000',
      'text-gray-800' => '#1f2937'
    }
    
    return tailwind_colors[color] if tailwind_colors.key?(color)
    
    # Se já for hex, manter
    return color if color.match?(/^#[0-9a-fA-F]{6}$/)
    
    # Adicionar # se não tiver
    color.start_with?('#') ? color : "##{color}"
  end

  def build_utm_url
    # Método chamado antes de salvar para validar UTM params
    return unless external_link? && utm_params.present?
    
    # Log para debug (opcional)
    Rails.logger.info "Banner #{id}: URL final com UTM: #{final_url}"
  end
end