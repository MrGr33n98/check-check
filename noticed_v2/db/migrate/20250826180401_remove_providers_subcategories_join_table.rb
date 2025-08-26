class RemoveProvidersSubcategoriesJoinTable < ActiveRecord::Migration[7.0]
  def change
    drop_table :providers_subcategories
  end
end