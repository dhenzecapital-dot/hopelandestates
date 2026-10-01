import React, { useState, useEffect } from 'react';
import { WebsiteContent } from '../../types/index.ts';
import { api } from '../../services/api.ts';
import { useAuth } from '../../context/AuthContext.tsx';
import {
  FileEdit,
  Save,
  CheckCircle2,
  Sparkles,
  Search,
  Globe,
  Phone
} from 'lucide-react';

export const AdminCMSPage: React.FC = () => {
  const { canEditCMS } = useAuth();
  const [cms, setCms] = useState<WebsiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const fetchCMS = async () => {
      try {
        const data = await api.getCMS();
        setCms(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCMS();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cms) return;

    setSaving(true);
    setSaveSuccess(false);

    try {
      const updated = await api.updateCMS(cms);
      setCms(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      alert('Failed to update CMS');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !cms) {
    return <div className="p-8 text-center text-slate-500 text-sm">Loading CMS content schema...</div>;
  }

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-semibold text-[#C49A32] uppercase tracking-wider block">
            Content Management System
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#0B2345]">
            Live Corporate Copy & Metadata
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Updates to these fields reflect immediately across all public corporate pages without redeployment.
          </p>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Content Saved & Published</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8 text-xs">
        {/* Official Company Profile & SEC Registration (Read-Only Institutional Record) */}
        <div className="bg-[#0B2345] text-white p-6 rounded-lg border border-[#163A63] space-y-4">
          <div className="border-b border-white/10 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#C49A32] font-semibold block">
                Company Profile · Institutional Record
              </span>
              <h3 className="font-serif font-bold text-base text-white">
                Official Corporate & SEC Registration Information
              </h3>
            </div>
            <span className="font-mono text-xs font-bold text-[#D8B65B] bg-[#071A33] px-3 py-1 rounded border border-white/10">
              SEC Reg. No. 2026090269825-01
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#C49A32] font-semibold block">
                Company Name
              </span>
              <span className="font-serif font-bold text-white">
                HOPELAND ESTATES AND REALTY CORPORATION
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#C49A32] font-semibold block">
                Corporate Registration Authority
              </span>
              <span className="text-slate-200">
                Securities and Exchange Commission (SEC), Republic of the Philippines
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#C49A32] font-semibold block">
                  Registration Status
                </span>
                <span className="text-[#D8B65B] font-semibold">Approved by SEC</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#C49A32] font-semibold block">
                  Country
                </span>
                <span className="text-white font-semibold">Philippines</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-300 pt-2 border-t border-white/10">
            Hopeland Estates and Realty Corporation is a Philippine-registered corporation with corporate registration information issued by the Securities and Exchange Commission (SEC) of the Republic of the Philippines.
          </p>
        </div>

        {/* Section 1: Homepage Hero */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-base text-[#0B2345] border-b border-slate-100 pb-2">
            Homepage Hero Section
          </h3>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Corporate Headline / Tagline</label>
            <input
              type="text"
              value={cms.hero.headline}
              onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, headline: e.target.value } })}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none font-serif text-sm"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Supporting Proposition Text</label>
            <textarea
              rows={2}
              value={cms.hero.subheadline}
              onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, subheadline: e.target.value } })}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Primary CTA Button Label</label>
              <input
                type="text"
                value={cms.hero.ctaPrimary}
                onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, ctaPrimary: e.target.value } })}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Secondary CTA Button Label</label>
              <input
                type="text"
                value={cms.hero.ctaSecondary}
                onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, ctaSecondary: e.target.value } })}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Corporate Introduction */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-base text-[#0B2345] border-b border-slate-100 pb-2">
            Corporate Introduction
          </h3>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Introduction Heading</label>
            <input
              type="text"
              value={cms.introduction.title}
              onChange={(e) => setCms({ ...cms, introduction: { ...cms.introduction, title: e.target.value } })}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none font-serif text-sm"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Overview Paragraph 1</label>
            <textarea
              rows={3}
              value={cms.introduction.paragraph1}
              onChange={(e) => setCms({ ...cms, introduction: { ...cms.introduction, paragraph1: e.target.value } })}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Overview Paragraph 2</label>
            <textarea
              rows={3}
              value={cms.introduction.paragraph2}
              onChange={(e) => setCms({ ...cms, introduction: { ...cms.introduction, paragraph2: e.target.value } })}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
            />
          </div>
        </div>

        {/* Section 3: Vision & Mission */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-base text-[#0B2345] border-b border-slate-100 pb-2">
            Vision & Mission Statements
          </h3>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Corporate Vision</label>
            <textarea
              rows={2}
              value={cms.philosophy.vision}
              onChange={(e) => setCms({ ...cms, philosophy: { ...cms.philosophy, vision: e.target.value } })}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Corporate Mission</label>
            <textarea
              rows={2}
              value={cms.philosophy.mission}
              onChange={(e) => setCms({ ...cms, philosophy: { ...cms.philosophy, mission: e.target.value } })}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
            />
          </div>
        </div>

        {/* Section 4: Contact & Social */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-base text-[#0B2345] border-b border-slate-100 pb-2">
            Corporate Contact Details & Social Links
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Office Address</label>
              <input
                type="text"
                value={cms.contact.address}
                onChange={(e) => setCms({ ...cms, contact: { ...cms.contact, address: e.target.value } })}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Corporate Email</label>
              <input
                type="email"
                value={cms.contact.email}
                onChange={(e) => setCms({ ...cms, contact: { ...cms.contact, email: e.target.value } })}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Corporate Phone</label>
              <input
                type="text"
                value={cms.contact.phone}
                onChange={(e) => setCms({ ...cms, contact: { ...cms.contact, phone: e.target.value } })}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Office Hours</label>
              <input
                type="text"
                value={cms.contact.businessHours}
                onChange={(e) => setCms({ ...cms, contact: { ...cms.contact, businessHours: e.target.value } })}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 5: SEO Metadata */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-base text-[#0B2345] border-b border-slate-100 pb-2">
            SEO & Social Card Metadata
          </h3>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Global Meta Title</label>
            <input
              type="text"
              value={cms.seo.metaTitle}
              onChange={(e) => setCms({ ...cms, seo: { ...cms.seo, metaTitle: e.target.value } })}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Global Meta Description</label>
            <textarea
              rows={2}
              value={cms.seo.metaDescription}
              onChange={(e) => setCms({ ...cms, seo: { ...cms.seo, metaDescription: e.target.value } })}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
            />
          </div>
        </div>

        {/* Save Bar */}
        {canEditCMS && (
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-[#0B2345] hover:bg-[#163A63] text-white font-semibold rounded uppercase tracking-wider text-xs transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-[#D8B65B]" />
              <span>{saving ? 'Publishing Updates...' : 'Publish Content Live'}</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
