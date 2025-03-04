import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BarChart3, Home, Package, Bell, User, Settings, FileSpreadsheet, LogOut } from 'lucide-react';
type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  path: string;
  active?: boolean;
};
const SidebarItem = ({
  icon: Icon,
  label,
  path,
  active
}: SidebarItemProps) => <Link to={path} className={cn("flex items-center gap-3 px-4 py-3 rounded-md text-sidebar-foreground/90 hover:bg-sidebar-accent transition-all duration-200", active && "bg-sidebar-accent text-sidebar-foreground font-medium")}>
    <Icon size={20} className={cn(active ? "text-white" : "text-white/70")} />
    <span>{label}</span>
  </Link>;
const DashboardSidebar = () => {
  const location = useLocation();
  return <div className="h-screen bg-sidebar w-64 py-6 px-2 flex flex-col border-r border-sidebar-border fixed left-0 top-0 shadow-lg animate-fade-in">
      <div className="px-4 mb-8">
        <h2 className="text-white text-2xl font-bold flex items-center gap-2">
          <Package size={24} />
          <span>LAP HBS</span>
        </h2>
        <p className="text-white/50 text-xs mt-1">Sistema de gestión de equipajes</p>
      </div>
      
      <nav className="flex-1 space-y-1 px-2">
        <SidebarItem icon={Home} label="Dashboard" path="/" active={location.pathname === "/"} />
        <SidebarItem icon={BarChart3} label="Analytics" path="/analytics" active={location.pathname === "/analytics"} />
        <SidebarItem icon={FileSpreadsheet} label="Carga de datos" path="/data-upload" active={location.pathname === "/data-upload"} />
        <SidebarItem icon={Bell} label="Notifications" path="/notifications" active={location.pathname === "/notifications"} />
      </nav>
      
      <div className="mt-auto border-t border-sidebar-border pt-4 px-2 space-y-1">
        <SidebarItem icon={User} label="Profile" path="/profile" active={location.pathname === "/profile"} />
        <SidebarItem icon={Settings} label="Settings" path="/settings" active={location.pathname === "/settings"} />
        <button className="flex items-center gap-3 px-4 py-3 rounded-md text-sidebar-foreground/90 hover:bg-sidebar-accent/80 w-full transition-all duration-200">
          <LogOut size={20} className="text-white/70" />
          <span>Logout</span>
        </button>
      </div>
    </div>;
};
export default DashboardSidebar;