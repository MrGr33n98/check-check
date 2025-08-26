class CreateProvidersSubcategoriesJoinTable < ActiveRecord::Migration[7.0]
  def change
    create_join_table :providers, :subcategories do |t|
      # t.index [:provider_id, :subcategory_id]
      # t.index [:subcategory_id, :provider_id]
    end
  end
end
