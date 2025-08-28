ActiveAdmin.register PromotionalBanner do
  menu label: 'Banners Promocionais', priority: 3
  
  # Permissões
  permit_params :title, :background_color, :text_color, :link_url, :display_order, 
                :active, :position, :provider_id, :icon, :utm_source, :utm_medium, 
                :utm_campaign, :utm_content, :utm_term, :notes, :start_date, :end_date

  # Configuração do índice
  index do
    selectable_column
    id_column
    
    column :title do |banner|
      truncate(banner.title, length: 50)
    end
    
    column 'Preview' do |banner|
      div style: "background-color: #{banner.background_color}; color: #{banner.text_color}; padding: 8px 12px; border-radius: 4px; font-size: 12px; max-width: 200px;" do
        banner.title
      end
    end
    
    column :company_name do |banner|
      banner.provider&.name || 'Sem empresa'
    end
    
    column :position do |banner|
      status_tag banner.position.humanize, class: 'position'
    end
    
    column :display_order
    
    column :active do |banner|
      status_tag(banner.active? ? 'Ativo' : 'Inativo', banner.active? ? :ok : :error)
    end
    
    column :clicks_count
    column :impressions_count
    
    column 'CTR' do |banner|
      if banner.impressions_count > 0
        ctr = (banner.clicks_count.to_f / banner.impressions_count * 100).round(2)
        "#{ctr}%"
      else
        '-'
      end
    end
    
    column :created_at
    
    actions
  end

  # Filtros
  filter :title
  filter :provider, as: :select, collection: -> { Provider.all.pluck(:name, :id) }
  filter :position, as: :select, collection: PromotionalBanner.positions.map { |k, v| [k.humanize, k] }
  filter :active
  filter :created_at
  filter :start_date
  filter :end_date

  # Configuração do formulário
  form do |f|
    f.inputs 'Informações do Banner' do
      f.input :title, label: 'Texto Principal', hint: 'Ex: ⚡ Conheça a SolarTech RJ — líder em energia solar no Rio de Janeiro!'
      f.input :provider, label: 'Empresa Vinculada', as: :select, collection: Provider.all.pluck(:name, :id), include_blank: 'Selecione uma empresa'
      f.input :link_url, label: 'Link de Redirecionamento', hint: 'URL completa (https://...) ou caminho interno (/empresa/123)'
      f.input :position, label: 'Posição de Exibição', as: :select, collection: PromotionalBanner.positions.map { |k, v| [k.humanize, k] }
    end
    
    f.inputs 'Aparência Visual' do
      f.input :background_color, label: 'Cor de Fundo', as: :string, hint: 'Formato hex (#f97316) ou classe Tailwind (bg-orange-500)'
      f.input :text_color, label: 'Cor do Texto', as: :string, hint: 'Formato hex (#ffffff) ou classe Tailwind (text-white)'
      f.input :icon, label: 'Ícone/Imagem (Opcional)', as: :file, hint: 'JPG, PNG ou SVG até 2MB'
    end
    
    f.inputs 'Controle de Exibição' do
      f.input :display_order, label: 'Ordem de Exibição', hint: 'Número menor = maior prioridade'
      f.input :active, label: 'Banner Ativo'
      f.input :start_date, label: 'Data de Início (Opcional)', as: :datetime_local
      f.input :end_date, label: 'Data de Fim (Opcional)', as: :datetime_local
    end
    
    f.inputs 'Rastreamento UTM (Para Links Externos)', class: 'utm-section' do
      f.input :utm_source, label: 'UTM Source', hint: 'Ex: compare_solar'
      f.input :utm_medium, label: 'UTM Medium', hint: 'Ex: banner, display'
      f.input :utm_campaign, label: 'UTM Campaign', hint: 'Ex: solar_promo_jan2024'
      f.input :utm_content, label: 'UTM Content', hint: 'Ex: header_banner'
      f.input :utm_term, label: 'UTM Term', hint: 'Ex: energia_solar'
    end
    
    f.inputs 'Notas Internas' do
      f.input :notes, label: 'Observações', as: :text, hint: 'Notas para uso interno da equipe'
    end
    
    f.actions
  end

  # Configuração da visualização detalhada
  show do
    attributes_table do
      row :id
      row :title
      row :company_name do |banner|
        banner.provider&.name || 'Sem empresa vinculada'
      end
      row :link_url
      row :final_url do |banner|
        link_to banner.final_url, banner.final_url, target: '_blank'
      end
      row :position do |banner|
        status_tag banner.position.humanize
      end
      row :display_order
      row :active do |banner|
        status_tag(banner.active? ? 'Ativo' : 'Inativo', banner.active? ? :ok : :error)
      end
      row :background_color do |banner|
        div style: "background-color: #{banner.background_color}; width: 50px; height: 20px; border: 1px solid #ccc; display: inline-block; margin-right: 10px;"
        span banner.background_color
      end
      row :text_color do |banner|
        div style: "background-color: #{banner.text_color}; width: 50px; height: 20px; border: 1px solid #ccc; display: inline-block; margin-right: 10px;"
        span banner.text_color
      end
      row :icon do |banner|
        if banner.icon.attached?
          image_tag banner.icon, style: 'max-width: 100px; max-height: 50px;'
        else
          'Nenhum ícone'
        end
      end
      row :utm_params do |banner|
        banner.utm_params.present? ? banner.utm_params : 'Nenhum parâmetro UTM'
      end
      row :clicks_count
      row :impressions_count
      row 'CTR' do |banner|
        if banner.impressions_count > 0
          ctr = (banner.clicks_count.to_f / banner.impressions_count * 100).round(2)
          "#{ctr}%"
        else
          'Sem dados'
        end
      end
      row :start_date
      row :end_date
      row :notes
      row :created_at
      row :updated_at
    end
    
    # Preview do banner
    panel 'Preview do Banner' do
      div class: 'banner-preview', style: 'margin: 20px 0;' do
        div style: "background-color: #{promotional_banner.background_color}; color: #{promotional_banner.text_color}; padding: 12px 20px; text-align: center; font-weight: 500; border-radius: 4px; position: relative; overflow: hidden;" do
          if promotional_banner.icon.attached?
            span style: 'margin-right: 8px;' do
              image_tag promotional_banner.icon, style: 'width: 20px; height: 20px; vertical-align: middle;'
            end
          end
          span promotional_banner.title
          if promotional_banner.external_link?
            span style: 'margin-left: 8px; font-size: 12px; opacity: 0.8;' do
              '↗'
            end
          end
        end
        div style: 'margin-top: 10px; font-size: 12px; color: #666;' do
          "Link: #{promotional_banner.final_url}"
        end
      end
    end
    
    active_admin_comments
  end

  # Ações customizadas
  action_item :preview, only: :show do
    link_to 'Ver no Site', promotional_banner.final_url, target: '_blank', class: 'button'
  end
  
  action_item :duplicate, only: :show do
    link_to 'Duplicar Banner', new_admin_promotional_banner_path(duplicate_from: promotional_banner.id), class: 'button'
  end

  # Batch actions
  batch_action :activate do |ids|
    PromotionalBanner.where(id: ids).update_all(active: true)
    redirect_to collection_path, notice: "#{ids.count} banners foram ativados."
  end
  
  batch_action :deactivate do |ids|
    PromotionalBanner.where(id: ids).update_all(active: false)
    redirect_to collection_path, notice: "#{ids.count} banners foram desativados."
  end

  # Controller customizations
  controller do
    def new
      @promotional_banner = PromotionalBanner.new
      
      # Duplicar banner se solicitado
      if params[:duplicate_from].present?
        original = PromotionalBanner.find(params[:duplicate_from])
        @promotional_banner.assign_attributes(
          original.attributes.except('id', 'created_at', 'updated_at', 'clicks_count', 'impressions_count')
        )
        @promotional_banner.title = "#{original.title} (Cópia)"
        @promotional_banner.active = false
      end
      
      new!
    end
    
    def create
      # Ajustar ordem se não especificada
      if params[:promotional_banner][:display_order].blank?
        params[:promotional_banner][:display_order] = PromotionalBanner.next_display_order
      end
      
      create!
    end
  end

  end