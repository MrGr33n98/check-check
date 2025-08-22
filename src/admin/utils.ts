import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR');
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    novo: 'bg-blue-100 text-blue-800',
    contatado: 'bg-yellow-100 text-yellow-800',
    qualificado: 'bg-green-100 text-green-800',
    convertido: 'bg-purple-100 text-purple-800',
    descartado: 'bg-red-100 text-red-800',
    ativo: 'bg-green-100 text-green-800',
    inativo: 'bg-gray-100 text-gray-800',
    suspenso: 'bg-orange-100 text-orange-800',
    expirado: 'bg-red-100 text-red-800',
    pago: 'bg-green-100 text-green-800',
    pendente: 'bg-yellow-100 text-yellow-800',
    atrasado: 'bg-red-100 text-red-800',
    pausado: 'bg-yellow-100 text-yellow-800',
    encerrado: 'bg-red-100 text-red-800',
  };
  
  return colors[status] || 'bg-gray-100 text-gray-800';
}

export function getTierColor(tier: string): string {
  const colors: Record<string, string> = {
    bronze: 'bg-amber-100 text-amber-800',
    prata: 'bg-gray-100 text-gray-800',
    ouro: 'bg-yellow-100 text-yellow-800',
    diamante: 'bg-blue-100 text-blue-800',
  };
  
  return colors[tier] || 'bg-gray-100 text-gray-800';
}

export function getRoleColor(role: string): string {
  const colors: Record<string, string> = {
    admin: 'bg-red-100 text-red-800',
    editor: 'bg-blue-100 text-blue-800',
    leitor: 'bg-green-100 text-green-800',
  };
  
  return colors[role] || 'bg-gray-100 text-gray-800';
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.substring(0, length) + '...' : str;
}