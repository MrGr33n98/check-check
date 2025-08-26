class UpdateReviewsStatus < ActiveRecord::Migration[7.0]
  def change
    # Update status enum values to match specification
    # pending: 0, approved: 1, rejected: 2
    # This aligns with the current enum values
  end
end
