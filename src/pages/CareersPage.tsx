import React, { useState, useEffect } from 'react';
import { Career } from '../types/index.ts';
import { api } from '../services/api.ts';
import { getAssetUrl } from '../utils/assets.ts';
import {
  Briefcase,
  MapPin,
  Clock,
  Award,
  CheckCircle2,
  X,
  Send,
  ChevronRight
} from 'lucide-react';

interface CareersPageProps {
  onNavigate: (path: string) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigate }) => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Career | null>(null);

  // Application Form State
  const [applicantName, setApplicantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [referenceNo, setReferenceNo] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const data = await api.getCareers();
        setCareers(data.filter((c) => c.published));
      } catch (err) {
        console.error('Failed to load careers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !email || !selectedJob) return;

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await api.submitCareerApplication({
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        applicantName,
        email,
        phone,
        linkedin,
        coverLetter,
        resumeFileName: resumeFileName || 'Curriculum_Vitae.pdf'
      });
      setReferenceNo(res.referenceNo);
      setApplicantName('');
      setEmail('');
      setPhone('');
      setLinkedin('');
      setCoverLetter('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Application submission failed.');
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
            src={getAssetUrl('images/careers/architectural-and-engineering-studio.jpg')}
            alt="HopeLand Estates Architectural and Engineering Studio"
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
                Human Capital & Professional Culture
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight text-balance">
              Build Your Career at HopeLand Estates
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              Join an institutional Philippine real estate organization dedicated to disciplined engineering, ethical land stewardship, and lasting community development.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Split: Professional Studio Environment & Corporate Culture */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Studio Visual Showcase */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[16/10] w-full rounded-[5px] overflow-hidden bg-[#071A33] border border-slate-200">
                <img
                  src={getAssetUrl('images/careers/architectural-and-engineering-studio.jpg')}
                  alt="Architects and Civil Engineers Collaborating at HopeLand Estates"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-white">
                  <span className="font-semibold text-[#D8B65B] uppercase tracking-wider">
                    Multidisciplinary Excellence
                  </span>
                  <span className="text-slate-300 font-mono">Clark Freeport Zone · Luzon</span>
                </div>
              </div>
            </div>

            {/* Right: Culture Pillars */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#C49A32] uppercase tracking-[0.18em] block mb-2">
                  Our Workplace Philosophy
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2345] leading-snug">
                  Where Engineering Precision Meets Institutional Stewardship
                </h2>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                At HopeLand Estates and Realty Corporation, our teams collaborate across civil engineering, urban masterplanning, legal due diligence, capital structuring, and property consultancy.
              </p>

              <div className="space-y-4 pt-1">
                <div className="flex items-start gap-3.5 p-4 bg-[#F7F8FA] rounded-[5px] border border-slate-200/80">
                  <Award className="w-5 h-5 text-[#C49A32] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#0B2345] mb-0.5">
                      Meritocracy & Executive Accountability
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      We empower licensed engineers, architects, financial analysts, and real estate specialists to lead high-impact initiatives with direct executive support.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 bg-[#F7F8FA] rounded-[5px] border border-slate-200/80">
                  <Briefcase className="w-5 h-5 text-[#C49A32] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#0B2345] mb-0.5">
                      Substantial Masterplan Exposure
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Contribute directly to residential enclaves in Pampanga, commercial developments in Clark, and large-scale agro-industrial masterplans in Batangas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 bg-[#F7F8FA] rounded-[5px] border border-slate-200/80">
                  <CheckCircle2 className="w-5 h-5 text-[#C49A32] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#0B2345] mb-0.5">
                      Integrity & Regulatory Discipline
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our corporate culture upholds strict statutory compliance, transparent contractor governance, and uncompromising site safety standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Corporate Positions */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-5 mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold text-[#C49A32] uppercase tracking-[0.18em] block mb-1.5">
              Open Roles
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2345]">
              Current Corporate Positions
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Showing {careers.length} Active {careers.length === 1 ? 'Position' : 'Positions'}
          </span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-500 text-sm">Loading career postings...</div>
        ) : careers.length === 0 ? (
          <div className="p-10 bg-white rounded-[5px] border border-slate-200 text-center space-y-3">
            <p className="text-sm font-serif font-bold text-[#0B2345]">No Active Vacancies Posted</p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              You may still submit credentials or portfolio inquiries to our Human Capital team through our corporate contact office.
            </p>
            <button
              onClick={() => onNavigate('/contact')}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B2345] text-white text-xs font-semibold uppercase tracking-wider rounded-[4px]"
            >
              <span>Contact Corporate Office</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#D8B65B]" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {careers.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 sm:p-7 rounded-[5px] border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#C49A32] transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500">
                    <span className="px-2.5 py-0.5 bg-[#0B2345] text-[#D8B65B] font-semibold uppercase tracking-wider text-[10.5px] rounded-[3px]">
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1 text-slate-600 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#C49A32]" />
                      <span>{job.location}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.employmentType}</span>
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0B2345]">
                    {job.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => {
                      setSelectedJob(job);
                      setReferenceNo(null);
                      setErrorMsg(null);
                    }}
                    className="px-5 py-2.5 bg-[#0B2345] hover:bg-[#163A63] text-white text-xs font-semibold rounded-[4px] uppercase tracking-wider transition-colors flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <span>Apply For Position</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#D8B65B]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-[#071A33]/75 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-[5px] max-w-2xl w-full p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto border border-slate-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <span className="text-[11px] font-semibold text-[#C49A32] uppercase tracking-wider block">
                  Candidate Application Dossier
                </span>
                <h3 className="text-xl font-serif font-bold text-[#0B2345]">
                  {selectedJob.title}
                </h3>
                <span className="text-xs text-slate-500">
                  {selectedJob.department} · {selectedJob.location}
                </span>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {referenceNo ? (
              <div className="p-6 bg-[#F7F8FA] border border-[#C49A32]/40 rounded-[5px] text-[#0B2345] space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-[#C49A32]" />
                  <h4 className="font-serif font-bold text-lg">Application Recorded</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your application for <strong>{selectedJob.title}</strong> has been logged with HopeLand Human Capital Management.
                </p>
                <div className="p-4 bg-white rounded-[4px] border border-slate-200 text-center font-mono">
                  <span className="text-[10px] text-slate-500 block uppercase">Application Reference</span>
                  <span className="text-lg font-bold text-[#0B2345]">{referenceNo}</span>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="w-full py-2.5 bg-[#0B2345] text-white text-xs font-semibold rounded-[4px] uppercase tracking-wider"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4 text-xs">
                {errorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-[4px]">
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
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Engr. Maria Santos"
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
                      placeholder="e.g. msantos@example.com"
                      className="w-full px-3 py-2 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +63 917 555 4321"
                      className="w-full px-3 py-2 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      LinkedIn / Portfolio URL
                    </label>
                    <input
                      type="url"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-3 py-2 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
                    />
                  </div>
                </div>

                {/* Resume Attachment */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Curriculum Vitae / Resume Attachment
                  </label>
                  <div className="p-3 bg-[#F7F8FA] border border-dashed border-slate-300 rounded-[4px] flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-mono">
                      {resumeFileName || 'No file selected (PDF / DOCX)'}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setResumeFileName(`${applicantName.replace(/\s+/g, '_') || 'Applicant'}_Resume.pdf`)
                      }
                      className="px-3 py-1 bg-white border border-slate-300 rounded-[3px] text-[11px] text-slate-700 hover:bg-slate-100"
                    >
                      Attach File
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Cover Letter / Statement of Intent
                  </label>
                  <textarea
                    rows={4}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Briefly state your key qualifications and project experience..."
                    className="w-full px-3 py-2 bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:bg-white focus:outline-none focus:border-[#C49A32]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-[4px] text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2 bg-[#0B2345] hover:bg-[#163A63] text-white font-semibold rounded-[4px] text-xs uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <span>{submitting ? 'Submitting...' : 'Submit Application'}</span>
                    <Send className="w-3.5 h-3.5 text-[#D8B65B]" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
