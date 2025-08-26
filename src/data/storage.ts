// localStorage utilities for session management

/**
 * Save user data to localStorage
 * @param user User object
 */
export const saveUserToLocalStorage = (user: any): void => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  } catch (error) {
    console.error('Error saving user to localStorage:', error);
  }
};

/**
 * Get user data from localStorage
 * @returns User object or null
 */
export const getUserFromLocalStorage = (): any => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  } catch (error) {
    console.error('Error getting user from localStorage:', error);
    return null;
  }
};

/**
 * Remove user data from localStorage
 */
export const removeUserFromLocalStorage = (): void => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('user');
    }
  } catch (error) {
    console.error('Error removing user from localStorage:', error);
  }
};

/**
 * Save leads to localStorage
 * @param leads Leads array
 */
export const saveLeadsToLocalStorage = (leads: any[]): void => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('leads', JSON.stringify(leads));
    }
  } catch (error) {
    console.error('Error saving leads to localStorage:', error);
  }
};

/**
 * Get leads from localStorage
 * @returns Leads array
 */
export const getLeadsFromLocalStorage = (): any[] => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const leads = localStorage.getItem('leads');
      return leads ? JSON.parse(leads) : [];
    }
    return [];
  } catch (error) {
    console.error('Error getting leads from localStorage:', error);
    return [];
  }
};

/**
 * Add a lead to localStorage
 * @param lead Lead object
 */
export const addLeadToLocalStorage = (lead: any): void => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const leads = getLeadsFromLocalStorage();
      localStorage.setItem('leads', JSON.stringify([lead, ...leads]));
    }
  } catch (error) {
    console.error('Error adding lead to localStorage:', error);
  }
};