class Api::V1::DynamicBannersController < ApplicationController
  before_action :set_cors_headers
  before_action :set_dynamic_banner, only: [:click, :impression]

  # GET /api/v1/dynamic_banners
  def index
    @dynamic_banners = DynamicBanner.active.ordered
    
    render json: {
      status: 'success',
      data: @dynamic_banners.map(&:to_json_api),
      meta: {
        total: @dynamic_banners.count,
        timestamp: Time.current.iso8601
      }
    }
  end

  # GET /api/v1/dynamic_banners/active
  def active
    @dynamic_banners = DynamicBanner.active.ordered.limit(5)
    
    render json: {
      status: 'success',
      data: @dynamic_banners.map do |banner|
        {
          id: banner.id,
          title: banner.title,
          description: banner.description,
          link_url: banner.link_url,
          display_order: banner.display_order,
          active: banner.active,
          image_url: banner.image_url || '/api/placeholder/800/200',
          created_at: banner.created_at,
          updated_at: banner.updated_at
        }
      end,
      meta: {
        total: @dynamic_banners.count,
        active_count: DynamicBanner.active.count,
        timestamp: Time.current.iso8601
      }
    }
  rescue => e
    Rails.logger.error "Error in dynamic_banners#active: #{e.message}"
    Rails.logger.error e.backtrace.join("\n")
    
    # Return default company banner when there's an error
    render json: {
      status: 'success',
      data: [{
        id: 0,
        title: 'SolarFinder - Encontre as Melhores Empresas',
        description: 'Conectamos você com as melhores empresas de energia solar do Brasil. Compare preços, avaliações e encontre a solução perfeita!',
        link_url: '/empresa/cadastro',
        display_order: 1,
        active: true,
        image_url: '/api/placeholder/800/200',
        created_at: Time.current.iso8601,
        updated_at: Time.current.iso8601
      }],
      meta: {
        total: 1,
        active_count: 0,
        timestamp: Time.current.iso8601,
        fallback: true
      }
    }
  end

  # POST /api/v1/dynamic_banners/:id/click
  def click
    # Log click event for analytics
    Rails.logger.info "Dynamic Banner Click: ID #{@dynamic_banner.id}, Title: #{@dynamic_banner.title}"
    
    # You can add analytics tracking here
    # AnalyticsService.track_banner_click(@dynamic_banner.id, request.remote_ip)
    
    render json: {
      status: 'success',
      message: 'Click registered',
      data: {
        banner_id: @dynamic_banner.id,
        title: @dynamic_banner.title,
        link_url: @dynamic_banner.link_url
      }
    }
  end

  # POST /api/v1/dynamic_banners/:id/impression
  def impression
    # Log impression event for analytics
    Rails.logger.info "Dynamic Banner Impression: ID #{@dynamic_banner.id}, Title: #{@dynamic_banner.title}"
    
    # You can add analytics tracking here
    # AnalyticsService.track_banner_impression(@dynamic_banner.id, request.remote_ip)
    
    render json: {
      status: 'success',
      message: 'Impression registered',
      data: {
        banner_id: @dynamic_banner.id,
        title: @dynamic_banner.title
      }
    }
  end

  private

  def set_dynamic_banner
    @dynamic_banner = DynamicBanner.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: {
      status: 'error',
      message: 'Banner not found'
    }, status: :not_found
  end

  def set_cors_headers
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
  end
end