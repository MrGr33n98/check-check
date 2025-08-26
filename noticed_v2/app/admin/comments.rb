ActiveAdmin.register Comment, as: "User Comment" do
  permit_params :post_id, :user_id, :body

  filter :post
  filter :user
end
