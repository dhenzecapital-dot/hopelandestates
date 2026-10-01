import React from 'react';
import {
  Building2,
  Home,
  Briefcase,
  Layers,
  Hammer,
  MapPin,
  TrendingUp,
  Shield,
  Handshake,
  Compass,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const services = [
    {
      id: 'real-estate-dev',
      title: 'A. Real Estate Development',
      icon: Building2,
      subtitle: 'Comprehensive Land Transformation & Community Masterplanning',
      description: 'End-to-end property development taking strategic raw acreage through rigorous concept formulation, architectural masterplanning, zoning compliance, infrastructure delivery, and asset completion.',
      scope: 'Large-scale horizontal subdivisions, industrial logistics corridors, and integrated township concepts across high-growth provincial hubs in the Philippines.',
      capabilities: [
        'Macro-level masterplanning and urban design',
        'Topographical & hydrological civil engineering analysis',
        'Government statutory permitting and HLURB/DHSUD compliance',
        'Comprehensive infrastructure and utility design'
      ]
    },
    {
      id: 'residential-dev',
      title: 'B. Residential Development',
      icon: Home,
      subtitle: 'Modern Gated Communities & Contemporary Living',
      description: 'Developing high-quality residential communities featuring modern tropical architecture, secure gated perimeters, paved avenues, underground utilities, and lifestyle clubhouse amenities.',
      scope: 'Masterplanned subdivisions, executive house-and-lot enclaves, and premium residential lot allotments with clean titles on hand.',
      capabilities: [
        'Single-detached modern tropical villa construction',
        'Subdivision lot titling and individual survey allocation',
        'Community clubhouses, pools, and recreational pavilions',
        '24/7 security guardhouse systems with smart RFID access'
      ]
    },
    {
      id: 'commercial-dev',
      title: 'C. Commercial Property Development',
      icon: Briefcase,
      subtitle: 'Prime Office Hubs & Retail Plazas',
      description: 'Strategic commercial development designed to support corporate offices, IT-BPO enterprises, retail flagships, and lifestyle dining destinations in economic special zones like Clark.',
      scope: 'Grade-A office buildings, business parks, strip retail corridors, and modern multi-level corporate pavilions.',
      capabilities: [
        'Grade-A corporate floor plate design with high floor-to-ceiling heights',
        'Dual-feed power substation and telecommunications redundancy',
        'Subterranean multi-level structured parking',
        'LEED Silver / BERDE green building design orientation'
      ]
    },
    {
      id: 'mixed-use-dev',
      title: 'D. Mixed-Use Development',
      icon: Layers,
      subtitle: 'Integrated Live-Work-Play Ecosystems',
      description: 'Synthesizing residential, commercial, leisure, and wellness components into self-contained urban clusters that foster vibrant community life and diversified revenue streams.',
      scope: 'Multi-tower corporate complexes, transit-oriented lifestyle centers, and medical-hospitality mixed developments.',
      capabilities: [
        'Synergistic land use allocation and pedestrian circulation planning',
        'Phased vertical development and commercial asset staging',
        'Shared utility efficiency and centralized management systems',
        'Integrated retail, hospitality, and healthcare components'
      ]
    },
    {
      id: 'construction-engineering',
      title: 'E. Construction & Engineering',
      icon: Hammer,
      subtitle: 'Rigorous Civil Works, Structural Integrity & Quality Execution',
      description: 'In-house and contractor-managed construction operations executing horizontal earthworks, storm drainage systems, road networks, and multi-storey vertical construction to strict international engineering codes.',
      scope: 'Horizontal road paving, underground utility trunklines, structural reinforced concrete works, and finish architectural fitouts.',
      capabilities: [
        'Heavy horizontal site grading and cut-and-fill optimization',
        'Engineered stormwater retention and flood-mitigation systems',
        'Comprehensive Quality Assurance / Quality Control (QA/QC) audits',
        'Strict site safety and Occupational Safety & Health (OSHA) compliance'
      ]
    },
    {
      id: 'land-acquisition',
      title: 'F. Land Acquisition & Development',
      icon: MapPin,
      subtitle: 'Unlocking High-Yield Strategic Topography',
      description: 'Proactively identifying, auditing, and acquiring prime land holdings along upcoming national infrastructure routes, expressways, and economic freeport gateways.',
      scope: 'Agricultural acreage reclassification, estate consolidation, right-of-way negotiation, and strategic landbanking.',
      capabilities: [
        'Comprehensive land title audits with the Registry of Deeds and LRA',
        'Agrarian reform (DAR) clearance and land conversion facilitation',
        'Boundary confirmation, geodetic surveys, and relocation verification',
        'Equitable landowner joint venture structuring'
      ]
    },
    {
      id: 'sales-marketing',
      title: 'G. Property Sales & Marketing',
      icon: TrendingUp,
      subtitle: 'Professional Brokerage & Investor Relations',
      description: 'Targeted corporate marketing campaigns, licensed real estate broker networks, and high-touch investor sales presentations ensuring rapid project absorption.',
      scope: 'Direct buyer sales, corporate leasing, international OFW roadshows, and institutional block sales.',
      capabilities: [
        'Digital project marketing, 3D renderings, and interactive walkthroughs',
        'Accredited broker training and commission governance',
        'Comprehensive escrow, contract management, and reservation handling',
        'Buyer financing facilitation through top commercial Philippine banks'
      ]
    },
    {
      id: 'property-management',
      title: 'H. Property Management',
      icon: Shield,
      subtitle: 'Preserving Asset Longevity & Community Value',
      description: 'Post-handover property administration maintaining physical plant facilities, common areas, landscape gardens, 24/7 security, and homeowner association governance.',
      scope: 'Residential subdivisions, commercial buildings, corporate parks, and shared amenity facilities.',
      capabilities: [
        'Preventive mechanical, electrical, and plumbing (MEP) maintenance',
        '24/7 security, CCTV monitoring, and access gate oversight',
        'HOA administration, collection, and transparent accounting',
        'Landscape horticulture and environmental upkeep'
      ]
    },
    {
      id: 'joint-venture',
      title: 'I. Investment & Joint Venture Partnerships',
      icon: Handshake,
      subtitle: 'Co-Development & Capital Structuring',
      description: 'Structuring win-win co-development agreements that allow property owners to contribute land while HopeLand provides capital, engineering, and execution expertise.',
      scope: 'Institutional equity participation, private family estate joint ventures, and capital syndications.',
      capabilities: [
        'Disciplined DCF, IRR, and NPV financial feasibility modeling',
        'Transparent joint venture special purpose vehicle (SPV) formation',
        'Revenue-share and area-allocation contractual agreements',
        'Comprehensive quarterly reporting and audited milestone distributions'
      ]
    },
    {
      id: 'hospitality-dev',
      title: 'J. Hospitality & Integrated Development',
      icon: Compass,
      subtitle: 'Eco-Resorts & Medical Hospitality Campuses',
      description: 'Conceptualizing destination hospitality assets, mountain retreats, and healthcare hospitality campuses designed for wellness, tourism, and long-term care.',
      scope: 'Modular space capsule mountain resorts, five-star hotel towers, and integrated elderly care sanctuaries.',
      capabilities: [
        'Eco-sensitive low-impact architecture in scenic mountain settings',
        'Specialized healthcare infrastructure and geriatric facility planning',
        'Resort membership program structuring and management',
        'Hotel operator partnership and brand affiliation integration'
      ]
    }
  ];

  return (
    <div className="w-full bg-[#F7F8FA]">
      {/* Header Banner */}
      <section className="bg-[#0B2345] text-white py-16 lg:py-20 border-b border-[#163A63]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-widest text-[#D8B65B] uppercase block mb-2">
              Corporate Capabilities & Divisions
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
              Our Professional Services
            </h1>
            <p className="text-base text-slate-300 leading-relaxed font-light">
              Hopeland Estates and Realty Corporation delivers disciplined real estate services across the complete development lifecycle—from land discovery and civil engineering to marketing and long-term asset management.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                className="bg-white rounded-lg border border-slate-200/90 shadow-sm p-6 sm:p-8 hover:border-[#C49A32] transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3.5 bg-[#0B2345] text-[#D8B65B] rounded-lg shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-xl font-serif font-bold text-[#0B2345]">
                        {svc.title}
                      </h2>
                      <p className="text-xs font-semibold text-[#C49A32] uppercase tracking-wider">
                        {svc.subtitle}
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed max-w-3xl pt-1">
                        {svc.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 pt-2 lg:pt-0">
                    <button
                      onClick={() => onNavigate('/contact')}
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#0B2345] hover:bg-[#163A63] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-100 text-xs">
                  <div>
                    <h4 className="font-semibold text-slate-800 uppercase tracking-wider mb-2">
                      Scope of Operations:
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      {svc.scope}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-800 uppercase tracking-wider mb-2">
                      Key Capabilities:
                    </h4>
                    <ul className="space-y-1.5 text-slate-600">
                      {svc.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A32] shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
