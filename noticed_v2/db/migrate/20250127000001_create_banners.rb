class CreateBanners < ActiveRecord::Migration[7.0]
  def change
    create_table :banners do |t|
      t.string :title, null: false
      t.text :description
      t.string :link_url, null: false
      t.integer :banner_type, null: false, default: 0
      t.integer :status, null: false, default: 0
      t.integer :device_target, null: false, default: 0
      t.integer :priority, null: false, default: 0
      t.datetime :starts_at, null: false
      t.datetime :ends_at
      t.integer :click_count, null: false, default: 0
      t.integer :impression_count, null: false, default: 0
      t.text :conversion_tracking_code
      t.references :provider, null: true, foreign_key: true
      t.text :custom_css
      t.text :custom_html
      t.boolean :show_close_button, default: false
      t.integer :display_frequency, default: 1 # 1=sempre, 2=uma vez por sessão, 3=uma vez por dia
      t.json :targeting_rules # Para regras avançadas de segmentação

      t.timestamps
    end

    add_index :banners, :banner_type
    add_index :banners, :status
    add_index :banners, :device_target
    add_index :banners, :priority
    add_index :banners, :starts_at
    add_index :banners, :ends_at
    add_index :banners, [:status, :banner_type]
    add_index :banners, [:starts_at, :ends_at]
  end
end