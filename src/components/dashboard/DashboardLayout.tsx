
import React from 'react';
import DashboardSidebar from './DashboardSidebar';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const DashboardLayout = ({ children, className }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar />
      <div className="pl-64 w-full overflow-auto">
        <main className={cn("p-6", className)}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
