class ChangeProductIdToSolutionIdInReviews < ActiveRecord::Migration[7.0]
  def change
    # This migration was faulty and is now a no-op.
    # The logic was moved to PopulateSolutionIdAndRemoveProductIdFromReviews.
  end
end