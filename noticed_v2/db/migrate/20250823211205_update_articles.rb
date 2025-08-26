class UpdateArticles < ActiveRecord::Migration[7.0]
  def change
    # Add missing associations
    add_reference :articles, :user, null: true, foreign_key: true unless column_exists?(:articles, :user_id)
    add_reference :articles, :category, null: true, foreign_key: true unless column_exists?(:articles, :category_id)
    add_reference :articles, :product, null: true, foreign_key: true unless column_exists?(:articles, :product_id)
    
    # Add missing columns
    add_column :articles, :content, :text unless column_exists?(:articles, :content)
    add_column :articles, :excerpt, :text unless column_exists?(:articles, :excerpt)
    add_column :articles, :featured, :boolean, default: false unless column_exists?(:articles, :featured)
    add_column :articles, :article_category, :integer, default: 0 unless column_exists?(:articles, :article_category)
    
    # Add indexes
    add_index :articles, :featured unless index_exists?(:articles, :featured)
    add_index :articles, :article_category unless index_exists?(:articles, :article_category)
  end
end
