class CreateB2bAds < ActiveRecord::Migration[7.0]
  def change
    create_table :b2b_ads do |t|
      t.references :company, null: false, foreign_key: { to_table: :providers }
      t.date :starts_on
      t.date :expires_on
      t.integer :status, default: 0
      t.integer :clicks, default: 0
      t.references :category, null: true, foreign_key: true
      t.string :subscription_plan
      t.references :provider, null: true, foreign_key: true
      t.references :customer, null: true, foreign_key: { to_table: :users }
      t.string :operation

      t.timestamps
    end
    
    add_index :b2b_ads, [:starts_on, :expires_on]
    add_index :b2b_ads, :status
  end
end
