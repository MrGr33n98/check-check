class Content < ApplicationRecord

  # Associations
  belongs_to :product, optional: true

  # Validations
  validates :title, presence: true
  validates :seo_url, uniqueness: true, allow_blank: true
  validates :format, presence: true
  validates :level, presence: true
  validates :kind, presence: true

  # Scopes
  scope :active, -> { where(active: true) }
  scope :by_product, ->(product) { where(product: product) }
  scope :by_format, ->(format) { where(format: format) }
  scope :by_level, ->(level) { where(level: level) }
  scope :by_kind, ->(kind) { where(kind: kind) }
  scope :by_tag, ->(tag) { where('? = ANY(category_tags)', tag) }

  # Ransack configuration for ActiveAdmin search
  def self.ransackable_associations(auth_object = nil)
    ["product"]
  end

  def self.ransackable_attributes(auth_object = nil)
    ["active", "category_tags", "created_at", "format", "id", "kind", "level", 
     "product_id", "seo_description", "seo_title", "seo_url", "short_description", 
     "title", "updated_at"]
  end

  # Methods
  def to_param
    seo_url.presence || super
  end

  def add_category_tag(tag)
    return if category_tags.include?(tag)
    self.category_tags = category_tags + [tag]
    save
  end

  def remove_category_tag(tag)
    self.category_tags = category_tags - [tag]
    save
  end

  def seo_meta_title
    seo_title.presence || title
  end

  def seo_meta_description
    seo_description.presence || short_description
  end
end