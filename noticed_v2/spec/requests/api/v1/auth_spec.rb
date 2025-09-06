require 'rails_helper'

RSpec.describe 'Authentication API', type: :request do
  describe 'POST /api/v1/auth' do
    it 'registers a new user' do
      params = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        password_confirmation: 'password123'
      }

      post '/api/v1/auth', params: params

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json['status']).to eq('success')
      expect(json.dig('data', 'email')).to eq('test@example.com')
    end
  end

  describe 'POST /api/v1/auth/sign_in' do
    let!(:user) do
      u = User.create!(email: 'login@example.com', password: 'password123')
      u.update(approved: true)
      u
    end

    it 'logs in an approved user with valid credentials' do
      post '/api/v1/auth/sign_in', params: { email: user.email, password: 'password123' }

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json['status']).to eq('success')
      expect(json.dig('data', 'email')).to eq(user.email)
    end

    it 'rejects invalid credentials' do
      post '/api/v1/auth/sign_in', params: { email: user.email, password: 'wrong' }

      expect(response).to have_http_status(:unauthorized)
    end
  end
end
