class Question < ApplicationRecord
  # Enums
  enum status: {
    pending: 0,
    answered: 1,
    closed: 2,
    archived: 3
  }

  # Associations
  belongs_to :user
  belongs_to :product, optional: true
  belongs_to :category, optional: true
  has_many :replies, dependent: :destroy

  # Validations
  validates :subject, presence: true
  validates :status, presence: true
  validates :requested_at, presence: true

  # Callbacks
  before_validation :set_requested_at, on: :create

  # Scopes
  scope :pending, -> { where(status: :pending) }
  scope :answered, -> { where(status: :answered) }
  scope :by_user, ->(user) { where(user: user) }
  scope :by_product, ->(product) { where(product: product) }
  scope :by_category, ->(category) { where(category: category) }
  scope :recent, -> { order(requested_at: :desc) }

  # Ransack configuration for ActiveAdmin search
  def self.ransackable_associations(auth_object = nil)
    ["category", "product", "replies", "user"]
  end

  def self.ransackable_attributes(auth_object = nil)
    ["category_id", "created_at", "id", "product_id", "requested_at", "status", "subject", "updated_at", "user_id"]
  end

  # Methods
  def answered?
    status == 'answered' || replies.any?
  end

  def pending?
    status == 'pending'
  end

  def closed?
    status == 'closed'
  end

  def mark_as_answered!
    update!(status: :answered)
  end

  def mark_as_closed!
    update!(status: :closed)
  end

  def latest_reply
    replies.order(:created_at).last
  end

  def replies_count
    replies.count
  end

  private

  def set_requested_at
    self.requested_at ||= Time.current
  end
end