class AddDeviseTokenAuthToUsers < ActiveRecord::Migration[7.0]
  def change
    # Adiciona campos do DeviseTokenAuth apenas se não existirem
    unless column_exists?(:users, :provider)
      add_column :users, :provider, :string, null: false, default: 'email'
    end
    
    unless column_exists?(:users, :uid)
      add_column :users, :uid, :string, null: false, default: ''
    end
    
    unless column_exists?(:users, :tokens)
      add_column :users, :tokens, :json
    end

    # Atualiza usuários existentes com uid baseado no email
    reversible do |dir|
      dir.up do
        User.reset_column_information
        User.find_each do |user|
          if user.uid.blank?
            user.update_column(:uid, user.email)
          end
        end
      end
    end

    # Adiciona índice apenas se não existir
    unless index_exists?(:users, [:uid, :provider])
      add_index :users, [:uid, :provider], unique: true
    end
  end
end