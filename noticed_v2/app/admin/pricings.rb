ActiveAdmin.register Pricing do
  permit_params :product_id, :title, :currency, :amount, :charge_type, :frequency, :display_order, :discount_pct, :state

  filter :title
  filter :product
  filter :state
  filter :charge_type
  filter :frequency
end