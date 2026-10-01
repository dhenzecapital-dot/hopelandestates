import React from 'react';
import { HopelandLogo } from '../HopelandLogo.tsx';
import { MapPin, Mail, Phone, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07172F] text-slate-300 border-t border-[#163A63] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Corporate Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="cursor-pointer inline-block" onClick={() => handleNav('/')}>
              <HopelandLogo variant="footer" width={165} height={54} />
            </div>
            <p className="text-xs tracking-wider uppercase font-semibold text-[#D8B65B]">
              Building Strong Foundations for Better Tomorrows.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Hopeland Estates and Realty Corporation is a Philippine-registered corporation with corporate registration information issued by the Securities and Exchange Commission (SEC) of the Republic of the Philippines.
            </p>
            <div className="pt-1 text-xs text-slate-300 space-y-1 border-l-2 border-[#C49A32] pl-3">
              <p className="font-serif font-bold text-white text-[11.5px] tracking-wide">
                HOPELAND ESTATES AND REALTY CORPORATION
              </p>
              <p className="text-[11px] text-slate-300">
                <span className="text-[#C49A32] font-semibold">SEC Registration No.:</span>{' '}
                <span className="font-mono text-white font-semibold">2026090269825-01</span> · Approved by SEC
              </p>
              <p className="text-[11px] text-slate-400">
                Securities and Exchange Commission (SEC), Republic of the Philippines
              </p>
            </div>
            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C49A32] shrink-0 mt-0.5" />
                <span>Executive Tower, Clark Freeport Zone / Mabalacat, Pampanga, Philippines</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C49A32] shrink-0" />
                <span>corporate@hopelandestates.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C49A32] shrink-0" />
                <span>+63 (045) 892-4100 / +63 917 800 4673</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C49A32] shrink-0" />
                <span>Monday – Friday: 8:30 AM – 5:30 PM PHT</span>
              </div>
            </div>
          </div>

          {/* Col 2: Business & Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider font-serif">
              Corporate Divisions
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('/services')} className="hover:text-[#D8B65B] transition-colors text-left">
                  Residential Development
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/services')} className="hover:text-[#D8B65B] transition-colors text-left">
                  Commercial & Office Parks
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/services')} className="hover:text-[#D8B65B] transition-colors text-left">
                  Construction & Engineering
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/services')} className="hover:text-[#D8B65B] transition-colors text-left">
                  Agro-Industrial Masterplans
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/services')} className="hover:text-[#D8B65B] transition-colors text-left">
                  Property Sales & Marketing
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/services')} className="hover:text-[#D8B65B] transition-colors text-left">
                  Hospitality & Resort Planning
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Portfolios */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider font-serif">
              Development Concepts
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('/projects/bical-residential-development')} className="hover:text-[#D8B65B] transition-colors text-left">
                  Bical Residential (Pampanga)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/projects/taysan-integrated-masterplanned-development')} className="hover:text-[#D8B65B] transition-colors text-left">
                  Taysan Agro Estate (Batangas)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/projects/clark-zion-prestige-park')} className="hover:text-[#D8B65B] transition-colors text-left">
                  Clark Zion Prestige Park (Clark)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/projects/dhenze-spacenest-mountain-resort')} className="hover:text-[#D8B65B] transition-colors text-left">
                  SpaceNest Resort (Rizal)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/projects/integrated-elderly-care-facility')} className="hover:text-[#D8B65B] transition-colors text-left">
                  Integrated Elderly Care (Clark)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/properties')} className="hover:text-[#D8B65B] transition-colors text-left text-[#C49A32]">
                  Available Property Inventory →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate Governance & Access */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider font-serif">
              Corporate & Capital
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('/about')} className="hover:text-[#D8B65B] transition-colors text-left">
                  About HopeLand
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/investment')} className="hover:text-[#D8B65B] transition-colors text-left flex items-center gap-1">
                  <span>Investment Partnerships</span>
                  <ArrowUpRight className="w-3 h-3 text-[#C49A32]" />
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/landowners')} className="hover:text-[#D8B65B] transition-colors text-left">
                  Landowner Joint Ventures
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/careers')} className="hover:text-[#D8B65B] transition-colors text-left">
                  Careers & Talent
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/contact')} className="hover:text-[#D8B65B] transition-colors text-left">
                  Contact Corporate Office
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => handleNav('/admin/login')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#163A63] text-slate-200 hover:text-white hover:bg-[#0B2345] border border-slate-700 transition-colors text-[11px]"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C49A32]" />
                  <span>Administrative Control Center</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Corporate Registration & Legal Information */}
        <div className="py-6 border-b border-slate-800/60 space-y-4">
          <div className="bg-[#0B2345] border border-[#163A63] rounded-[4px] p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#C49A32] block">
                Corporate Registration and Legal Information
              </span>
              <p className="text-slate-200 leading-relaxed">
                Hopeland Estates and Realty Corporation is a Philippine-registered corporation with corporate registration information issued by the Securities and Exchange Commission (SEC) of the Republic of the Philippines.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 shrink-0 text-[11px] border-t lg:border-t-0 pt-3 lg:pt-0 border-white/10">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">SEC Registration No.</span>
                <span className="font-mono font-bold text-white">2026090269825-01</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Registration Status</span>
                <span className="font-semibold text-[#D8B65B]">Approved by SEC</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Jurisdiction</span>
                <span className="font-semibold text-white">Philippines</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            <strong className="text-slate-400">Corporate Development Disclosure:</strong> Project specifications, land areas, budgets, architectural renderings, and timeline references displayed on this portal include preliminary concepts and development opportunities currently undergoing feasibility validation, environmental permitting, and governmental regulatory approvals. HopeLand Estates and Realty Corporation conducts business under applicable Philippine regulatory frameworks.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} Hopeland Estates and Realty Corporation (SEC Reg. No. 2026090269825-01). All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('/privacy')} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => handleNav('/terms')} className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </button>
            <button onClick={() => handleNav('/contact')} className="hover:text-slate-300 transition-colors">
              Regulatory Inquiries
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
