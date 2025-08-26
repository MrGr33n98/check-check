class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name, null: false
      t.string :seo_url
      t.integer :status, default: 0
      t.integer :kind, default: 0
      t.string :country
      t.date :premium_until

      t.timestamps
    end
    
    add_index :products, :seo_url, unique: true
    add_index :products, :name
    add_index :products, :status
    add_index :products, :kind
  end
end
