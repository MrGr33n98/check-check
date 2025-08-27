# frozen_string_literal: true
ActiveAdmin.register_page "Dashboard" do
  menu priority: 1, label: proc { I18n.t("active_admin.dashboard") }

  content title: proc { I18n.t("active_admin.dashboard") } do
    # Tabs navigation
    div class: "tabs-container" do
      ul class: "nav nav-tabs mb-4" do
        li class: "nav-item" do
          link_to "Visão Geral", "#overview", class: "nav-link active", "data-bs-toggle": "tab"
        end
        li class: "nav-item" do
          link_to "Empresas", "#companies", class: "nav-link", "data-bs-toggle": "tab"
        end
        li class: "nav-item" do
          link_to "Leads", "#leads", class: "nav-link", "data-bs-toggle": "tab"
        end
        li class: "nav-item" do
          link_to "Avaliações", "#reviews", class: "nav-link", "data-bs-toggle": "tab"
        end
        li class: "nav-item" do
          link_to "Marketing", "#marketing", class: "nav-link", "data-bs-toggle": "tab"
        end
        li class: "nav-item" do
          link_to "Atividade", "#activity", class: "nav-link", "data-bs-toggle": "tab"
        end
        li class: "nav-item" do
          link_to "Analytics", "#analytics", class: "nav-link", "data-bs-toggle": "tab"
        end
        li class: "nav-item" do
          link_to "Banners Dinâmicos", "#dynamic-banners", class: "nav-link", "data-bs-toggle": "tab"
        end
      end
    end

    # Tab content
    div class: "tab-content" do
      # Overview Tab
      div class: "tab-pane fade show active", id: "overview" do
        # Solar Companies Overview
        columns do
          column do
            panel "Empresas de Energia Solar", class: "solar-companies-panel" do
              div class: "stats-grid" do
                div class: "stat-card total" do
                  h3 "Total de Empresas"
                  span Provider.count, class: "stat-number"
                end
                div class: "stat-card pending" do
                  h3 "Aguardando Aprovação"
                  span Provider.pending.count, class: "stat-number pending"
                end
                div class: "stat-card approved" do
                  h3 "Empresas Ativas"
                  span Provider.active.count, class: "stat-number approved"
                end
                div class: "stat-card premium" do
                  h3 "Empresas Premium"
                  span Provider.premium.count, class: "stat-number premium"
                end
              end
            end
          end
        end

        # Leads and Reviews Overview
        columns do
          column do
            panel "Leads e Conversões" do
              begin
                div class: "stats-row" do
                  div class: "stat-item" do
                    strong "Total de Leads: "
                    span Lead.count
                  end
                  div class: "stat-item" do
                    strong "Novos: "
                    span Lead.where(status: 'new_lead').count
                  end
                  div class: "stat-item" do
                    strong "Contatados: "
                    span Lead.where(status: 'contacted').count
                  end
                  div class: "stat-item" do
                    strong "Convertidos: "
                    span Lead.where(status: 'converted').count
                  end
                end
                
                if Lead.any?
                  para do
                    converted_count = Lead.where(status: 'converted').count
                    total_count = Lead.count
                    conversion_rate = total_count > 0 ? ((converted_count.to_f / total_count) * 100).round(1) : 0
                    "Taxa de conversão: #{conversion_rate}%"
                  end
                end
              rescue => e
                para "Erro ao carregar dados de leads: #{e.message}"
              end
            end
          end

          column do
            panel "Avaliações e Qualidade" do
              begin
                div class: "stats-row" do
                  div class: "stat-item" do
                    strong "Total de Avaliações: "
                    span Review.count
                  end
                  if Review.any?
                    div class: "stat-item" do
                      strong "Nota Média: "
                      avg_rating = Review.average(:rating)
                      span avg_rating ? "#{avg_rating.round(1)}/5.0" : "N/A"
                    end
                    div class: "stat-item" do
                      strong "Pendentes: "
                      span Review.where(status: 'pending').count
                    end
                    div class: "stat-item" do
                      strong "Aprovadas: "
                      span Review.where(status: 'approved').count
                    end
                  end
                end
              rescue => e
                para "Erro ao carregar dados de avaliações: #{e.message}"
              end
            end
          end
        end

        # Content and Marketing
        columns do
          column do
            panel "Conteúdo e Marketing" do
              table do
                tr do
                  td "Artigos Publicados"
                  td begin
                    Article.respond_to?(:published) ? Article.published.count : Article.count
                  rescue => e
                    "Erro: #{e.message}"
                  end
                end
                tr do
                  td "Campanhas Ativas"
                  td begin
                    Campaign.count
                  rescue => e
                    "Erro: #{e.message}"
                  end
                end
                tr do
                  td "Anúncios B2B"
                  td begin
                    B2bAd.count
                  rescue => e
                    "Erro: #{e.message}"
                  end
                end
                tr do
                  td "Itens Patrocinados"
                  td begin
                    Sponsored.respond_to?(:active) ? Sponsored.active.count : Sponsored.count
                  rescue => e
                    "Erro: #{e.message}"
                  end
                end
              end
            end
          end

          column do
            panel "Ações Rápidas" do
              div class: "quick-actions" do
                para do
                  link_to "Aprovar Empresas Pendentes", 
                          admin_providers_path(q: { status_eq: 'pending' }), 
                          class: "button primary"
                end
                para do
                  link_to "Gerenciar Campanhas", 
                          admin_campaigns_path, 
                          class: "button"
                end
                para do
                  link_to "Ver Artigos", 
                          admin_articles_path, 
                          class: "button"
                end
                para do
                  link_to "Nova Empresa", 
                          new_admin_provider_path, 
                          class: "button success"
                end
              end
            end
          end
        end
      end

      # Companies Tab
      div class: "tab-pane fade", id: "companies" do
        columns do
          column do
            panel "Cadastros Recentes de Empresas" do
              if Provider.any?
                table_for Provider.order("created_at desc").limit(15) do
                  column "Nome" do |provider|
                    link_to provider.name, admin_provider_path(provider)
                  end
                  column "País", :country
                  column "Funcionários", :members_count
                  column "Status" do |provider|
                    status_tag(provider.status_label, class: provider.status_color)
                  end
                  column "Premium" do |provider|
                    status_tag(provider.premium? ? 'Sim' : 'Não', class: (provider.premium? ? 'ok' : ''))
                  end
                  column "Cadastro", :created_at do |provider|
                    time_ago_in_words(provider.created_at) + " atrás"
                  end
                end
              else
                para "Nenhuma empresa cadastrada ainda."
              end
            end
          end
        end
      end

      # Leads Tab
      div class: "tab-pane fade", id: "leads" do
        columns do
          column do
            panel "Leads Recentes" do
              if Lead.any?
                table_for Lead.order("created_at desc").limit(15) do
                  column :name
                  column :email
                  column "Empresa" do |lead|
                    lead.respond_to?(:solution) && lead.solution ? lead.solution.name : "N/A"
                  end
                  column :status do |lead|
                    status_tag(lead.status.to_s.humanize, 
                              class: (lead.status.to_s == 'converted' ? 'ok' : 
                                     lead.status.to_s == 'contacted' ? 'warning' : ''))
                  end
                  column "Há" do |lead|
                    time_ago_in_words(lead.created_at)
                  end
                end
              else
                para "Nenhum lead registrado ainda."
              end
            end
          end
        end
      end

      # Reviews Tab
      div class: "tab-pane fade", id: "reviews" do
        columns do
          column do
            panel "Avaliações Recentes" do
              if Review.any?
                table_for Review.order("created_at desc").limit(15) do
                  column "Solução" do |review|
                    review.solution ? review.solution.name : "N/A"
                  end
                  column "Usuário" do |review|
                    review.user ? review.user.name : "N/A"
                  end
                  column :rating
                  column :title
                  column :status do |review|
                    status_tag(review.status.humanize, class: review.status)
                  end
                  column "Há" do |review|
                    time_ago_in_words(review.created_at)
                  end
                end
              else
                para "Nenhuma avaliação registrada ainda."
              end
            end
          end
        end
      end

      # Marketing Tab
      div class: "tab-pane fade", id: "marketing" do
        columns do
          column do
            panel "Campanhas Recentes" do
              if Campaign.any?
                table_for Campaign.order("created_at desc").limit(10) do
                  column :title
                  column "Produto" do |campaign|
                    campaign.product ? campaign.product.name : "N/A"
                  end
                  column :code
                  column :goal
                  column :reached
                  column "Progresso" do |campaign|
                    progress = campaign.goal > 0 ? ((campaign.reached.to_f / campaign.goal) * 100).round(1) : 0
                    div class: "progress" do
                      div class: "progress-bar", style: "width: #{progress}%", role: "progressbar" do
                        "#{progress}%"
                      end
                    end
                  end
                  column :starts_on
                  column :ends_on
                end
              else
                para "Nenhuma campanha registrada ainda."
              end
            end
          end
          
          column do
            panel "Artigos Recentes" do
              if Article.any?
                table_for Article.order("created_at desc").limit(10) do
                  column :title
                  column :author
                  column :category
                  column :status do |article|
                    if article.status
                      status_tag(article.status.humanize, class: article.status)
                    else
                      status_tag("N/A")
                    end
                  end
                  column :featured do |article|
                    status_tag(article.featured? ? 'Sim' : 'Não', class: (article.featured? ? 'ok' : ''))
                  end
                  column "Há" do |article|
                    time_ago_in_words(article.created_at)
                  end
                end
              else
                para "Nenhum artigo registrado ainda."
              end
            end
          end
        end
      end

      # Activity Tab
      div class: "tab-pane fade", id: "activity" do
        columns do
          column do
            panel "Atividade Recente" do
              begin
                h4 "Últimos Leads"
                if Lead.any?
                  table_for Lead.order("created_at desc").limit(5) do
                    column :name
                    column :email
                    column "Empresa" do |lead|
                      lead.respond_to?(:solution) && lead.solution ? lead.solution.name : "N/A"
                    end
                    column :status do |lead|
                      status_tag(lead.status.to_s.humanize, 
                                class: (lead.status.to_s == 'converted' ? 'ok' : 
                                       lead.status.to_s == 'contacted' ? 'warning' : ''))
                    end
                    column "Há" do |lead|
                      time_ago_in_words(lead.created_at)
                    end
                  end
                else
                  para "Nenhum lead registrado ainda."
                end
                
                h4 "Últimas Avaliações"
                if Review.any?
                  table_for Review.order("created_at desc").limit(5) do
                    column "Associado a" do |review|
                      if review.solution
                        link_to review.solution.name, admin_solution_path(review.solution)
                      elsif review.product
                        link_to review.product.name, admin_product_path(review.product)
                      else
                        "N/A"
                      end
                    end
                    column "Usuário" do |review|
                      review.user ? review.user.name : "N/A"
                    end
                    column :rating
                    column :title
                    column "Há" do |review|
                      time_ago_in_words(review.created_at)
                    end
                  end
                else
                  para "Nenhuma avaliação registrada ainda."
                end
                
                h4 "Últimos Artigos"
                if Article.any?
                  table_for Article.order("created_at desc").limit(5) do
                    column :title
                    column :author
                    column :category
                    column "Há" do |article|
                      time_ago_in_words(article.created_at)
                    end
                  end
                else
                  para "Nenhum artigo registrado ainda."
                end
              rescue => e
                para "Erro ao carregar atividade recente: #{e.message}"
              end
            end
          end
          
      # Analytics Tab
      div class: "tab-pane fade", id: "analytics" do
            panel "Métricas de Analytics" do
              begin
                # Estatísticas gerais de analytics
                div class: "stats-grid" do
                  total_analytics = Analytic.count
                  total_leads = Analytic.sum(:leads_received)
                  total_views = Analytic.sum(:page_views)
                  avg_conversion = Analytic.average(:conversion_rate) || 0
                  
                  div class: "stat-card total" do
                    h3 "Total de Registros"
                    div class: "stat-number" do
                      total_analytics
                    end
                  end
                  
                  div class: "stat-card" do
                    h3 "Total de Leads"
                    div class: "stat-number" do
                      total_leads
                    end
                  end
                  
                  div class: "stat-card" do
                    h3 "Total de Visualizações"
                    div class: "stat-number" do
                      number_with_delimiter(total_views)
                    end
                  end
                  
                  div class: "stat-card" do
                    h3 "Taxa de Conversão Média"
                    div class: "stat-number" do
                      "#{avg_conversion.round(2)}%"
                    end
                  end
                end
                
                h4 "Top 10 Provedores por Leads"
                if Provider.joins(:analytics).any?
                  table_for Provider.joins(:analytics)
                                  .select("providers.*, SUM(analytics.leads_received) as total_leads")
                                  .group("providers.id")
                                  .order("total_leads DESC")
                                  .limit(10) do
                    column "Provedor" do |provider|
                      link_to provider.company_name, admin_provider_path(provider)
                    end
                    column "Total de Leads" do |provider|
                      provider.total_leads || 0
                    end
                    column "Status" do |provider|
                      status_tag(provider.status.humanize, 
                                class: (provider.status == 'approved' ? 'ok' : 
                                       provider.status == 'pending' ? 'warning' : 'error'))
                    end
                    column "Última Atualização" do |provider|
                      last_analytic = provider.analytics.order(:date).last
                      last_analytic ? time_ago_in_words(last_analytic.date) : "N/A"
                    end
                  end
                else
                  para "Nenhum dado de analytics disponível ainda."
                end
                
                h4 "Métricas Recentes (Últimos 30 dias)"
                recent_analytics = Analytic.where("date >= ?", 30.days.ago).order(:date)
                if recent_analytics.any?
                  table_for recent_analytics.limit(20) do
                    column "Data" do |analytic|
                      analytic.date.strftime("%d/%m/%Y")
                    end
                    column "Provedor" do |analytic|
                      link_to analytic.provider.company_name, admin_provider_path(analytic.provider)
                    end
                    column "Leads" do |analytic|
                      analytic.leads_received
                    end
                    column "Visualizações" do |analytic|
                      number_with_delimiter(analytic.page_views)
                    end
                    column "Conversões" do |analytic|
                      analytic.conversions
                    end
                    column "Taxa Conversão" do |analytic|
                      "#{analytic.conversion_rate}%"
                    end
                    column "Crescimento" do |analytic|
                      growth = analytic.monthly_growth
                      span class: (growth >= 0 ? "status_tag ok" : "status_tag error") do
                        "#{growth >= 0 ? '+' : ''}#{growth}%"
                      end
                    end
                  end
                else
                  para "Nenhuma métrica recente disponível."
                end
                
                # Ações rápidas para analytics
                div class: "quick-actions", style: "margin-top: 20px;" do
                  h4 "Ações Rápidas"
                  link_to "Ver Todos os Analytics", admin_analytics_path, class: "button primary"
                  text_node " "
                  link_to "Gerar Relatório", admin_analytics_path(format: :csv), class: "button success"
                  text_node " "
                  link_to "Configurar Métricas", "#", class: "button", onclick: "alert('Funcionalidade em desenvolvimento')"
                end
                
              rescue => e
                para "Erro ao carregar dados de analytics: #{e.message}"
              end
            end
          end
        end
      end

      # Dynamic Banners Tab
      div class: "tab-pane fade", id: "dynamic-banners" do
        columns do
          column do
            panel "Banners Dinâmicos Ativos" do
              begin
                active_banners = DynamicBanner.active.ordered
                if active_banners.any?
                  div class: "banners-grid" do
                    active_banners.each do |banner|
                      div class: "banner-card" do
                        if banner.image.attached?
                          div class: "banner-image" do
                            image_tag banner.image, style: "width: 100%; height: 120px; object-fit: cover; border-radius: 4px;"
                          end
                        end
                        div class: "banner-content" do
                          h4 banner.title
                          p truncate(banner.description, length: 80)
                          div class: "banner-meta" do
                            span "Ordem: #{banner.display_order}", class: "badge"
                            span "Ativo", class: "status-tag ok"
                          end
                          div class: "banner-actions" do
                            link_to "Editar", edit_admin_dynamic_banner_path(banner), class: "button small"
                            link_to "Ver", admin_dynamic_banner_path(banner), class: "button small secondary"
                          end
                        end
                      end
                    end
                  end
                else
                  div class: "empty-state" do
                    h3 "Nenhum banner ativo"
                    p "Crie seu primeiro banner dinâmico para começar a exibir conteúdo promocional na homepage."
                    link_to "Criar Primeiro Banner", new_admin_dynamic_banner_path, class: "button primary"
                  end
                end
              rescue => e
                para "Erro ao carregar banners: #{e.message}"
              end
            end
          end

          column do
            panel "Estatísticas dos Banners" do
              begin
                total_banners = DynamicBanner.count
                active_banners = DynamicBanner.active.count
                inactive_banners = DynamicBanner.inactive.count

                div class: "stats-grid" do
                  div class: "stat-card total" do
                    h3 "Total de Banners"
                    span total_banners, class: "stat-number"
                  end
                  div class: "stat-card approved" do
                    h3 "Banners Ativos"
                    span active_banners, class: "stat-number approved"
                  end
                  div class: "stat-card pending" do
                    h3 "Banners Inativos"
                    span inactive_banners, class: "stat-number pending"
                  end
                end

                h4 "Ações Rápidas"
                div class: "quick-actions" do
                  para do
                    link_to "Criar Novo Banner", new_admin_dynamic_banner_path, class: "button primary"
                  end
                  para do
                    link_to "Gerenciar Todos", admin_dynamic_banners_path, class: "button"
                  end
                  para do
                    link_to "Ver no Site", root_path, target: "_blank", class: "button secondary"
                  end
                end
              rescue => e
                para "Erro ao carregar estatísticas: #{e.message}"
              end
            end

            panel "Banners Recentes" do
              begin
                recent_banners = DynamicBanner.order("created_at desc").limit(5)
                if recent_banners.any?
                  table_for recent_banners do
                    column "Título" do |banner|
                      link_to truncate(banner.title, length: 30), admin_dynamic_banner_path(banner)
                    end
                    column "Status" do |banner|
                      status_tag(banner.active? ? "Ativo" : "Inativo", banner.active? ? :ok : :error)
                    end
                    column "Ordem", :display_order
                    column "Criado" do |banner|
                      time_ago_in_words(banner.created_at) + " atrás"
                    end
                  end
                else
                  para "Nenhum banner criado ainda."
                end
              rescue => e
                para "Erro ao carregar banners recentes: #{e.message}"
              end
            end
          end
        end
      end
    end

    # Custom CSS for better styling
    text_node %{
      <style>
        .tabs-container .nav-tabs .nav-link {
          color: #666;
          border: 1px solid transparent;
          border-bottom: 3px solid transparent;
        }
        
        .tabs-container .nav-tabs .nav-link:hover {
          border-color: #e9ecef #e9ecef #dee2e6;
        }
        
        .tabs-container .nav-tabs .nav-link.active {
          color: #007cba;
          border-bottom: 3px solid #007cba;
          background-color: transparent;
        }
        
        .solar-companies-panel .panel_contents {
          padding: 20px;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .stat-card {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          border-left: 4px solid #ddd;
        }
        
        .stat-card.total { border-left-color: #007cba; }
        .stat-card.pending { border-left-color: #ff9500; }
        .stat-card.approved { border-left-color: #5cb85c; }
        .stat-card.premium { border-left-color: #f0ad4e; }
        
        .stat-card h3 {
          margin: 0 0 10px 0;
          font-size: 14px;
          color: #666;
          font-weight: normal;
        }
        
        .stat-number {
          font-size: 32px;
          font-weight: bold;
          color: #333;
        }
        
        .stat-number.pending { color: #ff9500; }
        .stat-number.approved { color: #5cb85c; }
        .stat-number.premium { color: #f0ad4e; }
        
        .stats-row {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 15px;
        }
        
        .stat-item {
          flex: 1;
          min-width: 150px;
        }
        
        .quick-actions .button {
          display: inline-block;
          padding: 8px 16px;
          margin: 5px 0;
          text-decoration: none;
          border-radius: 4px;
          background: #007cba;
          color: white;
          border: none;
          cursor: pointer;
        }
        
        .quick-actions .button.primary {
          background: #007cba;
        }
        
        .quick-actions .button.success {
          background: #5cb85c;
        }
        
        .quick-actions .button:hover {
          opacity: 0.9;
        }
        
        .progress {
          height: 20px;
          background-color: #e9ecef;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .progress-bar {
          height: 100%;
          background-color: #007cba;
          color: white;
          text-align: center;
          font-size: 12px;
          line-height: 20px;
        }
        
        .banners-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .banner-card {
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.2s ease;
        }
        
        .banner-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        
        .banner-image {
          width: 100%;
          height: 120px;
          overflow: hidden;
        }
        
        .banner-content {
          padding: 15px;
        }
        
        .banner-content h4 {
          margin: 0 0 8px 0;
          font-size: 16px;
          color: #333;
          font-weight: 600;
        }
        
        .banner-content p {
          margin: 0 0 12px 0;
          color: #666;
          font-size: 14px;
          line-height: 1.4;
        }
        
        .banner-meta {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }
        
        .banner-meta .badge {
          background: #e9ecef;
          color: #495057;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .banner-actions {
          display: flex;
          gap: 8px;
        }
        
        .banner-actions .button {
          padding: 6px 12px;
          font-size: 12px;
          text-decoration: none;
          border-radius: 4px;
          border: 1px solid #007cba;
          background: #007cba;
          color: white;
          cursor: pointer;
        }
        
        .banner-actions .button.secondary {
          background: transparent;
          color: #007cba;
        }
        
        .banner-actions .button:hover {
          opacity: 0.9;
        }
        
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 2px dashed #dee2e6;
        }
        
        .empty-state h3 {
          margin: 0 0 10px 0;
          color: #6c757d;
          font-weight: 500;
        }
        
        .empty-state p {
          margin: 0 0 20px 0;
          color: #6c757d;
        }
        
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-row {
            flex-direction: column;
          }
          
          .tabs-container .nav-tabs .nav-item {
            width: 100%;
            text-align: center;
          }
          
          .banners-grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
    }.html_safe
  end
end