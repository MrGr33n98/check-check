class AddSeoFieldsToCategories < ActiveRecord::Migration[7.0]
  def change
    add_column :categories, :meta_title, :string
    add_column :categories, :meta_description, :text
    add_column :categories, :keywords, :text
  end
end