class UpdateReviews < ActiveRecord::Migration[7.0]
  def change
    # Remove the old post reference and add product reference
    remove_reference :reviews, :post, foreign_key: true if column_exists?(:reviews, :post_id)
    add_reference :reviews, :product, null: false, foreign_key: true unless column_exists?(:reviews, :product_id)
    
    # Add status column
    add_column :reviews, :status, :integer, default: 0 unless column_exists?(:reviews, :status)
    
    # Add cliente column for customer name
    add_column :reviews, :cliente, :string unless column_exists?(:reviews, :cliente)
    
    # Add indexes
    add_index :reviews, :status unless index_exists?(:reviews, :status)
    add_index :reviews, :product_id unless index_exists?(:reviews, :product_id)
  end
end
