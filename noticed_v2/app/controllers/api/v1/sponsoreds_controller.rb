class Api::V1::SponsoredsController < Api::V1::BaseController
  before_action :set_sponsored, only: [:show, :update, :destroy]
  
  # GET /api/v1/sponsoreds
  def index
    @sponsoreds = Sponsored.all
    
    # Filters
    @sponsoreds = @sponsoreds.where(position: params[:position]) if params[:position].present?
    @sponsoreds = @sponsoreds.where(status: params[:status]) if params[:status].present?
    
    # Active filter
    if params[:active].present?
      if params[:active] == 'true'
        @sponsoreds = @sponsoreds.active
      end
    end
    
    # Sorting
    case params[:sort]
    when 'priority'
      @sponsoreds = @sponsoreds.order(:priority)
    when 'ends_at'
      @sponsoreds = @sponsoreds.order(:ends_at)
    else
      @sponsoreds = @sponsoreds.ordered
    end
    
    # Pagination
    page = params[:page] || 1
    per_page = params[:per_page] || 20
    @sponsoreds = @sponsoreds.page(page).per(per_page)
    
    render json: @sponsoreds
  end
  
  # GET /api/v1/sponsoreds/:id
  def show
    render json: @sponsored
  end
  
  # POST /api/v1/sponsoreds
  def create
    @sponsored = Sponsored.new(sponsored_params)
    
    if @sponsored.save
      render json: @sponsored, status: :created
    else
      render json: { errors: @sponsored.errors }, status: :unprocessable_entity
    end
  end
  
  # PUT/PATCH /api/v1/sponsoreds/:id
  def update
    if @sponsored.update(sponsored_params)
      render json: @sponsored
    else
      render json: { errors: @sponsored.errors }, status: :unprocessable_entity
    end
  end
  
  # DELETE /api/v1/sponsoreds/:id
  def destroy
    @sponsored.destroy
    head :no_content
  end
  
  private
  
  def set_sponsored
    @sponsored = Sponsored.find(params[:id])
  end
  
  def sponsored_params
    params.require(:sponsored).permit(:title, :description, :image_url, :link_url, :position, 
                                     :status, :starts_at, :ends_at, :priority)
  end
end