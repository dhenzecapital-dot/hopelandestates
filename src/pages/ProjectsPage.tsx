import React, { useState, useEffect } from 'react';
import { Project } from '../types/index.ts';
import { api } from '../services/api.ts';
import { getAssetUrl } from '../utils/assets.ts';
import { MapPin, Search, ArrowRight, Layers, AlertCircle } from 'lucide-react';

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

  const filteredProjects = projects.filter((p) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.location.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full bg-[#F7F8FA] text-[#17263A]">
      {/* Architectural Header Banner */}
      <section className="relative min-h-[340px] sm:min-h-[380px] flex items-center bg-[#071A33] text-white border-b border-[#163A63] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={getAssetUrl('images/home/masterplanned-philippine-development-hero.jpg')}
            alt="Hopeland Estates Masterplanned Developments Portfolio"
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
                Architectural Portfolio & Masterplans
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight text-balance">
              Strategic Developments & Visions
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              Explore HopeLand's portfolio of masterplanned residential communities, agro-industrial estates, commercial hubs, and institutional healthcare concepts across prime Philippine growth regions.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="bg-white border-b border-slate-200 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
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
                {cat === 'All' ? 'All Projects' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search developments or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F7F8FA] border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#C49A32] focus:bg-white transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Projects Portfolio Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Preliminary Development Disclosure */}
        <div className="mb-10 p-4 bg-white border-l-4 border-[#C49A32] border-y border-r border-slate-200 rounded-[4px] flex items-start gap-3 text-xs text-slate-700">
          <AlertCircle className="w-4 h-4 text-[#C49A32] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#0B2345]">Development Status Disclosure:</strong> Projects presented represent corporate development concepts and preliminary masterplans undergoing architectural refinement, feasibility underwriting, and statutory permitting. Conceptual visualizations are not represented as completed or operational assets.
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-500 text-sm">
            Loading portfolio developments...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-[5px] border border-slate-200 p-8 space-y-3">
            <Layers className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-base font-serif font-bold text-[#0B2345]">No matching developments found</p>
            <p className="text-xs text-slate-500">Try selecting another category or clearing your search filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj) => (
              <article
                key={proj.id}
                onClick={() => onNavigate(`/projects/${proj.slug}`)}
                className="group cursor-pointer bg-white border border-slate-200/90 rounded-[5px] overflow-hidden hover:border-[#C49A32] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Unique Original Architectural Visual */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#071A33]">
                    <img
                      src={getAssetUrl(proj.featuredImage)}
                      alt={proj.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/85 via-transparent to-transparent" />

                    {/* Clean Unboxed Category & Stage Metadata */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                      <span className="font-semibold text-[#D8B65B]">{proj.category}</span>
                      <span className="text-slate-200 text-[11px] font-mono">Stage: {proj.stage}</span>
                    </div>
                  </div>

                  {/* Editorial Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-[#C49A32] shrink-0" />
                      <span>{proj.location}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{proj.indicativeLandArea}</span>
                    </div>

                    <h2 className="text-xl font-serif font-bold text-[#0B2345] group-hover:text-[#C49A32] transition-colors leading-snug">
                      {proj.name}
                    </h2>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer with Status & View Project Link */}
                <div className="px-6 py-4 border-t border-slate-100 bg-[#F7F8FA] flex flex-col gap-2">
                  <span className="text-[11px] text-slate-500">
                    {proj.statusText}
                  </span>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
                    <span className="text-[#0B2345] font-mono text-[11px]">
                      {proj.indicativeBudget || 'Indicative Masterplan'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-bold text-[#0B2345] group-hover:text-[#C49A32] uppercase tracking-wider text-[11px]">
                      <span>View Project</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C49A32] group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
