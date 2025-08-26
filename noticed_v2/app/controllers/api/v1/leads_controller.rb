class Api::V1::LeadsController < Api::V1::BaseController
  before_action :set_lead, only: [:show, :update, :destroy]
  
  # GET /api/v1/leads
  def index
    @leads = Lead.includes(:solution)
    
    if params[:solution_id].present?
      @leads = @leads.where(solution_id: params[:solution_id])
    end
    
    if params[:status].present?
      @leads = @leads.where(status: params[:status])
    end
    
    @leads = @leads.order(created_at: :desc)
    
    render json: @leads, include: [:solution]
  end
  
  # GET /api/v1/leads/:id
  def show
    render json: @lead, include: [:solution]
  end
  
  # POST /api/v1/leads
  def create
    @lead = Lead.new(lead_params)
    
    if @lead.save
      render json: @lead, status: :created, include: [:solution]
    else
      render json: { errors: @lead.errors }, status: :unprocessable_entity
    end
  end
  
  # PUT/PATCH /api/v1/leads/:id
  def update
    if @lead.update(lead_params)
      render json: @lead, include: [:solution]
    else
      render json: { errors: @lead.errors }, status: :unprocessable_entity
    end
  end
  
  # DELETE /api/v1/leads/:id
  def destroy
    @lead.destroy
    head :no_content
  end
  
  private
  
  def set_lead
    @lead = Lead.find(params[:id])
  end
  
  def lead_params
    params.require(:lead).permit(:name, :email, :phone, :company, :message, :solution_id, :status)
  end
end