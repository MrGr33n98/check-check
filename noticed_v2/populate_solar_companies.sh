#!/bin/bash

# Script para popular o banco com empresas de energia solar
echo "Populando banco de dados com empresas de energia solar..."

# Executa as migrações se necessário
echo "Verificando migrações..."
rails db:migrate

# Executa o seed das empresas solares
echo "Carregando dados das empresas solares..."
rails runner "load Rails.root.join('db', 'seeds', 'solar_companies.rb')"

# Verifica quantas empresas foram criadas
echo "Verificando dados criados..."
rails runner "puts 'Total de empresas solares: ' + SolarCompany.count.to_s"

echo "Processo concluído!"
echo "Acesse http://localhost:3000/admin/solar_companies para ver os dados no admin"