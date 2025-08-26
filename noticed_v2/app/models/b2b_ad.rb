class B2bAd < ApplicationRecord
  # Enums
  enum status: {
    draft: 0,
    active: 1,
    paused: 2,
    expired: 3,
    cancelled: 4
  }

  # Associations
  belongs_to :company, class_name: 'Provider'
  belongs_to :category, optional: true
  belongs_to :provider, optional: true
  belongs_to :customer, class_name: 'User', optional: true

  # Validations
  validates :starts_on, presence: true
  validates :expires_on, presence: true
  validates :status, presence: true
  validates :clicks, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validate :expiry_date_after_start_date

  # Scopes
  scope :active, -> { where(status: :active) }
  scope :current, -> { where('starts_on <= ? AND expires_on >= ?', Date.current, Date.current) }
  scope :expired, -> { where('expires_on < ?', Date.current) }
  scope :by_company, ->(company) { where(company: company) }
  scope :by_category, ->(category) { where(category: category) }

  # Ransack configuration for ActiveAdmin search
  def self.ransackable_associations(auth_object = nil)
    ["category", "company", "customer", "provider"]
  end

  def self.ransackable_attributes(auth_object = nil)
    ["category_id", "clicks", "company_id", "created_at", "customer_id", "expires_on", 
     "id", "provider_id", "starts_on", "status", "updated_at"]
  end

  # Methods
  def active?
    status == 'active' && current?
  end

  def current?
    starts_on <= Date.current && expires_on >= Date.current
  end

  def expired?
    expires_on < Date.current
  end

  def days_remaining
    return 0 if expired?
    (expires_on - Date.current).to_i
  end

  def increment_clicks!
    increment!(:clicks)
  end

  private

  def expiry_date_after_start_date
    return unless starts_on && expires_on
    
    errors.add(:expires_on, 'must be after start date') if expires_on < starts_on
  end
end