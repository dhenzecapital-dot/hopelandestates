import React, { useState, useEffect } from 'react';
import { Property, PropertyCategory } from '../types/index.ts';
import { api } from '../services/api.ts';
import { getAssetUrl } from '../utils/assets.ts';
import { MapPin, Bed, Bath, Car, Maximize2, Search, ChevronRight } from 'lucide-react';

interface PropertiesPageProps {
  onNavigate: (path: string) => void;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({ onNavigate }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);

  const categories = [
    'All',
    'House and Lot',
    'Residential Lot',
    'Commercial Space',
    'Villa'
  ];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await api.getProperties(selectedCategory === 'All' ? undefined : selectedCategory, false);
        setProperties(data);
      } catch (err) {
        console.error('Failed to load property listings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [selectedCategory]);

  const formatCurrency = (val: number, curr = 'PHP') => {
    return `${curr} ${val.toLocaleString('en-PH')}`;
  };

  return (
    <div className="w-full bg-[#F7F8FA]">
      {/* Header Banner */}
      <section className="bg-[#0B2345] text-white py-16 lg:py-20 border-b border-[#163A63]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-widest text-[#D8B65B] uppercase block mb-2">
              Property Inventory
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
              Available Properties & Holdings
            </h1>
            <p className="text-base text-slate-300 leading-relaxed font-light">
              Explore verified residential lots, modern tropical villas, and corporate commercial spaces developed and represented by HopeLand Estates.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white border-b border-slate-200 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#0B2345] text-[#D8B65B] font-semibold'
                    : 'text-slate-600 hover:text-[#0B2345] hover:bg-slate-100'
                }`}
              >
                {cat === 'All' ? 'All Inventory' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-20 text-center text-slate-500 text-sm">Loading properties...</div>
        ) : properties.length === 0 ? (
          <div className="py-16 text-center bg-white rounded border border-slate-200 p-8 space-y-2">
            <p className="font-serif font-bold text-[#0B2345]">No properties currently available in this category.</p>
            <p className="text-xs text-slate-500">Contact our sales division to join the advance reservation registry.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <div
                key={prop.id}
                onClick={() => onNavigate(`/properties/${prop.slug}`)}
                className="group cursor-pointer bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Property Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <img
                      src={getAssetUrl(prop.featuredImage)}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    {/* Unboxed Metadata: Category & Status */}
                    <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-xs text-white">
                      <span className="font-semibold text-[#D8B65B]">{prop.category}</span>
                      <span className="text-slate-200 text-[11px] font-medium">{prop.status}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-[#C49A32]" />
                      <span className="truncate">{prop.location}</span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-[#0B2345] group-hover:text-[#C49A32] transition-colors leading-snug">
                      {prop.title}
                    </h3>

                    {/* Pricing */}
                    <div className="text-base font-bold text-[#0B2345] font-mono tabular-nums">
                      {formatCurrency(prop.price, prop.currency)}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {prop.description}
                    </p>

                    {/* Specs Row */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100 font-mono tabular-nums">
                      <div className="flex items-center gap-1">
                        <Maximize2 className="w-3.5 h-3.5 text-[#C49A32]" />
                        <span>{prop.lotArea} sqm lot</span>
                      </div>
                      {prop.floorArea && (
                        <div className="flex items-center gap-1">
                          <span>{prop.floorArea} sqm flr</span>
                        </div>
                      )}
                      {prop.bedrooms && (
                        <div className="flex items-center gap-1">
                          <Bed className="w-3.5 h-3.5 text-slate-400" />
                          <span>{prop.bedrooms}</span>
                        </div>
                      )}
                      {prop.bathrooms && (
                        <div className="flex items-center gap-1">
                          <Bath className="w-3.5 h-3.5 text-slate-400" />
                          <span>{prop.bathrooms}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px] font-sans">
                    {prop.projectName || 'Hopeland Portfolio'}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#0B2345] group-hover:translate-x-1 transition-transform">
                    <span>View Listing</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#C49A32]" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
