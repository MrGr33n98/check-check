ActiveAdmin.register Content do
  permit_params :product_id, :title, :seo_url, :seo_title, :seo_description, :short_description, :format, :level, :kind, :active, category_tags: []

  filter :title
  filter :product
  filter :active
  filter :kind
  filter :level
  filter :format

  form do |f|
    f.inputs do
      f.input :product
      f.input :title
      f.input :seo_url
      f.input :seo_title
      f.input :seo_description
      f.input :short_description
      f.input :format
      f.input :level
      f.input :kind
      f.input :active
      f.input :category_tags, as: :string, label: "Category Tags (comma-separated)", input_html: { value: f.object.category_tags&.join(', ') }
    end
    f.actions
  end

  controller do
    def update
      if params[:content][:category_tags].is_a?(String)
        params[:content][:category_tags] = params[:content][:category_tags].split(',').map(&:strip)
      end
      super
    end

    def create
      if params[:content][:category_tags].is_a?(String)
        params[:content][:category_tags] = params[:content][:category_tags].split(',').map(&:strip)
      end
      super
    end
  end
end
