ActiveAdmin.register Reply do
  permit_params :question_id, :user_id, :answer, :status

  index do
    selectable_column
    id_column
    column :question do |reply|
      link_to reply.question.subject, admin_question_path(reply.question)
    end
    column :user
    column :answer do |reply|
      truncate(reply.answer, length: 100)
    end
    column :status do |reply|
      status_tag(reply.status.humanize, reply.published? ? :ok : :warning)
    end
    column :requested_at
    actions
  end

  filter :question
  filter :user
  filter :status, as: :select, collection: Reply.statuses.keys.map { |k| [k.humanize, k] }
  filter :requested_at

  form do |f|
    f.inputs do
      f.input :question, as: :select, collection: Question.pluck(:subject, :id)
      f.input :user, as: :select, collection: User.pluck(:name, :id)
      f.input :answer, as: :text
      f.input :status, as: :select, collection: Reply.statuses.keys.map { |k| [k.humanize, k] }
    end
    f.actions
  end

  show do
    attributes_table do
      row :question do |reply|
        link_to reply.question.subject, admin_question_path(reply.question)
      end
      row :user
      row :answer
      row :status
      row :requested_at
      row :created_at
      row :updated_at
    end
    
    active_admin_comments
  end
end