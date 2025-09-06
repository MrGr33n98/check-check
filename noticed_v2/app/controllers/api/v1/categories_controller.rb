class Api::V1::CategoriesController < Api::V1::BaseController
  before_action :set_category, only: [:show, :update, :destroy]
  
  # GET /api/v1/categories
  def index
    cache_key = "categories/index/#{params[:featured]}"
    @categories = Rails.cache.fetch(cache_key, expires_in: 12.hours) do
      categories = Category.where(active: true, parent_id: nil)
                           .with_attached_photo
                           .with_attached_banner_image
      categories = categories.where(featured: params[:featured]) if params[:featured].present?
      categories.includes(children: :children).order(:name).to_a
    end

    render json: @categories
  end

  # GET /api/v1/categories/:id
  def show
    cache_key = "categories/#{@category.cache_key_with_version}"
    category = Rails.cache.fetch(cache_key, expires_in: 12.hours) { @category }
    render json: category
  end
  
  # POST /api/v1/categories
  def create
    @category = Category.new(category_params)
    
    if @category.save
      render json: @category, status: :created
    else
      render json: { errors: @category.errors }, status: :unprocessable_entity
    end
  end
  
  # PUT/PATCH /api/v1/categories/:id
  def update
    if @category.update(category_params)
      render json: @category
    else
      render json: { errors: @category.errors }, status: :unprocessable_entity
    end
  end
  
  # DELETE /api/v1/categories/:id
  def destroy
    @category.destroy
    head :no_content
  end
  
  private
  
  def set_category
    @category = Category.with_attached_photo
                        .with_attached_banner_image
                        .includes(children: :children)
                        .find_by(slug: params[:id])
    @category ||= Category.with_attached_photo
                          .with_attached_banner_image
                          .includes(children: :children)
                          .find(params[:id])
  end
  
  def category_params
    params.require(:category).permit(:name, :description, :featured, :photo, :banner_image)
  end
end
