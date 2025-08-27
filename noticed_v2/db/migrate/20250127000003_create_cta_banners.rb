class CreateCtaBanners < ActiveRecord::Migration[7.0]
  def change
    create_table :cta_banners do |t|
      t.string :title, null: false
      t.text :subtitle
      t.string :button1_text, null: false
      t.string :button1_url, null: false
      t.string :button2_text, null: false
      t.string :button2_url, null: false
      t.string :background_type, null: false, default: 'solid'
      t.string :background_color
      t.boolean :enabled, null: false, default: true
      t.string :position, default: 'homepage'

      t.timestamps
    end

    add_index :cta_banners, :enabled
    add_index :cta_banners, :position
    add_index :cta_banners, [:enabled, :position]
  end
end