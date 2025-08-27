class Api::V1::AnalyticsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_provider
  before_action :authorize_provider_access

  # GET /api/v1/analytics
  def index
    @analytics = @provider.analytics.recent.limit(30)
    render json: {
      analytics: @analytics.map(&:as_json),
      summary: @provider.analytics_summary(:current_month)
    }
  end

  # GET /api/v1/analytics/summary
  def summary
    period = params[:period]&.to_sym || :current_month
    
    summary_data = @provider.analytics_summary(period)
    
    # Adicionar dados comparativos
    if period == :current_month
      last_month_summary = @provider.analytics_summary(:last_month)
      summary_data[:comparison] = calculate_comparison(summary_data, last_month_summary)
    end
    
    render json: {
      summary: summary_data,
      provider: {
        id: @provider.id,
        name: @provider.name,
        status: @provider.status,
        country: @provider.country
      }
    }
  end

  # GET /api/v1/analytics/dashboard
  def dashboard
    current_month = @provider.analytics_summary(:current_month)
    last_month = @provider.analytics_summary(:last_month)
    
    # Dados para gráficos
    leads_over_time = @provider.analytics
                               .where(date: 30.days.ago..Date.current)
                               .order(:date)
                               .pluck(:date, :leads_received)
    
    conversion_sources = {
      'Pesquisa Orgânica' => current_month[:total_leads] * 0.4,
      'Referências' => current_month[:total_leads] * 0.3,
      'Redes Sociais' => current_month[:total_leads] * 0.2,
      'Direto' => current_month[:total_leads] * 0.1
    }
    
    render json: {
      overview: {
        total_leads: current_month[:total_leads],
        total_views: current_month[:total_views],
        conversion_rate: current_month[:average_conversion_rate],
        monthly_growth: calculate_growth_percentage(current_month[:total_leads], last_month[:total_leads])
      },
      charts: {
        leads_over_time: leads_over_time.map { |date, leads| { date: date, leads: leads } },
        conversion_sources: conversion_sources.map { |source, value| { name: source, value: value.round } },
        monthly_comparison: {
          current: current_month[:total_leads],
          previous: last_month[:total_leads]
        }
      },
      recent_analytics: @provider.analytics.recent.limit(7).map do |analytic|
        {
          date: analytic.date,
          leads: analytic.leads_received,
          views: analytic.page_views,
          conversions: analytic.conversions,
          rating: analytic.average_rating
        }
      end
    }
  end

  # POST /api/v1/analytics
  def create
    @analytic = @provider.analytics.build(analytic_params)
    @analytic.date = Date.current unless @analytic.date
    
    if @analytic.save
      render json: { analytic: @analytic, message: 'Analytics criado com sucesso' }, status: :created
    else
      render json: { errors: @analytic.errors }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/analytics/:id
  def update
    @analytic = @provider.analytics.find(params[:id])
    
    if @analytic.update(analytic_params)
      render json: { analytic: @analytic, message: 'Analytics atualizado com sucesso' }
    else
      render json: { errors: @analytic.errors }, status: :unprocessable_entity
    end
  end

  private

  def set_provider
    if params[:provider_id]
      @provider = Provider.find(params[:provider_id])
    else
      # Se não especificado, usar o provider do usuário atual
      @provider = current_user.company_members.first&.provider
      return render json: { error: 'Provider não encontrado' }, status: :not_found unless @provider
    end
  end

  def authorize_provider_access
    # Verificar se o usuário tem acesso ao provider
    unless current_user.admin? || current_user.company_members.exists?(provider: @provider)
      render json: { error: 'Acesso negado' }, status: :forbidden
    end
  end

  def analytic_params
    params.require(:analytic).permit(
      :leads_received, :page_views, :conversions, :conversion_rate,
      :monthly_growth, :response_time, :average_rating, :total_reviews,
      :profile_views, :date, :intention_score, :conversion_point_leads
    )
  end

  def calculate_comparison(current, previous)
    {
      leads_change: calculate_growth_percentage(current[:total_leads], previous[:total_leads]),
      views_change: calculate_growth_percentage(current[:total_views], previous[:total_views]),
      conversion_change: calculate_growth_percentage(current[:average_conversion_rate], previous[:average_conversion_rate]),
      reviews_change: calculate_growth_percentage(current[:total_reviews], previous[:total_reviews])
    }
  end

  def calculate_growth_percentage(current, previous)
    return 0.0 if previous.nil? || previous.zero?
    ((current - previous).to_f / previous * 100).round(2)
  end
end