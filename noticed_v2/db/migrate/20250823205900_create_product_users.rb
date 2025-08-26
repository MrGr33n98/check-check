class CreateProductUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :product_users do |t|
      t.references :product, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.integer :status, default: 0

      t.timestamps
    end
    
    add_index :product_users, [:product_id, :user_id], unique: true
    add_index :product_users, :status
  end
end
