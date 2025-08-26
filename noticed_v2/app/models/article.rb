class Article < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged

  # Associations
  belongs_to :user
  belongs_to :category
  belongs_to :product, optional: true
  has_many :comments, dependent: :destroy
  has_one_attached :featured_image

  # Validations
  validates :title, presence: true
  validates :content, presence: true
  validates :author, presence: true
  validates :slug, uniqueness: true, allow_blank: true
  
  # Enums
  enum status: { draft: 0, published: 1, archived: 2 }
  enum article_category: { news: 0, guides: 1, case_studies: 2, industry: 3, tips: 4 }
  
  # Scopes
  scope :published, -> { where(status: :published).where("published_at <= ?", Time.current) }
  scope :featured, -> { where(featured: true) }
  scope :by_article_category, ->(cat) { where(article_category: cat) }
  scope :by_category, ->(category_id) { where(category_id: category_id) if category_id.present? }
  scope :by_product, ->(product_id) { where(product_id: product_id) if product_id.present? }
  scope :recent, -> { order(published_at: :desc) }
  
  # Ransack configuration for ActiveAdmin search
  def self.ransackable_associations(auth_object = nil)
    ["category", "comments", "product", "user"]
  end

  def self.ransackable_attributes(auth_object = nil)
    ["article_category", "author", "content", "created_at", "featured", "id", "published_at", 
     "slug", "status", "title", "updated_at", "user_id", "category_id", "product_id"]
  end

  # Methods
  def should_generate_new_friendly_id?
    title_changed? || super
  end

  def published?
    status == "published" && published_at && published_at <= Time.current
  end
  
  def can_be_published?
    draft? || archived?
  end

  def can_be_archived?
    published?
  end

  def publish!
    update!(status: :published, published_at: Time.current)
  end

  def archive!
    update!(status: :archived)
  end

  def has_featured_image?
    featured_image.attached?
  end

  def reading_time
    return 0 if content.blank?
    words_per_minute = 200
    word_count = content.split.size
    (word_count / words_per_minute.to_f).ceil
  end

  def excerpt(limit = 150)
    return '' if content.blank?
    content.truncate(limit)
  end
end
