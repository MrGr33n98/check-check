ActiveAdmin.register ProductUser do
  permit_params :product_id, :user_id, :status

  filter :product
  filter :user
  filter :status
end
