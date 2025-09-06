require 'swagger_helper'

RSpec.describe 'api/v1/categories', type: :request do
  path '/api/v1/categories' do
    get('list categories') do
      tags 'Categories'
      produces 'application/json'
      response(200, 'successful') do
        run_test!
      end
    end
  end
end
