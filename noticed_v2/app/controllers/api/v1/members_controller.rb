class Api::V1::MembersController < Api::V1::BaseController
  before_action :set_member, only: [:show, :update, :destroy]
  
  # GET /api/v1/members
  def index
    @members = Member.all
    
    # Filters
    @members = @members.where(role: params[:role]) if params[:role].present?
    @members = @members.where(status: params[:status]) if params[:status].present?
    @members = @members.where(subscription_plan: params[:subscription_plan]) if params[:subscription_plan].present?
    @members = @members.where(subscription_status: params[:subscription_status]) if params[:subscription_status].present?
    
    # Search
    if params[:search].present?
      @members = @members.where("name ILIKE ? OR email ILIKE ? OR company ILIKE ?", 
                               "%#{params[:search]}%", "%#{params[:search]}%", "%#{params[:search]}%")
    end
    
    # Sorting
    case params[:sort]
    when 'name'
      @members = @members.order(:name)
    when 'company'
      @members = @members.order(:company)
    when 'subscription_plan'
      @members = @members.order(:subscription_plan)
    when 'expires_at'
      @members = @members.order(:expires_at)
    else
      @members = @members.order(created_at: :desc)
    end
    
    # Pagination
    page = params[:page] || 1
    per_page = params[:per_page] || 20
    @members = @members.page(page).per(per_page)
    
    render json: @members
  end
  
  # GET /api/v1/members/:id
  def show
    render json: @member
  end
  
  # POST /api/v1/members
  def create
    @member = Member.new(member_params)
    
    if @member.save
      render json: @member, status: :created
    else
      render json: { errors: @member.errors }, status: :unprocessable_entity
    end
  end
  
  # PUT/PATCH /api/v1/members/:id
  def update
    if @member.update(member_params)
      render json: @member
    else
      render json: { errors: @member.errors }, status: :unprocessable_entity
    end
  end
  
  # DELETE /api/v1/members/:id
  def destroy
    @member.destroy
    head :no_content
  end
  
  private
  
  def set_member
    @member = Member.find(params[:id])
  end
  
  def member_params
    params.require(:member).permit(:name, :email, :company, :role, :status, :subscription_plan, 
                                   :subscription_status, :trial_ends_at, :expires_at)
  end
end