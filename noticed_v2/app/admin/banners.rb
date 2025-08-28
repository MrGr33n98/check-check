ActiveAdmin.register Banner do
  permit_params :title, :description, :link_url, :banner_type, :status, :device_target, 
                :priority, :starts_at, :ends_at, :provider_id, :custom_css, :custom_html,
                :show_close_button, :display_frequency, :conversion_tracking_code,
                :desktop_image, :mobile_image, :tablet_image, category_ids: []

  # Filtros
  filter :title
  filter :banner_type, as: :select, collection: Banner.banner_types.keys.map { |k| [k.humanize, k] }
  filter :status, as: :select, collection: Banner.statuses.keys.map { |k| [k.humanize, k] }
  filter :device_target, as: :select, collection: Banner.device_targets.keys.map { |k| [k.humanize, k] }
  filter :provider
  filter :categories
  filter :starts_at
  filter :ends_at
  filter :created_at

  # Configuração do índice
  index do
    selectable_column
    id_column
    
    column :title do |banner|
      link_to banner.title, admin_banner_path(banner)
    end
    
    column "Tipo", :banner_type do |banner|
      status_tag banner.banner_type.humanize, class: banner_type_class(banner.banner_type)
    end
    
    column "Status", :status do |banner|
      status_tag banner.status.humanize, class: status_class(banner.status)
    end
    
    column "Dispositivo", :device_target do |banner|
      banner.device_target.humanize
    end
    
    column "Prioridade", :priority
    
    column "Período" do |banner|
      banner.display_schedule
    end
    
    column "Ativo?" do |banner|
      banner.active? ? status_tag('Sim', class: 'ok') : status_tag('Não', class: 'error')
    end
    
    column "Imagens" do |banner|
      images = []
      images << "Desktop" if banner.desktop_image.attached?
      images << "Mobile" if banner.mobile_image.attached?
      images << "Tablet" if banner.tablet_image.attached?
      images.join(", ")
    end
    
    column "CTR" do |banner|
      "#{banner.click_through_rate}%"
    end
    
    column "Categorias" do |banner|
      banner.categories.limit(3).map(&:name).join(", ") + 
      (banner.categories.count > 3 ? "..." : "")
    end
    
    actions
  end

  # Configuração do show
  show do
    attributes_table do
      row :title
      row :description
      row :link_url do |banner|
        link_to banner.link_url, banner.link_url, target: '_blank'
      end
      row :banner_type do |banner|
        status_tag banner.banner_type.humanize, class: banner_type_class(banner.banner_type)
      end
      row :status do |banner|
        status_tag banner.status.humanize, class: status_class(banner.status)
      end
      row :device_target do |banner|
        banner.device_target.humanize
      end
      row :priority
      row :starts_at
      row :ends_at
      row :provider
      row :show_close_button
      row :display_frequency do |banner|
        case banner.display_frequency
        when 1 then "Sempre"
        when 2 then "Uma vez por sessão"
        when 3 then "Uma vez por dia"
        else "Personalizado"
        end
      end
    end

    panel "Estatísticas" do
      attributes_table_for banner do
        row "Impressões" do |b|
          number_with_delimiter(b.impression_count)
        end
        row "Cliques" do |b|
          number_with_delimiter(b.click_count)
        end
        row "CTR" do |b|
          "#{b.click_through_rate}%"
        end
        row "Dias restantes" do |b|
          b.days_remaining || "Sem limite"
        end
      end
    end

    panel "Imagens" do
      table_for [banner] do
        column "Desktop" do |b|
          if b.desktop_image.attached?
            image_tag b.desktop_image.variant(resize_to_limit: [300, 200])
          else
            "Não anexada"
          end
        end
        column "Mobile" do |b|
          if b.mobile_image.attached?
            image_tag b.mobile_image.variant(resize_to_limit: [200, 300])
          else
            "Não anexada"
          end
        end
        column "Tablet" do |b|
          if b.tablet_image.attached?
            image_tag b.tablet_image.variant(resize_to_limit: [250, 200])
          else
            "Não anexada"
          end
        end
      end
    end

    panel "Categorias Associadas" do
      table_for banner.categories do
        column :name
        column :description
        column "Ações" do |category|
          link_to "Ver Categoria", admin_category_path(category), class: "button"
        end
      end
    end

    if banner.custom_css.present?
      panel "CSS Personalizado" do
        pre banner.custom_css
      end
    end

    if banner.custom_html.present?
      panel "HTML Personalizado" do
        pre banner.custom_html
      end
    end

    active_admin_comments
  end

  # Configuração do formulário
  form do |f|
    f.inputs "Informações Básicas" do
      f.input :title, label: "Título"
      f.input :description, label: "Descrição", as: :text, rows: 3
      f.input :link_url, label: "URL de Destino", placeholder: "https://exemplo.com"
    end

    f.inputs "Configurações de Exibição" do
      f.input :banner_type, label: "Tipo de Banner", as: :select, 
              collection: Banner.banner_types.keys.map { |k| [k.humanize, k] },
              include_blank: false
      f.input :device_target, label: "Dispositivos Alvo", as: :select,
              collection: Banner.device_targets.keys.map { |k| [k.humanize, k] },
              include_blank: false
      f.input :priority, label: "Prioridade (0 = maior prioridade)"
      f.input :show_close_button, label: "Mostrar botão de fechar"
      f.input :display_frequency, label: "Frequência de Exibição", as: :select,
              collection: [["Sempre", 1], ["Uma vez por sessão", 2], ["Uma vez por dia", 3]],
              include_blank: false
    end

    f.inputs "Agendamento" do
      f.input :status, label: "Status", as: :select,
              collection: Banner.statuses.keys.map { |k| [k.humanize, k] },
              include_blank: false
      f.input :starts_at, label: "Data/Hora de Início", as: :datetime_select
      f.input :ends_at, label: "Data/Hora de Fim (opcional)", as: :datetime_select
    end

    f.inputs "Imagens" do
      f.input :desktop_image, label: "Imagem Desktop", as: :file,
              hint: f.object.desktop_image.present? ? 
                    image_tag(f.object.desktop_image.variant(resize_to_limit: [200, 150])) : 
                    "Recomendado: 1200x300px"
      f.input :mobile_image, label: "Imagem Mobile", as: :file,
              hint: f.object.mobile_image.present? ? 
                    image_tag(f.object.mobile_image.variant(resize_to_limit: [150, 200])) : 
                    "Recomendado: 375x200px"
      f.input :tablet_image, label: "Imagem Tablet", as: :file,
              hint: f.object.tablet_image.present? ? 
                    image_tag(f.object.tablet_image.variant(resize_to_limit: [200, 150])) : 
                    "Recomendado: 768x250px"
    end

    f.inputs "Segmentação" do
      f.input :provider, label: "Provedor (opcional)", as: :select,
              collection: Provider.active.pluck(:name, :id),
              include_blank: "Todos os provedores"
      f.input :categories, label: "Categorias", as: :check_boxes,
              collection: Category.all.map { |c| [c.name, c.id] }
    end

    f.inputs "Personalização Avançada" do
      f.input :custom_css, label: "CSS Personalizado", as: :text, rows: 5,
              placeholder: ".meu-banner { background: #fff; }"
      f.input :custom_html, label: "HTML Personalizado", as: :text, rows: 5,
              placeholder: "<div class='custom-content'>Conteúdo personalizado</div>"
      f.input :conversion_tracking_code, label: "Código de Rastreamento", as: :text, rows: 3,
              placeholder: "<!-- Google Analytics, Facebook Pixel, etc. -->"
    end

    f.actions
  end

  # Actions customizadas
  member_action :duplicate, method: :post do
    original = Banner.find(params[:id])
    new_banner = original.dup
    new_banner.title = "#{original.title} (Cópia)"
    new_banner.status = :draft
    new_banner.starts_at = Time.current
    new_banner.ends_at = nil
    
    if new_banner.save
      # Copiar categorias
      new_banner.categories = original.categories
      
      # Copiar imagens se existirem
      if original.desktop_image.attached?
        new_banner.desktop_image.attach(original.desktop_image.blob)
      end
      if original.mobile_image.attached?
        new_banner.mobile_image.attach(original.mobile_image.blob)
      end
      if original.tablet_image.attached?
        new_banner.tablet_image.attach(original.tablet_image.blob)
      end
      
      redirect_to admin_banner_path(new_banner), notice: 'Banner duplicado com sucesso!'
    else
      redirect_to admin_banner_path(original), alert: 'Erro ao duplicar banner.'
    end
  end

  action_item :duplicate, only: :show do
    link_to 'Duplicar Banner', duplicate_admin_banner_path(banner), method: :post,
            confirm: 'Tem certeza que deseja duplicar este banner?'
  end

  # Batch actions
  batch_action :activate do |ids|
    Banner.where(id: ids).update_all(status: :active)
    redirect_to collection_path, notice: "#{ids.count} banners ativados com sucesso!"
  end

  batch_action :pause do |ids|
    Banner.where(id: ids).update_all(status: :paused)
    redirect_to collection_path, notice: "#{ids.count} banners pausados com sucesso!"
  end

  batch_action :draft do |ids|
    Banner.where(id: ids).update_all(status: :draft)
    redirect_to collection_path, notice: "#{ids.count} banners movidos para rascunho!"
  end

  # Helpers para classes CSS
  controller do
    def banner_type_class(type)
      case type
      when 'header', 'hero' then 'ok'
      when 'sidebar', 'footer' then 'warning'
      when 'popup', 'mobile_sticky' then 'error'
      else 'default'
      end
    end

    def status_class(status)
      case status
      when 'active' then 'ok'
      when 'paused' then 'warning'
      when 'draft' then 'default'
      when 'expired' then 'error'
      else 'default'
      end
    end
  end
end