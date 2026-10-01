import React, { useState } from 'react';
import { api } from '../services/api.ts';
import { getAssetUrl } from '../utils/assets.ts';
import {
  UploadCloud,
  CheckCircle2,
  Send,
  ArrowRight
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

  const transformationStages = [
    {
      step: '01',
      title: 'Contiguous Land Asset & Geodetic Survey',
      subtitle: 'Title Audit & Topographical Assessment',
      image: 'images/landowners/contiguous-philippine-landholding-survey.jpg',
      description:
        'We evaluate raw agricultural or idle family estates across high-growth corridors, conducting geodetic boundary relocation, soil analysis, and legal title verification.'
    },
    {
      step: '02',
      title: 'Architectural Masterplanning & Zoning',
      subtitle: 'Value Engineering & Joint Venture Structuring',
      image: 'images/services/architectural-masterplanning-model.jpg',
      description:
        'Our architects and civil engineers design a comprehensive masterplan—allocating road networks, residential clusters, and open parks under an equitable revenue-share or lot-share agreement.'
    },
    {
      step: '03',
      title: 'Masterplanned Community Realization',
      subtitle: 'Infrastructure Delivery & Long-Term Stewardship',
      image: 'images/landowners/masterplanned-community-transformation.jpg',
      description:
        'HopeLand funds and executes horizontal grading, underground utilities, gated entrances, and commercial marketing—transforming raw acreage into an enduring community asset.'
    }
  ];

  return (
    <div className="w-full bg-[#F7F8FA] text-[#17263A]">
      {/* Architectural Header Banner */}
      <section className="relative min-h-[340px] sm:min-h-[380px] flex items-center bg-[#071A33] text-white border-b border-[#163A63] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={getAssetUrl('images/landowners/contiguous-philippine-landholding-survey.jpg')}
            alt="Philippine Contiguous Landholding and Geodetic Surveying"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#071A33]/95 via-[#0B2345]/85 to-[#0B2345]/35"
            aria-hidden="true"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10 w-full">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#C49A32]" />
              <span className="text-xs font-semibold tracking-[0.2em] text-[#D8B65B] uppercase">
                Land Transformation & Long-Term Partnership
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight text-balance">
              Unlock Your Land's True Potential
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              Partner with HopeLand Estates to transform contiguous Philippine landholdings into masterplanned residential, commercial, or agro-industrial communities through transparent co-development.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Progression: From Raw Land Asset to Masterplanned Community */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 space-y-2">
            <span className="text-xs font-semibold tracking-[0.18em] text-[#C49A32] uppercase block">
              Visual Storytelling · Land Stewardship Pathway
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2345]">
              From Raw Acreage to Masterplanned Estate
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              A disciplined, legally safeguarded progression that preserves family ownership legacy while unlocking long-term development value.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {transformationStages.map((stage) => (
              <div
                key={stage.step}
                className="bg-[#F7F8FA] rounded-[5px] border border-slate-200 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-[#071A33] overflow-hidden">
                    <img
                      src={getAssetUrl(stage.image)}
                      alt={stage.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                      <span className="font-mono font-bold text-[#D8B65B]">STAGE {stage.step}</span>
                      <span className="text-[11px] text-slate-200">{stage.subtitle}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-2.5">
                    <h3 className="text-lg font-serif font-bold text-[#0B2345] leading-snug">
                      {stage.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Split Layout: Partnership Structures & Confidential Land Evaluation Form */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Partnership Models */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0B2345] text-white p-8 rounded-[6px] border border-[#163A63] space-y-6">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C49A32] block mb-1">
                  Co-Development Structures
                </span>
                <h3 className="text-xl font-serif font-bold text-white">
                  Tailored Landowner Arrangements
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-[4px] bg-[#071A33]/80 border border-white/10 space-y-1">
                  <h4 className="font-serif font-bold text-[#D8B65B] text-sm">
                    01. Joint Venture — Revenue Share
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    The landowner contributes titled acreage while HopeLand finances masterplanning, permits, engineering, and sales—distributing agreed proceeds as lots or units are sold.
                  </p>
                </div>

                <div className="p-4 rounded-[4px] bg-[#071A33]/80 border border-white/10 space-y-1">
                  <h4 className="font-serif font-bold text-[#D8B65B] text-sm">
                    02. Joint Venture — Developed Lot Allocation
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    The landowner retains an agreed percentage of fully developed,individual-titled residential or commercial lots within the completed subdivision.
                  </p>
                </div>

                <div className="p-4 rounded-[4px] bg-[#071A33]/80 border border-white/10 space-y-1">
                  <h4 className="font-serif font-bold text-[#D8B65B] text-sm">
                    03. Outright Acquisition or Long-Term Ground Lease
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    Direct corporate purchase or structured long-term commercial lease for strategic parcels along major growth corridors.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <button
                  onClick={() => onNavigate('/projects')}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#D8B65B] hover:text-white uppercase tracking-wider transition-colors"
                >
                  <span>View Our Active Masterplans</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Confidential Property Evaluation Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-[6px] border border-slate-200">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <span className="text-[11px] font-semibold text-[#C49A32] uppercase tracking-wider block">
                  Land Acquisition Registry
                </span>
                <h3 className="text-xl font-serif font-bold text-[#0B2345]">
                  Confidential Property Evaluation Submission
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Provide preliminary details regarding your landholding. All submissions are reviewed under strict non-disclosure.
                </p>
              </div>

              {referenceNo ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-[5px] text-emerald-900 space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <h4 className="font-serif font-bold text-lg">Property Dossier Logged</h4>
                  </div>
                  <p className="text-xs leading-relaxed">
                    Your property submission has been logged into the HopeLand Land Acquisition registry.
                  </p>
                  <div className="p-4 bg-white rounded border border-emerald-200 text-center font-mono">
                    <span className="text-[10px] text-slate-500 block uppercase">Reference Number</span>
                    <span className="text-lg font-bold text-[#0B2345]">{referenceNo}</span>
                  </div>
                  <button
                    onClick={() => setReferenceNo(null)}
                    className="w-full py-2.5 bg-[#0B2345] text-white text-xs font-semibold rounded-[4px] uppercase tracking-wider"
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
                        Landowner / Representative *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Jose Maria Santos"
                        className="w-full px-3 py-2 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
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
                        className="w-full px-3 py-2 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
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
                        className="w-full px-3 py-2 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
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
                        className="w-full px-3 py-2 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
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
                        className="w-full px-3 py-2 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Current Zoning
                      </label>
                      <select
                        value={currentZoning}
                        onChange={(e) => setCurrentZoning(e.target.value)}
                        className="w-full px-3 py-2 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
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
                        className="w-full px-3 py-2 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
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
                        className="w-full px-3 py-2 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
                      >
                        <option value="Joint Venture Development (Revenue Share)">Joint Venture (Revenue Share)</option>
                        <option value="Joint Venture Development (Lot/Unit Allocation)">Joint Venture (Area Allocation)</option>
                        <option value="Outright Sale to HopeLand">Outright Sale</option>
                        <option value="Long-Term Land Lease">Long-Term Ground Lease</option>
                      </select>
                    </div>
                  </div>

                  {/* Supporting Document Attachment */}
                  <div className="p-4 bg-[#F7F8FA] border border-dashed border-slate-300 rounded-[4px] flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <UploadCloud className="w-5 h-5 text-[#C49A32] shrink-0" />
                      <span className="text-xs text-slate-700">
                        Supporting Documents (Vicinity Map, Lot Plan, Title Copy)
                      </span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={() => setDocumentCount((prev) => prev + 1)}
                        className="px-3 py-1.5 bg-white border border-slate-300 rounded-[4px] text-[11px] font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap"
                      >
                        + Attach Document
                      </button>
                      {documentCount > 0 && (
                        <span className="text-[11px] text-emerald-700 font-mono">
                          {documentCount} attached
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
                      placeholder="Describe road frontage, nearby landmarks, topography, or partnership objectives..."
                      className="w-full px-3 py-2 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-[#0B2345] hover:bg-[#163A63] text-white font-semibold rounded-[4px] uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{submitting ? 'Submitting...' : 'Submit Property for Preliminary Appraisal'}</span>
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
