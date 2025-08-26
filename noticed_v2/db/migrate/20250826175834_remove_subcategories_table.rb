class RemoveSubcategoriesTable < ActiveRecord::Migration[7.0]
  def change
    drop_table :subcategories
  end
end