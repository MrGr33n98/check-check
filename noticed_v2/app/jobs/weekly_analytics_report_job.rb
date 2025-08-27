class WeeklyAnalyticsReportJob < ApplicationJob
  queue_as :default

  def perform
    Rails.logger.info "Starting weekly analytics report generation at #{Time.current}"
    
    # Generate weekly summary for all active providers
    Provider.active.find_each do |provider|
      generate_weekly_report(provider)
    end
    
    # Send summary email to administrators
    send_admin_summary
    
    Rails.logger.info "Weekly analytics report generation completed at #{Time.current}"
  end

  private

  def generate_weekly_report(provider)
    week_start = 1.week.ago.beginning_of_week
    week_end = 1.week.ago.end_of_week
    
    weekly_data = provider.analytics
                         .where(date: week_start..week_end)
                         .group(:date)
                         .sum(:leads_received, :conversions, :page_views)
    
    return if weekly_data.empty?
    
    # Calculate weekly metrics
    total_leads = weekly_data.sum { |_, metrics| metrics[:leads_received] || 0 }
    total_conversions = weekly_data.sum { |_, metrics| metrics[:conversions] || 0 }
    total_page_views = weekly_data.sum { |_, metrics| metrics[:page_views] || 0 }
    
    avg_conversion_rate = total_page_views > 0 ? (total_conversions.to_f / total_page_views * 100).round(2) : 0
    
    # Compare with previous week
    prev_week_start = 2.weeks.ago.beginning_of_week
    prev_week_end = 2.weeks.ago.end_of_week
    
    prev_weekly_data = provider.analytics
                              .where(date: prev_week_start..prev_week_end)
                              .sum(:leads_received, :conversions, :page_views)
    
    prev_total_leads = prev_weekly_data[:leads_received] || 0
    prev_total_conversions = prev_weekly_data[:conversions] || 0
    
    # Calculate growth percentages
    leads_growth = calculate_growth_percentage(prev_total_leads, total_leads)
    conversions_growth = calculate_growth_percentage(prev_total_conversions, total_conversions)
    
    # Store weekly summary (you might want to create a WeeklyAnalyticsSummary model)
    Rails.logger.info "Weekly report for #{provider.name}: Leads: #{total_leads} (#{leads_growth}%), Conversions: #{total_conversions} (#{conversions_growth}%)"
    
    # Send email to provider if they have email notifications enabled
    if provider.email_notifications_enabled?
      ProviderMailer.weekly_analytics_report(
        provider,
        {
          total_leads: total_leads,
          total_conversions: total_conversions,
          total_page_views: total_page_views,
          avg_conversion_rate: avg_conversion_rate,
          leads_growth: leads_growth,
          conversions_growth: conversions_growth,
          week_period: "#{week_start.strftime('%d/%m')} - #{week_end.strftime('%d/%m/%Y')}"
        }
      ).deliver_now
    end
  end

  def send_admin_summary
    # Generate overall platform summary
    week_start = 1.week.ago.beginning_of_week
    week_end = 1.week.ago.end_of_week
    
    platform_summary = {
      total_leads: Analytic.where(date: week_start..week_end).sum(:leads_received),
      total_conversions: Analytic.where(date: week_start..week_end).sum(:conversions),
      total_page_views: Analytic.where(date: week_start..week_end).sum(:page_views),
      active_providers: Analytic.where(date: week_start..week_end).distinct.count(:provider_id),
      top_performers: Analytic.joins(:provider)
                             .where(date: week_start..week_end)
                             .group('providers.name')
                             .order('SUM(conversions) DESC')
                             .limit(5)
                             .sum(:conversions)
    }
    
    # Send to admin users (assuming you have an admin role)
    User.admin.find_each do |admin|
      AdminMailer.weekly_platform_summary(admin, platform_summary).deliver_now
    end
  end

  def calculate_growth_percentage(previous_value, current_value)
    return 0 if previous_value == 0
    return 100 if previous_value == 0 && current_value > 0
    
    ((current_value - previous_value).to_f / previous_value * 100).round(2)
  end
end