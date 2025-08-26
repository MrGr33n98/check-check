ActiveAdmin.register Product do
  permit_params :name, :seo_url, :status, :kind, :country, :premium_until

  index do
    selectable_column
    id_column
    column :name
    column :status
    column :kind
    column :country
    column :premium_until
    column :created_at
    actions
  end

  filter :name
  filter :status, as: :select, collection: Product.statuses.keys.map { |k| [k.humanize, k] }
  filter :kind, as: :select, collection: Product.kinds.keys.map { |k| [k.humanize, k] }
  filter :country
  filter :created_at

  form do |f|
    f.inputs do
      f.input :name
      f.input :seo_url
      f.input :status, as: :select, collection: Product.statuses.keys.map { |k| [k.humanize, k] }
      f.input :kind, as: :select, collection: Product.kinds.keys.map { |k| [k.humanize, k] }
      f.input :country
      f.input :premium_until, as: :datepicker
    end
    f.actions
  end

  show do
    attributes_table do
      row :name
      row :seo_url
      row :status
      row :kind
      row :country
      row :premium_until
      row :created_at
      row :updated_at
    end
    
    active_admin_comments
  end
end