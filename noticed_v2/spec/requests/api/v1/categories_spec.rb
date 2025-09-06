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

  describe 'POST /api/v1/categories' do
    it 'creates a category with a banner image' do
      file = fixture_file_upload('spec/fixtures/files/test.txt', 'text/plain')

      post '/api/v1/categories', params: { category: { name: 'Solar', banner_image: file } }

      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)
      expect(json['banner_image_url']).to be_present
      expect(Category.last.banner_image).to be_attached
    end
  end

  describe 'PATCH /api/v1/categories/:id' do
    it 'updates a category with a banner image' do
      category = Category.create!(name: 'Wind', active: true)
      file = fixture_file_upload('spec/fixtures/files/test.txt', 'text/plain')

      patch "/api/v1/categories/#{category.id}", params: { category: { banner_image: file } }

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json['banner_image_url']).to be_present
      category.reload
      expect(category.banner_image).to be_attached
    end
  end
end
