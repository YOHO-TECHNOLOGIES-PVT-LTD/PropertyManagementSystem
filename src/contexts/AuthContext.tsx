import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock users for demo purposes
  const mockUsers = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@propertyms.com',
      role: 'admin' as const,
      phone: '+1 (555) 123-4567',
      avatar: undefined
    },
    {
      id: '2',
      name: 'Property Manager',
      email: 'manager@propertyms.com',
      role: 'manager' as const,
      phone: '+1 (555) 123-4568',
      avatar: undefined
    },
    {
      id: '3',
      name: 'Property Owner',
      email: 'owner@propertyms.com',
      role: 'owner' as const,
      phone: '+1 (555) 123-4569',
      avatar: undefined
    }
  ];

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('pms_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('pms_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in real app, this would be an API call
      const foundUser = mockUsers.find(u => u.email === email);
      
      console.log('Login attempt:', { email, password, foundUser });
      
      if (foundUser && password === 'password123') {
        setUser(foundUser);
        localStorage.setItem('pms_user', JSON.stringify(foundUser));
        console.log('Login successful:', foundUser);
        setIsLoading(false);
        return true;
      }
      
      console.log('Login failed: Invalid credentials');
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pms_user');
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};