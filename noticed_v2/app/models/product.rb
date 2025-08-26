class Product < ApplicationRecord

  # Enums
  enum status: {
    draft: 0,
    active: 1,
    inactive: 2,
    archived: 3
  }

  enum kind: {
    software: 0,
    hardware: 1,
    service: 2,
    platform: 3,
    solution: 4
  }

  # Validations
  validates :name, presence: true, uniqueness: true
  validates :seo_url, uniqueness: true, allow_blank: true
  validates :country, presence: true
  validates :status, presence: true
  validates :kind, presence: true

  # Associations
  has_many :product_users, dependent: :destroy
  has_many :users, through: :product_users
  has_many :reviews, dependent: :destroy
  has_many :campaigns, dependent: :destroy
  has_many :b2b_ads, dependent: :destroy
  has_many :badges, dependent: :destroy
  has_many :contents, dependent: :destroy
  has_many :questions, dependent: :destroy
  has_many :pricings, dependent: :destroy
  has_many :product_accesses, dependent: :destroy

  # Scopes
  scope :active, -> { where(status: :active) }
  scope :premium, -> { where('premium_until >= ?', Date.current) }
  scope :by_country, ->(country) { where(country: country) }
  scope :by_kind, ->(kind) { where(kind: kind) }

  # Ransack configuration for ActiveAdmin search
  def self.ransackable_associations(auth_object = nil)
    ["b2b_ads", "badges", "campaigns", "contents", "pricings", "product_accesses", "product_users", "questions", "users"]
  end

  def self.ransackable_attributes(auth_object = nil)
    ["country", "created_at", "description", "id", "kind", "name", "premium_until", "seo_url", "status", "updated_at"]
  end

  # Methods
  def premium?
    premium_until.present? && premium_until >= Date.current
  end

  def active?
    status == 'active'
  end

  def to_param
    seo_url.presence || super
  end
end