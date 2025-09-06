class AddVisibleInAllCategoriesToProviders < ActiveRecord::Migration[7.0]
  def change
    add_column :providers, :visible_in_all_categories, :boolean
  end
end
