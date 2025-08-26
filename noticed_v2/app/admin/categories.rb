ActiveAdmin.register Category do
  permit_params :name, :slug, :description, :featured, :photo, :meta_title, :meta_description, :keywords, :parent_id, :is_main_category, :banner_image, :promotional_text

  filter :name

  index do
    selectable_column
    id_column
    column :name
    column :featured
    column :photo do |category|
      if category.photo.attached?
        image_tag url_for(category.photo.variant(resize_to_limit: [100, 100]))
      end
    end
    actions
  end

  show do
    panel "Detalhes da Categoria" do
      attributes_table_for category do
        row :name
        row :slug
        row :description
        row :featured
        row :is_main_category do |cat|
          status_tag(cat.is_main_category ? 'Yes' : 'No', class: (cat.is_main_category ? 'ok' : 'error'))
        end
        row :parent do |cat|
          link_to cat.parent.name, admin_category_path(cat.parent) if cat.parent
        end
        row :promotional_text
      end
    end

    panel "Banner e Mídia" do
      attributes_table_for category do
        row :photo do |cat|
          if cat.photo.attached?
            image_tag url_for(cat.photo)
          end
        end
        row :banner_image do |cat|
          if cat.banner_image.attached?
            image_tag url_for(cat.banner_image)
          end
        end
      end
    end

    panel "SEO Details" do
      attributes_table_for category do
        row :meta_title
        row :meta_description
        row :keywords
      end
    end

    panel "Subcategorias" do
      table_for category.children do
        column "Name" do |child|
          link_to child.name, admin_category_path(child)
        end
        column :slug
        column :featured
      end
      if category.children.empty?
        "No subcategories found."
      end
    end
  end

  form do |f|
    f.inputs "Category Details" do
      f.input :name
      f.input :slug
      f.input :description
      f.input :featured
      f.input :photo, as: :file
    end

    f.inputs "Hierarchy and Media" do
      f.input :is_main_category, label: "Is this a main category?"
      f.input :parent, as: :select, collection: Category.where(is_main_category: true).map { |c| [c.name, c.id] },
                       include_blank: "Select a parent category",
                       input_html: { data: { behavior: "parent-category-select" } }
      f.input :banner_image, as: :file, label: "Banner Image"
      f.input :promotional_text, as: :text, input_html: { rows: 3, maxlength: 160 }, label: "Promotional Text (max 160 chars)"
    end

    f.inputs "SEO Details" do
      f.input :meta_title, label: "Meta Title"
      f.input :meta_description, label: "Meta Description"
      f.input :keywords, label: "Keywords (comma-separated)"
    end
    f.actions
  end

  controller do
    def find_resource
      scoped_collection.find_by!(slug: params[:id])
    end
  end
end
