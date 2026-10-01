import React, { useEffect, useState } from 'react';
import { HopelandLogo } from '../components/HopelandLogo.tsx';
import { Project, Property, WebsiteContent } from '../types/index.ts';
import { api } from '../services/api.ts';
import { getAssetUrl } from '../utils/assets.ts';
import {
  Building2,
  Home as HomeIcon,
  ArrowRight,
  Shield,
  Award,
  Sparkles,
  Handshake,
  Compass,
  MapPin,
  CheckCircle2,
  Layers,
  Briefcase,
  PhoneCall,
  ShieldCheck
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

interface FeaturedCardSpec {
  id: string;
  slug: string;
  title: string;
  location: string;
  stageNote: string;
  description: string;
  image: string;
  category: string;
}

const FEATURED_DEVELOPMENT_CARDS: FeaturedCardSpec[] = [
  {
    id: 'proj-bikal',
    slug: 'bikal-residential-development',
    title: 'Bikal Residential',
    location: 'Bikal, Mabalacat, Pampanga',
    stageNote: 'Preliminary Planning',
    description: 'Contemporary Philippine gated residential community with landscaped boulevards and mountain vistas.',
    image: 'images/projects/bikal-residential-pampanga.jpg',
    category: 'Residential Community'
  },
  {
    id: 'proj-taysan',
    slug: 'taysan-integrated-masterplanned-development',
    title: 'Taysan Agro Estate',
    location: 'Taysan, Batangas',
    stageNote: 'Masterplan Concept',
    description: 'Large-scale agricultural estate with organized high-value crop zones and sustainable solar infrastructure.',
    image: 'images/projects/taysan-agro-industrial-estate.jpg',
    category: 'Agro-Industrial Masterplan'
  },
  {
    id: 'proj-clark',
    slug: 'clark-zion-prestige-park',
    title: 'Clark Zion Prestige Park',
    location: 'Clark Freeport Zone, Pampanga',
    stageNote: 'Concept & Underwriting',
    description: 'Premium commercial and institutional development with Grade-A modern corporate architecture.',
    image: 'images/projects/clark-zion-prestige-park.jpg',
    category: 'Commercial & Business Hub'
  },
  {
    id: 'proj-spacenest',
    slug: 'dhenze-spacenest-mountain-resort',
    title: 'SpaceNest Resort',
    location: 'Mascap, Rodriguez, Rizal',
    stageNote: 'Concept Development',
    description: 'Distinctive modular mountain resort architecture integrated into a natural tropical ridge landscape.',
    image: 'images/projects/dhenze-spacenest-mountain-resort.jpg',
    category: 'Hospitality & Eco-Retreat'
  },
  {
    id: 'proj-elderly',
    slug: 'integrated-elderly-care-facility',
    title: 'Integrated Elderly Care',
    location: 'Clark Freeport Zone, Pampanga',
    stageNote: 'Concept & Investment Planning',
    description: 'Sophisticated senior living and healthcare campus with barrier-free architecture and therapeutic gardens.',
    image: 'images/projects/integrated-elderly-care-campus.jpg',
    category: 'Institutional Healthcare'
  }
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [cms, setCms] = useState<WebsiteContent | null>(null);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [projData, propData, cmsData] = await Promise.all([
          api.getProjects(undefined, false),
          api.getProperties(),
          api.getCMS()
        ]);
        setProjects(projData);
        setProperties(propData.slice(0, 3));
        setCms(cmsData);
      } catch (err) {
        console.error('Failed to load home data:', err);
      }
    };
    loadHomeData();
  }, []);

  const serviceStripItems = [
    {
      title: 'Residential Communities',
      description: 'Modern living for stronger Philippine families.',
      icon: HomeIcon,
      path: '/projects'
    },
    {
      title: 'Commercial Developments',
      description: 'Dynamic spaces for business growth and opportunity.',
      icon: Building2,
      path: '/projects'
    },
    {
      title: 'Strategic Land Partnerships',
      description: 'Unlocking land value for shared prosperity.',
      icon: Handshake,
      path: '/landowners'
    },
    {
      title: 'Integrated Property Solutions',
      description: 'End-to-end development for sustainable communities.',
      icon: Layers,
      path: '/services'
    }
  ];

  return (
    <div className="w-full bg-[#F7F8FA] text-[#17263A]">
      {/* 1. PREMIUM ARCHITECTURAL HERO SECTION */}
      <section className="relative min-h-[520px] sm:min-h-[560px] lg:min-h-[600px] flex items-center bg-[#071A33] text-white overflow-hidden">
        {/* Full-Width Architectural Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={getAssetUrl('images/home/masterplanned-philippine-development-hero.jpg')}
            alt="Aerial perspective of Hopeland Estates masterplanned Philippine development"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {/* Directional Deep Navy Gradient Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#071A33]/95 via-[#0B2345]/82 to-[#0B2345]/25"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#071A33]/85 via-transparent to-[#071A33]/30"
            aria-hidden="true"
          />
        </div>

        {/* Left-Aligned Institutional Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-[640px] space-y-5 sm:space-y-6 text-left">
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#C49A32]" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#D8B65B] uppercase font-sans">
                HOPELAND ESTATES AND REALTY CORPORATION
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] font-serif font-bold text-white tracking-tight leading-[1.16] uppercase text-balance">
              BUILDING STRONG FOUNDATIONS FOR{' '}
              <span className="text-[#C49A32]">BETTER TOMORROWS.</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal font-sans max-w-[580px]">
              Creating meaningful real estate opportunities through responsible development, quality construction, and strategic property investments across prime Philippine growth corridors.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <button
                onClick={() => onNavigate('/projects')}
                className="h-[46px] px-7 bg-[#C49A32] hover:bg-[#D8B65B] text-[#0B2345] text-xs font-bold tracking-[0.12em] uppercase transition-colors rounded-[4px] flex items-center justify-center gap-2.5 group whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>EXPLORE OUR DEVELOPMENTS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('/investment')}
                className="h-[46px] px-7 bg-[#071A33]/50 hover:bg-white/[0.12] text-white border border-white/60 hover:border-white text-xs font-semibold tracking-[0.12em] uppercase transition-colors rounded-[4px] flex items-center justify-center whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A32]"
              >
                PARTNER WITH US
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PREMIUM CORPORATE SERVICES STRIP */}
      <section className="bg-white border-b border-slate-200/90 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80">
            {serviceStripItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  onClick={() => onNavigate(item.path)}
                  className="py-7 px-4 sm:px-6 first:pl-0 lg:first:pl-2 last:pr-0 lg:last:pr-2 flex items-start gap-4 cursor-pointer group hover:bg-[#F7F8FA]/80 transition-colors"
                >
                  <div className="w-11 h-11 rounded-[4px] bg-[#0B2345] text-[#C49A32] group-hover:bg-[#163A63] transition-colors flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h2 className="text-xs font-serif font-bold uppercase tracking-wider text-[#0B2345] group-hover:text-[#C49A32] transition-colors leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-xs text-[#697586] leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. PREMIUM FEATURED DEVELOPMENTS SECTION (All 5 Distinctive Original Visuals) */}
      <section className="py-16 sm:py-20 bg-[#F7F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-slate-200 pb-5">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[#C49A32] uppercase block">
                Masterplanned Portfolio · Preliminary & Concept Developments
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2345] tracking-tight uppercase">
                FEATURED DEVELOPMENTS
              </h2>
            </div>

            <button
              onClick={() => onNavigate('/projects')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0B2345] hover:text-[#C49A32] uppercase tracking-[0.14em] transition-colors group self-start sm:self-auto whitespace-nowrap"
            >
              <span>VIEW ALL PROJECTS</span>
              <ArrowRight className="w-4 h-4 text-[#C49A32] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Primary Row: 3 Flagship Developments */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-7">
            {FEATURED_DEVELOPMENT_CARDS.slice(0, 3).map((card) => {
              const matchedProject = projects.find((p) => p.slug === card.slug);
              const imageSrc = getAssetUrl(matchedProject?.featuredImage || card.image);

              return (
                <article
                  key={card.id}
                  onClick={() => onNavigate(`/projects/${card.slug}`)}
                  className="group relative h-[380px] sm:h-[400px] rounded-[5px] overflow-hidden bg-[#071A33] cursor-pointer border border-slate-200/80 flex flex-col justify-end"
                >
                  <img
                    src={imageSrc}
                    alt={`${card.title} architectural perspective`}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />

                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#071A33]/95 via-[#0B2345]/55 to-transparent transition-opacity duration-300"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 p-6 sm:p-7 space-y-2 text-white">
                    {/* Clean unboxed metadata */}
                    <div className="flex items-center gap-2 text-[11px] font-medium tracking-wider uppercase text-[#D8B65B]">
                      <span>{card.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-300">{card.stageNote}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide leading-snug group-hover:text-[#D8B65B] transition-colors">
                      {card.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-[#C49A32] shrink-0" />
                      <span>{card.location}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed pb-2">
                      {card.description}
                    </p>

                    <div className="pt-2 border-t border-white/15 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#C49A32] group-hover:text-[#D8B65B] transition-colors">
                        <span>VIEW PROJECT DOSSIER</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Secondary Row: 2 Specialized Hospitality & Institutional Developments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {FEATURED_DEVELOPMENT_CARDS.slice(3, 5).map((card) => {
              const matchedProject = projects.find((p) => p.slug === card.slug);
              const imageSrc = getAssetUrl(matchedProject?.featuredImage || card.image);

              return (
                <article
                  key={card.id}
                  onClick={() => onNavigate(`/projects/${card.slug}`)}
                  className="group relative h-[320px] sm:h-[340px] rounded-[5px] overflow-hidden bg-[#071A33] cursor-pointer border border-slate-200/80 flex flex-col justify-end"
                >
                  <img
                    src={imageSrc}
                    alt={`${card.title} architectural visualization`}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />

                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#071A33]/95 via-[#0B2345]/50 to-transparent transition-opacity duration-300"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 p-6 sm:p-7 space-y-2 text-white">
                    <div className="flex items-center gap-2 text-[11px] font-medium tracking-wider uppercase text-[#D8B65B]">
                      <span>{card.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-300">{card.stageNote}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide leading-snug group-hover:text-[#D8B65B] transition-colors">
                        {card.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-[#C49A32] shrink-0" />
                        <span>{card.location}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed max-w-xl pb-2">
                      {card.description}
                    </p>

                    <div className="pt-2 border-t border-white/15 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#C49A32] group-hover:text-[#D8B65B] transition-colors">
                        <span>VIEW PROJECT DOSSIER</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. EDITORIAL ABOUT SECTION (Two-Column Institutional Introduction with Bespoke Corporate Architecture Image) */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Institutional Company Introduction & Mission */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2.5">
                <span className="w-6 h-[2px] bg-[#C49A32]" />
                <span className="text-xs font-semibold tracking-[0.2em] text-[#C49A32] uppercase">
                  {cms?.introduction.kicker || 'Corporate Identity & Stewardship'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0B2345] leading-tight text-balance">
                {cms?.introduction.title || 'About Hopeland Estates and Realty Corporation'}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {cms?.introduction.paragraph1 ||
                  'Hopeland Estates and Realty Corporation is a Philippine-registered real estate development and property management firm. We partner with reputable landowners, institutional investors, and local communities to conceptualize, engineer, and deliver masterplanned residential, commercial, and agricultural estates.'}
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {cms?.introduction.paragraph2 ||
                  'Guided by corporate stewardship, engineering excellence, and institutional transparency, Hopeland bridges landowners, capital partners, and end-users across Pampanga, Batangas, and Rizal.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-xs sm:text-sm font-medium text-[#17263A]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A32] shrink-0" />
                  <span>SEC Reg. No. 2026090269825-01</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A32] shrink-0" />
                  <span>Equitable Landowner Joint Ventures</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A32] shrink-0" />
                  <span>Institutional Engineering & Masterplanning</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A32] shrink-0" />
                  <span>Rigorous Title & Zoning Due Diligence</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('/about')}
                  className="h-[44px] px-6 bg-[#0B2345] hover:bg-[#163A63] text-white text-xs font-semibold uppercase tracking-wider rounded-[4px] transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <span>Read Corporate Profile</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C49A32]" />
                </button>
                <button
                  onClick={() => onNavigate('/services')}
                  className="h-[44px] px-6 border border-slate-300 hover:border-[#0B2345] text-[#0B2345] text-xs font-semibold uppercase tracking-wider rounded-[4px] transition-colors whitespace-nowrap"
                >
                  Explore Capabilities
                </button>
              </div>
            </div>

            {/* Right Column: Bespoke Architectural Visual & Corporate Dossier Panel */}
            <div className="lg:col-span-6">
              <div className="bg-[#0B2345] text-white rounded-[6px] overflow-hidden border border-[#163A63]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={getAssetUrl('images/about/institutional-corporate-stewardship.jpg')}
                    alt="Hopeland Estates Corporate Architecture and Civic Plaza"
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2345] via-[#0B2345]/25 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px]">
                    <span className="font-semibold uppercase tracking-[0.18em] text-[#D8B65B]">
                      Institutional Stewardship
                    </span>
                    <span className="text-slate-200 font-mono">SEC Reg. No. 2026090269825-01</span>
                  </div>
                </div>

                <div className="p-7 space-y-5">
                  <div className="flex items-start gap-4 border-b border-white/10 pb-5">
                    <HopelandLogo variant="compact" height={48} className="shrink-0" />
                    <div>
                      <h3 className="font-serif font-bold text-base text-white tracking-wide">
                        HOPELAND ESTATES AND REALTY CORPORATION
                      </h3>
                      <p className="text-xs text-[#D8B65B] mt-0.5">
                        Approved by the Securities and Exchange Commission (SEC) · Philippines
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-[4px] bg-[#071A33]/70 border border-white/10 space-y-1">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C49A32] block">
                        Corporate Vision
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        Transforming strategic Philippine land into resilient, sustainable, and thriving communities.
                      </p>
                    </div>
                    <div className="p-4 rounded-[4px] bg-[#071A33]/70 border border-white/10 space-y-1">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C49A32] block">
                        Growth Corridors
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        Clark Freeport Zone, Mabalacat (Pampanga), Taysan (Batangas), and Rodriguez (Rizal).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AVAILABLE PROPERTIES & HOLDINGS SHOWCASE */}
      {properties.length > 0 && (
        <section className="py-20 bg-[#F7F8FA] border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-slate-200 pb-4">
              <div>
                <span className="text-[11px] font-semibold tracking-[0.2em] text-[#C49A32] uppercase block mb-1">
                  Real Estate Offerings
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2345] tracking-tight uppercase">
                  FEATURED PROPERTY INVENTORY
                </h2>
              </div>

              <button
                onClick={() => onNavigate('/properties')}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#0B2345] hover:text-[#C49A32] uppercase tracking-[0.14em] transition-colors group self-start sm:self-auto whitespace-nowrap"
              >
                <span>BROWSE ALL LISTINGS</span>
                <ArrowRight className="w-4 h-4 text-[#C49A32] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {properties.map((prop) => (
                <div
                  key={prop.id}
                  onClick={() => onNavigate(`/properties/${prop.slug}`)}
                  className="group cursor-pointer bg-white border border-slate-200/90 rounded-[5px] overflow-hidden hover:border-[#C49A32] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#071A33]">
                      <img
                        src={getAssetUrl(prop.featuredImage)}
                        alt={prop.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/85 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                        <span className="font-semibold text-[#D8B65B]">{prop.category}</span>
                        <span className="text-[11px] text-slate-200">{prop.status}</span>
                      </div>
                    </div>

                    <div className="p-6 space-y-2.5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-[#C49A32] shrink-0" />
                        <span className="truncate">{prop.location}</span>
                      </div>

                      <h3 className="text-lg font-serif font-bold text-[#0B2345] group-hover:text-[#C49A32] transition-colors leading-snug">
                        {prop.title}
                      </h3>

                      <div className="text-base font-bold text-[#0B2345] font-mono tabular-nums">
                        {prop.currency} {prop.price.toLocaleString('en-PH')}
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {prop.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-3.5 border-t border-slate-100 bg-[#F7F8FA] flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono tabular-nums">{prop.lotArea.toLocaleString()} sqm lot</span>
                    <span className="inline-flex items-center gap-1 font-bold text-[#0B2345] group-hover:text-[#C49A32] uppercase tracking-wider text-[11px]">
                      <span>View Property</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C49A32]" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. INSTITUTIONAL INVESTMENT & LANDOWNER PARTNERSHIP BANNER */}
      <section className="py-20 bg-[#0B2345] text-white border-t border-[#163A63] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2.5">
                <span className="w-6 h-[2px] bg-[#C49A32]" />
                <span className="text-xs font-semibold tracking-[0.2em] text-[#D8B65B] uppercase">
                  Strategic Co-Development & Capital Alliances
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight text-balance">
                Partner With HopeLand Estates for Sustainable Land Transformation
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Whether you are a landowner seeking to unlock the long-term potential of contiguous family acreage or an institutional investor evaluating Philippine real estate corridors, HopeLand provides transparent governance and end-to-end engineering execution.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('/investment')}
                  className="h-[46px] px-7 bg-[#C49A32] hover:bg-[#D8B65B] text-[#0B2345] text-xs font-bold uppercase tracking-[0.12em] rounded-[4px] transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <span>Explore Investment Partnerships</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('/landowners')}
                  className="h-[46px] px-7 bg-transparent hover:bg-white/[0.08] text-white border border-white/50 hover:border-white text-xs font-semibold uppercase tracking-[0.12em] rounded-[4px] transition-colors whitespace-nowrap"
                >
                  Submit Landholding for Appraisal
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => onNavigate('/investment')}
                className="group cursor-pointer rounded-[5px] overflow-hidden bg-[#071A33] border border-[#163A63] hover:border-[#C49A32] transition-colors"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={getAssetUrl('images/investment/institutional-capital-commercial-corridor.jpg')}
                    alt="Institutional Capital & Commercial Corridors"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5 space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C49A32] block">
                    Capital Partners
                  </span>
                  <h3 className="text-sm font-serif font-bold text-white">
                    Joint Venture & SPV Structuring
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Disciplined underwriting and project-level governance across high-growth corridors.
                  </p>
                </div>
              </div>

              <div
                onClick={() => onNavigate('/landowners')}
                className="group cursor-pointer rounded-[5px] overflow-hidden bg-[#071A33] border border-[#163A63] hover:border-[#C49A32] transition-colors"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={getAssetUrl('images/landowners/contiguous-philippine-landholding-survey.jpg')}
                    alt="Landowner Co-Development & Surveying"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5 space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C49A32] block">
                    Landowners
                  </span>
                  <h3 className="text-sm font-serif font-bold text-white">
                    Contiguous Land Transformation
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Turn raw agricultural or idle estates into masterplanned communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
