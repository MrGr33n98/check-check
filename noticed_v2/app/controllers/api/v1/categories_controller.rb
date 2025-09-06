class Api::V1::CategoriesController < Api::V1::BaseController
  before_action :set_category, only: [:show]

  def index
    categories = Category.where(active: true, parent_id: nil)
    categories = categories.where(featured: params[:featured]) if params[:featured].present?
    render json: categories.order(:name).as_json(include: { children: { include: :children } })
  end

  def show
    render json: @category
  end

  private

  def set_category
    slug_or_id = params[:id].to_s
    @category = Category.friendly.find_by(slug: slug_or_id.downcase) ||
                Category.find_by(slug: slug_or_id.downcase) ||
                (slug_or_id =~ /\A\d+\z/ ? Category.find_by(id: slug_or_id) : nil)

    return if @category.present?

    render json: { error: 'category_not_found' }, status: :not_found
  end
end