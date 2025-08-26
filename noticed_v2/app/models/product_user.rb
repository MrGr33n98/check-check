class ProductUser < ApplicationRecord
  # Enums
  enum status: {
    trial: 0,
    active: 1,
    expired: 2,
    cancelled: 3,
    suspended: 4
  }

  # Associations
  belongs_to :product
  belongs_to :user

  # Validations
  validates :product_id, uniqueness: { scope: :user_id }
  validates :status, presence: true

  # Scopes
  scope :active, -> { where(status: :active) }
  scope :trial, -> { where(status: :trial) }
  scope :expired, -> { where(status: :expired) }
  scope :by_product, ->(product) { where(product: product) }
  scope :by_user, ->(user) { where(user: user) }

  # Ransack configuration for ActiveAdmin search
  def self.ransackable_associations(auth_object = nil)
    ["product", "user"]
  end

  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "id", "product_id", "status", "updated_at", "user_id"]
  end

  # Methods
  def active?
    status == 'active'
  end

  def trial?
    status == 'trial'
  end

  def expired?
    status == 'expired'
  end

  def cancelled?
    status == 'cancelled'
  end

  def suspended?
    status == 'suspended'
  end

  def activate!
    update!(status: :active)
  end

  def cancel!
    update!(status: :cancelled)
  end

  def suspend!
    update!(status: :suspended)
  end

  def expire!
    update!(status: :expired)
  end

  def product_name
    product.name
  end

  def user_name
    user.name
  end
end