import React, { useState } from 'react';
import { api } from '../services/api.ts';
import { getAssetUrl } from '../utils/assets.ts';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [inquiryType, setInquiryType] = useState('GENERAL');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [referenceNo, setReferenceNo] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await api.submitGeneralInquiry({
        fullName,
        email,
        phone,
        company,
        type: inquiryType as any,
        subject: subject || `${inquiryType} Corporate Inquiry`,
        message
      });

      setReferenceNo(res.referenceNo);
      setFullName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#F7F8FA] text-[#17263A] pb-20">
      {/* Architectural Header Banner */}
      <section className="relative min-h-[340px] sm:min-h-[380px] flex items-center bg-[#071A33] text-white border-b border-[#163A63] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={getAssetUrl('images/contact/clark-executive-headquarters-courtyard.jpg')}
            alt="HopeLand Estates Executive Headquarters at Clark Freeport Zone"
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
                Corporate Communications & Executive Office
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight text-balance">
              Contact HopeLand Estates
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              Connect directly with our corporate administration, investor relations, or land acquisition divisions at our Clark Freeport Zone executive headquarters.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Headquarters Visual, Corporate Office Details, SEC Registration & Location Map */}
          <div className="lg:col-span-5 space-y-7">
            {/* Executive Office Architectural Card */}
            <div className="bg-white rounded-[5px] border border-slate-200 overflow-hidden">
              <div className="relative aspect-[16/9] w-full bg-[#071A33]">
                <img
                  src={getAssetUrl('images/contact/clark-executive-headquarters-courtyard.jpg')}
                  alt="HopeLand Estates Executive Office Arrival Courtyard"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/85 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="font-semibold text-[#D8B65B] uppercase tracking-wider">
                    Executive Headquarters
                  </span>
                  <span className="text-slate-300 font-mono text-[11px]">Clark Freeport Zone</span>
                </div>
              </div>

              <div className="p-7 space-y-5">
                <h2 className="text-lg font-serif font-bold text-[#0B2345] border-b border-slate-100 pb-3">
                  Corporate Office Directory
                </h2>

                <div className="space-y-4 text-xs text-slate-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#C49A32] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-semibold mb-0.5">Headquarters</strong>
                      <p className="text-slate-600 leading-relaxed">
                        Executive Tower, Clark Freeport Zone / Mabalacat, Pampanga, 2010 Philippines
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#C49A32] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-semibold mb-0.5">Official Inquiries</strong>
                      <p className="text-slate-600">corporate@hopelandestates.com</p>
                      <p className="text-slate-500 text-[11px]">investor.relations@hopelandestates.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#C49A32] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-semibold mb-0.5">Telephone & Direct Line</strong>
                      <p className="text-slate-600 font-mono">+63 (045) 892-4100</p>
                      <p className="text-slate-600 font-mono">+63 917 800 4673</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#C49A32] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-semibold mb-0.5">Business Hours</strong>
                      <p className="text-slate-600">Monday – Friday: 8:30 AM – 5:30 PM PHT</p>
                      <p className="text-slate-500 text-[11px]">Closed on Philippine National Holidays</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Corporate Registration & Legal Identity */}
            <div className="bg-[#0B2345] text-white p-7 rounded-[5px] border border-[#163A63] space-y-4">
              <div className="border-b border-white/10 pb-3">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#C49A32] block mb-0.5">
                  Corporate Information
                </span>
                <h2 className="text-base font-serif font-bold text-white">
                  HOPELAND ESTATES AND REALTY CORPORATION
                </h2>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#C49A32] font-semibold block">
                      SEC Registration Number
                    </span>
                    <span className="font-mono font-bold text-white text-sm">
                      2026090269825-01
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#C49A32] font-semibold block">
                      Registration Status
                    </span>
                    <span className="font-semibold text-white">
                      Approved by SEC
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#C49A32] font-semibold block">
                    Corporate Registration Authority
                  </span>
                  <span className="text-slate-200">
                    Securities and Exchange Commission (SEC), Republic of the Philippines
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#C49A32] font-semibold block">
                    Country of Registration
                  </span>
                  <span className="text-white font-medium">Philippines</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 text-[11px] text-slate-300 leading-relaxed">
                Hopeland Estates and Realty Corporation is a Philippine-registered corporation with corporate registration information issued by the Securities and Exchange Commission (SEC) of the Republic of the Philippines.
              </div>
            </div>

            {/* Location Coordinates Card */}
            <div className="bg-white p-6 rounded-[5px] border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-[#0B2345]">Executive Location Map</span>
                <span className="text-[11px] text-[#C49A32] font-semibold uppercase">Clark Freeport Zone</span>
              </div>

              <div className="relative aspect-[16/9] w-full rounded-[4px] bg-[#071A33] overflow-hidden flex items-center justify-center border border-slate-200">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C49A32_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative z-10 text-center space-y-2 p-4">
                  <div className="w-10 h-10 rounded-full bg-[#C49A32] text-[#0B2345] flex items-center justify-center mx-auto">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-white">Hopeland Estates Corporate Headquarters</p>
                  <p className="text-[11px] text-slate-300 font-mono">15.1764° N, 120.5284° E</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500 text-[11px]">Mabalacat / Clark Corridor</span>
                <a
                  href="https://maps.google.com/?q=Clark+Freeport+Zone+Pampanga"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-[#0B2345] hover:text-[#C49A32] font-semibold text-xs transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Business Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-[5px] border border-slate-200">
              <div className="border-b border-slate-100 pb-5 mb-7">
                <span className="text-[11px] font-semibold text-[#C49A32] uppercase tracking-[0.18em] block mb-1">
                  Official Correspondence
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#0B2345]">
                  Send a Corporate Inquiry
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  All submissions are logged and routed directly to the designated department head.
                </p>
              </div>

              {referenceNo ? (
                <div className="p-6 bg-[#F7F8FA] border border-[#C49A32]/40 rounded-[5px] text-[#0B2345] space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-[#C49A32]" />
                    <h4 className="font-serif font-bold text-lg">Inquiry Successfully Dispatched</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Your correspondence has been assigned to the relevant department head for prompt response.
                  </p>
                  <div className="p-4 bg-white rounded-[4px] border border-slate-200 text-center font-mono">
                    <span className="text-[10px] text-slate-500 block uppercase">Reference Number</span>
                    <span className="text-lg font-bold text-[#0B2345]">{referenceNo}</span>
                  </div>
                  <button
                    onClick={() => setReferenceNo(null)}
                    className="w-full py-2.5 bg-[#0B2345] text-white text-xs font-semibold rounded-[4px] uppercase tracking-wider"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                  {errorMsg && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-[4px]">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Atty. Roberto Pablo"
                        className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. rpablo@example.com"
                        className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1.5">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +63 917 800 1234"
                        className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1.5">
                        Organization / Affiliation
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Landholding Trust or Enterprise"
                        className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1.5">
                        Inquiry Nature *
                      </label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
                      >
                        <option value="GENERAL">General Corporate Affairs</option>
                        <option value="PROPERTY">Property Acquisition / Reservation</option>
                        <option value="PARTNERSHIP">Strategic Joint Venture</option>
                        <option value="LANDOWNER">Landowner Development</option>
                        <option value="INVESTMENT">Capital & Institutional Investment</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1.5">
                        Subject Line
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Partnership exploration in Clark corridor"
                        className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5">
                      Message / Correspondence *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please articulate your inquiry or transaction scope..."
                      className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-[#0B2345] hover:bg-[#163A63] text-white font-semibold rounded-[4px] uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{submitting ? 'Transmitting...' : 'Dispatch Inquiry'}</span>
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
