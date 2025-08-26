class CreateCompanyMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :company_members do |t|
      t.references :provider, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.integer :state, default: 0

      t.timestamps
    end
    
    add_index :company_members, [:provider_id, :user_id], unique: true
    add_index :company_members, :state
  end
end
