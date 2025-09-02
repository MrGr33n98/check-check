class CreateSolarCompanies < ActiveRecord::Migration[7.0]
  def change
    create_table :solar_companies do |t|
      t.string :name
      t.string :title
      t.text :short_description
      t.string :country
      t.text :address
      t.string :phone
      t.integer :foundation_year
      t.integer :members_count
      t.string :revenue
      t.text :social_links
      t.text :tags
      t.string :status

      t.timestamps
    end
  end
end
