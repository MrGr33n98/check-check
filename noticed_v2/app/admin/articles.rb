ActiveAdmin.register Article do
  permit_params :title, :content, :excerpt, :status, :published_at, 
                :author, :article_category, :featured, :category_id, :product_id, :user_id

  index do
    selectable_column
    id_column
    column :title
    column :author
    column :article_category
    column :status
    column :featured
    column :published_at
    actions
  end

  filter :title
  filter :author
  filter :article_category, as: :select, collection: Article.article_categories.keys.map { |k| [k.humanize, k] }
  filter :status, as: :select, collection: Article.statuses.keys.map { |k| [k.humanize, k] }
  filter :featured
  filter :published_at
  filter :created_at

  form do |f|
    f.inputs do
      f.input :title
      f.input :excerpt
      f.input :content, as: :text, input_html: { rows: 10 }
      f.input :author
      f.input :article_category, as: :select, collection: Article.article_categories.keys.map { |k| [k.humanize, k] }
      f.input :status, as: :select, collection: Article.statuses.keys.map { |k| [k.humanize, k] }
      f.input :featured
      f.input :published_at, as: :datepicker
    end
    f.actions
  end

  show do
    attributes_table do
      row :title
      row :slug
      row :excerpt
      row :author
      row :article_category
      row :status
      row :featured
      row :published_at
      row :created_at
      row :updated_at
    end
    
    panel "Content" do
      para article.content
    end
    
    active_admin_comments
  end

  # Batch actions
  batch_action :publish do |ids|
    Article.where(id: ids).update_all(status: :published, published_at: Time.current)
    redirect_back(fallback_location: collection_path, notice: "Articles published")
  end

  batch_action :archive do |ids|
    Article.where(id: ids).update_all(status: :archived)
    redirect_back(fallback_location: collection_path, notice: "Articles archived")
  end
end