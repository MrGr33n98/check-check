# solar-trae
## Desenvolvimento com Docker

Este projeto pode ser executado usando containers que reúnem Rails, Vite e Postgres.

### Pré-requisitos
- Docker
- Docker Compose

### Inicialização
```bash
docker-compose up --build
```

Depois de inicializar:
- Rails disponível em [http://localhost:3000](http://localhost:3000)
- Vite disponível em [http://localhost:5173](http://localhost:5173)
- Postgres acessível na porta `5432`

### Volumes
Os serviços utilizam volumes para facilitar o desenvolvimento:
- `.:/app` – código da aplicação
- `bundle:/usr/local/bundle` – dependências Ruby
- `node_modules:/app/node_modules` – dependências Node
- `postgres_data:/var/lib/postgresql/data` – dados do banco

Para encerrar os containers execute:
```bash
docker-compose down
```
=======
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
