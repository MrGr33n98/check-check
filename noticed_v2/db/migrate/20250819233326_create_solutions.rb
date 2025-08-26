class CreateSolutions < ActiveRecord::Migration[7.0]
  def change
    create_table :solutions do |t|
      t.string :name
      t.string :company
      t.text :description
      t.text :long_description
      t.decimal :rating
      t.string :website
      t.boolean :featured

      t.timestamps
    end
  end
end
