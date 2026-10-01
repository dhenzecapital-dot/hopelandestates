import React, { useEffect, useState } from 'react';
import { Project } from '../types/index.ts';
import { api } from '../services/api.ts';
import { getAssetUrl } from '../utils/assets.ts';
import {
  MapPin,
  Building,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowLeft,
  Send,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';

interface ProjectDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ slug, onNavigate }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquiryStatus, setInquiryStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [referenceNo, setReferenceNo] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await api.getProjectBySlug(slug);
        setProject(data);
      } catch (err) {
        console.error('Failed to load project details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail || !inquiryMessage) return;

    setInquiryStatus('submitting');
    try {
      const res = await api.submitGeneralInquiry({
        fullName: inquiryName,
        email: inquiryEmail,
        phone: inquiryPhone,
        subject: `Project Inquiry: ${project?.name}`,
        message: inquiryMessage,
        type: 'PROPERTY',
        propertyInterest: project?.name
      });
      setReferenceNo(res.referenceNo);
      setInquiryStatus('success');
      setInquiryMessage('');
    } catch (err) {
      console.error(err);
      setInquiryStatus('error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-500 text-sm">
        Loading development dossier...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-[#0B2345]">Development Not Found</h2>
        <p className="text-xs text-slate-500">The requested development record could not be located in our active database.</p>
        <button
          onClick={() => onNavigate('/projects')}
          className="px-6 py-2 bg-[#0B2345] text-white text-xs font-semibold rounded uppercase"
        >
          Return to Portfolio
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F7F8FA] pb-20">
      {/* Top Breadcrumb & Navigation */}
      <div className="bg-[#0B2345] text-white border-b border-[#163A63] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={() => onNavigate('/projects')}
            className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Developments</span>
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Portfolio</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#D8B65B]">{project.category}</span>
          </div>
        </div>
      </div>

      {/* Hero Visual Banner */}
      <div className="relative h-[380px] sm:h-[460px] w-full bg-slate-900 overflow-hidden">
        <img
          src={getAssetUrl(project.featuredImage)}
          alt={project.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2345] via-[#0B2345]/50 to-transparent" />

        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D8B65B] uppercase tracking-wider mb-2">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>Stage: {project.stage}</span>
            <span aria-hidden="true">·</span>
            <span>{project.indicativeLandArea}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-2 leading-tight">
            {project.name}
          </h1>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
            <MapPin className="w-4 h-4 text-[#C49A32]" />
            <span>{project.location}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Status Transparency Banner */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3 text-xs text-amber-900 mb-8">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-semibold text-amber-950 uppercase tracking-wide">
              Official Development Status Notice:
            </h4>
            <p className="leading-relaxed font-medium">
              {project.statusText}
            </p>
            <p className="text-[11px] text-amber-800">
              Information on this preliminary development dossier is compiled for corporate planning, investor evaluation, and statutory verification. Formal approvals, land titles, and engineering designs are confirmed prior to public lot release.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-10">
            {/* Executive Overview */}
            <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#0B2345] border-b border-slate-100 pb-3">
                Project Overview & Executive Summary
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {project.executiveSummary || project.description}
              </p>
            </div>

            {/* Development Concept */}
            <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#0B2345] border-b border-slate-100 pb-3">
                Development Concept
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {project.developmentConcept}
              </p>
            </div>

            {/* Proposed Components */}
            {project.proposedComponents && project.proposedComponents.length > 0 && (
              <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-xs space-y-4">
                <h2 className="text-xl font-serif font-bold text-[#0B2345] border-b border-slate-100 pb-3">
                  Proposed Components & Masterplan Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.proposedComponents.map((comp, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-[#C49A32] shrink-0 mt-0.5" />
                      <span className="font-medium">{comp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Previously Reported Information */}
            {project.previouslyReportedInfo && project.previouslyReportedInfo.length > 0 && (
              <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <FileText className="w-5 h-5 text-[#C49A32]" />
                  <h2 className="text-xl font-serif font-bold text-[#0B2345]">
                    Previously Discussed Property Information
                  </h2>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  {project.previouslyReportedInfo.map((info, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#C49A32] font-bold">·</span>
                      <span>{info}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications Matrix */}
            {project.specifications && Object.keys(project.specifications).length > 0 && (
              <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-xs space-y-4">
                <h2 className="text-xl font-serif font-bold text-[#0B2345] border-b border-slate-100 pb-3">
                  Development Specifications & Engineering Metrics
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(project.specifications).map(([key, val]) => (
                    <div key={key} className="border-b border-slate-100 pb-2 text-xs">
                      <span className="text-slate-500 block text-[11px] uppercase tracking-wider">{key}</span>
                      <span className="font-semibold text-slate-800 text-sm">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            {project.amenities && project.amenities.length > 0 && (
              <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-xs space-y-4">
                <h2 className="text-xl font-serif font-bold text-[#0B2345] border-b border-slate-100 pb-3">
                  Planned Amenities & Infrastructure
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.amenities.map((amenity, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded border border-slate-100 text-xs text-slate-700 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#C49A32] shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Visual Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-xs space-y-4">
                <h2 className="text-xl font-serif font-bold text-[#0B2345] border-b border-slate-100 pb-3">
                  Architectural Renderings & Masterplan Imagery
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((imgUrl, i) => (
                    <div key={i} className="aspect-[16/9] rounded overflow-hidden border border-slate-200 bg-slate-100">
                      <img
                        src={getAssetUrl(imgUrl)}
                        alt={`${project.name} render ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar & Inquiry Form */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Facts Card */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-sm text-[#0B2345] uppercase tracking-wider border-b border-slate-100 pb-2">
                Development Snapshot
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Category</span>
                  <span className="font-semibold text-slate-800">{project.category}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Current Stage</span>
                  <span className="font-semibold text-slate-800">{project.stage}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Indicative Land Area</span>
                  <span className="font-semibold text-slate-800">{project.indicativeLandArea}</span>
                </div>
                {project.indicativeBudget && (
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase">Indicative Valuation / Budget</span>
                    <span className="font-semibold text-slate-800">{project.indicativeBudget}</span>
                  </div>
                )}
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Location</span>
                  <span className="font-semibold text-slate-800">{project.location}</span>
                </div>
              </div>
            </div>

            {/* Direct Project Inquiry Form */}
            <div className="bg-[#0B2345] text-white p-6 rounded-lg shadow-md border border-[#163A63] space-y-4">
              <h3 className="font-serif font-bold text-base text-white">
                Project Inquiry & Pro-Forma Request
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Submit an inquiry regarding {project.name}. Our corporate business development team will contact you under strict confidentiality.
              </p>

              {inquiryStatus === 'success' ? (
                <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded space-y-2 text-xs text-emerald-200">
                  <p className="font-bold text-emerald-300">Inquiry Logged Successfully</p>
                  <p>Reference: <strong className="text-white font-mono">{referenceNo}</strong></p>
                  <p className="text-[11px] text-slate-300">Our team has received your inquiry for {project.name}.</p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="e.g. John Doe"
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
                      placeholder="e.g. jdoe@example.com"
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
                      placeholder="e.g. +63 917 123 4567"
                      className="w-full px-3 py-2 bg-[#07172F] border border-slate-700 rounded text-white focus:outline-none focus:border-[#C49A32]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1">
                      Message / Interest *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      placeholder={`I am interested in exploring opportunities for ${project.name}...`}
                      className="w-full px-3 py-2 bg-[#07172F] border border-slate-700 rounded text-white focus:outline-none focus:border-[#C49A32]"
                    />
                  </div>

                  {inquiryStatus === 'error' && (
                    <p className="text-rose-400 text-[11px]">
                      Failed to submit inquiry. Please verify your fields and try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={inquiryStatus === 'submitting'}
                    className="w-full py-2.5 bg-[#C49A32] hover:bg-[#D8B65B] text-[#0B2345] font-semibold rounded uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>{inquiryStatus === 'submitting' ? 'Submitting...' : 'Send Inquiry'}</span>
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
