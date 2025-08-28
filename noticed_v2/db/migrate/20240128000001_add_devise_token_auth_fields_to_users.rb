class AddDeviseTokenAuthFieldsToUsers < ActiveRecord::Migration[7.0]
  def change
    change_table :users do |t|
      ## Required for Devise Token Auth
      t.string :provider, null: false, default: 'email'
      t.string :uid, null: false, default: ''
      t.json :tokens

      ## Trackable
      t.integer :sign_in_count, default: 0
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.string :current_sign_in_ip
      t.string :last_sign_in_ip

      ## Confirmable
      t.string :confirmation_token
      t.datetime :confirmed_at
      t.datetime :confirmation_sent_at
      t.string :unconfirmed_email
    end

    add_index :users, [:uid, :provider], unique: true
    add_index :users, :confirmation_token, unique: true
  end
end