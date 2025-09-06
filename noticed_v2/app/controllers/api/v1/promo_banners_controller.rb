class Api::V1::PromoBannersController < ApplicationController
  before_action :set_promo_banner, only: [:show]

  # GET /api/v1/promo_banners
  def index
    Rails.logger.info('API::V1::PromoBannersController#index called')
    @promo_banners = PromoBanner.active.ordered
    
    # Filter by position if specified
    @promo_banners = @promo_banners.by_position(params[:position]) if params[:position].present?
    
    render json: @promo_banners, each_serializer: Api::V1::PromoBannerSerializer
  end

  # GET /api/v1/promo_banners/:id
  def show
    render json: @promo_banner, serializer: Api::V1::PromoBannerSerializer
  end

  # GET /api/v1/promo_banners/sidebar
  def sidebar
    @banner = PromoBanner.sidebar_banner
    if @banner
      render json: @banner, serializer: Api::V1::PromoBannerSerializer
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

end