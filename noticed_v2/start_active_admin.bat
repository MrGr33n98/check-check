@echo off
REM Script para configurar e rodar o Active Admin

REM Configurar o PATH corretamente
set PATH=C:\Ruby32-x64\bin;%PATH%

REM Configurar variáveis de ambiente para o banco de dados
set DATABASE_USERNAME=postgres
set DATABASE_PASSWORD=suasenha
set DATABASE_HOST=localhost
set DATABASE_PORT=5432

REM Exibir informações do ambiente
echo Ambiente configurado:
echo PATH=%PATH%
echo DATABASE_USERNAME=%DATABASE_USERNAME%
echo DATABASE_PASSWORD=%DATABASE_PASSWORD%
echo DATABASE_HOST=%DATABASE_HOST%
echo DATABASE_PORT=%DATABASE_PORT%

REM Verificar se o Ruby está funcionando
ruby -v
if %errorlevel% neq 0 (
    echo Erro: Ruby não encontrado ou não funcionando corretamente
    pause
    exit /b 1
)

REM Verificar se o Rails está funcionando
rails -v
if %errorlevel% neq 0 (
    echo Aviso: Rails não encontrado ou com problemas de dependências
    echo Continuando mesmo assim...
)

REM Instalar gems necessárias
echo Instalando gems...
bundle install
if %errorlevel% neq 0 (
    echo Erro: Falha ao instalar gems
    pause
    exit /b 1
)

REM Criar o banco de dados (se necessário)
echo Criando banco de dados...
bundle exec rails db:create
if %errorlevel% neq 0 (
    echo Aviso: Falha ao criar banco de dados (pode já existir)
)

REM Executar migrações
echo Executando migrações...
bundle exec rails db:migrate
if %errorlevel% neq 0 (
    echo Erro: Falha ao executar migrações
    pause
    exit /b 1
)

REM Criar usuário administrativo (se não existir)
echo Criando usuário administrativo...
bundle exec rails runner "AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') unless AdminUser.exists?"

REM Iniciar o servidor Rails
echo Iniciando servidor Rails...
echo Acesse http://localhost:3000/admin para acessar o Active Admin
bundle exec rails server