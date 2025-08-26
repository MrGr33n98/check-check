class CreateProductAccesses < ActiveRecord::Migration[7.0]
  def change
    create_table :product_accesses do |t|
      t.references :member, null: false, foreign_key: true
      t.references :solution, null: false, foreign_key: true
      t.string :access_level
      t.datetime :expires_at

      t.timestamps
    end
  end
end
