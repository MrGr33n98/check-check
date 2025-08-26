class Review < ApplicationRecord
  # Enums
  enum status: {
    pending: 0,
    approved: 1,
    rejected: 2,
    hidden: 3
  }

  # Associations
  belongs_to :product, optional: true
  belongs_to :solution, optional: true
  belongs_to :user
  
  # Validations
  validates :rating, presence: true, inclusion: { in: 1..5 }
  validates :title, presence: true
  validates :comment, presence: true
  validates :status, presence: true
  
  # Scopes
  scope :recent, -> { order(created_at: :desc) }
  scope :approved, -> { where(status: :approved) }
  scope :by_rating, ->(rating) { where(rating: rating) }
  scope :high_rated, -> { where('rating >= ?', 4) }

  # Ransack configuration for ActiveAdmin search
  def self.ransackable_associations(auth_object = nil)
    ["product", "solution", "user"]
  end

  def self.ransackable_attributes(auth_object = nil)
    ["cliente", "comment", "created_at", "id", "product_id", "solution_id", "rating", "status", "title", "updated_at", "user_id"]
  end

  # Methods
  def approved?
    status == 'approved'
  end

  def pending?
    status == 'pending'
  end

  def rejected?
    status == 'rejected'
  end

  def hidden?
    status == 'hidden'
  end

  def approve!
    update!(status: :approved)
  end

  def reject!
    update!(status: :rejected)
  end

  def hide!
    update!(status: :hidden)
  end

  def customer_name
    cliente.presence || user.name
  end
end
