class AddStatusToProviders < ActiveRecord::Migration[7.0]
  def change
    add_column :providers, :status, :string, default: 'pending', null: false
    add_column :providers, :approval_notes, :text
    add_reference :providers, :approved_by, null: true, foreign_key: { to_table: :admin_users }
    add_column :providers, :approved_at, :datetime
    
    add_index :providers, :status
  end
end
