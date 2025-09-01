#!/bin/bash

# Script para resolver problemas de login do ActiveAdmin
echo "Resolvendo problemas de login do ActiveAdmin..."

# Limpa cache e sessões
echo "1. Limpando cache e sessões..."
rails tmp:clear
rails log:clear

# Verifica e cria usuário admin se necessário
echo "2. Verificando usuário admin..."
rails runner "
admin = AdminUser.find_or_create_by(email: 'admin@example.com') do |user|
  user.password = 'password'
  user.password_confirmation = 'password'
end

if admin.persisted?
  puts 'Usuário admin encontrado/criado:'
  puts 'Email: admin@example.com'
  puts 'Senha: password'
else
  puts 'Erro ao criar usuário admin:'
  puts admin.errors.full_messages
end
"

# Verifica configuração do Devise
echo "3. Verificando configuração do Devise..."
rails runner "
puts 'Devise configurado para:'
puts 'Secret key presente: ' + (Rails.application.credentials.secret_key_base.present? ? 'Sim' : 'Não')
puts 'CSRF protection: ' + (ActionController::Base.protect_from_forgery ? 'Ativo' : 'Inativo')
"

echo "4. Reiniciando servidor recomendado após essas alterações"
echo "Use: ./start_server.sh"
echo ""
echo "Acesse: http://localhost:3000/admin"
echo "Login: admin@example.com"
echo "Senha: password"