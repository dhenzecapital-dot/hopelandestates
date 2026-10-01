import React, { useState, useEffect } from 'react';
import { MediaItem } from '../../types/index.ts';
import { api } from '../../services/api.ts';
import { useAuth } from '../../context/AuthContext.tsx';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  ExternalLink,
  X,
  UploadCloud
} from 'lucide-react';

export const AdminMediaPage: React.FC = () => {
  const { canEditProjects } = useAuth();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState<MediaItem['category']>('Project Rendering');

  const fetchMedia = async () => {
    try {
      const data = await api.getMedia();
      setMedia(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    try {
      await api.addMedia({ title, url, category });
      setTitle('');
      setUrl('');
      setIsAdding(false);
      await fetchMedia();
    } catch (err) {
      alert('Failed to register media asset');
    }
  };

  const handleDelete = async (id: string, itemTitle: string) => {
    if (!confirm(`Delete media asset "${itemTitle}"?`)) return;
    try {
      await api.deleteMedia(id);
      await fetchMedia();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-semibold text-[#C49A32] uppercase tracking-wider block">
            Digital Asset Management
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#0B2345]">
            Corporate Media Library
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Store, catalog, and preview architectural renderings, site aerials, and corporate branding assets.
          </p>
        </div>

        {canEditProjects && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-[#0B2345] hover:bg-[#163A63] text-white text-xs font-semibold rounded uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Register Media Asset</span>
          </button>
        )}
      </div>

      {/* Featured Master Corporate Brand Asset */}
      <div className="bg-gradient-to-r from-[#0B2345] to-[#163A63] text-white p-6 rounded-lg border border-[#C49A32]/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="bg-white p-3 rounded-lg shadow-sm w-24 h-24 shrink-0 flex items-center justify-center">
            <img
              src="/assets/branding/hopeland-official-logo.png"
              alt="Hopeland Official Logo"
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[#C49A32] text-[#0B2345] text-[10px] font-bold uppercase rounded">
                Official Brand Master
              </span>
              <span className="text-xs text-slate-300 font-mono">1024 x 1024 px · PNG</span>
            </div>
            <h2 className="text-lg font-serif font-bold text-white mt-1">
              Hopeland Estates and Realty Corporation — Official Logo
            </h2>
            <p className="text-xs text-slate-300 max-w-xl mt-0.5">
              The authoritative corporate emblem, lettering, and tagline. Preserved at high definition for print, web, signage, and investor packages.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/assets/branding/hopeland-official-logo.png"
            download="hopeland-official-logo.png"
            className="px-4 py-2 bg-[#C49A32] hover:bg-[#D8B65B] text-[#0B2345] text-xs font-bold rounded uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>Download Master PNG</span>
          </a>
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-500 text-sm">Loading media assets...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {media.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="aspect-[16/10] bg-slate-900 relative overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 left-2 bg-[#0B2345]/90 text-[#D8B65B] px-2 py-0.5 rounded text-[10px] font-semibold">
                    {item.category}
                  </span>
                </div>
                <div className="p-3 space-y-1">
                  <h4 className="font-semibold text-slate-900 text-xs truncate" title={item.title}>
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{item.dimensions || '1920x1080'}</span>
                    <span>{item.fileSize}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-500 hover:text-[#0B2345] flex items-center gap-1 text-[11px]"
                >
                  <span>Preview</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                {canEditProjects && (
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="text-rose-500 hover:text-rose-700 p-1"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Media Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-serif font-bold text-[#0B2345]">Register Media Asset</h3>
              <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Asset Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Clark Prestige Park Masterplan"
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Asset URL / Path *</label>
                <input
                  type="text"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="/src/assets/images/... or https://..."
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Media Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                >
                  <option value="Project Rendering">Project Rendering</option>
                  <option value="Site Photo">Site Photo</option>
                  <option value="Masterplan">Masterplan</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Branding">Branding</option>
                </select>
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
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
