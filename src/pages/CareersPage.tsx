import React, { useState, useEffect } from 'react';
import { Career } from '../types/index.ts';
import { api } from '../services/api.ts';
import {
  Briefcase,
  MapPin,
  Clock,
  Award,
  CheckCircle2,
  X,
  Send,
  UploadCloud,
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
        setCareers(data.filter(c => c.published));
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
    <div className="w-full bg-[#F7F8FA] pb-20">
      {/* Header Banner */}
      <section className="bg-[#0B2345] text-white py-16 lg:py-20 border-b border-[#163A63]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-widest text-[#D8B65B] uppercase block mb-2">
              Human Capital & Culture
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
              Build Your Career at HopeLand
            </h1>
            <p className="text-base text-slate-300 leading-relaxed font-light">
              Join an institutional real estate team dedicated to high engineering standards, ethical land stewardship, and community impact.
            </p>
          </div>
        </div>
      </section>

      {/* Corporate Culture Pillars */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs">
            <Award className="w-6 h-6 text-[#C49A32] mb-3" />
            <h3 className="font-serif font-bold text-base text-[#0B2345] mb-1">Meritocracy & Professionalism</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We empower engineers, architects, finance specialists, and marketers to lead transformative masterplanned projects with executive support.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs">
            <Briefcase className="w-6 h-6 text-[#C49A32] mb-3" />
            <h3 className="font-serif font-bold text-base text-[#0B2345] mb-1">Substantial Project Exposure</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Directly influence large-scale masterplans, commercial high-rises, and thousand-hectare agro-industrial developments in prime growth regions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs">
            <CheckCircle2 className="w-6 h-6 text-[#C49A32] mb-3" />
            <h3 className="font-serif font-bold text-base text-[#0B2345] mb-1">Integrity First</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our culture upholds strict corporate compliance, legal diligence, transparent contractor relations, and employee safety.
            </p>
          </div>
        </div>

        {/* Current Job Openings */}
        <div>
          <div className="border-b border-slate-200 pb-4 mb-8">
            <span className="text-xs font-semibold text-[#C49A32] uppercase tracking-wider block">
              Opportunities
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#0B2345]">
              Current Corporate Positions
            </h2>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-500 text-sm">Loading career postings...</div>
          ) : careers.length === 0 ? (
            <div className="p-8 bg-white rounded border border-slate-200 text-center text-xs text-slate-500">
              No vacancies are currently posted. You may submit a general inquiry to our human capital team.
            </div>
          ) : (
            <div className="space-y-4">
              {careers.map((job) => (
                <div
                  key={job.id}
                  className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#C49A32] transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-[#0B2345]">{job.department}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#C49A32]" />
                        <span>{job.location}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.employmentType}</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-[#0B2345]">
                      {job.title}
                    </h3>

                    <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
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
                      className="px-5 py-2.5 bg-[#0B2345] hover:bg-[#163A63] text-white text-xs font-semibold rounded uppercase tracking-wider transition-colors flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <span>Apply For Position</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#D8B65B]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <span className="text-[11px] font-semibold text-[#C49A32] uppercase tracking-wider block">
                  Application Dossier
                </span>
                <h3 className="text-xl font-serif font-bold text-[#0B2345]">
                  {selectedJob.title}
                </h3>
                <span className="text-xs text-slate-500">{selectedJob.department} · {selectedJob.location}</span>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {referenceNo ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <h4 className="font-serif font-bold text-lg">Application Submitted</h4>
                </div>
                <p className="text-xs leading-relaxed">
                  Your application for <strong>{selectedJob.title}</strong> has been forwarded to HopeLand Human Capital Management.
                </p>
                <div className="p-4 bg-white rounded border border-emerald-200 text-center font-mono">
                  <span className="text-[10px] text-slate-500 block uppercase">Application Reference</span>
                  <span className="text-lg font-bold text-[#0B2345]">{referenceNo}</span>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="w-full py-2 bg-[#0B2345] text-white text-xs font-semibold rounded uppercase"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4 text-xs">
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
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Maria Santos"
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
                      placeholder="e.g. msantos@example.com"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
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
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
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
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
                    />
                  </div>
                </div>

                {/* Resume Attachment Simulation */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Curriculum Vitae / Resume Attachment
                  </label>
                  <div className="p-3 bg-slate-50 border border-dashed border-slate-300 rounded flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-mono">
                      {resumeFileName || 'No file selected (PDF / DOCX)'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setResumeFileName(`${applicantName.replace(/\s+/g, '_') || 'Applicant'}_Resume.pdf`)}
                      className="px-3 py-1 bg-white border border-slate-300 rounded text-[11px] text-slate-700 hover:bg-slate-100"
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
                    placeholder="Briefly state your key achievements and why you want to join HopeLand..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-[#C49A32]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2 bg-[#0B2345] text-white font-semibold rounded text-xs uppercase tracking-wider flex items-center gap-1.5"
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
