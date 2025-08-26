class AddUserToSolutions < ActiveRecord::Migration[7.0]
  def change
    add_reference :solutions, :user, null: false, foreign_key: true
  end
end
