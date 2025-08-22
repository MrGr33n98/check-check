// Constants for the admin module

export const MODULES = {
  LEADS: 'leads',
  MEMBERS: 'members',
  SPONSORED: 'sponsored',
  ACCESS: 'access',
};

export const STATUS_OPTIONS = {
  LEAD: ['novo', 'contatado', 'qualificado', 'convertido', 'descartado'],
  MEMBER: ['ativo', 'inativo', 'suspenso', 'expirado'],
  SPONSORED: ['ativo', 'pausado', 'encerrado'],
  ACCESS: ['ativo', 'inativo'],
};

export const ROLE_OPTIONS = ['admin', 'editor', 'leitor'];

export const PLAN_OPTIONS = ['basico', 'pro', 'enterprise'];

export const TIER_OPTIONS = ['bronze', 'prata', 'ouro', 'diamante'];

export const SOURCE_OPTIONS = ['site', 'redes', 'indicacao', 'webinar'];

export const PAYMENT_STATUS_OPTIONS = ['pago', 'pendente', 'atrasado'];

export const DATE_FORMAT = 'dd/MM/yyyy';

export const DEFAULT_PAGE_SIZE = 20;

export const FILTER_DEBOUNCE_TIME = 300; // ms