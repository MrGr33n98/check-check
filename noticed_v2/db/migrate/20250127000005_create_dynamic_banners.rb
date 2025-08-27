class CreateDynamicBanners < ActiveRecord::Migration[7.0]
  def change
    create_table :dynamic_banners do |t|
      t.string :title, null: false, limit: 255
      t.text :description, null: false, limit: 500
      t.string :link_url, null: false
      t.integer :display_order, null: false, default: 1
      t.boolean :active, null: false, default: true
      t.timestamps
    end

    add_index :dynamic_banners, :active
    add_index :dynamic_banners, :display_order
    add_index :dynamic_banners, [:active, :display_order], name: 'index_dynamic_banners_on_active_and_order'
  end
end