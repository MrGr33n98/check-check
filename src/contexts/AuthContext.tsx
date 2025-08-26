// AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
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
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    console.log('AuthProvider: Attempting login for', email);
    try {
      const response = await fetch('http://localhost:3000/api/v1/users/sign_in', { // Assuming this is the login endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: { // Devise expects parameters nested under 'user'
            email,
            password,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming the backend returns user data directly
        const loggedInUser: User = {
          id: data.id,
          name: data.name || data.email, // Use name if available, otherwise email
          email: data.email,
          role: data.role || 'user', // Default role if not provided
          created_at: data.created_at,
          // Add other user properties as needed from the response
        };
        setUser(loggedInUser);
        saveUserToLocalStorage(loggedInUser);
        console.log('AuthProvider: Login successful', loggedInUser);
        return true;
      } else {
        const errorData = await response.json();
        console.error('AuthProvider: Login failed', errorData);
        // You might want to extract a more specific error message from errorData
        return false;
      }
    } catch (error) {
      console.error('AuthProvider: Network or unexpected error during login', error);
      return false;
    }
  }, []);

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