class CreatePromoBanners < ActiveRecord::Migration[7.0]
  def change
    create_table :promo_banners do |t|
      t.string :title, null: false
      t.text :subtitle
      t.string :button_text
      t.string :button_url
      t.string :background_color, default: '#3B82F6'
      t.string :text_color, default: '#FFFFFF'
      t.string :position, default: 'sidebar'
      t.boolean :active, default: true
      t.integer :priority, default: 0
      t.string :button_secondary_text
      t.string :button_secondary_url

      t.timestamps
    end

    add_index :promo_banners, [:active, :priority]
    add_index :promo_banners, :position
  end
end
