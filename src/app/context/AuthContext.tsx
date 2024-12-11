'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  login: (token: string, userData: any) => void;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check both localStorage and sessionStorage for existing auth
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    const storedUserType = localStorage.getItem('userType') || sessionStorage.getItem('userType');
    
    if (storedToken && storedUserType) {
      setToken(storedToken);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setToken(null);
    }

    // Listen for storage events (for cross-tab synchronization)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token') {
        if (e.newValue) {
          setToken(e.newValue);
          setIsLoggedIn(true);
        } else {
          setToken(null);
          setIsLoggedIn(false);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (newToken: string, userData: any) => {
    // Store in both localStorage and sessionStorage for persistence
    localStorage.setItem('token', newToken);
    localStorage.setItem('userType', userData.userType);
    localStorage.setItem('userData', JSON.stringify(userData));
    
    sessionStorage.setItem('token', newToken);
    sessionStorage.setItem('userType', userData.userType);
    sessionStorage.setItem('userData', JSON.stringify(userData));
    
    // Set token in cookie
    document.cookie = `token=${newToken}; path=/; max-age=86400; samesite=strict`;
    
    // Update state
    setToken(newToken);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      // Call backend logout endpoint
      const response = await fetch('http://localhost:4000/api/v1/auth/admin/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error('Logout failed on server');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Clear all storage regardless of server response
      localStorage.clear();
      sessionStorage.clear();
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      
      // Update state
      setToken(null);
      setIsLoggedIn(false);
      
      // Redirect to login
      router.push('/login');
      toast.success('Logged out successfully');
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
