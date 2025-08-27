class HourlyMetricsUpdateJob < ApplicationJob
  queue_as :high_priority

  def perform
    Rails.logger.info "Starting hourly metrics update at #{Time.current}"
    
    update_current_day_metrics
    update_real_time_counters
    refresh_cached_summaries
    
    Rails.logger.info "Hourly metrics update completed at #{Time.current}"
  end

  private

  def update_current_day_metrics
    today = Date.current
    
    Provider.active.find_each do |provider|
      # Get or create today's analytics record
      analytic = provider.analytics.find_or_create_by(date: today) do |a|
        a.leads_received = 0
        a.page_views = 0
        a.conversions = 0
        a.conversion_rate = 0.0
        a.monthly_growth = 0.0
        a.average_rating = 0.0
        a.total_reviews = 0
      end
      
      # Update metrics based on real-time data
      update_provider_metrics(provider, analytic)
    end
  end

  def update_provider_metrics(provider, analytic)
    today = Date.current
    
    # Update leads received (assuming you have a leads table)
    if defined?(Lead)
      daily_leads = Lead.where(provider: provider, created_at: today.beginning_of_day..today.end_of_day).count
      analytic.update(leads_received: daily_leads)
    end
    
    # Update page views (from a hypothetical page_views table or analytics service)
    if defined?(PageView)
      daily_page_views = PageView.where(provider: provider, created_at: today.beginning_of_day..today.end_of_day).count
      analytic.update(page_views: daily_page_views)
    end
    
    # Update conversions (from a hypothetical conversions table)
    if defined?(Conversion)
      daily_conversions = Conversion.where(provider: provider, created_at: today.beginning_of_day..today.end_of_day).count
      analytic.update(conversions: daily_conversions)
    end
    
    # Update reviews and ratings
    if defined?(Review)
      provider_reviews = Review.where(provider: provider)
      total_reviews = provider_reviews.count
      average_rating = provider_reviews.average(:rating) || 0.0
      
      analytic.update(
        total_reviews: total_reviews,
        average_rating: average_rating.round(2)
      )
    end
    
    # Calculate conversion rate
    if analytic.page_views > 0
      conversion_rate = (analytic.conversions.to_f / analytic.page_views * 100).round(2)
      analytic.update(conversion_rate: conversion_rate)
    end
    
    # Calculate monthly growth
    calculate_monthly_growth(provider, analytic)
  end

  def calculate_monthly_growth(provider, current_analytic)
    current_month = Date.current.beginning_of_month
    previous_month = 1.month.ago.beginning_of_month
    
    # Get current month's total leads
    current_month_leads = provider.analytics
                                 .where(date: current_month..Date.current)
                                 .sum(:leads_received)
    
    # Get previous month's total leads
    previous_month_leads = provider.analytics
                                  .where(date: previous_month..previous_month.end_of_month)
                                  .sum(:leads_received)
    
    # Calculate growth percentage
    if previous_month_leads > 0
      growth = ((current_month_leads - previous_month_leads).to_f / previous_month_leads * 100).round(2)
    else
      growth = current_month_leads > 0 ? 100.0 : 0.0
    end
    
    current_analytic.update(monthly_growth: growth)
  end

  def update_real_time_counters
    # Update Redis counters for real-time dashboard (if using Redis)
    if defined?(Redis) && Rails.cache.is_a?(ActiveSupport::Cache::RedisCacheStore)
      update_redis_counters
    end
    
    # Update application cache with current metrics
    update_application_cache
  end

  def update_redis_counters
    redis = Redis.current
    today = Date.current.strftime('%Y-%m-%d')
    
    Provider.active.find_each do |provider|
      provider_key = "analytics:#{provider.id}:#{today}"
      
      # Set expiration for tomorrow to auto-cleanup
      redis.expire(provider_key, 25.hours.to_i)
      
      # Update counters (these would be incremented by your application in real-time)
      current_analytic = provider.analytics.find_by(date: Date.current)
      
      if current_analytic
        redis.hset(provider_key, {
          'leads' => current_analytic.leads_received,
          'page_views' => current_analytic.page_views,
          'conversions' => current_analytic.conversions,
          'conversion_rate' => current_analytic.conversion_rate
        })
      end
    end
  end

  def update_application_cache
    # Cache frequently accessed analytics summaries
    cache_key = "analytics_summary_#{Date.current.strftime('%Y-%m-%d')}"
    
    summary = {
      total_leads: Analytic.where(date: Date.current).sum(:leads_received),
      total_conversions: Analytic.where(date: Date.current).sum(:conversions),
      total_page_views: Analytic.where(date: Date.current).sum(:page_views),
      active_providers: Analytic.where(date: Date.current).distinct.count(:provider_id),
      average_conversion_rate: Analytic.where(date: Date.current).average(:conversion_rate)&.round(2) || 0.0,
      updated_at: Time.current
    }
    
    Rails.cache.write(cache_key, summary, expires_in: 1.hour)
    
    # Cache top performers
    top_performers_key = "top_performers_#{Date.current.strftime('%Y-%m-%d')}"
    top_performers = Analytic.joins(:provider)
                            .where(date: Date.current)
                            .order(conversions: :desc)
                            .limit(10)
                            .pluck('providers.name', :conversions, :conversion_rate)
    
    Rails.cache.write(top_performers_key, top_performers, expires_in: 1.hour)
  end

  def refresh_cached_summaries
    # Refresh weekly and monthly summaries that might be cached
    ['weekly', 'monthly'].each do |period|
      cache_key = "analytics_#{period}_summary"
      Rails.cache.delete(cache_key)
      
      # Trigger recalculation by accessing the data
      case period
      when 'weekly'
        calculate_weekly_summary
      when 'monthly'
        calculate_monthly_summary
      end
    end
  end

  def calculate_weekly_summary
    week_start = Date.current.beginning_of_week
    week_end = Date.current.end_of_week
    
    summary = {
      period: "#{week_start.strftime('%d/%m')} - #{week_end.strftime('%d/%m/%Y')}",
      total_leads: Analytic.where(date: week_start..week_end).sum(:leads_received),
      total_conversions: Analytic.where(date: week_start..week_end).sum(:conversions),
      total_page_views: Analytic.where(date: week_start..week_end).sum(:page_views),
      average_conversion_rate: Analytic.where(date: week_start..week_end).average(:conversion_rate)&.round(2) || 0.0
    }
    
    Rails.cache.write('analytics_weekly_summary', summary, expires_in: 6.hours)
    summary
  end

  def calculate_monthly_summary
    month_start = Date.current.beginning_of_month
    month_end = Date.current.end_of_month
    
    summary = {
      period: month_start.strftime('%B %Y'),
      total_leads: Analytic.where(date: month_start..month_end).sum(:leads_received),
      total_conversions: Analytic.where(date: month_start..month_end).sum(:conversions),
      total_page_views: Analytic.where(date: month_start..month_end).sum(:page_views),
      average_conversion_rate: Analytic.where(date: month_start..month_end).average(:conversion_rate)&.round(2) || 0.0
    }
    
    Rails.cache.write('analytics_monthly_summary', summary, expires_in: 12.hours)
    summary
  end
end