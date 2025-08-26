class Solution < ApplicationRecord
  extend FriendlyId # Added
  friendly_id :name, use: :slugged # Added

  has_and_belongs_to_many :categories
  has_and_belongs_to_many :tags
  has_many :reviews, dependent: :destroy
  has_many :leads, dependent: :destroy
  belongs_to :provider, optional: true
  
  validates :name, presence: true
  validates :company, presence: true
  validates :rating, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }, allow_blank: true
  
  # Ransack configuration for ActiveAdmin search
  def self.ransackable_associations(auth_object = nil)
    ["categories", "leads", "reviews", "tags", "provider"]
  end

  def self.ransackable_attributes(auth_object = nil)
    ["company", "created_at", "id", "name", "rating", "updated_at", "provider_id", "slug"]
  end
  
  def average_rating
    return 0 if reviews.empty?
    reviews.average(:rating).round(1)
  end
  
  def reviews_count
    reviews.count
  end
  
  def leads_count
    leads.count
  end
end

