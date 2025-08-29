# Instruções para rodar o Active Admin

## Passo 1: Configurar o PostgreSQL

1. Certifique-se de que o PostgreSQL está instalado e rodando em sua máquina.
2. O banco de dados deve estar configurado com:
   - Usuário: postgres
   - Senha: suasenha (você pode alterar no arquivo .env)
   - Host: localhost
   - Porta: 5432

## Passo 2: Executar o script

1. Execute o arquivo `start_active_admin.bat` como administrador (clique com botão direito e selecione "Executar como administrador").
2. O script irá:
   - Configurar o ambiente corretamente
   - Instalar as gems necessárias
   - Criar o banco de dados (se necessário)
   - Executar as migrações
   - Criar um usuário administrativo (admin@example.com / password)
   - Iniciar o servidor Rails

## Passo 3: Acessar o Active Admin

1. Após o servidor iniciar, acesse no navegador:
   http://localhost:3000/admin

2. Faça login com:
   - Email: admin@example.com
   - Senha: password

## Problemas comuns e soluções

1. Se ocorrer erro de permissão, execute o script como administrador.
2. Se o PostgreSQL não estiver configurado corretamente, verifique as credenciais no arquivo `.env`.
3. Se houver conflitos de gems, tente executar `bundle update` antes de rodar o script.

## Customização

- Para alterar a senha do usuário administrativo, edite a linha no script:
  `AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')`