// AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/data/types';
import { getUserFromLocalStorage, saveUserToLocalStorage, removeUserFromLocalStorage } from '@/data/storage';

// Define the shape of our auth context
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<boolean>;
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
  login: async () => false,
  logout: () => {},
  register: async () => false,
});

// Create the provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check if user is already logged in on initial load
  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Demo credentials
        if (email === 'admin@solarenergy.com' && password === 'password') {
          const adminUser: User = {
            id: 1,
            name: 'Admin User',
            email: 'admin@solarenergy.com',
            role: 'admin',
            created_at: new Date().toISOString(),
          };
          setUser(adminUser);
          saveUserToLocalStorage(adminUser);
          resolve(true);
        } else if (email === 'moderator@solarenergy.com' && password === 'password') {
          const moderatorUser: User = {
            id: 2,
            name: 'Company Moderator',
            email: 'moderator@solarenergy.com',
            role: 'moderator',
            created_at: new Date().toISOString(),
            companyId: 1,
          };
          setUser(moderatorUser);
          saveUserToLocalStorage(moderatorUser);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    removeUserFromLocalStorage();
  };

  // Register function
  const register = async (userData: RegisterData): Promise<boolean> => {
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
        resolve(true);
      }, 1000);
    });
  };

  // Value object for the context
  const contextValue: AuthContextType = {
    user,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};