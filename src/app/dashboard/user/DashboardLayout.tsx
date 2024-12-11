'use client';
import { useState } from "react";
import Sidebar from "@/app/components/ui/common/Sidebar";
import LogoutModal from "@/app/components/ui/common/LogoutModal";
import ProtectedRoute from "@/app/components/auth/ProtectedRoute";
import { useAuth } from "@/app/context/AuthContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { logout } = useAuth();
  const userType = typeof window !== 'undefined' ? localStorage.getItem('userType') : 'admin';

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#F3F9FF]">
        <Sidebar userType={userType} onLogout={handleLogout} />
        <main className="lg:pl-64 pt-6 p-6">
          {children}
        </main>
        {showLogoutModal && (
          <LogoutModal onClose={() => setShowLogoutModal(false)} onLogout={logout} />
        )}
      </div>
    </ProtectedRoute>
  );
}