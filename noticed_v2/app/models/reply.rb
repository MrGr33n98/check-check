class Reply < ApplicationRecord
  # Enums
  enum status: {
    draft: 0,
    published: 1,
    hidden: 2,
    flagged: 3
  }

  # Associations
  belongs_to :question
  belongs_to :user

  # Validations
  validates :answer, presence: true
  validates :status, presence: true
  validates :requested_at, presence: true

  # Callbacks
  before_validation :set_requested_at, on: :create
  after_create :mark_question_as_answered

  # Scopes
  scope :published, -> { where(status: :published) }
  scope :by_user, ->(user) { where(user: user) }
  scope :by_question, ->(question) { where(question: question) }
  scope :recent, -> { order(requested_at: :desc) }

  # Ransack configuration for ActiveAdmin search
  def self.ransackable_associations(auth_object = nil)
    ["question", "user"]
  end

  def self.ransackable_attributes(auth_object = nil)
    ["answer", "created_at", "id", "question_id", "requested_at", "status", "updated_at", "user_id"]
  end

  # Methods
  def published?
    status == 'published'
  end

  def draft?
    status == 'draft'
  end

  def hidden?
    status == 'hidden'
  end

  def flagged?
    status == 'flagged'
  end

  def publish!
    update!(status: :published)
  end

  def hide!
    update!(status: :hidden)
  end

  def flag!
    update!(status: :flagged)
  end

  private

  def set_requested_at
    self.requested_at ||= Time.current
  end

  def mark_question_as_answered
    question.mark_as_answered! if published?
  end
end