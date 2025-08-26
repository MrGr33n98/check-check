ActiveAdmin.register Post do
  permit_params :title, :body, :user_id, :published_at

  filter :title
  filter :user
  filter :published_at
end
