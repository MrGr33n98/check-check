class AddFieldsToReviews < ActiveRecord::Migration[7.0]
  def change
    add_column :reviews, :scores, :jsonb, default: {}
    add_column :reviews, :overall_score, :decimal, precision: 3, scale: 2
    add_column :reviews, :featured, :boolean, default: false
  end
end