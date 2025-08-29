class AddDeviseTokenAuthToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :provider, :string, null: false, default: 'email'
    add_column :users, :uid, :string, null: false, default: ''
    add_column :users, :tokens, :json

    add_index :users, [:uid, :provider], unique: true

    # Atualiza usuários existentes com uid baseado no email
    reversible do |dir|
      dir.up do
        User.find_each do |user|
          user.uid = user.email
          user.save!
        end
      end
    end
  end
end