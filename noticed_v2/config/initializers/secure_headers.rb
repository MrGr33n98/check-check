# Set up basic security headers
SecureHeaders::Configuration.default do |config|
  config.csp = {
    default_src: %w('self'),
    script_src: %w('self' 'unsafe-inline' 'unsafe-eval'),
    style_src: %w('self' 'unsafe-inline'),
    img_src: %w('self' data: blob:),
    font_src: %w('self' data:),
    connect_src: %w('self'),
    media_src: %w('self'),
    object_src: %w('none'),
    child_src: %w('self'),
    frame_src: %w('self'),
    worker_src: %w('self')
  }
  config.x_frame_options = 'DENY'
end
