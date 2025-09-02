class Api::V1::PromoBannersController < ApplicationController
  before_action :set_promo_banner, only: [:show]

  # GET /api/v1/promo_banners
  def index
    Rails.logger.info('API::V1::PromoBannersController#index called')
    @promo_banners = PromoBanner.active.ordered
    
    # Filter by position if specified
    @promo_banners = @promo_banners.by_position(params[:position]) if params[:position].present?
    
    render json: @promo_banners.map { |banner| banner_json(banner) }
  end

  # GET /api/v1/promo_banners/:id
  def show
    render json: banner_json(@promo_banner)
  end

  # GET /api/v1/promo_banners/sidebar
  def sidebar
    @banner = PromoBanner.sidebar_banner
    if @banner
      render json: banner_json(@banner)
    else
      render json: { error: 'No sidebar banner found' }, status: :not_found
    end
  end

  private

  def set_promo_banner
    @promo_banner = PromoBanner.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Banner not found' }, status: :not_found
  end

  def banner_json(banner)
    {
      id: banner.id,
      title: banner.title,
      subtitle: banner.subtitle,
      button_text: banner.button_text,
      button_url: banner.button_url,
      button_secondary_text: banner.button_secondary_text,
      button_secondary_url: banner.button_secondary_url,
      background_color: banner.background_color,
      text_color: banner.text_color,
      position: banner.position,
      priority: banner.priority,
      background_image_url: banner.background_image_url,
      show_title: banner.show_title,
      show_subtitle: banner.show_subtitle,
      overlay_enabled: banner.overlay_enabled,
      overlay_color: banner.overlay_color,
      overlay_opacity: banner.overlay_opacity,
      text_align: banner.text_align,
      created_at: banner.created_at,
      updated_at: banner.updated_at
    }
  end
end