class AddHierarchyAndBannerAndPromotionalTextToCategories < ActiveRecord::Migration[7.0]
  def change
    add_column :categories, :is_main_category, :boolean
    add_column :categories, :promotional_text, :string
  end
end