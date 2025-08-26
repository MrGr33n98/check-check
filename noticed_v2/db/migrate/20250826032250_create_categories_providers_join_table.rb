class CreateCategoriesProvidersJoinTable < ActiveRecord::Migration[7.0]
  def change
    create_join_table :categories, :providers do |t|
      # t.index [:category_id, :provider_id]
      # t.index [:provider_id, :category_id]
    end
  end
end
