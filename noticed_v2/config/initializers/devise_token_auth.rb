# DeviseTokenAuth.setup do |config|
#   # Não alterar os headers de autorização após cada requisição
#   config.change_headers_on_each_request = false

#   # Tokens serão válidos por 2 semanas após emissão
#   config.token_lifespan = 2.weeks

#   # Limite máximo de dispositivos simultâneos por usuário
#   config.max_number_of_devices = 10

#   # Tempo de buffer para requisições em lote
#   config.batch_request_buffer_throttle = 5.seconds

#   # Prefixo para callbacks OAuth2
#   config.omniauth_prefix = '/omniauth'

#   # Nomes dos headers de autenticação
#   config.headers_names = {
#     :'authorization' => 'Authorization',
#     :'access-token' => 'access-token',
#     :'client' => 'client',
#     :'expiry' => 'expiry',
#     :'uid' => 'uid',
#     :'token-type' => 'token-type'
#   }

#   # Desabilitar suporte ao Devise padrão
#   config.enable_standard_devise_support = false
# end