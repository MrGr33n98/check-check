require 'rails_helper'

RSpec.describe 'Authentication', type: :request do
  let(:user_params) do
    {
      email: 'test@example.com',
      password: 'password',
      password_confirmation: 'password',
      name: 'Test User'
    }
  end

  it 'registers a user' do
    post '/api/v1/auth', params: user_params
    expect(response).to have_http_status(:ok)
  end

  it 'logs in a user' do
    User.create!(user_params)
    post '/api/v1/auth/sign_in', params: { email: user_params[:email], password: user_params[:password] }
    expect(response).to have_http_status(:ok)
  end
end
