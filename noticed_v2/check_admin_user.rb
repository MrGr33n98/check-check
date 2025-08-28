#!/usr/bin/env ruby

# Carregar variáveis de ambiente do arquivo .env
require 'dotenv/rails'

# Carregar o ambiente do Rails
require_relative 'config/environment'

if AdminUser.exists?
  puts "Existem #{AdminUser.count} usuários administrativos:"
  AdminUser.find_each do |user|
    puts "  - #{user.email}"
  end
else
  puts "Não há usuários administrativos no banco de dados."
end