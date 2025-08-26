class ProductAccess < ApplicationRecord
  belongs_to :member
  belongs_to :solution
  
  validates :access_level, presence: true
  
  enum access_level: { view: 0, edit: 1, admin: 2 }
  
  scope :active, -> { where("expires_at IS NULL OR expires_at > ?", Time.current) }
  scope :by_access_level, ->(level) { where(access_level: level) }
  scope :ordered, -> { order(expires_at: :desc) }
  
  # Ransack configuration for ActiveAdmin search
  def self.ransackable_associations(auth_object = nil)
    ["member", "solution"]
  end

  def self.ransackable_attributes(auth_object = nil)
    ["access_level", "created_at", "expires_at", "id", "member_id", "solution_id", "updated_at"]
  end
  
  def active?
    expires_at.nil? || expires_at > Time.current
  end
  
  def days_remaining
    return nil unless expires_at
    (expires_at.to_date - Time.current.to_date).to_i
  end
end
