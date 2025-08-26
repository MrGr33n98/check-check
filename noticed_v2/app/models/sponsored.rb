class Sponsored < ApplicationRecord
  validates :title, presence: true
  validates :link_url, presence: true
  validates :position, presence: true
  validates :priority, presence: true, numericality: { only_integer: true }
  
  enum status: { draft: 0, active: 1, paused: 2, expired: 3 }
  enum position: { header: 0, sidebar: 1, footer: 2, category_page: 3, solution_page: 4 }

  has_one_attached :square_banner
  has_one_attached :rectangular_banner
  has_and_belongs_to_many :categories
  
  scope :active, -> { where(status: :active).where("starts_at <= ? AND (ends_at IS NULL OR ends_at >= ?)", Time.current, Time.current) }
  scope :by_position, ->(pos) { where(position: pos) }
  scope :ordered, -> { order(priority: :asc, created_at: :desc) }
  
  # Ransack configuration for ActiveAdmin search
  def self.ransackable_associations(auth_object = nil)
    []
  end

  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "ends_at", "id", "link_url", "position", "priority", "starts_at", "status", "title", "updated_at"]
  end
  
  before_validation :set_defaults
  
  def active?
    status == "active" && starts_at <= Time.current && (ends_at.nil? || ends_at >= Time.current)
  end
  
  def days_remaining
    return nil unless ends_at
    (ends_at.to_date - Time.current.to_date).to_i
  end
  
  private
  
  def set_defaults
    self.starts_at ||= Time.current
    self.status ||= :draft
    self.priority ||= 0
  end
end
