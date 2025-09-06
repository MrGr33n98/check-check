class AddProviderToReviews < ActiveRecord::Migration[7.0]
  def change
    add_reference :reviews, :provider, null: true, foreign_key: true
  end
end
