# frozen_string_literal: true
ActiveAdmin.register_page "Dashboard" do
  menu priority: 1, label: proc { I18n.t("active_admin.dashboard") }

  content title: proc { I18n.t("active_admin.dashboard") } do
    # Simple dashboard without complex JavaScript
    columns do
      column do
        panel "Estatísticas Gerais" do
          table_for [] do
            tr do
              td "Total de Empresas"
              td Provider.count
            end
            tr do
              td "Total de Leads"
              td Lead.count
            end
            tr do
              td "Total de Reviews"
              td Review.count
            end
            tr do
              td "Total de Artigos"
              td Article.count
            end
          end
        end
      end
      
      column do
        panel "Empresas Recentes" do
          if Provider.exists?
            table_for Provider.limit(5).order(created_at: :desc) do
              column :name
              column :status
              column :created_at
            end
          else
            para "Nenhuma empresa cadastrada"
          end
        end
      end
    end
    
    columns do
      column do
        panel "Leads Recentes" do
          if Lead.exists?
            table_for Lead.limit(5).order(created_at: :desc) do
              column :name
              column :email
              column :status
              column :created_at
            end
          else
            para "Nenhum lead cadastrado"
          end
        end
      end
      
      column do
        panel "Reviews Recentes" do
          if Review.exists?
            table_for Review.limit(5).order(created_at: :desc) do
              column :title
              column :rating
              column :status
              column :created_at
            end
          else
            para "Nenhuma review cadastrada"
          end
        end
      end
    end
  end
end