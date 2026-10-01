import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { PublicLayout } from './components/layout/PublicLayout.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ServicesPage } from './pages/ServicesPage.tsx';
import { ProjectsPage } from './pages/ProjectsPage.tsx';
import { ProjectDetailPage } from './pages/ProjectDetailPage.tsx';
import { PropertiesPage } from './pages/PropertiesPage.tsx';
import { PropertyDetailPage } from './pages/PropertyDetailPage.tsx';
import { InvestmentPage } from './pages/InvestmentPage.tsx';
import { LandownersPage } from './pages/LandownersPage.tsx';
import { CareersPage } from './pages/CareersPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { PrivacyPage, TermsPage, NotFoundPage } from './pages/LegalAndNotFoundPages.tsx';

// Admin imports
import { AdminLayout } from './components/admin/AdminLayout.tsx';
import { AdminLoginPage } from './pages/admin/AdminLoginPage.tsx';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage.tsx';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage.tsx';
import { AdminPropertiesPage } from './pages/admin/AdminPropertiesPage.tsx';
import { AdminInquiriesPage } from './pages/admin/AdminInquiriesPage.tsx';
import { AdminCMSPage } from './pages/admin/AdminCMSPage.tsx';
import { AdminMediaPage } from './pages/admin/AdminMediaPage.tsx';
import { AdminDocumentsPage } from './pages/admin/AdminDocumentsPage.tsx';
import { AdminBrandingPage } from './pages/admin/AdminBrandingPage.tsx';
import { AdminUsersPage } from './pages/admin/AdminUsersPage.tsx';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage.tsx';

function AppContent() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [adminTab, setAdminTab] = useState('dashboard');
  const { user, loading } = useAuth();

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07172F] flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-10 h-10 border-3 border-[#C49A32] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-widest text-[#D8B65B] font-serif">
          HOPELAND ESTATES AND REALTY CORPORATION
        </span>
      </div>
    );
  }

  // Admin Routes Handler
  if (currentPath.startsWith('/admin')) {
    if (currentPath === '/admin/login') {
      if (user) {
        navigate('/admin');
        return null;
      }
      return <AdminLoginPage onSuccess={() => navigate('/admin')} onNavigatePublic={navigate} />;
    }

    if (!user) {
      return <AdminLoginPage onSuccess={() => navigate('/admin')} onNavigatePublic={navigate} />;
    }

    return (
      <AdminLayout
        currentTab={adminTab}
        onSelectTab={setAdminTab}
        onNavigatePublic={navigate}
      >
        {adminTab === 'dashboard' && <AdminDashboardPage onSelectTab={setAdminTab} />}
        {adminTab === 'projects' && <AdminProjectsPage />}
        {adminTab === 'properties' && <AdminPropertiesPage />}
        {adminTab === 'inquiries' && <AdminInquiriesPage />}
        {adminTab === 'cms' && <AdminCMSPage />}
        {adminTab === 'media' && <AdminMediaPage />}
        {adminTab === 'branding' && <AdminBrandingPage />}
        {adminTab === 'documents' && <AdminDocumentsPage />}
        {adminTab === 'users' && <AdminUsersPage />}
        {adminTab === 'logs' && <AdminAuditLogsPage />}
      </AdminLayout>
    );
  }

  // Public Routes Routing
  let content = null;

  if (currentPath === '/') {
    content = <HomePage onNavigate={navigate} />;
  } else if (currentPath === '/about') {
    content = <AboutPage onNavigate={navigate} />;
  } else if (currentPath === '/services') {
    content = <ServicesPage onNavigate={navigate} />;
  } else if (currentPath === '/projects') {
    content = <ProjectsPage onNavigate={navigate} />;
  } else if (currentPath.startsWith('/projects/')) {
    const slug = currentPath.replace('/projects/', '');
    content = <ProjectDetailPage slug={slug} onNavigate={navigate} />;
  } else if (currentPath === '/properties') {
    content = <PropertiesPage onNavigate={navigate} />;
  } else if (currentPath.startsWith('/properties/')) {
    const slug = currentPath.replace('/properties/', '');
    content = <PropertyDetailPage slug={slug} onNavigate={navigate} />;
  } else if (currentPath === '/investment') {
    content = <InvestmentPage onNavigate={navigate} />;
  } else if (currentPath === '/landowners') {
    content = <LandownersPage onNavigate={navigate} />;
  } else if (currentPath === '/careers') {
    content = <CareersPage onNavigate={navigate} />;
  } else if (currentPath === '/contact') {
    content = <ContactPage onNavigate={navigate} />;
  } else if (currentPath === '/privacy') {
    content = <PrivacyPage onNavigate={navigate} />;
  } else if (currentPath === '/terms') {
    content = <TermsPage onNavigate={navigate} />;
  } else {
    content = <NotFoundPage onNavigate={navigate} />;
  }

  return (
    <PublicLayout currentPath={currentPath} onNavigate={navigate}>
      {content}
    </PublicLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
