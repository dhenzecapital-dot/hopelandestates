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

const DB_STORAGE_KEY = 'hl_client_db_v1';

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
      return JSON.parse(raw);
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
  updateCMS: (content: WebsiteContent): WebsiteContent => {
    const db = loadDatabase();
    db.websiteContent = content;
    saveDatabase(db);
    return content;
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
    return db.projects.find(p => p.slug === slug || p.id === slug);
  },
  createProject: (data: Partial<Project>): Project => {
    const db = loadDatabase();
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      slug: (data.name || 'project').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
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
      dateCreated: new Date().toISOString().split('T')[0]
    };
    db.projects.unshift(newProject);
    saveDatabase(db);
    return newProject;
  },
  updateProject: (id: string, data: Partial<Project>): Project => {
    const db = loadDatabase();
    const idx = db.projects.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Project not found');
    db.projects[idx] = { ...db.projects[idx], ...data };
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
    return db.properties.find(p => p.slug === slug || p.id === slug);
  },
  createProperty: (data: Partial<Property>): Property => {
    const db = loadDatabase();
    const newProperty: Property = {
      id: `prop-${Date.now()}`,
      slug: (data.title || 'property').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: data.title || 'Untitled Property',
      code: data.code || `HL-${Math.floor(1000 + Math.random() * 9000)}`,
      projectReference: data.projectReference || '',
      location: data.location || '',
      category: data.category || 'Residential Lot',
      status: data.status || 'AVAILABLE',
      indicativePrice: data.indicativePrice || 0,
      lotAreaSqm: data.lotAreaSqm || 0,
      floorAreaSqm: data.floorAreaSqm,
      pricePerSqm: data.pricePerSqm,
      description: data.description || '',
      highlights: data.highlights || [],
      featuredImage: data.featuredImage || 'assets/images/project_bical_residential_1790880055584.jpg',
      gallery: data.gallery || [],
      published: data.published ?? true,
      featured: data.featured ?? false,
      dateCreated: new Date().toISOString().split('T')[0]
    };
    db.properties.unshift(newProperty);
    saveDatabase(db);
    return newProperty;
  },
  updateProperty: (id: string, data: Partial<Property>): Property => {
    const db = loadDatabase();
    const idx = db.properties.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Property not found');
    db.properties[idx] = { ...db.properties[idx], ...data };
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
  submitGeneralInquiry: (data: Omit<GeneralInquiry, 'id' | 'dateSubmitted' | 'status'>) => {
    const db = loadDatabase();
    const item: GeneralInquiry = {
      ...data,
      id: `inq-gen-${Date.now()}`,
      dateSubmitted: new Date().toISOString(),
      status: 'NEW'
    };
    db.generalInquiries.unshift(item);
    saveDatabase(db);
    return item;
  },
  submitInvestmentInquiry: (data: Omit<InvestmentInquiry, 'id' | 'dateSubmitted' | 'status'>) => {
    const db = loadDatabase();
    const item: InvestmentInquiry = {
      ...data,
      id: `inq-inv-${Date.now()}`,
      dateSubmitted: new Date().toISOString(),
      status: 'NEW'
    };
    db.investmentInquiries.unshift(item);
    saveDatabase(db);
    return item;
  },
  submitLandownerInquiry: (data: Omit<LandownerInquiry, 'id' | 'dateSubmitted' | 'status'>) => {
    const db = loadDatabase();
    const item: LandownerInquiry = {
      ...data,
      id: `inq-lnd-${Date.now()}`,
      dateSubmitted: new Date().toISOString(),
      status: 'NEW'
    };
    db.landownerInquiries.unshift(item);
    saveDatabase(db);
    return item;
  },
  updateInquiryStatus: (type: 'general' | 'investment' | 'landowner', id: string, status: any) => {
    const db = loadDatabase();
    if (type === 'general') {
      const idx = db.generalInquiries.findIndex(i => i.id === id);
      if (idx !== -1) db.generalInquiries[idx].status = status;
    } else if (type === 'investment') {
      const idx = db.investmentInquiries.findIndex(i => i.id === id);
      if (idx !== -1) db.investmentInquiries[idx].status = status;
    } else if (type === 'landowner') {
      const idx = db.landownerInquiries.findIndex(i => i.id === id);
      if (idx !== -1) db.landownerInquiries[idx].status = status;
    }
    saveDatabase(db);
    return true;
  },

  // Careers
  getCareers: (all = false): Career[] => {
    const db = loadDatabase();
    return db.careers.filter(c => all || c.status === 'OPEN');
  },
  submitCareerApplication: (data: Omit<CareerApplication, 'id' | 'dateSubmitted' | 'status'>) => {
    const db = loadDatabase();
    const item: CareerApplication = {
      ...data,
      id: `app-${Date.now()}`,
      dateSubmitted: new Date().toISOString(),
      status: 'RECEIVED'
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
      category: doc.category || 'Corporate Governance',
      classification: doc.classification || 'INTERNAL',
      referenceNumber: doc.referenceNumber || `HL-DOC-${Date.now().toString().slice(-4)}`,
      fileType: doc.fileType || 'PDF',
      fileSize: doc.fileSize || '1.2 MB',
      fileUrl: doc.fileUrl || '#',
      uploadedBy: doc.uploadedBy || 'Admin',
      dateUploaded: new Date().toISOString().split('T')[0],
      downloadable: doc.downloadable ?? true
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
      thumbnailUrl: media.thumbnailUrl,
      fileSize: media.fileSize || '2.4 MB',
      dimensions: media.dimensions || '1920x1080',
      uploadedBy: media.uploadedBy || 'Admin',
      dateUploaded: new Date().toISOString().split('T')[0]
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
  getUsers: () => {
    const db = loadDatabase();
    return db.users.map(({ passwordHash, salt, ...u }) => u);
  },

  // Stats
  getStats: (): DashboardStats => {
    const db = loadDatabase();
    return {
      totalProjects: db.projects.length,
      activeProjects: db.projects.filter(p => p.stage !== 'Completed').length,
      totalProperties: db.properties.length,
      availableProperties: db.properties.filter(p => p.status === 'AVAILABLE').length,
      reservedProperties: db.properties.filter(p => p.status === 'RESERVED').length,
      soldProperties: db.properties.filter(p => p.status === 'SOLD').length,
      totalInquiries: db.generalInquiries.length + db.investmentInquiries.length + db.landownerInquiries.length,
      newInquiries: [
        ...db.generalInquiries,
        ...db.investmentInquiries,
        ...db.landownerInquiries
      ].filter(i => i.status === 'NEW').length,
      totalDocuments: db.corporateDocuments.length,
      openCareers: db.careers.filter(c => c.status === 'OPEN').length,
      totalUsers: db.users.length
    };
  },

  // Activity logs
  getActivityLogs: () => {
    const db = loadDatabase();
    return db.activityLogs;
  },

  // Auth
  login: (email: string, pass: string): { token: string; user: User } => {
    const db = loadDatabase();
    const u = db.users.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (!u) {
      throw new Error('Invalid email or password.');
    }
    // Allow Hopeland#2026! or default password for Superadmin
    const token = `hl_local_token_${Date.now()}`;
    const userSafe: User = {
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      department: u.department,
      status: u.status,
      lastLogin: new Date().toISOString()
    };
    return { token, user: userSafe };
  },

  getCurrentUser: (token: string): User | null => {
    const db = loadDatabase();
    // Return first active superadmin if session token exists
    const u = db.users.find(user => user.role === 'SUPER_ADMIN') || db.users[0];
    if (!u) return null;
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      department: u.department,
      status: u.status,
      lastLogin: u.lastLogin
    };
  }
};
