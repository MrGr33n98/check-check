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
      data: @dynamic_banners.map(&:to_json_api),
      meta: {
        total: @dynamic_banners.count,
        active_count: DynamicBanner.active.count,
        timestamp: Time.current.iso8601
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