import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  User,
  Project,
  Property,
  GeneralInquiry,
  InvestmentInquiry,
  LandownerInquiry,
  Career,
  CareerApplication,
  CorporateDocument,
  MediaItem,
  ActivityLog,
  WebsiteContent
} from '../src/types/index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

export interface StoredUser extends User {
  passwordHash: string;
  salt: string;
}

export interface DatabaseSchema {
  users: StoredUser[];
  projects: Project[];
  properties: Property[];
  generalInquiries: GeneralInquiry[];
  investmentInquiries: InvestmentInquiry[];
  landownerInquiries: LandownerInquiry[];
  careers: Career[];
  careerApplications: CareerApplication[];
  corporateDocuments: CorporateDocument[];
  mediaLibrary: MediaItem[];
  activityLogs: ActivityLog[];
  websiteContent: WebsiteContent;
}

// Initial seed images generated
const HERO_IMG = '/src/assets/images/hero_hopeland_architecture_1790880040767.jpg';
const BICAL_IMG = '/src/assets/images/project_bical_residential_1790880055584.jpg';
const TAYSAN_IMG = '/src/assets/images/project_taysan_agro_1790880068800.jpg';
const CLARK_IMG = '/src/assets/images/project_clark_prestige_1790880127374.jpg';
const SPACENEST_IMG = '/src/assets/images/project_spacenest_resort_1790880149657.jpg';

const initialWebsiteContent: WebsiteContent = {
  hero: {
    badge: 'Official Corporate Portal',
    headline: 'Building Strong Foundations for Better Tomorrows.',
    subheadline: 'Creating meaningful real estate opportunities through responsible development, quality construction, and strategic property investments across prime Philippine growth corridors.',
    ctaPrimary: 'Explore Our Developments',
    ctaSecondary: 'Partner With Us'
  },
  introduction: {
    kicker: 'Institutional Real Estate & Property Development',
    title: 'About Hopeland Estates and Realty Corporation',
    paragraph1: 'Hopeland Estates and Realty Corporation is a forward-thinking Philippine real estate development and property management firm. We specialize in transforming strategic land holdings into masterplanned residential communities, commercial hubs, and agricultural innovation estates that generate lasting socioeconomic value.',
    paragraph2: 'Guided by corporate stewardship, engineering excellence, and institutional transparency, Hopeland bridges landowners, capital partners, and end-users to build communities that stand the test of time.'
  },
  philosophy: {
    vision: 'To be a premier, highly trusted Philippine property development corporation recognized for transforming land into resilient, sustainable, and thriving communities.',
    mission: 'To create enduring value for landowners, investors, and homeowners by executing disciplined land development, upholding strict engineering standards, and fostering sustainable growth.',
    coreValues: [
      { title: 'Integrity', desc: 'Uncompromising corporate governance, transparent documentation, and ethical dealing.' },
      { title: 'Quality', desc: 'Superior architectural planning, structural resilience, and long-term durability.' },
      { title: 'Innovation', desc: 'Forward-looking masterplans integrating modern utilities, eco-tech, and renewable energy.' },
      { title: 'Strategic Partnerships', desc: 'Equitable win-win joint ventures with reputable landowners and institutional capital.' },
      { title: 'Long-Term Value', desc: 'Creating multi-generational wealth and thriving ecosystems for Philippine families.' }
    ]
  },
  contact: {
    address: 'Executive Tower, Clark Freeport Zone / Mabalacat, Pampanga, Philippines',
    email: 'corporate@hopelandestates.com',
    phone: '+63 (045) 892-4100 / +63 917 800 4673',
    businessHours: 'Monday – Friday: 8:30 AM – 5:30 PM PHT'
  },
  social: {
    linkedin: 'https://linkedin.com/company/hopeland-estates',
    facebook: 'https://facebook.com/hopelandestates',
    twitter: 'https://twitter.com/hopelandestates'
  },
  seo: {
    metaTitle: 'Hopeland Estates and Realty Corporation | Official Corporate Portal',
    metaDescription: 'Building Strong Foundations for Better Tomorrows. Masterplanned residential, commercial, and agro-industrial developments in Pampanga, Batangas, and Rizal.',
    keywords: 'Hopeland Estates, Real Estate Development Philippines, Residential Pampanga, Clark Property, Taysan Agro-Industrial'
  }
};

const initialProjects: Project[] = [
  {
    id: 'proj-bical-01',
    slug: 'bical-residential-development',
    name: 'Bical Residential Development',
    location: 'Bical, Mabalacat, Pampanga',
    category: 'Residential',
    stage: 'Planning',
    statusText: 'Preliminary Development Information — Verification Required',
    indicativeLandArea: '6.3 Hectares',
    indicativeBudget: 'PHP 2.28 Billion Indicative GDV',
    description: 'A planned modern gated residential community featuring contemporary architecture, wide arterial boulevards, underground drainage, and landscaped parks.',
    executiveSummary: 'Situated in the high-growth corridor of Mabalacat, Pampanga, near the Clark Freeport Zone. The development concept envisions a private enclave of modern tropical single-detached houses and premium residential lots.',
    developmentConcept: 'Modern residential community with organized roads, dedicated parking, lush landscaping, and contemporary family-oriented housing designs.',
    proposedComponents: [
      '114 Modern Residential Lots',
      'Contemporary House-and-Lot Packages',
      'Community Clubhouse & Multipurpose Pavilion',
      'Landscaped Greenbelts & Children Playground',
      'Gated Perimeter with 24/7 RFID Security Entrance'
    ],
    previouslyReportedInfo: [
      '114 residential lots planned',
      '40 titles previously reported as on hand for initial phase',
      'Indicative average lot area: 400 sqm',
      'Previously discussed house-and-lot pricing reference: PHP 20,000,000'
    ],
    specifications: {
      'Total Land Area': '6.3 Hectares (63,000 sqm)',
      'Total Planned Lots': '114 Lots',
      'Average Lot Size': '400 sqm',
      'Road Right-of-Way': '12m Main Spine / 10m Secondary',
      'Utilities': 'Underground drainage, central water distribution, 3-phase power'
    },
    amenities: [
      'Clubhouse & Event Lawn',
      'Resort-style Swimming Pool',
      'Basketball & Pickleball Court',
      'Jogging & Cycling Trail',
      '24/7 Guardhouse & CCTV Network'
    ],
    featuredImage: BICAL_IMG,
    masterplanImage: BICAL_IMG,
    gallery: [BICAL_IMG, HERO_IMG],
    published: true,
    featured: true,
    order: 1,
    createdAt: '2026-01-15T08:00:00Z',
    updatedAt: '2026-09-20T10:30:00Z'
  },
  {
    id: 'proj-taysan-02',
    slug: 'taysan-integrated-masterplanned-development',
    name: 'Taysan Integrated Masterplanned Development',
    location: 'Taysan, Batangas',
    category: 'Agro-Industrial',
    stage: 'Concept',
    statusText: 'Masterplan Concept — Feasibility and Approvals Required',
    indicativeLandArea: '1,010.79 Hectares',
    indicativeBudget: 'Multi-Phase Masterplan Investment',
    description: 'A transformative large-scale integrated agro-industrial and sustainable land development concept designed to champion Philippine agricultural productivity and clean energy.',
    executiveSummary: 'Encompassing over 1,000 hectares in Southern Luzon, this prospective masterplan aims to combine high-value crop cultivation with post-harvest processing, renewable solar generation, and eco-tourism stewardship.',
    developmentConcept: 'Comprehensive integrated land utilization combining high-value climate-resilient agriculture, modern greenhouse clusters, solar generation, and localized processing facilities.',
    proposedComponents: [
      'Cacao & High-Grade Coffee Plantations',
      'Pili, Vanilla, Passion Fruit & Calamansi Orchards',
      'Climate-Controlled Smart Greenhouses',
      'Solar Energy Integration & Clean Power Substation',
      'Engineered Water Impounding Reservoirs',
      'Agricultural Post-Harvest Processing Facilities',
      'Agro-Logistics Hub & Cold Storage Staging'
    ],
    previouslyReportedInfo: [
      'Indicative land area: 1,010.79 hectares',
      'Integrated agriculture, processing, and solar integration',
      'Requires full environmental compliance certificate and local government zoning approvals'
    ],
    specifications: {
      'Total Indicative Area': '1,010.79 Hectares',
      'Target Cultivation Area': '650 Hectares',
      'Solar & Infrastructure': '120 Hectares',
      'Processing & Logistics': '50 Hectares',
      'Conservation & Buffer': '190.79 Hectares'
    },
    amenities: [
      'Central Agricultural R&D Center',
      'Water Retention Lakes & Irrigation Reservoirs',
      'Solar Farm Micro-Grid',
      'Heavy Logistics Access Arteries',
      'Agronomy Training Center'
    ],
    featuredImage: TAYSAN_IMG,
    masterplanImage: TAYSAN_IMG,
    gallery: [TAYSAN_IMG, HERO_IMG],
    published: true,
    featured: true,
    order: 2,
    createdAt: '2026-02-10T09:00:00Z',
    updatedAt: '2026-09-22T14:15:00Z'
  },
  {
    id: 'proj-clark-03',
    slug: 'clark-zion-prestige-park',
    name: 'Clark Zion Prestige Park',
    location: 'Clark Freeport Zone, Pampanga',
    category: 'Commercial',
    stage: 'Feasibility',
    statusText: 'Preliminary Investment Proposal — Lease and Development Rights Verification Required',
    indicativeLandArea: 'Strategic Commercial Parcel',
    indicativeBudget: 'PHP 3.38 Billion Investment Proposal',
    description: 'A planned institutional and commercial development proposal envisioned to support business process outsourcing, multinational corporate offices, and lifestyle retail.',
    executiveSummary: 'A premier commercial property investment proposal within the special economic zone of Clark, designed to capitalize on international airport connectivity, tax incentives, and regional economic expansion.',
    developmentConcept: 'Commercial property development, strategic land utilization, modern infrastructure, and institutional partnerships in the heart of Central Luzon.',
    proposedComponents: [
      'Grade-A Corporate Office Towers',
      'Executive Suites & Business Innovation Hub',
      'Retail Promenade & Dining District',
      'Subterranean Parking & Transit Connectivity',
      'Smart Building Energy Management Systems'
    ],
    previouslyReportedInfo: [
      'Previously discussed investment proposal: PHP 3.38 Billion',
      'Previously reported long-term lease expiration: Year 2058',
      'Subject to full leaseholder agreement verification and master development authorization'
    ],
    specifications: {
      'Gross Floor Area': 'Approx. 85,000 sqm',
      'Target Green Certification': 'LEED Silver / BERDE Equivalent',
      'Parking Ratio': '1 slot per 70 sqm of leasable office space',
      'Connectivity': 'Redundant optical fiber and dual-substation power'
    },
    amenities: [
      'Corporate Sky Gardens',
      'Conference & Auditorium Center',
      'Commercial Retail Arcade',
      'Bicycle Commuter Hub with Showers',
      'Direct Highway & Airport Access'
    ],
    featuredImage: CLARK_IMG,
    masterplanImage: CLARK_IMG,
    gallery: [CLARK_IMG, HERO_IMG],
    published: true,
    featured: true,
    order: 3,
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-09-25T11:00:00Z'
  },
  {
    id: 'proj-spacenest-04',
    slug: 'dhenze-spacenest-mountain-resort',
    name: 'Dhenze SpaceNest Mountain Resort',
    location: 'Mascap, Rodriguez, Rizal',
    category: 'Hospitality',
    stage: 'Concept',
    statusText: 'Concept Development — Verification Required',
    indicativeLandArea: 'Scenic Mountain Acreage',
    indicativeBudget: 'Target Hospitality Joint Venture',
    description: 'An eco-futuristic hospitality and mountain retreat concept offering futuristic capsule villas with breathtaking vistas of the Sierra Madre mountain range.',
    executiveSummary: 'A nature-immersive eco-resort concept nestled in Mascap, Rodriguez, Rizal, targeted at modern adventure travelers, wellness seekers, and eco-tourists seeking respite from Metro Manila.',
    developmentConcept: '63 Space Capsule Villas combining minimalist contemporary design, modular construction, panoramic viewing pods, and resort membership privileges.',
    proposedComponents: [
      '63 Space Capsule Villas with Private Viewing Balconies',
      'Infinity Cliffside Pool overlooking Mountain Sea of Clouds',
      'Wellness Spa, Yoga Pavilion & Meditation Sanctuary',
      'Farm-to-Table Panoramic Restaurant & Cafe',
      'Exclusive Private Resort Membership Program'
    ],
    previouslyReportedInfo: [
      'Previously discussed concept: 63 Space Capsule Villas',
      'Proposed features: Modern capsule accommodations, scenic viewing, recreational facilities',
      'Concept development stage: Site surveys, environmental permits, and access infrastructure pending'
    ],
    specifications: {
      'Villa Count': '63 Modular Space Capsule Units',
      'Unit Typologies': 'Single Pod (24 sqm) / Duplex Pod (48 sqm)',
      'Foundation': 'Minimal-footprint steel pile foundation preserving natural terrain',
      'Water & Waste': 'Zero-discharge biodigester septic systems and rainwater harvesting'
    },
    amenities: [
      'Stargazing Observatory Deck',
      'Cliffside Lounge & Cafe',
      'Trekking & Eco-Trail Network',
      'Helipad / Emergency Medical Evacuation Point',
      'Off-Grid Solar Hybrid Storage Backup'
    ],
    featuredImage: SPACENEST_IMG,
    masterplanImage: SPACENEST_IMG,
    gallery: [SPACENEST_IMG, HERO_IMG],
    published: true,
    featured: true,
    order: 4,
    createdAt: '2026-04-12T11:00:00Z',
    updatedAt: '2026-09-18T16:20:00Z'
  },
  {
    id: 'proj-elderlycare-05',
    slug: 'integrated-elderly-care-facility',
    name: 'Integrated Elderly Care Facility & Medical Hospitality',
    location: 'Clark Freeport Zone, Pampanga',
    category: 'Institutional',
    stage: 'Concept',
    statusText: 'Concept and Investment Planning — Funding, Approvals, and Feasibility Verification Required',
    indicativeLandArea: 'Multi-Tower Institutional Campus',
    indicativeBudget: 'US$80M–US$100M / PHP 5.0 Billion Reference',
    description: 'An institutional-grade three-tower healthcare and hospitality complex providing premier assisted living, memory care, and 5-star medical tourism hospitality.',
    executiveSummary: 'Positioned to serve international retirees, returning expatriates, and local residents seeking world-class healthcare combined with luxury resort living in Clark Freeport Zone.',
    developmentConcept: 'Integrated institutional healthcare campus consisting of a 3-tower masterplan combining medical hospitality, specialized geriatric services, and continuous wellness care.',
    proposedComponents: [
      'Five-Star Hospitality Tower (112 Hotel Suites)',
      'Elderly Residential Care & Assisted Living Tower',
      'Specialized Memory Care & Cognitive Rehabilitation Pavilion',
      'State-of-the-Art Geriatric Medical Diagnostic Center',
      'Physiotherapy, Hydrotherapy & Wellness Center'
    ],
    previouslyReportedInfo: [
      'Three-tower development concept',
      'Five-star hotel with 112 rooms',
      'Previously discussed budget references: US$80M–US$100M, later referenced as PHP 5.0 Billion',
      'Previously discussed healthcare infrastructure allocation: PHP 950 million'
    ],
    specifications: {
      'Towers': '3 Interconnected Towers (12 to 16 storeys)',
      'Hospitality Suites': '112 Five-Star Guest Suites',
      'Assisted Living Units': '220 Accessible Residential Units',
      'Healthcare Allocation': 'PHP 950 Million Medical Infrastructure Reference'
    },
    amenities: [
      '24/7 On-Site Emergency & Geriatric Medical Team',
      'Barrier-Free Therapeutic Healing Gardens',
      'Hydrotherapy Pool & Wellness Spa',
      'Dietary Kitchen & Private Executive Dining',
      'Full Concierge & Assisted Mobility Fleet'
    ],
    featuredImage: HERO_IMG,
    masterplanImage: HERO_IMG,
    gallery: [HERO_IMG, CLARK_IMG],
    published: true,
    featured: true,
    order: 5,
    createdAt: '2026-05-02T13:00:00Z',
    updatedAt: '2026-09-28T09:45:00Z'
  }
];

const initialProperties: Property[] = [
  {
    id: 'prop-bical-01',
    slug: 'bical-lot-block-1-lot-12',
    title: 'Bical Residential Premier Lot (400 sqm)',
    projectId: 'proj-bical-01',
    projectName: 'Bical Residential Development',
    location: 'Block 1, Lot 12, Bical, Mabalacat, Pampanga',
    category: 'Residential Lot',
    status: 'Available',
    lotArea: 400,
    price: 6800000,
    currency: 'PHP',
    description: 'Prime regular-cut corner residential lot fronting the primary boulevard with unobstructed eastern morning sunrise orientation.',
    features: ['Corner Lot', 'Near Main Clubhouse', 'Underground Drainage', 'Clean Title On Hand'],
    featuredImage: BICAL_IMG,
    images: [BICAL_IMG, HERO_IMG],
    published: true,
    createdAt: '2026-06-01T08:00:00Z',
    updatedAt: '2026-09-10T11:00:00Z'
  },
  {
    id: 'prop-bical-02',
    slug: 'bical-modern-tropical-villa-a',
    title: 'Modern Tropical Executive Villa (House & Lot)',
    projectId: 'proj-bical-01',
    projectName: 'Bical Residential Development',
    location: 'Bical, Mabalacat, Pampanga',
    category: 'House and Lot',
    status: 'Under Development',
    lotArea: 400,
    floorArea: 320,
    bedrooms: 4,
    bathrooms: 4,
    parking: 2,
    price: 20000000,
    currency: 'PHP',
    description: 'Signature two-storey modern tropical residence featuring double-height ceiling living room, master suite with walk-in closet, maid quarters, and landscaped lanai.',
    features: ['4 Bedrooms Ensuite', 'High Ceilings', '2-Car Garage', 'Covered Lanai', 'Solar-Ready Roof'],
    featuredImage: BICAL_IMG,
    images: [BICAL_IMG, HERO_IMG],
    published: true,
    createdAt: '2026-06-05T09:30:00Z',
    updatedAt: '2026-09-15T15:00:00Z'
  },
  {
    id: 'prop-clark-01',
    slug: 'clark-prestige-executive-floor',
    title: 'Clark Zion Prestige Corporate Office Floor',
    projectId: 'proj-clark-03',
    projectName: 'Clark Zion Prestige Park',
    location: 'Clark Freeport Zone, Pampanga',
    category: 'Commercial Space',
    status: 'Under Development',
    lotArea: 1200,
    floorArea: 1200,
    parking: 15,
    price: 180000000,
    currency: 'PHP',
    description: 'Full-floor Grade-A commercial office space ready for institutional headquarters or BPO operations with panoramic views of Clark.',
    features: ['Grade-A Specification', 'Dual Power Substation', 'LEED Target Design', 'Clark Tax Incentives'],
    featuredImage: CLARK_IMG,
    images: [CLARK_IMG, HERO_IMG],
    published: true,
    createdAt: '2026-07-01T10:00:00Z',
    updatedAt: '2026-09-20T10:00:00Z'
  },
  {
    id: 'prop-spacenest-01',
    slug: 'spacenest-capsule-villa-pod-07',
    title: 'SpaceNest Horizon Capsule Villa (Pod 07)',
    projectId: 'proj-spacenest-04',
    projectName: 'Dhenze SpaceNest Mountain Resort',
    location: 'Mascap, Rodriguez, Rizal',
    category: 'Villa',
    status: 'Under Development',
    lotArea: 120,
    floorArea: 36,
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    price: 4500000,
    currency: 'PHP',
    description: 'Prefabricated aerospace-grade modular capsule villa with 270-degree curved glass viewing window, smart climate controls, and private outdoor observation deck.',
    features: ['Panoramic View', 'Smart Home Integration', 'Resort Membership Inclusion', 'Rental Management Option'],
    featuredImage: SPACENEST_IMG,
    images: [SPACENEST_IMG, HERO_IMG],
    published: true,
    createdAt: '2026-07-15T14:00:00Z',
    updatedAt: '2026-09-22T08:00:00Z'
  }
];

const initialGeneralInquiries: GeneralInquiry[] = [
  {
    id: 'inq-gen-001',
    referenceNo: 'HL-INQ-2026-0101',
    type: 'GENERAL',
    fullName: 'Atty. Manuel Santos',
    email: 'm.santos@santoslaw.ph',
    phone: '+63 918 555 1234',
    company: 'Santos & Associates Legal',
    subject: 'Corporate Land Development Inquiry',
    message: 'We are representing a family trust with property adjacent to Mabalacat and wish to discuss corporate masterplanning capabilities.',
    status: 'NEW',
    priority: 'HIGH',
    assignedTo: 'Super Admin',
    internalNotes: ['Client referred by regional banking partner. Requested initial corporate brief.'],
    followUps: [],
    createdAt: '2026-09-28T09:15:00Z',
    updatedAt: '2026-09-28T09:15:00Z'
  },
  {
    id: 'inq-prop-002',
    referenceNo: 'HL-PRP-2026-0102',
    type: 'PROPERTY',
    fullName: 'Dr. Evelyn Ramirez',
    email: 'dr.ramirez@medicare.ph',
    phone: '+63 920 888 4567',
    subject: 'Inquiry for Bical Residential House & Lot',
    message: 'Interested in the modern tropical villa package at Bical, Pampanga. Please send the payment schedule and lot layout options.',
    propertyInterest: 'Bical Residential Premier Lot (400 sqm)',
    status: 'IN_DISCUSSION',
    priority: 'MEDIUM',
    assignedTo: 'Maria Gomez (Marketing)',
    internalNotes: ['Brochure sent via email. Follow up scheduled for Friday.'],
    followUps: [
      { id: 'fu-1', date: '2026-09-29T10:00:00Z', recordedBy: 'Maria Gomez', notes: 'Sent full PDF prospectus and title verification overview.' }
    ],
    createdAt: '2026-09-27T14:20:00Z',
    updatedAt: '2026-09-29T10:00:00Z'
  }
];

const initialInvestmentInquiries: InvestmentInquiry[] = [
  {
    id: 'inv-inq-001',
    referenceNo: 'HL-INV-2026-0801',
    type: 'INVESTMENT',
    fullName: 'Gregory Vance',
    companyName: 'Pacific Rim Capital Partners',
    email: 'g.vance@pacificrimcap.com',
    phone: '+65 6712 3400',
    country: 'Singapore',
    investorType: 'Institutional Investor',
    investmentInterest: 'Commercial and Integrated Development / Healthcare',
    preferredProject: 'Clark Zion Prestige Park / Elderly Care Facility',
    indicativeRange: 'PHP 500M - PHP 1 Billion',
    message: 'We are evaluating Philippine commercial and healthcare infrastructure assets for our Southeast Asia Real Estate Fund. Requesting non-disclosure agreement and confidential teaser.',
    status: 'UNDER_REVIEW',
    priority: 'URGENT',
    assignedTo: 'Super Admin',
    internalNotes: ['NDA draft sent to legal department for review before release of project numbers.'],
    followUps: [],
    createdAt: '2026-09-26T11:00:00Z',
    updatedAt: '2026-09-27T16:00:00Z'
  },
  {
    id: 'inv-inq-002',
    referenceNo: 'HL-INV-2026-0802',
    type: 'INVESTMENT',
    fullName: 'Engr. Carlos Del Rosario',
    companyName: 'Del Rosario Holdings',
    email: 'carlos@delrosarioholdings.ph',
    phone: '+63 917 889 2020',
    country: 'Philippines',
    investorType: 'Strategic Development Partner',
    investmentInterest: 'Agro-Industrial and Solar Integration',
    preferredProject: 'Taysan Integrated Masterplanned Development',
    indicativeRange: 'PHP 100M - PHP 300M',
    message: 'We have agricultural engineering capabilities and wish to explore joint venture participation on the greenhouse and processing clusters.',
    status: 'CONTACTED',
    priority: 'HIGH',
    assignedTo: 'Project Manager',
    internalNotes: ['Preliminary call conducted. Requested site visit schedule.'],
    followUps: [],
    createdAt: '2026-09-25T15:30:00Z',
    updatedAt: '2026-09-26T09:00:00Z'
  }
];

const initialLandownerInquiries: LandownerInquiry[] = [
  {
    id: 'lnd-inq-001',
    referenceNo: 'HL-LND-2026-0301',
    type: 'LANDOWNER',
    fullName: 'Don Jose Maria Teodoro',
    email: 'jm.teodoro@estateproperties.ph',
    phone: '+63 917 500 9001',
    propertyLocation: 'Porac / Angeles Boundary, Pampanga',
    landArea: '24.5 Hectares',
    currentZoning: 'Agricultural / Reclassifiable to Residential',
    titleStatus: 'Clean TCT (Single Family Owner)',
    proposedArrangement: 'Joint Venture Property Development (Revenue / Area Share)',
    message: 'We own a 24.5-hectare contiguous parcel along the main arterial route. Looking for an institutional developer to partner with us for a residential subdivision masterplan.',
    status: 'NEW',
    priority: 'HIGH',
    documentCount: 3,
    internalNotes: ['Zoning map and title copies submitted. Scheduled for technical team appraisal.'],
    followUps: [],
    createdAt: '2026-09-29T11:45:00Z',
    updatedAt: '2026-09-29T11:45:00Z'
  }
];

const initialCareers: Career[] = [
  {
    id: 'car-001',
    title: 'Senior Civil & Structural Engineer',
    department: 'Engineering & Construction',
    location: 'Clark Freeport Zone, Pampanga',
    employmentType: 'Full-Time',
    experienceLevel: '8+ Years',
    description: 'Lead structural design validation, contractor quality control, and field infrastructure execution for masterplanned subdivisions and commercial buildings.',
    responsibilities: [
      'Oversee horizontal site grading, drainage systems, and road network construction',
      'Liaise with local government engineering offices for permits and building code compliance',
      'Manage bill of quantities (BOQ) and technical specification audits',
      'Conduct regular site structural safety and quality assurance inspections'
    ],
    requirements: [
      'Licensed Civil Engineer (PRC Board)',
      'Minimum 8 years in large-scale residential or commercial land development',
      'Proficiency in AutoCAD, Civil 3D, and project scheduling tools',
      'Willingness to be stationed in Central Luzon project sites'
    ],
    published: true,
    createdAt: '2026-08-10T08:00:00Z'
  },
  {
    id: 'car-002',
    title: 'Real Estate Investment & Joint Venture Analyst',
    department: 'Business Development & Investment',
    location: 'Taguig / Clark Office',
    employmentType: 'Full-Time',
    experienceLevel: '4+ Years',
    description: 'Perform financial modeling, feasibility analysis, landowner joint venture structuring, and project underwriting for prospective land developments.',
    responsibilities: [
      'Build comprehensive DCF, IRR, and NPV financial models for masterplanned projects',
      'Draft investment teasers, memoranda, and joint venture proposals',
      'Conduct comparable market studies and property valuation assessments',
      'Support negotiations with landowners and institutional capital partners'
    ],
    requirements: [
      'Degree in Finance, Economics, Real Estate Management, or related field',
      'Minimum 4 years in real estate private equity, property consulting, or development underwriting',
      'Advanced financial modeling skills in Microsoft Excel',
      'Strong presentation and analytical writing capabilities'
    ],
    published: true,
    createdAt: '2026-08-15T09:00:00Z'
  },
  {
    id: 'car-003',
    title: 'Senior Project Architect / Masterplanner',
    department: 'Design & Planning',
    location: 'Clark / Remote Hybrid',
    employmentType: 'Full-Time',
    experienceLevel: '6+ Years',
    description: 'Design innovative community masterplans, housing typologies, and commercial architectural pavilions aligned with Hopeland design philosophy.',
    responsibilities: [
      'Develop conceptual masterplans, site density studies, and architectural facades',
      'Coordinate with MEPFS, landscape, and environmental consultants',
      'Produce 3D visualizations, presentation decks, and BIM documentation',
      'Ensure compliance with HLURB/DHSUD rules and National Building Code'
    ],
    requirements: [
      'Licensed Architect (UAP/PRC)',
      'Minimum 6 years in masterplanning or residential architecture',
      'Proficient in Revit, Rhino/SketchUp, Lumion, and Adobe Creative Suite',
      'Strong eye for sustainable tropical modernism'
    ],
    published: true,
    createdAt: '2026-08-20T10:00:00Z'
  }
];

const initialCorporateDocuments: CorporateDocument[] = [
  {
    id: 'doc-001',
    title: 'Bical Residential Subdivision Master Development Plan (Rev C)',
    category: 'Architectural Drawing',
    confidentiality: 'CONFIDENTIAL',
    fileSize: '14.8 MB',
    fileType: 'PDF / CAD',
    fileUrl: '/documents/bical_masterplan_rev_c.pdf',
    uploadedBy: 'Arch. Raymond Luna',
    description: 'Approved horizontal subdivision lotting plan, road profiles, and drainage elevation survey.',
    projectId: 'proj-bical-01',
    projectName: 'Bical Residential Development',
    createdAt: '2026-07-10T14:00:00Z'
  },
  {
    id: 'doc-002',
    title: 'Clark Zion Commercial Development Financial Underwriting & Feasibility',
    category: 'Feasibility Study',
    confidentiality: 'STRICTLY_CONFIDENTIAL',
    fileSize: '8.4 MB',
    fileType: 'PDF / XLSX',
    fileUrl: '/documents/clark_zion_feasibility_2026.pdf',
    uploadedBy: 'Investment Committee',
    description: '10-Year cash flow projection, lease rate sensitivity matrix, and capital expenditure breakdown for PHP 3.38B proposal.',
    projectId: 'proj-clark-03',
    projectName: 'Clark Zion Prestige Park',
    createdAt: '2026-08-04T16:30:00Z'
  },
  {
    id: 'doc-003',
    title: 'Taysan Integrated Estate Agro-Economic Baseline & Soil Analysis',
    category: 'Project Report',
    confidentiality: 'CONFIDENTIAL',
    fileSize: '22.1 MB',
    fileType: 'PDF',
    fileUrl: '/documents/taysan_agro_soil_report.pdf',
    uploadedBy: 'Agronomy Consultant Group',
    description: 'Comprehensive hydrological, topographical, and soil fertility survey across 1,010.79 hectares.',
    projectId: 'proj-taysan-02',
    projectName: 'Taysan Integrated Masterplanned Development',
    createdAt: '2026-08-22T11:20:00Z'
  }
];

const initialMediaLibrary: MediaItem[] = [
  {
    id: 'med-001',
    title: 'Corporate Architecture Flagship Pavilion',
    category: 'Project Rendering',
    url: HERO_IMG,
    alt: 'Hopeland Estates Corporate Flagship Pavilion',
    fileSize: '1.8 MB',
    dimensions: '1920x1080',
    uploadedBy: 'System',
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'med-002',
    title: 'Bical Residential Boulevard & Villas',
    category: 'Project Rendering',
    url: BICAL_IMG,
    alt: 'Bical Residential Community Subdivision',
    fileSize: '2.1 MB',
    dimensions: '1920x1080',
    uploadedBy: 'System',
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'med-003',
    title: 'Taysan Agro-Industrial Masterplan Estate',
    category: 'Masterplan',
    url: TAYSAN_IMG,
    alt: 'Taysan Integrated Masterplanned Development',
    fileSize: '2.4 MB',
    dimensions: '1920x1080',
    uploadedBy: 'System',
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'med-004',
    title: 'Clark Zion Prestige Park Commercial Plaza',
    category: 'Project Rendering',
    url: CLARK_IMG,
    alt: 'Clark Zion Prestige Commercial Park',
    fileSize: '1.9 MB',
    dimensions: '1920x1080',
    uploadedBy: 'System',
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'med-005',
    title: 'Dhenze SpaceNest Capsule Mountain Resort',
    category: 'Project Rendering',
    url: SPACENEST_IMG,
    alt: 'Dhenze SpaceNest Mountain Resort Capsule Villas',
    fileSize: '2.0 MB',
    dimensions: '1920x1080',
    uploadedBy: 'System',
    createdAt: '2026-09-01T08:00:00Z'
  }
];

const initialActivityLogs: ActivityLog[] = [
  {
    id: 'act-001',
    timestamp: '2026-09-30T10:15:00Z',
    userId: 'usr-superadmin',
    userName: 'Roberto Pablo (Super Admin)',
    userRole: 'SUPER_ADMIN',
    action: 'SYSTEM_INITIALIZATION',
    entity: 'SYSTEM',
    details: 'Corporate management platform initialized with preliminary development records and security controls.',
    ipAddress: '127.0.0.1'
  },
  {
    id: 'act-002',
    timestamp: '2026-09-30T14:30:00Z',
    userId: 'usr-admin',
    userName: 'Eduardo Ramos (Admin)',
    userRole: 'ADMIN',
    action: 'STATUS_UPDATE',
    entity: 'PROJECT',
    entityId: 'proj-bical-01',
    details: 'Updated Bical Residential Development lot inventory and house-and-lot specifications.',
    ipAddress: '127.0.0.1'
  }
];

class DatabaseService {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadDatabase();
  }

  private ensureDirectory() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private loadDatabase(): DatabaseSchema {
    this.ensureDirectory();
    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      } catch (err) {
        console.error('Error reading database file, creating fresh dataset:', err);
      }
    }

    const initialDb: DatabaseSchema = {
      users: [],
      projects: initialProjects,
      properties: initialProperties,
      generalInquiries: initialGeneralInquiries,
      investmentInquiries: initialInvestmentInquiries,
      landownerInquiries: initialLandownerInquiries,
      careers: initialCareers,
      careerApplications: [],
      corporateDocuments: initialCorporateDocuments,
      mediaLibrary: initialMediaLibrary,
      activityLogs: initialActivityLogs,
      websiteContent: initialWebsiteContent
    };

    this.saveDatabase(initialDb);
    return initialDb;
  }

  private saveDatabase(dataToSave?: DatabaseSchema) {
    this.ensureDirectory();
    const data = dataToSave || this.data;
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  }

  // Getters
  public getUsers(): StoredUser[] {
    return this.data.users;
  }

  public getUserByEmail(email: string): StoredUser | undefined {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public getUserById(id: string): StoredUser | undefined {
    return this.data.users.find(u => u.id === id);
  }

  public saveUser(user: StoredUser): void {
    const idx = this.data.users.findIndex(u => u.id === user.id);
    if (idx >= 0) {
      this.data.users[idx] = user;
    } else {
      this.data.users.push(user);
    }
    this.saveDatabase();
  }

  public deleteUser(id: string): boolean {
    const initialLen = this.data.users.length;
    this.data.users = this.data.users.filter(u => u.id !== id);
    if (this.data.users.length !== initialLen) {
      this.saveDatabase();
      return true;
    }
    return false;
  }

  // Projects
  public getProjects(): Project[] {
    return this.data.projects.sort((a, b) => a.order - b.order);
  }

  public getProjectBySlug(slug: string): Project | undefined {
    return this.data.projects.find(p => p.slug === slug || p.id === slug);
  }

  public saveProject(project: Project): Project {
    const idx = this.data.projects.findIndex(p => p.id === project.id);
    project.updatedAt = new Date().toISOString();
    if (idx >= 0) {
      this.data.projects[idx] = project;
    } else {
      project.createdAt = project.createdAt || new Date().toISOString();
      this.data.projects.push(project);
    }
    this.saveDatabase();
    return project;
  }

  public deleteProject(id: string): boolean {
    const initialLen = this.data.projects.length;
    this.data.projects = this.data.projects.filter(p => p.id !== id);
    if (this.data.projects.length !== initialLen) {
      this.saveDatabase();
      return true;
    }
    return false;
  }

  // Properties
  public getProperties(): Property[] {
    return this.data.properties;
  }

  public getPropertyBySlug(slug: string): Property | undefined {
    return this.data.properties.find(p => p.slug === slug || p.id === slug);
  }

  public saveProperty(property: Property): Property {
    const idx = this.data.properties.findIndex(p => p.id === property.id);
    property.updatedAt = new Date().toISOString();
    if (idx >= 0) {
      this.data.properties[idx] = property;
    } else {
      property.createdAt = property.createdAt || new Date().toISOString();
      this.data.properties.push(property);
    }
    this.saveDatabase();
    return property;
  }

  public deleteProperty(id: string): boolean {
    const initialLen = this.data.properties.length;
    this.data.properties = this.data.properties.filter(p => p.id !== id);
    if (this.data.properties.length !== initialLen) {
      this.saveDatabase();
      return true;
    }
    return false;
  }

  // Inquiries
  public getGeneralInquiries(): GeneralInquiry[] {
    return this.data.generalInquiries;
  }

  public saveGeneralInquiry(inquiry: GeneralInquiry): GeneralInquiry {
    const idx = this.data.generalInquiries.findIndex(i => i.id === inquiry.id);
    inquiry.updatedAt = new Date().toISOString();
    if (idx >= 0) {
      this.data.generalInquiries[idx] = inquiry;
    } else {
      this.data.generalInquiries.unshift(inquiry);
    }
    this.saveDatabase();
    return inquiry;
  }

  public deleteGeneralInquiry(id: string): boolean {
    const len = this.data.generalInquiries.length;
    this.data.generalInquiries = this.data.generalInquiries.filter(i => i.id !== id);
    if (this.data.generalInquiries.length !== len) {
      this.saveDatabase();
      return true;
    }
    return false;
  }

  // Investment Inquiries
  public getInvestmentInquiries(): InvestmentInquiry[] {
    return this.data.investmentInquiries;
  }

  public saveInvestmentInquiry(inquiry: InvestmentInquiry): InvestmentInquiry {
    const idx = this.data.investmentInquiries.findIndex(i => i.id === inquiry.id);
    inquiry.updatedAt = new Date().toISOString();
    if (idx >= 0) {
      this.data.investmentInquiries[idx] = inquiry;
    } else {
      this.data.investmentInquiries.unshift(inquiry);
    }
    this.saveDatabase();
    return inquiry;
  }

  public deleteInvestmentInquiry(id: string): boolean {
    const len = this.data.investmentInquiries.length;
    this.data.investmentInquiries = this.data.investmentInquiries.filter(i => i.id !== id);
    if (this.data.investmentInquiries.length !== len) {
      this.saveDatabase();
      return true;
    }
    return false;
  }

  // Landowner Inquiries
  public getLandownerInquiries(): LandownerInquiry[] {
    return this.data.landownerInquiries;
  }

  public saveLandownerInquiry(inquiry: LandownerInquiry): LandownerInquiry {
    const idx = this.data.landownerInquiries.findIndex(i => i.id === inquiry.id);
    inquiry.updatedAt = new Date().toISOString();
    if (idx >= 0) {
      this.data.landownerInquiries[idx] = inquiry;
    } else {
      this.data.landownerInquiries.unshift(inquiry);
    }
    this.saveDatabase();
    return inquiry;
  }

  public deleteLandownerInquiry(id: string): boolean {
    const len = this.data.landownerInquiries.length;
    this.data.landownerInquiries = this.data.landownerInquiries.filter(i => i.id !== id);
    if (this.data.landownerInquiries.length !== len) {
      this.saveDatabase();
      return true;
    }
    return false;
  }

  // Careers & Applications
  public getCareers(): Career[] {
    return this.data.careers;
  }

  public saveCareer(career: Career): Career {
    const idx = this.data.careers.findIndex(c => c.id === career.id);
    if (idx >= 0) {
      this.data.careers[idx] = career;
    } else {
      career.createdAt = career.createdAt || new Date().toISOString();
      this.data.careers.push(career);
    }
    this.saveDatabase();
    return career;
  }

  public deleteCareer(id: string): boolean {
    const len = this.data.careers.length;
    this.data.careers = this.data.careers.filter(c => c.id !== id);
    if (this.data.careers.length !== len) {
      this.saveDatabase();
      return true;
    }
    return false;
  }

  public getCareerApplications(): CareerApplication[] {
    return this.data.careerApplications;
  }

  public saveCareerApplication(app: CareerApplication): CareerApplication {
    const idx = this.data.careerApplications.findIndex(a => a.id === app.id);
    if (idx >= 0) {
      this.data.careerApplications[idx] = app;
    } else {
      app.createdAt = app.createdAt || new Date().toISOString();
      this.data.careerApplications.unshift(app);
    }
    this.saveDatabase();
    return app;
  }

  // Corporate Documents
  public getCorporateDocuments(): CorporateDocument[] {
    return this.data.corporateDocuments;
  }

  public saveCorporateDocument(doc: CorporateDocument): CorporateDocument {
    const idx = this.data.corporateDocuments.findIndex(d => d.id === doc.id);
    if (idx >= 0) {
      this.data.corporateDocuments[idx] = doc;
    } else {
      doc.createdAt = doc.createdAt || new Date().toISOString();
      this.data.corporateDocuments.unshift(doc);
    }
    this.saveDatabase();
    return doc;
  }

  public deleteCorporateDocument(id: string): boolean {
    const len = this.data.corporateDocuments.length;
    this.data.corporateDocuments = this.data.corporateDocuments.filter(d => d.id !== id);
    if (this.data.corporateDocuments.length !== len) {
      this.saveDatabase();
      return true;
    }
    return false;
  }

  // Media Library
  public getMediaLibrary(): MediaItem[] {
    return this.data.mediaLibrary;
  }

  public saveMediaItem(item: MediaItem): MediaItem {
    const idx = this.data.mediaLibrary.findIndex(m => m.id === item.id);
    if (idx >= 0) {
      this.data.mediaLibrary[idx] = item;
    } else {
      item.createdAt = item.createdAt || new Date().toISOString();
      this.data.mediaLibrary.unshift(item);
    }
    this.saveDatabase();
    return item;
  }

  public deleteMediaItem(id: string): boolean {
    const len = this.data.mediaLibrary.length;
    this.data.mediaLibrary = this.data.mediaLibrary.filter(m => m.id !== id);
    if (this.data.mediaLibrary.length !== len) {
      this.saveDatabase();
      return true;
    }
    return false;
  }

  // Activity Logs
  public getActivityLogs(): ActivityLog[] {
    return this.data.activityLogs.slice().sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  public logActivity(log: Omit<ActivityLog, 'id' | 'timestamp'>): void {
    const newLog: ActivityLog = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      ...log
    };
    this.data.activityLogs.unshift(newLog);
    // Keep max 500 logs
    if (this.data.activityLogs.length > 500) {
      this.data.activityLogs = this.data.activityLogs.slice(0, 500);
    }
    this.saveDatabase();
  }

  // Website Content (CMS)
  public getWebsiteContent(): WebsiteContent {
    return this.data.websiteContent;
  }

  public updateWebsiteContent(content: Partial<WebsiteContent>): WebsiteContent {
    this.data.websiteContent = {
      ...this.data.websiteContent,
      ...content
    };
    this.saveDatabase();
    return this.data.websiteContent;
  }
}

export const db = new DatabaseService();
