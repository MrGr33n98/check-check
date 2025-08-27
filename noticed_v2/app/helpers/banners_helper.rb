module BannersHelper
  # Renderiza banners para uma posição específica
  def render_banners(position, options = {})
    banners = get_banners_for_position(position, options)
    return '' if banners.empty?

    content_tag :div, class: "banners-container banners-#{position}" do
      banners.map { |banner| render_single_banner(banner, options) }.join.html_safe
    end
  end

  # Renderiza um banner individual
  def render_single_banner(banner, options = {})
    css_classes = [
      'banner',
      "banner-#{banner.banner_type}",
      "banner-#{banner.device_target}",
      "priority-#{banner.priority}",
      options[:css_class]
    ].compact.join(' ')

    content_tag :div, 
                class: css_classes, 
                id: "banner-#{banner.id}",
                data: banner_data_attributes(banner) do
      banner_content(banner, options)
    end
  end

  # Gera o conteúdo do banner
  def banner_content(banner, options = {})
    if banner.custom_html.present?
      render_custom_html_banner(banner)
    else
      render_image_banner(banner, options)
    end
  end

  # Renderiza banner com HTML customizado
  def render_custom_html_banner(banner)
    content = banner.custom_html.html_safe
    
    # Adicionar CSS customizado se presente
    if banner.custom_css.present?
      content = content_tag(:style, banner.custom_css.html_safe) + content
    end
    
    # Envolver em link se necessário
    if banner.link_url.present?
      link_to content, banner.link_url, 
              class: 'banner-link',
              target: '_blank',
              data: { banner_id: banner.id, action: 'click' }
    else
      content
    end
  end

  # Renderiza banner com imagem
  def render_image_banner(banner, options = {})
    image = get_banner_image(banner)
    return '' unless image

    image_tag = image_tag(image, 
                         alt: banner.title,
                         title: banner.description,
                         class: 'banner-image',
                         loading: 'lazy')

    # Adicionar overlay com texto se necessário
    if options[:show_text] && (banner.title.present? || banner.description.present?)
      image_tag += content_tag(:div, class: 'banner-overlay') do
        content_tag(:h3, banner.title, class: 'banner-title') +
        content_tag(:p, banner.description, class: 'banner-description')
      end
    end

    # Adicionar botão de fechar se configurado
    if banner.show_close_button?
      image_tag += content_tag(:button, '×', 
                              class: 'banner-close',
                              data: { banner_id: banner.id, action: 'close' })
    end

    # Envolver em link
    if banner.link_url.present?
      link_to image_tag, banner.link_url,
              class: 'banner-link',
              target: '_blank',
              data: { banner_id: banner.id, action: 'click' }
    else
      image_tag
    end
  end

  # Obtém a imagem apropriada baseada no dispositivo
  def get_banner_image(banner)
    device = detect_device_type
    
    case device
    when 'mobile'
      banner.mobile_image.attached? ? banner.mobile_image : banner.desktop_image
    when 'tablet'
      banner.tablet_image.attached? ? banner.tablet_image : banner.desktop_image
    else
      banner.desktop_image
    end
  end

  # Detecta o tipo de dispositivo
  def detect_device_type
    user_agent = request.user_agent.downcase
    
    if user_agent.include?('mobile') || user_agent.include?('android') || user_agent.include?('iphone')
      'mobile'
    elsif user_agent.include?('tablet') || user_agent.include?('ipad')
      'tablet'
    else
      'desktop'
    end
  end

  # Obtém banners para uma posição específica
  def get_banners_for_position(position, options = {})
    banners = Banner.active
                   .current
                   .by_position(position)
                   .by_device(detect_device_type)
                   .ordered

    # Filtrar por categoria se especificada
    if options[:category_id].present?
      banners = banners.joins(:categories).where(categories: { id: options[:category_id] })
    end

    # Filtrar por provedor se especificado
    if options[:provider_id].present?
      banners = banners.where(provider_id: options[:provider_id])
    end

    # Limitar quantidade se especificado
    if options[:limit].present?
      banners = banners.limit(options[:limit])
    end

    banners
  end

  # Gera atributos data para o banner
  def banner_data_attributes(banner)
    {
      banner_id: banner.id,
      banner_type: banner.banner_type,
      priority: banner.priority,
      display_frequency: banner.display_frequency,
      tracking: banner.conversion_tracking_code.present?
    }
  end

  # Gera JavaScript para tracking de impressões
  def banner_impression_script(banner_ids = nil)
    return '' unless banner_ids.present?
    
    javascript_tag do
      raw "
        document.addEventListener('DOMContentLoaded', function() {
          const bannerIds = #{banner_ids.to_json};
          
          bannerIds.forEach(function(bannerId) {
            const banner = document.getElementById('banner-' + bannerId);
            if (banner) {
              // Registrar impressão quando o banner estiver visível
              const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                  if (entry.isIntersecting) {
                    fetch('/banners/' + bannerId + '/impression', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').content
                      }
                    });
                    observer.unobserve(entry.target);
                  }
                });
              }, { threshold: 0.5 });
              
              observer.observe(banner);
            }
          });
          
          // Handler para cliques em banners
          document.addEventListener('click', function(e) {
            if (e.target.closest('[data-action=\"click\"]')) {
              const bannerId = e.target.closest('[data-banner-id]').dataset.bannerId;
              fetch('/banners/' + bannerId + '/click', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').content
                }
              });
            }
            
            // Handler para botão de fechar
            if (e.target.closest('[data-action=\"close\"]')) {
              const banner = e.target.closest('.banner');
              banner.style.display = 'none';
            }
          });
        });
      "
    end
  end

  # Gera CSS básico para banners
  def banner_base_styles
    content_tag :style do
      raw "
        .banners-container { margin: 10px 0; }
        .banner { position: relative; margin-bottom: 10px; }
        .banner-image { max-width: 100%; height: auto; display: block; }
        .banner-link { text-decoration: none; display: block; }
        .banner-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.7));
          color: white;
          padding: 20px;
        }
        .banner-title { margin: 0 0 5px 0; font-size: 1.2em; font-weight: bold; }
        .banner-description { margin: 0; font-size: 0.9em; }
        .banner-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0,0,0,0.5);
          color: white;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          cursor: pointer;
          font-size: 18px;
          line-height: 1;
        }
        .banner-close:hover { background: rgba(0,0,0,0.8); }
        
        /* Estilos responsivos */
        @media (max-width: 768px) {
          .banner-overlay { padding: 10px; }
          .banner-title { font-size: 1em; }
          .banner-description { font-size: 0.8em; }
        }
        
        /* Estilos por tipo de banner */
        .banner-popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 9999;
          background: white;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        
        .banner-mobile_sticky {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1000;
        }
        
        .banner-header { margin-bottom: 0; }
        .banner-footer { margin-top: 0; }
      "
    end
  end
end