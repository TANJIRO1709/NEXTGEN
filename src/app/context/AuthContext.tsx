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
  user: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
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

  const login = async (token: string, userData: any) => {
    try {
      setIsLoggedIn(true);
      setToken(token);
      setUser(userData);

      // Store user data
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // Route based on user type and department
      if (userData.userType === 'admin') {
        const departmentRoutes: { [key: string]: string } = {
          'CL': '/dashboard/circular-level',
          'RL': '/dashboard/regional-level',
          'HL': '/dashboard/admin',
          'SL': '/dashboard/sub-divisional-level'
        };

        const targetRoute = departmentRoutes[userData.department] || '/dashboard/admin';
        console.log('Routing admin to:', targetRoute);
        router.push(targetRoute);
      } else {
        router.push('/dashboard/user');
      }

      toast.success('Login successful!');
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occurred during login');
    }
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

  useEffect(() => {
    const checkAuth = () => {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const currentPath = window.location.pathname;

      if (isLoggedIn) {
        // Check if user is accessing the correct dashboard
        if (userData.userType === 'admin') {
          const departmentPaths: { [key: string]: string } = {
            'CL': '/dashboard/circular-level',
            'RL': '/dashboard/regional-level',
            'HL': '/dashboard/admin',
            'SL': '/dashboard/sub-divisional-level'
          };

          const correctPath = departmentPaths[userData.department];
          if (correctPath && !currentPath.startsWith(correctPath)) {
            router.push(correctPath);
          }
        } else if (!currentPath.startsWith('/dashboard/user')) {
          router.push('/dashboard/user');
        }
      }
    };

    checkAuth();
  }, [isLoggedIn, router]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout, token, user }}>
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
