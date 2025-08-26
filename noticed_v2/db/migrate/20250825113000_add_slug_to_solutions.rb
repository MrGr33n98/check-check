class AddSlugToSolutions < ActiveRecord::Migration[7.0]
  def change
    add_column :solutions, :slug, :string
    add_index :solutions, :slug, unique: true
  end
end
