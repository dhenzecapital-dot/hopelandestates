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
  description: string;
  image: string;
  category: string;
}

const FEATURED_DEVELOPMENT_CARDS: FeaturedCardSpec[] = [
  {
    id: 'proj-bical',
    slug: 'bical-residential-development',
    title: 'Bical Residential',
    location: 'PAMPANGA',
    description: 'Modern gated living in a thriving community.',
    image: 'assets/images/project_bical_residential_1790880055584.jpg',
    category: 'Residential Community'
  },
  {
    id: 'proj-taysan',
    slug: 'taysan-integrated-masterplanned-development',
    title: 'Taysan Agro Estate',
    location: 'BATANGAS',
    description: 'Sustainable land development for a brighter future.',
    image: 'assets/images/project_taysan_agro_1790880068800.jpg',
    category: 'Agro-Industrial Masterplan'
  },
  {
    id: 'proj-clark',
    slug: 'clark-zion-prestige-park',
    title: 'Clark Zion Prestige Park',
    location: 'CLARK FREEPORT ZONE',
    description: 'Prime business and logistics hub in a strategic location.',
    image: 'assets/images/project_clark_prestige_1790880127374.jpg',
    category: 'Commercial & Business Hub'
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
      <section className="relative min-h-[490px] sm:min-h-[530px] lg:min-h-[560px] flex items-center bg-[#071A33] text-white overflow-hidden">
        {/* Full-Width Architectural Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={getAssetUrl('assets/images/hero_hopeland_architecture_1790880040767.jpg')}
            alt="Hopeland Estates Mixed-Use Architectural Development"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {/* Directional Deep Navy Gradient Overlay: strongest behind left text, revealing architecture on the right */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#071A33]/95 via-[#0B2345]/85 to-[#0B2345]/25"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#071A33]/80 via-transparent to-[#071A33]/30"
            aria-hidden="true"
          />
        </div>

        {/* Left-Aligned Institutional Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-[620px] space-y-5 sm:space-y-6 text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#C49A32]" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#D8B65B] uppercase font-sans">
                HOPELAND ESTATES AND REALTY CORPORATION
              </span>
            </div>

            {/* Main Serif Headline with "BETTER TOMORROWS." in Gold */}
            <h1 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] font-serif font-bold text-white tracking-tight leading-[1.16] uppercase">
              BUILDING STRONG FOUNDATIONS FOR{' '}
              <span className="text-[#C49A32]">BETTER TOMORROWS.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal font-sans max-w-[580px]">
              Creating meaningful real estate opportunities through responsible development, quality construction, and strategic property investments across prime Philippine growth corridors.
            </p>

            {/* Primary & Secondary CTAs */}
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

      {/* 3. PREMIUM FEATURED DEVELOPMENTS SECTION */}
      <section className="py-16 sm:py-20 bg-[#F7F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-slate-200 pb-4">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[#C49A32] uppercase block mb-1">
                Masterplanned Portfolio
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2345] tracking-tight uppercase">
                FEATURED DEVELOPMENTS
              </h2>
            </div>

            <button
              onClick={() => onNavigate('/projects')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0B2345] hover:text-[#C49A32] uppercase tracking-[0.14em] transition-colors group self-start sm:self-auto"
            >
              <span>VIEW ALL PROJECTS</span>
              <ArrowRight className="w-4 h-4 text-[#C49A32] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Three Large Image-Led Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {FEATURED_DEVELOPMENT_CARDS.map((card) => {
              const matchedProject = projects.find((p) => p.slug === card.slug);
              const imageSrc = getAssetUrl(matchedProject?.featuredImage || card.image);

              return (
                <article
                  key={card.id}
                  onClick={() => onNavigate(`/projects/${card.slug}`)}
                  className="group relative h-[380px] sm:h-[410px] rounded-[5px] overflow-hidden bg-[#071A33] cursor-pointer border border-slate-200/80 flex flex-col justify-end"
                >
                  {/* Landscape Architectural Photography */}
                  <img
                    src={imageSrc}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />

                  {/* Subtle Deep Navy Gradient Overlay at Bottom */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#071A33]/95 via-[#0B2345]/55 to-transparent transition-opacity duration-300"
                    aria-hidden="true"
                  />

                  {/* Top Category Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-2.5 py-1 bg-[#071A33]/85 backdrop-blur-xs text-[#D8B65B] text-[10px] font-semibold uppercase tracking-widest rounded-[3px] border border-white/10">
                      {card.category}
                    </span>
                  </div>

                  {/* Card Bottom Content */}
                  <div className="relative z-10 p-6 sm:p-7 space-y-2 text-white">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#D8B65B]">
                      <MapPin className="w-3.5 h-3.5 text-[#C49A32] shrink-0" />
                      <span>{card.location}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide leading-snug group-hover:text-[#D8B65B] transition-colors">
                      {card.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed pb-2">
                      {card.description}
                    </p>

                    <div className="pt-2 border-t border-white/15 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#C49A32] group-hover:text-[#D8B65B] transition-colors">
                        <span>VIEW PROJECT</span>
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

      {/* 4. EDITORIAL ABOUT SECTION (Two-Column Institutional Introduction) */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Institutional Company Introduction & Mission */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5">
                <span className="w-6 h-[2px] bg-[#C49A32]" />
                <span className="text-xs font-semibold tracking-[0.2em] text-[#C49A32] uppercase">
                  {cms?.introduction.kicker || 'Corporate Overview'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0B2345] leading-tight">
                {cms?.introduction.title || 'About Hopeland Estates and Realty Corporation'}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {cms?.introduction.paragraph1 ||
                  'Hopeland Estates and Realty Corporation operates as an institutional Philippine property development firm. We partner with reputable landowners, institutional investors, and local communities to conceptualize, design, and deliver masterplanned residential, commercial, and agricultural developments.'}
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {cms?.introduction.paragraph2 ||
                  'With deep development presence in Pampanga, Batangas, and the Greater Manila growth perimeter, we emphasize structural integrity, title transparency, and long-term socioeconomic stewardship.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-xs sm:text-sm font-medium text-[#17263A]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A32] shrink-0" />
                  <span>Licensed Real Estate Practice & Governance</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A32] shrink-0" />
                  <span>Equitable Landowner Joint Venture Frameworks</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A32] shrink-0" />
                  <span>Institutional Engineering & Masterplanning</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A32] shrink-0" />
                  <span>Transparent Legal, Zoning & Title Auditing</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('/about')}
                  className="h-[44px] px-6 bg-[#0B2345] hover:bg-[#163A63] text-white text-xs font-semibold uppercase tracking-wider rounded-[4px] transition-colors flex items-center gap-2"
                >
                  <span>Read Corporate Profile</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C49A32]" />
                </button>
                <button
                  onClick={() => onNavigate('/services')}
                  className="h-[44px] px-6 border border-slate-300 hover:border-[#0B2345] text-[#0B2345] text-xs font-semibold uppercase tracking-wider rounded-[4px] transition-colors"
                >
                  Explore Our Services
                </button>
              </div>
            </div>

            {/* Right Column: Architectural Visual & Corporate Dossier Panel */}
            <div className="lg:col-span-5">
              <div className="bg-[#0B2345] text-white rounded-[6px] overflow-hidden border border-[#163A63]">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={getAssetUrl('assets/images/project_spacenest_resort_1790880149657.jpg')}
                    alt="Hopeland Estates Architectural Planning"
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2345] via-[#0B2345]/30 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D8B65B]">
                      Institutional Profile
                    </span>
                    <span className="text-[11px] text-slate-300 font-mono">PH · Luzon Corridors</span>
                  </div>
                </div>

                <div className="p-7 space-y-5">
                  <div className="flex items-center gap-3.5 pb-4 border-b border-white/10">
                    <HopelandLogo variant="compact" height={44} />
                    <div>
                      <h3 className="font-serif font-bold text-sm text-white tracking-wide">
                        HOPELAND ESTATES
                      </h3>
                      <p className="text-[11px] text-[#C49A32] uppercase tracking-wider">
                        And Realty Corporation
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3.5 text-xs text-slate-300">
                    <div>
                      <span className="text-[#C49A32] block font-semibold text-[11px] uppercase tracking-wider mb-0.5">
                        Corporate Headquarters
                      </span>
                      <p>Clark Freeport Zone & Mabalacat Growth Corridor, Pampanga</p>
                    </div>
                    <div>
                      <span className="text-[#C49A32] block font-semibold text-[11px] uppercase tracking-wider mb-0.5">
                        Development Scope
                      </span>
                      <p>Masterplanned Residential Communities, Commercial Parks, Agro-Industrial Estates & Hospitality</p>
                    </div>
                    <div>
                      <span className="text-[#C49A32] block font-semibold text-[11px] uppercase tracking-wider mb-0.5">
                        Institutional Governance
                      </span>
                      <p>Direct Board Oversight, Complete Land Title Verification & Regulatory Compliance</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-[#071A33] rounded-[4px] border border-white/10 text-center">
                    <p className="text-xs font-serif text-[#D8B65B] italic">
                      "Building Strong Foundations for Better Tomorrows."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORPORATE DIVISIONS & SERVICES */}
      <section className="py-20 bg-[#F7F8FA] border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[#C49A32] uppercase block mb-1">
                Corporate Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2345] uppercase tracking-tight">
                Corporate Divisions & Services
              </h2>
              <p className="text-sm text-slate-600 mt-1.5 max-w-2xl">
                End-to-end property development expertise across site acquisition, civil engineering, residential communities, and commercial estates.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/services')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0B2345] hover:text-[#C49A32] uppercase tracking-[0.14em] transition-colors group self-start md:self-auto"
            >
              <span>VIEW ALL SERVICES</span>
              <ArrowRight className="w-4 h-4 text-[#C49A32] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: 'Land Acquisition & Masterplanning',
                desc: 'Strategic site assessment, title diligence, zoning clearance, and masterplan layout optimization for prime regional acreage.'
              },
              {
                num: '02',
                title: 'Residential Subdivision Development',
                desc: 'Horizontal land development, concrete road networks, underground utilities, and modern tropical residential communities.'
              },
              {
                num: '03',
                title: 'Commercial & Office Parks',
                desc: 'Contemporary office buildings, logistics hubs, and mixed-use commercial plazas aligned with Clark Freeport Zone growth.'
              },
              {
                num: '04',
                title: 'Sustainable Agro-Industrial Estates',
                desc: 'Large-scale masterplans integrating high-value agriculture, smart greenhouses, solar infrastructure, and processing hubs.'
              },
              {
                num: '05',
                title: 'Landowner Joint Venture Partnerships',
                desc: 'Equitable development structures pairing landowners with institutional capital, engineering execution, and project marketing.'
              },
              {
                num: '06',
                title: 'Hospitality & Healthcare Campuses',
                desc: 'Specialized architectural concepts for mountain eco-resorts and integrated retirement and wellness communities.'
              }
            ].map((div) => (
              <div
                key={div.num}
                onClick={() => onNavigate('/services')}
                className="bg-white p-7 rounded-[5px] border border-slate-200/90 hover:border-[#C49A32] transition-colors cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-[#C49A32] tracking-wider">
                      DIVISION {div.num}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#C49A32] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#0B2345] group-hover:text-[#C49A32] transition-colors mb-2">
                    {div.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {div.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROPERTY INVENTORY SHOWCASE */}
      {properties.length > 0 && (
        <section className="py-20 bg-white border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-slate-200 pb-4">
              <div>
                <span className="text-[11px] font-semibold tracking-[0.2em] text-[#C49A32] uppercase block mb-1">
                  Available Real Estate Offerings
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2345] uppercase tracking-tight">
                  PROPERTY INVENTORY
                </h2>
              </div>

              <button
                onClick={() => onNavigate('/properties')}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#0B2345] hover:text-[#C49A32] uppercase tracking-[0.14em] transition-colors group self-start sm:self-auto"
              >
                <span>BROWSE FULL INVENTORY</span>
                <ArrowRight className="w-4 h-4 text-[#C49A32] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {properties.map((prop) => (
                <div
                  key={prop.id}
                  onClick={() => onNavigate(`/properties/${prop.slug}`)}
                  className="group bg-[#F7F8FA] rounded-[5px] border border-slate-200/90 overflow-hidden cursor-pointer hover:border-[#C49A32] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-52 overflow-hidden bg-[#071A33]">
                      <img
                        src={getAssetUrl(prop.featuredImage)}
                        alt={prop.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#0B2345]/90 text-[#D8B65B] text-[10px] font-semibold uppercase tracking-wider rounded-[3px]">
                        {prop.category}
                      </div>
                      <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/95 text-[#0B2345] text-[10px] font-bold uppercase tracking-wider rounded-[3px]">
                        {prop.status}
                      </div>
                    </div>

                    <div className="p-6 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-[#C49A32] shrink-0" />
                        <span className="truncate">{prop.location}</span>
                      </div>
                      <h3 className="text-base font-serif font-bold text-[#0B2345] group-hover:text-[#C49A32] transition-colors line-clamp-1">
                        {prop.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {prop.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-white border-t border-slate-200/80 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Lot Area</span>
                      <span className="font-mono font-bold text-[#0B2345]">{prop.lotArea.toLocaleString()} sqm</span>
                    </div>
                    <span className="inline-flex items-center gap-1 font-bold text-[#0B2345] group-hover:text-[#C49A32] uppercase tracking-wider text-[11px]">
                      <span>Inquire</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C49A32]" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. INVESTMENT & LANDOWNER PARTNERSHIPS (Sophisticated Navy Background with Gold Accents) */}
      <section className="py-20 bg-[#0B2345] text-white border-t border-[#163A63]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Investment Opportunities Panel */}
            <div className="bg-[#071A33] border border-[#163A63] rounded-[6px] p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#C49A32]">
                  <Compass className="w-4 h-4" />
                  <span>Capital & Strategic Partnerships</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-snug">
                  Institutional Real Estate Investment Opportunities
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Hopeland Estates structures co-development and project-level participation across residential subdivisions, commercial hubs, and agro-industrial estates in Luzon's primary infrastructure corridors. All engagements are conducted through formal due diligence and transparent corporate governance.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/investment')}
                  className="h-[44px] px-6 bg-[#C49A32] hover:bg-[#D8B65B] text-[#0B2345] text-xs font-bold uppercase tracking-wider rounded-[4px] transition-colors inline-flex items-center gap-2"
                >
                  <span>Explore Investment Partnerships</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Landowner Joint Ventures Panel */}
            <div className="bg-[#071A33] border border-[#163A63] rounded-[6px] p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#C49A32]">
                  <Handshake className="w-4 h-4" />
                  <span>Landowner Joint Ventures</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-snug">
                  Unlock the Full Potential of Your Land Asset
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We partner with landowners holding raw or underutilized acreage in Pampanga, Batangas, Rizal, and surrounding provinces. Contribute your property into an equitable joint venture backed by Hopeland's masterplanning, engineering, and project delivery teams.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/landowners')}
                  className="h-[44px] px-6 bg-transparent hover:bg-white/[0.08] text-white border border-[#C49A32] hover:border-[#D8B65B] text-xs font-semibold uppercase tracking-wider rounded-[4px] transition-colors inline-flex items-center gap-2"
                >
                  <span>Submit Land for Joint Venture</span>
                  <ArrowRight className="w-4 h-4 text-[#C49A32]" />
                </button>
              </div>
            </div>
          </div>

          {/* Five Core Institutional Pillars */}
          <div className="pt-4 border-t border-white/10">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[#D8B65B] uppercase">
                Corporate Creed
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                Foundations of Our Institutional Practice
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 text-center">
              <div className="p-6 bg-[#071A33] rounded-[5px] border border-[#163A63] space-y-2.5">
                <Shield className="w-7 h-7 text-[#C49A32] mx-auto" />
                <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wide">Integrity</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Uncompromising corporate governance, clear title audits, and ethical business dealings.
                </p>
              </div>

              <div className="p-6 bg-[#071A33] rounded-[5px] border border-[#163A63] space-y-2.5">
                <Award className="w-7 h-7 text-[#C49A32] mx-auto" />
                <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wide">Quality</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Superior structural standards, enduring architectural materials, and disciplined engineering.
                </p>
              </div>

              <div className="p-6 bg-[#071A33] rounded-[5px] border border-[#163A63] space-y-2.5">
                <Sparkles className="w-7 h-7 text-[#C49A32] mx-auto" />
                <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wide">Innovation</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Integration of clean solar power, water impounding, and modern sustainable utilities.
                </p>
              </div>

              <div className="p-6 bg-[#071A33] rounded-[5px] border border-[#163A63] space-y-2.5">
                <Handshake className="w-7 h-7 text-[#C49A32] mx-auto" />
                <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wide">Alliances</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Equitable joint ventures unlocking long-term value for Philippine landowners and partners.
                </p>
              </div>

              <div className="p-6 bg-[#071A33] rounded-[5px] border border-[#163A63] space-y-2.5 sm:col-span-2 lg:col-span-1">
                <Compass className="w-7 h-7 text-[#C49A32] mx-auto" />
                <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wide">Stewardship</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Creating lasting community infrastructure for families, businesses, and regional economies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CAREERS, CONTACT & CORPORATE ENGAGEMENT CTA */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F7F8FA] border border-slate-200/90 rounded-[6px] p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[#C49A32] uppercase block">
                Connect With Hopeland Estates
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2345]">
                Let's Build Tomorrow Together.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Whether you are a landowner seeking an institutional joint venture, a capital partner exploring Philippine growth corridors, a professional pursuing a career in real estate development, or a prospective buyer, our executive team is ready to assist you.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 shrink-0">
              <button
                onClick={() => onNavigate('/contact')}
                className="h-[44px] px-6 bg-[#0B2345] hover:bg-[#163A63] text-white text-xs font-semibold uppercase tracking-wider rounded-[4px] transition-colors inline-flex items-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#C49A32]" />
                <span>Contact Office</span>
              </button>

              <button
                onClick={() => onNavigate('/careers')}
                className="h-[44px] px-5 bg-white hover:bg-slate-100 text-[#0B2345] border border-slate-300 text-xs font-semibold uppercase tracking-wider rounded-[4px] transition-colors inline-flex items-center gap-2"
              >
                <Briefcase className="w-3.5 h-3.5 text-[#C49A32]" />
                <span>Careers</span>
              </button>

              <button
                onClick={() => onNavigate('/admin/login')}
                className="h-[44px] px-5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-medium uppercase tracking-wider rounded-[4px] transition-colors inline-flex items-center gap-2"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C49A32]" />
                <span>Admin Control Center</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
