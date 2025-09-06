class Provider < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged

  # Enums
  enum status: {
    pending: 'pending',
    active: 'active',
    rejected: 'rejected',
    suspended: 'suspended'
  }

  # Associations
  has_many :reviews, dependent: :destroy
  has_many :campaigns, dependent: :destroy
  has_many :b2b_ads, dependent: :destroy
  has_many :company_members, dependent: :destroy
  has_many :users, through: :company_members
  # has_many :analytics, dependent: :destroy # Temporarily commented out to debug Ransack issue
  has_many :solutions, dependent: :destroy
  belongs_to :approved_by, class_name: 'AdminUser', optional: true

  has_many :provider_categories, dependent: :destroy
  has_many :categories, through: :provider_categories

  has_one_attached :logo
  has_one_attached :cover_image
  has_one_attached :banner_image
  has_many_attached :documents
  has_many_attached :licenses
  has_many_attached :portfolio_images

  has_many :provider_certifications, dependent: :destroy
  has_many :certifications, through: :provider_certifications

  # Validations
  validates :name, presence: true, uniqueness: true
  validates :seo_url, uniqueness: true, allow_blank: true
  validates :country, presence: true
  validates :foundation_year, presence: true,
            numericality: { greater_than: 1800, less_than_or_equal_to: Date.current.year }
  validates :members_count, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :status, presence: true, inclusion: { in: statuses.keys }
  validates :city, presence: true, length: { maximum: 120 }
  validates :state, presence: true, length: { is: 2 }, format: { with: /\A[A-Z]{2}\z/, message: "must be a 2-letter uppercase state code" }

  # Callbacks
  before_validation :normalize_city_and_state
  after_create :notify_admins_of_new_provider
  after_update :send_status_notification, if: :saved_change_to_status?

  # ---- SCOPES DE FILTRO ----
  scope :by_city,  ->(city)  { where(city: city) if city.present? }
  scope :by_state, ->(uf)    { where(state: uf) if uf.present? }

  # Categoria: inclui quem é visível em todas as categorias OU quem está linkado à categoria
  scope :in_categories, ->(ids) {
    return all if ids.blank?
    left_outer_joins(:provider_categories)
      .where("providers.visible_in_all_categories = TRUE OR provider_categories.category_id IN (?)", ids)
      .distinct
  }

  # Serviços/tags – supondo coluna `tags` ARRAY ou JSONB; ajuste conforme seu schema
  # ARRAY (postgres): `tags text[]` 
  scope :with_services, ->(slugs) {
    return all if slugs.blank?
    where("providers.tags && ARRAY[?]::varchar[]", Array(slugs))
  }

  # Nota mínima – se existir cache `average_rating`; senão, calcular via reviews
  scope :with_min_rating, ->(min) {
    return all if min.blank?
    if column_names.include?("average_rating")
      where("providers.average_rating >= ?", min.to_f)
    else
      left_outer_joins(:reviews)
        .group("providers.id")
        .having("COALESCE(AVG(reviews.rating), 0) >= ?", min.to_f)
    end
  }

  # Experiência (anos de mercado) a partir de foundation_year
  scope :with_experience, ->(range_key) {
    return all if range_key.blank?
    year = Date.current.year
    case range_key.to_s
    when "0-2"   then where("(? - foundation_year) BETWEEN 0 AND 2",  year)
    when "3-5"   then where("(? - foundation_year) BETWEEN 3 AND 5",  year)
    when "5-10"  then where("(? - foundation_year) BETWEEN 6 AND 10", year)
    when "10+"   then where("(? - foundation_year) >= 11",           year)
    else all
    end
  }

  # Certificações (se tiver associação)
  scope :with_certifications, ->(ids) {
    return all if ids.blank?
    left_outer_joins(:provider_certifications)
      .where(provider_certifications: { certification_id: Array(ids) })
      .group("providers.id")
      .having("COUNT(DISTINCT provider_certifications.certification_id) >= 1")
  }

  accepts_nested_attributes_for :provider_categories, allow_destroy: true

  # (Opcional) Ransack
  def self.ransackable_attributes(_auth_object = nil)
    super + %w[
      approved_by_id
      name country city state foundation_year members_count status
      created_at updated_at premium_until
      service_tags
    ]
  end

  def self.ransackable_associations(_auth_object = nil)
    super + %w[approved_by categories provider_categories]
  end

  # Add a ransacker for analytics_id that always returns false, effectively disabling it
  ransacker :analytics_id do |parent|
    Arel::Nodes::SqlLiteral.new("false")
  end

  

  # Methods
  def premium?
    premium_until.present? && premium_until >= Date.current
  end

  def to_param
    slug || id.to_s
  end

  def add_tag(tag)
    return if (tags || []).include?(tag)
    self.tags = (tags || []) + [tag]
    save
  end

  def remove_tag(tag)
    self.tags = (tags || []) - [tag]
    save
  end

  def social_links_hash
    return {} if social_links.blank?
    social_links.each_with_object({}) do |link, hash|
      case link
      when /facebook/
        hash[:facebook] = link
      when /twitter|x\.com/
        hash[:twitter] = link
      when /linkedin/
        hash[:linkedin] = link
      when /instagram/
        hash[:instagram] = link
      else
        hash[:website] = link
      end
    end
  end

  def social_links_list
    (social_links || []).join(', ')
  end

  def social_links_list=(value)
    self.social_links = value.to_s.split(',').map(&:strip).reject(&:blank?)
  end

  def tags_list
    (tags || []).join(', ')
  end

  def tags_list=(value)
    # If value is an array (from checkboxes), use it directly.
    # Otherwise, treat as a comma-separated string.
    self.tags = Array(value).reject(&:blank?)
  end

  def company_age
    return nil unless foundation_year.present?
    Date.current.year - foundation_year
  end

  def overall_average_rating
    solutions.joins(:reviews).average('reviews.rating') || 0
  end

  def overall_reviews_count
    solutions.joins(:reviews).count
  end

  # Image URL helpers
  def logo_url
    logo.attached? ? Rails.application.routes.url_helpers.rails_blob_url(logo, host: 'http://localhost:3000') : nil
  end

  def cover_image_url
    cover_image.attached? ? Rails.application.routes.url_helpers.rails_blob_url(cover_image, host: 'http://localhost:3000') : nil
  end

  def banner_image_url
    banner_image.attached? ? Rails.application.routes.url_helpers.rails_blob_url(banner_image, host: 'http://localhost:3000') : nil
  end

  # Analytics methods
  def current_analytics
    analytics.find_by(date: Date.current) || analytics.build(date: Date.current)
  end

  def total_leads
    analytics.sum(:leads_received)
  end

  def total_page_views
    analytics.sum(:page_views)
  end

  def current_conversion_rate
    Analytic.average_conversion_rate_for_provider(id)
  end

  def monthly_growth
    Analytic.monthly_growth_for_provider(id)
  end

  def analytics_summary(period = :current_month)
    case period
    when :current_month
      Analytic.monthly_summary(id, Date.current.beginning_of_month)
    when :last_month
      Analytic.monthly_summary(id, 1.month.ago.beginning_of_month)
    else
      Analytic.monthly_summary(id)
    end
  end

  ransacker :service_tags, formatter: proc { |v|
    case v
    when 'instalacao-residencial'
      Arel.sql("tags @> ARRAY['residencial']")
    when 'instalacao-comercial'
      Arel.sql("tags @> ARRAY['comercial']")
    when 'manutencao'
      Arel.sql("tags @> ARRAY['manutencao']")
    when 'monitoramento'
      Arel.sql("tags @> ARRAY['monitoramento']")
    when 'energia-off-grid'
      Arel.sql("tags @> ARRAY['off-grid']")
    when 'consultoria-tecnica'
      Arel.sql("tags @> ARRAY['consultoria-tecnica']")
    else
      Arel.sql("tags @> ARRAY[#{ActiveRecord::Base.connection.quote(v)}]")
    end
  } do |parent|
    parent.table[:tags]
  end

  # Approval methods
  def approve!(admin_user, notes = nil)
    update!(status: 'active', approved_by: admin_user, approved_at: Time.current, approval_notes: notes)
  end

  def reject!(admin_user, notes)
    update!(status: 'rejected', approved_by: admin_user, approved_at: Time.current, approval_notes: notes)
  end

  def suspend!(admin_user, notes)
    update!(status: 'suspended', approved_by: admin_user, approved_at: Time.current, approval_notes: notes)
  end

  def can_be_approved?
    pending?
  end

  def can_be_rejected?
    pending? || active?
  end

  def can_be_suspended?
    active?
  end

  def status_color
    case status
    when 'pending' then 'warning'
    when 'active' then 'ok'
    when 'rejected', 'suspended' then 'error'
    else 'default'
    end
  end

  def status_label
    status.humanize
  end

  private

  def normalize_city_and_state
    self.city = city.to_s.strip.titleize if city.present?
    self.state = state.to_s.strip.upcase if state.present?
  end

  def notify_admins_of_new_provider
    admin_emails = AdminUser.pluck(:email)
    return if admin_emails.empty?
    ProviderMailer.admin_new_provider_notification(self, admin_emails).deliver_later
  end

  def send_status_notification
    return unless users.any?
    case status
    when 'active'
      ProviderMailer.approval_notification(self).deliver_later
    when 'rejected'
      ProviderMailer.rejection_notification(self).deliver_later
    when 'suspended'
      ProviderMailer.suspension_notification(self).deliver_later
    end
  end
end
