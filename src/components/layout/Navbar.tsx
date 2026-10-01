import React, { useState } from 'react';
import { HopelandLogo } from '../HopelandLogo.tsx';
import { useAuth } from '../../context/AuthContext.tsx';
import { Menu, X, ArrowRight, ShieldCheck, Mail, MapPin } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Our Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'Properties', path: '/properties' },
    { label: 'Investment', path: '/investment' },
    { label: 'Landowners', path: '/landowners' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B2345] text-white shadow-md select-none transition-all">
      {/* 1. TOP INFORMATION BAR (Height target: 32–36px, clean, elegant, less visually dominant) */}
      <div className="bg-[#071A33] border-b border-white/[0.07] h-[34px] flex items-center text-[11px] text-slate-300 font-sans">
        <div className="w-full max-w-[1680px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12 flex items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-2 tracking-[0.08em] font-medium text-slate-300 uppercase text-[10.5px] truncate">
            <span>HOPELAND ESTATES AND REALTY CORPORATION</span>
          </div>

          {/* Center (Visible on Desktop) */}
          <div className="hidden lg:block text-slate-400 font-light italic tracking-wide text-[11px] truncate">
            Building Strong Foundations for Better Tomorrows.
          </div>

          {/* Right */}
          <div className="hidden sm:flex items-center gap-4 text-slate-300 text-[11px] shrink-0 font-normal">
            <span className="text-slate-400 hidden md:inline">Clark Freeport Zone & Regional Corridors</span>
            <span className="text-slate-600 hidden md:inline">·</span>
            <a
              href="mailto:corporate@hopelandestates.com"
              className="text-slate-300 hover:text-[#C49A32] transition-colors"
            >
              corporate@hopelandestates.com
            </a>
            {user && (
              <>
                <span className="text-slate-600">·</span>
                <button
                  onClick={() => handleNav('/admin')}
                  className="text-[#C49A32] hover:text-[#D8B65B] flex items-center gap-1 font-medium transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin ({user.role})</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <div className="w-full border-b border-white/[0.08]">
        <div className="w-full max-w-[1680px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12 h-[84px] flex items-center justify-between gap-4 lg:gap-8">
          {/* LEFT: Official HopeLand Logo (Width ~155px, within 145–165px range, original aspect ratio preserved) */}
          <button
            onClick={() => handleNav('/')}
            className="shrink-0 flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A32] rounded py-1 transition-opacity hover:opacity-95"
            aria-label="Hopeland Estates and Realty Corporation Home"
          >
            <HopelandLogo variant="header" inverted width={155} />
          </button>

          {/* CENTER: 9 Clean Nav Links (Displayed on desktop screens with ample breathing room, gap 20-28px) */}
          <nav
            className="hidden xl:flex items-center gap-5 2xl:gap-7 text-[13px] 2xl:text-[13.5px] font-medium tracking-normal text-slate-200"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive =
                currentPath === link.path ||
                (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`transition-colors py-2 relative whitespace-nowrap ${
                    isActive
                      ? 'text-[#D8B65B] font-semibold'
                      : 'text-slate-200 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C49A32] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* RIGHT: Primary Action Buttons (Never clipped, height 38–42px) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Primary Action: Gold-filled CTA */}
            <button
              onClick={() => handleNav('/investment')}
              className="h-[40px] px-5 bg-[#C49A32] hover:bg-[#D8B65B] text-[#0B2345] text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-xs whitespace-nowrap flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Secondary Action: Restrained Staff Access */}
            <button
              onClick={() => handleNav(user ? '/admin' : '/admin/login')}
              className="h-[40px] px-4 bg-transparent hover:bg-white/[0.08] text-slate-200 hover:text-white border border-slate-400/40 hover:border-slate-200 rounded text-xs font-medium tracking-wide transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A32]"
            >
              {user ? 'Admin Console' : 'Staff Access'}
            </button>
          </div>

          {/* Tablet / Mobile Menu Toggle (Visible below xl screens to prevent overcrowding and clipping) */}
          <div className="xl:hidden flex items-center gap-3">
            {/* Compact CTA for tablet */}
            <button
              onClick={() => handleNav('/investment')}
              className="hidden sm:flex md:hidden h-[36px] px-3.5 bg-[#C49A32] text-[#0B2345] text-[11px] font-semibold uppercase tracking-wider rounded items-center gap-1 whitespace-nowrap"
            >
              <span>Partner</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-200 hover:text-white rounded-md border border-slate-700/60 hover:bg-[#163A63] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A32] transition-colors"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-[#D8B65B]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. RESPONSIVE MOBILE & TABLET DRAWER */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#071A33] border-b border-[#163A63] px-6 py-6 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive =
                currentPath === link.path ||
                (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`w-full text-left px-3.5 py-3 rounded-md text-sm font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#163A63] text-[#D8B65B] font-semibold border-l-2 border-[#C49A32]'
                      : 'text-slate-200 hover:bg-[#0B2345] hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C49A32]" />}
                </button>
              );
            })}
          </div>

          {/* Drawer Action Buttons */}
          <div className="pt-4 border-t border-slate-800 space-y-2.5">
            <button
              onClick={() => handleNav('/investment')}
              className="w-full h-11 bg-[#C49A32] hover:bg-[#D8B65B] text-[#0B2345] font-semibold rounded text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleNav(user ? '/admin' : '/admin/login')}
              className="w-full h-10 bg-[#163A63] hover:bg-[#0B2345] text-slate-200 hover:text-white border border-slate-700 rounded text-xs font-medium tracking-wide flex items-center justify-center transition-colors"
            >
              {user ? 'Admin Console' : 'Staff Access'}
            </button>
          </div>

          {/* Quick info in mobile drawer */}
          <div className="pt-2 text-[11px] text-slate-400 space-y-1 text-center">
            <p>Clark Freeport Zone & Regional Corridors</p>
            <p>corporate@hopelandestates.com</p>
          </div>
        </div>
      )}
    </header>
  );
};
