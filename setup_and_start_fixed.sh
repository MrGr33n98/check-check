#!/bin/bash

# Script completo para configurar e iniciar o projeto
echo "🚀 Configurando e iniciando o projeto SolarFinder..."

# 1. Para servidores existentes
echo "1. Parando servidores existentes..."
pkill -f "rails server" 2>/dev/null || true
pkill -f "vite --host" 2>/dev/null || true

# 2. Resolve conflitos se existirem
echo "2. Verificando conflitos de merge..."
if git status | grep -q "both modified\|Unmerged paths"; then
    echo "   Resolvendo conflitos..."
    ./resolve_merge_conflicts.sh
else
    echo "   ✅ Nenhum conflito detectado"
fi

# 3. Instala dependências do frontend
echo "3. Verificando dependências do frontend..."
if [ ! -d "node_modules" ] || [ ! -d "node_modules/axios" ]; then
    echo "   Instalando dependências..."
    npm install
    npm install axios
else
    echo "   ✅ Dependências já instaladas"
fi

# 4. Configura o backend Rails
echo "4. Configurando backend Rails..."
cd noticed_v2

# Resolve problemas de login do admin
echo "   Configurando admin..."
./fix_admin_login.sh

# Popula dados das empresas solares
echo "   Populando dados..."
./populate_solar_companies.sh

# Inicia servidor Rails em background
echo "   Iniciando servidor Rails..."
rails server -p 3000 &
RAILS_PID=$!

cd ..

# 5. Aguarda Rails iniciar
echo "5. Aguardando Rails iniciar..."
sleep 3

# 6. Inicia servidor frontend
echo "6. Iniciando servidor frontend..."
npm run dev &
VITE_PID=$!

# 7. Aguarda servidores iniciarem
echo "7. Aguardando servidores iniciarem..."
sleep 5

# 8. Testa APIs
echo "8. Testando APIs..."
cd noticed_v2
./test_solar_api.sh
cd ..

echo ""
echo "🎉 Projeto iniciado com sucesso!"
echo ""
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend: http://localhost:3000"
echo "👨‍💼 Admin: http://localhost:3000/admin"
echo "   Login: admin@example.com"
echo "   Senha: password"
echo ""
echo "Para parar os servidores:"
echo "./stop_servers.sh"
echo ""
echo "PIDs dos servidores:"
echo "Rails: $RAILS_PID"
echo "Vite: $VITE_PID"