// Utility functions for data processing and calculations

/**
 * Calculate intention score based on lead data
 * @param data Lead data object
 * @returns Intention score (0-100)
 */
export const calculateIntentionScore = (data: any): number => {
  let score = 0;
  
  // Budget (30 points)
  if (data.budget === 'above_50k') score += 30;
  else if (data.budget === '30k_50k') score += 25;
  else if (data.budget === '15k_30k') score += 20;
  else if (data.budget === '10k_15k') score += 15;
  else if (data.budget === 'below_10k') score += 10;
  
  // Purchase intention (25 points)
  if (data.purchaseIntention === 'ready_to_buy') score += 25;
  else if (data.purchaseIntention === 'next_3_months') score += 20;
  else if (data.purchaseIntention === 'next_6_months') score += 15;
  else if (data.purchaseIntention === 'next_year') score += 10;
  else if (data.purchaseIntention === 'researching') score += 5;
  
  // Timeline (20 points)
  if (data.timeline === 'asap') score += 20;
  else if (data.timeline === '1-3_months') score += 15;
  else if (data.timeline === '3-6_months') score += 10;
  else if (data.timeline === '6-12_months') score += 5;
  
  // Decision maker (15 points)
  if (data.decisionMaker === 'yes') score += 15;
  else if (data.decisionMaker === 'partial') score += 10;
  else if (data.decisionMaker === 'no') score += 5;
  
  // Financing interest (10 points)
  if (data.financingInterest === 'cash') score += 10;
  else if (data.financingInterest === 'financing') score += 8;
  else if (data.financingInterest === 'leasing') score += 6;
  
  return Math.min(score, 100); // Cap at 100
};

/**
 * Format currency value
 * @param value Currency value
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

/**
 * Format date
 * @param date Date string or object
 * @returns Formatted date string
 */
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Get status color class
 * @param status Status string
 * @returns Tailwind CSS color classes
 */
export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    qualified: 'bg-purple-100 text-purple-800',
    proposal_sent: 'bg-orange-100 text-orange-800',
    closed_won: 'bg-green-100 text-green-800',
    closed_lost: 'bg-red-100 text-red-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

/**
 * Get status label
 * @param status Status string
 * @returns Translated status label
 */
export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    new: 'Novo',
    contacted: 'Contatado',
    qualified: 'Qualificado',
    proposal_sent: 'Proposta Enviada',
    closed_won: 'Fechado - Ganho',
    closed_lost: 'Fechado - Perdido'
  };
  return labels[status] || status;
};