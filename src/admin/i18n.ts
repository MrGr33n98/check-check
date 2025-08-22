// Localization utility for the admin module

export const translations = {
  pt: {
    // General
    'admin.dashboard': 'Painel Administrativo',
    'admin.modules.leads': 'Leads',
    'admin.modules.members': 'Membros',
    'admin.modules.sponsored': 'Patrocinados',
    'admin.modules.access': 'Gestão de Acesso',
    
    // Status
    'status.new': 'Novo',
    'status.contacted': 'Contatado',
    'status.qualified': 'Qualificado',
    'status.converted': 'Convertido',
    'status.discarded': 'Descartado',
    'status.active': 'Ativo',
    'status.inactive': 'Inativo',
    'status.suspended': 'Suspenso',
    'status.expired': 'Expirado',
    'status.paid': 'Pago',
    'status.pending': 'Pendente',
    'status.overdue': 'Atrasado',
    'status.paused': 'Pausado',
    'status.ended': 'Encerrado',
    
    // Roles
    'role.admin': 'Administrador',
    'role.editor': 'Editor',
    'role.reader': 'Leitor',
    
    // Plans
    'plan.basic': 'Básico',
    'plan.pro': 'Pro',
    'plan.enterprise': 'Enterprise',
    
    // Tiers
    'tier.bronze': 'Bronze',
    'tier.silver': 'Prata',
    'tier.gold': 'Ouro',
    'tier.diamond': 'Diamante',
    
    // Sources
    'source.website': 'Site',
    'source.social': 'Redes Sociais',
    'source.referral': 'Indicação',
    'source.webinar': 'Webinar',
    
    // Actions
    'action.edit': 'Editar',
    'action.delete': 'Excluir',
    'action.view': 'Visualizar',
    'action.create': 'Criar',
    'action.save': 'Salvar',
    'action.cancel': 'Cancelar',
    'action.search': 'Pesquisar',
    'action.filter': 'Filtrar',
    'action.clear_filters': 'Limpar Filtros',
    
    // Fields
    'field.name': 'Nome',
    'field.email': 'Email',
    'field.phone': 'Telefone',
    'field.company': 'Empresa',
    'field.status': 'Status',
    'field.role': 'Função',
    'field.plan': 'Plano',
    'field.tier': 'Tier',
    'field.source': 'Origem',
    'field.created_at': 'Data de Criação',
    'field.updated_at': 'Data de Atualização',
    'field.expires_at': 'Expira em',
    'field.start_date': 'Data de Início',
    'field.end_date': 'Data de Expiração',
    'field.website': 'Website',
    'field.description': 'Descrição',
    
    // Messages
    'message.loading': 'Carregando...',
    'message.no_data': 'Nenhum dado encontrado',
    'message.error_loading': 'Erro ao carregar dados',
    'message.success_save': 'Dados salvos com sucesso',
    'message.confirm_delete': 'Tem certeza que deseja excluir este item?',
  },
};

export const t = (key: string, lang: string = 'pt'): string => {
  return translations[lang][key] || key;
};