import React from 'react';
import { HopelandLogo } from '../components/HopelandLogo.tsx';
import { getAssetUrl } from '../utils/assets.ts';
import { Target, Eye, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#F7F8FA] text-[#17263A]">
      {/* Architectural Header Banner */}
      <section className="relative min-h-[340px] sm:min-h-[380px] flex items-center bg-[#071A33] text-white border-b border-[#163A63] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={getAssetUrl('images/about/institutional-corporate-stewardship.jpg')}
            alt="Hopeland Estates Corporate Architecture and Institutional Stewardship"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#071A33]/95 via-[#0B2345]/85 to-[#0B2345]/40"
            aria-hidden="true"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10 w-full">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#C49A32]" />
              <span className="text-xs font-semibold tracking-[0.2em] text-[#D8B65B] uppercase">
                Corporate Identity, Legacy & Stewardship
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight text-balance">
              About HopeLand Estates and Realty Corporation
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              Building Strong Foundations for Better Tomorrows through institutional land stewardship, disciplined engineering, and long-term community development across the Philippines.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Editorial Split — Large Architectural Image Alongside Company Narrative */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Large Architectural Visual */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[16/11] w-full rounded-[5px] overflow-hidden bg-[#071A33] border border-slate-200">
                <img
                  src={getAssetUrl('images/about/institutional-corporate-stewardship.jpg')}
                  alt="Institutional Real Estate Development and Architectural Excellence"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-white">
                  <span className="font-semibold text-[#D8B65B] uppercase tracking-wider">
                    Architectural Stewardship
                  </span>
                  <span className="text-slate-300 font-mono">Philippine Growth Corridors</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[16/10] rounded-[5px] overflow-hidden bg-[#071A33] border border-slate-200 relative">
                  <img
                    src={getAssetUrl('images/services/architectural-masterplanning-model.jpg')}
                    alt="Architectural Masterplanning Scale Model"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-3 text-[11px] font-semibold text-white">
                    Masterplanned Precision
                  </span>
                </div>
                <div className="aspect-[16/10] rounded-[5px] overflow-hidden bg-[#071A33] border border-slate-200 relative">
                  <img
                    src={getAssetUrl('images/landowners/contiguous-philippine-landholding-survey.jpg')}
                    alt="Strategic Land Transformation in Luzon"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-3 text-[11px] font-semibold text-white">
                    Land Transformation
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Concise Editorial Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#C49A32] uppercase tracking-[0.18em] block mb-2">
                  Institutional Mandate
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2345] leading-snug text-balance">
                  Transforming Strategic Philippine Land Into Enduring Communities
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                HopeLand Estates and Realty Corporation is an institutional Philippine property developer focused on high-growth corridors in Central and Southern Luzon—including Pampanga, Batangas, and Rizal. We transform contiguous landholdings into masterplanned residential communities, commercial hubs, and sustainable agro-industrial estates.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Our capabilities span the full development lifecycle: land acquisition and legal due diligence, geodetic surveying, architectural masterplanning, civil engineering execution, and long-term property stewardship.
              </p>

              {/* Vision & Mission */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div className="p-5 bg-[#F7F8FA] rounded-[5px] border-l-4 border-[#0B2345] space-y-2">
                  <div className="flex items-center gap-2 text-[#0B2345]">
                    <Eye className="w-4 h-4 text-[#C49A32]" />
                    <h3 className="font-serif font-bold text-sm uppercase tracking-wider">Corporate Vision</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    To be a premier, trusted Philippine property development corporation recognized for transforming strategic land into resilient, sustainable, and thriving communities.
                  </p>
                </div>

                <div className="p-5 bg-[#F7F8FA] rounded-[5px] border-l-4 border-[#C49A32] space-y-2">
                  <div className="flex items-center gap-2 text-[#0B2345]">
                    <Target className="w-4 h-4 text-[#C49A32]" />
                    <h3 className="font-serif font-bold text-sm uppercase tracking-wider">Corporate Mission</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    To create enduring value for landowners, investors, and homeowners through disciplined engineering, transparent governance, and sustainable land stewardship.
                  </p>
                </div>
              </div>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A32] shrink-0" />
                  <span>Masterplanned Residential Enclaves</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A32] shrink-0" />
                  <span>Equitable Landowner Joint Ventures</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A32] shrink-0" />
                  <span>Sustainable Agro-Industrial Estates</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A32] shrink-0" />
                  <span>Audited Governance & Title Verification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Official Corporate Identity & SEC Registration Details */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Official SEC Corporate Registration Panel */}
          <div className="lg:col-span-8 bg-[#0B2345] text-white p-8 sm:p-10 rounded-[6px] border border-[#163A63] space-y-6">
            <div className="border-b border-white/10 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C49A32] block mb-1">
                  Corporate Identity & Legal Registration
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Official Corporate Information
                </h2>
              </div>
              <span className="text-xs font-mono text-[#D8B65B] bg-[#071A33] px-3.5 py-1.5 rounded-[3px] border border-white/10 self-start sm:self-auto">
                SEC Reg. No. 2026090269825-01
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 text-xs">
              <div className="space-y-1">
                <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#C49A32] block">
                  Company Name
                </span>
                <p className="font-serif font-bold text-white text-sm">
                  HOPELAND ESTATES AND REALTY CORPORATION
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#C49A32] block">
                  SEC Registration Number
                </span>
                <p className="font-mono font-bold text-white text-sm tracking-wide">
                  2026090269825-01
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#C49A32] block">
                  Corporate Registration Authority
                </span>
                <p className="text-slate-200 leading-relaxed">
                  Securities and Exchange Commission (SEC), Republic of the Philippines
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#C49A32] block">
                    Registration Status
                  </span>
                  <p className="text-white font-semibold">
                    Approved by SEC
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#C49A32] block">
                    Country of Registration
                  </span>
                  <p className="text-white font-semibold">
                    Philippines
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-white/10 space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed">
                Hopeland Estates and Realty Corporation is a Philippine-registered corporation with corporate registration information issued by the Securities and Exchange Commission (SEC) of the Republic of the Philippines.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                All preliminary development concepts undergo formal engineering evaluation, environmental assessment, and title verification prior to public offering.
              </p>
            </div>
          </div>

          {/* Right Column: Official Brand Identity & Corporate Office Link */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[6px] border border-slate-200 space-y-4">
              <HopelandLogo variant="full" height={64} className="mb-2" />
              <h3 className="font-serif font-bold text-lg text-[#0B2345]">
                Official Brand Identity
              </h3>
              <p className="text-xs text-[#C49A32] uppercase tracking-wider font-semibold">
                "Building Strong Foundations for Better Tomorrows."
              </p>
              <div className="text-xs text-slate-600 space-y-2.5 pt-3 border-t border-slate-100 leading-relaxed">
                <p>
                  <strong className="text-[#0B2345]">Architectural Pillars:</strong> Symbolizing structural stability, institutional trust, and corporate longevity.
                </p>
                <p>
                  <strong className="text-[#0B2345]">Golden Chevron Roof:</strong> Representing family sanctuary and multi-generational residential value.
                </p>
                <p>
                  <strong className="text-[#0B2345]">Horizon Arc:</strong> Bridging fertile Philippine land with sustainable masterplanned communities.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('/contact')}
                  className="w-full py-2.5 bg-[#0B2345] hover:bg-[#163A63] text-white text-xs font-semibold uppercase tracking-wider rounded-[4px] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>Contact Corporate Office</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C49A32]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
