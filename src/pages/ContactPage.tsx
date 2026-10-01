import React, { useState } from 'react';
import { api } from '../services/api.ts';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  Building,
  ExternalLink
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
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
    <div className="w-full bg-[#F7F8FA] pb-20">
      {/* Header Banner */}
      <section className="bg-[#0B2345] text-white py-16 lg:py-20 border-b border-[#163A63]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-widest text-[#D8B65B] uppercase block mb-2">
              Corporate Communications
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
              Contact HopeLand Estates
            </h1>
            <p className="text-base text-slate-300 leading-relaxed font-light">
              Connect directly with our corporate administration, investor relations, or land acquisition divisions at our Clark Freeport Zone executive office.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Corporate Details & Interactive Map Placeholder */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-xs space-y-6">
              <h2 className="text-xl font-serif font-bold text-[#0B2345] border-b border-slate-100 pb-3">
                Corporate Office
              </h2>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C49A32] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Headquarters</strong>
                    <p className="text-slate-600 leading-relaxed">
                      Executive Tower, Clark Freeport Zone / Mabalacat, Pampanga, 2010 Philippines
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#C49A32] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Official Inquiries</strong>
                    <p className="text-slate-600">corporate@hopelandestates.com</p>
                    <p className="text-slate-500 text-[11px]">investor.relations@hopelandestates.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#C49A32] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Telephone & Mobile</strong>
                    <p className="text-slate-600 font-mono">+63 (045) 892-4100</p>
                    <p className="text-slate-600 font-mono">+63 917 800 4673</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#C49A32] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Business Hours</strong>
                    <p className="text-slate-600">Monday – Friday: 8:30 AM – 5:30 PM PHT</p>
                    <p className="text-slate-500 text-[11px]">Closed on Philippine National Holidays</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Corporate Registration & Legal Identity */}
            <div className="bg-[#0B2345] text-white p-7 rounded-lg border border-[#163A63] space-y-4">
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

            {/* Google Maps Integration Container */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-[#0B2345]">Location Map</span>
                <span className="text-[11px] text-[#C49A32] font-semibold uppercase">Clark Freeport Zone</span>
              </div>
              
              {/* Map Canvas Placeholder with Architectural Grid Style */}
              <div className="relative aspect-[16/9] w-full rounded bg-slate-900 overflow-hidden flex items-center justify-center border border-slate-200">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C49A32_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative z-10 text-center space-y-2 p-4">
                  <div className="w-10 h-10 rounded-full bg-[#C49A32] text-[#0B2345] flex items-center justify-center mx-auto shadow-md">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-semibold text-white">Hopeland Estates Corporate Headquarters</p>
                  <p className="text-[11px] text-slate-300 font-mono">15.1764° N, 120.5284° E</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500 text-[11px]">Mabalacat / Clark Interchange</span>
                <a
                  href="https://maps.google.com/?q=Clark+Freeport+Zone+Pampanga"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-[#0B2345] hover:text-[#C49A32] font-medium text-xs"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact & Business Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-lg border border-slate-200 shadow-sm">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <span className="text-[11px] font-semibold text-[#C49A32] uppercase tracking-wider block">
                  Official Communication
                </span>
                <h3 className="text-xl font-serif font-bold text-[#0B2345]">
                  Send a Corporate Inquiry
                </h3>
              </div>

              {referenceNo ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <h4 className="font-serif font-bold text-lg">Inquiry Successfully Dispatched</h4>
                  </div>
                  <p className="text-xs leading-relaxed">
                    Your correspondence has been assigned to the relevant department head for prompt response.
                  </p>
                  <div className="p-4 bg-white rounded border border-emerald-200 text-center font-mono">
                    <span className="text-[10px] text-slate-500 block uppercase">Reference Number</span>
                    <span className="text-lg font-bold text-[#0B2345]">{referenceNo}</span>
                  </div>
                  <button
                    onClick={() => setReferenceNo(null)}
                    className="w-full py-2 bg-[#0B2345] text-white text-xs font-semibold rounded uppercase"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {errorMsg && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded">
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
                        placeholder="e.g. Atty. Roberto Pablo"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. rpablo@example.com"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +63 917 800 1234"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Organization / Affiliation
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Landholding Trust or Enterprise"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Inquiry Nature *
                      </label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
                      >
                        <option value="GENERAL">General Corporate Affairs</option>
                        <option value="PROPERTY">Property Acquisition / Reservation</option>
                        <option value="PARTNERSHIP">Strategic Joint Venture</option>
                        <option value="LANDOWNER">Landowner Development</option>
                        <option value="INVESTMENT">Capital & Institutional Investment</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Subject Line
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Partnership exploration in Clark corridor"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Message / Correspondence *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please articulate your inquiry or transaction scope..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-[#0B2345] hover:bg-[#163A63] text-white font-semibold rounded uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2"
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
