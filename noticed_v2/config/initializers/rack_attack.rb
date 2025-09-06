# Configure Rack::Attack for basic request throttling
Rails.application.configure do
  config.middleware.use Rack::Attack
end

Rack::Attack.throttle('req/ip', limit: 60, period: 1.minute) do |req|
  req.ip
end
