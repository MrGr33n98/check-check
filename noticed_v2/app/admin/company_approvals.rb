ActiveAdmin.register_page "Company Approvals" do
  menu parent: "Empresas", label: "Aprovações Pendentes", priority: 2

  content title: "Aprovação de Empresas" do
    # Add button to create new company
    div class: "action_items" do
      span do
        link_to "Cadastrar Nova Empresa", new_admin_provider_path, class: "button"
      end
    end

    pending_providers = Provider.pending.order(:created_at)
    
    if pending_providers.any?
      table_for pending_providers do
        column :name do |provider|
          link_to provider.name, admin_provider_path(provider)
        end
        column :country
        column :foundation_year
        column "Status" do |provider|
          status_tag(provider.status_label, class: provider.status_color.to_s)
        end
        column "Ações" do |provider|
          span do
            link_to "Aprovar", approve_admin_provider_path(provider), 
                    method: :patch, class: "member_link",
                    data: { confirm: "Tem certeza que deseja aprovar esta empresa?" }
          end
          span do
            link_to "Rejeitar", reject_admin_provider_path(provider), 
                    method: :patch, class: "member_link",
                    data: { confirm: "Tem certeza que deseja rejeitar esta empresa?" }
          end
          span do
            link_to "Revisar", admin_provider_path(provider), class: "member_link"
          end
        end
      end
    else
      div class: "no-pending" do
        h2 "🎉 Nenhuma empresa aguardando aprovação!"
        p "Todas as empresas foram processadas."
        para do
          link_to "Ver todas as empresas", admin_providers_path, class: "button"
        end
      end
    end

    # Custom CSS
    text_node %{
      <style>
        .approval-dashboard {
          max-width: 1200px;
        }
        
        .approval-card {
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          margin-bottom: 20px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .approval-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }
        
        .approval-header h3 {
          margin: 0;
          color: #333;
        }
        
        .approval-header h3 a {
          color: #007cba;
          text-decoration: none;
        }
        
        .timestamp {
          color: #666;
          font-size: 14px;
        }
        
        .approval-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .company-info table {
          width: 100%;
        }
        
        .company-info td {
          padding: 5px 0;
          vertical-align: top;
        }
        
        .company-info td:first-child {
          font-weight: bold;
          width: 100px;
        }
        
        .company-description h4,
        .company-tags h4 {
          margin: 0 0 10px 0;
          color: #333;
        }
        
        .company-tags .tag {
          display: inline-block;
          background: #f0f0f0;
          padding: 4px 8px;
          margin: 2px;
          border-radius: 4px;
          font-size: 12px;
        }
        
        .approval-actions {
          border-top: 1px solid #eee;
          padding-top: 15px;
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }
        
        .approval-actions textarea {
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 8px;
          font-family: inherit;
        }
        
        .approval-actions .button {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
        }
        
        .approval-actions .button.primary {
          background: #5cb85c;
          color: white;
        }
        
        .approval-actions .button.danger {
          background: #d9534f;
          color: white;
        }
        
        .approval-actions .button:hover {
          opacity: 0.9;
        }
        
        .no-pending {
          text-align: center;
          padding: 60px 20px;
          background: white;
          border-radius: 8px;
          border: 1px solid #ddd;
        }
        
        .no-pending h2 {
          color: #5cb85c;
          margin-bottom: 10px;
        }
        
        @media (max-width: 768px) {
          .approval-content {
            grid-template-columns: 1fr;
          }
          
          .approval-actions {
            flex-direction: column;
          }
          
          .approval-actions form {
            width: 100%;
          }
          
          .approval-actions textarea {
            width: 100% !important;
            margin-bottom: 10px !important;
          }
        }
      </style>
    }.html_safe
  end
end