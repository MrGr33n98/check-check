require 'rails_helper'

RSpec.describe 'Providers API', type: :request do
  before do
    allow_any_instance_of(Provider).to receive(:notify_admins_of_new_provider)
  end

  let(:valid_attributes) do
    {
      name: 'Provider One',
      country: 'BR',
      foundation_year: 2020,
      members_count: 5,
      status: 'active',
      city: 'City',
      state: 'SP',
      tags: []
    }
  end

  describe 'GET /api/v1/providers' do
    it 'returns providers' do
      Provider.create!(valid_attributes)

      get '/api/v1/providers'

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json.first['name']).to eq('Provider One')
    end
  end

  describe 'GET /api/v1/providers/:id' do
    it 'returns the provider' do
      provider = Provider.create!(valid_attributes)

      get "/api/v1/providers/#{provider.id}"

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json['id']).to eq(provider.id)
    end
  end
end
