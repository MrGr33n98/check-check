class Tag < ApplicationRecord
  has_and_belongs_to_many :solutions
  
  validates :name, presence: true, uniqueness: true

  # Ransack configuration for ActiveAdmin search
  def self.ransackable_associations(auth_object = nil)
    ["solutions"]
  end

  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "id", "name", "updated_at"]
  end
end
