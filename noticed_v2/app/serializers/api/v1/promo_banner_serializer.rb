class Api::V1::PromoBannerSerializer < ActiveModel::Serializer
  attributes :id, :title, :subtitle, :button_text, :button_url,
             :button_secondary_text, :button_secondary_url,
             :background_color, :text_color, :position, :priority,
             :background_image_url, :show_title, :show_subtitle,
             :overlay_enabled, :overlay_color, :overlay_opacity,
             :text_align, :created_at, :updated_at
end
