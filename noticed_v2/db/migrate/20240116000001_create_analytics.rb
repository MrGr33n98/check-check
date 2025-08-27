class CreateAnalytics < ActiveRecord::Migration[7.0]
  def change
    create_table :analytics do |t|
      t.references :provider, null: false, foreign_key: true
      t.integer :leads_received, default: 0
      t.integer :page_views, default: 0
      t.integer :conversions, default: 0
      t.decimal :conversion_rate, precision: 5, scale: 2, default: 0.0
      t.decimal :monthly_growth, precision: 5, scale: 2, default: 0.0
      t.string :response_time
      t.decimal :average_rating, precision: 3, scale: 2, default: 0.0
      t.integer :total_reviews, default: 0
      t.integer :profile_views, default: 0
      t.date :date
      t.integer :intention_score, default: 0
      t.integer :conversion_point_leads, default: 0

      t.timestamps
    end

    add_index :analytics, [:provider_id, :date], unique: true
    add_index :analytics, :date
  end
end