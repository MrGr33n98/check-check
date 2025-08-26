class Api::V1::ProductAccessesController < Api::V1::BaseController
  before_action :set_product_access, only: [:show, :update, :destroy]
  
  # GET /api/v1/product_accesses
  def index
    @product_accesses = ProductAccess.includes(:member, :solution)
    
    # Filters
    @product_accesses = @product_accesses.where(member_id: params[:member_id]) if params[:member_id].present?
    @product_accesses = @product_accesses.where(solution_id: params[:solution_id]) if params[:solution_id].present?
    @product_accesses = @product_accesses.where(access_level: params[:access_level]) if params[:access_level].present?
    
    # Active filter
    if params[:active].present?
      if params[:active] == 'true'
        @product_accesses = @product_accesses.active
      else
        @product_accesses = @product_accesses.where("expires_at IS NOT NULL AND expires_at <= ?", Time.current)
      end
    end
    
    # Sorting
    case params[:sort]
    when 'member'
      @product_accesses = @product_accesses.joins(:member).order('members.name')
    when 'solution'
      @product_accesses = @product_accesses.joins(:solution).order('solutions.name')
    when 'expires_at'
      @product_accesses = @product_accesses.order(:expires_at)
    else
      @product_accesses = @product_accesses.order(created_at: :desc)
    end
    
    # Pagination
    page = params[:page] || 1
    per_page = params[:per_page] || 20
    @product_accesses = @product_accesses.page(page).per(per_page)
    
    render json: @product_accesses, include: [:member, :solution]
  end
  
  # GET /api/v1/product_accesses/:id
  def show
    render json: @product_access, include: [:member, :solution]
  end
  
  # POST /api/v1/product_accesses
  def create
    @product_access = ProductAccess.new(product_access_params)
    
    if @product_access.save
      render json: @product_access, status: :created, include: [:member, :solution]
    else
      render json: { errors: @product_access.errors }, status: :unprocessable_entity
    end
  end
  
  # PUT/PATCH /api/v1/product_accesses/:id
  def update
    if @product_access.update(product_access_params)
      render json: @product_access, include: [:member, :solution]
    else
      render json: { errors: @product_access.errors }, status: :unprocessable_entity
    end
  end
  
  # DELETE /api/v1/product_accesses/:id
  def destroy
    @product_access.destroy
    head :no_content
  end
  
  private
  
  def set_product_access
    @product_access = ProductAccess.find(params[:id])
  end
  
  def product_access_params
    params.require(:product_access).permit(:member_id, :solution_id, :access_level, :expires_at)
  end
end