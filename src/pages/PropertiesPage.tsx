import React, { useState, useEffect } from 'react';
import { Property } from '../types/index.ts';
import { api } from '../services/api.ts';
import { getAssetUrl } from '../utils/assets.ts';
import { MapPin, Bed, Bath, Maximize2, ArrowRight, AlertCircle } from 'lucide-react';

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
    <div className="w-full bg-[#F7F8FA] text-[#17263A]">
      {/* Architectural Header Banner */}
      <section className="relative min-h-[340px] sm:min-h-[380px] flex items-center bg-[#071A33] text-white border-b border-[#163A63] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={getAssetUrl('images/properties/bikal-modern-tropical-executive-villa.jpg')}
            alt="Hopeland Estates Modern Tropical Residential and Commercial Properties"
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
                Property Discovery & Real Estate Opportunities
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight text-balance">
              Available Properties & Holdings
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              Explore residential lots, modern tropical residences, commercial office floors, and development-ready land parcels represented by HopeLand Estates.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white border-b border-slate-200 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-[4px] transition-colors whitespace-nowrap ${
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
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Availability & Status Classification Notice */}
        <div className="mb-10 p-4 bg-white border-l-4 border-[#0B2345] border-y border-r border-slate-200 rounded-[4px] flex items-start gap-3 text-xs text-slate-700">
          <AlertCircle className="w-4 h-4 text-[#C49A32] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#0B2345]">Inventory Classification:</strong> Each listing specifies whether the property is <strong>Available</strong> for immediate inquiry or <strong>Under Development</strong> (conceptual / pre-release requiring confirmation of availability and final engineering schematics).
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-500 text-sm">Loading properties...</div>
        ) : properties.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-[5px] border border-slate-200 p-8 space-y-2">
            <p className="font-serif font-bold text-[#0B2345]">No properties currently listed in this category.</p>
            <p className="text-xs text-slate-500">Contact our sales division to request off-market inventory or upcoming phase schedules.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <article
                key={prop.id}
                onClick={() => onNavigate(`/properties/${prop.slug}`)}
                className="group cursor-pointer bg-white border border-slate-200/90 rounded-[5px] overflow-hidden hover:border-[#C49A32] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Distinct Property Visual */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#071A33]">
                    <img
                      src={getAssetUrl(prop.featuredImage)}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/85 via-transparent to-transparent" />

                    {/* Clean Unboxed Metadata */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                      <span className="font-semibold text-[#D8B65B]">{prop.category}</span>
                      <span className="text-slate-200 text-[11px] font-mono">
                        Status: {prop.status}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-[#C49A32] shrink-0" />
                      <span className="truncate">{prop.location}</span>
                    </div>

                    <h2 className="text-lg font-serif font-bold text-[#0B2345] group-hover:text-[#C49A32] transition-colors leading-snug">
                      {prop.title}
                    </h2>

                    <div className="text-base font-bold text-[#0B2345] font-mono tabular-nums">
                      {formatCurrency(prop.price, prop.currency)}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {prop.description}
                    </p>

                    {/* Specs Row */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-3 border-t border-slate-100 font-mono tabular-nums">
                      <div className="flex items-center gap-1">
                        <Maximize2 className="w-3.5 h-3.5 text-[#C49A32]" />
                        <span>{prop.lotArea.toLocaleString()} sqm lot</span>
                      </div>
                      {prop.floorArea && (
                        <div className="flex items-center gap-1">
                          <span>{prop.floorArea.toLocaleString()} sqm flr</span>
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

                <div className="px-6 py-3.5 border-t border-slate-100 bg-[#F7F8FA] flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px] truncate max-w-[180px]">
                    {prop.projectName || 'Hopeland Portfolio'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-bold text-[#0B2345] group-hover:text-[#C49A32] uppercase tracking-wider text-[11px] shrink-0">
                    <span>View Listing</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C49A32] group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
