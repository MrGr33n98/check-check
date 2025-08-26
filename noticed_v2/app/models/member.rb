class Member < ApplicationRecord
  # This is an alias for CompanyMember to maintain backward compatibility
  # with existing Campaign associations
  
  # Associations
  belongs_to :user
  has_many :campaigns, foreign_key: 'owner_member_id', dependent: :nullify
  
  # Ransack configuration for ActiveAdmin search
  def self.ransackable_associations(auth_object = nil)
    ["campaigns", "user"]
  end

  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "id", "updated_at", "user_id"]
  end
  
  # Delegate methods to maintain compatibility
  def self.table_name
    'company_members'
  end

  def display_name
    user&.name || "Member ##{id}"
  end

  def name
    display_name
  end
end