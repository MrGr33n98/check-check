ActiveAdmin.register Campaign do
  permit_params :product_id, :title, :code, :owner_member_id, :share_code,
                :goal, :reached, :beginners, :shares, :prize, :starts_on, :ends_on

  index do
    selectable_column
    id_column
    column :title
    column :product
    column :code
    column :goal
    column :reached
    column :progress_percentage do |campaign|
      "#{campaign.progress_percentage}%"
    end
    column :status do |campaign|
      if campaign.active?
        status_tag('Active', class: 'ok')
      elsif campaign.upcoming?
        status_tag('Upcoming', class: 'warning')
      else
        status_tag('Expired', class: 'error')
      end
    end
    column :starts_on
    column :ends_on
    actions
  end

  filter :title
  filter :product
  filter :code
  filter :starts_on
  filter :ends_on
  filter :created_at

  form do |f|
    f.inputs do
      f.input :product, as: :select, collection: Product.pluck(:name, :id)
      f.input :title
      f.input :code
      f.input :owner_member, as: :select, collection: Member.joins(:user).pluck('users.name', 'company_members.id'), include_blank: true
      f.input :share_code
      f.input :goal
      f.input :reached
      f.input :beginners
      f.input :shares
      f.input :prize
      f.input :starts_on, as: :datepicker
      f.input :ends_on, as: :datepicker
    end
    f.actions
  end

  show do
    attributes_table do
      row :title
      row :product
      row :code
      row :owner_member
      row :share_code
      row :goal
      row :reached
      row :progress_percentage do |campaign|
        "#{campaign.progress_percentage}%"
      end
      row :beginners
      row :shares
      row :prize
      row :starts_on
      row :ends_on
      row :days_remaining
      row :status do |campaign|
        if campaign.active?
          status_tag('Active', class: 'ok')
        elsif campaign.upcoming?
          status_tag('Upcoming', class: 'warning')
        else
          status_tag('Expired', class: 'error')
        end
      end
      row :created_at
      row :updated_at
    end
    
    active_admin_comments
  end
end