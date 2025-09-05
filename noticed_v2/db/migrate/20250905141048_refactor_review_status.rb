class RefactorReviewStatus < ActiveRecord::Migration[7.0]
  def up
    add_column :reviews, :new_status, :string, default: 'pending'

    execute <<~SQL
      UPDATE reviews
      SET new_status = CASE status
                       WHEN 0 THEN 'pending'
                       WHEN 1 THEN 'approved'
                       WHEN 2 THEN 'rejected'
                       WHEN 3 THEN 'hidden'
                       ELSE 'pending'
                       END
    SQL

    remove_column :reviews, :status

    rename_column :reviews, :new_status, :status
  end

  def down
    add_column :reviews, :old_status, :integer, default: 0

    execute <<~SQL
      UPDATE reviews
      SET old_status = CASE status
                       WHEN 'pending' THEN 0
                       WHEN 'approved' THEN 1
                       WHEN 'rejected' THEN 2
                       WHEN 'hidden' THEN 3
                       ELSE 0
                       END
    SQL

    remove_column :reviews, :status
    rename_column :reviews, :old_status, :status
  end
end