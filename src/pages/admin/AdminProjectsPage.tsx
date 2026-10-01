import React, { useState, useEffect } from 'react';
import { Project, ProjectCategory, ProjectStage } from '../../types/index.ts';
import { api } from '../../services/api.ts';
import { useAuth } from '../../context/AuthContext.tsx';
import { getAssetUrl } from '../../utils/assets.ts';
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Check,
  X,
  MapPin,
  AlertCircle
} from 'lucide-react';

export const AdminProjectsPage: React.FC = () => {
  const { canEditProjects } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const categories: ProjectCategory[] = [
    'Residential',
    'Commercial',
    'Mixed-Use',
    'Hospitality',
    'Institutional',
    'Land Development',
    'Agro-Industrial'
  ];

  const stages: ProjectStage[] = [
    'Concept',
    'Feasibility',
    'Planning',
    'Under Development',
    'Under Construction',
    'Completed',
    'On Hold'
  ];

  const fetchProjects = async () => {
    try {
      const data = await api.getProjects(undefined, true);
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenCreate = () => {
    setCurrentProject({
      name: '',
      location: '',
      category: 'Residential',
      stage: 'Planning',
      statusText: 'Preliminary Development Information — Verification Required',
      indicativeLandArea: '',
      indicativeBudget: '',
      description: '',
      executiveSummary: '',
      developmentConcept: '',
      proposedComponents: [],
      featuredImage: '/src/assets/images/hero_hopeland_architecture_1790880040767.jpg',
      published: true,
      featured: false
    });
    setIsEditing(true);
    setErrorMsg(null);
  };

  const handleOpenEdit = (proj: Project) => {
    setCurrentProject({ ...proj });
    setIsEditing(true);
    setErrorMsg(null);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you wish to delete development project "${name}"?`)) return;
    try {
      await api.deleteProject(id);
      await fetchProjects();
    } catch (err: any) {
      alert(err.message || 'Failed to delete project');
    }
  };

  const handleTogglePublish = async (proj: Project) => {
    try {
      await api.updateProject(proj.id, { published: !proj.published });
      await fetchProjects();
    } catch (err: any) {
      alert(err.message || 'Failed to toggle visibility');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProject.name || !currentProject.location || !currentProject.category) {
      setErrorMsg('Please fill in required fields.');
      return;
    }

    try {
      if (currentProject.id) {
        await api.updateProject(currentProject.id, currentProject);
      } else {
        await api.createProject(currentProject);
      }
      setIsEditing(false);
      await fetchProjects();
    } catch (err: any) {
      setErrorMsg(err.message || 'Save failed.');
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-semibold text-[#C49A32] uppercase tracking-wider block">
            Administrative Management
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#0B2345]">
            Project & Development Portfolio
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage masterplanned projects, development stages, specifications, and public disclosures.
          </p>
        </div>

        {canEditProjects && (
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-[#0B2345] hover:bg-[#163A63] text-white text-xs font-semibold rounded uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Development</span>
          </button>
        )}
      </div>

      {/* Projects Table */}
      {loading ? (
        <div className="p-8 text-center text-slate-500 text-sm">Loading project records...</div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B2345] text-white text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Development Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Stage</th>
                <th className="py-3 px-4">Land Area</th>
                <th className="py-3 px-4">Status & Transparency Text</th>
                <th className="py-3 px-4">Visibility</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    <div className="flex items-center gap-3">
                      <img
                        src={getAssetUrl(proj.featuredImage)}
                        alt={proj.name}
                        className="w-10 h-7 object-cover rounded shrink-0 bg-slate-200"
                      />
                      <div>
                        <span className="block text-slate-900 font-medium">{proj.name}</span>
                        <span className="text-[11px] text-slate-400 font-normal">{proj.location}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{proj.category}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-[11px] text-slate-800 font-medium">{proj.stage}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">{proj.indicativeLandArea}</td>
                  <td className="py-3.5 px-4 text-[10.5px] text-amber-800 max-w-xs truncate italic">
                    {proj.statusText}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleTogglePublish(proj)}
                      className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded ${
                        proj.published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {proj.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{proj.published ? 'Published' : 'Draft'}</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    {canEditProjects && (
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        className="p-1.5 text-slate-600 hover:text-[#0B2345] hover:bg-slate-100 rounded"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {canEditProjects && (
                      <button
                        onClick={() => handleDelete(proj.id, proj.name)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                        title="Delete Project"
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

      {/* Edit / Create Project Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-serif font-bold text-[#0B2345]">
                {currentProject.id ? 'Edit Development Project' : 'Create Development Project'}
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Project Name *</label>
                  <input
                    type="text"
                    required
                    value={currentProject.name || ''}
                    onChange={(e) => setCurrentProject({ ...currentProject, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={currentProject.location || ''}
                    onChange={(e) => setCurrentProject({ ...currentProject, location: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Category *</label>
                  <select
                    value={currentProject.category || 'Residential'}
                    onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value as ProjectCategory })}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Development Stage *</label>
                  <select
                    value={currentProject.stage || 'Planning'}
                    onChange={(e) => setCurrentProject({ ...currentProject, stage: e.target.value as ProjectStage })}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                  >
                    {stages.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Indicative Land Area</label>
                  <input
                    type="text"
                    value={currentProject.indicativeLandArea || ''}
                    onChange={(e) => setCurrentProject({ ...currentProject, indicativeLandArea: e.target.value })}
                    placeholder="e.g. 6.3 Hectares"
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Status & Transparency Disclaimer Text *
                </label>
                <input
                  type="text"
                  required
                  value={currentProject.statusText || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, statusText: e.target.value })}
                  placeholder="e.g. Preliminary Development Information — Verification Required"
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Featured Image URL / Asset Path</label>
                <input
                  type="text"
                  value={currentProject.featuredImage || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, featuredImage: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Project Description</label>
                <textarea
                  rows={3}
                  value={currentProject.description || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Development Concept</label>
                <textarea
                  rows={2}
                  value={currentProject.developmentConcept || ''}
                  onChange={(e) => setCurrentProject({ ...currentProject, developmentConcept: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentProject.published || false}
                    onChange={(e) => setCurrentProject({ ...currentProject, published: e.target.checked })}
                    className="rounded text-[#0B2345]"
                  />
                  <span className="font-semibold text-slate-700">Published (Visible on Website)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentProject.featured || false}
                    onChange={(e) => setCurrentProject({ ...currentProject, featured: e.target.checked })}
                    className="rounded text-[#0B2345]"
                  />
                  <span className="font-semibold text-slate-700">Feature on Homepage</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0B2345] hover:bg-[#163A63] text-white font-semibold rounded text-xs uppercase tracking-wider"
                >
                  Save Development Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
