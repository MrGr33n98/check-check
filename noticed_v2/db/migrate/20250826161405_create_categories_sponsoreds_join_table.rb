class CreateCategoriesSponsoredsJoinTable < ActiveRecord::Migration[7.0]
  def change
    create_join_table :categories, :sponsoreds do |t|
      # t.index [:category_id, :sponsored_id]
      # t.index [:sponsored_id, :category_id]
    end
  end
end
