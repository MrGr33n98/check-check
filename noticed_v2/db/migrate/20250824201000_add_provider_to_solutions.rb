class AddProviderToSolutions < ActiveRecord::Migration[7.0]
  def change
    add_reference :solutions, :provider, foreign_key: true
  end
end
