import React, { useState, useEffect } from 'react';
import { GeneralInquiry, InvestmentInquiry, LandownerInquiry, InquiryStatus } from '../../types/index.ts';
import { api } from '../../services/api.ts';
import {
  Inbox,
  TrendingUp,
  FileCheck,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  MessageSquare,
  UserCheck,
  X
} from 'lucide-react';

export const AdminInquiriesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'investment' | 'landowner' | 'general'>('investment');
  const [investmentInquiries, setInvestmentInquiries] = useState<InvestmentInquiry[]>([]);
  const [landownerInquiries, setLandownerInquiries] = useState<LandownerInquiry[]>([]);
  const [generalInquiries, setGeneralInquiries] = useState<GeneralInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  // Selected item modal state
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [newNote, setNewNote] = useState('');
  const [newFollowUp, setNewFollowUp] = useState('');

  const fetchInquiries = async () => {
    try {
      const data = await api.getAdminInquiries();
      setInvestmentInquiries(data.investment);
      setLandownerInquiries(data.landowner);
      setGeneralInquiries(data.general);
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (type: 'general' | 'investment' | 'landowner', id: string, status: InquiryStatus) => {
    try {
      await api.updateInquiry(type, id, { status });
      await fetchInquiries();
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status });
      }
    } catch (err) {
      alert('Status update failed');
    }
  };

  const handleAddFollowUp = async (type: 'general' | 'investment' | 'landowner', id: string) => {
    if (!newFollowUp.trim()) return;
    try {
      const updated = await api.addFollowUp(type, id, newFollowUp);
      setSelectedInquiry(updated);
      setNewFollowUp('');
      await fetchInquiries();
    } catch (err) {
      alert('Failed to log follow-up');
    }
  };

  const handleExportCSV = (type: 'investment' | 'landowner' | 'general') => {
    window.open(`/api/admin/inquiries/export?type=${type}`, '_blank');
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-semibold text-[#C49A32] uppercase tracking-wider block">
            Lead & Investor CRM
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#0B2345]">
            Inquiry & Partnership Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track confidential investor inquiries, landowner co-development proposals, and property reservations.
          </p>
        </div>

        <button
          onClick={() => handleExportCSV(activeTab)}
          className="px-3.5 py-2 bg-white border border-slate-200 hover:border-[#0B2345] text-slate-700 hover:text-[#0B2345] text-xs font-semibold rounded uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <Download className="w-3.5 h-3.5 text-[#C49A32]" />
          <span>Export {activeTab.toUpperCase()} to CSV</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('investment')}
          className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'investment'
              ? 'border-[#C49A32] text-[#0B2345] bg-white'
              : 'border-transparent text-slate-500 hover:text-[#0B2345]'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-[#C49A32]" />
          <span>Investment Inquiries ({investmentInquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('landowner')}
          className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'landowner'
              ? 'border-[#C49A32] text-[#0B2345] bg-white'
              : 'border-transparent text-slate-500 hover:text-[#0B2345]'
          }`}
        >
          <FileCheck className="w-4 h-4 text-[#C49A32]" />
          <span>Landowner Proposals ({landownerInquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('general')}
          className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'general'
              ? 'border-[#C49A32] text-[#0B2345] bg-white'
              : 'border-transparent text-slate-500 hover:text-[#0B2345]'
          }`}
        >
          <Inbox className="w-4 h-4 text-[#C49A32]" />
          <span>General & Property ({generalInquiries.length})</span>
        </button>
      </div>

      {/* Tab 1: Investment Inquiries */}
      {activeTab === 'investment' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B2345] text-white text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Reference</th>
                <th className="py-3 px-4">Investor / Organization</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Capital Range</th>
                <th className="py-3 px-4">Preferred Project</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {investmentInquiries.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#0B2345]">{inv.referenceNo}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900 block">{inv.fullName}</span>
                    <span className="text-[11px] text-slate-500">{inv.companyName || inv.country}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{inv.investorType}</td>
                  <td className="py-3 px-4 font-mono font-medium text-slate-800">{inv.indicativeRange}</td>
                  <td className="py-3 px-4 text-slate-600 max-w-xs truncate">{inv.preferredProject}</td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-[11px] font-semibold text-[#C49A32]">{inv.status}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedInquiry({ ...inv, _type: 'investment' })}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-[#0B2345] hover:text-white rounded text-[11px] font-semibold transition-colors"
                    >
                      Review Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Landowner Proposals */}
      {activeTab === 'landowner' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B2345] text-white text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Reference</th>
                <th className="py-3 px-4">Landowner</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Area</th>
                <th className="py-3 px-4">Zoning / Title</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {landownerInquiries.map((lnd) => (
                <tr key={lnd.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#0B2345]">{lnd.referenceNo}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900 block">{lnd.fullName}</span>
                    <span className="text-[11px] text-slate-500">{lnd.email}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 max-w-xs truncate">{lnd.propertyLocation}</td>
                  <td className="py-3 px-4 font-mono font-medium text-slate-800">{lnd.landArea}</td>
                  <td className="py-3 px-4 text-slate-600 text-[11px]">{lnd.currentZoning} · {lnd.titleStatus}</td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-[11px] font-semibold text-[#C49A32]">{lnd.status}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedInquiry({ ...lnd, _type: 'landowner' })}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-[#0B2345] hover:text-white rounded text-[11px] font-semibold transition-colors"
                    >
                      Review Proposal
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: General & Property Inquiries */}
      {activeTab === 'general' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B2345] text-white text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Reference</th>
                <th className="py-3 px-4">Sender</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Property / Project</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {generalInquiries.map((gen) => (
                <tr key={gen.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#0B2345]">{gen.referenceNo}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900 block">{gen.fullName}</span>
                    <span className="text-[11px] text-slate-500">{gen.email}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{gen.type}</td>
                  <td className="py-3 px-4 text-slate-700 max-w-xs truncate">{gen.subject}</td>
                  <td className="py-3 px-4 text-slate-500 text-[11px]">{gen.propertyInterest || 'General'}</td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-[11px] font-semibold text-[#C49A32]">{gen.status}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedInquiry({ ...gen, _type: 'general' })}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-[#0B2345] hover:text-white rounded text-[11px] font-semibold transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Review Modal with Workflow Status & Follow-up Logger */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  {selectedInquiry.referenceNo}
                </span>
                <h3 className="text-lg font-serif font-bold text-[#0B2345]">
                  {selectedInquiry.fullName}
                </h3>
                <span className="text-xs text-slate-500">
                  {selectedInquiry.email} · {selectedInquiry.phone || 'No phone'}
                </span>
              </div>
              <button onClick={() => setSelectedInquiry(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Workflow Status Selector */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded border border-slate-200 text-xs">
              <span className="font-semibold text-slate-700">Update Status:</span>
              <select
                value={selectedInquiry.status}
                onChange={(e) => handleUpdateStatus(selectedInquiry._type, selectedInquiry.id, e.target.value as InquiryStatus)}
                className="px-2 py-1 bg-white border border-slate-300 rounded font-semibold text-[#0B2345] focus:outline-none"
              >
                <option value="NEW">NEW</option>
                <option value="UNDER_REVIEW">UNDER REVIEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="IN_DISCUSSION">IN DISCUSSION</option>
                <option value="RESOLVED">RESOLVED</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </div>

            {/* Inquiry Body Details */}
            <div className="space-y-3 text-xs text-slate-700">
              <div className="bg-slate-50 p-4 rounded border border-slate-100 space-y-2">
                <h4 className="font-semibold text-[#0B2345] uppercase text-[11px]">Message Content:</h4>
                <p className="leading-relaxed whitespace-pre-wrap">{selectedInquiry.message}</p>
              </div>

              {selectedInquiry.indicativeRange && (
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Capital Range</span>
                    <span className="font-mono font-semibold">{selectedInquiry.indicativeRange}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Investor Type</span>
                    <span className="font-semibold">{selectedInquiry.investorType}</span>
                  </div>
                </div>
              )}

              {selectedInquiry.propertyLocation && (
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Property Location</span>
                    <span className="font-semibold">{selectedInquiry.propertyLocation}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Reported Area</span>
                    <span className="font-mono font-semibold">{selectedInquiry.landArea}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Follow-up Activity Log */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <h4 className="font-semibold text-[#0B2345] text-xs uppercase tracking-wider">
                Follow-Up History & Internal Notes
              </h4>

              {selectedInquiry.followUps && selectedInquiry.followUps.length > 0 ? (
                <div className="space-y-2">
                  {selectedInquiry.followUps.map((fu: any) => (
                    <div key={fu.id} className="p-3 bg-slate-50 rounded border border-slate-100 text-xs">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span className="font-semibold text-[#0B2345]">{fu.recordedBy}</span>
                        <span>{new Date(fu.date).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-700">{fu.notes}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-slate-400 italic">No previous follow-up records logged.</p>
              )}

              {/* Add Follow-Up Form */}
              <div className="space-y-2 pt-2">
                <textarea
                  rows={2}
                  value={newFollowUp}
                  onChange={(e) => setNewFollowUp(e.target.value)}
                  placeholder="Record call outcome, proposal dispatch, or NDA status..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleAddFollowUp(selectedInquiry._type, selectedInquiry.id)}
                  className="px-4 py-1.5 bg-[#0B2345] text-white rounded text-xs font-semibold uppercase tracking-wider"
                >
                  Log Follow-up Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
