# Integração entre Active Admin (Rails) e Frontend

Este documento explica como a integração entre um backend Ruby on Rails utilizando Active Admin e um frontend (como React, Vue, Nuxt, Next.js, etc.) é geralmente realizada.

## 1. Introdução

O **Active Admin** é uma ferramenta poderosa para criar interfaces de administração para aplicações Rails. Ele é focado na gestão de dados no backend, fornecendo um CRUD (Create, Read, Update, Delete) completo e personalizável para os modelos da sua aplicação.

Um **frontend** (como o que você está desenvolvendo em React/Next.js) é a parte da aplicação com a qual o usuário final interage diretamente. Ele é responsável pela interface do usuário, experiência do usuário (UX) e pela comunicação com o backend para obter e enviar dados.

A integração entre eles se dá principalmente através de **APIs (Application Programming Interfaces)**.

## 2. Pontos Chave da Integração

### 2.1. Endpoints de API

O frontend não interage diretamente com as páginas do Active Admin. Em vez disso, ele se comunica com o backend Rails através de endpoints de API RESTful (ou GraphQL, se configurado).

*   **Exemplo:** Para obter uma lista de empresas, o frontend faria uma requisição `GET` para `/api/v1/providers`. Para cadastrar uma nova empresa, faria um `POST` para o mesmo endpoint.
*   **No Rails:** Estes endpoints são definidos no `config/routes.rb` e implementados em controladores específicos (ex: `Api::V1::ProvidersController`).

### 2.2. Autenticação e Autorização

A segurança é crucial. O frontend precisa de um mecanismo para autenticar usuários e garantir que eles tenham permissão para acessar certos dados ou funcionalidades.

*   **Autenticação:**
    *   **Backend (Rails):** Gems como `Devise` são comumente usadas para gerenciar usuários, senhas e sessões. Para APIs, `Devise` pode ser configurado para retornar tokens (JWT - JSON Web Tokens) ou usar autenticação baseada em tokens simples.
    *   **Frontend:** Após o login, o frontend recebe um token (ou informações da sessão) e o armazena (ex: `localStorage`, `sessionStorage`). Este token é então enviado em cada requisição subsequente para o backend (geralmente no cabeçalho `Authorization`).
*   **Autorização:**
    *   **Backend (Rails):** Gems como `Pundit` ou `CanCanCan` são usadas para definir regras de permissão (quem pode fazer o quê). O backend verifica essas regras antes de processar uma requisição.
    *   **Frontend:** Pode haver lógica de autorização no frontend para esconder ou mostrar elementos da UI com base no papel do usuário, mas a validação final sempre ocorre no backend.

### 2.3. Serialização de Dados

Os dados do Rails (objetos ActiveRecord) precisam ser convertidos para um formato que o frontend possa entender, geralmente JSON.

*   **No Rails:** Gems como `Active Model Serializers`, `Fast JSON API` ou `Jbuilder` são usadas para definir como os modelos serão representados em JSON. Isso permite controlar quais atributos são expostos e como são formatados (ex: `photo_url` para imagens do Active Storage).
*   **Exemplo:** Um `Provider` no Rails se torna um objeto JSON com campos como `id`, `name`, `description`, `photo_url`, etc.

### 2.4. Upload de Arquivos (Active Storage)

Para uploads de imagens ou outros arquivos, o Active Storage do Rails é a solução nativa.

*   **Frontend:** Envia os arquivos como `FormData` para o endpoint da API.
*   **Backend (Rails):** O controlador recebe o `FormData` e anexa os arquivos ao modelo usando `has_one_attached` ou `has_many_attached`. O Active Storage cuida do armazenamento (local, S3, Google Cloud Storage, etc.).
*   **URLs:** O Active Storage gera URLs para os arquivos anexados. Para que o frontend possa exibir essas imagens, o backend precisa fornecer as URLs completas (ex: usando `rails_blob_url` no serializer).

### 2.5. Rotas e CORS (Cross-Origin Resource Sharing)

*   **Rotas:** O frontend faz requisições para URLs que correspondem aos endpoints da API no Rails.
*   **CORS:** Se o frontend e o backend estiverem em domínios/portas diferentes (ex: `localhost:5173` para frontend e `localhost:3000` para backend), o navegador impõe restrições de CORS. O backend Rails precisa ser configurado para permitir requisições do domínio do frontend (usando a gem `rack-cors`).

## 3. O Papel do Active Admin na Integração

O Active Admin, por si só, não é uma API para o frontend. Ele é uma interface de administração. No entanto, ele gerencia os mesmos modelos que sua API expõe.

*   **Gestão de Dados:** Administradores usam o Active Admin para criar, editar, aprovar e gerenciar os dados que são consumidos e exibidos pelo frontend.
*   **Fluxos de Aprovação:** Como no seu caso, o Active Admin é o local onde a equipe de administração aprova o cadastro de novas empresas, alterando o status de `pending` para `active`.

## 4. Fluxo de Exemplo (Cadastro e Aprovação de Empresa)

1.  **Frontend (Formulário de Cadastro):** O usuário preenche o formulário de cadastro de empresa no frontend.
2.  **Requisição POST:** O frontend envia os dados do formulário (incluindo arquivos via `FormData`) para o endpoint da API Rails (ex: `POST /api/v1/providers`).
3.  **Backend (Rails - `ProvidersController#create`):**
    *   Recebe os dados.
    *   Cria um novo registro `Provider` com `status: 'pending'`.
    *   Anexa os arquivos (logo, portfólio) via Active Storage.
    *   Retorna uma resposta JSON (ex: `201 Created` com os dados da nova empresa).
4.  **Frontend:** Recebe a resposta, exibe uma mensagem de sucesso ao usuário e o redireciona.
5.  **Active Admin (Página de Aprovações):** Um administrador acessa `/admin/company_approvals` (ou a lista de `Providers` pendentes).
6.  **Visualização e Aprovação:** O administrador vê a nova empresa pendente, clica para ver os detalhes (`/admin/providers/:slug`), revisa as informações e clica no botão "Aprovar Empresa".
7.  **Requisição PATCH:** O botão "Aprovar Empresa" envia uma requisição `PATCH` para o endpoint de ação customizada (ex: `/admin/providers/:slug/approve`).
8.  **Backend (Rails - `ProvidersController#approve`):**
    *   Recebe a requisição.
    *   Atualiza o `status` do `Provider` para `active`.
    *   Registra quem aprovou (`approved_by`) e quando (`approved_at`).
    *   Redireciona o administrador de volta para a página de detalhes com uma mensagem de sucesso.
9.  **Frontend (Consumo de Dados):** Agora, quando o frontend requisitar a lista de empresas ativas, essa nova empresa será incluída.

## 5. Conclusão

A integração entre Active Admin (Rails) e um frontend é uma questão de **separação de responsabilidades**. O Active Admin cuida da interface de gerenciamento de dados para administradores, enquanto o frontend cuida da experiência do usuário final, ambos se comunicando com o mesmo backend Rails através de APIs bem definidas.
