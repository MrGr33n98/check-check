class AddProviderIdToCampaigns < ActiveRecord::Migration[7.0]
  def change
    add_reference :campaigns, :provider, null: true, foreign_key: true
  end
end
