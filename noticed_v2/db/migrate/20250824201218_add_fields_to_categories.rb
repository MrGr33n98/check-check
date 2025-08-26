class AddFieldsToCategories < ActiveRecord::Migration[7.0]
  def change
    add_column :categories, :parent_id, :integer unless column_exists?(:categories, :parent_id)
    add_column :categories, :icon, :string unless column_exists?(:categories, :icon)
    add_column :categories, :position, :integer, default: 0 unless column_exists?(:categories, :position)
    add_column :categories, :active, :boolean, default: true unless column_exists?(:categories, :active)
    add_column :categories, :products_count, :integer, default: 0 unless column_exists?(:categories, :products_count)
    
    add_index :categories, :parent_id unless index_exists?(:categories, :parent_id)
    add_index :categories, :position unless index_exists?(:categories, :position)
    add_index :categories, :active unless index_exists?(:categories, :active)
  end
end
