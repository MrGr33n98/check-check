ActiveAdmin.register Analytic do
  menu parent: 'Relatórios', priority: 1

  # Dashboard customizado
  controller do
    def dashboard_data
      @analytics_summary = {
        total_leads: Analytic.sum(:leads_received),
        total_conversions: Analytic.sum(:conversions),
        avg_conversion_rate: Analytic.average(:conversion_rate)&.round(2) || 0,
        total_providers: Analytic.distinct.count(:provider_id),
        monthly_trends: monthly_trends_data,
        top_performers: top_performers_data,
        conversion_funnel: conversion_funnel_data
      }
    end

    private

    def monthly_trends_data
      (0..11).map do |i|
        month = i.months.ago.beginning_of_month
        {
          month: month.strftime('%b %Y'),
          leads: Analytic.where(date: month..month.end_of_month).sum(:leads_received),
          conversions: Analytic.where(date: month..month.end_of_month).sum(:conversions),
          avg_rating: Analytic.where(date: month..month.end_of_month).average(:average_rating)&.round(2) || 0
        }
      end.reverse
    end

    def top_performers_data
      Analytic.joins(:provider)
              .group('providers.name')
              .order('SUM(conversions) DESC')
              .limit(10)
              .sum(:conversions)
    end

    def conversion_funnel_data
      {
        page_views: Analytic.sum(:page_views),
        leads: Analytic.sum(:leads_received),
        conversions: Analytic.sum(:conversions)
      }
    end
  end

  # Permissões
  permit_params :provider_id, :leads_received, :page_views, :conversions, 
                :conversion_rate, :monthly_growth, :response_time, 
                :average_rating, :total_reviews, :profile_views, :date,
                :intention_score, :conversion_point_leads

  # Painel de Dashboard
  index as: :table do
    div class: 'analytics-dashboard' do
      # Métricas principais
      div class: 'dashboard-metrics' do
        div class: 'metric-card' do
          h3 'Total de Leads'
          span Analytic.sum(:leads_received), class: 'metric-value'
        end
        div class: 'metric-card' do
          h3 'Total de Conversões'
          span Analytic.sum(:conversions), class: 'metric-value'
        end
        div class: 'metric-card' do
          h3 'Taxa Média de Conversão'
          span "#{(Analytic.average(:conversion_rate) || 0).round(2)}%", class: 'metric-value'
        end
        div class: 'metric-card' do
          h3 'Provedores Ativos'
          span Analytic.distinct.count(:provider_id), class: 'metric-value'
        end
      end

      # Gráfico de tendências (placeholder para JavaScript)
      div id: 'trends-chart', class: 'chart-container' do
        h4 'Tendências Mensais'
        div 'Gráfico será carregado aqui', class: 'chart-placeholder'
      end

      # Top performers
      div class: 'top-performers' do
        h4 'Top 5 Provedores por Conversões'
        table_for Analytic.joins(:provider)
                          .group('providers.name')
                          .order('SUM(conversions) DESC')
                          .limit(5)
                          .sum(:conversions) do
          column 'Provedor' do |name, conversions|
            name
          end
          column 'Conversões' do |name, conversions|
            conversions
          end
        end
      end
    end
  end

  # Configuração de índice detalhada
  index title: 'Dados Detalhados' do
    selectable_column
    id_column
    column :provider do |analytic|
      link_to analytic.provider.name, admin_provider_path(analytic.provider)
    end
    column :date
    column :leads_received
    column :page_views
    column :conversions
    column :conversion_rate do |analytic|
      "#{analytic.conversion_rate}%"
    end
    column :monthly_growth do |analytic|
      status_tag "#{analytic.monthly_growth}%", 
                 class: analytic.monthly_growth >= 0 ? 'ok' : 'error'
    end
    column :average_rating do |analytic|
      "⭐ #{analytic.average_rating}"
    end
    column :total_reviews
    column :created_at
    actions
  end

  # Filtros
  filter :provider, as: :select, collection: -> { Provider.order(:name).pluck(:name, :id) }
  filter :date
  filter :leads_received
  filter :page_views
  filter :conversions
  filter :conversion_rate
  filter :monthly_growth
  filter :average_rating
  filter :created_at

  # Scopes
  scope :all, default: true
  scope :this_month, -> { where(date: Date.current.beginning_of_month..Date.current.end_of_month) }
  scope :last_month, -> { where(date: 1.month.ago.beginning_of_month..1.month.ago.end_of_month) }
  scope :high_conversion, -> { where('conversion_rate > ?', 5.0) }
  scope :growing, -> { where('monthly_growth > ?', 0) }

  # Formulário
  form do |f|
    f.inputs 'Detalhes do Analytics' do
      f.input :provider, as: :select, collection: Provider.order(:name).pluck(:name, :id)
      f.input :date, as: :datepicker
      f.input :leads_received
      f.input :page_views
      f.input :conversions
      f.input :conversion_rate, hint: 'Porcentagem (ex: 2.5 para 2.5%)'
      f.input :monthly_growth, hint: 'Porcentagem de crescimento mensal'
      f.input :response_time
      f.input :average_rating, hint: 'Avaliação de 0 a 5'
      f.input :total_reviews
      f.input :profile_views
      f.input :intention_score, hint: 'Pontuação de intenção (0-100)'
      f.input :conversion_point_leads, hint: 'Leads de pontos de conversão'
    end
    f.actions
  end

  # Página de detalhes
  show do
    attributes_table do
      row :provider do |analytic|
        link_to analytic.provider.name, admin_provider_path(analytic.provider)
      end
      row :date
      row :leads_received
      row :page_views
      row :conversions
      row :conversion_rate do |analytic|
        "#{analytic.conversion_rate}%"
      end
      row :monthly_growth do |analytic|
        status_tag "#{analytic.monthly_growth}%", 
                   class: analytic.monthly_growth >= 0 ? 'ok' : 'error'
      end
      row :response_time
      row :average_rating do |analytic|
        "⭐ #{analytic.average_rating} (#{analytic.total_reviews} reviews)"
      end
      row :profile_views
      row :intention_score
      row :conversion_point_leads
      row :created_at
      row :updated_at
    end

    panel 'Métricas Calculadas' do
      attributes_table_for resource do
        row 'Taxa de Conversão Real' do
          if resource.page_views > 0
            real_rate = (resource.conversions.to_f / resource.page_views * 100).round(2)
            "#{real_rate}%"
          else
            'N/A'
          end
        end
        row 'Eficiência de Leads' do
          if resource.leads_received > 0
            efficiency = (resource.conversions.to_f / resource.leads_received * 100).round(2)
            "#{efficiency}%"
          else
            'N/A'
          end
        end
        row 'Pontuação de Performance' do
          score = [
            resource.conversion_rate * 2,
            resource.average_rating * 10,
            resource.monthly_growth > 0 ? 20 : 0,
            resource.intention_score * 0.5
          ].sum.round(0)
          status_tag "#{score} pontos", class: score > 80 ? 'ok' : score > 50 ? 'warning' : 'error'
        end
      end
    end
  end

  # Ações customizadas e relatórios avançados
  action_item :generate_report, only: :show do
    link_to 'Gerar Relatório', generate_report_admin_analytic_path(resource), 
            method: :post, class: 'button'
  end

  action_item :analytics_dashboard, only: :index do
    link_to 'Dashboard Avançado', analytics_dashboard_admin_analytics_path, 
            class: 'button'
  end

  action_item :export_trends, only: :index do
    link_to 'Exportar Tendências', export_trends_admin_analytics_path(format: :csv), 
            class: 'button'
  end

  member_action :generate_report, method: :post do
    # Gerar relatório detalhado para um provedor específico
    @analytic = resource
    @provider_analytics = Analytic.where(provider: @analytic.provider)
                                  .order(:date)
    
    respond_to do |format|
      format.html { redirect_to admin_analytic_path(resource), notice: 'Relatório gerado com sucesso!' }
      format.pdf do
        render pdf: "relatorio_#{@analytic.provider.name}_#{Date.current}",
               template: 'admin/analytics/report.pdf.erb'
      end
    end
  end

  collection_action :analytics_dashboard, method: :get do
    @dashboard_data = {
      total_metrics: {
        leads: Analytic.sum(:leads_received),
        conversions: Analytic.sum(:conversions),
        page_views: Analytic.sum(:page_views),
        avg_conversion_rate: (Analytic.average(:conversion_rate) || 0).round(2)
      },
      monthly_comparison: monthly_comparison_data,
      provider_performance: provider_performance_data,
      conversion_trends: conversion_trends_data,
      geographic_data: geographic_performance_data
    }
    render 'admin/analytics/dashboard'
  end

  collection_action :export_trends, method: :get do
    @trends_data = monthly_trends_data
    respond_to do |format|
      format.csv do
        headers['Content-Disposition'] = 'attachment; filename="analytics_trends.csv"'
        headers['Content-Type'] = 'text/csv'
        render template: 'admin/analytics/trends.csv.erb'
      end
    end
  end

  private

  def monthly_comparison_data
    current_month = Date.current.beginning_of_month..Date.current.end_of_month
    previous_month = 1.month.ago.beginning_of_month..1.month.ago.end_of_month
    
    {
      current: {
        leads: Analytic.where(date: current_month).sum(:leads_received),
        conversions: Analytic.where(date: current_month).sum(:conversions),
        page_views: Analytic.where(date: current_month).sum(:page_views)
      },
      previous: {
        leads: Analytic.where(date: previous_month).sum(:leads_received),
        conversions: Analytic.where(date: previous_month).sum(:conversions),
        page_views: Analytic.where(date: previous_month).sum(:page_views)
      }
    }
  end

  def provider_performance_data
    Analytic.joins(:provider)
            .group('providers.name')
            .select('providers.name, 
                     SUM(leads_received) as total_leads,
                     SUM(conversions) as total_conversions,
                     AVG(conversion_rate) as avg_conversion_rate,
                     AVG(average_rating) as avg_rating')
            .order('total_conversions DESC')
            .limit(20)
  end

  def conversion_trends_data
    (0..11).map do |i|
      month = i.months.ago.beginning_of_month
      month_data = Analytic.where(date: month..month.end_of_month)
      
      {
        month: month.strftime('%Y-%m'),
        month_name: month.strftime('%b %Y'),
        leads: month_data.sum(:leads_received),
        conversions: month_data.sum(:conversions),
        conversion_rate: month_data.average(:conversion_rate)&.round(2) || 0,
        page_views: month_data.sum(:page_views)
      }
    end.reverse
  end

  def geographic_performance_data
    # Assumindo que temos informação geográfica nos providers
    Provider.joins(:analytics)
            .group(:country, :state)
            .select('country, state, 
                     SUM(analytics.leads_received) as total_leads,
                     SUM(analytics.conversions) as total_conversions,
                     AVG(analytics.conversion_rate) as avg_conversion_rate')
            .order('total_conversions DESC')
  rescue
    []
  end

  # Ações em lote
  batch_action :update_conversion_rates do |ids|
    batch_action_collection.find(ids).each do |analytic|
      if analytic.page_views > 0
        real_rate = (analytic.conversions.to_f / analytic.page_views * 100).round(2)
        analytic.update(conversion_rate: real_rate)
      end
    end
    redirect_to collection_path, notice: 'Taxas de conversão atualizadas!'
  end

  # CSV export
  csv do
    column :id
    column :provider_name do |analytic|
      analytic.provider.name
    end
    column :date
    column :leads_received
    column :page_views
    column :conversions
    column :conversion_rate
    column :monthly_growth
    column :response_time
    column :average_rating
    column :total_reviews
    column :profile_views
    column :intention_score
    column :conversion_point_leads
    column :created_at
  end
end