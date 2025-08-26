class Public::CategoriesController < ApplicationController
  def index
    @main_categories = Category.where(is_main_category: true).includes(:children, :providers).order(:name)
    @all_categories = Category.order(:name) # For the sidebar menu
  end
end