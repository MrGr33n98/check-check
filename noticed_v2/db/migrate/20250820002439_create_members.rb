class CreateMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :members do |t|
      t.string :name
      t.string :email
      t.string :company
      t.string :role
      t.string :status
      t.string :subscription_plan
      t.string :subscription_status
      t.datetime :trial_ends_at
      t.datetime :expires_at

      t.timestamps
    end
  end
end
