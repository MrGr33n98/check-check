# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # O domínio do seu frontend
    origins ENV.fetch('FRONTEND_ORIGIN', 'http://localhost:5173')

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
