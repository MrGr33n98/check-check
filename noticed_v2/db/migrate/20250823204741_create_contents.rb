class CreateContents < ActiveRecord::Migration[7.0]
  def change
    create_table :contents do |t|
      t.string :title, null: false
      t.text :short_description
      t.string :category_tags, array: true, default: []
      t.string :lp_url
      t.string :format
      t.string :level
      t.string :seo_url
      t.string :seo_title
      t.text :seo_description
      t.references :product, null: true, foreign_key: true
      t.string :source
      t.string :maker
      t.string :kind
      t.boolean :active, default: true

      t.timestamps
    end
    
    add_index :contents, :seo_url, unique: true
    add_index :contents, :active
    add_index :contents, :category_tags, using: 'gin'
  end
end
