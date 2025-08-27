class CreateBannersCategoriesJoinTable < ActiveRecord::Migration[7.0]
  def change
    create_join_table :banners, :categories do |t|
      t.index :banner_id
      t.index :category_id
      t.index [:banner_id, :category_id], unique: true
    end
  end
end