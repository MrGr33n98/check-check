class CreateReplies < ActiveRecord::Migration[7.0]
  def change
    create_table :replies do |t|
      t.references :question, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.text :answer, null: false
      t.integer :status, default: 0
      t.datetime :requested_at

      t.timestamps
    end
    
    add_index :replies, :status
    add_index :replies, :requested_at
  end
end
