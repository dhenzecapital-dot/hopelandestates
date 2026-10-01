import React, { useState } from 'react';
import { api } from '../services/api.ts';
import { InvestorType } from '../types/index.ts';
import {
  TrendingUp,
  Shield,
  Building,
  Handshake,
  CheckCircle2,
  Lock,
  Send,
  AlertCircle
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
    <div className="w-full bg-[#F7F8FA]">
      {/* Header Banner */}
      <section className="bg-[#0B2345] text-white py-16 lg:py-20 border-b border-[#163A63]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-widest text-[#D8B65B] uppercase block mb-2">
              Capital & Corporate Alliances
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
              Investment & Joint Venture Partnerships
            </h1>
            <p className="text-base text-slate-300 leading-relaxed font-light">
              Collaborate with HopeLand Estates and Realty Corporation on institutional-grade real estate developments, high-yield land masterplans, and strategic co-development ventures across prime Philippine growth corridors.
            </p>
          </div>
        </div>
      </section>

      {/* Investment Philosophy */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold text-[#C49A32] uppercase tracking-wider block">
              Investment Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2345]">
              Disciplined Capital Allocation Rooted in Tangible Land Value
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              At HopeLand Estates, we approach real estate development as multi-generational wealth creation. We prioritize projects situated along national infrastructure arteries—expressway interchanges, special economic zones, and burgeoning provincial capitals—where population growth and commercial demand are verifiable.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 bg-white rounded border border-slate-200 shadow-xs flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#C49A32] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs text-[#0B2345] uppercase tracking-wider">
                    Risk-Mitigated Land Underwriting
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Every acquisition and joint venture undergoes title authenticity audits, environmental clearances, and rigorous soil/topographical testing before capital deployment.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded border border-slate-200 shadow-xs flex items-start gap-3">
                <Building className="w-5 h-5 text-[#C49A32] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs text-[#0B2345] uppercase tracking-wider">
                    Equitable Joint Venture SPVs
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    We structure transparent special-purpose vehicles that pair landowner equity with our institutional development management and marketing engine.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded border border-slate-200 shadow-xs flex items-start gap-3">
                <Handshake className="w-5 h-5 text-[#C49A32] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs text-[#0B2345] uppercase tracking-wider">
                    Institutional Governance & Reporting
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Partners receive audited quarterly accounting, project milestone documentation, and direct access to executive committee briefings.
                  </p>
                </div>
              </div>
            </div>

            {/* Regulatory Disclaimer (Mandatory) */}
            <div className="p-4 bg-slate-100 rounded border border-slate-200 text-[11px] text-slate-600 leading-relaxed flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <p>
                <strong>Regulatory Notice:</strong> HopeLand Estates and Realty Corporation does not solicit public deposits or advertise guaranteed financial returns. Real estate investments involve market and developmental risks. All institutional joint venture engagements are executed through negotiated private contracts.
              </p>
            </div>
          </div>

          {/* SECTION 6: Official Dedicated Investor Inquiry Form */}
          <div className="lg:col-span-6">
            <div className="bg-white p-8 sm:p-10 rounded-lg border border-slate-200 shadow-md">
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
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <h4 className="font-serif font-bold text-lg">Inquiry Confirmed</h4>
                  </div>
                  <p className="text-xs leading-relaxed">
                    Thank you. Your investment inquiry has been officially recorded in our corporate database under strict non-disclosure protocol.
                  </p>
                  <div className="p-4 bg-white rounded border border-emerald-200 text-center font-mono">
                    <span className="text-[10px] text-slate-500 block uppercase">Official Reference Number</span>
                    <span className="text-lg font-bold text-[#0B2345]">{submittedReference}</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    A corporate director will contact you via email or phone to initiate formal introductions.
                  </p>
                  <button
                    onClick={() => setSubmittedReference(null)}
                    className="w-full py-2 bg-[#0B2345] text-white text-xs font-semibold rounded uppercase"
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
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
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
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
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
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
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
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
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
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Investor Category *
                      </label>
                      <select
                        value={investorType}
                        onChange={(e) => setInvestorType(e.target.value as InvestorType)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
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
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
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
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
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
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
                    >
                      <option value="PHP 5M - PHP 20M">PHP 5,000,000 – PHP 20,000,000</option>
                      <option value="PHP 20M - PHP 50M">PHP 20,000,000 – PHP 50,000,000</option>
                      <option value="PHP 50M - PHP 100M">PHP 50,000,000 – PHP 100,000,000</option>
                      <option value="PHP 100M - PHP 500M">PHP 100,000,000 – PHP 500,000,000</option>
                      <option value="PHP 500M+ / Institutional Capital">PHP 500,000,000+ (Institutional)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Specific Investment Inquiries / Executive Message
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Outline your timeline, investment mandate, or joint venture prerequisites..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-[#0B2345] hover:bg-[#163A63] text-white font-semibold rounded uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{submitting ? 'Registering...' : 'Submit Confidential Inquiry'}</span>
                    <Send className="w-3.5 h-3.5 text-[#D8B65B]" />
                  </button>
                  <p className="text-[10.5px] text-slate-400 text-center">
                    Submissions are protected by strict institutional privacy standards.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
