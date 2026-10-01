import React, { useState } from 'react';
import { InvestorType } from '../types/index.ts';
import { api } from '../services/api.ts';
import { getAssetUrl } from '../utils/assets.ts';
import {
  Shield,
  Building,
  Handshake,
  CheckCircle2,
  AlertCircle,
  Send,
  Lock
} from 'lucide-react';

interface InvestmentPageProps {
  onNavigate: (path: string) => void;
}

export const InvestmentPage: React.FC<InvestmentPageProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Philippines');
  const [investorType, setInvestorType] = useState<InvestorType>('Individual Investor');
  const [investmentInterest, setInvestmentInterest] = useState('Residential Masterplanned Developments');
  const [preferredProject, setPreferredProject] = useState('Bikal Residential (Pampanga)');
  const [indicativeRange, setIndicativeRange] = useState('PHP 20M - PHP 50M');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !indicativeRange) {
      setErrorMsg('Please complete all mandatory fields.');
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await api.submitInvestmentInquiry({
        fullName,
        companyName,
        email,
        phone,
        country,
        investorType,
        investmentInterest,
        preferredProject,
        indicativeRange,
        message
      });

      setSubmittedReference(res.referenceNo);
      setFullName('');
      setCompanyName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit investment inquiry. Please check your inputs.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#F7F8FA] text-[#17263A]">
      {/* Architectural Header Banner */}
      <section className="relative min-h-[340px] sm:min-h-[380px] flex items-center bg-[#071A33] text-white border-b border-[#163A63] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={getAssetUrl('images/investment/institutional-capital-commercial-corridor.jpg')}
            alt="Institutional Capital and Commercial Corridor Development in Clark"
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
                Institutional Capital & Strategic Development Partnerships
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight text-balance">
              Investment & Joint Venture Partnerships
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              Collaborate with HopeLand Estates and Realty Corporation on masterplanned commercial corridors, residential subdivisions, and strategic land developments across prime Philippine growth regions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Editorial & Inquiry Layout */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Visual Architecture & Investment Governance */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-semibold text-[#C49A32] uppercase tracking-[0.18em] block">
                Capital Underwriting & Governance
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2345] leading-snug text-balance">
                Disciplined Development Rooted in Tangible Land Value
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                HopeLand structures project-specific partnerships along high-growth infrastructure corridors—including the Clark Freeport Zone, Mabalacat, Taysan, and Rodriguez—where regional accessibility and long-term demand support sustainable development.
              </p>
            </div>

            {/* Visual Showcase Pair */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-[5px] border border-slate-200 overflow-hidden">
                <div className="aspect-[16/10] bg-[#071A33] overflow-hidden">
                  <img
                    src={getAssetUrl('images/investment/institutional-capital-commercial-corridor.jpg')}
                    alt="Masterplanned Commercial Corridors"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="text-xs font-serif font-bold text-[#0B2345] uppercase tracking-wider">
                    Commercial Corridors
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Grade-A office floors, corporate plazas, and institutional healthcare campuses.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-[5px] border border-slate-200 overflow-hidden">
                <div className="aspect-[16/10] bg-[#071A33] overflow-hidden">
                  <img
                    src={getAssetUrl('images/investment/development-planning-and-underwriting.jpg')}
                    alt="Development Planning and Masterplan Analysis"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="text-xs font-serif font-bold text-[#0B2345] uppercase tracking-wider">
                    Masterplan Underwriting
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Phased horizontal subdivisions and agro-industrial estates with clear title audits.
                  </p>
                </div>
              </div>
            </div>

            {/* Governance Pillars */}
            <div className="space-y-3">
              <div className="p-4 bg-white rounded-[5px] border border-slate-200 flex items-start gap-3.5">
                <Shield className="w-5 h-5 text-[#C49A32] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs text-[#0B2345] uppercase tracking-wider">
                    Due Diligence & Title Verification
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Every land asset and co-development proposal undergoes legal title verification, geodetic boundary confirmation, and engineering feasibility review prior to commitment.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-[5px] border border-slate-200 flex items-start gap-3.5">
                <Building className="w-5 h-5 text-[#C49A32] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs text-[#0B2345] uppercase tracking-wider">
                    Structured Joint Venture SPVs
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    We structure transparent project vehicles pairing land or capital partners with HopeLand's engineering, masterplanning, and project management execution.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-[5px] border border-slate-200 flex items-start gap-3.5">
                <Handshake className="w-5 h-5 text-[#C49A32] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs text-[#0B2345] uppercase tracking-wider">
                    Institutional Governance & Reporting
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Partners receive structured milestone documentation, transparent accounting, and direct executive oversight throughout project execution.
                  </p>
                </div>
              </div>
            </div>

            {/* Regulatory Notice */}
            <div className="p-4 bg-white rounded-[5px] border-l-4 border-[#0B2345] border-y border-r border-slate-200 text-[11px] text-slate-600 leading-relaxed flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-[#C49A32] shrink-0 mt-0.5" />
              <p>
                <strong className="text-[#0B2345]">Corporate Disclosure:</strong> HopeLand Estates and Realty Corporation (SEC Reg. No. 2026090269825-01) does not solicit public deposits or advertise guaranteed returns. All joint venture and capital partnerships are conducted through formal private agreements subject to due diligence.
              </p>
            </div>
          </div>

          {/* Right Column: Official Dedicated Investor Inquiry Form */}
          <div className="lg:col-span-6">
            <div className="bg-white p-8 sm:p-10 rounded-[6px] border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div>
                  <span className="text-[11px] font-semibold text-[#C49A32] uppercase tracking-wider block">
                    Institutional Inquiries
                  </span>
                  <h3 className="font-serif font-bold text-xl text-[#0B2345]">
                    Investment & Partner Registry
                  </h3>
                </div>
                <Lock className="w-5 h-5 text-slate-400" />
              </div>

              {submittedReference ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-[5px] text-emerald-900 space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <h4 className="font-serif font-bold text-lg">Inquiry Confirmed</h4>
                  </div>
                  <p className="text-xs leading-relaxed">
                    Thank you. Your investment inquiry has been recorded in our corporate registry under strict confidentiality.
                  </p>
                  <div className="p-4 bg-white rounded border border-emerald-200 text-center font-mono">
                    <span className="text-[10px] text-slate-500 block uppercase">Official Reference Number</span>
                    <span className="text-lg font-bold text-[#0B2345]">{submittedReference}</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    A corporate director will contact you to coordinate formal introductions and project documentation.
                  </p>
                  <button
                    onClick={() => setSubmittedReference(null)}
                    className="w-full py-2.5 bg-[#0B2345] text-white text-xs font-semibold rounded-[4px] uppercase tracking-wider"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {errorMsg && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Roberto Pablo"
                        className="w-full px-3 py-2 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Company / Entity Name
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Pacific Equity Partners"
                        className="w-full px-3 py-2 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. partner@example.com"
                        className="w-full px-3 py-2 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +63 917 123 4567"
                        className="w-full px-3 py-2 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Country of Origin / Domicile *
                      </label>
                      <input
                        type="text"
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="e.g. Philippines / Singapore / USA"
                        className="w-full px-3 py-2 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Investor Category *
                      </label>
                      <select
                        value={investorType}
                        onChange={(e) => setInvestorType(e.target.value as InvestorType)}
                        className="w-full px-3 py-2 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
                      >
                        <option value="Individual Investor">Individual Investor</option>
                        <option value="Corporate Investor">Corporate Investor</option>
                        <option value="Institutional Investor">Institutional Investor</option>
                        <option value="Landowner">Landowner</option>
                        <option value="Strategic Development Partner">Strategic Development Partner</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Investment Interest *
                      </label>
                      <select
                        value={investmentInterest}
                        onChange={(e) => setInvestmentInterest(e.target.value)}
                        className="w-full px-3 py-2 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
                      >
                        <option value="Residential Masterplanned Developments">Residential Developments</option>
                        <option value="Commercial & Office Park Assets">Commercial & Office Parks</option>
                        <option value="Agro-Industrial & Clean Energy Estates">Agro-Industrial & Solar Estates</option>
                        <option value="Hospitality & Mountain Eco-Resorts">Hospitality & Resorts</option>
                        <option value="Healthcare & Institutional Medical Facilities">Healthcare & Assisted Living</option>
                        <option value="General Corporate Co-Development">General Corporate Co-Development</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Preferred Development
                      </label>
                      <select
                        value={preferredProject}
                        onChange={(e) => setPreferredProject(e.target.value)}
                        className="w-full px-3 py-2 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
                      >
                        <option value="Bikal Residential (Pampanga)">Bikal Residential (Pampanga)</option>
                        <option value="Taysan Integrated Masterplanned Development (Batangas)">Taysan Agro Estate (Batangas)</option>
                        <option value="Clark Zion Prestige Park (Clark, Pampanga)">Clark Zion Prestige Park (Clark)</option>
                        <option value="Dhenze SpaceNest Mountain Resort (Rizal)">SpaceNest Mountain Resort (Rizal)</option>
                        <option value="Integrated Elderly Care Facility (Clark)">Integrated Elderly Care (Clark)</option>
                        <option value="Portfolio / Open Allocation">Portfolio / Open Allocation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Indicative Capital Range *
                    </label>
                    <select
                      value={indicativeRange}
                      onChange={(e) => setIndicativeRange(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
                    >
                      <option value="PHP 10M - PHP 20M">PHP 10M – PHP 20M</option>
                      <option value="PHP 20M - PHP 50M">PHP 20M – PHP 50M</option>
                      <option value="PHP 50M - PHP 100M">PHP 50M – PHP 100M</option>
                      <option value="PHP 100M - PHP 300M">PHP 100M – PHP 300M</option>
                      <option value="PHP 300M - PHP 500M">PHP 300M – PHP 500M</option>
                      <option value="PHP 500M+ / Institutional Mandate">PHP 500M+ / Institutional Mandate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Executive Notes / Partnership Objectives
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Outline your investment timeline, preferred co-development structure, or request for confidential project brief..."
                      className="w-full px-3 py-2 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-[#0B2345] hover:bg-[#163A63] text-white font-semibold rounded-[4px] uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{submitting ? 'Submitting Inquiry...' : 'Submit Confidential Investment Inquiry'}</span>
                    <Send className="w-3.5 h-3.5 text-[#D8B65B]" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
