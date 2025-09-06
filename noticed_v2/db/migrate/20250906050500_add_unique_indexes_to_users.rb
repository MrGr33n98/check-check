class AddUniqueIndexesToUsers < ActiveRecord::Migration[7.0]
  def change
    add_index :users, :email, unique: true unless index_exists?(:users, :email, unique: true)
    add_index :users, [:uid, :provider], unique: true unless index_exists?(:users, [:uid, :provider], unique: true)
  end
end
