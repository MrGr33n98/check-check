# 🌞 Guia de Configuração - Empresas de Energia Solar

## Empresas Criadas

Foram criadas 5 empresas de energia solar, uma para cada capital do Brasil:

### 1. **Solar Paulista Energia** - São Paulo, SP
- **Especialidades**: Residencial, Comercial, Industrial
- **Experiência**: 15 anos (fundada em 2009)
- **Funcionários**: 250
- **Telefone**: +55 (11) 3456-7890

### 2. **Rio Solar Energy** - Rio de Janeiro, RJ
- **Especialidades**: Residencial, Comercial, Condomínios
- **Experiência**: 12 anos (fundada em 2012)
- **Funcionários**: 180
- **Telefone**: +55 (21) 2345-6789

### 3. **Minas Solar Tech** - Belo Horizonte, MG
- **Especialidades**: Residencial, Rural, Pequenas Empresas
- **Experiência**: 10 anos (fundada em 2014)
- **Funcionários**: 95
- **Telefone**: +55 (31) 3234-5678

### 4. **Nordeste Solar** - Salvador, BA
- **Especialidades**: Industrial, Comercial, Usinas Solares
- **Experiência**: 13 anos (fundada em 2011)
- **Funcionários**: 320
- **Telefone**: +55 (71) 3123-4567

### 5. **Amazônia Solar Verde** - Manaus, AM
- **Especialidades**: Residencial, Comunidades Remotas, Projetos Sustentáveis
- **Experiência**: 8 anos (fundada em 2016)
- **Funcionários**: 75
- **Telefone**: +55 (92) 3012-3456

## Como Importar via Active Admin

### Método 1: Importação CSV (Recomendado)

1. **Acesse o Active Admin**:
   ```
   http://localhost:3000/admin
   ```

2. **Navegue para Providers**:
   - Clique em "Providers" no menu lateral

3. **Importe o CSV**:
   - Clique em "Importar CSV"
   - Selecione o arquivo `solar_companies.csv` (localizado na raiz do projeto)
   - Clique em "Importar"

4. **Verifique a Importação**:
   - As 5 empresas devem aparecer na lista
   - Status: "Active" (ativas para busca)

### Método 2: Criação Manual

Se preferir criar manualmente, use os dados abaixo para cada empresa:

#### Campos Obrigatórios:
- **Nome**: [Nome da empresa]
- **País**: Brasil
- **Ano de Fundação**: [Ver lista acima]
- **Número de Funcionários**: [Ver lista acima]
- **Status**: Active

#### Campos Opcionais:
- **Título**: [Slogan da empresa]
- **Descrição Resumida**: [Descrição da empresa]
- **Endereço**: [Endereço completo]
- **Telefone**: [Telefone de contato]
- **Tags**: energia solar, sustentabilidade, [especialidades]
- **Links Sociais**: [URLs das redes sociais]

## Testando a Busca

### No Frontend React:

1. **Busca por Localização**:
   - Digite "São Paulo" → Deve aparecer "Solar Paulista Energia"
   - Digite "Rio de Janeiro" → Deve aparecer "Rio Solar Energy"
   - Digite "Belo Horizonte" → Deve aparecer "Minas Solar Tech"
   - Digite "Salvador" → Deve aparecer "Nordeste Solar"
   - Digite "Manaus" → Deve aparecer "Amazônia Solar Verde"

2. **Busca por Nome**:
   - Digite "Solar" → Deve aparecer todas as empresas
   - Digite "Paulista" → Deve aparecer apenas a empresa de SP
   - Digite "Nordeste" → Deve aparecer apenas a empresa da BA

3. **Busca por Especialidade**:
   - Digite "residencial" → Deve aparecer SP, RJ, MG, AM
   - Digite "industrial" → Deve aparecer SP, BA
   - Digite "rural" → Deve aparecer apenas MG

### Endpoints da API:

```bash
# Buscar todas as empresas ativas
GET http://localhost:3000/api/v1/providers

# Buscar por localização
GET http://localhost:3000/api/v1/providers/search?location=São Paulo

# Buscar por nome
GET http://localhost:3000/api/v1/providers/search?query=Solar

# Buscar com filtros combinados
GET http://localhost:3000/api/v1/providers/search?location=Rio de Janeiro&services=residencial
```

## Estrutura dos Dados

### Formato da Resposta da API:

```json
{
  "results": [
    {
      "id": 1,
      "name": "Solar Paulista Energia",
      "location": "São Paulo, SP",
      "rating": 4.8,
      "review_count": 127,
      "price": 35000,
      "experience": "15 anos",
      "services": ["Residencial", "Comercial", "Industrial"],
      "certifications": ["INMETRO", "ANEEL", "ISO 9001"],
      "phone": "+55 (11) 3456-7890",
      "address": "Av. Paulista, 1578 - Bela Vista, São Paulo - SP",
      "short_description": "Líder em energia solar no estado de São Paulo..."
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 20,
    "total_pages": 1,
    "total_count": 5
  }
}
```

## Funcionalidades Implementadas

### ✅ Backend (Rails + Active Admin)
- [x] Model Provider com validações
- [x] Active Admin interface completa
- [x] Importação CSV
- [x] API de busca com filtros
- [x] Dados mock realistas
- [x] Sistema de ratings calculados
- [x] Preços baseados em características da empresa

### ✅ Frontend (React)
- [x] Hook useSearch atualizado
- [x] Integração com API Rails
- [x] Fallback para dados mock
- [x] Busca por localização, nome e serviços
- [x] Interface de resultados
- [x] Filtros funcionais

### ✅ Dados das Empresas
- [x] 5 empresas de capitais diferentes
- [x] Dados realistas e completos
- [x] Tags e especialidades
- [x] Contatos e endereços
- [x] Anos de experiência variados
- [x] Tamanhos de empresa diferentes

## Próximos Passos

1. **Adicionar Imagens**:
   - Upload de logos das empresas
   - Imagens de capa/banner
   - Fotos de projetos

2. **Sistema de Avaliações**:
   - Reviews reais de clientes
   - Sistema de notas
   - Comentários e feedback

3. **Geolocalização**:
   - Integração com mapas
   - Busca por proximidade
   - Raio de atendimento

4. **Filtros Avançados**:
   - Faixa de preço
   - Tipo de instalação
   - Certificações específicas
   - Disponibilidade

---

**Desenvolvido para Check Check Solar** 🌞

Para suporte, consulte a documentação ou entre em contato com a equipe de desenvolvimento.