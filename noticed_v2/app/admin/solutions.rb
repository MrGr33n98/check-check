ActiveAdmin.register Solution do
  permit_params :name, :company, :description, :long_description, :website, :featured, :provider_id, :rating, category_ids: [], tag_ids: [] # Changed :user_id to :provider_id

  filter :name
  filter :company
  filter :rating
  filter :provider # Changed :user to :provider
  filter :categories
  filter :tags

  form do |f|
    f.inputs do
      f.input :name
      f.input :company
      f.input :description
      f.input :long_description
      f.input :website
      f.input :featured
      f.input :provider # Changed :user to :provider
      f.input :rating
      f.input :categories, as: :check_boxes
      f.input :tags, as: :check_boxes
    end
    f.actions
  end
end
