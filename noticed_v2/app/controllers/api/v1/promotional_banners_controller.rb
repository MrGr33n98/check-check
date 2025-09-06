class Api::V1::PromotionalBannersController < ApplicationController
  before_action :set_promotional_banner, only: [:show, :click, :impression]
  before_action :set_cors_headers
  
  # GET /api/v1/promotional_banners
  def index
    @promotional_banners = PromotionalBanner.active
                                          .includes(:provider, icon_attachment: :blob)
                                          .ordered

    render json: {
      success: true,
      data: @promotional_banners.map(&:api_data),
      count: @promotional_banners.size
    }
  rescue => e
    render json: {
      success: false,
      error: 'Failed to fetch promotional banners',
      data: []
    }, status: :internal_server_error
  end
  
  # GET /api/v1/promotional_banners/active
  def active
    @promotional_banners = PromotionalBanner.active
                                          .includes(:provider, icon_attachment: :blob)
                                          .ordered
                                          .limit(5)

    render json: {
      success: true,
      data: @promotional_banners.map(&:api_data),
      count: @promotional_banners.size
    }
  rescue => e
    render json: {
      success: false,
      error: 'Failed to fetch active promotional banners',
      data: []
    }, status: :internal_server_error
  end
  
  # GET /api/v1/promotional_banners/by_position/:position
  def by_position
    position = params[:position]
    @promotional_banners = PromotionalBanner.active
                                          .by_position(position)
                                          .includes(:provider, icon_attachment: :blob)
                                          .ordered

    render json: {
      success: true,
      data: @promotional_banners.map(&:api_data),
      count: @promotional_banners.size,
      position: position
    }
  rescue => e
    render json: {
      success: false,
      error: "Failed to fetch promotional banners for position: #{position}",
      data: []
    }, status: :internal_server_error
  end
  
  # GET /api/v1/promotional_banners/:id
  def show
    render json: {
      success: true,
      data: @promotional_banner.api_data
    }
  rescue => e
    render json: {
      success: false,
      error: 'Promotional banner not found'
    }, status: :not_found
  end
  
  # POST /api/v1/promotional_banners/:id/click
  def click
    @promotional_banner.increment!(:clicks_count)
    
    # Log click for analytics
    Rails.logger.info "PromotionalBanner Click: ID=#{@promotional_banner.id}, Provider=#{@promotional_banner.provider&.name}, URL=#{@promotional_banner.final_url}"
    
    render json: {
      success: true,
      message: 'Click registered successfully',
      redirect_url: @promotional_banner.final_url
    }
  rescue => e
    render json: {
      success: false,
      error: 'Failed to register click'
    }, status: :internal_server_error
  end
  
  # POST /api/v1/promotional_banners/:id/impression
  def impression
    @promotional_banner.increment!(:impressions_count)
    
    # Log impression for analytics
    Rails.logger.info "PromotionalBanner Impression: ID=#{@promotional_banner.id}, Provider=#{@promotional_banner.provider&.name}"
    
    render json: {
      success: true,
      message: 'Impression registered successfully'
    }
  rescue => e
    render json: {
      success: false,
      error: 'Failed to register impression'
    }, status: :internal_server_error
  end
  
  private
  
  def set_promotional_banner
    @promotional_banner = PromotionalBanner.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: {
      success: false,
      error: 'Promotional banner not found'
    }, status: :not_found
  end
  
  def set_cors_headers
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
  end
  
  def promotional_banner_params
    params.require(:promotional_banner).permit(
      :title, :background_color, :text_color, :url, :provider_id,
      :display_order, :active, :position, :utm_source, :utm_medium,
      :utm_campaign, :utm_term, :utm_content, :start_date, :end_date
    )
  end
end
