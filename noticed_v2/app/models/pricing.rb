class Pricing < ApplicationRecord
  # Enums
  enum charge_type: {
    one_time: 0,
    recurring: 1,
    usage_based: 2,
    tiered: 3
  }

  enum frequency: {
    monthly: 0,
    quarterly: 1,
    yearly: 2,
    weekly: 3,
    daily: 4
  }

  enum state: {
    draft: 0,
    active: 1,
    inactive: 2,
    archived: 3
  }

  # Associations
  belongs_to :product

  # Validations
  validates :title, presence: true
  validates :currency, presence: true
  validates :amount, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :charge_type, presence: true
  validates :frequency, presence: true
  validates :display_order, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :discount_pct, presence: true, numericality: { 
    greater_than_or_equal_to: 0, 
    less_than_or_equal_to: 100 
  }
  validates :state, presence: true

  # Scopes
  scope :active, -> { where(state: :active) }
  scope :by_product, ->(product) { where(product: product) }
  scope :ordered, -> { order(:display_order, :title) }
  scope :by_charge_type, ->(type) { where(charge_type: type) }
  scope :by_frequency, ->(freq) { where(frequency: freq) }

  # Ransack configuration for ActiveAdmin search
  def self.ransackable_associations(auth_object = nil)
    ["product"]
  end

  def self.ransackable_attributes(auth_object = nil)
    ["amount", "charge_type", "created_at", "currency", "discount_pct", "display_order", 
     "frequency", "id", "product_id", "state", "title", "updated_at"]
  end

  # Methods
  def active?
    state == 'active'
  end

  def draft?
    state == 'draft'
  end

  def inactive?
    state == 'inactive'
  end

  def archived?
    state == 'archived'
  end

  def discounted_amount
    return amount if discount_pct.zero?
    amount * (1 - discount_pct / 100.0)
  end

  def has_discount?
    discount_pct > 0
  end

  def formatted_amount
    "#{currency} #{amount}"
  end

  def formatted_discounted_amount
    "#{currency} #{discounted_amount}"
  end

  def frequency_text
    case frequency
    when 'monthly' then 'per month'
    when 'yearly' then 'per year'
    when 'quarterly' then 'per quarter'
    when 'weekly' then 'per week'
    when 'daily' then 'per day'
    else frequency
    end
  end

  def full_price_description
    base = "#{formatted_amount}"
    base += " #{frequency_text}" if recurring?
    base += " (#{discount_pct}% off)" if has_discount?
    base
  end
end