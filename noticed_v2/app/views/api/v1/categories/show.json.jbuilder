json.extract! @category, :id, :name, :slug, :description, :featured, :created_at, :updated_at

json.solutions @category.solutions do |solution|
  json.extract! solution, :id, :name, :company, :description, :rating
  if solution.provider.present?
    json.provider do
      json.extract! solution.provider, :id, :name, :short_description, :country, :status
    end
  end
end
