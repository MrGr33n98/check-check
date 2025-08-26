class Lead < ApplicationRecord
  belongs_to :solution
  validates :name, presence: true
  validates :email, presence: true
  validates :message, presence: true
  
  enum status: { new_lead: 0, contacted: 1, converted: 2, closed: 3 }
  
  scope :recent, -> { order(created_at: :desc) }
  
  # Ransack configuration for ActiveAdmin search
  def self.ransackable_associations(auth_object = nil)
    ["solution"]
  end

  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "email", "id", "message", "name", "solution_id", "status", "updated_at"]
  end
  
  after_initialize :set_default_status, if: :new_record?
  
  private
  
  def set_default_status
    self.status ||= :new_lead
  end
end
