ActiveAdmin.register CtaBanner do
  permit_params :title, :subtitle, :button1_text, :button1_url, :button2_text, :button2_url,
                :background_type, :background_color, :background_image, :enabled, :position

  index do
    selectable_column
    id_column
    column :title
    column :subtitle do |cta|
      truncate(cta.subtitle, length: 50)
    end
    column :background_type
    column :position
    column :enabled
    column :created_at
    actions
  end

  filter :title
  filter :position
  filter :background_type, as: :select, collection: [['Cor Sólida', 'solid'], ['Imagem', 'image']]
  filter :enabled
  filter :created_at

  form do |f|
    f.inputs 'Conteúdo do Banner' do
      f.input :title, label: 'Título Principal', hint: 'Texto principal do banner'
      f.input :subtitle, label: 'Subtítulo', as: :text, rows: 3, hint: 'Texto secundário/descrição'
    end

    f.inputs 'Botões de Ação' do
      f.input :button1_text, label: 'Texto do Botão 1'
      f.input :button1_url, label: 'URL do Botão 1', hint: 'Ex: /empresas ou https://exemplo.com'
      f.input :button2_text, label: 'Texto do Botão 2'
      f.input :button2_url, label: 'URL do Botão 2', hint: 'Ex: /cadastrar ou https://exemplo.com'
    end

    f.inputs 'Configurações de Fundo' do
      f.input :background_type, label: 'Tipo de Fundo', as: :select, 
              collection: [['Cor Sólida', 'solid'], ['Imagem', 'image']], 
              include_blank: false,
              input_html: { id: 'background_type_select' }
      
      f.input :background_color, label: 'Cor de Fundo', as: :string,
              input_html: { type: 'color', id: 'background_color_input' },
              hint: 'Usado quando "Tipo de Fundo" é "Cor Sólida"'
      
      f.input :background_image, label: 'Imagem de Fundo', as: :file,
              hint: 'Usado quando "Tipo de Fundo" é "Imagem". Formatos aceitos: JPG, PNG, SVG'
    end

    f.inputs 'Configurações Gerais' do
      f.input :position, label: 'Posição', as: :select,
              collection: [['Homepage', 'homepage'], ['Página de Categoria', 'category_page'], ['Página de Busca', 'search_page']],
              include_blank: false
      f.input :enabled, label: 'Ativo'
    end

    f.actions
  end

  show do
    attributes_table do
      row :title
      row :subtitle
      row :button1_text
      row :button1_url
      row :button2_text
      row :button2_url
      row :background_type
      row :background_color do |cta|
        if cta.background_type == 'solid' && cta.background_color.present?
          content_tag :div, cta.background_color, 
                      style: "background-color: #{cta.background_color}; width: 50px; height: 20px; display: inline-block; border: 1px solid #ccc;"
        end
      end
      row :background_image do |cta|
        if cta.background_image.attached?
          image_tag cta.background_image, style: 'max-width: 200px; max-height: 100px;'
        end
      end
      row :position
      row :enabled
      row :created_at
      row :updated_at
    end

    panel 'Preview do Banner' do
      div id: 'cta-banner-preview', style: 'margin-top: 20px;' do
        div style: [
          'padding: 40px;',
          'border-radius: 12px;',
          'text-align: center;',
          'color: white;',
          cta_banner.background_type == 'solid' ? "background-color: #{cta_banner.background_color || '#f97316'};" : '',
          cta_banner.background_type == 'image' && cta_banner.background_image.attached? ? "background-image: url(#{url_for(cta_banner.background_image)}); background-size: cover; background-position: center;" : ''
        ].join(' ') do
          h2 cta_banner.title, style: 'margin: 0 0 16px 0; font-size: 28px; font-weight: bold;'
          p cta_banner.subtitle, style: 'margin: 0 0 24px 0; font-size: 16px; opacity: 0.9;'
          div style: 'display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;' do
            link_to cta_banner.button1_text, cta_banner.button1_url, 
                    style: 'background: rgba(255,255,255,0.2); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;'
            link_to cta_banner.button2_text, cta_banner.button2_url,
                    style: 'background: white; color: #333; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;'
          end
        end
      end
    end

    active_admin_comments
  end

  # JavaScript para mostrar/ocultar campos baseado no tipo de fundo
  content_for :head do
    javascript_tag do
      raw %{
        document.addEventListener('DOMContentLoaded', function() {
          const backgroundTypeSelect = document.getElementById('background_type_select');
          const backgroundColorInput = document.getElementById('background_color_input');
          const backgroundImageInput = document.querySelector('input[type="file"][name*="background_image"]');
          
          function toggleBackgroundFields() {
            const selectedType = backgroundTypeSelect.value;
            const colorWrapper = backgroundColorInput.closest('.input');
            const imageWrapper = backgroundImageInput.closest('.input');
            
            if (selectedType === 'solid') {
              colorWrapper.style.display = 'block';
              imageWrapper.style.display = 'none';
            } else if (selectedType === 'image') {
              colorWrapper.style.display = 'none';
              imageWrapper.style.display = 'block';
            }
          }
          
          if (backgroundTypeSelect) {
            backgroundTypeSelect.addEventListener('change', toggleBackgroundFields);
            toggleBackgroundFields(); // Executar na inicialização
          }
        });
      }
    end
  end
end