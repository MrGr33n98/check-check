class Api::V1::SolutionsController < Api::V1::BaseController
  before_action :set_solution, only: [:show, :update, :destroy]
  
  # GET /api/v1/solutions
  def index
    @solutions = Solution.includes(:categories, :tags, :reviews)
    
    if params[:category_id].present?
      category = Category.find_by(slug: params[:category_id]) || Category.find(params[:category_id])
      @solutions = @solutions.joins(:categories).where(categories: { id: category.id })
    end
    
    if params[:featured].present?
      @solutions = @solutions.where(featured: params[:featured])
    end
    
    @solutions = @solutions.order(:name)
    
    render json: @solutions, include: [:categories, :tags]
  end
  
  # GET /api/v1/solutions/:id
  def show
    render json: @solution, include: [:categories, :tags, :reviews]
  end
  
  # POST /api/v1/solutions
  def create
    @solution = Solution.new(solution_params)
    
    if @solution.save
      render json: @solution, status: :created, include: [:categories, :tags]
    else
      render json: { errors: @solution.errors }, status: :unprocessable_entity
    end
  end
  
  # PUT/PATCH /api/v1/solutions/:id
  def update
    if @solution.update(solution_params)
      render json: @solution, include: [:categories, :tags]
    else
      render json: { errors: @solution.errors }, status: :unprocessable_entity
    end
  end
  
  # DELETE /api/v1/solutions/:id
  def destroy
    @solution.destroy
    head :no_content
  end
  
  private
  
  def set_solution
    @solution = Solution.find(params[:id])
  end
  
  def solution_params
    params.require(:solution).permit(:name, :company, :description, :long_description, :website, :featured, :user_id, category_ids: [], tag_ids: [])
  end
end