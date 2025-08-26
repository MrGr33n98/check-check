ActiveAdmin.register Sponsored do
  permit_params :title, :description, :link_url, :position, :status, :starts_at, :ends_at, :priority, :square_banner, :rectangular_banner, category_ids: []

  filter :title
  filter :status
  filter :position

  index do
    selectable_column
    id_column
    column :title
    column :position
    column :status
    column :starts_at
    column :ends_at
    column :priority
    column "Square Banner" do |sponsored|
      if sponsored.square_banner.attached?
        image_tag sponsored.square_banner.variant(resize_to_limit: [100, 100])
      end
    end
    column "Rectangular Banner" do |sponsored|
      if sponsored.rectangular_banner.attached?
        image_tag sponsored.rectangular_banner.variant(resize_to_limit: [100, 100])
      end
    end
    column :categories do |sponsored|
      sponsored.categories.map(&:name).join(", ")
    end
    actions
  end

  show do
    attributes_table do
      row :title
      row :description
      row :link_url
      row :position
      row :status
      row :starts_at
      row :ends_at
      row :priority
      row :square_banner do |sponsored|
        if sponsored.square_banner.attached?
          image_tag sponsored.square_banner
        end
      end
      row :rectangular_banner do |sponsored|
        if sponsored.rectangular_banner.attached?
          image_tag sponsored.rectangular_banner
        end
      end
      row :categories do |sponsored|
        sponsored.categories.map(&:name).join(", ")
      end
    end
  end

  form do |f|
    f.inputs "Sponsored Details" do
      f.input :title
      f.input :description
      f.input :link_url
      f.input :position, as: :select, collection: Sponsored.positions.keys.map { |k| [k.humanize, k] }
      f.input :status, as: :select, collection: Sponsored.statuses.keys.map { |k| [k.humanize, k] }
      f.input :starts_at, as: :datepicker
      f.input :ends_at, as: :datepicker
      f.input :priority
    end

    f.inputs "Banner Images" do
      f.input :square_banner, as: :file, hint: f.object.square_banner.present? ? image_tag(f.object.square_banner) : content_tag(:span, "No square banner uploaded yet.")
      f.input :rectangular_banner, as: :file, hint: f.object.rectangular_banner.present? ? image_tag(f.object.rectangular_banner) : content_tag(:span, "No rectangular banner uploaded yet.")
    end

    f.inputs "Categories" do
      f.input :categories, as: :check_boxes, collection: Category.all.map { |c| [c.name, c.id] }
    end

    f.actions
  end
end
