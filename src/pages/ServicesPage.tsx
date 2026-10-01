import React from 'react';
import { getAssetUrl } from '../utils/assets.ts';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const primaryServices = [
    {
      id: 'real-estate-dev',
      index: '01',
      title: 'Real Estate Development',
      subtitle: 'Masterplanned Communities & Strategic Land Transformation',
      image: 'images/services/real-estate-development-aerial.jpg',
      alt: 'Aerial masterplanned Philippine development with organized road networks and residential zones',
      description:
        'End-to-end property development taking strategic raw acreage through concept formulation, zoning compliance, horizontal infrastructure delivery, and community completion.',
      scope:
        'Masterplanned residential subdivisions, commercial corridors, and agro-industrial estates across Pampanga, Batangas, and Rizal.',
      capabilities: [
        'Macro-level community masterplanning and land-use zoning',
        'Topographical & hydrological civil engineering integration',
        'Statutory permitting and regulatory compliance',
        'Integrated road networks, drainage, and utility trunklines'
      ],
      ctaPath: '/projects',
      ctaLabel: 'Explore Developments'
    },
    {
      id: 'construction-engineering',
      index: '02',
      title: 'Construction & Engineering',
      subtitle: 'Structural Integrity, Civil Works & Site Execution',
      image: 'images/services/construction-and-structural-engineering.jpg',
      alt: 'Contemporary Philippine construction project showing structural engineering and site coordination',
      description:
        'Disciplined civil and vertical engineering operations executing earthworks, reinforced-concrete structures, storm drainage systems, and arterial road networks to strict building standards.',
      scope:
        'Horizontal subdivision grading, underground utility installation, commercial building construction, and modern tropical residences.',
      capabilities: [
        'Precision structural engineering and concrete execution',
        'Engineered stormwater retention and flood-mitigation systems',
        'Quality Assurance / Quality Control (QA/QC) site audits',
        'Strict occupational safety and engineering governance'
      ],
      ctaPath: '/contact',
      ctaLabel: 'Inquire With Engineering'
    },
    {
      id: 'land-acquisition',
      index: '03',
      title: 'Land Acquisition & Due Diligence',
      subtitle: 'Geodetic Surveying, Title Verification & Strategic Assembly',
      image: 'images/services/land-acquisition-and-surveying.jpg',
      alt: 'Surveyed Philippine development land with professional geodetic surveying equipment and topographic terrain',
      description:
        'Identifying, auditing, and assembling contiguous landholdings along national expressways, freeport gateways, and provincial growth corridors.',
      scope:
        'Title authenticity verification, geodetic boundary surveys, agricultural reclassification, and right-of-way planning.',
      capabilities: [
        'Comprehensive title verification with Registry of Deeds & LRA',
        'Geodetic boundary relocation and topographical surveying',
        'Zoning reclassification and environmental clearance coordination',
        'Equitable landowner joint venture structuring'
      ],
      ctaPath: '/landowners',
      ctaLabel: 'Submit Landholding'
    },
    {
      id: 'architectural-masterplanning',
      index: '04',
      title: 'Architectural Masterplanning',
      subtitle: 'Spatial Zoning, Circulation & Sustainable Tropical Design',
      image: 'images/services/architectural-masterplanning-model.jpg',
      alt: 'Sophisticated architectural site model with roads, building clusters, and landscaped spaces',
      description:
        'Designing cohesive architectural masterplans that balance residential privacy, commercial vitality, pedestrian greenbelts, and long-term environmental resilience.',
      scope:
        'Subdivision lotting schematics, commercial campus layouts, resort site integration, and healthcare facility planning.',
      capabilities: [
        '3D architectural visualization and physical scale modeling',
        'Climate-responsive modern tropical residential typologies',
        'Balanced open-space, park, and amenity allocation',
        'Phased development staging for optimal capital deployment'
      ],
      ctaPath: '/projects',
      ctaLabel: 'View Masterplans'
    },
    {
      id: 'sales-marketing',
      index: '05',
      title: 'Property Sales & Marketing',
      subtitle: 'Showroom Presentation, Brokerage & Buyer Advisory',
      image: 'images/services/property-sales-and-presentation-gallery.jpg',
      alt: 'Elegant modern property presentation gallery with architectural models and real estate materials',
      description:
        'Curated property presentation, accredited brokerage governance, and transparent buyer documentation connecting qualified homeowners and investors with HopeLand assets.',
      scope:
        'Residential lot releases, executive house-and-lot packages, commercial office leasing, and international buyer briefings.',
      capabilities: [
        'Architectural presentation galleries and project dossiers',
        'Accredited real estate broker network coordination',
        'Transparent reservation, contract, and escrow documentation',
        'End-buyer bank financing coordination'
      ],
      ctaPath: '/properties',
      ctaLabel: 'Browse Property Inventory'
    },
    {
      id: 'investment-partnerships',
      index: '06',
      title: 'Institutional Investment Partnerships',
      subtitle: 'Co-Development SPVs & Capital Underwriting',
      image: 'images/services/institutional-investment-partnerships.jpg',
      alt: 'Premium commercial development and corporate investment environment in Clark Freeport Zone',
      description:
        'Structuring transparent special-purpose vehicles (SPVs) and joint venture partnerships that align institutional capital and landowners with disciplined development execution.',
      scope:
        'Commercial office parks, integrated medical hospitality campuses, large-scale residential estates, and agro-industrial hubs.',
      capabilities: [
        'Project feasibility underwriting and sensitivity modeling',
        'Ring-fenced joint venture SPV corporate governance',
        'Revenue-share and developed-area allocation frameworks',
        'Audited milestone reporting and executive oversight'
      ],
      ctaPath: '/investment',
      ctaLabel: 'Partner With Us'
    }
  ];

  const specializedDivisions = [
    {
      title: 'Residential Communities Division',
      image: 'images/projects/bikal-residential-pampanga.jpg',
      description:
        'Gated residential subdivisions and modern tropical single-detached homes designed for Filipino families.'
    },
    {
      title: 'Commercial & Business Parks Division',
      image: 'images/projects/clark-zion-prestige-park.jpg',
      description:
        'Grade-A corporate office towers, retail plazas, and mixed-use commercial hubs in special economic zones.'
    },
    {
      title: 'Hospitality & Eco-Resort Division',
      image: 'images/projects/dhenze-spacenest-mountain-resort.jpg',
      description:
        'Low-impact mountain eco-resorts and modular capsule retreats integrated into scenic natural terrain.'
    },
    {
      title: 'Healthcare & Senior Living Division',
      image: 'images/projects/integrated-elderly-care-campus.jpg',
      description:
        'Purpose-built assisted living, memory care, and medical hospitality campuses with barrier-free gardens.'
    }
  ];

  return (
    <div className="w-full bg-[#F7F8FA] text-[#17263A]">
      {/* Architectural Header Banner */}
      <section className="relative min-h-[340px] sm:min-h-[380px] flex items-center bg-[#071A33] text-white border-b border-[#163A63] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={getAssetUrl('images/services/architectural-masterplanning-model.jpg')}
            alt="Hopeland Estates Architectural Masterplanning and Development Capabilities"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#071A33]/95 via-[#0B2345]/85 to-[#0B2345]/45"
            aria-hidden="true"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10 w-full">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#C49A32]" />
              <span className="text-xs font-semibold tracking-[0.2em] text-[#D8B65B] uppercase">
                Integrated Real Estate Development Capabilities
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight text-balance">
              Our Professional Services
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              HopeLand Estates delivers disciplined execution across the complete real estate lifecycle—from geodetic land surveying and architectural masterplanning to structural engineering, sales presentation, and institutional co-development.
            </p>
          </div>
        </div>
      </section>

      {/* Primary 6 Core Services — Image-Led Editorial Rows */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {primaryServices.map((svc, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <article
                key={svc.id}
                className="bg-white rounded-[6px] border border-slate-200/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Architectural Visual Column */}
                <div
                  className={`lg:col-span-6 relative min-h-[280px] sm:min-h-[340px] bg-[#071A33] overflow-hidden ${
                    isReversed ? 'lg:order-2' : ''
                  }`}
                >
                  <img
                    src={getAssetUrl(svc.image)}
                    alt={svc.alt}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/75 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-white">
                    <span className="font-mono text-[#D8B65B] font-semibold">
                      {svc.index} · Core Capability
                    </span>
                    <span className="text-slate-200 text-[11px]">{svc.title}</span>
                  </div>
                </div>

                {/* Editorial Details Column */}
                <div
                  className={`lg:col-span-6 p-7 sm:p-10 flex flex-col justify-between space-y-6 ${
                    isReversed ? 'lg:order-1' : ''
                  }`}
                >
                  <div className="space-y-3">
                    <span className="text-xs font-semibold text-[#C49A32] uppercase tracking-[0.16em] block">
                      {svc.index}. {svc.subtitle}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2345] leading-snug">
                      {svc.title}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {svc.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100 text-xs">
                    <div>
                      <span className="font-semibold text-[#0B2345] uppercase tracking-wider block mb-1">
                        Operational Scope
                      </span>
                      <p className="text-slate-600 leading-relaxed">{svc.scope}</p>
                    </div>

                    <div>
                      <span className="font-semibold text-[#0B2345] uppercase tracking-wider block mb-2">
                        Key Deliverables
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                        {svc.capabilities.map((cap, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A32] shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onNavigate(svc.ctaPath)}
                      className="h-[42px] px-6 bg-[#0B2345] hover:bg-[#163A63] text-white text-xs font-semibold uppercase tracking-wider rounded-[4px] transition-colors inline-flex items-center gap-2 whitespace-nowrap"
                    >
                      <span>{svc.ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C49A32]" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Specialized Development Sectors */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-semibold text-[#C49A32] uppercase tracking-[0.18em] block mb-1">
              Sector Specialization
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2345]">
              Specialized Asset Divisions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specializedDivisions.map((div) => (
              <div
                key={div.title}
                onClick={() => onNavigate('/projects')}
                className="group cursor-pointer bg-[#F7F8FA] rounded-[5px] border border-slate-200 overflow-hidden hover:border-[#C49A32] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] w-full overflow-hidden bg-[#071A33]">
                    <img
                      src={getAssetUrl(div.image)}
                      alt={div.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="text-sm font-serif font-bold text-[#0B2345] group-hover:text-[#C49A32] transition-colors">
                      {div.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {div.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
