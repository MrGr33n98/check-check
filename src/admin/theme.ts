// Theme utility for the admin module

export const themes = {
  light: {
    background: '#ffffff',
    foreground: '#111827',
    primary: '#3b82f6',
    secondary: '#6b7280',
    accent: '#10b981',
    destructive: '#ef4444',
    muted: '#9ca3af',
    border: '#e5e7eb',
    input: '#f3f4f6',
    card: '#ffffff',
    cardForeground: '#111827',
    popover: '#ffffff',
    popoverForeground: '#111827',
  },
  dark: {
    background: '#0f172a',
    foreground: '#f1f5f9',
    primary: '#3b82f6',
    secondary: '#94a3b8',
    accent: '#10b981',
    destructive: '#ef4444',
    muted: '#64748b',
    border: '#334155',
    input: '#1e293b',
    card: '#1e293b',
    cardForeground: '#f1f5f9',
    popover: '#1e293b',
    popoverForeground: '#f1f5f9',
  },
};

export const getCurrentTheme = (): 'light' | 'dark' => {
  // In a real app, this would check user preferences or system settings
  return 'light';
};

export const applyTheme = (theme: 'light' | 'dark'): void => {
  const root = document.documentElement;
  const themeColors = themes[theme];
  
  Object.entries(themeColors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
  
  // Save theme preference to localStorage
  localStorage.setItem('admin-theme', theme);
};

export const initializeTheme = (): void => {
  const savedTheme = localStorage.getItem('admin-theme') as 'light' | 'dark' | null;
  const theme = savedTheme || getCurrentTheme();
  applyTheme(theme);
};