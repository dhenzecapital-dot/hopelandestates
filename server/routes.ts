import { Router, Request, Response } from 'express';
import { db } from './db.ts';
import {
  authenticate,
  requireRoles,
  hashPassword,
  verifyPassword,
  createSession,
  destroySession,
  AuthenticatedRequest
} from './auth.ts';
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
  UserRole
} from '../src/types/index.ts';

export const apiRouter = Router();

// ==========================================
// 1. AUTHENTICATION ROUTES
// ==========================================

apiRouter.post('/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = db.getUserByEmail(email);
  if (!user || user.status !== 'ACTIVE') {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const isValid = verifyPassword(password, user.passwordHash, user.salt);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const token = createSession(user.id);
  user.lastLogin = new Date().toISOString();
  db.saveUser(user);

  db.logActivity({
    userId: user.id,
    userName: user.name,
    userRole: user.role,
    action: 'LOGIN',
    entity: 'AUTH',
    details: `User ${user.email} successfully logged in.`,
    ipAddress: req.ip
  });

  const { passwordHash: _, salt: __, ...safeUser } = user;
  res.json({ token, user: safeUser });
});

apiRouter.get('/auth/me', authenticate, (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const { passwordHash: _, salt: __, ...safeUser } = req.user;
  res.json({ user: safeUser });
});

apiRouter.post('/auth/logout', authenticate, (req: AuthenticatedRequest, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
    destroySession(token);
  }
  res.json({ success: true, message: 'Logged out successfully.' });
});

// ==========================================
// 2. DASHBOARD STATS & SYSTEM METRICS
// ==========================================

apiRouter.get('/stats', authenticate, (req: AuthenticatedRequest, res: Response) => {
  const projects = db.getProjects();
  const properties = db.getProperties();
  const generalInquiries = db.getGeneralInquiries();
  const investmentInquiries = db.getInvestmentInquiries();
  const landownerInquiries = db.getLandownerInquiries();
  const careerApplications = db.getCareerApplications();
  const docs = db.getCorporateDocuments();

  const activeProjects = projects.filter(p => p.published && p.stage !== 'Completed' && p.stage !== 'On Hold').length;
  const projectsUnderPlanning = projects.filter(p => p.stage === 'Planning' || p.stage === 'Concept' || p.stage === 'Feasibility').length;
  const publishedProperties = properties.filter(p => p.published).length;
  const propertyInquiries = generalInquiries.filter(i => i.type === 'PROPERTY').length;
  const contactMessages = generalInquiries.filter(i => i.type === 'GENERAL' || i.type === 'PARTNERSHIP').length;

  res.json({
    totalProjects: projects.length,
    activeProjects,
    projectsUnderPlanning,
    publishedProperties,
    propertyInquiries,
    investmentInquiries: investmentInquiries.length,
    landownerInquiries: landownerInquiries.length,
    contactMessages,
    careerApplications: careerApplications.length,
    totalCorporateDocuments: docs.length
  });
});

apiRouter.get('/system/status', (req: Request, res: Response) => {
  res.json({
    status: 'ONLINE',
    environment: process.env.NODE_ENV || 'production',
    database: {
      type: 'Persistent Relational Engine',
      connection: 'CONNECTED',
      path: '/data/database.json',
      externalPostgreSqlEnv: process.env.DATABASE_URL ? 'CONFIGURED' : 'PENDING_CONFIG (Using local engine)'
    },
    emailService: {
      status: process.env.SMTP_HOST ? 'CONFIGURED' : 'PENDING_CONFIG (Inquiries logged to admin dashboard)',
      provider: process.env.SMTP_HOST || 'Standard Local Log & Notification'
    },
    storageService: {
      status: 'OPERATIONAL',
      mode: 'Local Media Assets & Dynamic Storage'
    },
    version: '1.0.0-enterprise'
  });
});

// ==========================================
// 3. PROJECTS API
// ==========================================

apiRouter.get('/projects', (req: Request, res: Response) => {
  const all = db.getProjects();
  const publishedOnly = req.query.all !== 'true';
  const category = req.query.category as string | undefined;

  let filtered = publishedOnly ? all.filter(p => p.published) : all;
  if (category && category !== 'All') {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  res.json(filtered);
});

apiRouter.get('/projects/:slug', (req: Request, res: Response) => {
  const project = db.getProjectBySlug(req.params.slug);
  if (!project) {
    return res.status(404).json({ error: 'Project not found.' });
  }
  res.json(project);
});

apiRouter.post('/projects', authenticate, requireRoles(['ADMIN', 'PROJECT_MANAGER']), (req: AuthenticatedRequest, res: Response) => {
  const body = req.body;
  if (!body.name || !body.location || !body.category) {
    return res.status(400).json({ error: 'Project name, location, and category are required.' });
  }

  const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const id = `proj-${Date.now()}`;

  const newProject: Project = {
    id,
    slug,
    name: body.name,
    location: body.location,
    category: body.category,
    stage: body.stage || 'Concept',
    statusText: body.statusText || 'Preliminary Concept — Verification Required',
    indicativeLandArea: body.indicativeLandArea || 'To be determined',
    indicativeBudget: body.indicativeBudget || '',
    description: body.description || '',
    executiveSummary: body.executiveSummary || '',
    developmentConcept: body.developmentConcept || '',
    proposedComponents: body.proposedComponents || [],
    previouslyReportedInfo: body.previouslyReportedInfo || [],
    specifications: body.specifications || {},
    amenities: body.amenities || [],
    featuredImage: body.featuredImage || '/src/assets/images/hero_hopeland_architecture_1790880040767.jpg',
    masterplanImage: body.masterplanImage || '',
    gallery: body.gallery || [],
    published: body.published !== undefined ? body.published : true,
    featured: body.featured !== undefined ? body.featured : false,
    order: body.order || 99,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const saved = db.saveProject(newProject);
  db.logActivity({
    userId: req.user!.id,
    userName: req.user!.name,
    userRole: req.user!.role,
    action: 'CREATE_PROJECT',
    entity: 'PROJECT',
    entityId: saved.id,
    details: `Created new project "${saved.name}" (${saved.category}).`,
    ipAddress: req.ip
  });

  res.status(201).json(saved);
});

apiRouter.put('/projects/:id', authenticate, requireRoles(['ADMIN', 'PROJECT_MANAGER']), (req: AuthenticatedRequest, res: Response) => {
  const existing = db.getProjectBySlug(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Project not found.' });
  }

  const updated: Project = {
    ...existing,
    ...req.body,
    id: existing.id
  };

  const saved = db.saveProject(updated);
  db.logActivity({
    userId: req.user!.id,
    userName: req.user!.name,
    userRole: req.user!.role,
    action: 'UPDATE_PROJECT',
    entity: 'PROJECT',
    entityId: saved.id,
    details: `Updated project "${saved.name}".`,
    ipAddress: req.ip
  });

  res.json(saved);
});

apiRouter.delete('/projects/:id', authenticate, requireRoles(['ADMIN']), (req: AuthenticatedRequest, res: Response) => {
  const existing = db.getProjectBySlug(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Project not found.' });
  }

  db.deleteProject(existing.id);
  db.logActivity({
    userId: req.user!.id,
    userName: req.user!.name,
    userRole: req.user!.role,
    action: 'DELETE_PROJECT',
    entity: 'PROJECT',
    entityId: existing.id,
    details: `Deleted project "${existing.name}".`,
    ipAddress: req.ip
  });

  res.json({ success: true, message: 'Project removed.' });
});

// ==========================================
// 4. PROPERTIES API
// ==========================================

apiRouter.get('/properties', (req: Request, res: Response) => {
  const all = db.getProperties();
  const publishedOnly = req.query.all !== 'true';
  const category = req.query.category as string | undefined;

  let filtered = publishedOnly ? all.filter(p => p.published) : all;
  if (category && category !== 'All') {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  res.json(filtered);
});

apiRouter.get('/properties/:slug', (req: Request, res: Response) => {
  const prop = db.getPropertyBySlug(req.params.slug);
  if (!prop) {
    return res.status(404).json({ error: 'Property not found.' });
  }
  res.json(prop);
});

apiRouter.post('/properties', authenticate, requireRoles(['ADMIN', 'PROJECT_MANAGER', 'MARKETING']), (req: AuthenticatedRequest, res: Response) => {
  const body = req.body;
  if (!body.title || !body.location || !body.price) {
    return res.status(400).json({ error: 'Property title, location, and price are required.' });
  }

  const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const id = `prop-${Date.now()}`;

  const newProp: Property = {
    id,
    slug,
    title: body.title,
    projectId: body.projectId || '',
    projectName: body.projectName || '',
    location: body.location,
    category: body.category || 'Residential Lot',
    status: body.status || 'Available',
    lotArea: Number(body.lotArea) || 0,
    floorArea: body.floorArea ? Number(body.floorArea) : undefined,
    bedrooms: body.bedrooms ? Number(body.bedrooms) : undefined,
    bathrooms: body.bathrooms ? Number(body.bathrooms) : undefined,
    parking: body.parking ? Number(body.parking) : undefined,
    price: Number(body.price),
    currency: body.currency || 'PHP',
    description: body.description || '',
    features: body.features || [],
    featuredImage: body.featuredImage || '/src/assets/images/project_bical_residential_1790880055584.jpg',
    images: body.images || [],
    published: body.published !== undefined ? body.published : true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const saved = db.saveProperty(newProp);
  db.logActivity({
    userId: req.user!.id,
    userName: req.user!.name,
    userRole: req.user!.role,
    action: 'CREATE_PROPERTY',
    entity: 'PROPERTY',
    entityId: saved.id,
    details: `Added property listing "${saved.title}".`,
    ipAddress: req.ip
  });

  res.status(201).json(saved);
});

apiRouter.put('/properties/:id', authenticate, requireRoles(['ADMIN', 'PROJECT_MANAGER', 'MARKETING']), (req: AuthenticatedRequest, res: Response) => {
  const existing = db.getPropertyBySlug(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Property not found.' });
  }

  const updated: Property = {
    ...existing,
    ...req.body,
    id: existing.id
  };

  const saved = db.saveProperty(updated);
  db.logActivity({
    userId: req.user!.id,
    userName: req.user!.name,
    userRole: req.user!.role,
    action: 'UPDATE_PROPERTY',
    entity: 'PROPERTY',
    entityId: saved.id,
    details: `Updated property listing "${saved.title}".`,
    ipAddress: req.ip
  });

  res.json(saved);
});

apiRouter.delete('/properties/:id', authenticate, requireRoles(['ADMIN', 'MARKETING']), (req: AuthenticatedRequest, res: Response) => {
  const existing = db.getPropertyBySlug(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Property not found.' });
  }

  db.deleteProperty(existing.id);
  db.logActivity({
    userId: req.user!.id,
    userName: req.user!.name,
    userRole: req.user!.role,
    action: 'DELETE_PROPERTY',
    entity: 'PROPERTY',
    entityId: existing.id,
    details: `Deleted property listing "${existing.title}".`,
    ipAddress: req.ip
  });

  res.json({ success: true, message: 'Property listing removed.' });
});

// ==========================================
// 5. INQUIRIES & INVESTOR WORKFLOW
// ==========================================

// Public submission: General & Property Inquiries
apiRouter.post('/inquiries/general', (req: Request, res: Response) => {
  const body = req.body;
  if (!body.fullName || !body.email || !body.message) {
    return res.status(400).json({ error: 'Full name, email, and message are required.' });
  }

  const refSeq = Math.floor(1000 + Math.random() * 9000);
  const referenceNo = `HL-INQ-2026-${refSeq}`;
  const id = `inq-${Date.now()}`;

  const inquiry: GeneralInquiry = {
    id,
    referenceNo,
    type: body.type || 'GENERAL',
    fullName: body.fullName,
    email: body.email,
    phone: body.phone || '',
    company: body.company || '',
    subject: body.subject || 'Website Inquiry',
    message: body.message,
    propertyInterest: body.propertyInterest,
    status: 'NEW',
    priority: 'MEDIUM',
    internalNotes: [],
    followUps: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const saved = db.saveGeneralInquiry(inquiry);
  res.status(201).json({
    success: true,
    referenceNo: saved.referenceNo,
    message: 'Your inquiry has been received. Our corporate team will reach out to you shortly.'
  });
});

// Public submission: Dedicated Investment Inquiries (SECTION 6)
apiRouter.post('/inquiries/investment', (req: Request, res: Response) => {
  const body = req.body;
  if (!body.fullName || !body.email || !body.investorType || !body.indicativeRange) {
    return res.status(400).json({ error: 'Full name, email, investor type, and indicative range are required.' });
  }

  const refSeq = Math.floor(1000 + Math.random() * 9000);
  const referenceNo = `HL-INV-2026-${refSeq}`;
  const id = `inv-${Date.now()}`;

  const investment: InvestmentInquiry = {
    id,
    referenceNo,
    type: 'INVESTMENT',
    fullName: body.fullName,
    companyName: body.companyName || '',
    email: body.email,
    phone: body.phone || '',
    country: body.country || 'Philippines',
    investorType: body.investorType,
    investmentInterest: body.investmentInterest || 'General Corporate Opportunities',
    preferredProject: body.preferredProject || 'Undecided / Portfolio',
    indicativeRange: body.indicativeRange,
    message: body.message || '',
    status: 'NEW',
    priority: 'HIGH',
    internalNotes: [],
    followUps: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const saved = db.saveInvestmentInquiry(investment);
  res.status(201).json({
    success: true,
    referenceNo: saved.referenceNo,
    message: 'Your investment inquiry has been officially logged in our private registry. An executive partner will contact you under strict corporate confidentiality.'
  });
});

// Public submission: Landowner Partnerships
apiRouter.post('/inquiries/landowner', (req: Request, res: Response) => {
  const body = req.body;
  if (!body.fullName || !body.email || !body.propertyLocation || !body.landArea) {
    return res.status(400).json({ error: 'Full name, email, property location, and land area are required.' });
  }

  const refSeq = Math.floor(1000 + Math.random() * 9000);
  const referenceNo = `HL-LND-2026-${refSeq}`;
  const id = `lnd-${Date.now()}`;

  const landowner: LandownerInquiry = {
    id,
    referenceNo,
    type: 'LANDOWNER',
    fullName: body.fullName,
    email: body.email,
    phone: body.phone || '',
    propertyLocation: body.propertyLocation,
    landArea: body.landArea,
    currentZoning: body.currentZoning || 'Agricultural',
    titleStatus: body.titleStatus || 'Clean TCT',
    proposedArrangement: body.proposedArrangement || 'Joint Venture Development',
    message: body.message || '',
    documentCount: body.documentCount || 0,
    status: 'NEW',
    priority: 'HIGH',
    internalNotes: [],
    followUps: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const saved = db.saveLandownerInquiry(landowner);
  res.status(201).json({
    success: true,
    referenceNo: saved.referenceNo,
    message: 'Your property evaluation dossier has been submitted. Our land acquisition and development division will evaluate the preliminary information.'
  });
});

// Admin Inquiries Endpoints
apiRouter.get('/admin/inquiries', authenticate, requireRoles(['ADMIN', 'MARKETING', 'PROJECT_MANAGER', 'VIEWER']), (req: AuthenticatedRequest, res: Response) => {
  const general = db.getGeneralInquiries();
  const investment = db.getInvestmentInquiries();
  const landowner = db.getLandownerInquiries();

  res.json({
    general,
    investment,
    landowner
  });
});

apiRouter.put('/admin/inquiries/:type/:id', authenticate, requireRoles(['ADMIN', 'MARKETING']), (req: AuthenticatedRequest, res: Response) => {
  const { type, id } = req.params;
  const updates = req.body;

  if (type === 'general') {
    const list = db.getGeneralInquiries();
    const item = list.find(i => i.id === id);
    if (!item) return res.status(404).json({ error: 'Inquiry not found.' });
    const updated = db.saveGeneralInquiry({ ...item, ...updates, id: item.id });
    return res.json(updated);
  }

  if (type === 'investment') {
    const list = db.getInvestmentInquiries();
    const item = list.find(i => i.id === id);
    if (!item) return res.status(404).json({ error: 'Investment inquiry not found.' });
    const updated = db.saveInvestmentInquiry({ ...item, ...updates, id: item.id });
    return res.json(updated);
  }

  if (type === 'landowner') {
    const list = db.getLandownerInquiries();
    const item = list.find(i => i.id === id);
    if (!item) return res.status(404).json({ error: 'Landowner inquiry not found.' });
    const updated = db.saveLandownerInquiry({ ...item, ...updates, id: item.id });
    return res.json(updated);
  }

  res.status(400).json({ error: 'Invalid inquiry type.' });
});

apiRouter.post('/admin/inquiries/:type/:id/follow-up', authenticate, requireRoles(['ADMIN', 'MARKETING']), (req: AuthenticatedRequest, res: Response) => {
  const { type, id } = req.params;
  const { notes } = req.body;
  if (!notes) return res.status(400).json({ error: 'Notes are required.' });

  const followUpRecord = {
    id: `fu-${Date.now()}`,
    date: new Date().toISOString(),
    recordedBy: req.user!.name,
    notes
  };

  if (type === 'general') {
    const item = db.getGeneralInquiries().find(i => i.id === id);
    if (!item) return res.status(404).json({ error: 'Inquiry not found.' });
    item.followUps = item.followUps || [];
    item.followUps.push(followUpRecord);
    item.status = 'IN_DISCUSSION';
    return res.json(db.saveGeneralInquiry(item));
  }

  if (type === 'investment') {
    const item = db.getInvestmentInquiries().find(i => i.id === id);
    if (!item) return res.status(404).json({ error: 'Investment inquiry not found.' });
    item.followUps = item.followUps || [];
    item.followUps.push(followUpRecord);
    item.status = 'IN_DISCUSSION';
    return res.json(db.saveInvestmentInquiry(item));
  }

  if (type === 'landowner') {
    const item = db.getLandownerInquiries().find(i => i.id === id);
    if (!item) return res.status(404).json({ error: 'Landowner inquiry not found.' });
    item.followUps = item.followUps || [];
    item.followUps.push(followUpRecord);
    item.status = 'IN_DISCUSSION';
    return res.json(db.saveLandownerInquiry(item));
  }

  res.status(400).json({ error: 'Invalid type.' });
});

// Export inquiries as CSV
apiRouter.get('/admin/inquiries/export', authenticate, requireRoles(['ADMIN', 'MARKETING']), (req: AuthenticatedRequest, res: Response) => {
  const type = req.query.type as string;
  let rows: string[] = [];

  if (type === 'investment') {
    const list = db.getInvestmentInquiries();
    rows.push('ReferenceNo,FullName,Company,Email,Phone,Country,InvestorType,IndicativeRange,Status,CreatedAt');
    for (const i of list) {
      rows.push(`"${i.referenceNo}","${i.fullName}","${i.companyName || ''}","${i.email}","${i.phone}","${i.country}","${i.investorType}","${i.indicativeRange}","${i.status}","${i.createdAt}"`);
    }
  } else if (type === 'landowner') {
    const list = db.getLandownerInquiries();
    rows.push('ReferenceNo,OwnerName,Email,Phone,Location,LandArea,Zoning,TitleStatus,Arrangement,Status,CreatedAt');
    for (const i of list) {
      rows.push(`"${i.referenceNo}","${i.fullName}","${i.email}","${i.phone}","${i.propertyLocation}","${i.landArea}","${i.currentZoning}","${i.titleStatus}","${i.proposedArrangement}","${i.status}","${i.createdAt}"`);
    }
  } else {
    const list = db.getGeneralInquiries();
    rows.push('ReferenceNo,Type,FullName,Email,Phone,Company,Subject,Status,CreatedAt');
    for (const i of list) {
      rows.push(`"${i.referenceNo}","${i.type}","${i.fullName}","${i.email}","${i.phone}","${i.company || ''}","${i.subject}","${i.status}","${i.createdAt}"`);
    }
  }

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="hopeland_${type || 'general'}_inquiries.csv"`);
  res.send(rows.join('\n'));
});

// ==========================================
// 6. CMS & WEBSITE CONTENT
// ==========================================

apiRouter.get('/cms', (req: Request, res: Response) => {
  res.json(db.getWebsiteContent());
});

apiRouter.put('/cms', authenticate, requireRoles(['ADMIN', 'MARKETING']), (req: AuthenticatedRequest, res: Response) => {
  const updated = db.updateWebsiteContent(req.body);
  db.logActivity({
    userId: req.user!.id,
    userName: req.user!.name,
    userRole: req.user!.role,
    action: 'UPDATE_CMS',
    entity: 'WEBSITE_CONTENT',
    details: 'Corporate website content and copy updated.',
    ipAddress: req.ip
  });
  res.json(updated);
});

// ==========================================
// 7. CORPORATE DOCUMENT MANAGEMENT
// ==========================================

apiRouter.get('/documents', authenticate, requireRoles(['ADMIN', 'PROJECT_MANAGER', 'VIEWER']), (req: AuthenticatedRequest, res: Response) => {
  const docs = db.getCorporateDocuments();
  res.json(docs);
});

apiRouter.post('/documents', authenticate, requireRoles(['ADMIN', 'PROJECT_MANAGER']), (req: AuthenticatedRequest, res: Response) => {
  const body = req.body;
  if (!body.title || !body.category) {
    return res.status(400).json({ error: 'Title and category are required.' });
  }

  const newDoc: CorporateDocument = {
    id: `doc-${Date.now()}`,
    title: body.title,
    category: body.category,
    confidentiality: body.confidentiality || 'CONFIDENTIAL',
    fileSize: body.fileSize || '2.4 MB',
    fileType: body.fileType || 'PDF',
    fileUrl: body.fileUrl || '/documents/sample_document.pdf',
    uploadedBy: req.user!.name,
    description: body.description || '',
    projectId: body.projectId,
    projectName: body.projectName,
    createdAt: new Date().toISOString()
  };

  const saved = db.saveCorporateDocument(newDoc);
  db.logActivity({
    userId: req.user!.id,
    userName: req.user!.name,
    userRole: req.user!.role,
    action: 'UPLOAD_DOCUMENT',
    entity: 'DOCUMENT',
    entityId: saved.id,
    details: `Uploaded corporate document "${saved.title}" [${saved.confidentiality}].`,
    ipAddress: req.ip
  });

  res.status(201).json(saved);
});

apiRouter.delete('/documents/:id', authenticate, requireRoles(['ADMIN']), (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id;
  const doc = db.getCorporateDocuments().find(d => d.id === id);
  if (!doc) return res.status(404).json({ error: 'Document not found.' });

  db.deleteCorporateDocument(id);
  db.logActivity({
    userId: req.user!.id,
    userName: req.user!.name,
    userRole: req.user!.role,
    action: 'DELETE_DOCUMENT',
    entity: 'DOCUMENT',
    entityId: id,
    details: `Deleted corporate document "${doc.title}".`,
    ipAddress: req.ip
  });

  res.json({ success: true, message: 'Document deleted.' });
});

// ==========================================
// 8. MEDIA LIBRARY
// ==========================================

apiRouter.get('/media', (req: Request, res: Response) => {
  res.json(db.getMediaLibrary());
});

apiRouter.post('/media', authenticate, requireRoles(['ADMIN', 'PROJECT_MANAGER', 'MARKETING']), (req: AuthenticatedRequest, res: Response) => {
  const body = req.body;
  if (!body.title || !body.url) {
    return res.status(400).json({ error: 'Title and URL are required.' });
  }

  const item: MediaItem = {
    id: `med-${Date.now()}`,
    title: body.title,
    category: body.category || 'Project Rendering',
    url: body.url,
    alt: body.alt || body.title,
    fileSize: body.fileSize || '1.5 MB',
    dimensions: body.dimensions || '1920x1080',
    uploadedBy: req.user!.name,
    createdAt: new Date().toISOString()
  };

  const saved = db.saveMediaItem(item);
  res.status(201).json(saved);
});

apiRouter.delete('/media/:id', authenticate, requireRoles(['ADMIN']), (req: AuthenticatedRequest, res: Response) => {
  const item = db.getMediaLibrary().find(m => m.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Media not found.' });

  db.deleteMediaItem(req.params.id);
  res.json({ success: true, message: 'Media item deleted.' });
});

// ==========================================
// 9. CAREERS & APPLICATIONS
// ==========================================

apiRouter.get('/careers', (req: Request, res: Response) => {
  res.json(db.getCareers());
});

apiRouter.post('/careers', authenticate, requireRoles(['ADMIN']), (req: AuthenticatedRequest, res: Response) => {
  const body = req.body;
  if (!body.title || !body.department) {
    return res.status(400).json({ error: 'Job title and department are required.' });
  }

  const newCareer: Career = {
    id: `car-${Date.now()}`,
    title: body.title,
    department: body.department,
    location: body.location || 'Clark Freeport Zone, Pampanga',
    employmentType: body.employmentType || 'Full-Time',
    experienceLevel: body.experienceLevel || '3+ Years',
    description: body.description || '',
    responsibilities: body.responsibilities || [],
    requirements: body.requirements || [],
    published: body.published !== undefined ? body.published : true,
    createdAt: new Date().toISOString()
  };

  const saved = db.saveCareer(newCareer);
  res.status(201).json(saved);
});

apiRouter.delete('/careers/:id', authenticate, requireRoles(['ADMIN']), (req: AuthenticatedRequest, res: Response) => {
  db.deleteCareer(req.params.id);
  res.json({ success: true, message: 'Career position removed.' });
});

// Public job application
apiRouter.post('/careers/apply', (req: Request, res: Response) => {
  const body = req.body;
  if (!body.applicantName || !body.email || !body.jobId) {
    return res.status(400).json({ error: 'Applicant name, email, and position are required.' });
  }

  const refSeq = Math.floor(1000 + Math.random() * 9000);
  const application: CareerApplication = {
    id: `app-${Date.now()}`,
    referenceNo: `HL-APP-2026-${refSeq}`,
    jobId: body.jobId,
    jobTitle: body.jobTitle || 'Corporate Position',
    applicantName: body.applicantName,
    email: body.email,
    phone: body.phone || '',
    linkedin: body.linkedin,
    portfolio: body.portfolio,
    coverLetter: body.coverLetter,
    resumeFileName: body.resumeFileName || 'resume.pdf',
    status: 'SUBMITTED',
    createdAt: new Date().toISOString()
  };

  const saved = db.saveCareerApplication(application);
  res.status(201).json({
    success: true,
    referenceNo: saved.referenceNo,
    message: 'Your application has been received by HopeLand Human Capital Management.'
  });
});

apiRouter.get('/admin/career-applications', authenticate, requireRoles(['ADMIN', 'VIEWER']), (req: AuthenticatedRequest, res: Response) => {
  res.json(db.getCareerApplications());
});

// ==========================================
// 10. USER MANAGEMENT (SUPER_ADMIN ONLY)
// ==========================================

apiRouter.get('/admin/users', authenticate, requireRoles(['SUPER_ADMIN']), (req: AuthenticatedRequest, res: Response) => {
  const users = db.getUsers().map(({ passwordHash: _, salt: __, ...safeUser }) => safeUser);
  res.json(users);
});

apiRouter.post('/admin/users', authenticate, requireRoles(['SUPER_ADMIN']), (req: AuthenticatedRequest, res: Response) => {
  const { name, email, password, role, department } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'Name, email, password, and role are required.' });
  }

  if (db.getUserByEmail(email)) {
    return res.status(400).json({ error: 'A user with this email address already exists.' });
  }

  const { hash, salt } = hashPassword(password);
  const id = `usr-${Date.now()}`;

  const newUser = {
    id,
    name,
    email,
    role: role as UserRole,
    department: department || 'General Operations',
    status: 'ACTIVE' as const,
    createdAt: new Date().toISOString(),
    passwordHash: hash,
    salt
  };

  db.saveUser(newUser);
  db.logActivity({
    userId: req.user!.id,
    userName: req.user!.name,
    userRole: req.user!.role,
    action: 'CREATE_USER',
    entity: 'USER',
    entityId: newUser.id,
    details: `Created new user account for ${newUser.name} with role [${newUser.role}].`,
    ipAddress: req.ip
  });

  const { passwordHash: _, salt: __, ...safeUser } = newUser;
  res.status(201).json(safeUser);
});

apiRouter.put('/admin/users/:id', authenticate, requireRoles(['SUPER_ADMIN']), (req: AuthenticatedRequest, res: Response) => {
  const existing = db.getUserById(req.params.id);
  if (!existing) return res.status(404).json({ error: 'User not found.' });

  const { name, role, department, status, password } = req.body;
  if (name) existing.name = name;
  if (role) existing.role = role as UserRole;
  if (department) existing.department = department;
  if (status) existing.status = status;

  if (password && password.trim().length >= 6) {
    const { hash, salt } = hashPassword(password);
    existing.passwordHash = hash;
    existing.salt = salt;
  }

  db.saveUser(existing);
  db.logActivity({
    userId: req.user!.id,
    userName: req.user!.name,
    userRole: req.user!.role,
    action: 'UPDATE_USER',
    entity: 'USER',
    entityId: existing.id,
    details: `Updated user account for ${existing.name}.`,
    ipAddress: req.ip
  });

  const { passwordHash: _, salt: __, ...safeUser } = existing;
  res.json(safeUser);
});

apiRouter.delete('/admin/users/:id', authenticate, requireRoles(['SUPER_ADMIN']), (req: AuthenticatedRequest, res: Response) => {
  if (req.params.id === req.user!.id) {
    return res.status(400).json({ error: 'Cannot delete your own active administrative account.' });
  }

  const existing = db.getUserById(req.params.id);
  if (!existing) return res.status(404).json({ error: 'User not found.' });

  db.deleteUser(req.params.id);
  db.logActivity({
    userId: req.user!.id,
    userName: req.user!.name,
    userRole: req.user!.role,
    action: 'DELETE_USER',
    entity: 'USER',
    entityId: req.params.id,
    details: `Deleted user account "${existing.name}".`,
    ipAddress: req.ip
  });

  res.json({ success: true, message: 'User deleted.' });
});

// ==========================================
// 11. ACTIVITY LOGS (AUDIT TRAIL)
// ==========================================

apiRouter.get('/admin/activity-logs', authenticate, requireRoles(['ADMIN', 'VIEWER']), (req: AuthenticatedRequest, res: Response) => {
  const logs = db.getActivityLogs();
  res.json(logs);
});
