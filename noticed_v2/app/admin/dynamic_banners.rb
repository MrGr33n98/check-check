ActiveAdmin.register DynamicBanner do
  menu label: 'Banners Dinâmicos', priority: 3

  permit_params :title, :description, :link_url, :display_order, :active, :image

  # Configuração do índice
  index do
    selectable_column
    id_column
    
    column "Prévia", :image do |banner|
      if banner.image.attached?
        image_tag banner.image, size: "80x50", style: "object-fit: cover; border-radius: 4px;"
      else
        content_tag :span, "Sem imagem", class: "text-muted"
      end
    end
    
    column :title do |banner|
      content_tag :strong, banner.title
    end
    
    column :description do |banner|
      truncate(banner.description, length: 60)
    end
    
    column :link_url do |banner|
      link_to truncate(banner.link_url, length: 40), banner.link_url, target: "_blank", class: "text-primary"
    end
    
    column "Ordem", :display_order do |banner|
      content_tag :span, banner.display_order, class: "badge badge-secondary"
    end
    
    column "Status", :active do |banner|
      status_tag(banner.active? ? "Ativo" : "Inativo", banner.active? ? :ok : :error)
    end
    
    column :created_at do |banner|
      l(banner.created_at, format: :short)
    end
    
    actions
  end

  # Filtros
  filter :title, as: :string
  filter :active, as: :select, collection: [["Ativo", true], ["Inativo", false]]
  filter :display_order
  filter :created_at
  filter :updated_at

  # Formulário
  form do |f|
    f.inputs "Informações do Banner" do
      f.input :title, label: "Título", hint: "Título principal do banner (máx. 255 caracteres)"
      f.input :description, label: "Descrição", as: :text, rows: 3, hint: "Descrição curta do banner (máx. 500 caracteres)"
      f.input :link_url, label: "URL de Destino", hint: "URL completa para onde o banner deve redirecionar (ex: https://exemplo.com)"
    end
    
    f.inputs "Imagem" do
      f.input :image, label: "Imagem do Banner", as: :file, hint: "Formatos aceitos: JPG, PNG, GIF. Tamanho recomendado: 1200x300px"
      
      if f.object.image.attached?
        div class: "current-image" do
          h4 "Imagem Atual:"
          image_tag f.object.image, style: "max-width: 400px; height: auto; border: 1px solid #ddd; border-radius: 4px; margin-top: 10px;"
        end
      end
    end
    
    f.inputs "Configurações de Exibição" do
      f.input :display_order, label: "Ordem de Exibição", hint: "Número que define a ordem de exibição (menor número = maior prioridade)"
      f.input :active, label: "Ativo", hint: "Marque para exibir o banner no site"
    end
    
    f.actions
  end

  # Visualização detalhada
  show do
    attributes_table do
      row :id
      row :title
      row :description
      row :link_url do |banner|
        link_to banner.link_url, banner.link_url, target: "_blank", class: "text-primary"
      end
      
      row "Imagem" do |banner|
        if banner.image.attached?
          div do
            image_tag banner.image, style: "max-width: 600px; height: auto; border: 1px solid #ddd; border-radius: 4px;"
          end
        else
          "Nenhuma imagem anexada"
        end
      end
      
      row :display_order
      row :active do |banner|
        status_tag(banner.active? ? "Ativo" : "Inativo", banner.active? ? :ok : :error)
      end
      row :created_at
      row :updated_at
    end
    
    panel "Prévia do Banner" do
      if resource.image.attached?
        div style: "background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;" do
          div style: "position: relative; display: inline-block; max-width: 100%;" do
            image_tag resource.image, style: "max-width: 100%; height: auto; border-radius: 4px;"
            div style: "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.7); color: white; padding: 20px; border-radius: 8px; text-align: center;" do
              h3 resource.title, style: "margin: 0 0 10px 0; color: white;"
              p resource.description, style: "margin: 0 0 15px 0; color: #ccc;"
              link_to "Ver Destino", resource.link_url, target: "_blank", style: "background: #007bff; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px;"
            end
          end
        end
      else
        div style: "text-align: center; padding: 40px; background: #f8f9fa; border-radius: 8px;" do
          p "Nenhuma imagem disponível para prévia", style: "color: #6c757d; margin: 0;"
        end
      end
    end
  end

  # Ações customizadas
  action_item :preview, only: :show do
    if resource.active? && resource.image.attached?
      link_to "Visualizar no Site", resource.link_url, target: "_blank", class: "button"
    end
  end

  action_item :duplicate, only: :show do
    link_to "Duplicar Banner", duplicate_admin_dynamic_banner_path(resource), method: :post, class: "button"
  end

  # Ações em lote
  batch_action :activate do |ids|
    DynamicBanner.where(id: ids).update_all(active: true)
    redirect_to collection_path, notice: "#{ids.count} banners foram ativados."
  end

  batch_action :deactivate do |ids|
    DynamicBanner.where(id: ids).update_all(active: false)
    redirect_to collection_path, notice: "#{ids.count} banners foram desativados."
  end

  # Controller customizado
  controller do
    def duplicate
      original = DynamicBanner.find(params[:id])
      new_banner = original.dup
      new_banner.title = "#{original.title} (Cópia)"
      new_banner.active = false
      new_banner.display_order = (DynamicBanner.maximum(:display_order) || 0) + 1
      
      if original.image.attached?
        new_banner.image.attach(original.image.blob)
      end
      
      if new_banner.save
        redirect_to admin_dynamic_banner_path(new_banner), notice: "Banner duplicado com sucesso!"
      else
        redirect_to admin_dynamic_banner_path(original), alert: "Erro ao duplicar banner: #{new_banner.errors.full_messages.join(', ')}"
      end
    end

    private

    def permitted_params
      params.permit dynamic_banner: [:title, :description, :link_url, :display_order, :active, :image]
    end
  end

  # Rotas customizadas
  member_action :duplicate, method: :post
end

# CSS customizado para melhorar a aparência
ActiveAdmin.register_stylesheet "dynamic_banners_admin.css" do
  """
  .dynamic-banner-preview {
    max-width: 100%;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .current-image {
    margin-top: 15px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 4px;
  }
  
  .batch-actions {
    margin-bottom: 20px;
  }
  
  .status-tag {
    font-weight: bold;
    padding: 4px 8px;
    border-radius: 4px;
  }
  """
end