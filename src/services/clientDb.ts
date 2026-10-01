import { initialDbData } from './seedData.ts';
import {
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
  WebsiteContent,
  DashboardStats,
  User
} from '../types/index.ts';

const DB_STORAGE_KEY = 'hl_client_db_v3';

interface ClientDatabase {
  users: (User & { passwordHash?: string; salt?: string })[];
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

function loadDatabase(): ClientDatabase {
  try {
    const raw = localStorage.getItem(DB_STORAGE_KEY);
    if (raw) {
      const normalizedRaw = raw
        .replace(/Bical Residential Development/g, 'Bikal Residential')
        .replace(/Bical Residential/g, 'Bikal Residential')
        .replace(/Bical, Mabalacat/g, 'Bikal, Mabalacat')
        .replace(/Bical, Pampanga/g, 'Bikal, Pampanga');
      return JSON.parse(normalizedRaw);
    }
  } catch (err) {
    console.warn('Failed to parse client database from localStorage:', err);
  }
  return JSON.parse(JSON.stringify(initialDbData));
}

function saveDatabase(db: ClientDatabase): void {
  try {
    localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(db));
  } catch (err) {
    console.warn('Failed to save client database to localStorage:', err);
  }
}

export const clientDb = {
  // Website Content
  getCMS: (): WebsiteContent => {
    const db = loadDatabase();
    return db.websiteContent;
  },
  updateCMS: (content: Partial<WebsiteContent>): WebsiteContent => {
    const db = loadDatabase();
    db.websiteContent = { ...db.websiteContent, ...content };
    saveDatabase(db);
    return db.websiteContent;
  },

  // Projects
  getProjects: (category?: string, all = false): Project[] => {
    const db = loadDatabase();
    return db.projects.filter(p => {
      if (!all && p.published === false) return false;
      if (category && category !== 'All' && p.category !== category) return false;
      return true;
    });
  },
  getProjectBySlug: (slug: string): Project | undefined => {
    const db = loadDatabase();
    const altSlug = slug.includes('bical') ? slug.replace(/bical/g, 'bikal') : slug.replace(/bikal/g, 'bical');
    return db.projects.find(p => p.slug === slug || p.slug === altSlug || p.id === slug);
  },
  createProject: (data: Partial<Project>): Project => {
    const db = loadDatabase();
    const now = new Date().toISOString();
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      slug: data.slug || (data.name || 'project').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: data.name || 'Untitled Project',
      location: data.location || '',
      category: data.category || 'Residential',
      stage: data.stage || 'Planning',
      statusText: data.statusText || 'Preliminary Planning Concept',
      indicativeLandArea: data.indicativeLandArea || 'TBD',
      indicativeBudget: data.indicativeBudget || 'TBD',
      description: data.description || '',
      executiveSummary: data.executiveSummary || '',
      developmentConcept: data.developmentConcept || '',
      proposedComponents: data.proposedComponents || [],
      previouslyReportedInfo: data.previouslyReportedInfo || [],
      specifications: data.specifications || {},
      amenities: data.amenities || [],
      featuredImage: data.featuredImage || 'assets/images/hero_hopeland_architecture_1790880040767.jpg',
      masterplanImage: data.masterplanImage || 'assets/images/hero_hopeland_architecture_1790880040767.jpg',
      gallery: data.gallery || [],
      published: data.published ?? true,
      featured: data.featured ?? false,
      order: data.order ?? db.projects.length + 1,
      createdAt: now,
      updatedAt: now
    };
    db.projects.unshift(newProject);
    saveDatabase(db);
    return newProject;
  },
  updateProject: (id: string, data: Partial<Project>): Project => {
    const db = loadDatabase();
    const idx = db.projects.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Project not found');
    db.projects[idx] = { ...db.projects[idx], ...data, updatedAt: new Date().toISOString() };
    saveDatabase(db);
    return db.projects[idx];
  },
  deleteProject: (id: string): boolean => {
    const db = loadDatabase();
    db.projects = db.projects.filter(p => p.id !== id);
    saveDatabase(db);
    return true;
  },

  // Properties
  getProperties: (category?: string, all = false): Property[] => {
    const db = loadDatabase();
    return db.properties.filter(p => {
      if (!all && p.published === false) return false;
      if (category && category !== 'All' && p.category !== category) return false;
      return true;
    });
  },
  getPropertyBySlug: (slug: string): Property | undefined => {
    const db = loadDatabase();
    const altSlug = slug.includes('bical') ? slug.replace(/bical/g, 'bikal') : slug.replace(/bikal/g, 'bical');
    return db.properties.find(p => p.slug === slug || p.slug === altSlug || p.id === slug);
  },
  createProperty: (data: Partial<Property>): Property => {
    const db = loadDatabase();
    const now = new Date().toISOString();
    const newProperty: Property = {
      id: `prop-${Date.now()}`,
      slug: data.slug || (data.title || 'property').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: data.title || 'Untitled Property',
      projectId: data.projectId || '',
      projectName: data.projectName || '',
      location: data.location || '',
      category: data.category || 'Residential Lot',
      status: data.status || 'Available',
      lotArea: Number(data.lotArea) || 0,
      floorArea: data.floorArea ? Number(data.floorArea) : undefined,
      bedrooms: data.bedrooms ? Number(data.bedrooms) : undefined,
      bathrooms: data.bathrooms ? Number(data.bathrooms) : undefined,
      parking: data.parking ? Number(data.parking) : undefined,
      price: Number(data.price) || 0,
      currency: data.currency || 'PHP',
      description: data.description || '',
      features: data.features || [],
      featuredImage: data.featuredImage || 'assets/images/project_bical_residential_1790880055584.jpg',
      images: data.images || [],
      published: data.published ?? true,
      createdAt: now,
      updatedAt: now
    };
    db.properties.unshift(newProperty);
    saveDatabase(db);
    return newProperty;
  },
  updateProperty: (id: string, data: Partial<Property>): Property => {
    const db = loadDatabase();
    const idx = db.properties.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Property not found');
    db.properties[idx] = { ...db.properties[idx], ...data, updatedAt: new Date().toISOString() };
    saveDatabase(db);
    return db.properties[idx];
  },
  deleteProperty: (id: string): boolean => {
    const db = loadDatabase();
    db.properties = db.properties.filter(p => p.id !== id);
    saveDatabase(db);
    return true;
  },

  // Inquiries
  getInquiries: () => {
    const db = loadDatabase();
    return {
      general: db.generalInquiries,
      investment: db.investmentInquiries,
      landowner: db.landownerInquiries
    };
  },
  submitGeneralInquiry: (data: Partial<GeneralInquiry>) => {
    const db = loadDatabase();
    const now = new Date().toISOString();
    const refSeq = Math.floor(1000 + Math.random() * 9000);
    const item: GeneralInquiry = {
      id: `inq-gen-${Date.now()}`,
      referenceNo: `HL-INQ-2026-${refSeq}`,
      type: data.type || 'GENERAL',
      fullName: data.fullName || '',
      email: data.email || '',
      phone: data.phone || '',
      company: data.company || '',
      subject: data.subject || 'Website Inquiry',
      message: data.message || '',
      propertyInterest: data.propertyInterest,
      status: 'NEW',
      priority: 'MEDIUM',
      internalNotes: [],
      followUps: [],
      createdAt: now,
      updatedAt: now
    };
    db.generalInquiries.unshift(item);
    saveDatabase(db);
    return item;
  },
  submitInvestmentInquiry: (data: Partial<InvestmentInquiry>) => {
    const db = loadDatabase();
    const now = new Date().toISOString();
    const refSeq = Math.floor(1000 + Math.random() * 9000);
    const item: InvestmentInquiry = {
      id: `inq-inv-${Date.now()}`,
      referenceNo: `HL-INV-2026-${refSeq}`,
      type: 'INVESTMENT',
      fullName: data.fullName || '',
      companyName: data.companyName || '',
      email: data.email || '',
      phone: data.phone || '',
      country: data.country || 'Philippines',
      investorType: data.investorType || 'Individual Investor',
      investmentInterest: data.investmentInterest || 'General Corporate Opportunities',
      preferredProject: data.preferredProject || 'Undecided / Portfolio',
      indicativeRange: data.indicativeRange || '',
      message: data.message || '',
      status: 'NEW',
      priority: 'HIGH',
      internalNotes: [],
      followUps: [],
      createdAt: now,
      updatedAt: now
    };
    db.investmentInquiries.unshift(item);
    saveDatabase(db);
    return item;
  },
  submitLandownerInquiry: (data: Partial<LandownerInquiry>) => {
    const db = loadDatabase();
    const now = new Date().toISOString();
    const refSeq = Math.floor(1000 + Math.random() * 9000);
    const item: LandownerInquiry = {
      id: `inq-lnd-${Date.now()}`,
      referenceNo: `HL-LND-2026-${refSeq}`,
      type: 'LANDOWNER',
      fullName: data.fullName || '',
      email: data.email || '',
      phone: data.phone || '',
      propertyLocation: data.propertyLocation || '',
      landArea: data.landArea || '',
      currentZoning: data.currentZoning || 'Agricultural',
      titleStatus: data.titleStatus || 'Clean TCT',
      proposedArrangement: data.proposedArrangement || 'Joint Venture Development',
      message: data.message || '',
      documentCount: data.documentCount || 0,
      status: 'NEW',
      priority: 'HIGH',
      internalNotes: [],
      followUps: [],
      createdAt: now,
      updatedAt: now
    };
    db.landownerInquiries.unshift(item);
    saveDatabase(db);
    return item;
  },
  updateInquiry: (type: 'general' | 'investment' | 'landowner', id: string, updates: any) => {
    const db = loadDatabase();
    const now = new Date().toISOString();
    if (type === 'general') {
      const idx = db.generalInquiries.findIndex(i => i.id === id);
      if (idx !== -1) {
        db.generalInquiries[idx] = { ...db.generalInquiries[idx], ...updates, updatedAt: now };
        saveDatabase(db);
        return db.generalInquiries[idx];
      }
    } else if (type === 'investment') {
      const idx = db.investmentInquiries.findIndex(i => i.id === id);
      if (idx !== -1) {
        db.investmentInquiries[idx] = { ...db.investmentInquiries[idx], ...updates, updatedAt: now };
        saveDatabase(db);
        return db.investmentInquiries[idx];
      }
    } else if (type === 'landowner') {
      const idx = db.landownerInquiries.findIndex(i => i.id === id);
      if (idx !== -1) {
        db.landownerInquiries[idx] = { ...db.landownerInquiries[idx], ...updates, updatedAt: now };
        saveDatabase(db);
        return db.landownerInquiries[idx];
      }
    }
    throw new Error('Inquiry not found');
  },
  addFollowUp: (type: 'general' | 'investment' | 'landowner', id: string, notes: string) => {
    const db = loadDatabase();
    const followUpRecord = {
      id: `fu-${Date.now()}`,
      date: new Date().toISOString(),
      recordedBy: 'Admin',
      notes
    };
    if (type === 'general') {
      const item = db.generalInquiries.find(i => i.id === id);
      if (!item) throw new Error('Inquiry not found');
      item.followUps = [...(item.followUps || []), followUpRecord];
      item.status = 'IN_DISCUSSION';
      saveDatabase(db);
      return item;
    } else if (type === 'investment') {
      const item = db.investmentInquiries.find(i => i.id === id);
      if (!item) throw new Error('Inquiry not found');
      item.followUps = [...(item.followUps || []), followUpRecord];
      item.status = 'IN_DISCUSSION';
      saveDatabase(db);
      return item;
    } else {
      const item = db.landownerInquiries.find(i => i.id === id);
      if (!item) throw new Error('Inquiry not found');
      item.followUps = [...(item.followUps || []), followUpRecord];
      item.status = 'IN_DISCUSSION';
      saveDatabase(db);
      return item;
    }
  },

  // Careers
  getCareers: (all = false): Career[] => {
    const db = loadDatabase();
    return db.careers.filter(c => all || c.published);
  },
  submitCareerApplication: (data: Partial<CareerApplication>) => {
    const db = loadDatabase();
    const refSeq = Math.floor(1000 + Math.random() * 9000);
    const item: CareerApplication = {
      id: `app-${Date.now()}`,
      referenceNo: `HL-APP-2026-${refSeq}`,
      jobId: data.jobId || '',
      jobTitle: data.jobTitle || 'Corporate Position',
      applicantName: data.applicantName || '',
      email: data.email || '',
      phone: data.phone || '',
      linkedin: data.linkedin,
      portfolio: data.portfolio,
      coverLetter: data.coverLetter,
      resumeFileName: data.resumeFileName || 'resume.pdf',
      status: 'SUBMITTED',
      createdAt: new Date().toISOString()
    };
    db.careerApplications.unshift(item);
    saveDatabase(db);
    return item;
  },
  getCareerApplications: () => {
    const db = loadDatabase();
    return db.careerApplications;
  },

  // Documents
  getDocuments: () => {
    const db = loadDatabase();
    return db.corporateDocuments;
  },
  addDocument: (doc: Partial<CorporateDocument>) => {
    const db = loadDatabase();
    const newDoc: CorporateDocument = {
      id: `doc-${Date.now()}`,
      title: doc.title || 'Untitled Document',
      category: doc.category || 'Feasibility Study',
      confidentiality: doc.confidentiality || 'CONFIDENTIAL',
      fileType: doc.fileType || 'PDF',
      fileSize: doc.fileSize || '1.2 MB',
      fileUrl: doc.fileUrl || '#',
      uploadedBy: doc.uploadedBy || 'Admin',
      description: doc.description || '',
      projectId: doc.projectId,
      projectName: doc.projectName,
      createdAt: new Date().toISOString()
    };
    db.corporateDocuments.unshift(newDoc);
    saveDatabase(db);
    return newDoc;
  },
  deleteDocument: (id: string) => {
    const db = loadDatabase();
    db.corporateDocuments = db.corporateDocuments.filter(d => d.id !== id);
    saveDatabase(db);
    return true;
  },

  // Media
  getMedia: () => {
    const db = loadDatabase();
    return db.mediaLibrary;
  },
  addMedia: (media: Partial<MediaItem>) => {
    const db = loadDatabase();
    const newMedia: MediaItem = {
      id: `media-${Date.now()}`,
      title: media.title || 'Untitled Asset',
      category: media.category || 'Project Rendering',
      url: media.url || '',
      alt: media.alt || media.title || 'Corporate Media',
      fileSize: media.fileSize || '2.4 MB',
      dimensions: media.dimensions || '1920x1080',
      uploadedBy: media.uploadedBy || 'Admin',
      createdAt: new Date().toISOString()
    };
    db.mediaLibrary.unshift(newMedia);
    saveDatabase(db);
    return newMedia;
  },
  deleteMedia: (id: string) => {
    const db = loadDatabase();
    db.mediaLibrary = db.mediaLibrary.filter(m => m.id !== id);
    saveDatabase(db);
    return true;
  },

  // Users
  getUsers: (): User[] => {
    const db = loadDatabase();
    return db.users.map(({ passwordHash, salt, ...u }) => ({
      ...u,
      createdAt: u.createdAt || new Date().toISOString()
    }));
  },

  // Stats
  getStats: (): DashboardStats => {
    const db = loadDatabase();
    const projects = db.projects;
    const properties = db.properties;
    const generalInquiries = db.generalInquiries;
    return {
      totalProjects: projects.length,
      activeProjects: projects.filter(p => p.published && p.stage !== 'Completed' && p.stage !== 'On Hold').length,
      projectsUnderPlanning: projects.filter(p => p.stage === 'Planning' || p.stage === 'Concept' || p.stage === 'Feasibility').length,
      publishedProperties: properties.filter(p => p.published).length,
      propertyInquiries: generalInquiries.filter(i => i.type === 'PROPERTY').length,
      investmentInquiries: db.investmentInquiries.length,
      landownerInquiries: db.landownerInquiries.length,
      contactMessages: generalInquiries.filter(i => i.type === 'GENERAL' || i.type === 'PARTNERSHIP').length,
      careerApplications: db.careerApplications.length,
      totalCorporateDocuments: db.corporateDocuments.length
    };
  },

  // Activity logs
  getActivityLogs: () => {
    const db = loadDatabase();
    return db.activityLogs;
  },

  // Auth
  login: (email: string, _pass: string): { token: string; user: User } => {
    const db = loadDatabase();
    const u = db.users.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (!u) {
      throw new Error('Invalid email or password.');
    }
    const token = `hl_local_token_${Date.now()}`;
    const userSafe: User = {
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      department: u.department,
      status: u.status,
      lastLogin: new Date().toISOString(),
      createdAt: u.createdAt || new Date().toISOString()
    };
    return { token, user: userSafe };
  },

  getCurrentUser: (_token: string): User | null => {
    const db = loadDatabase();
    const u = db.users.find(user => user.role === 'SUPER_ADMIN') || db.users[0];
    if (!u) return null;
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      department: u.department,
      status: u.status,
      lastLogin: u.lastLogin,
      createdAt: u.createdAt || new Date().toISOString()
    };
  }
};
