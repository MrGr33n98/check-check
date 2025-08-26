class Campaign < ApplicationRecord
  # Associations
  belongs_to :product
  belongs_to :owner_member, class_name: 'Member', optional: true

  # Validations
  validates :title, presence: true
  validates :code, presence: true, uniqueness: true
  validates :goal, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :reached, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :beginners, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :shares, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :starts_on, presence: true
  validates :ends_on, presence: true
  validate :end_date_after_start_date

  # Scopes
  scope :active, -> { where('starts_on <= ? AND ends_on >= ?', Date.current, Date.current) }
  scope :upcoming, -> { where('starts_on > ?', Date.current) }
  scope :expired, -> { where('ends_on < ?', Date.current) }
  scope :by_product, ->(product) { where(product: product) }

  # Ransack configuration for ActiveAdmin search
  def self.ransackable_associations(auth_object = nil)
    ["owner_member", "product"]
  end

  def self.ransackable_attributes(auth_object = nil)
    ["beginners", "code", "created_at", "ends_on", "goal", "id", "owner_member_id", 
     "product_id", "reached", "share_code", "shares", "starts_on", "title", "updated_at"]
  end

  # Methods
  def active?
    starts_on <= Date.current && ends_on >= Date.current
  end

  def upcoming?
    starts_on > Date.current
  end

  def expired?
    ends_on < Date.current
  end

  def progress_percentage
    return 0 if goal.zero?
    [(reached.to_f / goal * 100).round(2), 100].min
  end

  def days_remaining
    return 0 if expired?
    (ends_on - Date.current).to_i
  end

  def generate_share_code
    self.share_code = SecureRandom.hex(8) if share_code.blank?
  end

  private

  def end_date_after_start_date
    return unless starts_on && ends_on
    
    errors.add(:ends_on, 'must be after start date') if ends_on < starts_on
  end
end