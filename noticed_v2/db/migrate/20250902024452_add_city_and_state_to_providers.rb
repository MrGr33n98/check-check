class AddCityAndStateToProviders < ActiveRecord::Migration[7.0]
  def change
    add_column :providers, :city, :string
    add_index :providers, :city
    add_column :providers, :state, :string
    add_index :providers, :state
  end
end
