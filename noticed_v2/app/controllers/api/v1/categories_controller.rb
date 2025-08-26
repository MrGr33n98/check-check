class Api::V1::CategoriesController < Api::V1::BaseController
  before_action :set_category, only: [:show, :update, :destroy]
  
  # GET /api/v1/categories
  def index
    @categories = Category.where(active: true)
    if params[:featured].present?
      @categories = @categories.where(featured: params[:featured])
    end
    @categories = @categories.order(:name)
    
    render json: @categories
  end
  
  # GET /api/v1/categories/:id
  def show
    render json: @category
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
    @category = Category.find_by!(slug: params[:id]) || Category.find(params[:id])
  end
  
  def category_params
    params.require(:category).permit(:name, :description, :featured, :photo)
  end
end