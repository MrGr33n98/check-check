class AddDisplayFieldsToCategories < ActiveRecord::Migration[7.0]
  def change
    add_column :categories, :title_color, :string
    add_column :categories, :subtitle_color, :string
    add_column :categories, :title_font_size, :string
    add_column :categories, :subtitle_font_size, :string
  end
end
