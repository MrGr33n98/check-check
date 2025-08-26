ActiveAdmin.register B2bAd do
  permit_params :company_id, :category_id, :provider_id, :customer_id, :starts_on, :expires_on, :status, :clicks

  filter :status
  filter :starts_on
  filter :expires_on
  filter :company
  filter :category
  filter :provider
  filter :customer
end
