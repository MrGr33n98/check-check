class CreatePricings < ActiveRecord::Migration[7.0]
  def change
    create_table :pricings do |t|
      t.references :product, null: false, foreign_key: true
      t.string :title, null: false
      t.string :currency, default: 'BRL'
      t.decimal :amount, precision: 10, scale: 2
      t.integer :charge_type, default: 0
      t.integer :frequency, default: 0
      t.string :payment_methods, array: true, default: []
      t.integer :display_order, default: 0
      t.integer :discount_pct, default: 0
      t.integer :state, default: 0

      t.timestamps
    end
    
    add_index :pricings, [:product_id, :display_order]
    add_index :pricings, :state
  end
end
