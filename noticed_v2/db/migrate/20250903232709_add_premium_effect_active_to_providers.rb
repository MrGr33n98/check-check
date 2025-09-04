class AddPremiumEffectActiveToProviders < ActiveRecord::Migration[7.0]
  def change
    add_column :providers, :premium_effect_active, :boolean, default: false
  end
end
