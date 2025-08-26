class CreateSponsoreds < ActiveRecord::Migration[7.0]
  def change
    create_table :sponsoreds do |t|
      t.string :title
      t.text :description
      t.string :image_url
      t.string :link_url
      t.string :position
      t.string :status
      t.datetime :starts_at
      t.datetime :ends_at
      t.integer :priority

      t.timestamps
    end
  end
end
