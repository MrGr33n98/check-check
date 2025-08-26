class CompanyMember < ApplicationRecord
  # Enums
  enum state: {
    pending: 0,
    active: 1,
    inactive: 2,
    suspended: 3
  }

  # Associations
  belongs_to :provider
  belongs_to :user

  # Validations
  validates :provider_id, uniqueness: { scope: :user_id }
  validates :state, presence: true

  # Scopes
  scope :active, -> { where(state: :active) }
  scope :pending, -> { where(state: :pending) }
  scope :by_provider, ->(provider) { where(provider: provider) }
  scope :by_user, ->(user) { where(user: user) }

  # Ransack configuration for ActiveAdmin search
  def self.ransackable_associations(auth_object = nil)
    ["provider", "user"]
  end

  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "id", "provider_id", "state", "updated_at", "user_id"]
  end

  # Methods
  def active?
    state == 'active'
  end

  def pending?
    state == 'pending'
  end

  def inactive?
    state == 'inactive'
  end

  def suspended?
    state == 'suspended'
  end

  def activate!
    update!(state: :active)
  end

  def deactivate!
    update!(state: :inactive)
  end

  def suspend!
    update!(state: :suspended)
  end

  def company_name
    provider.name
  end

  def member_name
    user.name
  end
end