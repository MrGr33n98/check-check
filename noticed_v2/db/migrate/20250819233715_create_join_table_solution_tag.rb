class CreateJoinTableSolutionTag < ActiveRecord::Migration[7.0]
  def change
    create_join_table :solutions, :tags do |t|
      # t.index [:solution_id, :tag_id]
      # t.index [:tag_id, :solution_id]
    end
  end
end
