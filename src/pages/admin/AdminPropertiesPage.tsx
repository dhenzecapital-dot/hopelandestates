import React, { useState, useEffect } from 'react';
import { Property, PropertyCategory, PropertyStatus } from '../../types/index.ts';
import { api } from '../../services/api.ts';
import { useAuth } from '../../context/AuthContext.tsx';
import { getAssetUrl } from '../../utils/assets.ts';
import {
  Home,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  X,
  MapPin,
  Maximize2
} from 'lucide-react';

export const AdminPropertiesPage: React.FC = () => {
  const { canEditProjects } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProp, setCurrentProp] = useState<Partial<Property>>({});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const categories: PropertyCategory[] = [
    'House and Lot',
    'Residential Lot',
    'Commercial Lot',
    'Villa',
    'Commercial Space',
    'Industrial Parcel'
  ];

  const statuses: PropertyStatus[] = [
    'Available',
    'Reserved',
    'Sold',
    'Leased',
    'Under Development'
  ];

  const fetchProperties = async () => {
    try {
      const data = await api.getProperties(undefined, true);
      setProperties(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleOpenCreate = () => {
    setCurrentProp({
      title: '',
      location: '',
      category: 'Residential Lot',
      status: 'Available',
      lotArea: 400,
      price: 5000000,
      currency: 'PHP',
      description: '',
      features: [],
      featuredImage: '/src/assets/images/project_bical_residential_1790880055584.jpg',
      published: true
    });
    setIsEditing(true);
    setErrorMsg(null);
  };

  const handleOpenEdit = (prop: Property) => {
    setCurrentProp({ ...prop });
    setIsEditing(true);
    setErrorMsg(null);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you wish to delete listing "${title}"?`)) return;
    try {
      await api.deleteProperty(id);
      await fetchProperties();
    } catch (err: any) {
      alert(err.message || 'Failed to delete property');
    }
  };

  const handleTogglePublish = async (prop: Property) => {
    try {
      await api.updateProperty(prop.id, { published: !prop.published });
      await fetchProperties();
    } catch (err: any) {
      alert(err.message || 'Failed to toggle visibility');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProp.title || !currentProp.location || !currentProp.price) {
      setErrorMsg('Please complete required fields.');
      return;
    }

    try {
      if (currentProp.id) {
        await api.updateProperty(currentProp.id, currentProp);
      } else {
        await api.createProperty(currentProp);
      }
      setIsEditing(false);
      await fetchProperties();
    } catch (err: any) {
      setErrorMsg(err.message || 'Save failed.');
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-semibold text-[#C49A32] uppercase tracking-wider block">
            Inventory System
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#0B2345]">
            Property Inventory Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage residential lots, modern tropical villas, and commercial real estate inventory.
          </p>
        </div>

        {canEditProjects && (
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-[#0B2345] hover:bg-[#163A63] text-white text-xs font-semibold rounded uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Property</span>
          </button>
        )}
      </div>

      {/* Properties Table */}
      {loading ? (
        <div className="p-8 text-center text-slate-500 text-sm">Loading property records...</div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B2345] text-white text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Property Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Lot / Floor Area</th>
                <th className="py-3 px-4">Price (PHP)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Visibility</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {properties.map((prop) => (
                <tr key={prop.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    <div className="flex items-center gap-3">
                      <img
                        src={getAssetUrl(prop.featuredImage)}
                        alt={prop.title}
                        className="w-10 h-7 object-cover rounded shrink-0 bg-slate-200"
                      />
                      <div>
                        <span className="block text-slate-900 font-medium">{prop.title}</span>
                        <span className="text-[11px] text-slate-400 font-normal">{prop.location}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{prop.category}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-700">
                    {prop.lotArea} sqm {prop.floorArea ? `/ ${prop.floorArea} sqm` : ''}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#0B2345] tabular-nums">
                    PHP {prop.price.toLocaleString('en-PH')}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[11px] font-medium text-slate-800">{prop.status}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleTogglePublish(prop)}
                      className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded ${
                        prop.published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {prop.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{prop.published ? 'Published' : 'Draft'}</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    {canEditProjects && (
                      <button
                        onClick={() => handleOpenEdit(prop)}
                        className="p-1.5 text-slate-600 hover:text-[#0B2345] hover:bg-slate-100 rounded"
                        title="Edit Property"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {canEditProjects && (
                      <button
                        onClick={() => handleDelete(prop.id, prop.title)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                        title="Delete Property"
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

      {/* Edit / Create Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-serif font-bold text-[#0B2345]">
                {currentProp.id ? 'Edit Property Listing' : 'Create Property Listing'}
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
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Property Title *</label>
                <input
                  type="text"
                  required
                  value={currentProp.title || ''}
                  onChange={(e) => setCurrentProp({ ...currentProp, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={currentProp.location || ''}
                    onChange={(e) => setCurrentProp({ ...currentProp, location: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Price (PHP) *</label>
                  <input
                    type="number"
                    required
                    value={currentProp.price || 0}
                    onChange={(e) => setCurrentProp({ ...currentProp, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Category *</label>
                  <select
                    value={currentProp.category || 'Residential Lot'}
                    onChange={(e) => setCurrentProp({ ...currentProp, category: e.target.value as PropertyCategory })}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Availability Status *</label>
                  <select
                    value={currentProp.status || 'Available'}
                    onChange={(e) => setCurrentProp({ ...currentProp, status: e.target.value as PropertyStatus })}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Lot Area (sqm)</label>
                  <input
                    type="number"
                    value={currentProp.lotArea || 0}
                    onChange={(e) => setCurrentProp({ ...currentProp, lotArea: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Floor Area (sqm)</label>
                  <input
                    type="number"
                    value={currentProp.floorArea || ''}
                    onChange={(e) => setCurrentProp({ ...currentProp, floorArea: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={currentProp.bedrooms || ''}
                    onChange={(e) => setCurrentProp({ ...currentProp, bedrooms: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Bathrooms</label>
                  <input
                    type="number"
                    value={currentProp.bathrooms || ''}
                    onChange={(e) => setCurrentProp({ ...currentProp, bathrooms: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Featured Image URL</label>
                <input
                  type="text"
                  value={currentProp.featuredImage || ''}
                  onChange={(e) => setCurrentProp({ ...currentProp, featuredImage: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={currentProp.description || ''}
                  onChange={(e) => setCurrentProp({ ...currentProp, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
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
                  Save Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
