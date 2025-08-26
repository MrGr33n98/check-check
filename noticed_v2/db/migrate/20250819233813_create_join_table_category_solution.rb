class CreateJoinTableCategorySolution < ActiveRecord::Migration[7.0]
  def change
    create_join_table :categories, :solutions do |t|
      # t.index [:category_id, :solution_id]
      # t.index [:solution_id, :category_id]
    end
  end
end
