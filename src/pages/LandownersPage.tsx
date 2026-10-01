import React, { useState } from 'react';
import { api } from '../services/api.ts';
import {
  MapPin,
  FileCheck,
  Building,
  UploadCloud,
  CheckCircle2,
  Send,
  HelpCircle
} from 'lucide-react';

interface LandownersPageProps {
  onNavigate: (path: string) => void;
}

export const LandownersPage: React.FC<LandownersPageProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyLocation, setPropertyLocation] = useState('');
  const [landArea, setLandArea] = useState('');
  const [currentZoning, setCurrentZoning] = useState('Agricultural');
  const [titleStatus, setTitleStatus] = useState('Clean Transfer Certificate of Title (TCT)');
  const [proposedArrangement, setProposedArrangement] = useState('Joint Venture Development (Revenue Share)');
  const [message, setMessage] = useState('');
  const [documentCount, setDocumentCount] = useState(0);

  const [submitting, setSubmitting] = useState(false);
  const [referenceNo, setReferenceNo] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !propertyLocation || !landArea) {
      setErrorMsg('Please fill in the required fields.');
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await api.submitLandownerInquiry({
        fullName,
        email,
        phone,
        propertyLocation,
        landArea,
        currentZoning,
        titleStatus,
        proposedArrangement,
        message,
        documentCount
      });

      setReferenceNo(res.referenceNo);
      setFullName('');
      setEmail('');
      setPhone('');
      setPropertyLocation('');
      setLandArea('');
      setMessage('');
      setDocumentCount(0);
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission failed. Please review your information.');
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
              Landowner Opportunities
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
              Unlock Your Land's True Potential
            </h1>
            <p className="text-base text-slate-300 leading-relaxed font-light">
              Partner with HopeLand Estates to transform contiguous raw acreage into thriving masterplanned communities. Preserve your family legacy while maximizing multi-generational value through institutional co-development.
            </p>
          </div>
        </div>
      </section>

      {/* Joint Venture Process Steps */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-widest text-[#C49A32] uppercase">
            Equitable Partnership Pathway
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2345] mt-1">
            Our 4-Stage Joint Venture Process
          </h2>
          <p className="text-xs text-slate-600 mt-2">
            A clear, legally protected roadmap from initial site appraisal to profitable revenue realization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs relative">
            <span className="text-3xl font-serif font-bold text-slate-200 absolute top-4 right-4">01</span>
            <h3 className="font-serif font-bold text-base text-[#0B2345] mb-2">Property Dossier Submission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Submit preliminary lot location, boundaries, and title status via our confidential evaluation portal.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs relative">
            <span className="text-3xl font-serif font-bold text-slate-200 absolute top-4 right-4">02</span>
            <h3 className="font-serif font-bold text-base text-[#0B2345] mb-2">Technical Feasibility Audit</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our civil engineers and masterplanners evaluate topography, access roads, zoning reclassification, and market absorption.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs relative">
            <span className="text-3xl font-serif font-bold text-slate-200 absolute top-4 right-4">03</span>
            <h3 className="font-serif font-bold text-base text-[#0B2345] mb-2">Joint Venture SPV Agreement</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We structure an equitable contract (Revenue Share or Land Allocation) legally safeguarding the owner's titled equity.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs relative">
            <span className="text-3xl font-serif font-bold text-slate-200 absolute top-4 right-4">04</span>
            <h3 className="font-serif font-bold text-base text-[#0B2345] mb-2">Execution & Milestone Payouts</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              HopeLand finances site development, permits, construction, and corporate marketing while distributing regular returns.
            </p>
          </div>
        </div>

        {/* Evaluation Form */}
        <div className="mt-16 bg-white p-8 sm:p-10 rounded-lg border border-slate-200 shadow-sm max-w-4xl mx-auto">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h3 className="text-xl font-serif font-bold text-[#0B2345]">
              Confidential Property Evaluation Submission
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Provide information regarding your landholding. All submissions are held under strict legal non-disclosure.
            </p>
          </div>

          {referenceNo ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <h4 className="font-serif font-bold text-lg">Property Dossier Logged</h4>
              </div>
              <p className="text-xs leading-relaxed">
                Your property submission has been logged into HopeLand Land Acquisition registry.
              </p>
              <div className="p-4 bg-white rounded border border-emerald-200 text-center font-mono">
                <span className="text-[10px] text-slate-500 block uppercase">Reference Number</span>
                <span className="text-lg font-bold text-[#0B2345]">{referenceNo}</span>
              </div>
              <button
                onClick={() => setReferenceNo(null)}
                className="w-full py-2 bg-[#0B2345] text-white text-xs font-semibold rounded uppercase"
              >
                Submit Additional Property
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Landowner / Representative Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Jose Maria Santos"
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
                    placeholder="e.g. jmsantos@example.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +63 917 800 1234"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Property Location (Municipality & Province) *
                  </label>
                  <input
                    type="text"
                    required
                    value={propertyLocation}
                    onChange={(e) => setPropertyLocation(e.target.value)}
                    placeholder="e.g. Porac / Mabalacat, Pampanga"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Approximate Land Area (Hectares / Sqm) *
                  </label>
                  <input
                    type="text"
                    required
                    value={landArea}
                    onChange={(e) => setLandArea(e.target.value)}
                    placeholder="e.g. 15.5 Hectares / 155,000 sqm"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Current Zoning / Classification
                  </label>
                  <select
                    value={currentZoning}
                    onChange={(e) => setCurrentZoning(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
                  >
                    <option value="Agricultural">Agricultural</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Mixed / Undeclared">Mixed / Undeclared</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Title Status
                  </label>
                  <select
                    value={titleStatus}
                    onChange={(e) => setTitleStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
                  >
                    <option value="Clean Transfer Certificate of Title (TCT)">Clean TCT (On Hand)</option>
                    <option value="Original Certificate of Title (OCT)">OCT</option>
                    <option value="Tax Declaration Only">Tax Declaration Only</option>
                    <option value="Estate in Settlement">Estate in Settlement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Proposed Arrangement
                  </label>
                  <select
                    value={proposedArrangement}
                    onChange={(e) => setProposedArrangement(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
                  >
                    <option value="Joint Venture Development (Revenue Share)">Joint Venture (Revenue Share)</option>
                    <option value="Joint Venture Development (Lot/Unit Allocation)">Joint Venture (Area Allocation)</option>
                    <option value="Outright Sale to HopeLand">Outright Sale</option>
                    <option value="Long-Term Land Lease">Long-Term Ground Lease</option>
                  </select>
                </div>
              </div>

              {/* Document upload simulation */}
              <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded text-center space-y-2">
                <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs font-medium text-slate-700">Attach Supporting Documents (Vicinity Map, Tax Dec, Title Copy)</p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setDocumentCount(prev => prev + 1)}
                    className="px-3 py-1 bg-white border border-slate-300 rounded text-[11px] text-slate-700 hover:bg-slate-100"
                  >
                    + Attach File
                  </button>
                  {documentCount > 0 && (
                    <span className="text-[11px] text-emerald-600 font-medium font-mono">
                      {documentCount} document{documentCount > 1 ? 's' : ''} attached
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Additional Details / Property Description
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe road access, nearby landmarks, topography, or family background..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-[#0B2345] hover:bg-[#163A63] text-white font-semibold rounded uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>{submitting ? 'Submitting...' : 'Submit Property for Preliminary Appraisal'}</span>
                <Send className="w-3.5 h-3.5 text-[#D8B65B]" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
