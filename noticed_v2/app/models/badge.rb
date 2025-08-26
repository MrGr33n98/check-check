class Badge < ApplicationRecord
  # Associations
  belongs_to :category, optional: true

  # Validations
  validates :name, presence: true, uniqueness: { scope: [:year, :edition] }
  validates :position, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :year, presence: true, numericality: { 
    greater_than: 1900, 
    less_than_or_equal_to: Date.current.year + 1 
  }
  validates :products_count, presence: true, numericality: { greater_than_or_equal_to: 0 }

  # Scopes
  scope :by_year, ->(year) { where(year: year) }
  scope :by_category, ->(category) { where(category: category) }
  scope :by_edition, ->(edition) { where(edition: edition) }
  scope :ordered, -> { order(:position, :name) }
  scope :current_year, -> { where(year: Date.current.year) }

  # Ransack configuration for ActiveAdmin search
  def self.ransackable_associations(auth_object = nil)
    ["category"]
  end

  def self.ransackable_attributes(auth_object = nil)
    ["category_id", "created_at", "edition", "id", "name", "position", "products_count", "updated_at", "year"]
  end



  # Methods
  def full_name
    parts = [name]
    parts << year if year.present?
    parts << edition if edition.present?
    parts.join(' - ')
  end

  def current_year?
    year == Date.current.year
  end


end