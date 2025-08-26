class CreateCampaigns < ActiveRecord::Migration[7.0]
  def change
    create_table :campaigns do |t|
      t.references :product, null: false, foreign_key: true
      t.string :title, null: false
      t.string :code, null: false
      t.references :owner_member, null: true, foreign_key: { to_table: :members }
      t.string :share_code
      t.integer :goal, default: 0
      t.integer :reached, default: 0
      t.integer :beginners, default: 0
      t.integer :shares, default: 0
      t.string :prize
      t.date :starts_on
      t.date :ends_on

      t.timestamps
    end
    
    add_index :campaigns, :code, unique: true
    add_index :campaigns, [:starts_on, :ends_on]
  end
end
