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

  # Validations
  validates :name, presence: true, uniqueness: true
  validates :seo_url, uniqueness: true, allow_blank: true
  validates :country, presence: true
  validates :foundation_year, presence: true, 
            numericality: { greater_than: 1800, less_than_or_equal_to: Date.current.year }
  validates :members_count, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :status, presence: true, inclusion: { in: statuses.keys }

  # Associations
  has_many :campaigns, dependent: :destroy
  has_many :b2b_ads, dependent: :destroy
  has_many :company_members, dependent: :destroy
  has_many :users, through: :company_members
  belongs_to :approved_by, class_name: 'AdminUser', optional: true

  has_and_belongs_to_many :categories

  has_one_attached :logo
  has_one_attached :cover_image
  has_many_attached :documents
  has_many_attached :licenses
  has_many_attached :portfolio_images

  # Scopes
  scope :premium, -> { where('premium_until >= ?', Date.current) }
  scope :by_country, ->(country) { where(country: country) }
  scope :by_tag, ->(tag) { where('? = ANY(tags)', tag) }
  scope :founded_after, ->(year) { where('foundation_year >= ?', year) }
  scope :founded_before, ->(year) { where('foundation_year <= ?', year) }

  # Ransack configuration for ActiveAdmin search
  def self.ransackable_associations(auth_object = nil)
    ["approved_by", "b2b_ads", "campaigns", "company_members", "users", "solutions", "categories", "subcategories"] # <-- Updated
  end

  def self.ransackable_attributes(auth_object = nil)
    ["approved_at", "approved_by_id", "approval_notes", "country", "created_at", "description", 
     "foundation_year", "id", "members_count", "name", "premium_until", "seo_url", "social_links", 
     "status", "tags", "updated_at", "short_description", "title"]
  end

  # Methods
  def premium?
    premium_until.present? && premium_until >= Date.current
  end

  def to_param
    slug || id.to_s # Use slug if present, otherwise fallback to id
  end

  def add_tag(tag)
    return if tags.include?(tag)
    self.tags = tags + [tag]
    save
  end

  def remove_tag(tag)
    self.tags = tags - [tag]
    save
  end

  def social_links_hash
    return {} if social_links.blank?
    
    social_links.each_with_object({}) do |link, hash|
      if link.include?('facebook')
        hash[:facebook] = link
      elsif link.include?('twitter') || link.include?('x.com')
        hash[:twitter] = link
      elsif link.include?('linkedin')
        hash[:linkedin] = link
      elsif link.include?('instagram')
        hash[:instagram] = link
      else
        hash[:website] = link
      end
    end
  end

  def social_links_list
    social_links.join(', ')
  end

  def social_links_list=(value)
    self.social_links = value.to_s.split(',').map(&:strip).reject(&:blank?)
  end

  def tags_list
    tags.join(', ')
  end

  def tags_list=(value)
    self.tags = value.to_s.split(',').map(&:strip).reject(&:blank?)
  end

  def company_age
    return nil unless foundation_year.present?
    Date.current.year - foundation_year
  end

  def overall_average_rating
    return 0 if solutions.empty? || solutions.all? { |s| s.reviews.empty? }
    solutions.joins(:reviews).average('reviews.rating').to_f.round(1)
  end

  def overall_reviews_count
    solutions.joins(:reviews).count('reviews.id')
  end

  # Approval methods
  def approve!(admin_user, notes = nil)
    update!(
      status: 'active',
      approved_by: admin_user,
      approved_at: Time.current,
      approval_notes: notes
    )
  end

  def reject!(admin_user, notes)
    update!(
      status: 'rejected',
      approved_by: admin_user,
      approved_at: Time.current,
      approval_notes: notes
    )
  end

  def suspend!(admin_user, notes)
    update!(
      status: 'suspended',
      approved_by: admin_user,
      approved_at: Time.current,
      approval_notes: notes
    )
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
    when 'rejected' then 'error'
    when 'suspended' then 'error'
    else 'default'
    end
  end

  def status_label
    case status
    when 'pending' then 'Aguardando Aprovação'
    when 'active' then 'Ativa'
    when 'rejected' then 'Rejeitada'
    when 'suspended' then 'Suspensa'
    else status.humanize
    end
  end
end