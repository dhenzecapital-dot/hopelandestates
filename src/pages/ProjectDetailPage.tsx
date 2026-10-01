import React, { useEffect, useState } from 'react';
import { Project } from '../types/index.ts';
import { api } from '../services/api.ts';
import { getAssetUrl } from '../utils/assets.ts';
import {
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowLeft,
  Send,
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
        <p className="text-xs text-slate-500">
          The requested development record could not be located in our active database.
        </p>
        <button
          onClick={() => onNavigate('/projects')}
          className="px-6 py-2.5 bg-[#0B2345] text-white text-xs font-semibold rounded-[4px] uppercase tracking-wider"
        >
          Return to Portfolio
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F7F8FA] text-[#17263A] pb-20">
      {/* Top Breadcrumb Bar */}
      <div className="bg-[#071A33] text-white border-b border-[#163A63] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={() => onNavigate('/projects')}
            className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C49A32]" />
            <span>Back to All Developments</span>
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Portfolio</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#D8B65B] font-semibold uppercase tracking-wider">{project.category}</span>
          </div>
        </div>
      </div>

      {/* Hero Architectural Visual Banner */}
      <div className="relative h-[400px] sm:h-[480px] w-full bg-[#071A33] overflow-hidden border-b border-[#163A63]">
        <img
          src={getAssetUrl(project.featuredImage)}
          alt={project.name}
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071A33] via-[#0B2345]/55 to-transparent" />

        <div className="absolute bottom-10 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="inline-flex flex-wrap items-center gap-2 text-xs font-semibold text-[#D8B65B] uppercase tracking-[0.16em] mb-3">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>Stage: {project.stage}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{project.indicativeLandArea}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-2.5 leading-tight">
            {project.name}
          </h1>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
            <MapPin className="w-4 h-4 text-[#C49A32]" />
            <span>{project.location}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Institutional Status Notice */}
        <div className="p-5 bg-white border-l-4 border-[#C49A32] border-y border-r border-slate-200 rounded-[4px] flex items-start gap-3.5 text-xs text-slate-700 mb-10">
          <AlertCircle className="w-5 h-5 text-[#C49A32] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-semibold text-[#0B2345] uppercase tracking-wider">
              Official Development Status Notice — {project.statusText}
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Information in this development dossier is compiled for corporate planning, institutional evaluation, and statutory verification. Final engineering schematics, permits, and subdivision configurations are subject to regulatory approval prior to public release.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Dossier Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Executive Summary & Concept */}
            <div className="bg-white p-8 rounded-[5px] border border-slate-200 space-y-6">
              <div>
                <span className="text-[11px] font-semibold text-[#C49A32] uppercase tracking-[0.18em] block mb-1">
                  Executive Dossier
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B2345] border-b border-slate-100 pb-3">
                  Project Overview & Development Concept
                </h2>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {project.executiveSummary || project.description}
              </p>

              {project.developmentConcept && (
                <div className="p-5 bg-[#F7F8FA] rounded-[4px] border-l-4 border-[#0B2345] space-y-1.5">
                  <span className="text-[11px] font-semibold text-[#0B2345] uppercase tracking-wider block">
                    Architectural & Masterplan Concept
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {project.developmentConcept}
                  </p>
                </div>
              )}
            </div>

            {/* Proposed Masterplan Components */}
            {project.proposedComponents && project.proposedComponents.length > 0 && (
              <div className="bg-white p-8 rounded-[5px] border border-slate-200 space-y-5">
                <h2 className="text-xl font-serif font-bold text-[#0B2345] border-b border-slate-100 pb-3">
                  Proposed Components & Masterplan Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {project.proposedComponents.map((comp, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-slate-700 bg-[#F7F8FA] p-3.5 rounded-[4px] border border-slate-200/70"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#C49A32] shrink-0 mt-0.5" />
                      <span className="font-medium leading-relaxed">{comp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Development Specifications Matrix */}
            {project.specifications && Object.keys(project.specifications).length > 0 && (
              <div className="bg-white p-8 rounded-[5px] border border-slate-200 space-y-5">
                <h2 className="text-xl font-serif font-bold text-[#0B2345] border-b border-slate-100 pb-3">
                  Development Specifications & Engineering Metrics
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(project.specifications).map(([key, val]) => (
                    <div key={key} className="p-4 bg-[#F7F8FA] rounded-[4px] border border-slate-200/70 text-xs">
                      <span className="text-slate-500 block text-[10.5px] uppercase tracking-wider mb-1">
                        {key}
                      </span>
                      <span className="font-semibold text-[#0B2345] text-sm font-mono">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Previously Reported Information */}
            {project.previouslyReportedInfo && project.previouslyReportedInfo.length > 0 && (
              <div className="bg-white p-8 rounded-[5px] border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <FileText className="w-5 h-5 text-[#C49A32]" />
                  <h2 className="text-xl font-serif font-bold text-[#0B2345]">
                    Recorded Planning Parameters
                  </h2>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  {project.previouslyReportedInfo.map((info, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#C49A32] font-bold">·</span>
                      <span className="leading-relaxed">{info}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Planned Amenities */}
            {project.amenities && project.amenities.length > 0 && (
              <div className="bg-white p-8 rounded-[5px] border border-slate-200 space-y-4">
                <h2 className="text-xl font-serif font-bold text-[#0B2345] border-b border-slate-100 pb-3">
                  Planned Amenities & Infrastructure
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-[#F7F8FA] rounded-[4px] border border-slate-200/70 text-xs text-slate-700 flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C49A32] shrink-0" />
                      <span className="font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Architectural Renderings & Masterplan Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="bg-white p-8 rounded-[5px] border border-slate-200 space-y-5">
                <div>
                  <span className="text-[11px] font-semibold text-[#C49A32] uppercase tracking-[0.18em] block mb-1">
                    Visual Documentation
                  </span>
                  <h2 className="text-xl font-serif font-bold text-[#0B2345] border-b border-slate-100 pb-3">
                    Architectural Visualization & Site Perspectives
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((imgUrl, i) => (
                    <div
                      key={i}
                      className="aspect-[16/10] rounded-[4px] overflow-hidden border border-slate-200 bg-[#071A33]"
                    >
                      <img
                        src={getAssetUrl(imgUrl)}
                        alt={`${project.name} visualization ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Snapshot & Direct Inquiry */}
          <div className="lg:col-span-4 space-y-6">
            {/* Development Snapshot Card */}
            <div className="bg-white p-6 rounded-[5px] border border-slate-200 space-y-4">
              <h3 className="font-serif font-bold text-sm text-[#0B2345] uppercase tracking-wider border-b border-slate-100 pb-2.5">
                Development Snapshot
              </h3>
              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10.5px] uppercase tracking-wider">Category</span>
                  <span className="font-semibold text-[#0B2345]">{project.category}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10.5px] uppercase tracking-wider">Development Stage</span>
                  <span className="font-semibold text-[#0B2345]">{project.stage}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10.5px] uppercase tracking-wider">Indicative Land Area</span>
                  <span className="font-semibold text-[#0B2345] font-mono">{project.indicativeLandArea}</span>
                </div>
                {project.indicativeBudget && (
                  <div>
                    <span className="text-slate-400 block text-[10.5px] uppercase tracking-wider">
                      Indicative Valuation / Scope
                    </span>
                    <span className="font-semibold text-[#0B2345] font-mono">{project.indicativeBudget}</span>
                  </div>
                )}
                <div>
                  <span className="text-slate-400 block text-[10.5px] uppercase tracking-wider">Location</span>
                  <span className="font-semibold text-[#0B2345]">{project.location}</span>
                </div>
              </div>
            </div>

            {/* Direct Project Inquiry Form */}
            <div className="bg-[#0B2345] text-white p-7 rounded-[5px] border border-[#163A63] space-y-4">
              <div>
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#C49A32] block mb-1">
                  Confidential Dossier
                </span>
                <h3 className="font-serif font-bold text-lg text-white">
                  Project & Briefing Inquiry
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Submit an inquiry regarding {project.name}. Our business development division will respond with relevant technical or investment briefings.
              </p>

              {inquiryStatus === 'success' ? (
                <div className="p-4 bg-[#071A33] border border-[#C49A32]/50 rounded-[4px] space-y-2 text-xs text-slate-200">
                  <p className="font-bold text-[#D8B65B]">Inquiry Logged Successfully</p>
                  <p>
                    Reference: <strong className="text-white font-mono">{referenceNo}</strong>
                  </p>
                  <p className="text-[11px] text-slate-300">
                    Our team has received your inquiry regarding {project.name}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="e.g. Roberto Lim"
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
                      placeholder="e.g. rlim@example.com"
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
                      placeholder="e.g. +63 917 123 4567"
                      className="w-full px-3 py-2 bg-[#071A33] border border-[#163A63] rounded-[4px] text-white focus:outline-none focus:border-[#C49A32]"
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
                      className="w-full px-3 py-2 bg-[#071A33] border border-[#163A63] rounded-[4px] text-white focus:outline-none focus:border-[#C49A32]"
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
                    className="w-full py-2.5 bg-[#C49A32] hover:bg-[#D8B65B] text-[#0B2345] font-semibold rounded-[4px] uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-1.5"
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
