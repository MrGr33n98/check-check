ActiveAdmin.register PromoBanner do
  permit_params :title, :subtitle, :button_text, :button_url, :button_secondary_text, 
                :button_secondary_url, :background_color, :text_color, :position, 
                :active, :priority, :background_image, :show_title, :show_subtitle, 
                :overlay_enabled, :overlay_color, :overlay_opacity, :text_align

  # Scopes
  scope :all, default: true
  scope :active

  index do
    selectable_column
    id_column
    column "Preview" do |banner|
      render 'admin/promo_banners/preview', banner: banner
    end
    column :title
    column :position do |banner|
      status_tag(banner.position_label, class: 'ok')
    end
    column :active do |banner|
      status_tag(banner.active? ? 'Ativo' : 'Inativo', class: banner.active? ? 'ok' : 'error')
    end
    column :priority
    actions
  end

  filter :title
  filter :position, as: :select, collection: -> { PromoBanner.distinct.pluck(:position).map { |pos| [PromoBanner.new(position: pos).position_label, pos] } }
  filter :active
  filter :priority
  filter :created_at
  filter :updated_at

  form do |f|
    f.semantic_errors

    columns do
      column do
        tabs do
          tab 'Conteúdo' do
            f.inputs 'Textos' do
              f.input :title, label: "Título", hint: "Máximo de 60 caracteres."
              f.input :show_title, label: "Exibir Título"
              f.input :subtitle, as: :text, label: "Subtítulo", hint: "Máximo de 90 caracteres."
              f.input :show_subtitle, label: "Exibir Subtítulo"
            end

            f.inputs 'Botões' do
              f.input :button_text, label: "Texto do Botão Principal"
              f.input :button_url, label: "URL do Botão Principal", hint: "Use http(s):// para links externos. Ex: https://google.com"
              f.input :button_secondary_text, label: "Texto do Botão Secundário"
              f.input :button_secondary_url, label: "URL do Botão Secundário", hint: "Use http(s):// para links externos."
            end
          end

          tab 'Visual' do
            f.inputs 'Cores e Alinhamento' do
              f.input :background_color, as: :color, label: "Cor de Fundo", hint: "Cor de fundo principal do banner."
              f.input :text_color, as: :color, label: "Cor do Texto", hint: "Cor para título, subtítulo e botões."
              f.input :text_align, as: :select, collection: [['Esquerda', 'left'], ['Centro', 'center'], ['Direita', 'right']], include_blank: false, label: "Alinhamento do Texto"
            end

            f.inputs 'Imagem e Overlay' do
              f.input :background_image, as: :file, label: "Imagem de Fundo", hint: "Opcional. Sobrepõe a cor de fundo."
              if f.object.background_image.attached?
                image_tag f.object.background_image, style: "max-width: 200px; margin-top: 10px; border-radius: 8px;"
              end
              f.input :overlay_enabled, label: "Habilitar Overlay Sobre a Imagem"
              f.input :overlay_color, as: :color, label: "Cor do Overlay"
              f.input :overlay_opacity, label: "Opacidade do Overlay (0-100)", as: :number, min: 0, max: 100, step: 1
            end
          end

          tab 'Configurações Gerais' do
            f.inputs 'Publicação' do
              f.input :active, label: "Ativo"
              f.input :position, as: :select, collection: [['Barra Lateral', 'sidebar'], ['Cabeçalho', 'header'], ['Rodapé', 'footer']], include_blank: false, label: "Posição"
              f.input :priority, label: "Prioridade", hint: "Menor número = maior prioridade (0 é a mais alta)."
            end
          end
        end
      end

      column do
        panel "Preview" do
          div id: "promo-banner-preview-wrapper" do
            render partial: 'admin/promo_banners/preview', locals: { banner: f.object }
          end
        end
      end
    end

    f.actions
  end

  show do
    panel "Preview do Banner" do
      render 'admin/promo_banners/preview', banner: promo_banner
    end
    active_admin_comments
  end

  # Batch actions
  batch_action :activate do |ids|
    batch_action_collection.find(ids).each { |banner| banner.update(active: true) }
    redirect_to collection_path, notice: "#{ids.count} banners ativados."
  end

  batch_action :deactivate do |ids|
    batch_action_collection.find(ids).each { |banner| banner.update(active: false) }
    redirect_to collection_path, notice: "#{ids.count} banners desativados."
  end
end
