ActiveAdmin.register User do
  permit_params :email, :name, :password, :password_confirmation, :approved

  index do
    selectable_column
    id_column
    column :name
    column :email
    column :approved
    column :created_at
    actions
  end

  show do
    attributes_table do
      row :name
      row :email
      row :approved
      row :created_at
      row :updated_at
    end
  end

  filter :name
  filter :email

  form do |f|
    f.inputs "User Details" do
      f.input :name
      f.input :email
      f.input :approved
      if f.object.new_record?
        f.input :password
        f.input :password_confirmation
      end
    end
    f.actions
  end

  action_item :approve, only: :show, if: proc{ !resource.approved? } do
    link_to "Approve User", approve_admin_user_path(resource), method: :patch
  end

  action_item :unapprove, only: :show, if: proc{ resource.approved? } do
    link_to "Unapprove User", unapprove_admin_user_path(resource), method: :patch
  end

  member_action :approve, method: :patch do
    resource.update_attribute(:approved, true)
    redirect_to admin_user_path(resource), notice: "User approved!"
  end

  member_action :unapprove, method: :patch do
    resource.update_attribute(:approved, false)
    redirect_to admin_user_path(resource), notice: "User unapproved!"
  end

  controller do
    def update
      if params[:user][:password].blank? && params[:user][:password_confirmation].blank?
        params[:user].delete("password")
        params[:user].delete("password_confirmation")
      end
      super
    end
  end
end
