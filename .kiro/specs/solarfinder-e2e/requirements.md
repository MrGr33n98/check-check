# Requirements Document

## Introduction

SolarFinder é uma plataforma completa para encontrar e avaliar empresas de energia solar no Brasil. A aplicação conecta consumidores interessados em energia solar com empresas qualificadas, oferecendo um sistema de avaliações, geração de leads qualificados, e ferramentas de conversão. A plataforma inclui funcionalidades para usuários finais (busca e avaliação de empresas), empresas (dashboard de gestão de leads e perfil), e administradores (moderação de conteúdo).

## Requirements

### Requirement 1

**User Story:** Como um consumidor interessado em energia solar, eu quero buscar e comparar empresas de energia solar, para que eu possa encontrar a melhor opção para meu projeto.

#### Acceptance Criteria

1. WHEN o usuário acessa a página inicial THEN o sistema SHALL exibir um hero section com barra de busca e estatísticas da plataforma
2. WHEN o usuário digita um termo de busca THEN o sistema SHALL filtrar empresas por nome, localização ou descrição
3. WHEN o usuário visualiza a lista de empresas THEN o sistema SHALL exibir cards com informações básicas (nome, localização, rating, capacidade instalada)
4. WHEN o usuário aplica filtros THEN o sistema SHALL permitir filtrar por localização, capacidade mínima e ordenar por nome, rating, capacidade ou número de avaliações
5. WHEN o usuário clica em uma empresa THEN o sistema SHALL navegar para a página de detalhes da empresa

### Requirement 2

**User Story:** Como um consumidor, eu quero visualizar informações detalhadas de uma empresa de energia solar, para que eu possa avaliar se ela atende minhas necessidades.

#### Acceptance Criteria

1. WHEN o usuário acessa a página de detalhes de uma empresa THEN o sistema SHALL exibir informações completas (descrição, contato, capacidade, avaliações, badges)
2. WHEN o usuário visualiza as abas da empresa THEN o sistema SHALL permitir navegar entre Overview, Reviews, Guides e Contact
3. WHEN o usuário está na aba Reviews THEN o sistema SHALL exibir todas as avaliações aprovadas com rating, comentário e data
4. WHEN o usuário está na aba Guides THEN o sistema SHALL exibir conteúdos educativos publicados pela empresa
5. WHEN o usuário clica em "Solicitar Orçamento" THEN o sistema SHALL abrir o formulário de lead

### Requirement 3

**User Story:** Como um consumidor, eu quero solicitar orçamentos de empresas de energia solar, para que eu possa receber propostas personalizadas.

#### Acceptance Criteria

1. WHEN o usuário preenche o formulário de lead THEN o sistema SHALL coletar informações básicas (nome, email, telefone, endereço, tipo de propriedade)
2. WHEN o usuário preenche campos avançados THEN o sistema SHALL coletar informações de intenção de compra (orçamento, timeline, tipo de telhado, área)
3. WHEN o sistema processa o formulário THEN o sistema SHALL calcular um score de intenção baseado nas respostas
4. WHEN o usuário submete o formulário THEN o sistema SHALL enviar o lead para a empresa e exibir confirmação
5. WHEN o usuário aceita os termos THEN o sistema SHALL permitir o envio do formulário

### Requirement 4

**User Story:** Como um consumidor, eu quero acessar materiais educativos sobre energia solar, para que eu possa tomar decisões mais informadas.

#### Acceptance Criteria

1. WHEN o usuário visualiza a seção de conversion points THEN o sistema SHALL exibir ofertas de materiais gratuitos (guias, calculadora, consultoria, webinar)
2. WHEN o usuário clica em uma oferta THEN o sistema SHALL abrir modal com formulário de captura de lead
3. WHEN o usuário preenche o formulário de conversion point THEN o sistema SHALL coletar informações básicas e interesse específico
4. WHEN o usuário submete o formulário THEN o sistema SHALL registrar o lead e exibir confirmação de envio do material
5. WHEN o usuário cancela o modal THEN o sistema SHALL fechar sem salvar dados

### Requirement 5

**User Story:** Como uma empresa de energia solar, eu quero gerenciar meu perfil na plataforma, para que eu possa atrair mais clientes qualificados.

#### Acceptance Criteria

1. WHEN a empresa acessa o processo de cadastro THEN o sistema SHALL guiar através de 6 etapas (informações básicas, localização, técnicas, documentação, mídia, revisão)
2. WHEN a empresa preenche cada etapa THEN o sistema SHALL validar campos obrigatórios antes de permitir avançar
3. WHEN a empresa completa o cadastro THEN o sistema SHALL enviar para aprovação e exibir status de pendência
4. WHEN a empresa é aprovada THEN o sistema SHALL ativar o perfil e permitir acesso ao dashboard
5. WHEN a empresa edita o perfil THEN o sistema SHALL permitir atualizar informações, especialidades e certificações

### Requirement 6

**User Story:** Como uma empresa de energia solar, eu quero visualizar e gerenciar meus leads, para que eu possa converter prospects em clientes.

#### Acceptance Criteria

1. WHEN a empresa acessa o dashboard THEN o sistema SHALL exibir métricas principais (total de leads, avaliações, visualizações, taxa de conversão)
2. WHEN a empresa visualiza a aba de leads THEN o sistema SHALL listar todos os leads com informações detalhadas e score de intenção
3. WHEN a empresa filtra leads THEN o sistema SHALL permitir filtrar por status, data, score de intenção e fonte
4. WHEN a empresa atualiza status de lead THEN o sistema SHALL permitir alterar entre novo, contatado, qualificado, proposta enviada, fechado
5. WHEN a empresa visualiza analytics THEN o sistema SHALL exibir gráficos de leads por mês, fontes de leads e performance

### Requirement 7

**User Story:** Como uma empresa de energia solar, eu quero acompanhar minha performance na plataforma, para que eu possa otimizar minha estratégia de marketing.

#### Acceptance Criteria

1. WHEN a empresa acessa analytics THEN o sistema SHALL exibir gráficos de leads mensais, fontes de tráfego e conversion points
2. WHEN a empresa visualiza métricas de conversão THEN o sistema SHALL mostrar taxa de conversão por fonte e tipo de conversion point
3. WHEN a empresa analisa concorrência THEN o sistema SHALL exibir comparativo com outras empresas (rating, reviews, market share)
4. WHEN a empresa visualiza palavras-chave THEN o sistema SHALL mostrar ranking e volume de busca para termos relevantes
5. WHEN a empresa acompanha avaliações THEN o sistema SHALL exibir evolução do rating ao longo do tempo

### Requirement 8

**User Story:** Como um usuário, eu quero me autenticar na plataforma, para que eu possa acessar funcionalidades personalizadas.

#### Acceptance Criteria

1. WHEN o usuário acessa a página de login THEN o sistema SHALL permitir autenticação com email e senha
2. WHEN o usuário não tem conta THEN o sistema SHALL permitir registro como consumidor ou empresa
3. WHEN o usuário se registra como empresa THEN o sistema SHALL redirecionar para o processo de cadastro completo
4. WHEN o usuário faz login com sucesso THEN o sistema SHALL armazenar sessão e exibir menu personalizado
5. WHEN o usuário faz logout THEN o sistema SHALL limpar sessão e redirecionar para home

### Requirement 9

**User Story:** Como um administrador, eu quero moderar conteúdo na plataforma, para que eu possa manter a qualidade e confiabilidade.

#### Acceptance Criteria

1. WHEN o administrador acessa o dashboard THEN o sistema SHALL exibir funcionalidades de moderação além das métricas da empresa
2. WHEN há avaliações pendentes THEN o sistema SHALL permitir aprovar, rejeitar ou solicitar modificações
3. WHEN há empresas aguardando aprovação THEN o sistema SHALL permitir revisar documentos e ativar perfis
4. WHEN o administrador gerencia usuários THEN o sistema SHALL permitir alterar roles e status de contas
5. WHEN o administrador visualiza relatórios THEN o sistema SHALL exibir métricas globais da plataforma

### Requirement 10

**User Story:** Como um usuário da plataforma, eu quero navegar facilmente entre as seções, para que eu possa encontrar rapidamente o que preciso.

#### Acceptance Criteria

1. WHEN o usuário acessa qualquer página THEN o sistema SHALL exibir header com logo, navegação principal e busca
2. WHEN o usuário está logado THEN o sistema SHALL exibir menu de usuário com opções personalizadas baseadas no role
3. WHEN o usuário navega no mobile THEN o sistema SHALL exibir menu hambúrguer responsivo
4. WHEN o usuário acessa o footer THEN o sistema SHALL exibir links úteis, informações de contato e redes sociais
5. WHEN o usuário navega entre páginas THEN o sistema SHALL manter estado de autenticação e preferências