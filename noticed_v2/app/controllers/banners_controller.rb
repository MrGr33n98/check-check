class BannersController < ApplicationController
  before_action :set_banner, only: [:show, :click, :impression]
  skip_before_action :verify_authenticity_token, only: [:click, :impression]

  # GET /banners
  # Retorna banners ativos para uma posição específica
  def index
    @banners = Banner.active
                    .current
                    .by_position(params[:position])
                    .by_device(detect_device)
                    .ordered

    # Filtrar por categoria se especificada
    if params[:category_id].present?
      @banners = @banners.joins(:categories).where(categories: { id: params[:category_id] })
    end

    # Filtrar por provedor se especificada
    if params[:provider_id].present?
      @banners = @banners.where(provider_id: params[:provider_id])
    end

    # Aplicar regras de frequência de exibição
    @banners = apply_frequency_rules(@banners)

    respond_to do |format|
      format.json { render json: { success: true, data: @banners.as_json(include_images: true) } }
      format.html
    end
  end

  # GET /banners/:id
  def show
    respond_to do |format|
      format.json { render json: @banner.as_json(include_images: true) }
      format.html
    end
  end

  # POST /banners/:id/click
  # Registra um clique no banner
  def click
    @banner.increment_clicks!
    
    # Registrar no analytics se configurado
    track_conversion(@banner) if @banner.conversion_tracking_code.present?
    
    respond_to do |format|
      format.json { render json: { status: 'success', redirect_url: @banner.link_url } }
      format.html { redirect_to @banner.link_url }
    end
  end

  # POST /banners/:id/impression
  # Registra uma impressão do banner
  def impression
    @banner.increment_impressions!
    
    respond_to do |format|
      format.json { render json: { status: 'success' } }
      format.html { head :ok }
    end
  end

  # GET /banners/by_position/:position
  # Retorna banners para uma posição específica (helper route)
  def by_position
    @banners = Banner.active
                    .current
                    .by_position(params[:position])
                    .by_device(detect_device)
                    .ordered
                    .limit(params[:limit] || 5)

    @banners = apply_frequency_rules(@banners)

    respond_to do |format|
      format.json { render json: { success: true, data: @banners.as_json(include_images: true) } }
      format.html { render :index }
    end
  end

  private

  def set_banner
    @banner = Banner.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    respond_to do |format|
      format.json { render json: { error: 'Banner não encontrado' }, status: :not_found }
      format.html { redirect_to root_path, alert: 'Banner não encontrado' }
    end
  end

  def detect_device
    user_agent = request.user_agent.downcase
    
    if user_agent.include?('mobile') || user_agent.include?('android') || user_agent.include?('iphone')
      'mobile'
    elsif user_agent.include?('tablet') || user_agent.include?('ipad')
      'tablet'
    else
      'desktop'
    end
  end

  def apply_frequency_rules(banners)
    return banners unless session[:banner_views]

    filtered_banners = []
    
    banners.each do |banner|
      case banner.display_frequency
      when 1 # Sempre
        filtered_banners << banner
      when 2 # Uma vez por sessão
        unless session[:banner_views][banner.id.to_s]&.include?('session')
          filtered_banners << banner
          track_banner_view(banner, 'session')
        end
      when 3 # Uma vez por dia
        last_view = session[:banner_views][banner.id.to_s]&.dig('daily')
        if last_view.nil? || Date.parse(last_view) < Date.current
          filtered_banners << banner
          track_banner_view(banner, 'daily')
        end
      else
        filtered_banners << banner
      end
    end

    filtered_banners
  end

  def track_banner_view(banner, frequency_type)
    session[:banner_views] ||= {}
    session[:banner_views][banner.id.to_s] ||= {}
    
    case frequency_type
    when 'session'
      session[:banner_views][banner.id.to_s]['session'] = true
    when 'daily'
      session[:banner_views][banner.id.to_s]['daily'] = Date.current.to_s
    end
  end

  def track_conversion(banner)
    # Implementar integração com Google Analytics, Facebook Pixel, etc.
    # Este é um exemplo básico
    Rails.logger.info "Banner #{banner.id} - Conversão registrada: #{banner.title}"
    
    # Exemplo de como poderia ser implementado:
    # if banner.conversion_tracking_code.include?('gtag')
    #   # Enviar evento para Google Analytics
    # elsif banner.conversion_tracking_code.include?('fbq')
    #   # Enviar evento para Facebook Pixel
    # end
  end
end