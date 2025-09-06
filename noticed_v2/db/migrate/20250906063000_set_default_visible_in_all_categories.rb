class SetDefaultVisibleInAllCategories < ActiveRecord::Migration[7.0]
  def up
    execute <<-SQL
      UPDATE providers SET visible_in_all_categories = false WHERE visible_in_all_categories IS NULL;
    SQL
    change_column_default :providers, :visible_in_all_categories, false
    change_column_null :providers, :visible_in_all_categories, false
  end

  def down
    change_column_null :providers, :visible_in_all_categories, true
    change_column_default :providers, :visible_in_all_categories, nil
  end
end
