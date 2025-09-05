class CreateProviders < ActiveRecord::Migration[7.0]
  def change
    create_table :providers do |t|
      t.string :name, null: false
      t.string :seo_url
      t.string :title
      t.text :short_description
      t.string :country
      t.string :address
      t.string :phone
      t.string :social_links, array: true, default: []
      t.integer :members_count, default: 0
      t.integer :foundation_year
      t.date :premium_until
      t.string :revenue
      t.string :tags, array: true, default: []

      t.timestamps
    end
    
    add_index :providers, :seo_url, unique: true
    add_index :providers, :name
    add_index :providers, :country
    add_index :providers, :tags, using: 'gin'
  end
end
