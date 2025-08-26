ActiveAdmin.register Review do
  permit_params :product_id, :solution_id, :user_id, :rating, :title, :comment, :status, :cliente

  filter :status
  filter :rating
  filter :user
  filter :product
  filter :solution
end
