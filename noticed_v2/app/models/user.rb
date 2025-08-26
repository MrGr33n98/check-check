class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  after_create :set_default_approved

  def active_for_authentication?
    super && approved?
  end

  def inactive_message
    approved? ? super : :not_approved
  end

  private

  def set_default_approved
    self.update(approved: false)
  end

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  # By implementing this feature, users will be able to conveniently
  # associate and access all notifications directed towards them.
  has_many :notifications, as: :recipient, dependent: :destroy, class_name: 'Noticed::Notification'
  # Whenever you have noticed events that have the record pointing to the user,
  # such as when a new user joins a team or any similar occurrences,
  # It's important to ensure that notifications mentioning us are accessible.
  has_many :notification_mentions, as: :record, dependent: :destroy, class_name: 'Noticed::Event'
  
  # SolarFinder relationships
  has_one :company_member
  has_one :provider, through: :company_member
  has_many :solutions, dependent: :destroy
  has_many :reviews, dependent: :destroy

  def self.ransackable_attributes(_auth_object = nil)
    %w[name email] # Allow searching by name and email
  end

  def self.ransackable_associations(_auth_object = nil)
    [] # We don't have any searchable associations in this case
  end
end
