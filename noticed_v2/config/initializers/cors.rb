Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Em desenvolvimento, permita origens comuns de frontend
    # Em produção, substitua por domínios específicos do seu frontend (ex: 'https://seufriendlyfrontend.com')
    origins 'http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true # Importante se você usa cookies ou sessions para autenticação
  end
end
