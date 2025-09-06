// AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useCallback, useMemo, useContext } from 'react';
import { mockCompanies, mockUsers } from '@/mocks/mockData';
import { User } from '../data/types';
import { getUserFromLocalStorage, saveUserToLocalStorage, removeUserFromLocalStorage } from '../data/storage';

const API_URL = import.meta.env.VITE_API_URL;

// Define the shape of our auth context
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<boolean>;
}

interface LoginResult {
  success: boolean;
  user?: User;
  error?: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  userType: 'customer' | 'company';
  companyName?: string;
}

// Create the context with a default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => ({ success: false }),
  logout: () => {},
  register: async () => false,
});

// Create the provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on initial load
  useEffect(() => {
    console.log('AuthProvider: Checking for stored user...');
    const loadUserFromStorage = () => {
      try {
        const storedUser = getUserFromLocalStorage();
        console.log('AuthProvider: Stored user found:', storedUser);
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error('AuthProvider: Error loading user from localStorage:', error);
      } finally {
        console.log('AuthProvider: Finished checking for stored user');
        setLoading(false);
      }
    };
    
    loadUserFromStorage();
  }, []);

  // Login function
    const login = useCallback(async (email: string, password: string): Promise<LoginResult> => {
    console.log('AuthProvider: Attempting login for', email);

    if (useMocks) {
      return mockLogin(email, password);
    }

    try {
      const response = await fetch(`${API_URL}/users/sign_in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email,
            password,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const loggedInUser: User = {
          id: Number(data.id),
          name: data.name || data.email,
          email: data.email,
          role: data.role || 'user',
          created_at: data.created_at,
          corporate_email: data.corporate_email,
          company_name: data.company_name,
          position: data.position,
          approved: data.approved,
        };
        if (loggedInUser.role === 'empresa') {
          try {
            const companyResponse = await fetch(`${API_URL}/current_company`, {
              method: 'GET',
              headers: {
                'Authorization': 'Bearer ' + data.token,
                'Content-Type': 'application/json',
              },
            });
            if (companyResponse.ok) {
              const companyData = await companyResponse.json();
              loggedInUser.company = companyData;
            } else {
              return { success: false, error: 'Erro ao carregar dados da empresa.' };
            }
          } catch (error) {
            console.error('Error fetching company data:', error);
            return { success: false, error: 'Erro ao carregar dados da empresa.' };
          }
        }
        setUser(loggedInUser);
        saveUserToLocalStorage(loggedInUser);
        console.log('AuthProvider: Login successful', loggedInUser);
        return { success: true, user: loggedInUser };
      } else {
        const errorData = await response.json();
        console.error('AuthProvider: Login failed', errorData);
        return { success: false, error: errorData.error || 'Credenciais inválidas.' };
      }
    } catch (error) {
      console.error('AuthProvider: Backend not available', error);
      if (useMocks) {
        return mockLogin(email, password);
      }
      return { success: false, error: 'Erro de conexão com o servidor.' };
    }
  }, [useMocks]);

  const mockLogin = (email: string, password: string): LoginResult => {
    const mockUser = mockUsers.find(user => user.email === email);

    if (mockUser && password === 'password') {
      const loggedInUser: User = {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role,
        created_at: mockUser.created_at,
        corporate_email: mockUser.corporate_email,
        company_name: mockUser.company_name,
        position: mockUser.position,
        approved: mockUser.approved,
        companyId: mockUser.companyId,
      };

      if (mockUser.role === 'moderator' && mockUser.companyId) {
        const company = mockCompanies.find(c => c.id === mockUser.companyId);
        if (company) {
          loggedInUser.company = { ...company };
        }
      }

      setUser(loggedInUser);
      saveUserToLocalStorage(loggedInUser);
      console.log('AuthProvider: Mock login successful for', loggedInUser.email);
      return { success: true, user: loggedInUser };
    }

    return { success: false, error: 'Credenciais inválidas. Use password como senha para usuários de teste.' };
  };

  // Logout function
  const logout = useCallback(() => {
    console.log('AuthProvider: Logging out user');
    setUser(null);
    removeUserFromLocalStorage();
  }, []);

  // Register function
  const register = useCallback(async (userData: RegisterData): Promise<boolean> => {
    console.log('AuthProvider: Attempting registration for', userData.email);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: Date.now(),
          name: userData.name,
          email: userData.email,
          role: userData.userType === 'company' ? 'moderator' : 'user',
          created_at: new Date().toISOString(),
          ...(userData.userType === 'company' && { companyId: Date.now() }),
        };
        
        setUser(newUser);
        saveUserToLocalStorage(newUser);
        console.log('AuthProvider: Registration successful for', userData.email);
        resolve(true);
      }, 1000);
    });
  }, []);

  // Value object for the context
  const contextValue = useMemo(() => ({
    user,
    login,
    logout,
    register,
  }), [user, login, logout, register]);

  // Prevent rendering children until we've checked for a stored user
  if (loading) {
    console.log('AuthProvider: Still loading, showing loading indicator');
    return <div className="loading">Carregando...</div>;
  }

  console.log('AuthProvider: Rendering children with user:', user);
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};