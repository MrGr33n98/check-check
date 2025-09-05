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
  has_many :analytics, dependent: :destroy
  has_many :solutions, dependent: :destroy
  belongs_to :approved_by, class_name: 'AdminUser', optional: true

  has_and_belongs_to_many :categories

  has_one_attached :logo
  has_one_attached :cover_image
  has_one_attached :banner_image
  has_many_attached :documents
  has_many_attached :licenses
  has_many_attached :portfolio_images

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

  # Scopes
  scope :premium, -> { where('premium_until >= ?', Date.current) }
  scope :by_country, ->(country) { where('country = ?', country) }
  scope :by_tag, ->(tag) { where('? = ANY(tags)', tag) }
  scope :founded_after, ->(year) { where('foundation_year >= ?', year) }
  scope :founded_before, ->(year) { where('foundation_year <= ?', year) }
  scope :by_city, ->(city) { where('LOWER(city) = ?', city.downcase) }
  scope :by_state, ->(state) { where('LOWER(state) = ?', state.downcase) }
  scope :in_featured_categories, -> {
    joins(:categories).where(categories: { featured: true }).distinct
  }

  # Ransack configuration for ActiveAdmin search
  def self.ransackable_associations(auth_object = nil)
    ["reviews", "approved_by", "b2b_ads", "campaigns", "company_members", "users", "solutions", "categories"]
  end

  def self.ransackable_attributes(auth_object = nil)
    ["approved_at", "approved_by_id", "approval_notes", "country", "created_at", "description",
     "foundation_year", "id", "members_count", "name", "premium_until", "seo_url", "social_links",
     "status", "tags", "updated_at", "short_description", "title", "city", "state", "service_tags"]
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
    self.tags = value.to_s.split(',').map(&:strip).reject(&:blank?)
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
    Arel.sql("tags @> ARRAY[#{ActiveRecord::Base.connection.quote(v)}]")
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
