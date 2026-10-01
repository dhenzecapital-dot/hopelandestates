import React from 'react';
import { HopelandLogo } from '../components/HopelandLogo.tsx';
import { ShieldCheck, Target, Eye, Gem, Award, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#F7F8FA]">
      {/* Header Banner */}
      <section className="bg-[#0B2345] text-white py-16 lg:py-20 border-b border-[#163A63] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-widest text-[#D8B65B] uppercase block mb-2">
              Corporate Overview & Identity
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
              About HopeLand Estates and Realty Corporation
            </h1>
            <p className="text-base text-slate-300 leading-relaxed font-light">
              Building Strong Foundations for Better Tomorrows through institutional land stewardship, disciplined engineering, and ethical real estate partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Main Corporate Overview */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-8 bg-white p-8 sm:p-10 rounded-lg border border-slate-200 shadow-sm">
            <div>
              <span className="text-xs font-semibold text-[#C49A32] uppercase tracking-wider block mb-1">
                Company Background
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#0B2345] mb-4">
                Pioneering Resilient Real Estate in Philippine Growth Corridors
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                HopeLand Estates and Realty Corporation was established to answer the urgent demand for institutional-grade property development outside the congested Metro Manila capital. Rooted in Central and Southern Luzon—specifically the high-yield economic corridors of Pampanga and Batangas—HopeLand transforms contiguous, raw land holdings into sustainable, multi-use communities.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our operations span the entire development value chain: from land acquisition and legal title due diligence, to civil engineering, architectural masterplanning, construction management, and institutional joint venture structuring.
              </p>
            </div>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
              <div className="p-6 bg-[#F7F8FA] rounded border-l-4 border-[#0B2345]">
                <div className="flex items-center gap-2 mb-2 text-[#0B2345]">
                  <Eye className="w-5 h-5 text-[#C49A32]" />
                  <h3 className="font-serif font-bold text-base">Corporate Vision</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To be a premier, highly trusted Philippine property development corporation recognized for transforming strategic land assets into resilient, sustainable, and thriving communities that stand as benchmarks of quality and long-term value.
                </p>
              </div>

              <div className="p-6 bg-[#F7F8FA] rounded border-l-4 border-[#C49A32]">
                <div className="flex items-center gap-2 mb-2 text-[#0B2345]">
                  <Target className="w-5 h-5 text-[#C49A32]" />
                  <h3 className="font-serif font-bold text-base">Corporate Mission</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To create enduring socioeconomic value for landowners, investors, and homeowners by executing disciplined land development, upholding strict engineering standards, honoring contracts, and fostering sustainable environmental stewardship.
                </p>
              </div>
            </div>

            {/* Corporate Objectives */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-lg font-serif font-bold text-[#0B2345] mb-4">
                Corporate Objectives
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A32] shrink-0 mt-0.5" />
                  <span>Deliver masterplanned residential subdivisions that elevate quality of life.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A32]" />
                  <span>Foster equitable joint ventures with Philippine landholders.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A32]" />
                  <span>Integrate sustainable agro-industrial and renewable solar initiatives.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A32]" />
                  <span>Provide transparent, investor-grade reporting and governance.</span>
                </div>
              </div>
            </div>

            {/* Corporate Commitment */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <h3 className="text-lg font-serif font-bold text-[#0B2345]">
                Corporate Commitment to Integrity & Transparency
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                In an industry where speculative claims are common, HopeLand distinguishes itself through absolute transparency. All preliminary development concepts undergo formal engineering vetting, environmental impact assessments, and rigorous title verification before commercialization. We do not invent milestones; we let our audited progress speak for itself.
              </p>
            </div>
          </div>

          {/* Right Column: Brand Identity & Symbolism */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0B2345] text-white p-8 rounded-lg shadow-md border border-[#163A63] text-center">
              <HopelandLogo variant="full" showBadgeBackground height={110} className="mx-auto mb-4" />
              <h3 className="font-serif font-bold text-lg text-white mb-1">
                Official Brand Identity
              </h3>
              <p className="text-xs text-[#D8B65B] uppercase tracking-wider font-semibold mb-4">
                "Building Strong Foundations for Better Tomorrows."
              </p>
              <div className="text-xs text-slate-300 text-left space-y-3 pt-4 border-t border-slate-700">
                <p>
                  <strong>The Monogram 'H':</strong> Represents two soaring architectural pillars rooted in deep Navy Blue, symbolizing structural stability, institutional trust, and corporate longevity.
                </p>
                <p>
                  <strong>The Golden Chevron Roof:</strong> Signifies family, shelter, and residential community sanctuary, illuminated in Corporate Gold to represent enduring multi-generational prosperity.
                </p>
                <p>
                  <strong>The Horizon Arc:</strong> Embodies our expansive land vision—bridging fertile Philippine topography with tomorrow's sustainable masterplanned communities.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-serif font-bold text-sm text-[#0B2345] uppercase tracking-wider">
                Corporate Inquiries
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect directly with our executive office for institutional partnerships, board communications, and joint venture evaluations.
              </p>
              <button
                onClick={() => onNavigate('/contact')}
                className="w-full py-2.5 bg-[#C49A32] hover:bg-[#D8B65B] text-[#0B2345] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Contact Corporate Office</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
