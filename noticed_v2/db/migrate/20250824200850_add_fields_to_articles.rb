class AddFieldsToArticles < ActiveRecord::Migration[7.0]
  def change
    add_column :articles, :topics, :string, array: true, default: []
    add_index :articles, :topics, using: 'gin'
  end
end
