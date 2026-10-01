import React, { useState, useEffect } from 'react';
import { CorporateDocument } from '../../types/index.ts';
import { api } from '../../services/api.ts';
import { useAuth } from '../../context/AuthContext.tsx';
import {
  FolderLock,
  Plus,
  Trash2,
  FileText,
  Lock,
  Shield,
  X,
  Download
} from 'lucide-react';

export const AdminDocumentsPage: React.FC = () => {
  const { canEditProjects, isAdmin } = useAuth();
  const [docs, setDocs] = useState<CorporateDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CorporateDocument['category']>('Feasibility Study');
  const [confidentiality, setConfidentiality] = useState<CorporateDocument['confidentiality']>('CONFIDENTIAL');
  const [description, setDescription] = useState('');
  const [projectName, setProjectName] = useState('');

  const fetchDocs = async () => {
    try {
      const data = await api.getDocuments();
      setDocs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category) return;

    try {
      await api.uploadDocument({
        title,
        category,
        confidentiality,
        description,
        projectName
      });
      setTitle('');
      setDescription('');
      setProjectName('');
      setIsAdding(false);
      await fetchDocs();
    } catch (err) {
      alert('Failed to upload document record');
    }
  };

  const handleDelete = async (id: string, docTitle: string) => {
    if (!confirm(`Are you sure you wish to delete document record "${docTitle}"?`)) return;
    try {
      await api.deleteDocument(id);
      await fetchDocs();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-semibold text-[#C49A32] uppercase tracking-wider block">
            Institutional Vault
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#0B2345]">
            Corporate Document Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Secure administrative repository for project feasibility studies, architectural blueprints, budgets, and legal contracts.
          </p>
        </div>

        {canEditProjects && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-[#0B2345] hover:bg-[#163A63] text-white text-xs font-semibold rounded uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Register Corporate Document</span>
          </button>
        )}
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-500 text-sm">Loading corporate document repository...</div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B2345] text-white text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Document Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Project Affiliation</th>
                <th className="py-3 px-4">Classification</th>
                <th className="py-3 px-4">File Size / Format</th>
                <th className="py-3 px-4">Uploaded By</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {docs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    <div className="flex items-start gap-2.5">
                      <FileText className="w-4 h-4 text-[#C49A32] shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-slate-900 font-medium">{doc.title}</span>
                        <span className="text-[11px] text-slate-400 font-normal">{doc.description}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{doc.category}</td>
                  <td className="py-3.5 px-4 text-slate-700">{doc.projectName || 'Corporate Master'}</td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                      doc.confidentiality === 'STRICTLY_CONFIDENTIAL' || doc.confidentiality === 'BOARD_ONLY'
                        ? 'bg-rose-50 text-rose-700'
                        : 'bg-amber-50 text-amber-800'
                    }`}>
                      <Lock className="w-3 h-3" />
                      <span>{doc.confidentiality}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                    {doc.fileSize} ({doc.fileType})
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 text-[11px]">{doc.uploadedBy}</td>
                  <td className="py-3.5 px-4 text-right">
                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(doc.id, doc.title)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                        title="Delete Document"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Document Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-serif font-bold text-[#0B2345]">Register Corporate Document</h3>
              <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Master Development Plan Rev C"
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                  >
                    <option value="Feasibility Study">Feasibility Study</option>
                    <option value="Architectural Drawing">Architectural Drawing</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Budget & Financial">Budget & Financial</option>
                    <option value="Investment Proposal">Investment Proposal</option>
                    <option value="Legal & Compliance">Legal & Compliance</option>
                    <option value="Project Report">Project Report</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Confidentiality *</label>
                  <select
                    value={confidentiality}
                    onChange={(e) => setConfidentiality(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none font-mono"
                  >
                    <option value="CONFIDENTIAL">CONFIDENTIAL</option>
                    <option value="STRICTLY_CONFIDENTIAL">STRICTLY CONFIDENTIAL</option>
                    <option value="BOARD_ONLY">BOARD ONLY</option>
                    <option value="PUBLIC">PUBLIC</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Project Affiliation</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. Bical Residential Development"
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Description / Version Notes</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summary of contents or revision history..."
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B2345] text-white font-semibold rounded uppercase tracking-wider"
                >
                  Save Document Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
