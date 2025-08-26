ActiveAdmin.register Question do
  permit_params :user_id, :product_id, :category_id, :subject, :description, :status

  index do
    selectable_column
    id_column
    column :subject
    column :user
    column :product
    column :category
    column :status do |question|
      status_tag(question.status.humanize, question.answered? ? :ok : :warning)
    end
    column :replies_count
    column :requested_at
    actions
  end

  filter :subject
  filter :user
  filter :product
  filter :category
  filter :status, as: :select, collection: Question.statuses.keys.map { |k| [k.humanize, k] }
  filter :requested_at

  form do |f|
    f.inputs do
      f.input :user, as: :select, collection: User.all.collect { |u| [u.name, u.id] }
      f.input :product, as: :select, collection: Product.all.collect { |p| [p.name, p.id] }, include_blank: true
      f.input :category, as: :select, collection: Category.all.collect { |c| [c.name, c.id] }, include_blank: true
      f.input :subject
      f.input :description, as: :text
      f.input :status, as: :select, collection: Question.statuses.keys.map { |k| [k.humanize, k] }
    end
    f.actions
  end

  show do
    attributes_table do
      row :subject
      row :user
      row :product
      row :category
      row :description
      row :status
      row :requested_at
      row :created_at
      row :updated_at
    end

    panel "Replies" do
      table_for question.replies.order(:created_at) do
        column :user
        column :answer do |reply|
          truncate(reply.answer, length: 100)
        end
        column :status
        column :requested_at
        column :actions do |reply|
          link_to "View", admin_reply_path(reply), class: "button"
        end
      end
    end
    
    active_admin_comments
  end
end