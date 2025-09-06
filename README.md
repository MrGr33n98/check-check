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
