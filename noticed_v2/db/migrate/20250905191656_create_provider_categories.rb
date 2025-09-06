class CreateProviderCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :provider_categories do |t|
      t.references :provider, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true
      t.timestamps
    end

    add_index :provider_categories, [:provider_id, :category_id], unique: true
  end
end
