class CreateCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :categories do |t|
      t.string :name
      t.text :description
      t.string :slug
      t.boolean :featured

      t.timestamps
    end
    add_index :categories, :slug, unique: true
  end
end
