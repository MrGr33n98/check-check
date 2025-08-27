ActiveAdmin.register User do
  permit_params :email, :name, :password, :password_confirmation, :approved, :corporate_email, :company_name, :position

  # Scopes for filtering
  scope :all, default: true
  scope "Usuários Corporativos", :corporate_users
  scope "Aguardando Aprovação", :pending_approval
  scope "Aprovados", :approved_users

  index do
    selectable_column
    id_column
    column :name
    column :email
    column "Tipo" do |user|
      if user.corporate_email?
        status_tag('Corporativo', class: 'info')
      else
        status_tag('Regular', class: 'default')
      end
    end
    column "Empresa" do |user|
      user.company_name if user.corporate_email?
    end
    column "Status" do |user|
      status_tag(user.approved? ? 'Aprovado' : 'Pendente', class: (user.approved? ? 'ok' : 'warning'))
    end
    column :created_at
    actions do |user|
      if user.corporate_email? && !user.approved?
        item "Aprovar Acesso", approve_corporate_admin_user_path(user), method: :patch, class: "approve-btn"
      end
    end
  end

  filter :name
  filter :email
  filter :corporate_email, as: :select, collection: [["Sim", true], ["Não", false]]
  filter :approved, as: :select, collection: [["Aprovado", true], ["Pendente", false]]
  filter :company_name
  filter :created_at

  show do
    columns do
      column do
        attributes_table do
          row :name
          row :email
          row "Tipo de Usuário" do |user|
            status_tag(user.corporate_email? ? 'Corporativo' : 'Regular', 
                       class: user.corporate_email? ? 'info' : 'default')
          end
          row :company_name if resource.corporate_email?
          row :position if resource.corporate_email?
          row "Status" do |user|
            status_tag(user.approved? ? 'Aprovado' : 'Pendente', 
                       class: user.approved? ? 'ok' : 'warning')
          end
          row :created_at
          row :updated_at
        end
      end
      
      column do
        if resource.corporate_email?
          panel "Informações Corporativas" do
            attributes_table_for resource do
              row "Empresa Associada" do
                if resource.provider
                  link_to resource.provider.name, admin_provider_path(resource.provider)
                else
                  "Nenhuma empresa associada"
                end
              end
              row "Status da Empresa" do
                if resource.provider
                  status_tag(resource.provider.status_label, class: resource.provider.status_color.to_s)
                else
                  "N/A"
                end
              end
            end
          end
        end
      end
    end
     active_admin_comments
   end

  form do |f|
    f.inputs "Informações do Usuário" do
      f.input :name, label: "Nome"
      f.input :email, label: "Email"
      f.input :password, label: "Senha"
      f.input :password_confirmation, label: "Confirmação da Senha"
      f.input :approved, label: "Aprovado"
    end
    
    f.inputs "Informações Corporativas" do
      f.input :corporate_email, label: "Usuário Corporativo?"
      f.input :company_name, label: "Nome da Empresa"
      f.input :position, label: "Cargo"
    end
    
    f.actions
  end

  # Action item to approve/unapprove users
  action_item :approve, only: :show do
    if resource.corporate_email? && !resource.approved?
      link_to "Aprovar Acesso Corporativo", approve_corporate_admin_user_path(resource), 
              method: :patch, class: "button primary",
              data: { confirm: "Tem certeza que deseja aprovar o acesso corporativo deste usuário?" }
    elsif resource.approved?
      link_to "Desaprovar Usuário", unapprove_admin_user_path(resource), method: :patch
    else
      link_to "Aprovar Usuário", approve_admin_user_path(resource), method: :patch
    end
  end

  # Member actions to approve/unapprove users
  member_action :approve, method: :patch do
    resource.update(approved: true)
    redirect_to admin_user_path(resource), notice: "Usuário aprovado!"
  end

  member_action :unapprove, method: :patch do
    resource.update(approved: false)
    redirect_to admin_user_path(resource), notice: "Usuário desaprovado!"
  end

  member_action :approve_corporate, method: :patch do
    if resource.corporate_email?
      # Aprovar o usuário
      resource.update!(approved: true)
      
      # Buscar ou criar empresa associada
      if resource.company_name.present?
        provider = Provider.find_or_create_by(name: resource.company_name) do |p|
          p.country = "Brasil"
          p.foundation_year = Date.current.year
          p.members_count = 1
          p.status = 'pending'
          p.short_description = "Empresa cadastrada via usuário corporativo"
        end
        
        # Criar associação entre usuário e empresa
        CompanyMember.find_or_create_by(user: resource, provider: provider) do |cm|
          cm.state = 'active'
        end
        
        redirect_to admin_user_path(resource), 
                   notice: "Usuário corporativo aprovado! Empresa '#{provider.name}' foi criada/associada."
      else
        redirect_to admin_user_path(resource), 
                   notice: "Usuário aprovado, mas nenhuma empresa foi especificada."
      end
    else
      redirect_to admin_user_path(resource), 
                 alert: "Este usuário não é um usuário corporativo."
    end
  end

  controller do
    def update
      if params[:user][:password].blank? && params[:user][:password_confirmation].blank?
        params[:user].delete("password")
        params[:user].delete("password_confirmation")
      end
      super
    end
  end
end
