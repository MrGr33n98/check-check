require 'rails_helper'

RSpec.describe 'Categories API', type: :request do
  describe 'GET /api/v1/categories' do
    it 'returns active root categories' do
      Category.create!(name: 'Solar', active: true)

      get '/api/v1/categories'

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json.first['name']).to eq('Solar')
    end
  end

  describe 'GET /api/v1/categories/:id' do
    it 'returns the requested category' do
      category = Category.create!(name: 'Energy', active: true)

      get "/api/v1/categories/#{category.id}"

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json['id']).to eq(category.id)
    end
  end
end
