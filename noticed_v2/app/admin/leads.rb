ActiveAdmin.register Lead do
  permit_params :solution_id, :name, :email, :phone, :company, :message, :status

  filter :name
  filter :email
  filter :status
  filter :solution
end
