ActiveAdmin.register CompanyMember do
  permit_params :provider_id, :user_id, :state

  filter :provider
  filter :user
  filter :state
end
