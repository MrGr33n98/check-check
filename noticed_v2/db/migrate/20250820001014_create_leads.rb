class CreateLeads < ActiveRecord::Migration[7.0]
  def change
    create_table :leads do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.string :company
      t.text :message
      t.references :solution, null: false, foreign_key: true
      t.string :status

      t.timestamps
    end
  end
end
