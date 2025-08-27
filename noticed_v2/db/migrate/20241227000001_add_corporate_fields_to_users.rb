class AddCorporateFieldsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :corporate_email, :boolean, default: false
    add_column :users, :company_name, :string
    add_column :users, :position, :string
    
    add_index :users, :corporate_email
    add_index :users, :company_name
  end
end