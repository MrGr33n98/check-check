class AddImageFieldsToProviders < ActiveRecord::Migration[7.0]
  def change
    add_column :providers, :logo, :string
    add_column :providers, :cover_image, :string
    add_column :providers, :banner_image, :string
  end
end
