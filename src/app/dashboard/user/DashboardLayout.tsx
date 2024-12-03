'use client';

import { Sidebar } from "@/app/components/ui/Sidebar/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <main className="lg:pl-[220px] p-6">
        {children}
      </main>
    </div>
  );
}