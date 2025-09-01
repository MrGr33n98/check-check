ActiveAdmin.register SolarCompany do
  permit_params :name, :title, :short_description, :country, :address, :phone, 
                :foundation_year, :members_count, :revenue, :social_links, :tags, :status

  index do
    selectable_column
    id_column
    column :name
    column :title
    column :country
    column :foundation_year
    column :members_count
    column :status
    actions
  end

  filter :name
  filter :country
  filter :status
  filter :foundation_year
  filter :members_count

  form do |f|
    f.inputs do
      f.input :name
      f.input :title
      f.input :short_description, as: :text
      f.input :country
      f.input :address, as: :text
      f.input :phone
      f.input :foundation_year
      f.input :members_count
      f.input :revenue
      f.input :social_links, as: :text, hint: "URLs separadas por ponto e vírgula"
      f.input :tags, as: :text, hint: "Tags separadas por ponto e vírgula"
      f.input :status, as: :select, collection: ['active', 'inactive', 'pending']
    end
    f.actions
  end

  show do
    attributes_table do
      row :name
      row :title
      row :short_description
      row :country
      row :address
      row :phone
      row :foundation_year
      row :members_count
      row :revenue
      row :social_links do |company|
        if company.social_links.present?
          company.social_links.split(';').map do |link|
            link_to link.strip, link.strip, target: '_blank'
          end.join('<br>').html_safe
        end
      end
      row :tags
      row :status
      row :created_at
      row :updated_at
    end
  end
end