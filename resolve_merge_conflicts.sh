#!/bin/bash

# Script para resolver conflitos de merge automaticamente
echo "Resolvendo conflitos de merge..."

# Verifica se há conflitos
if git status | grep -q "both modified\|Unmerged paths"; then
    echo "Conflitos detectados. Resolvendo..."
    
    # Adiciona os arquivos resolvidos
    git add src/pages/SearchPage.tsx
    
    # Commit do merge
    git commit -m "Resolve merge conflicts in SearchPage.tsx - keep grid layout"
    
    echo "Conflitos resolvidos e commit realizado!"
else
    echo "Nenhum conflito detectado."
fi

# Verifica o status final
echo "Status atual do Git:"
git status --short

echo "Pronto! Agora você pode executar 'npm run dev' novamente."