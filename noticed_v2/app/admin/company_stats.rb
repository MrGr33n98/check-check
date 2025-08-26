ActiveAdmin.register_page "Company Stats" do
  menu parent: "Empresas", label: "Estatísticas", priority: 3

  content title: "Estatísticas das Empresas" do
    # Calculate stats
    total_companies = Provider.count
    pending_companies = Provider.pending.count
    active_companies = Provider.active.count
    rejected_companies = Provider.rejected.count
    suspended_companies = Provider.suspended.count
    premium_companies = Provider.premium.count
    
    # Recent registrations (last 30 days)
    recent_registrations = Provider.where('created_at >= ?', 30.days.ago).count
    
    # Average approval time
    approved_companies = Provider.where.not(approved_at: nil)
    avg_approval_time = if approved_companies.any?
      approved_companies.average('EXTRACT(EPOCH FROM (approved_at - created_at))/86400').to_f.round(1)
    else
      0
    end

    columns do
      column do
        panel "Visão Geral" do
          div class: "stats-overview" do
            div class: "stat-box total" do
              h3 "Total de Empresas"
              span total_companies, class: "stat-number"
            end
            
            div class: "stat-box pending" do
              h3 "Aguardando Aprovação"
              span pending_companies, class: "stat-number"
              if total_companies > 0
                small "#{((pending_companies.to_f / total_companies) * 100).round(1)}%"
              end
            end
            
            div class: "stat-box active" do
              h3 "Empresas Ativas"
              span active_companies, class: "stat-number"
              if total_companies > 0
                small "#{((active_companies.to_f / total_companies) * 100).round(1)}%"
              end
            end
            
            div class: "stat-box premium" do
              h3 "Empresas Premium"
              span premium_companies, class: "stat-number"
              if active_companies > 0
                small "#{((premium_companies.to_f / active_companies) * 100).round(1)}% das ativas"
              end
            end
          end
        end
      end
    end

    columns do
      column do
        panel "Métricas de Aprovação" do
          table do
            tr do
              td "Tempo médio de aprovação:"
              td "#{avg_approval_time} dias"
            end
            tr do
              td "Empresas rejeitadas:"
              td "#{rejected_companies} (#{total_companies > 0 ? ((rejected_companies.to_f / total_companies) * 100).round(1) : 0}%)"
            end
            tr do
              td "Empresas suspensas:"
              td "#{suspended_companies}"
            end
            tr do
              td "Cadastros nos últimos 30 dias:"
              td recent_registrations
            end
          end
        end
      end

      column do
        panel "Distribuição por País" do
          country_stats = Provider.group(:country).count.sort_by { |_, count| -count }.first(10)
          if country_stats.any?
            table do
              country_stats.each do |country, count|
                tr do
                  td country
                  td count
                  td "#{((count.to_f / total_companies) * 100).round(1)}%"
                end
              end
            end
          else
            para "Nenhuma empresa cadastrada ainda."
          end
        end
      end
    end

    columns do
      column do
        panel "Empresas por Ano de Fundação" do
          foundation_stats = Provider.where.not(foundation_year: nil)
                                   .group(:foundation_year)
                                   .count
                                   .sort_by { |year, _| -year }
                                   .first(10)
          
          if foundation_stats.any?
            table do
              foundation_stats.each do |year, count|
                tr do
                  td year
                  td count
                  td "#{Date.current.year - year} anos"
                end
              end
            end
          else
            para "Nenhum dado de fundação disponível."
          end
        end
      end

      column do
        panel "Tamanho das Empresas" do
          size_ranges = [
            ['1-10', Provider.where(members_count: 1..10).count],
            ['11-50', Provider.where(members_count: 11..50).count],
            ['51-100', Provider.where(members_count: 51..100).count],
            ['101-500', Provider.where(members_count: 101..500).count],
            ['500+', Provider.where('members_count > 500').count]
          ]
          
          table do
            size_ranges.each do |range, count|
              next if count == 0
              tr do
                td "#{range} funcionários"
                td count
                td "#{((count.to_f / total_companies) * 100).round(1)}%"
              end
            end
          end
        end
      end
    end

    # Recent activity
    columns do
      column do
        panel "Atividade Recente" do
          recent_providers = Provider.order(created_at: :desc).limit(10)
          
          if recent_providers.any?
            table_for recent_providers do
              column "Empresa" do |provider|
                link_to provider.name, admin_provider_path(provider)
              end
              column "Status" do |provider|
                status_tag(provider.status_label, class: provider.status_color)
              end
              column "País", :country
              column "Cadastro" do |provider|
                "#{time_ago_in_words(provider.created_at)} atrás"
              end
            end
          else
            para "Nenhuma atividade recente."
          end
        end
      end
    end

    # Custom CSS
    text_node %{
      <style>
        .stats-overview {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .stat-box {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          border-left: 4px solid #ddd;
        }
        
        .stat-box.total { border-left-color: #007cba; }
        .stat-box.pending { border-left-color: #ff9500; }
        .stat-box.active { border-left-color: #5cb85c; }
        .stat-box.premium { border-left-color: #f0ad4e; }
        
        .stat-box h3 {
          margin: 0 0 10px 0;
          font-size: 14px;
          color: #666;
          font-weight: normal;
        }
        
        .stat-number {
          font-size: 32px;
          font-weight: bold;
          color: #333;
          display: block;
        }
        
        .stat-box small {
          color: #888;
          font-size: 12px;
          margin-top: 5px;
          display: block;
        }
        
        @media (max-width: 768px) {
          .stats-overview {
            grid-template-columns: 1fr;
          }
        }
      </style>
    }.html_safe
  end
end