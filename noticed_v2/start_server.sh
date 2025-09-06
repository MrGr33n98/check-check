#!/bin/bash

# Script para iniciar o servidor Rails
echo "Iniciando servidor Rails..."

# Mata processos Rails existentes
pkill -f "rails server" 2>/dev/null || true
pkill -f "sidekiq" 2>/dev/null || true

# Verifica se há migrações pendentes
echo "Verificando migrações..."
rails db:migrate:status | grep "down" && {
    echo "Executando migrações pendentes..."
    rails db:migrate
}

# Inicia o Sidekiq
echo "Iniciando Sidekiq..."
bundle exec sidekiq -C config/sidekiq.yml &

# Inicia o servidor
echo "Iniciando servidor na porta 3000..."
rails server -p 3000

echo "Servidor iniciado em http://localhost:3000"
echo "Admin disponível em http://localhost:3000/admin"
