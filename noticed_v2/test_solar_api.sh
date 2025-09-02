#!/bin/bash

# Script para testar a API das empresas solares
echo "Testando API das empresas solares..."

BASE_URL="http://localhost:3000/api/v1"

echo "1. Testando listagem de todas as empresas:"
curl -s "${BASE_URL}/solar_companies" | python3 -m json.tool 2>/dev/null || curl -s "${BASE_URL}/solar_companies"

echo -e "\n\n2. Testando busca por nome (Solar):"
curl -s "${BASE_URL}/solar_companies?search=Solar" | python3 -m json.tool 2>/dev/null || curl -s "${BASE_URL}/solar_companies?search=Solar"

echo -e "\n\n3. Testando filtro por país (Brasil):"
curl -s "${BASE_URL}/solar_companies?country=Brasil" | python3 -m json.tool 2>/dev/null || curl -s "${BASE_URL}/solar_companies?country=Brasil"

echo -e "\n\n4. Testando paginação (página 1, 2 itens por página):"
curl -s "${BASE_URL}/solar_companies?page=1&per_page=2" | python3 -m json.tool 2>/dev/null || curl -s "${BASE_URL}/solar_companies?page=1&per_page=2"

echo -e "\n\n5. Testando empresa específica (ID 1):"
curl -s "${BASE_URL}/solar_companies/1" | python3 -m json.tool 2>/dev/null || curl -s "${BASE_URL}/solar_companies/1"

echo -e "\n\nTeste concluído!"