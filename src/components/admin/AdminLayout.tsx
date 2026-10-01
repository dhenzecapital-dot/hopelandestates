import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { HopelandLogo } from '../HopelandLogo.tsx';
import {
  LayoutDashboard,
  Building2,
  Home,
  Inbox,
  FileEdit,
  Image as ImageIcon,
  FolderLock,
  Users,
  History,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  Server,
  Sparkles
} from 'lucide-react';

interface AdminLayoutProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onNavigatePublic: (path: string) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  onNavigatePublic,
  children
}) => {
  const { user, logout, isSuperAdmin } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Project Management', icon: Building2 },
    { id: 'properties', label: 'Property Inventory', icon: Home },
    { id: 'inquiries', label: 'Inquiry Management', icon: Inbox },
    { id: 'cms', label: 'Website CMS', icon: FileEdit },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'branding', label: 'Brand & Identity', icon: Sparkles },
    { id: 'documents', label: 'Corporate Documents', icon: FolderLock },
    ...(isSuperAdmin ? [{ id: 'users', label: 'User Management', icon: Users }] : []),
    { id: 'logs', label: 'System Audit Logs', icon: History }
  ];

  const handleSelect = (id: string) => {
    onSelectTab(id);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#07172F] text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0B2345] border-r border-[#163A63] shrink-0 justify-between">
        <div>
          {/* Logo & Brand Header */}
          <div className="p-5 border-b border-[#163A63] flex items-center justify-between">
            <HopelandLogo variant="compact" inverted height={40} />
          </div>

          {/* User Badge */}
          <div className="px-5 py-4 border-b border-[#163A63]/60 bg-[#07172F]/50">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C49A32]" />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-mono">
                  <span className="text-[#D8B65B] font-semibold">{user?.role}</span>
                  <span>·</span>
                  <span className="truncate">{user?.department}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-[#163A63] text-[#D8B65B] font-semibold border-l-2 border-[#C49A32]'
                      : 'text-slate-300 hover:bg-[#163A63]/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#163A63] space-y-2">
          <button
            onClick={() => onNavigatePublic('/')}
            className="w-full flex items-center justify-between px-3 py-2 rounded text-xs text-slate-300 hover:text-white hover:bg-[#163A63]/60 transition-colors"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C49A32]" />
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded text-xs text-rose-300 hover:text-white hover:bg-rose-900/40 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#0B2345] border-b border-[#163A63] p-4 flex items-center justify-between">
        <HopelandLogo variant="compact" inverted height={34} />
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigatePublic('/')}
            className="text-xs text-slate-300 flex items-center gap-1 hover:text-white"
          >
            <span>Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C49A32]" />
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 text-slate-200 hover:text-white"
          >
            {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#C49A32]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="md:hidden bg-[#0B2345] border-b border-[#163A63] p-4 space-y-2">
          <div className="pb-3 border-b border-[#163A63]">
            <p className="text-xs font-bold text-white">{user?.name}</p>
            <p className="text-[10px] text-[#D8B65B] font-mono">{user?.role} · {user?.department}</p>
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs ${
                  isActive ? 'bg-[#163A63] text-[#D8B65B] font-semibold' : 'text-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 pt-3 border-t border-[#163A63]"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}

      {/* Main Administrative Workspace */}
      <main className="flex-1 bg-[#F7F8FA] text-[#17263A] overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
