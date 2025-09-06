# Set up basic security headers
SecureHeaders::Configuration.default do |config|
  config.csp = {
    default_src: %w('self')
  }
  config.x_frame_options = 'DENY'
end
