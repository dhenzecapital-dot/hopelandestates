import React, { useEffect, useState } from 'react';
import { Property } from '../types/index.ts';
import { api } from '../services/api.ts';
import { getAssetUrl } from '../utils/assets.ts';
import {
  MapPin,
  Maximize2,
  Bed,
  Bath,
  Car,
  CheckCircle2,
  ArrowLeft,
  Send,
  Building
} from 'lucide-react';

interface PropertyDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ slug, onNavigate }) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [referenceNo, setReferenceNo] = useState('');

  useEffect(() => {
    const fetchProp = async () => {
      try {
        const data = await api.getPropertyBySlug(slug);
        setProperty(data);
      } catch (err) {
        console.error('Failed to load property details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProp();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail) return;

    setStatus('submitting');
    try {
      const res = await api.submitGeneralInquiry({
        fullName: inquiryName,
        email: inquiryEmail,
        phone: inquiryPhone,
        subject: `Property Inquiry: ${property?.title}`,
        message: inquiryMessage || `I would like to inquire regarding ${property?.title}.`,
        type: 'PROPERTY',
        propertyInterest: property?.title
      });
      setReferenceNo(res.referenceNo);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-500 text-sm">
        Loading property listing...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-[#0B2345]">Listing Not Found</h2>
        <button
          onClick={() => onNavigate('/properties')}
          className="px-6 py-2 bg-[#0B2345] text-white text-xs font-semibold rounded uppercase"
        >
          Return to Inventory
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F7F8FA] pb-20">
      <div className="bg-[#0B2345] text-white border-b border-[#163A63] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={() => onNavigate('/properties')}
            className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Property Inventory</span>
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{property.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#D8B65B]">{property.status}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            {/* Main Visual */}
            <div className="aspect-[16/9] w-full rounded-lg overflow-hidden bg-slate-900 border border-slate-200">
              <img
                src={getAssetUrl(property.featuredImage)}
                alt={property.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Title & Price Card */}
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-semibold text-[#C49A32] uppercase tracking-wider block mb-1">
                    {property.category}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2345]">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C49A32]" />
                    <span>{property.location}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block uppercase font-mono">List Price</span>
                  <div className="text-2xl sm:text-3xl font-bold text-[#0B2345] font-mono tabular-nums">
                    {property.currency} {property.price.toLocaleString('en-PH')}
                  </div>
                </div>
              </div>

              {/* Specifications Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 border-b border-slate-100 font-mono text-xs">
                <div className="p-3 bg-slate-50 rounded">
                  <span className="text-slate-400 block text-[10px] uppercase font-sans">Lot Area</span>
                  <span className="font-bold text-[#0B2345] text-sm">{property.lotArea} sqm</span>
                </div>
                {property.floorArea && (
                  <div className="p-3 bg-slate-50 rounded">
                    <span className="text-slate-400 block text-[10px] uppercase font-sans">Floor Area</span>
                    <span className="font-bold text-[#0B2345] text-sm">{property.floorArea} sqm</span>
                  </div>
                )}
                {property.bedrooms && (
                  <div className="p-3 bg-slate-50 rounded">
                    <span className="text-slate-400 block text-[10px] uppercase font-sans">Bedrooms</span>
                    <span className="font-bold text-[#0B2345] text-sm">{property.bedrooms} Beds</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="p-3 bg-slate-50 rounded">
                    <span className="text-slate-400 block text-[10px] uppercase font-sans">Bathrooms</span>
                    <span className="font-bold text-[#0B2345] text-sm">{property.bathrooms} Baths</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="font-serif font-bold text-base text-[#0B2345] mb-2">
                  Property Description
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Features List */}
              {property.features && property.features.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="font-serif font-bold text-base text-[#0B2345] mb-3">
                    Key Features & Inclusions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {property.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#C49A32] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar: Direct Property Inquiry */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0B2345] text-white p-6 rounded-lg shadow-md border border-[#163A63] space-y-4">
              <h3 className="font-serif font-bold text-base text-white">
                Request Property Prospectus
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect directly with our accredited property consultants for payment schemes, sample amortization, and site inspection schedules.
              </p>

              {status === 'success' ? (
                <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded space-y-2 text-xs text-emerald-200">
                  <p className="font-bold text-emerald-300">Inquiry Received</p>
                  <p>Reference: <strong className="text-white font-mono">{referenceNo}</strong></p>
                  <p className="text-[11px] text-slate-300">A sales representative will reach out with complete lot schematics.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="e.g. Maria Clara"
                      className="w-full px-3 py-2 bg-[#07172F] border border-slate-700 rounded text-white focus:outline-none focus:border-[#C49A32]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="e.g. mclara@example.com"
                      className="w-full px-3 py-2 bg-[#07172F] border border-slate-700 rounded text-white focus:outline-none focus:border-[#C49A32]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      placeholder="e.g. +63 917 555 1234"
                      className="w-full px-3 py-2 bg-[#07172F] border border-slate-700 rounded text-white focus:outline-none focus:border-[#C49A32]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1">
                      Notes / Viewing Request
                    </label>
                    <textarea
                      rows={3}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      placeholder="Requesting sample computation and weekend site inspection..."
                      className="w-full px-3 py-2 bg-[#07172F] border border-slate-700 rounded text-white focus:outline-none focus:border-[#C49A32]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-2.5 bg-[#C49A32] hover:bg-[#D8B65B] text-[#0B2345] font-semibold rounded uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>{status === 'submitting' ? 'Submitting...' : 'Request Information'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
