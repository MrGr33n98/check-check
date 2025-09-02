require 'csv'

ActiveAdmin.register Provider do
  permit_params :name, :seo_url, :title, :short_description, :country, :address, 
                :phone, :members_count, :foundation_year, :premium_until, :revenue,
                :status, :approval_notes, :logo, :cover_image, :banner_image, :city, :state,
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
      id_param = params[:id]
      if id_param.to_i.to_s == id_param # Check if it's an integer string
        Provider.find(id_param)
      else
        Provider.friendly.find(id_param)
      end
    rescue ActiveRecord::RecordNotFound
      raise # Re-raise the exception if not found by either method
    end
  end

  index do
    selectable_column
    id_column
    column :name do |provider|
      link_to provider.name, admin_provider_path(provider)
    end
    column "Logo" do |provider|
      if provider.logo.attached?
        image_tag provider.logo, style: "width: 40px; height: 40px; object-fit: contain; border: 1px solid #ddd; border-radius: 4px; background: white;"
      else
        span "—", style: "color: #999;"
      end
    end
    column :country
    column :city
    column :state
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

  # Add action items for CSV import
  action_item :import_csv, only: :index do
    link_to 'Importar CSV', import_csv_admin_providers_path, class: 'button'
  end

  action_item :download_template, only: :index do
    link_to 'Baixar Template CSV', download_csv_template_admin_providers_path, class: 'button'
  end

  filter :name
  filter :country
  filter :foundation_year
  filter :status, as: :select, collection: Provider.statuses.map { |k, v| [k.humanize, v] }
  filter :premium_until
  filter :approved_by, as: :select, collection: -> { AdminUser.all.map { |u| [u.email, u.id] } }
  filter :created_at
  filter :city_cont, as: :string, label: "Cidade (contém)"
  filter :state_cont, as: :string, label: "Estado (UF) (contém)"

  form do |f|
    f.inputs "Informações da Empresa" do
      f.input :name, label: "Nome da Empresa"
      f.input :seo_url, label: "URL SEO"
      f.input :title, label: "Título"
      f.input :short_description, as: :text, label: "Descrição Resumida"
      f.input :country, as: :string, label: "País"
      f.input :address, label: "Endereço"
      f.input :city, label: "Cidade"
      f.input :state, label: "Estado (UF)"
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

    f.inputs "Personalização Visual" do
      f.input :logo, as: :file, label: "Logo da Empresa", hint: "Formato recomendado: PNG ou JPG, tamanho máximo: 2MB"
      if f.object.logo.attached?
        div class: "current-image" do
          h4 "Logo Atual:"
          image_tag f.object.logo, style: "max-width: 200px; max-height: 100px; margin: 10px 0;"
        end
      end
      
      f.input :cover_image, as: :file, label: "Imagem de Capa", hint: "Formato recomendado: JPG, tamanho máximo: 5MB"
      if f.object.cover_image.attached?
        div class: "current-image" do
          h4 "Imagem de Capa Atual:"
          image_tag f.object.cover_image, style: "max-width: 300px; max-height: 150px; margin: 10px 0;"
        end
      end
      
      f.input :banner_image, as: :file, label: "Banner do Card", hint: "Imagem de fundo para o card da empresa. Resolução recomendada: 800x200px (proporção 4:1). Formato: JPG/PNG, tamanho máximo: 500KB"
      if f.object.banner_image.attached?
        div class: "current-image" do
          h4 "Banner Atual:"
          image_tag f.object.banner_image, style: "max-width: 300px; max-height: 150px; margin: 10px 0; border-radius: 8px;"
          p style: "font-style: italic; color: #666; margin-top: 5px;" do
            "Esta imagem aparecerá como fundo do card da empresa (800x200px recomendado), com o logo sobreposto."
          end
        end
      end
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
          row :city
          row :state
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
        panel "Imagens da Empresa" do
          if provider.logo.attached?
            div class: "logo-preview", style: "margin-bottom: 20px;" do
              h4 "Logo da Empresa:"
              image_tag provider.logo, style: "max-width: 200px; max-height: 100px; border: 1px solid #ddd; border-radius: 4px; padding: 10px; background: white;"
              div style: "margin-top: 10px; font-size: 12px; color: #666;" do
                "Arquivo: #{provider.logo.filename}"
                br
                "Tamanho: #{ActionController::Base.helpers.number_to_human_size(provider.logo.byte_size)}"
              end
            end
          else
            div class: "no-logo", style: "margin-bottom: 20px; padding: 20px; background: #f9f9f9; border: 1px dashed #ccc; text-align: center;" do
              span style: "color: #999;" do
                "Nenhum logo anexado"
              end
            end
          end
          
          if provider.cover_image.attached?
            div class: "cover-preview", style: "margin-bottom: 20px;" do
              h4 "Imagem de Capa:"
              image_tag provider.cover_image, style: "max-width: 300px; max-height: 150px; border: 1px solid #ddd; border-radius: 4px;"
              div style: "margin-top: 10px; font-size: 12px; color: #666;" do
                "Arquivo: #{provider.cover_image.filename}"
                br
                "Tamanho: #{ActionController::Base.helpers.number_to_human_size(provider.cover_image.byte_size)}"
              end
            end
          end
          
          if provider.banner_image.attached?
            div class: "banner-preview", style: "margin-bottom: 20px;" do
              h4 "Banner do Card:"
              image_tag provider.banner_image, style: "max-width: 300px; max-height: 150px; border: 1px solid #ddd; border-radius: 8px;"
              div style: "margin-top: 10px; font-size: 12px; color: #666;" do
                "Arquivo: #{provider.banner_image.filename}"
                br
                "Tamanho: #{ActionController::Base.helpers.number_to_human_size(provider.banner_image.byte_size)}"
              end
            end
          end
        end
        
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

  # Collection actions
  collection_action :import_csv, method: :get do
    render 'admin/providers/import_csv'
  end

  collection_action :process_csv_import, method: :post do
    if params[:csv_file].present?
      begin
        imported_count = 0
        errors = []
        skipped_count = 0
        line_number = 1 # Start from 1 (header)
        
        # Validate file extension
        unless params[:csv_file].original_filename.downcase.end_with?('.csv')
          redirect_to admin_providers_path, alert: "Por favor, selecione um arquivo CSV válido."
          return
        end
        
        # Validate file size (max 5MB)
        if params[:csv_file].size > 5.megabytes
          redirect_to admin_providers_path, alert: "Arquivo muito grande. Tamanho máximo: 5MB."
          return
        end
        
        CSV.foreach(params[:csv_file].path, headers: true, encoding: 'UTF-8') do |row|
          line_number += 1
          
          # Skip empty rows
          if row.to_hash.values.all?(&:blank?)
            skipped_count += 1
            next
          end
          
          # Validate required fields
          required_fields = ['name', 'country', 'foundation_year', 'members_count']
          missing_fields = required_fields.select { |field| row[field].blank? }
          
          if missing_fields.any?
            errors << "Linha #{line_number}: Campos obrigatórios em branco: #{missing_fields.join(', ')}"
            next
          end
          
          # Validate foundation_year
          foundation_year = row['foundation_year']&.to_i
          if foundation_year && (foundation_year < 1800 || foundation_year > Date.current.year)
            errors << "Linha #{line_number}: Ano de fundação inválido (#{foundation_year})"
            next
          end
          
          # Validate members_count
          members_count = row['members_count']&.to_i
          if members_count && members_count < 0
            errors << "Linha #{line_number}: Número de membros não pode ser negativo"
            next
          end
          
          # Validate status
          valid_statuses = ['pending', 'active', 'rejected', 'suspended']
          status = row['status']&.downcase || 'pending'
          unless valid_statuses.include?(status)
            errors << "Linha #{line_number}: Status inválido (#{row['status']}). Valores válidos: #{valid_statuses.join(', ')}"
            next
          end
          
          provider_params = {
            name: row['name']&.strip,
            title: row['title']&.strip,
            short_description: row['short_description']&.strip,
            country: row['country']&.strip,
            address: row['address']&.strip,
            phone: row['phone']&.strip,
            city: row['city']&.strip,
            state: row['state']&.strip,
            foundation_year: foundation_year,
            members_count: members_count || 0,
            revenue: row['revenue']&.strip,
            status: status
          }
          
          # Handle array fields with validation
          if row['social_links'].present?
            social_links = row['social_links'].split(';').map(&:strip).reject(&:blank?)
            # Basic URL validation
            invalid_urls = social_links.reject { |url| url.match?(/\Ahttps?:\/\/.+/) }
            if invalid_urls.any?
              errors << "Linha #{line_number}: URLs inválidas em social_links: #{invalid_urls.join(', ')}"
              next
            end
            provider_params[:social_links] = social_links
          else
            provider_params[:social_links] = []
          end
          
          if row['tags'].present?
            provider_params[:tags] = row['tags'].split(';').map(&:strip).reject(&:blank?)
          else
            provider_params[:tags] = []
          end
          
          # Check for duplicate name
          if Provider.exists?(name: provider_params[:name])
            errors << "Linha #{line_number}: Provider com nome '#{provider_params[:name]}' já existe"
            next
          end
          
          provider = Provider.new(provider_params)
          
          if provider.save
            imported_count += 1
            # Log the import
            Rails.logger.info "CSV Import: Provider '#{provider.name}' imported successfully by admin #{current_admin_user.email}"
          else
            errors << "Linha #{line_number}: #{provider.errors.full_messages.join(', ')}"
          end
        end
        
        # Generate summary message
        summary_parts = []
        summary_parts << "#{imported_count} provider(s) importado(s) com sucesso" if imported_count > 0
        summary_parts << "#{skipped_count} linha(s) em branco ignorada(s)" if skipped_count > 0
        summary_parts << "#{errors.count} erro(s) encontrado(s)" if errors.any?
        
        if errors.empty?
          redirect_to admin_providers_path, notice: summary_parts.join(', ') + '!'
        else
          # Limit error display to first 10 errors
          displayed_errors = errors.first(10)
          error_message = summary_parts.join(', ')
          error_message += ". Primeiros erros: #{displayed_errors.join('; ')}"
          error_message += " (e mais #{errors.count - 10} erros...)" if errors.count > 10
          
          flash[:alert] = error_message
          redirect_to admin_providers_path
        end
        
      rescue CSV::MalformedCSVError => e
        Rails.logger.error "CSV Import Error: Malformed CSV - #{e.message}"
        redirect_to admin_providers_path, alert: "Erro no formato do CSV: #{e.message}"
      rescue Encoding::InvalidByteSequenceError => e
        Rails.logger.error "CSV Import Error: Invalid encoding - #{e.message}"
        redirect_to admin_providers_path, alert: "Erro de codificação do arquivo. Certifique-se de que o arquivo está em UTF-8."
      rescue => e
        Rails.logger.error "CSV Import Error: #{e.class} - #{e.message}"
        redirect_to admin_providers_path, alert: "Erro na importação: #{e.message}"
      end
    else
      redirect_to admin_providers_path, alert: "Por favor, selecione um arquivo CSV."
    end
  end

  collection_action :download_csv_template, method: :get do
    csv_data = CSV.generate(headers: true) do |csv|
      csv << [
        'name', 'title', 'short_description', 'country', 'address', 'phone',
        'city', 'state', 'foundation_year', 'members_count', 'revenue', 'social_links', 'tags', 'status'
      ]
      csv << [
        'Exemplo Empresa Ltda', 'Empresa de Energia Solar', 'Especializada em soluções solares',
        'Brasil', 'Rua das Flores, 123', '(11) 99999-9999', 'São Paulo', 'SP', '2020', '50',
        'R$ 1.000.000', 'https://facebook.com/exemplo;https://linkedin.com/exemplo',
        'energia solar;sustentabilidade', 'pending'
      ]
    end
    
    send_data csv_data, filename: "template_providers_#{Date.current.strftime('%Y%m%d')}.csv", type: 'text/csv'
  end
end