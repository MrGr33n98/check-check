# Guia de Importação CSV - Empresas/Provedores

## Visão Geral

Este guia explica como usar a funcionalidade de importação CSV no Active Admin para cadastrar empresas/provedores em massa na plataforma Check Check Solar.

## Acesso à Funcionalidade

1. Faça login no painel administrativo
2. Navegue para **Providers** no menu lateral
3. Na página de listagem, você verá dois botões:
   - **Importar CSV**: Para fazer upload do arquivo
   - **Baixar Template CSV**: Para baixar o modelo

## Preparando o Arquivo CSV

### 1. Baixar o Template

Clique em "Baixar Template CSV" para obter um arquivo modelo com:
- Cabeçalhos corretos
- Exemplos de dados
- Formato esperado para cada campo

### 2. Campos Obrigatórios

Os seguintes campos são **obrigatórios** e devem estar preenchidos:

- `name`: Nome da empresa (único)
- `country`: País da empresa
- `foundation_year`: Ano de fundação (entre 1800 e ano atual)
- `members_count`: Número de funcionários (número inteiro ≥ 0)
- `status`: Status da empresa (pending, active, rejected, suspended)

### 3. Campos Opcionais

- `title`: Título/slogan da empresa
- `short_description`: Descrição breve
- `address`: Endereço completo
- `phone`: Telefone de contato
- `revenue`: Receita anual
- `social_links`: Links de redes sociais (separados por vírgula)
- `tags`: Tags/categorias (separadas por vírgula)

### 4. Formato dos Dados

#### Status Válidos
- `pending`: Aguardando aprovação
- `active`: Empresa ativa
- `rejected`: Empresa rejeitada
- `suspended`: Empresa suspensa

#### Social Links
Formato: `https://facebook.com/empresa,https://linkedin.com/company/empresa`

#### Tags
Formato: `energia solar,sustentabilidade,renovável`

#### Exemplo de Linha CSV
```csv
name,title,short_description,country,address,phone,foundation_year,members_count,revenue,social_links,tags,status
"Solar Tech Ltda","Energia Solar Inteligente","Especialistas em energia solar residencial","Brasil","Rua das Flores, 123, São Paulo","+55 11 99999-9999",2015,25,1500000,"https://facebook.com/solartech,https://linkedin.com/company/solartech","energia solar,sustentabilidade","pending"
```

## Processo de Importação

### 1. Upload do Arquivo

1. Clique em "Importar CSV"
2. Selecione seu arquivo CSV
3. Clique em "Importar"

### 2. Validações Realizadas

O sistema validará:
- **Extensão do arquivo**: Deve ser .csv
- **Tamanho do arquivo**: Máximo 5MB
- **Campos obrigatórios**: Todos devem estar preenchidos
- **Duplicidade**: Nomes de empresas devem ser únicos
- **Formato dos dados**: Anos, números, status válidos
- **Links sociais**: URLs válidas

### 3. Tratamento de Erros

Se houver erros:
- Uma mensagem detalhada será exibida
- Linhas com erro serão listadas
- Nenhum registro será importado até que todos os erros sejam corrigidos

### 4. Resultado da Importação

Após importação bem-sucedida, você verá:
- Número total de registros processados
- Número de empresas criadas
- Número de empresas atualizadas (se aplicável)
- Lista de empresas importadas

## Notificações por Email

### Empresas Cadastradas
Quando uma nova empresa é cadastrada:
- **Administradores** recebem notificação sobre nova empresa pendente
- Email inclui detalhes da empresa e link para aprovação

### Mudanças de Status
Quando o status de uma empresa muda:
- **Usuários da empresa** recebem notificação por email
- Tipos de notificação:
  - ✅ **Aprovação**: Empresa foi aprovada e está ativa
  - ❌ **Rejeição**: Empresa foi rejeitada com motivos
  - ⚠️ **Suspensão**: Empresa foi suspensa temporariamente

## Dicas e Boas Práticas

### 1. Preparação dos Dados
- Use o template fornecido como base
- Verifique dados antes da importação
- Mantenha backup dos dados originais

### 2. Teste com Poucos Registros
- Faça um teste com 2-3 empresas primeiro
- Verifique se os dados foram importados corretamente
- Depois importe o lote completo

### 3. Validação de URLs
- Certifique-se de que links sociais são URLs válidas
- Use formato completo: `https://...`

### 4. Encoding do Arquivo
- Salve o CSV em UTF-8 para caracteres especiais
- Use vírgula como separador
- Use aspas duplas para campos com vírgulas

## Solução de Problemas

### Erro: "Nome já existe"
**Solução**: Verifique se não há empresas duplicadas no arquivo ou no sistema

### Erro: "Ano de fundação inválido"
**Solução**: Use anos entre 1800 e o ano atual

### Erro: "Status inválido"
**Solução**: Use apenas: pending, active, rejected, suspended

### Erro: "Link social inválido"
**Solução**: Verifique se as URLs começam com http:// ou https://

### Erro: "Arquivo muito grande"
**Solução**: Divida o arquivo em lotes menores (máximo 5MB)

## Suporte

Para dúvidas ou problemas:
- Entre em contato com a equipe técnica
- Email: suporte@checkcheck.com
- Inclua detalhes do erro e arquivo CSV (se possível)

---

**Última atualização**: Janeiro 2024
**Versão**: 1.0