// Validation utility for the admin module

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return phoneRegex.test(phone);
};

export const validateDate = (date: string): boolean => {
  return !isNaN(Date.parse(date));
};

export const validateRequired = (value: any): boolean => {
  return value !== undefined && value !== null && value !== '';
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export const validateNumber = (value: string): boolean => {
  return !isNaN(Number(value));
};

export const validatePositiveNumber = (value: string): boolean => {
  const num = Number(value);
  return !isNaN(num) && num > 0;
};

export const validateForm = (fields: Record<string, any>, rules: Record<string, Function[]>): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  for (const fieldName in rules) {
    const fieldValue = fields[fieldName];
    const fieldRules = rules[fieldName];
    
    for (const rule of fieldRules) {
      if (!rule(fieldValue)) {
        errors[fieldName] = `Campo ${fieldName} é inválido`;
        break;
      }
    }
  }
  
  return errors;
};