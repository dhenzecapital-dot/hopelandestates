import React from 'react';
import { Navbar } from './Navbar.tsx';
import { Footer } from './Footer.tsx';

interface PublicLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ currentPath, onNavigate, children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA] text-[#17263A]">
      <Navbar currentPath={currentPath} onNavigate={onNavigate} />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
