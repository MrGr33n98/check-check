# solar-trae

## Configuração

1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```
2. Ajuste os valores conforme o ambiente:
   - `VITE_API_URL`: URL base da API (ex.: `http://localhost:3000/api/v1`)
   - `VITE_USE_MOCKS`: defina como `true` para usar dados mockados quando a API não estiver disponível

3. Instale as dependências e inicie o projeto:
   ```bash
   npm install
   npm run dev
   ```
