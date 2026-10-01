import React, { useEffect, useState } from 'react';
import { Property } from '../types/index.ts';
import { api } from '../services/api.ts';
import { getAssetUrl } from '../utils/assets.ts';
import {
  MapPin,
  CheckCircle2,
  ArrowLeft,
  Send
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
          className="px-6 py-2.5 bg-[#0B2345] text-white text-xs font-semibold rounded-[4px] uppercase tracking-wider"
        >
          Return to Inventory
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F7F8FA] text-[#17263A] pb-20">
      {/* Top Breadcrumb Navigation */}
      <div className="bg-[#071A33] text-white border-b border-[#163A63] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={() => onNavigate('/properties')}
            className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C49A32]" />
            <span>Back to Property Inventory</span>
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{property.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#D8B65B] font-semibold uppercase tracking-wider">{property.status}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Property Presentation */}
          <div className="lg:col-span-8 space-y-8">
            {/* High-Resolution 16:9 Property Visual */}
            <div className="relative aspect-[16/9] w-full rounded-[5px] overflow-hidden bg-[#071A33] border border-slate-200">
              <img
                src={getAssetUrl(property.featuredImage)}
                alt={property.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 bg-[#0B2345]/90 text-[#D8B65B] text-[10.5px] font-semibold uppercase tracking-wider rounded-[3px]">
                  {property.category}
                </span>
                <span className="px-3 py-1 bg-white/95 text-[#0B2345] text-[10.5px] font-semibold uppercase tracking-wider rounded-[3px]">
                  {property.status}
                </span>
              </div>
            </div>

            {/* Title, Pricing & Specifications Card */}
            <div className="bg-white p-7 sm:p-8 rounded-[5px] border border-slate-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-[11px] font-semibold text-[#C49A32] uppercase tracking-[0.18em] block mb-1">
                    {property.category} Offering
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2345]">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C49A32]" />
                    <span>{property.location}</span>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-[10.5px] text-slate-400 block uppercase tracking-wider font-mono">
                    Indicative Price
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold text-[#0B2345] font-mono tabular-nums">
                    {property.currency} {property.price.toLocaleString('en-PH')}
                  </div>
                </div>
              </div>

              {/* Specifications Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2 font-mono text-xs">
                <div className="p-3.5 bg-[#F7F8FA] rounded-[4px] border border-slate-200/70">
                  <span className="text-slate-400 block text-[10px] uppercase font-sans tracking-wider mb-0.5">
                    Lot Area
                  </span>
                  <span className="font-bold text-[#0B2345] text-sm">{property.lotArea} sqm</span>
                </div>
                {property.floorArea && (
                  <div className="p-3.5 bg-[#F7F8FA] rounded-[4px] border border-slate-200/70">
                    <span className="text-slate-400 block text-[10px] uppercase font-sans tracking-wider mb-0.5">
                      Floor Area
                    </span>
                    <span className="font-bold text-[#0B2345] text-sm">{property.floorArea} sqm</span>
                  </div>
                )}
                {property.bedrooms && (
                  <div className="p-3.5 bg-[#F7F8FA] rounded-[4px] border border-slate-200/70">
                    <span className="text-slate-400 block text-[10px] uppercase font-sans tracking-wider mb-0.5">
                      Bedrooms
                    </span>
                    <span className="font-bold text-[#0B2345] text-sm">{property.bedrooms} Bedrooms</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="p-3.5 bg-[#F7F8FA] rounded-[4px] border border-slate-200/70">
                    <span className="text-slate-400 block text-[10px] uppercase font-sans tracking-wider mb-0.5">
                      Bathrooms
                    </span>
                    <span className="font-bold text-[#0B2345] text-sm">{property.bathrooms} Bathrooms</span>
                  </div>
                )}
              </div>

              {/* Architectural Description */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <h3 className="font-serif font-bold text-base text-[#0B2345]">
                  Property Overview
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Features & Inclusions */}
              {property.features && property.features.length > 0 && (
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <h3 className="font-serif font-bold text-base text-[#0B2345]">
                    Key Architectural Features & Inclusions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                    {property.features.map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 p-3 bg-[#F7F8FA] rounded-[4px] border border-slate-200/70"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#C49A32] shrink-0" />
                        <span className="font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar: Direct Property Inquiry */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0B2345] text-white p-7 rounded-[5px] border border-[#163A63] space-y-4">
              <div>
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#C49A32] block mb-1">
                  Property Consultancy
                </span>
                <h3 className="font-serif font-bold text-lg text-white">
                  Request Property Prospectus
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect directly with our accredited property consultants for floor plans, payment schedules, and private site inspection appointments.
              </p>

              {status === 'success' ? (
                <div className="p-4 bg-[#071A33] border border-[#C49A32]/50 rounded-[4px] space-y-2 text-xs text-slate-200">
                  <p className="font-bold text-[#D8B65B]">Inquiry Received</p>
                  <p>
                    Reference: <strong className="text-white font-mono">{referenceNo}</strong>
                  </p>
                  <p className="text-[11px] text-slate-300">
                    A property specialist will reach out with complete schematics.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
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
                      className="w-full px-3 py-2 bg-[#071A33] border border-[#163A63] rounded-[4px] text-white focus:outline-none focus:border-[#C49A32]"
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
                      className="w-full px-3 py-2 bg-[#071A33] border border-[#163A63] rounded-[4px] text-white focus:outline-none focus:border-[#C49A32]"
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
                      className="w-full px-3 py-2 bg-[#071A33] border border-[#163A63] rounded-[4px] text-white focus:outline-none focus:border-[#C49A32]"
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
                      placeholder="Requesting sample computation and site inspection schedule..."
                      className="w-full px-3 py-2 bg-[#071A33] border border-[#163A63] rounded-[4px] text-white focus:outline-none focus:border-[#C49A32]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-2.5 bg-[#C49A32] hover:bg-[#D8B65B] text-[#0B2345] font-semibold rounded-[4px] uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-1.5"
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
