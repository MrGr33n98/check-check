class UpdateLeads < ActiveRecord::Migration[7.0]
  def change
    # Add user reference (optional)
    add_reference :leads, :user, null: true, foreign_key: true unless column_exists?(:leads, :user_id)
    
    # Add missing columns
    add_reference :leads, :product, null: true, foreign_key: true unless column_exists?(:leads, :product_id)
    add_column :leads, :score, :integer unless column_exists?(:leads, :score)
    add_column :leads, :distributed, :boolean, default: false unless column_exists?(:leads, :distributed)
    add_column :leads, :converted, :boolean, default: false unless column_exists?(:leads, :converted)
    add_column :leads, :company_size, :string unless column_exists?(:leads, :company_size)
    add_column :leads, :source, :string unless column_exists?(:leads, :source)
    
    # Add indexes
    add_index :leads, :distributed unless index_exists?(:leads, :distributed)
    add_index :leads, :converted unless index_exists?(:leads, :converted)
    add_index :leads, :score unless index_exists?(:leads, :score)
  end
end
