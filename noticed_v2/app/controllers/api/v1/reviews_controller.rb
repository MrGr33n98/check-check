class Api::V1::ReviewsController < Api::V1::BaseController
  before_action :set_review, only: [:show, :update, :destroy]
  
  # GET /api/v1/reviews
  def index
    @reviews = Review.includes(:solution, :user)
    
    if params[:solution_id].present?
      @reviews = @reviews.where(solution_id: params[:solution_id])
    end
    
    if params[:user_id].present?
      @reviews = @reviews.where(user_id: params[:user_id])
    end
    
    @reviews = @reviews.order(created_at: :desc)
    
    render json: @reviews, include: [:solution, :user]
  end
  
  # GET /api/v1/reviews/:id
  def show
    render json: @review, include: [:solution, :user]
  end
  
  # POST /api/v1/reviews
  def create
    @review = Review.new(review_params)
    
    if @review.save
      render json: @review, status: :created, include: [:solution, :user]
    else
      render json: { errors: @review.errors }, status: :unprocessable_entity
    end
  end
  
  # PUT/PATCH /api/v1/reviews/:id
  def update
    if @review.update(review_params)
      render json: @review, include: [:solution, :user]
    else
      render json: { errors: @review.errors }, status: :unprocessable_entity
    end
  end
  
  # DELETE /api/v1/reviews/:id
  def destroy
    @review.destroy
    head :no_content
  end
  
  private
  
  def set_review
    @review = Review.find(params[:id])
  end
  
  def review_params
    params.require(:review).permit(:solution_id, :user_id, :rating, :title, :comment)
  end
end