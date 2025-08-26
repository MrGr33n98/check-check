class Api::V1::ArticlesController < Api::V1::BaseController
  before_action :set_article, only: [:show, :update, :destroy]
  
  # GET /api/v1/articles
  def index
    @articles = Article.all
    
    # Filters
    @articles = @articles.where(status: params[:status]) if params[:status].present?
    @articles = @articles.where(category: params[:category]) if params[:category].present?
    @articles = @articles.where(featured: params[:featured]) if params[:featured].present?
    
    # Published filter
    if params[:published].present?
      if params[:published] == 'true'
        @articles = @articles.published
      end
    end
    
    # Search
    if params[:search].present?
      @articles = @articles.where("title ILIKE ? OR content ILIKE ? OR excerpt ILIKE ?", 
                                "%#{params[:search]}%", "%#{params[:search]}%", "%#{params[:search]}%")
    end
    
    # Sorting
    case params[:sort]
    when 'title'
      @articles = @articles.order(:title)
    when 'published_at'
      @articles = @articles.order(:published_at)
    when 'category'
      @articles = @articles.order(:category)
    else
      @articles = @articles.recent
    end
    
    # Pagination
    page = params[:page] || 1
    per_page = params[:per_page] || 20
    @articles = @articles.page(page).per(per_page)
    
    render json: @articles
  end
  
  # GET /api/v1/articles/:id
  def show
    if @article.published? || current_user&.admin?
      render json: @article
    else
      render json: { error: 'Article not found' }, status: :not_found
    end
  end
  
  # POST /api/v1/articles
  def create
    @article = Article.new(article_params)
    
    if @article.save
      render json: @article, status: :created
    else
      render json: { errors: @article.errors }, status: :unprocessable_entity
    end
  end
  
  # PUT/PATCH /api/v1/articles/:id
  def update
    if @article.update(article_params)
      render json: @article
    else
      render json: { errors: @article.errors }, status: :unprocessable_entity
    end
  end
  
  # DELETE /api/v1/articles/:id
  def destroy
    @article.destroy
    head :no_content
  end
  
  private
  
  def set_article
    @article = Article.find_by!(slug: params[:id]) || Article.find(params[:id])
  end
  
  def article_params
    params.require(:article).permit(:title, :content, :excerpt, :status, :published_at, 
                                   :author, :category, :featured)
  end
end