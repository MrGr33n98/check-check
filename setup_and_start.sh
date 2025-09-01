#!/bin/bash

# Script completo para configurar e iniciar o projeto
echo "🚀 Configurando e iniciando o projeto SolarFinder..."

# 1. Resolve conflitos se existirem
echo "1. Verificando conflitos de merge..."
if git status | grep -q "both modified\|Unmerged paths"; then
    echo "   Resolvendo conflitos..."
    ./resolve_merge_conflicts.sh
else
    echo "   ✅ Nenhum conflito detectado"
fi

# 2. Configura o backend Rails
echo "2. Configurando backend Rails..."
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

# 3. Instala dependências do frontend se necessário
echo "3. Verificando dependências do frontend..."
if [ ! -d "node_modules" ]; then
    echo "   Instalando dependências..."
    npm install
    npm install axios
else
    echo "   Verificando axios..."
    if ! npm list axios > /dev/null 2>&1; then
        echo "   Instalando axios..."
        npm install axios
    else
        echo "   ✅ Dependências já instaladas"
    fi
fi

# 4. Inicia servidor frontend
echo "4. Iniciando servidor frontend..."
npm run dev &
VITE_PID=$!

# 5. Aguarda servidores iniciarem
echo "5. Aguardando servidores iniciarem..."
sleep 5

# 6. Testa APIs
echo "6. Testando APIs..."
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
echo "kill $RAILS_PID $VITE_PID"
echo ""
echo "PIDs salvos em:"
echo "Rails: $RAILS_PID"
echo "Vite: $VITE_PID"