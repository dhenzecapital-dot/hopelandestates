import React, { useState, useEffect } from 'react';
import { Project, ProjectCategory } from '../types/index.ts';
import { api } from '../services/api.ts';
import { MapPin, Search, ChevronRight, Layers, AlertCircle } from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (path: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const categories = [
    'All',
    'Residential',
    'Commercial',
    'Agro-Industrial',
    'Hospitality',
    'Institutional'
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.getProjects(selectedCategory === 'All' ? undefined : selectedCategory, false);
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [selectedCategory]);

  const filteredProjects = projects.filter(p => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.location.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full bg-[#F7F8FA]">
      {/* Header Banner */}
      <section className="bg-[#0B2345] text-white py-16 lg:py-20 border-b border-[#163A63]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-widest text-[#D8B65B] uppercase block mb-2">
              Corporate Portfolio
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
              Strategic Developments & Masterplans
            </h1>
            <p className="text-base text-slate-300 leading-relaxed font-light">
              Explore HopeLand's portfolio of preliminary development opportunities, masterplanned communities, and commercial assets across strategic Philippine growth regions.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="bg-white border-b border-slate-200 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Functional Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#0B2345] text-[#D8B65B] font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-[#0B2345] hover:bg-slate-100'
                }`}
              >
                {cat === 'All' ? 'All Projects' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search developments or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-[#C49A32] focus:bg-white transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Transparency Alert Box */}
        <div className="mb-8 p-4 bg-amber-50/80 border border-amber-200/80 rounded-md flex items-start gap-3 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Preliminary Development Disclosure:</strong> Projects shown represent corporate development concepts and opportunities undergoing architectural design, feasibility assessment, and regulatory approval. Unverified developments are not represented as completed or operational.
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-500 text-sm">
            Loading portfolio developments...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-20 text-center bg-white rounded border border-slate-200 p-8 space-y-3">
            <Layers className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-base font-serif font-bold text-slate-700">No matching developments found</p>
            <p className="text-xs text-slate-500">Try selecting another category or clearing your search filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => onNavigate(`/projects/${proj.slug}`)}
                className="group cursor-pointer bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Featured Image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                    <img
                      src={proj.featuredImage}
                      alt={proj.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Unboxed category and stage metadata */}
                    <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-xs text-white">
                      <span className="font-semibold text-[#D8B65B]">{proj.category}</span>
                      <span className="text-slate-300 text-[11px] font-mono">{proj.stage}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-[#C49A32]" />
                      <span>{proj.location}</span>
                      <span aria-hidden="true">·</span>
                      <span>{proj.indicativeLandArea}</span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-[#0B2345] group-hover:text-[#C49A32] transition-colors leading-snug">
                      {proj.name}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                </div>

                {/* Footer with status disclaimer note */}
                <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-2">
                  <span className="text-[10.5px] text-amber-800 font-medium italic">
                    {proj.statusText}
                  </span>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-500 text-[11px]">
                      {proj.indicativeBudget || 'Indicative Masterplan'}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#0B2345] group-hover:text-[#C49A32] group-hover:translate-x-1 transition-all">
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
