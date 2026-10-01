export const initialDbData = {
  "users": [
    {
      "id": "usr-superadmin",
      "name": "Roberto Pablo",
      "email": "robertopablo2000@gmail.com",
      "role": "SUPER_ADMIN",
      "department": "Executive Board",
      "status": "ACTIVE",
      "createdAt": "2026-10-01T18:57:40.373Z",
      "passwordHash": "eba42165b53c247f6e1ec92e1bb574f99af39e4a14a923a88aff7d07c103cdfc6567f1a42593db6cb7c13f0b82b399e0a1736c5d7d5241f337936ce6187bc35e",
      "salt": "c968fe874d8c96f835ec0f4e0990db21"
    },
    {
      "id": "usr-admin",
      "name": "Eduardo Ramos",
      "email": "admin@hopelandestates.com",
      "role": "ADMIN",
      "department": "Corporate Administration",
      "status": "ACTIVE",
      "createdAt": "2026-10-01T18:57:40.374Z",
      "passwordHash": "77cdd894522b1f7697313a978cc95a14d9878bda1bf96730fb0307e7f00792daa9fdf6ae231554e44927d7f526204efdd207e6a5a2234a6afee9faf118f55837",
      "salt": "b6d225e8af05cdec98c603d5eb131a80"
    },
    {
      "id": "usr-pm",
      "name": "Arch. Raymond Luna",
      "email": "pm@hopelandestates.com",
      "role": "PROJECT_MANAGER",
      "department": "Project Planning & Construction",
      "status": "ACTIVE",
      "createdAt": "2026-10-01T18:57:40.375Z",
      "passwordHash": "8f392bc696060298d69df7276f6e76d13b279bc75a550d2fae885c849f65bab86438b3bd6a0204083ffd7fbb6c51a07e5f1b7700fbddf2724f4dce55c59f3db6",
      "salt": "5cec6404be1e8a3f6243eff67817e1f8"
    },
    {
      "id": "usr-marketing",
      "name": "Maria Gomez",
      "email": "marketing@hopelandestates.com",
      "role": "MARKETING",
      "department": "Sales & Corporate Communications",
      "status": "ACTIVE",
      "createdAt": "2026-10-01T18:57:40.376Z",
      "passwordHash": "538585d8f04f7fdaf523cef17eef01bc293c72cda56d0dfaba246c50dd6afd3de5baa2a7a43c1cde0d6eb802a7b6fee4078a4b3a855d3283849e7c22a46c65ee",
      "salt": "fa4e7a7cff3b500c8d78117a054fe15f"
    },
    {
      "id": "usr-viewer",
      "name": "Auditor & Partner Viewer",
      "email": "investor.viewer@hopelandestates.com",
      "role": "VIEWER",
      "department": "External Audit & Oversight",
      "status": "ACTIVE",
      "createdAt": "2026-10-01T18:57:40.377Z",
      "passwordHash": "75690cb5743cd5cb0c2f05c06411d227fc1e87aaa93010c9cee4113204ce09f580b1af16d44d5b6864527c983086e9183cef4eee5e0c35e2e04dd2916edbd81f",
      "salt": "b6d39fc4633107fd609c2796978d9910"
    }
  ],
  "projects": [
    {
      "id": "proj-bical-01",
      "slug": "bical-residential-development",
      "name": "Bical Residential Development",
      "location": "Bical, Mabalacat, Pampanga",
      "category": "Residential",
      "stage": "Planning",
      "statusText": "Preliminary Development Information — Verification Required",
      "indicativeLandArea": "6.3 Hectares",
      "indicativeBudget": "PHP 2.28 Billion Indicative GDV",
      "description": "A planned modern gated residential community featuring contemporary architecture, wide arterial boulevards, underground drainage, and landscaped parks.",
      "executiveSummary": "Situated in the high-growth corridor of Mabalacat, Pampanga, near the Clark Freeport Zone. The development concept envisions a private enclave of modern tropical single-detached houses and premium residential lots.",
      "developmentConcept": "Modern residential community with organized roads, dedicated parking, lush landscaping, and contemporary family-oriented housing designs.",
      "proposedComponents": [
        "114 Modern Residential Lots",
        "Contemporary House-and-Lot Packages",
        "Community Clubhouse & Multipurpose Pavilion",
        "Landscaped Greenbelts & Children Playground",
        "Gated Perimeter with 24/7 RFID Security Entrance"
      ],
      "previouslyReportedInfo": [
        "114 residential lots planned",
        "40 titles previously reported as on hand for initial phase",
        "Indicative average lot area: 400 sqm",
        "Previously discussed house-and-lot pricing reference: PHP 20,000,000"
      ],
      "specifications": {
        "Total Land Area": "6.3 Hectares (63,000 sqm)",
        "Total Planned Lots": "114 Lots",
        "Average Lot Size": "400 sqm",
        "Road Right-of-Way": "12m Main Spine / 10m Secondary",
        "Utilities": "Underground drainage, central water distribution, 3-phase power"
      },
      "amenities": [
        "Clubhouse & Event Lawn",
        "Resort-style Swimming Pool",
        "Basketball & Pickleball Court",
        "Jogging & Cycling Trail",
        "24/7 Guardhouse & CCTV Network"
      ],
      "featuredImage": "assets/images/project_bical_residential_1790880055584.jpg",
      "masterplanImage": "assets/images/project_bical_residential_1790880055584.jpg",
      "gallery": [
        "assets/images/project_bical_residential_1790880055584.jpg",
        "assets/images/hero_hopeland_architecture_1790880040767.jpg"
      ],
      "published": true,
      "featured": true,
      "order": 1,
      "createdAt": "2026-01-15T08:00:00Z",
      "updatedAt": "2026-09-20T10:30:00Z"
    },
    {
      "id": "proj-taysan-02",
      "slug": "taysan-integrated-masterplanned-development",
      "name": "Taysan Integrated Masterplanned Development",
      "location": "Taysan, Batangas",
      "category": "Agro-Industrial",
      "stage": "Concept",
      "statusText": "Masterplan Concept — Feasibility and Approvals Required",
      "indicativeLandArea": "1,010.79 Hectares",
      "indicativeBudget": "Multi-Phase Masterplan Investment",
      "description": "A transformative large-scale integrated agro-industrial and sustainable land development concept designed to champion Philippine agricultural productivity and clean energy.",
      "executiveSummary": "Encompassing over 1,000 hectares in Southern Luzon, this prospective masterplan aims to combine high-value crop cultivation with post-harvest processing, renewable solar generation, and eco-tourism stewardship.",
      "developmentConcept": "Comprehensive integrated land utilization combining high-value climate-resilient agriculture, modern greenhouse clusters, solar generation, and localized processing facilities.",
      "proposedComponents": [
        "Cacao & High-Grade Coffee Plantations",
        "Pili, Vanilla, Passion Fruit & Calamansi Orchards",
        "Climate-Controlled Smart Greenhouses",
        "Solar Energy Integration & Clean Power Substation",
        "Engineered Water Impounding Reservoirs",
        "Agricultural Post-Harvest Processing Facilities",
        "Agro-Logistics Hub & Cold Storage Staging"
      ],
      "previouslyReportedInfo": [
        "Indicative land area: 1,010.79 hectares",
        "Integrated agriculture, processing, and solar integration",
        "Requires full environmental compliance certificate and local government zoning approvals"
      ],
      "specifications": {
        "Total Indicative Area": "1,010.79 Hectares",
        "Target Cultivation Area": "650 Hectares",
        "Solar & Infrastructure": "120 Hectares",
        "Processing & Logistics": "50 Hectares",
        "Conservation & Buffer": "190.79 Hectares"
      },
      "amenities": [
        "Central Agricultural R&D Center",
        "Water Retention Lakes & Irrigation Reservoirs",
        "Solar Farm Micro-Grid",
        "Heavy Logistics Access Arteries",
        "Agronomy Training Center"
      ],
      "featuredImage": "assets/images/project_taysan_agro_1790880068800.jpg",
      "masterplanImage": "assets/images/project_taysan_agro_1790880068800.jpg",
      "gallery": [
        "assets/images/project_taysan_agro_1790880068800.jpg",
        "assets/images/hero_hopeland_architecture_1790880040767.jpg"
      ],
      "published": true,
      "featured": true,
      "order": 2,
      "createdAt": "2026-02-10T09:00:00Z",
      "updatedAt": "2026-09-22T14:15:00Z"
    },
    {
      "id": "proj-clark-03",
      "slug": "clark-zion-prestige-park",
      "name": "Clark Zion Prestige Park",
      "location": "Clark Freeport Zone, Pampanga",
      "category": "Commercial",
      "stage": "Feasibility",
      "statusText": "Preliminary Investment Proposal — Lease and Development Rights Verification Required",
      "indicativeLandArea": "Strategic Commercial Parcel",
      "indicativeBudget": "PHP 3.38 Billion Investment Proposal",
      "description": "A planned institutional and commercial development proposal envisioned to support business process outsourcing, multinational corporate offices, and lifestyle retail.",
      "executiveSummary": "A premier commercial property investment proposal within the special economic zone of Clark, designed to capitalize on international airport connectivity, tax incentives, and regional economic expansion.",
      "developmentConcept": "Commercial property development, strategic land utilization, modern infrastructure, and institutional partnerships in the heart of Central Luzon.",
      "proposedComponents": [
        "Grade-A Corporate Office Towers",
        "Executive Suites & Business Innovation Hub",
        "Retail Promenade & Dining District",
        "Subterranean Parking & Transit Connectivity",
        "Smart Building Energy Management Systems"
      ],
      "previouslyReportedInfo": [
        "Previously discussed investment proposal: PHP 3.38 Billion",
        "Previously reported long-term lease expiration: Year 2058",
        "Subject to full leaseholder agreement verification and master development authorization"
      ],
      "specifications": {
        "Gross Floor Area": "Approx. 85,000 sqm",
        "Target Green Certification": "LEED Silver / BERDE Equivalent",
        "Parking Ratio": "1 slot per 70 sqm of leasable office space",
        "Connectivity": "Redundant optical fiber and dual-substation power"
      },
      "amenities": [
        "Corporate Sky Gardens",
        "Conference & Auditorium Center",
        "Commercial Retail Arcade",
        "Bicycle Commuter Hub with Showers",
        "Direct Highway & Airport Access"
      ],
      "featuredImage": "assets/images/project_clark_prestige_1790880127374.jpg",
      "masterplanImage": "assets/images/project_clark_prestige_1790880127374.jpg",
      "gallery": [
        "assets/images/project_clark_prestige_1790880127374.jpg",
        "assets/images/hero_hopeland_architecture_1790880040767.jpg"
      ],
      "published": true,
      "featured": true,
      "order": 3,
      "createdAt": "2026-03-01T10:00:00Z",
      "updatedAt": "2026-09-25T11:00:00Z"
    },
    {
      "id": "proj-spacenest-04",
      "slug": "dhenze-spacenest-mountain-resort",
      "name": "Dhenze SpaceNest Mountain Resort",
      "location": "Mascap, Rodriguez, Rizal",
      "category": "Hospitality",
      "stage": "Concept",
      "statusText": "Concept Development — Verification Required",
      "indicativeLandArea": "Scenic Mountain Acreage",
      "indicativeBudget": "Target Hospitality Joint Venture",
      "description": "An eco-futuristic hospitality and mountain retreat concept offering futuristic capsule villas with breathtaking vistas of the Sierra Madre mountain range.",
      "executiveSummary": "A nature-immersive eco-resort concept nestled in Mascap, Rodriguez, Rizal, targeted at modern adventure travelers, wellness seekers, and eco-tourists seeking respite from Metro Manila.",
      "developmentConcept": "63 Space Capsule Villas combining minimalist contemporary design, modular construction, panoramic viewing pods, and resort membership privileges.",
      "proposedComponents": [
        "63 Space Capsule Villas with Private Viewing Balconies",
        "Infinity Cliffside Pool overlooking Mountain Sea of Clouds",
        "Wellness Spa, Yoga Pavilion & Meditation Sanctuary",
        "Farm-to-Table Panoramic Restaurant & Cafe",
        "Exclusive Private Resort Membership Program"
      ],
      "previouslyReportedInfo": [
        "Previously discussed concept: 63 Space Capsule Villas",
        "Proposed features: Modern capsule accommodations, scenic viewing, recreational facilities",
        "Concept development stage: Site surveys, environmental permits, and access infrastructure pending"
      ],
      "specifications": {
        "Villa Count": "63 Modular Space Capsule Units",
        "Unit Typologies": "Single Pod (24 sqm) / Duplex Pod (48 sqm)",
        "Foundation": "Minimal-footprint steel pile foundation preserving natural terrain",
        "Water & Waste": "Zero-discharge biodigester septic systems and rainwater harvesting"
      },
      "amenities": [
        "Stargazing Observatory Deck",
        "Cliffside Lounge & Cafe",
        "Trekking & Eco-Trail Network",
        "Helipad / Emergency Medical Evacuation Point",
        "Off-Grid Solar Hybrid Storage Backup"
      ],
      "featuredImage": "assets/images/project_spacenest_resort_1790880149657.jpg",
      "masterplanImage": "assets/images/project_spacenest_resort_1790880149657.jpg",
      "gallery": [
        "assets/images/project_spacenest_resort_1790880149657.jpg",
        "assets/images/hero_hopeland_architecture_1790880040767.jpg"
      ],
      "published": true,
      "featured": true,
      "order": 4,
      "createdAt": "2026-04-12T11:00:00Z",
      "updatedAt": "2026-09-18T16:20:00Z"
    },
    {
      "id": "proj-elderlycare-05",
      "slug": "integrated-elderly-care-facility",
      "name": "Integrated Elderly Care Facility & Medical Hospitality",
      "location": "Clark Freeport Zone, Pampanga",
      "category": "Institutional",
      "stage": "Concept",
      "statusText": "Concept and Investment Planning — Funding, Approvals, and Feasibility Verification Required",
      "indicativeLandArea": "Multi-Tower Institutional Campus",
      "indicativeBudget": "US$80M–US$100M / PHP 5.0 Billion Reference",
      "description": "An institutional-grade three-tower healthcare and hospitality complex providing premier assisted living, memory care, and 5-star medical tourism hospitality.",
      "executiveSummary": "Positioned to serve international retirees, returning expatriates, and local residents seeking world-class healthcare combined with luxury resort living in Clark Freeport Zone.",
      "developmentConcept": "Integrated institutional healthcare campus consisting of a 3-tower masterplan combining medical hospitality, specialized geriatric services, and continuous wellness care.",
      "proposedComponents": [
        "Five-Star Hospitality Tower (112 Hotel Suites)",
        "Elderly Residential Care & Assisted Living Tower",
        "Specialized Memory Care & Cognitive Rehabilitation Pavilion",
        "State-of-the-Art Geriatric Medical Diagnostic Center",
        "Physiotherapy, Hydrotherapy & Wellness Center"
      ],
      "previouslyReportedInfo": [
        "Three-tower development concept",
        "Five-star hotel with 112 rooms",
        "Previously discussed budget references: US$80M–US$100M, later referenced as PHP 5.0 Billion",
        "Previously discussed healthcare infrastructure allocation: PHP 950 million"
      ],
      "specifications": {
        "Towers": "3 Interconnected Towers (12 to 16 storeys)",
        "Hospitality Suites": "112 Five-Star Guest Suites",
        "Assisted Living Units": "220 Accessible Residential Units",
        "Healthcare Allocation": "PHP 950 Million Medical Infrastructure Reference"
      },
      "amenities": [
        "24/7 On-Site Emergency & Geriatric Medical Team",
        "Barrier-Free Therapeutic Healing Gardens",
        "Hydrotherapy Pool & Wellness Spa",
        "Dietary Kitchen & Private Executive Dining",
        "Full Concierge & Assisted Mobility Fleet"
      ],
      "featuredImage": "assets/images/hero_hopeland_architecture_1790880040767.jpg",
      "masterplanImage": "assets/images/hero_hopeland_architecture_1790880040767.jpg",
      "gallery": [
        "assets/images/hero_hopeland_architecture_1790880040767.jpg",
        "assets/images/project_clark_prestige_1790880127374.jpg"
      ],
      "published": true,
      "featured": true,
      "order": 5,
      "createdAt": "2026-05-02T13:00:00Z",
      "updatedAt": "2026-09-28T09:45:00Z"
    }
  ],
  "properties": [
    {
      "id": "prop-bical-01",
      "slug": "bical-lot-block-1-lot-12",
      "title": "Bical Residential Premier Lot (400 sqm)",
      "projectId": "proj-bical-01",
      "projectName": "Bical Residential Development",
      "location": "Block 1, Lot 12, Bical, Mabalacat, Pampanga",
      "category": "Residential Lot",
      "status": "Available",
      "lotArea": 400,
      "price": 6800000,
      "currency": "PHP",
      "description": "Prime regular-cut corner residential lot fronting the primary boulevard with unobstructed eastern morning sunrise orientation.",
      "features": [
        "Corner Lot",
        "Near Main Clubhouse",
        "Underground Drainage",
        "Clean Title On Hand"
      ],
      "featuredImage": "assets/images/project_bical_residential_1790880055584.jpg",
      "images": [
        "assets/images/project_bical_residential_1790880055584.jpg",
        "assets/images/hero_hopeland_architecture_1790880040767.jpg"
      ],
      "published": true,
      "createdAt": "2026-06-01T08:00:00Z",
      "updatedAt": "2026-09-10T11:00:00Z"
    },
    {
      "id": "prop-bical-02",
      "slug": "bical-modern-tropical-villa-a",
      "title": "Modern Tropical Executive Villa (House & Lot)",
      "projectId": "proj-bical-01",
      "projectName": "Bical Residential Development",
      "location": "Bical, Mabalacat, Pampanga",
      "category": "House and Lot",
      "status": "Under Development",
      "lotArea": 400,
      "floorArea": 320,
      "bedrooms": 4,
      "bathrooms": 4,
      "parking": 2,
      "price": 20000000,
      "currency": "PHP",
      "description": "Signature two-storey modern tropical residence featuring double-height ceiling living room, master suite with walk-in closet, maid quarters, and landscaped lanai.",
      "features": [
        "4 Bedrooms Ensuite",
        "High Ceilings",
        "2-Car Garage",
        "Covered Lanai",
        "Solar-Ready Roof"
      ],
      "featuredImage": "assets/images/project_bical_residential_1790880055584.jpg",
      "images": [
        "assets/images/project_bical_residential_1790880055584.jpg",
        "assets/images/hero_hopeland_architecture_1790880040767.jpg"
      ],
      "published": true,
      "createdAt": "2026-06-05T09:30:00Z",
      "updatedAt": "2026-09-15T15:00:00Z"
    },
    {
      "id": "prop-clark-01",
      "slug": "clark-prestige-executive-floor",
      "title": "Clark Zion Prestige Corporate Office Floor",
      "projectId": "proj-clark-03",
      "projectName": "Clark Zion Prestige Park",
      "location": "Clark Freeport Zone, Pampanga",
      "category": "Commercial Space",
      "status": "Under Development",
      "lotArea": 1200,
      "floorArea": 1200,
      "parking": 15,
      "price": 180000000,
      "currency": "PHP",
      "description": "Full-floor Grade-A commercial office space ready for institutional headquarters or BPO operations with panoramic views of Clark.",
      "features": [
        "Grade-A Specification",
        "Dual Power Substation",
        "LEED Target Design",
        "Clark Tax Incentives"
      ],
      "featuredImage": "assets/images/project_clark_prestige_1790880127374.jpg",
      "images": [
        "assets/images/project_clark_prestige_1790880127374.jpg",
        "assets/images/hero_hopeland_architecture_1790880040767.jpg"
      ],
      "published": true,
      "createdAt": "2026-07-01T10:00:00Z",
      "updatedAt": "2026-09-20T10:00:00Z"
    },
    {
      "id": "prop-spacenest-01",
      "slug": "spacenest-capsule-villa-pod-07",
      "title": "SpaceNest Horizon Capsule Villa (Pod 07)",
      "projectId": "proj-spacenest-04",
      "projectName": "Dhenze SpaceNest Mountain Resort",
      "location": "Mascap, Rodriguez, Rizal",
      "category": "Villa",
      "status": "Under Development",
      "lotArea": 120,
      "floorArea": 36,
      "bedrooms": 1,
      "bathrooms": 1,
      "parking": 1,
      "price": 4500000,
      "currency": "PHP",
      "description": "Prefabricated aerospace-grade modular capsule villa with 270-degree curved glass viewing window, smart climate controls, and private outdoor observation deck.",
      "features": [
        "Panoramic View",
        "Smart Home Integration",
        "Resort Membership Inclusion",
        "Rental Management Option"
      ],
      "featuredImage": "assets/images/project_spacenest_resort_1790880149657.jpg",
      "images": [
        "assets/images/project_spacenest_resort_1790880149657.jpg",
        "assets/images/hero_hopeland_architecture_1790880040767.jpg"
      ],
      "published": true,
      "createdAt": "2026-07-15T14:00:00Z",
      "updatedAt": "2026-09-22T08:00:00Z"
    }
  ],
  "generalInquiries": [
    {
      "id": "inq-gen-001",
      "referenceNo": "HL-INQ-2026-0101",
      "type": "GENERAL",
      "fullName": "Atty. Manuel Santos",
      "email": "m.santos@santoslaw.ph",
      "phone": "+63 918 555 1234",
      "company": "Santos & Associates Legal",
      "subject": "Corporate Land Development Inquiry",
      "message": "We are representing a family trust with property adjacent to Mabalacat and wish to discuss corporate masterplanning capabilities.",
      "status": "NEW",
      "priority": "HIGH",
      "assignedTo": "Super Admin",
      "internalNotes": [
        "Client referred by regional banking partner. Requested initial corporate brief."
      ],
      "followUps": [],
      "createdAt": "2026-09-28T09:15:00Z",
      "updatedAt": "2026-09-28T09:15:00Z"
    },
    {
      "id": "inq-prop-002",
      "referenceNo": "HL-PRP-2026-0102",
      "type": "PROPERTY",
      "fullName": "Dr. Evelyn Ramirez",
      "email": "dr.ramirez@medicare.ph",
      "phone": "+63 920 888 4567",
      "subject": "Inquiry for Bical Residential House & Lot",
      "message": "Interested in the modern tropical villa package at Bical, Pampanga. Please send the payment schedule and lot layout options.",
      "propertyInterest": "Bical Residential Premier Lot (400 sqm)",
      "status": "IN_DISCUSSION",
      "priority": "MEDIUM",
      "assignedTo": "Maria Gomez (Marketing)",
      "internalNotes": [
        "Brochure sent via email. Follow up scheduled for Friday."
      ],
      "followUps": [
        {
          "id": "fu-1",
          "date": "2026-09-29T10:00:00Z",
          "recordedBy": "Maria Gomez",
          "notes": "Sent full PDF prospectus and title verification overview."
        }
      ],
      "createdAt": "2026-09-27T14:20:00Z",
      "updatedAt": "2026-09-29T10:00:00Z"
    }
  ],
  "investmentInquiries": [
    {
      "id": "inv-inq-001",
      "referenceNo": "HL-INV-2026-0801",
      "type": "INVESTMENT",
      "fullName": "Gregory Vance",
      "companyName": "Pacific Rim Capital Partners",
      "email": "g.vance@pacificrimcap.com",
      "phone": "+65 6712 3400",
      "country": "Singapore",
      "investorType": "Institutional Investor",
      "investmentInterest": "Commercial and Integrated Development / Healthcare",
      "preferredProject": "Clark Zion Prestige Park / Elderly Care Facility",
      "indicativeRange": "PHP 500M - PHP 1 Billion",
      "message": "We are evaluating Philippine commercial and healthcare infrastructure assets for our Southeast Asia Real Estate Fund. Requesting non-disclosure agreement and confidential teaser.",
      "status": "UNDER_REVIEW",
      "priority": "URGENT",
      "assignedTo": "Super Admin",
      "internalNotes": [
        "NDA draft sent to legal department for review before release of project numbers."
      ],
      "followUps": [],
      "createdAt": "2026-09-26T11:00:00Z",
      "updatedAt": "2026-09-27T16:00:00Z"
    },
    {
      "id": "inv-inq-002",
      "referenceNo": "HL-INV-2026-0802",
      "type": "INVESTMENT",
      "fullName": "Engr. Carlos Del Rosario",
      "companyName": "Del Rosario Holdings",
      "email": "carlos@delrosarioholdings.ph",
      "phone": "+63 917 889 2020",
      "country": "Philippines",
      "investorType": "Strategic Development Partner",
      "investmentInterest": "Agro-Industrial and Solar Integration",
      "preferredProject": "Taysan Integrated Masterplanned Development",
      "indicativeRange": "PHP 100M - PHP 300M",
      "message": "We have agricultural engineering capabilities and wish to explore joint venture participation on the greenhouse and processing clusters.",
      "status": "CONTACTED",
      "priority": "HIGH",
      "assignedTo": "Project Manager",
      "internalNotes": [
        "Preliminary call conducted. Requested site visit schedule."
      ],
      "followUps": [],
      "createdAt": "2026-09-25T15:30:00Z",
      "updatedAt": "2026-09-26T09:00:00Z"
    }
  ],
  "landownerInquiries": [
    {
      "id": "lnd-inq-001",
      "referenceNo": "HL-LND-2026-0301",
      "type": "LANDOWNER",
      "fullName": "Don Jose Maria Teodoro",
      "email": "jm.teodoro@estateproperties.ph",
      "phone": "+63 917 500 9001",
      "propertyLocation": "Porac / Angeles Boundary, Pampanga",
      "landArea": "24.5 Hectares",
      "currentZoning": "Agricultural / Reclassifiable to Residential",
      "titleStatus": "Clean TCT (Single Family Owner)",
      "proposedArrangement": "Joint Venture Property Development (Revenue / Area Share)",
      "message": "We own a 24.5-hectare contiguous parcel along the main arterial route. Looking for an institutional developer to partner with us for a residential subdivision masterplan.",
      "status": "NEW",
      "priority": "HIGH",
      "documentCount": 3,
      "internalNotes": [
        "Zoning map and title copies submitted. Scheduled for technical team appraisal."
      ],
      "followUps": [],
      "createdAt": "2026-09-29T11:45:00Z",
      "updatedAt": "2026-09-29T11:45:00Z"
    }
  ],
  "careers": [
    {
      "id": "car-001",
      "title": "Senior Civil & Structural Engineer",
      "department": "Engineering & Construction",
      "location": "Clark Freeport Zone, Pampanga",
      "employmentType": "Full-Time",
      "experienceLevel": "8+ Years",
      "description": "Lead structural design validation, contractor quality control, and field infrastructure execution for masterplanned subdivisions and commercial buildings.",
      "responsibilities": [
        "Oversee horizontal site grading, drainage systems, and road network construction",
        "Liaise with local government engineering offices for permits and building code compliance",
        "Manage bill of quantities (BOQ) and technical specification audits",
        "Conduct regular site structural safety and quality assurance inspections"
      ],
      "requirements": [
        "Licensed Civil Engineer (PRC Board)",
        "Minimum 8 years in large-scale residential or commercial land development",
        "Proficiency in AutoCAD, Civil 3D, and project scheduling tools",
        "Willingness to be stationed in Central Luzon project sites"
      ],
      "published": true,
      "createdAt": "2026-08-10T08:00:00Z"
    },
    {
      "id": "car-002",
      "title": "Real Estate Investment & Joint Venture Analyst",
      "department": "Business Development & Investment",
      "location": "Taguig / Clark Office",
      "employmentType": "Full-Time",
      "experienceLevel": "4+ Years",
      "description": "Perform financial modeling, feasibility analysis, landowner joint venture structuring, and project underwriting for prospective land developments.",
      "responsibilities": [
        "Build comprehensive DCF, IRR, and NPV financial models for masterplanned projects",
        "Draft investment teasers, memoranda, and joint venture proposals",
        "Conduct comparable market studies and property valuation assessments",
        "Support negotiations with landowners and institutional capital partners"
      ],
      "requirements": [
        "Degree in Finance, Economics, Real Estate Management, or related field",
        "Minimum 4 years in real estate private equity, property consulting, or development underwriting",
        "Advanced financial modeling skills in Microsoft Excel",
        "Strong presentation and analytical writing capabilities"
      ],
      "published": true,
      "createdAt": "2026-08-15T09:00:00Z"
    },
    {
      "id": "car-003",
      "title": "Senior Project Architect / Masterplanner",
      "department": "Design & Planning",
      "location": "Clark / Remote Hybrid",
      "employmentType": "Full-Time",
      "experienceLevel": "6+ Years",
      "description": "Design innovative community masterplans, housing typologies, and commercial architectural pavilions aligned with Hopeland design philosophy.",
      "responsibilities": [
        "Develop conceptual masterplans, site density studies, and architectural facades",
        "Coordinate with MEPFS, landscape, and environmental consultants",
        "Produce 3D visualizations, presentation decks, and BIM documentation",
        "Ensure compliance with HLURB/DHSUD rules and National Building Code"
      ],
      "requirements": [
        "Licensed Architect (UAP/PRC)",
        "Minimum 6 years in masterplanning or residential architecture",
        "Proficient in Revit, Rhino/SketchUp, Lumion, and Adobe Creative Suite",
        "Strong eye for sustainable tropical modernism"
      ],
      "published": true,
      "createdAt": "2026-08-20T10:00:00Z"
    }
  ],
  "careerApplications": [],
  "corporateDocuments": [
    {
      "id": "doc-001",
      "title": "Bical Residential Subdivision Master Development Plan (Rev C)",
      "category": "Architectural Drawing",
      "confidentiality": "CONFIDENTIAL",
      "fileSize": "14.8 MB",
      "fileType": "PDF / CAD",
      "fileUrl": "/documents/bical_masterplan_rev_c.pdf",
      "uploadedBy": "Arch. Raymond Luna",
      "description": "Approved horizontal subdivision lotting plan, road profiles, and drainage elevation survey.",
      "projectId": "proj-bical-01",
      "projectName": "Bical Residential Development",
      "createdAt": "2026-07-10T14:00:00Z"
    },
    {
      "id": "doc-002",
      "title": "Clark Zion Commercial Development Financial Underwriting & Feasibility",
      "category": "Feasibility Study",
      "confidentiality": "STRICTLY_CONFIDENTIAL",
      "fileSize": "8.4 MB",
      "fileType": "PDF / XLSX",
      "fileUrl": "/documents/clark_zion_feasibility_2026.pdf",
      "uploadedBy": "Investment Committee",
      "description": "10-Year cash flow projection, lease rate sensitivity matrix, and capital expenditure breakdown for PHP 3.38B proposal.",
      "projectId": "proj-clark-03",
      "projectName": "Clark Zion Prestige Park",
      "createdAt": "2026-08-04T16:30:00Z"
    },
    {
      "id": "doc-003",
      "title": "Taysan Integrated Estate Agro-Economic Baseline & Soil Analysis",
      "category": "Project Report",
      "confidentiality": "CONFIDENTIAL",
      "fileSize": "22.1 MB",
      "fileType": "PDF",
      "fileUrl": "/documents/taysan_agro_soil_report.pdf",
      "uploadedBy": "Agronomy Consultant Group",
      "description": "Comprehensive hydrological, topographical, and soil fertility survey across 1,010.79 hectares.",
      "projectId": "proj-taysan-02",
      "projectName": "Taysan Integrated Masterplanned Development",
      "createdAt": "2026-08-22T11:20:00Z"
    }
  ],
  "mediaLibrary": [
    {
      "id": "med-001",
      "title": "Corporate Architecture Flagship Pavilion",
      "category": "Project Rendering",
      "url": "assets/images/hero_hopeland_architecture_1790880040767.jpg",
      "alt": "Hopeland Estates Corporate Flagship Pavilion",
      "fileSize": "1.8 MB",
      "dimensions": "1920x1080",
      "uploadedBy": "System",
      "createdAt": "2026-09-01T08:00:00Z"
    },
    {
      "id": "med-002",
      "title": "Bical Residential Boulevard & Villas",
      "category": "Project Rendering",
      "url": "assets/images/project_bical_residential_1790880055584.jpg",
      "alt": "Bical Residential Community Subdivision",
      "fileSize": "2.1 MB",
      "dimensions": "1920x1080",
      "uploadedBy": "System",
      "createdAt": "2026-09-01T08:00:00Z"
    },
    {
      "id": "med-003",
      "title": "Taysan Agro-Industrial Masterplan Estate",
      "category": "Masterplan",
      "url": "assets/images/project_taysan_agro_1790880068800.jpg",
      "alt": "Taysan Integrated Masterplanned Development",
      "fileSize": "2.4 MB",
      "dimensions": "1920x1080",
      "uploadedBy": "System",
      "createdAt": "2026-09-01T08:00:00Z"
    },
    {
      "id": "med-004",
      "title": "Clark Zion Prestige Park Commercial Plaza",
      "category": "Project Rendering",
      "url": "assets/images/project_clark_prestige_1790880127374.jpg",
      "alt": "Clark Zion Prestige Commercial Park",
      "fileSize": "1.9 MB",
      "dimensions": "1920x1080",
      "uploadedBy": "System",
      "createdAt": "2026-09-01T08:00:00Z"
    },
    {
      "id": "med-005",
      "title": "Dhenze SpaceNest Capsule Mountain Resort",
      "category": "Project Rendering",
      "url": "assets/images/project_spacenest_resort_1790880149657.jpg",
      "alt": "Dhenze SpaceNest Mountain Resort Capsule Villas",
      "fileSize": "2.0 MB",
      "dimensions": "1920x1080",
      "uploadedBy": "System",
      "createdAt": "2026-09-01T08:00:00Z"
    }
  ],
  "activityLogs": [
    {
      "id": "act-001",
      "timestamp": "2026-09-30T10:15:00Z",
      "userId": "usr-superadmin",
      "userName": "Roberto Pablo (Super Admin)",
      "userRole": "SUPER_ADMIN",
      "action": "SYSTEM_INITIALIZATION",
      "entity": "SYSTEM",
      "details": "Corporate management platform initialized with preliminary development records and security controls.",
      "ipAddress": "127.0.0.1"
    },
    {
      "id": "act-002",
      "timestamp": "2026-09-30T14:30:00Z",
      "userId": "usr-admin",
      "userName": "Eduardo Ramos (Admin)",
      "userRole": "ADMIN",
      "action": "STATUS_UPDATE",
      "entity": "PROJECT",
      "entityId": "proj-bical-01",
      "details": "Updated Bical Residential Development lot inventory and house-and-lot specifications.",
      "ipAddress": "127.0.0.1"
    }
  ],
  "websiteContent": {
    "hero": {
      "badge": "Official Corporate Portal",
      "headline": "Building Strong Foundations for Better Tomorrows.",
      "subheadline": "Creating meaningful real estate opportunities through responsible development, quality construction, and strategic property investments across prime Philippine growth corridors.",
      "ctaPrimary": "Explore Our Developments",
      "ctaSecondary": "Partner With Us"
    },
    "introduction": {
      "kicker": "Institutional Real Estate & Property Development",
      "title": "About Hopeland Estates and Realty Corporation",
      "paragraph1": "Hopeland Estates and Realty Corporation is a forward-thinking Philippine real estate development and property management firm. We specialize in transforming strategic land holdings into masterplanned residential communities, commercial hubs, and agricultural innovation estates that generate lasting socioeconomic value.",
      "paragraph2": "Guided by corporate stewardship, engineering excellence, and institutional transparency, Hopeland bridges landowners, capital partners, and end-users to build communities that stand the test of time."
    },
    "philosophy": {
      "vision": "To be a premier, highly trusted Philippine property development corporation recognized for transforming land into resilient, sustainable, and thriving communities.",
      "mission": "To create enduring value for landowners, investors, and homeowners by executing disciplined land development, upholding strict engineering standards, and fostering sustainable growth.",
      "coreValues": [
        {
          "title": "Integrity",
          "desc": "Uncompromising corporate governance, transparent documentation, and ethical dealing."
        },
        {
          "title": "Quality",
          "desc": "Superior architectural planning, structural resilience, and long-term durability."
        },
        {
          "title": "Innovation",
          "desc": "Forward-looking masterplans integrating modern utilities, eco-tech, and renewable energy."
        },
        {
          "title": "Strategic Partnerships",
          "desc": "Equitable win-win joint ventures with reputable landowners and institutional capital."
        },
        {
          "title": "Long-Term Value",
          "desc": "Creating multi-generational wealth and thriving ecosystems for Philippine families."
        }
      ]
    },
    "contact": {
      "address": "Executive Tower, Clark Freeport Zone / Mabalacat, Pampanga, Philippines",
      "email": "corporate@hopelandestates.com",
      "phone": "+63 (045) 892-4100 / +63 917 800 4673",
      "businessHours": "Monday – Friday: 8:30 AM – 5:30 PM PHT"
    },
    "social": {
      "linkedin": "https://linkedin.com/company/hopeland-estates",
      "facebook": "https://facebook.com/hopelandestates",
      "twitter": "https://twitter.com/hopelandestates"
    },
    "seo": {
      "metaTitle": "Hopeland Estates and Realty Corporation | Official Corporate Portal",
      "metaDescription": "Building Strong Foundations for Better Tomorrows. Masterplanned residential, commercial, and agro-industrial developments in Pampanga, Batangas, and Rizal.",
      "keywords": "Hopeland Estates, Real Estate Development Philippines, Residential Pampanga, Clark Property, Taysan Agro-Industrial"
    }
  }
};
