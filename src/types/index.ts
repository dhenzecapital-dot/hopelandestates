export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'PROJECT_MANAGER' | 'MARKETING' | 'VIEWER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  status: 'ACTIVE' | 'INACTIVE';
  lastLogin?: string;
  createdAt: string;
}

export type ProjectCategory = 
  | 'Residential'
  | 'Commercial'
  | 'Mixed-Use'
  | 'Hospitality'
  | 'Institutional'
  | 'Land Development'
  | 'Agro-Industrial';

export type ProjectStage = 
  | 'Concept'
  | 'Feasibility'
  | 'Planning'
  | 'Under Development'
  | 'Under Construction'
  | 'Completed'
  | 'On Hold';

export interface Project {
  id: string;
  slug: string;
  name: string;
  location: string;
  category: ProjectCategory;
  stage: ProjectStage;
  statusText: string; // e.g. "Preliminary Development Information — Verification Required"
  indicativeLandArea: string;
  indicativeBudget?: string;
  description: string;
  executiveSummary: string;
  developmentConcept: string;
  proposedComponents: string[];
  previouslyReportedInfo?: string[];
  specifications: Record<string, string>;
  amenities: string[];
  featuredImage: string;
  masterplanImage?: string;
  gallery: string[];
  published: boolean;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type PropertyCategory = 
  | 'House and Lot'
  | 'Residential Lot'
  | 'Commercial Lot'
  | 'Villa'
  | 'Commercial Space'
  | 'Industrial Parcel';

export type PropertyStatus = 
  | 'Available'
  | 'Reserved'
  | 'Sold'
  | 'Leased'
  | 'Under Development';

export interface Property {
  id: string;
  slug: string;
  title: string;
  projectId?: string;
  projectName?: string;
  location: string;
  category: PropertyCategory;
  status: PropertyStatus;
  lotArea: number; // in sqm
  floorArea?: number; // in sqm
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  price: number;
  currency: 'PHP' | 'USD';
  description: string;
  features: string[];
  featuredImage: string;
  images: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export type InquiryType = 'GENERAL' | 'PROPERTY' | 'INVESTMENT' | 'LANDOWNER' | 'PARTNERSHIP';
export type InquiryStatus = 'NEW' | 'UNDER_REVIEW' | 'CONTACTED' | 'IN_DISCUSSION' | 'RESOLVED' | 'ARCHIVED';
export type InquiryPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface BaseInquiry {
  id: string;
  referenceNo: string;
  type: InquiryType;
  fullName: string;
  email: string;
  phone: string;
  status: InquiryStatus;
  priority: InquiryPriority;
  assignedTo?: string;
  internalNotes: string[];
  followUps: { id: string; date: string; recordedBy: string; notes: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface GeneralInquiry extends BaseInquiry {
  type: 'GENERAL' | 'PROPERTY' | 'PARTNERSHIP';
  company?: string;
  subject: string;
  message: string;
  propertyInterest?: string;
}

export type InvestorType = 
  | 'Individual Investor'
  | 'Corporate Investor'
  | 'Institutional Investor'
  | 'Landowner'
  | 'Strategic Development Partner';

export interface InvestmentInquiry extends BaseInquiry {
  type: 'INVESTMENT';
  companyName?: string;
  country: string;
  investorType: InvestorType;
  investmentInterest: string;
  preferredProject: string;
  indicativeRange: string;
  message: string;
}

export interface LandownerInquiry extends BaseInquiry {
  type: 'LANDOWNER';
  propertyLocation: string;
  landArea: string;
  currentZoning: string;
  titleStatus: string;
  proposedArrangement: string;
  message: string;
  documentCount?: number;
}

export interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: 'Full-Time' | 'Part-Time' | 'Contract' | 'Executive';
  experienceLevel: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  published: boolean;
  createdAt: string;
}

export interface CareerApplication {
  id: string;
  referenceNo: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  email: string;
  phone: string;
  linkedin?: string;
  portfolio?: string;
  coverLetter?: string;
  resumeFileName: string;
  status: 'SUBMITTED' | 'SCREENING' | 'INTERVIEW' | 'OFFER' | 'REJECTED';
  createdAt: string;
}

export interface CorporateDocument {
  id: string;
  title: string;
  category: 'Feasibility Study' | 'Architectural Drawing' | 'Engineering' | 'Budget & Financial' | 'Investment Proposal' | 'Legal & Compliance' | 'Project Report';
  confidentiality: 'PUBLIC' | 'CONFIDENTIAL' | 'STRICTLY_CONFIDENTIAL' | 'BOARD_ONLY';
  fileSize: string;
  fileType: string;
  fileUrl: string;
  uploadedBy: string;
  description: string;
  projectId?: string;
  projectName?: string;
  createdAt: string;
}

export interface MediaItem {
  id: string;
  title: string;
  category: 'Project Rendering' | 'Site Photo' | 'Masterplan' | 'Corporate' | 'Branding';
  url: string;
  alt: string;
  fileSize: string;
  dimensions?: string;
  uploadedBy: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  entity: string;
  entityId?: string;
  details: string;
  ipAddress?: string;
}

export interface WebsiteContent {
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  introduction: {
    kicker: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
  };
  philosophy: {
    vision: string;
    mission: string;
    coreValues: { title: string; desc: string }[];
  };
  contact: {
    address: string;
    email: string;
    phone: string;
    businessHours: string;
  };
  social: {
    linkedin: string;
    facebook: string;
    twitter: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
}

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  projectsUnderPlanning: number;
  publishedProperties: number;
  propertyInquiries: number;
  investmentInquiries: number;
  landownerInquiries: number;
  contactMessages: number;
  careerApplications: number;
  totalCorporateDocuments: number;
}
