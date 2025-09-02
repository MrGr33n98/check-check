#!/bin/bash

# Script de correção rápida para problemas comuns
echo "🔧 Executando correções rápidas..."

# 1. Para todos os servidores
echo "1. Parando servidores..."
pkill -f "rails server" 2>/dev/null || true
pkill -f "vite --host" 2>/dev/null || true
pkill -f "node.*vite" 2>/dev/null || true

# 2. Instala axios se não existir
echo "2. Verificando axios..."
if [ ! -d "node_modules/axios" ]; then
    echo "   Instalando axios..."
    npm install axios
else
    echo "   ✅ Axios já instalado"
fi

# 3. Verifica se há conflitos de merge
echo "3. Verificando conflitos..."
if git status | grep -q "<<<<<<< HEAD\|======\|>>>>>>> "; then
    echo "   ⚠️  Conflitos detectados! Execute: ./resolve_merge_conflicts.sh"
else
    echo "   ✅ Sem conflitos"
fi

# 4. Testa se o DynamicBannerSlider foi corrigido
echo "4. Verificando DynamicBannerSlider..."
if grep -q "currentBanner?.image_url" src/components/DynamicBannerSlider.tsx; then
    echo "   ✅ DynamicBannerSlider corrigido"
else
    echo "   ⚠️  DynamicBannerSlider precisa de correção"
fi

# 5. Inicia apenas o frontend para teste
echo "5. Iniciando frontend para teste..."
npm run dev &
VITE_PID=$!

echo ""
echo "Frontend iniciado em: http://localhost:5173"
echo "PID do Vite: $VITE_PID"
echo ""
echo "Para parar: kill $VITE_PID"
echo "Para iniciar tudo: ./setup_and_start_fixed.sh"