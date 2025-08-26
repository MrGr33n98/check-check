class CreateQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :questions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :product, null: true, foreign_key: true
      t.references :category, null: true, foreign_key: true
      t.string :subject, null: false
      t.text :description
      t.integer :status, default: 0
      t.datetime :requested_at

      t.timestamps
    end
    
    add_index :questions, :status
    add_index :questions, :requested_at
  end
end
