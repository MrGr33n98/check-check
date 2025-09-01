#!/bin/bash

# Script para parar todos os servidores
echo "🛑 Parando servidores..."

# Para processos Rails
echo "Parando Rails server..."
pkill -f "rails server" 2>/dev/null || true

# Para processos Vite
echo "Parando Vite dev server..."
pkill -f "vite --host" 2>/dev/null || true

# Para processos Node relacionados ao Vite
pkill -f "node.*vite" 2>/dev/null || true

echo "✅ Todos os servidores foram parados!"

# Mostra processos restantes relacionados
echo ""
echo "Processos restantes (se houver):"
ps aux | grep -E "(rails|vite|node)" | grep -v grep || echo "Nenhum processo encontrado"