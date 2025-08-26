ActiveAdmin.register ProductAccess do
  permit_params :member_id, :solution_id, :access_level, :expires_at

  filter :member
  filter :solution
  filter :access_level
end
