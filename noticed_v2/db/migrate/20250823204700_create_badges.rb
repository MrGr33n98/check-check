class CreateBadges < ActiveRecord::Migration[7.0]
  def change
    create_table :badges do |t|
      t.string :name, null: false
      t.text :description
      t.integer :position, default: 0
      t.integer :year
      t.string :edition
      t.references :category, null: true, foreign_key: true
      t.integer :products_count, default: 0

      t.timestamps
    end
    
    add_index :badges, :name
    add_index :badges, :year
    add_index :badges, :position
  end
end
