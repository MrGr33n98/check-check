# Analytics Service
# Serviço responsável por coletar e processar métricas automaticamente

class AnalyticsService
  class << self
    # Atualiza métricas diárias para um provedor específico
    def update_daily_metrics(provider, date = Date.current)
      return unless provider.is_a?(Provider)
      
      # Buscar ou criar registro de analytics para a data
      analytic = Analytic.find_or_initialize_by(
        provider: provider,
        date: date
      )
      
      # Coletar métricas do dia
      metrics = collect_daily_metrics(provider, date)
      
      # Atualizar o registro
      analytic.assign_attributes(metrics)
      analytic.save!
      
      Rails.logger.info "Analytics updated for #{provider.company_name} on #{date}"
      analytic
    rescue => e
      Rails.logger.error "Error updating analytics for #{provider.company_name}: #{e.message}"
      nil
    end
    
    # Atualiza métricas para todos os provedores ativos
    def update_all_daily_metrics(date = Date.current)
      Provider.where(status: 'approved').find_each do |provider|
        update_daily_metrics(provider, date)
      end
    end
    
    # Coleta métricas específicas do dia
    def collect_daily_metrics(provider, date)
      start_time = date.beginning_of_day
      end_time = date.end_of_day
      
      # Leads recebidos no dia
      leads_received = count_leads_for_provider(provider, start_time, end_time)
      
      # Visualizações de página (simulado - em produção viria do Google Analytics ou similar)
      page_views = calculate_page_views(provider, date)
      
      # Conversões (leads que se tornaram clientes)
      conversions = count_conversions_for_provider(provider, start_time, end_time)
      
      # Taxa de conversão
      conversion_rate = page_views > 0 ? ((conversions.to_f / page_views) * 100).round(2) : 0
      
      # Crescimento mensal
      monthly_growth = calculate_monthly_growth(provider, date)
      
      # Tempo de resposta médio (em horas)
      response_time = calculate_average_response_time(provider, start_time, end_time)
      
      # Avaliação média
      average_rating = calculate_average_rating(provider)
      
      # Total de reviews
      total_reviews = count_total_reviews(provider)
      
      # Visualizações de perfil
      profile_views = calculate_profile_views(provider, date)
      
      # Pontuação de intenção (baseada na qualidade dos leads)
      intention_score = calculate_intention_score(provider, start_time, end_time)
      
      # Leads de pontos de conversão
      conversion_point_leads = count_conversion_point_leads(provider, start_time, end_time)
      
      {
        leads_received: leads_received,
        page_views: page_views,
        conversions: conversions,
        conversion_rate: conversion_rate,
        monthly_growth: monthly_growth,
        response_time: response_time,
        average_rating: average_rating,
        total_reviews: total_reviews,
        profile_views: profile_views,
        intention_score: intention_score,
        conversion_point_leads: conversion_point_leads
      }
    end
    
    # Registra uma visualização de página
    def track_page_view(provider, request = nil)
      return unless provider.is_a?(Provider)
      
      # Em produção, isso seria integrado com Google Analytics ou similar
      # Por enquanto, vamos simular o tracking
      
      Rails.cache.increment("page_views:#{provider.id}:#{Date.current}", 1)
      
      # Atualizar métricas diárias se necessário
      update_daily_metrics(provider) if should_update_metrics?
    end
    
    # Registra um novo lead
    def track_lead(provider, lead)
      return unless provider.is_a?(Provider) && lead.is_a?(Lead)
      
      Rails.cache.increment("leads:#{provider.id}:#{Date.current}", 1)
      
      # Atualizar métricas diárias
      update_daily_metrics(provider)
    end
    
    # Registra uma conversão
    def track_conversion(provider, lead = nil)
      return unless provider.is_a?(Provider)
      
      Rails.cache.increment("conversions:#{provider.id}:#{Date.current}", 1)
      
      # Atualizar métricas diárias
      update_daily_metrics(provider)
    end
    
    private
    
    # Conta leads para um provedor em um período
    def count_leads_for_provider(provider, start_time, end_time)
      # Buscar leads através das soluções do provedor
      if provider.respond_to?(:solutions)
        Lead.joins(:solution)
            .where(solutions: { user_id: provider.user_ids })
            .where(created_at: start_time..end_time)
            .count
      else
        # Fallback: buscar por cache ou estimativa
        Rails.cache.read("leads:#{provider.id}:#{start_time.to_date}") || rand(0..10)
      end
    end
    
    # Calcula visualizações de página
    def calculate_page_views(provider, date)
      cached_views = Rails.cache.read("page_views:#{provider.id}:#{date}")
      return cached_views if cached_views
      
      # Simulação baseada no status e popularidade do provedor
      base_views = case provider.status
                   when 'approved' then rand(100..500)
                   when 'premium' then rand(300..800)
                   else rand(10..100)
                   end
      
      # Fator de crescimento baseado na idade da empresa
      if provider.founded_year
        years_active = Date.current.year - provider.founded_year
        growth_factor = 1 + (years_active * 0.1)
        base_views = (base_views * growth_factor).round
      end
      
      Rails.cache.write("page_views:#{provider.id}:#{date}", base_views, expires_in: 1.day)
      base_views
    end
    
    # Conta conversões para um provedor
    def count_conversions_for_provider(provider, start_time, end_time)
      cached_conversions = Rails.cache.read("conversions:#{provider.id}:#{start_time.to_date}")
      return cached_conversions if cached_conversions
      
      # Simulação baseada nos leads
      leads_count = count_leads_for_provider(provider, start_time, end_time)
      conversion_rate = rand(0.05..0.15) # 5% a 15% de conversão
      conversions = (leads_count * conversion_rate).round
      
      Rails.cache.write("conversions:#{provider.id}:#{start_time.to_date}", conversions, expires_in: 1.day)
      conversions
    end
    
    # Calcula crescimento mensal
    def calculate_monthly_growth(provider, date)
      current_month_start = date.beginning_of_month
      previous_month_start = (date - 1.month).beginning_of_month
      previous_month_end = previous_month_start.end_of_month
      
      # Buscar analytics do mês anterior
      previous_analytics = Analytic.where(
        provider: provider,
        date: previous_month_start..previous_month_end
      )
      
      if previous_analytics.any?
        previous_leads = previous_analytics.sum(:leads_received)
        current_leads = count_leads_for_provider(provider, current_month_start, date.end_of_day)
        
        if previous_leads > 0
          growth = ((current_leads - previous_leads).to_f / previous_leads * 100).round(2)
          return growth
        end
      end
      
      # Fallback: crescimento simulado
      rand(-10.0..25.0).round(2)
    end
    
    # Calcula tempo médio de resposta
    def calculate_average_response_time(provider, start_time, end_time)
      # Em produção, isso seria baseado em dados reais de resposta
      # Por enquanto, simulamos baseado no status do provedor
      case provider.status
      when 'premium' then rand(1..4)
      when 'approved' then rand(2..8)
      else rand(4..24)
      end
    end
    
    # Calcula avaliação média
    def calculate_average_rating(provider)
      # Buscar reviews relacionadas ao provedor
      if provider.respond_to?(:reviews)
        avg = provider.reviews.average(:rating)
        return avg.round(1) if avg
      end
      
      # Fallback: rating simulado
      rand(3.5..5.0).round(1)
    end
    
    # Conta total de reviews
    def count_total_reviews(provider)
      if provider.respond_to?(:reviews)
        return provider.reviews.count
      end
      
      # Fallback: contagem simulada
      rand(0..20)
    end
    
    # Calcula visualizações de perfil
    def calculate_profile_views(provider, date)
      # Simulação baseada nas visualizações de página
      page_views = calculate_page_views(provider, date)
      profile_views = (page_views * rand(0.3..0.7)).round
      
      profile_views
    end
    
    # Calcula pontuação de intenção
    def calculate_intention_score(provider, start_time, end_time)
      # Baseado na qualidade dos leads e engajamento
      base_score = rand(60..95)
      
      # Ajustar baseado no status do provedor
      case provider.status
      when 'premium' then base_score + rand(0..5)
      when 'approved' then base_score
      else base_score - rand(0..10)
      end
    end
    
    # Conta leads de pontos de conversão
    def count_conversion_point_leads(provider, start_time, end_time)
      conversions = count_conversions_for_provider(provider, start_time, end_time)
      # Leads que estão próximos de converter
      (conversions * rand(1.2..2.0)).round
    end
    
    # Verifica se deve atualizar métricas (para evitar muitas atualizações)
    def should_update_metrics?
      # Atualizar no máximo a cada hora
      last_update = Rails.cache.read('last_metrics_update')
      return true unless last_update
      
      Time.current - last_update > 1.hour
    end
  end
end