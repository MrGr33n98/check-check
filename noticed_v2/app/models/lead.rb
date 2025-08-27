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
  after_create :track_lead_creation
  after_update :track_lead_conversion, if: :saved_change_to_status?
  
  private
  
  def set_default_status
    self.status ||= :new_lead
  end
  
  # Rastreia criação de lead para analytics
  def track_lead_creation
    return unless solution&.user
    
    # Buscar provedor associado ao usuário da solução
    provider = Provider.joins(:company_members)
                      .where(company_members: { user: solution.user })
                      .first
    
    if provider
      AnalyticsService.track_lead(provider, self)
    end
  rescue => e
    Rails.logger.error "Error tracking lead creation: #{e.message}"
  end
  
  # Rastreia conversão de lead
  def track_lead_conversion
    return unless converted? && solution&.user
    
    # Buscar provedor associado ao usuário da solução
    provider = Provider.joins(:company_members)
                      .where(company_members: { user: solution.user })
                      .first
    
    if provider
      AnalyticsService.track_conversion(provider, self)
    end
  rescue => e
    Rails.logger.error "Error tracking lead conversion: #{e.message}"
  end
end
