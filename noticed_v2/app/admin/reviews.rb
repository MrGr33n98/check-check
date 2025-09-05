ActiveAdmin.register Review do
  permit_params :product_id, :solution_id, :user_id, :rating, :title, :comment, :status, :cliente, :featured

  # Filters
  filter :status, as: :select, collection: Review.statuses.keys
  filter :featured
  filter :rating
  filter :user
  filter :product
  filter :solution
  filter :created_at

  # Index page
  index do
    selectable_column
    id_column
    column :user
    column :product
    column :solution
    column :rating
    column :status do |review|
      status_tag review.status
    end
    column :featured
    column :created_at
    actions
  end

  # Batch actions
  batch_action :approve do |ids|
    batch_action_collection.find(ids).each(&:approved!)
    redirect_to collection_path, alert: "The selected reviews have been approved."
  end

  batch_action :reject do |ids|
    batch_action_collection.find(ids).each(&:rejected!)
    redirect_to collection_path, alert: "The selected reviews have been rejected."
  end

  batch_action :feature do |ids|
    batch_action_collection.find(ids).each { |r| r.update(featured: true) }
    redirect_to collection_path, alert: "The selected reviews have been featured."
  end

  batch_action :unfeature do |ids|
    batch_action_collection.find(ids).each { |r| r.update(featured: false) }
    redirect_to collection_path, alert: "The selected reviews have been unfeatured."
  end

  # Member actions
  member_action :approve, method: :put do
    resource.approved!
    redirect_to resource_path, notice: "Review approved!"
  end

  member_action :reject, method: :put do
    resource.rejected!
    redirect_to resource_path, notice: "Review rejected!"
  end

  member_action :feature, method: :put do
    resource.update(featured: true)
    redirect_to resource_path, notice: "Review featured!"
  end

  member_action :unfeature, method: :put do
    resource.update(featured: false)
    redirect_to resource_path, notice: "Review unfeatured!"
  end

  action_item :approve, only: :show, if: proc{ !resource.approved? } do
    link_to 'Approve', approve_admin_review_path(resource), method: :put
  end

  action_item :reject, only: :show, if: proc{ !resource.rejected? } do
    link_to 'Reject', reject_admin_review_path(resource), method: :put
  end

  action_item :feature, only: :show, if: proc{ !resource.featured? } do
    link_to 'Feature', feature_admin_review_path(resource), method: :put
  end

  action_item :unfeature, only: :show, if: proc{ resource.featured? } do
    link_to 'Unfeature', unfeature_admin_review_path(resource), method: :put
  end
end