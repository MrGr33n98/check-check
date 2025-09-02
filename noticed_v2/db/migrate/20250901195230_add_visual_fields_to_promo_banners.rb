class AddVisualFieldsToPromoBanners < ActiveRecord::Migration[7.0]
  def change
    add_column :promo_banners, :show_title, :boolean
    add_column :promo_banners, :show_subtitle, :boolean
    add_column :promo_banners, :overlay_enabled, :boolean
    add_column :promo_banners, :overlay_color, :string
    add_column :promo_banners, :overlay_opacity, :integer
    add_column :promo_banners, :text_align, :string
  end
end
