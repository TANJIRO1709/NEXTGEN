'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { isLoggedIn, token } = useAuth();

  useEffect(() => {
    const checkAuth = () => {
      const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
      const userType = localStorage.getItem('userType') || sessionStorage.getItem('userType');

      if (!storedToken || !userType) {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router, isLoggedIn, token]);

  // If we have a token, render the protected content
  if (token) {
    return <>{children}</>;
  }

  // Return null while checking authentication
  return null;
};

export default ProtectedRoute;
