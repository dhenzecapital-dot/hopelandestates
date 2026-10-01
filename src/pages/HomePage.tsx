import React, { useEffect, useState } from 'react';
import { HopelandLogo } from '../components/HopelandLogo.tsx';
import { Project, DashboardStats, WebsiteContent } from '../types/index.ts';
import { api } from '../services/api.ts';
import { getAssetUrl } from '../utils/assets.ts';
import {
  Building2,
  Home as HomeIcon,
  TrendingUp,
  Hammer,
  ArrowRight,
  Shield,
  Award,
  Sparkles,
  Handshake,
  Compass,
  MapPin,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [cms, setCms] = useState<WebsiteContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [projData, cmsData] = await Promise.all([
          api.getProjects(undefined, false),
          api.getCMS()
        ]);
        setProjects(projData.slice(0, 4));
        setCms(cmsData);
      } catch (err) {
        console.error('Failed to load home data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  return (
    <div className="w-full">
      {/* 1. HERO SECTION (Refined visual transition, deep navy background, elegant typography, generous whitespace) */}
      <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center bg-[#071A33] text-white overflow-hidden border-b border-slate-200">
        {/* Subtle architectural imagery with gentle single-tone scrim */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={getAssetUrl('assets/images/hero_hopeland_architecture_1790880040767.jpg')}
            alt="Hopeland Estates Architecture"
            className="w-full h-full object-cover object-center opacity-25"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071A33]/90 via-[#071A33]/80 to-[#071A33]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-28 text-center flex flex-col items-center">
          {/* Subtle gold institutional kicker */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-6 h-[1px] bg-[#C49A32]" />
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#C49A32] uppercase font-sans">
              Hopeland Estates and Realty Corporation
            </span>
            <span className="w-6 h-[1px] bg-[#C49A32]" />
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.18] max-w-4xl mb-6 text-balance">
            {cms?.hero.headline || 'Building Strong Foundations for Better Tomorrows.'}
          </h1>

          {/* Supporting description */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-10 font-normal font-sans">
            {cms?.hero.subheadline ||
              'Creating meaningful real estate opportunities through responsible development, quality construction, and strategic property investments.'}
          </p>

          {/* Clean Dual CTAs (Button height: 40-42px, clean padding) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('/projects')}
              className="w-full sm:w-auto h-[44px] px-8 bg-[#C49A32] hover:bg-[#D8B65B] text-[#0B2345] text-xs font-semibold tracking-wider uppercase transition-colors rounded shadow-xs flex items-center justify-center gap-2 group whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>{cms?.hero.ctaPrimary || 'Explore Our Developments'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('/investment')}
              className="w-full sm:w-auto h-[44px] px-8 bg-transparent hover:bg-white/[0.08] text-white border border-slate-300/60 hover:border-white text-xs font-semibold tracking-wider uppercase transition-colors rounded whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A32]"
            >
              {cms?.hero.ctaSecondary || 'Partner With Us'}
            </button>
          </div>
        </div>
      </section>

      {/* 2. COMPANY HIGHLIGHTS (4 Pillars) */}
      <section className="bg-white border-y border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4 p-4 rounded hover:bg-slate-50 transition-colors">
              <div className="p-3 bg-[#0B2345] text-[#D8B65B] rounded shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#0B2345] font-serif mb-1">
                  Real Estate Development
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Strategic horizontal and vertical planning across high-potential growth corridors in Luzon.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded hover:bg-slate-50 transition-colors">
              <div className="p-3 bg-[#0B2345] text-[#D8B65B] rounded shrink-0">
                <HomeIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#0B2345] font-serif mb-1">
                  Residential Communities
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Modern gated enclaves, contemporary villas, and secure family subdivisions designed for generations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded hover:bg-slate-50 transition-colors">
              <div className="p-3 bg-[#0B2345] text-[#D8B65B] rounded shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#0B2345] font-serif mb-1">
                  Property Investment
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Disciplined underwriting, landowner joint venture structures, and institutional-grade real estate assets.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded hover:bg-slate-50 transition-colors">
              <div className="p-3 bg-[#0B2345] text-[#D8B65B] rounded shrink-0">
                <Hammer className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#0B2345] font-serif mb-1">
                  Construction & Engineering
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Rigorous civil works, storm-resilient underground utilities, and quality structural execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORPORATE INTRODUCTION */}
      <section className="py-20 bg-[#F7F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block">
                <span className="text-xs font-semibold tracking-widest text-[#C49A32] uppercase">
                  {cms?.introduction.kicker || 'Corporate Overview'}
                </span>
                <div className="h-0.5 w-12 bg-[#C49A32] mt-1" />
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0B2345] leading-tight">
                {cms?.introduction.title || 'About Hopeland Estates and Realty Corporation'}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {cms?.introduction.paragraph1 ||
                  'Hopeland Estates and Realty Corporation operates as an institutional Philippine property development firm. We partner with reputable landowners, institutional investors, and local communities to conceptualize, design, and deliver masterplanned residential, commercial, and agricultural developments.'}
              </p>

              <p className="text-sm text-slate-600 leading-relaxed">
                {cms?.introduction.paragraph2 ||
                  'With deep development presence in Pampanga, Batangas, and the Greater Manila growth perimeter, we emphasize structural integrity, title transparency, and long-term socioeconomic stewardship.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A32]" />
                  <span>Licensed Real Estate Practice & Corporate Governance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A32]" />
                  <span>Equitable Landowner Joint Venture Frameworks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A32]" />
                  <span>Institutional Engineering & Masterplanning Standards</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A32]" />
                  <span>Transparent Legal, Zoning & Title Auditing</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => onNavigate('/about')}
                  className="px-6 py-3 bg-[#0B2345] hover:bg-[#163A63] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
                >
                  Read Corporate Background
                </button>
                <button
                  onClick={() => onNavigate('/services')}
                  className="px-6 py-3 border border-slate-300 hover:border-[#0B2345] text-[#0B2345] text-xs font-semibold uppercase tracking-wider rounded transition-colors"
                >
                  Our Divisions
                </button>
              </div>
            </div>

            {/* Visual Corporate Card */}
            <div className="lg:col-span-5 relative">
              <div className="bg-[#0B2345] text-white p-8 rounded-lg shadow-xl relative overflow-hidden border border-[#163A63]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C49A32]/10 rounded-full blur-2xl" />
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3">
                    <HopelandLogo variant="symbol" inverted height={40} />
                    <div>
                      <h4 className="font-serif font-bold text-lg text-white">HOPELAND</h4>
                      <p className="text-[10px] text-[#C49A32] tracking-wider uppercase">Estates and Realty Corporation</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-700/80 pt-4 space-y-4 text-xs text-slate-300">
                    <div>
                      <span className="text-[#C49A32] block font-semibold text-[11px] uppercase tracking-wider mb-1">
                        Corporate Headquarters
                      </span>
                      <p>Clark Freeport Zone & Mabalacat Growth Corridor, Pampanga</p>
                    </div>
                    <div>
                      <span className="text-[#C49A32] block font-semibold text-[11px] uppercase tracking-wider mb-1">
                        Development Scope
                      </span>
                      <p>Horizontal Communities, Commercial Hubs, Sustainable Agribusiness Estates & Hospitality</p>
                    </div>
                    <div>
                      <span className="text-[#C49A32] block font-semibold text-[11px] uppercase tracking-wider mb-1">
                        Institutional Governance
                      </span>
                      <p>Direct Board Oversight, Complete Land Title Verification, and Regulatory Compliance</p>
                    </div>
                  </div>

                  <div className="p-3 bg-[#07172F] rounded border border-slate-700 text-center">
                    <p className="text-[11px] font-serif text-[#D8B65B] italic">
                      "Building Strong Foundations for Better Tomorrows."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS PORTFOLIO */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#C49A32] uppercase">
                Portfolio Showcase
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2345] mt-1">
                Featured Developments & Masterplans
              </h2>
              <p className="text-xs text-slate-500 mt-2 max-w-xl">
                Explore our strategic development opportunities across Pampanga, Batangas, and Rizal.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/projects')}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-semibold text-[#0B2345] hover:text-[#C49A32] uppercase tracking-wider transition-colors"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => onNavigate(`/projects/${proj.slug}`)}
                className="group cursor-pointer bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Project Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                  <img
                    src={getAssetUrl(proj.featuredImage)}
                    alt={proj.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Clean unboxed metadata separator */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="font-semibold text-[#D8B65B]">{proj.category}</span>
                    <span className="text-slate-300 font-mono text-[11px]">{proj.stage}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Clean unboxed metadata kicker */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#C49A32]" />
                        <span>{proj.location}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{proj.indicativeLandArea}</span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-[#0B2345] group-hover:text-[#C49A32] transition-colors leading-snug">
                      {proj.name}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-amber-800 font-medium italic truncate max-w-[240px]">
                      {proj.statusText}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#0B2345] group-hover:translate-x-1 transition-transform">
                      <span>View Project</span>
                      <ChevronRight className="w-4 h-4 text-[#C49A32]" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OUR BUSINESS DIVISIONS */}
      <section className="py-20 bg-[#F7F8FA] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest text-[#C49A32] uppercase">
              Corporate Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2345] mt-1">
              Our Business Divisions
            </h2>
            <p className="text-xs text-slate-600 mt-2">
              Comprehensive real estate services covering the complete property lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded border border-slate-200/80 shadow-sm hover:border-[#C49A32] transition-colors">
              <h3 className="text-base font-serif font-bold text-[#0B2345] mb-2">
                01. Land Acquisition & Masterplanning
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strategic site assessment, title diligence, zoning clearance, and masterplan layout optimization for large acreage.
              </p>
            </div>

            <div className="bg-white p-6 rounded border border-slate-200/80 shadow-sm hover:border-[#C49A32] transition-colors">
              <h3 className="text-base font-serif font-bold text-[#0B2345] mb-2">
                02. Residential Subdivision Development
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Horizontal land development, road network paving, underground utilities, and contemporary residential house packages.
              </p>
            </div>

            <div className="bg-white p-6 rounded border border-slate-200/80 shadow-sm hover:border-[#C49A32] transition-colors">
              <h3 className="text-base font-serif font-bold text-[#0B2345] mb-2">
                03. Commercial & Office Parks
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Grade-A office towers, business parks, and mixed-use retail plazas aligned with Clark special economic zone growth.
              </p>
            </div>

            <div className="bg-white p-6 rounded border border-slate-200/80 shadow-sm hover:border-[#C49A32] transition-colors">
              <h3 className="text-base font-serif font-bold text-[#0B2345] mb-2">
                04. Sustainable Agro-Industrial Estates
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Innovative large-scale masterplans integrating cacao, coffee, smart greenhouses, solar generation, and post-harvest logistics.
              </p>
            </div>

            <div className="bg-white p-6 rounded border border-slate-200/80 shadow-sm hover:border-[#C49A32] transition-colors">
              <h3 className="text-base font-serif font-bold text-[#0B2345] mb-2">
                05. Joint Venture Partnerships
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Equitable partnership structures pairing landowners with corporate development capital and professional execution.
              </p>
            </div>

            <div className="bg-white p-6 rounded border border-slate-200/80 shadow-sm hover:border-[#C49A32] transition-colors">
              <h3 className="text-base font-serif font-bold text-[#0B2345] mb-2">
                06. Hospitality & Healthcare Campuses
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialized concepts in eco-resort mountain villas and three-tower elderly medical care hospitality campuses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY HOPELAND (Corporate Core Values) */}
      <section className="py-20 bg-[#0B2345] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest text-[#D8B65B] uppercase">
              Corporate Creed
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Why Hopeland Estates
            </h2>
            <p className="text-xs text-slate-300 mt-2">
              Our core principles guide every masterplan, investment underwriting, and community we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
            <div className="p-6 bg-[#07172F] rounded border border-[#163A63] space-y-3">
              <Shield className="w-8 h-8 text-[#C49A32] mx-auto" />
              <h3 className="text-base font-serif font-bold text-white">Integrity</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Uncompromising corporate governance, clear title audits, and ethical business dealings.
              </p>
            </div>

            <div className="p-6 bg-[#07172F] rounded border border-[#163A63] space-y-3">
              <Award className="w-8 h-8 text-[#C49A32] mx-auto" />
              <h3 className="text-base font-serif font-bold text-white">Quality</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Superior structural standards, enduring architectural materials, and disciplined engineering.
              </p>
            </div>

            <div className="p-6 bg-[#07172F] rounded border border-[#163A63] space-y-3">
              <Sparkles className="w-8 h-8 text-[#C49A32] mx-auto" />
              <h3 className="text-base font-serif font-bold text-white">Innovation</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Integration of clean solar power, water impounding, and modern sustainable utilities.
              </p>
            </div>

            <div className="p-6 bg-[#07172F] rounded border border-[#163A63] space-y-3">
              <Handshake className="w-8 h-8 text-[#C49A32] mx-auto" />
              <h3 className="text-base font-serif font-bold text-white">Strategic Alliances</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Equitable joint ventures unlocking dormant value for Philippine landowners and capital partners.
              </p>
            </div>

            <div className="p-6 bg-[#07172F] rounded border border-[#163A63] space-y-3">
              <Compass className="w-8 h-8 text-[#C49A32] mx-auto" />
              <h3 className="text-base font-serif font-bold text-white">Long-Term Value</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Creating generational wealth and lasting community pride for families and investors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CORPORATE CTA */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <HopelandLogo variant="symbol" height={50} className="mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B2345]">
            Let's Build Tomorrow Together.
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Whether you are a landowner seeking an institutional joint venture, a capital partner exploring Philippine growth corridors, or an aspiring homeowner looking for a secure foundation, HopeLand is ready to partner with you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('/investment')}
              className="px-8 py-3.5 bg-[#C49A32] hover:bg-[#D8B65B] text-[#0B2345] text-xs font-semibold uppercase tracking-wider rounded shadow transition-colors"
            >
              Inquire About Investment
            </button>
            <button
              onClick={() => onNavigate('/landowners')}
              className="px-8 py-3.5 bg-[#0B2345] hover:bg-[#163A63] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
            >
              Submit Property For Development
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className="px-8 py-3.5 border border-slate-300 hover:border-[#0B2345] text-[#0B2345] text-xs font-semibold uppercase tracking-wider rounded transition-colors"
            >
              Contact Corporate Office
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
