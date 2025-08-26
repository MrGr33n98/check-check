class UpdateCategories < ActiveRecord::Migration[7.0]
  def change
    # Add missing columns
    add_column :categories, :position, :integer, default: 0 unless column_exists?(:categories, :position)
    add_column :categories, :products_count, :integer, default: 0 unless column_exists?(:categories, :products_count)
    add_column :categories, :active, :boolean, default: true unless column_exists?(:categories, :active)
    add_reference :categories, :parent, null: true, foreign_key: { to_table: :categories } unless column_exists?(:categories, :parent_id)
    
    # Add indexes
    add_index :categories, :position unless index_exists?(:categories, :position)
    add_index :categories, :active unless index_exists?(:categories, :active)
  end
end
