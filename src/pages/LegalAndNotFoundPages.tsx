import React from 'react';

interface LegalPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#F7F8FA] pb-20">
      <div className="bg-[#0B2345] text-white py-14 border-b border-[#163A63]">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-semibold text-[#D8B65B] uppercase tracking-wider block mb-1">
            Institutional Compliance
          </span>
          <h1 className="text-3xl font-serif font-bold">Privacy Policy</h1>
          <p className="text-xs text-slate-300 mt-2">
            Hopeland Estates and Realty Corporation Data Privacy and Stewardship Framework
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-12">
        <div className="bg-white p-8 sm:p-10 rounded-lg border border-slate-200 shadow-xs space-y-6 text-xs text-slate-600 leading-relaxed">
          <h2 className="text-base font-serif font-bold text-[#0B2345]">
            1. Statement of Confidentiality & Compliance
          </h2>
          <p>
            Hopeland Estates and Realty Corporation ("Hopeland", "we", "our") is committed to protecting the privacy of landowners, individual and institutional investors, home buyers, and corporate partners in compliance with Republic Act No. 10173, also known as the Philippine Data Privacy Act of 2012 (DPA).
          </p>

          <h2 className="text-base font-serif font-bold text-[#0B2345]">
            2. Collection of Personal & Landholding Data
          </h2>
          <p>
            We collect personal information that you voluntarily submit through our online portals, including full name, corporate title, email address, mobile number, landholding specifications, lot title information, and indicative capital allocation preferences.
          </p>

          <h2 className="text-base font-serif font-bold text-[#0B2345]">
            3. Purpose of Processing
          </h2>
          <p>
            Personal and proprietary data is utilized strictly for evaluating real estate co-development opportunities, title due diligence, regulatory compliance with the Department of Human Settlements and Urban Development (DHSUD), AMLA verification, and direct corporate correspondence.
          </p>

          <h2 className="text-base font-serif font-bold text-[#0B2345]">
            4. Non-Disclosure & Security Safeguards
          </h2>
          <p>
            HopeLand does not sell, rent, or publicly disclose landowner or investor dossiers. All electronic submissions are transmitted using encrypted SSL/TLS protocols and stored within secured access-controlled databases.
          </p>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-slate-400">Effective as of Corporate Charter 2026</span>
            <button
              onClick={() => onNavigate('/contact')}
              className="text-[#0B2345] hover:text-[#C49A32] font-semibold"
            >
              Contact Data Protection Officer →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TermsPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#F7F8FA] pb-20">
      <div className="bg-[#0B2345] text-white py-14 border-b border-[#163A63]">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-semibold text-[#D8B65B] uppercase tracking-wider block mb-1">
            Corporate Terms
          </span>
          <h1 className="text-3xl font-serif font-bold">Terms & Conditions</h1>
          <p className="text-xs text-slate-300 mt-2">
            Governing Use of the Hopeland Corporate Web & Management Platform
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-12">
        <div className="bg-white p-8 sm:p-10 rounded-lg border border-slate-200 shadow-xs space-y-6 text-xs text-slate-600 leading-relaxed">
          <h2 className="text-base font-serif font-bold text-[#0B2345]">
            1. Corporate Representation & Scope
          </h2>
          <p>
            This portal is the official digital presence and administrative system of Hopeland Estates and Realty Corporation. By accessing this platform, you agree to comply with standard corporate laws of the Republic of the Philippines.
          </p>

          <h2 className="text-base font-serif font-bold text-[#0B2345]">
            2. Preliminary Development Disclaimer
          </h2>
          <p>
            All conceptual masterplans, indicative land areas, previously discussed budget allocations, and architectural renderings shown on this website represent preliminary development concepts. These do not constitute unconditional public sales offers until formal DHSUD License to Sell and governmental permits are finalized.
          </p>

          <h2 className="text-base font-serif font-bold text-[#0B2345]">
            3. Intellectual Property
          </h2>
          <p>
            The Hopeland name, official trademark insignia, monogram 'H' architectural logo, masterplans, and website design are proprietary assets of Hopeland Estates and Realty Corporation. Unauthorized reproduction is strictly prohibited.
          </p>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-slate-400">Published under Corporate Governance 2026</span>
            <button
              onClick={() => onNavigate('/')}
              className="text-[#0B2345] hover:text-[#C49A32] font-semibold"
            >
              Return to Home Portal →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NotFoundPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[#F7F8FA] px-4 py-20 text-center">
      <div className="max-w-md space-y-4">
        <span className="text-4xl font-serif font-bold text-[#0B2345] block">404</span>
        <h2 className="text-xl font-serif font-bold text-[#0B2345]">Page Not Found</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          The requested corporate portal page or resource does not exist or has been relocated to an alternate directory.
        </p>
        <button
          onClick={() => onNavigate('/')}
          className="px-6 py-2.5 bg-[#0B2345] hover:bg-[#163A63] text-white text-xs font-semibold rounded uppercase tracking-wider transition-colors"
        >
          Return to Corporate Home
        </button>
      </div>
    </div>
  );
};
