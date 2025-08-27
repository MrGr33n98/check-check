class Analytic < ApplicationRecord
  belongs_to :provider

  validates :provider_id, presence: true
  validates :date, presence: true, uniqueness: { scope: :provider_id }
  validates :leads_received, :page_views, :conversions, :total_reviews, :profile_views, 
            :intention_score, :conversion_point_leads, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :conversion_rate, :monthly_growth, :average_rating, presence: true, 
            numericality: { greater_than_or_equal_to: 0 }
  validates :average_rating, numericality: { less_than_or_equal_to: 5.0 }

  scope :for_provider, ->(provider_id) { where(provider_id: provider_id) }
  scope :for_date_range, ->(start_date, end_date) { where(date: start_date..end_date) }
  scope :recent, -> { order(date: :desc) }
  scope :this_month, -> { where(date: Date.current.beginning_of_month..Date.current.end_of_month) }
  scope :last_month, -> { where(date: 1.month.ago.beginning_of_month..1.month.ago.end_of_month) }

  # Métodos para cálculos de métricas
  def self.total_leads_for_provider(provider_id)
    for_provider(provider_id).sum(:leads_received)
  end

  def self.total_views_for_provider(provider_id)
    for_provider(provider_id).sum(:page_views)
  end

  def self.average_conversion_rate_for_provider(provider_id)
    analytics = for_provider(provider_id)
    return 0.0 if analytics.empty?
    
    total_leads = analytics.sum(:leads_received)
    total_views = analytics.sum(:page_views)
    return 0.0 if total_views.zero?
    
    (total_leads.to_f / total_views * 100).round(2)
  end

  def self.monthly_growth_for_provider(provider_id)
    current_month = this_month.for_provider(provider_id).sum(:leads_received)
    last_month_total = last_month.for_provider(provider_id).sum(:leads_received)
    
    return 0.0 if last_month_total.zero?
    
    ((current_month - last_month_total).to_f / last_month_total * 100).round(2)
  end

  def self.average_rating_for_provider(provider_id)
    analytics = for_provider(provider_id).where('total_reviews > 0')
    return 0.0 if analytics.empty?
    
    total_rating_points = analytics.sum('average_rating * total_reviews')
    total_reviews = analytics.sum(:total_reviews)
    
    return 0.0 if total_reviews.zero?
    
    (total_rating_points / total_reviews).round(2)
  end

  # Método para criar ou atualizar analytics diários
  def self.update_daily_analytics(provider_id, date = Date.current, attributes = {})
    analytic = find_or_initialize_by(provider_id: provider_id, date: date)
    analytic.assign_attributes(attributes)
    analytic.save!
    analytic
  end

  # Método para obter resumo mensal
  def self.monthly_summary(provider_id, month = Date.current.beginning_of_month)
    start_date = month.beginning_of_month
    end_date = month.end_of_month
    
    analytics = for_provider(provider_id).for_date_range(start_date, end_date)
    
    {
      total_leads: analytics.sum(:leads_received),
      total_views: analytics.sum(:page_views),
      total_conversions: analytics.sum(:conversions),
      average_conversion_rate: analytics.average(:conversion_rate)&.round(2) || 0.0,
      total_reviews: analytics.sum(:total_reviews),
      average_rating: analytics.where('total_reviews > 0').average(:average_rating)&.round(2) || 0.0,
      total_profile_views: analytics.sum(:profile_views),
      average_intention_score: analytics.average(:intention_score)&.round(0) || 0,
      conversion_point_leads: analytics.sum(:conversion_point_leads)
    }
  end
end