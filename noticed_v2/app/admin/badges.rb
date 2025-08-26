ActiveAdmin.register Badge do
  permit_params :name, :category_id, :position, :year, :edition, :products_count

  filter :name
  filter :year
  filter :edition
  filter :category
end
