ActiveAdmin.register Provider do
  permit_params :name, :seo_url, :title, :short_description, :country, :address, 
                :phone, :members_count, :foundation_year, :premium_until, :revenue,
                :status, :approval_notes,
                social_links: [], tags: [], category_ids: [], subcategory_ids: []

  # Scopes for filtering
  scope :all, default: true
  scope :pending
  scope :active
  scope :rejected
  scope :suspended

  action_item :approve, only: :show, if: proc{ resource.can_be_approved? } do
    button_to "Aprovar Empresa", approve_admin_provider_path(resource), 
              method: :patch, class: "button primary",
              data: { confirm: "Tem certeza que deseja aprovar esta empresa?" }
  end

  controller do
    def find_resource
      Provider.friendly.find(params[:id])
    end
  end

  index do
    selectable_column
    id_column
    column :name do |provider|
      link_to provider.name, admin_provider_path(provider)
    end
    column :country
    column :members_count
    column :foundation_year
    column "Status" do |provider|
      status_tag(provider.status_label, class: provider.status_color.to_s)
    end
    column :premium? do |provider|
      status_tag(provider.premium? ? 'Premium' : 'Free', class: (provider.premium? ? 'ok' : ''))
    end
    column "Aprovado por" do |provider|
      provider.approved_by&.email if provider.approved_at
    end
    column :created_at do |provider|
      time_ago_in_words(provider.created_at) + " atrás"
    end
    actions do |provider|
      if provider.can_be_approved?
        item "Aprovar", approve_admin_provider_path(provider), method: :patch, class: "approve-btn"
      end
      if provider.can_be_rejected?
        item "Rejeitar", reject_admin_provider_path(provider), method: :patch, class: "reject-btn"
      end
      if provider.can_be_suspended?
        item "Suspender", suspend_admin_provider_path(provider), method: :patch, class: "suspend-btn"
      end
    end
  end

  filter :name
  filter :country
  filter :foundation_year
  filter :status, as: :select, collection: Provider.statuses.map { |k, v| [k.humanize, v] }
  filter :premium_until
  filter :approved_by, as: :select, collection: -> { AdminUser.all.map { |u| [u.email, u.id] } }
  filter :created_at

  form do |f|
    f.inputs "Informações da Empresa" do
      f.input :name, label: "Nome da Empresa"
      f.input :seo_url, label: "URL SEO"
      f.input :title, label: "Título"
      f.input :short_description, as: :text, label: "Descrição Resumida"
      f.input :country, as: :string, label: "País"
      f.input :address, label: "Endereço"
      f.input :phone, label: "Telefone"
      f.input :members_count, label: "Número de Funcionários"
      f.input :foundation_year, label: "Ano de Fundação"
      f.input :revenue, label: "Receita"
      f.input :social_links_list, as: :string, label: "Links Sociais (separados por vírgula)"
      f.input :tags_list, as: :string, label: "Tags (separadas por vírgula)"
    end
    
    f.inputs "Premium e Status" do
      f.input :premium_until, as: :datepicker, label: "Premium até"
      if f.object.persisted?
        f.input :status, as: :select, collection: Provider.statuses.map { |k, v| [k.humanize, v] }, 
                include_blank: false, label: "Status"
        f.input :approval_notes, as: :text, label: "Notas de Aprovação"
      end
    end

    f.inputs "Categorias Principais" do
      f.input :categories, as: :check_boxes, collection: Category.all.map { |c| [c.name, c.id] }
    end

    f.actions
  end

  show do
    columns do
      column do
        attributes_table do
          row :name
          row :seo_url
          row :title
          row :short_description
          row :country
          row :address
          row :phone
          row :members_count
          row :foundation_year
          row :company_age
          row :revenue
          row :social_links_list
          row :tags_list
          row :categories do |provider|
            provider.categories.map(&:name).join(", ")
          end
          row :created_at
          row :updated_at
        end
      end
      
      column do
        panel "Status e Aprovação" do
          attributes_table_for provider do
            row "Status" do
              status_tag(provider.status_label, class: provider.status_color.to_s)
            end
            row "Premium" do
              status_tag(provider.premium? ? 'Sim' : 'Não', class: (provider.premium? ? 'ok' : ''))
            end
            row :premium_until if provider.premium_until
            row "Aprovado por" do
              provider.approved_by&.email if provider.approved_by
            end
            row "Data de Aprovação" do
              provider.approved_at&.strftime("%d/%m/%Y às %H:%M") if provider.approved_at
            end
            row "Notas de Aprovação" do
              simple_format(provider.approval_notes) if provider.approval_notes.present?
            end
          end
          
          div class: "approval-actions", style: "margin-top: 20px;" do
            # Buttons are now handled by action_item
          end
        end
      end
    end
    
    active_admin_comments
  end

  # Custom actions
  member_action :approve, method: :patch do
    notes = params[:notes] || "Aprovado automaticamente pelo administrador"
    resource.approve!(current_admin_user, notes)
    redirect_to admin_provider_path(resource), notice: "Empresa aprovada com sucesso!"
  end

  member_action :reject, method: :patch do
    notes = params[:notes] || "Rejeitado pelo administrador"
    resource.reject!(current_admin_user, notes)
    redirect_to admin_provider_path(resource), notice: "Empresa rejeitada."
  end

  member_action :suspend, method: :patch do
    notes = params[:notes] || "Suspensa pelo administrador"
    resource.suspend!(current_admin_user, notes)
    redirect_to admin_provider_path(resource), notice: "Empresa suspensa."
  end

  # Batch actions
  batch_action :approve_selected do |ids|
    batch_action_collection.find(ids).each do |provider|
      provider.approve!(current_admin_user, "Aprovação em lote") if provider.can_be_approved?
    end
    redirect_to collection_path, notice: "#{ids.count} empresas foram aprovadas."
  end

  batch_action :reject_selected do |ids|
    batch_action_collection.find(ids).each do |provider|
      provider.reject!(current_admin_user, "Rejeição em lote") if provider.can_be_rejected?
    end
    redirect_to collection_path, notice: "#{ids.count} empresas foram rejeitadas."
  end
end