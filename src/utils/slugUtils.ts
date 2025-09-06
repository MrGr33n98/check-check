/**
 * Normaliza uma string para ser usada como slug
 * @param text Texto a ser normalizado
 * @returns Slug normalizado
 */
export function normalizeSlug(text: string): string {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\-]/g, '');
}