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
  WebsiteContent,
  DashboardStats
} from '../types/index.ts';
import { clientDb } from './clientDb.ts';

const TOKEN_KEY = 'hl_corporate_token';

export const authStorage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clearToken: () => localStorage.removeItem(TOKEN_KEY)
};

async function fetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = authStorage.getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ error: `Request failed with status ${res.status}` }));
    throw new Error(errorBody.error || errorBody.message || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  // Auth
  login: async (email: string, password: string) => {
    try {
      return await fetchJson<{ token: string; user: User }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
    } catch {
      return clientDb.login(email, password);
    }
  },
  getCurrentUser: async () => {
    try {
      return await fetchJson<{ user: User }>('/api/auth/me');
    } catch {
      const token = authStorage.getToken();
      if (!token) throw new Error('Not authenticated');
      const user = clientDb.getCurrentUser(token);
      if (!user) throw new Error('User not found');
      return { user };
    }
  },
  logout: async () => {
    try {
      await fetchJson('/api/auth/logout', { method: 'POST' });
    } catch {
      // Ignore static failure
    } finally {
      authStorage.clearToken();
    }
  },

  // Stats
  getStats: async () => {
    try {
      return await fetchJson<DashboardStats>('/api/stats');
    } catch {
      return clientDb.getStats();
    }
  },
  getSystemStatus: async () => {
    try {
      return await fetchJson<any>('/api/system/status');
    } catch {
      return { status: 'ONLINE', database: 'CONNECTED (STATIC-SYNC)' };
    }
  },

  // Projects
  getProjects: async (category?: string, all = false) => {
    try {
      const params = new URLSearchParams();
      if (category) params.set('category', category);
      if (all) params.set('all', 'true');
      return await fetchJson<Project[]>(`/api/projects?${params.toString()}`);
    } catch {
      return clientDb.getProjects(category, all);
    }
  },
  getProjectBySlug: async (slug: string) => {
    try {
      return await fetchJson<Project>(`/api/projects/${slug}`);
    } catch {
      const p = clientDb.getProjectBySlug(slug);
      if (!p) throw new Error('Project not found');
      return p;
    }
  },
  createProject: async (project: Partial<Project>) => {
    try {
      return await fetchJson<Project>('/api/projects', {
        method: 'POST',
        body: JSON.stringify(project)
      });
    } catch {
      return clientDb.createProject(project);
    }
  },
  updateProject: async (id: string, project: Partial<Project>) => {
    try {
      return await fetchJson<Project>(`/api/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(project)
      });
    } catch {
      return clientDb.updateProject(id, project);
    }
  },
  deleteProject: async (id: string) => {
    try {
      return await fetchJson<{ success: boolean }>(`/api/projects/${id}`, {
        method: 'DELETE'
      });
    } catch {
      return { success: clientDb.deleteProject(id) };
    }
  },

  // Properties
  getProperties: async (category?: string, all = false) => {
    try {
      const params = new URLSearchParams();
      if (category) params.set('category', category);
      if (all) params.set('all', 'true');
      return await fetchJson<Property[]>(`/api/properties?${params.toString()}`);
    } catch {
      return clientDb.getProperties(category, all);
    }
  },
  getPropertyBySlug: async (slug: string) => {
    try {
      return await fetchJson<Property>(`/api/properties/${slug}`);
    } catch {
      const p = clientDb.getPropertyBySlug(slug);
      if (!p) throw new Error('Property not found');
      return p;
    }
  },
  createProperty: async (property: Partial<Property>) => {
    try {
      return await fetchJson<Property>('/api/properties', {
        method: 'POST',
        body: JSON.stringify(property)
      });
    } catch {
      return clientDb.createProperty(property);
    }
  },
  updateProperty: async (id: string, property: Partial<Property>) => {
    try {
      return await fetchJson<Property>(`/api/properties/${id}`, {
        method: 'PUT',
        body: JSON.stringify(property)
      });
    } catch {
      return clientDb.updateProperty(id, property);
    }
  },
  deleteProperty: async (id: string) => {
    try {
      return await fetchJson<{ success: boolean }>(`/api/properties/${id}`, {
        method: 'DELETE'
      });
    } catch {
      return { success: clientDb.deleteProperty(id) };
    }
  },

  // Inquiries
  getInquiries: async () => {
    try {
      return await fetchJson<{
        general: GeneralInquiry[];
        investment: InvestmentInquiry[];
        landowner: LandownerInquiry[];
      }>('/api/admin/inquiries');
    } catch {
      return clientDb.getInquiries();
    }
  },
  getAdminInquiries: async () => {
    try {
      return await fetchJson<{
        general: GeneralInquiry[];
        investment: InvestmentInquiry[];
        landowner: LandownerInquiry[];
      }>('/api/admin/inquiries');
    } catch {
      return clientDb.getInquiries();
    }
  },
  submitGeneralInquiry: async (inquiry: Partial<GeneralInquiry>) => {
    try {
      return await fetchJson<{ success: boolean; referenceNo: string; message: string }>('/api/inquiries/general', {
        method: 'POST',
        body: JSON.stringify(inquiry)
      });
    } catch {
      const item = clientDb.submitGeneralInquiry(inquiry);
      return { success: true, referenceNo: item.referenceNo, message: 'Inquiry submitted.' };
    }
  },
  submitInvestmentInquiry: async (inquiry: Partial<InvestmentInquiry>) => {
    try {
      return await fetchJson<{ success: boolean; referenceNo: string; message: string }>('/api/inquiries/investment', {
        method: 'POST',
        body: JSON.stringify(inquiry)
      });
    } catch {
      const item = clientDb.submitInvestmentInquiry(inquiry);
      return { success: true, referenceNo: item.referenceNo, message: 'Investment inquiry submitted.' };
    }
  },
  submitLandownerInquiry: async (inquiry: Partial<LandownerInquiry>) => {
    try {
      return await fetchJson<{ success: boolean; referenceNo: string; message: string }>('/api/inquiries/landowner', {
        method: 'POST',
        body: JSON.stringify(inquiry)
      });
    } catch {
      const item = clientDb.submitLandownerInquiry(inquiry);
      return { success: true, referenceNo: item.referenceNo, message: 'Landowner inquiry submitted.' };
    }
  },
  updateInquiry: async (type: 'general' | 'investment' | 'landowner', id: string, updates: any) => {
    try {
      return await fetchJson<any>(`/api/admin/inquiries/${type}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
    } catch {
      return clientDb.updateInquiry(type, id, updates);
    }
  },
  updateInquiryStatus: async (type: 'general' | 'investment' | 'landowner', id: string, status: any) => {
    try {
      return await fetchJson<any>(`/api/admin/inquiries/${type}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });
    } catch {
      return clientDb.updateInquiry(type, id, { status });
    }
  },
  addFollowUp: async (type: 'general' | 'investment' | 'landowner', id: string, notes: string) => {
    try {
      return await fetchJson<any>(`/api/admin/inquiries/${type}/${id}/follow-up`, {
        method: 'POST',
        body: JSON.stringify({ notes })
      });
    } catch {
      return clientDb.addFollowUp(type, id, notes);
    }
  },

  // Careers
  getCareers: async (all = false) => {
    try {
      return await fetchJson<Career[]>(`/api/careers?all=${all}`);
    } catch {
      return clientDb.getCareers(all);
    }
  },
  submitCareerApplication: async (application: Partial<CareerApplication>) => {
    try {
      return await fetchJson<{ success: boolean; referenceNo: string; message: string }>('/api/careers/apply', {
        method: 'POST',
        body: JSON.stringify(application)
      });
    } catch {
      const item = clientDb.submitCareerApplication(application);
      return { success: true, referenceNo: item.referenceNo, message: 'Application submitted.' };
    }
  },
  getCareerApplications: async () => {
    try {
      return await fetchJson<CareerApplication[]>('/api/admin/career-applications');
    } catch {
      return clientDb.getCareerApplications();
    }
  },

  // Documents
  getDocuments: async () => {
    try {
      return await fetchJson<CorporateDocument[]>('/api/documents');
    } catch {
      return clientDb.getDocuments();
    }
  },
  addDocument: async (doc: Partial<CorporateDocument>) => {
    try {
      return await fetchJson<CorporateDocument>('/api/documents', {
        method: 'POST',
        body: JSON.stringify(doc)
      });
    } catch {
      return clientDb.addDocument(doc);
    }
  },
  uploadDocument: async (doc: Partial<CorporateDocument>) => {
    try {
      return await fetchJson<CorporateDocument>('/api/documents', {
        method: 'POST',
        body: JSON.stringify(doc)
      });
    } catch {
      return clientDb.addDocument(doc);
    }
  },
  deleteDocument: async (id: string) => {
    try {
      return await fetchJson<{ success: boolean }>(`/api/documents/${id}`, {
        method: 'DELETE'
      });
    } catch {
      return { success: clientDb.deleteDocument(id) };
    }
  },

  // Media
  getMedia: async () => {
    try {
      return await fetchJson<MediaItem[]>('/api/media');
    } catch {
      return clientDb.getMedia();
    }
  },
  addMedia: async (item: Partial<MediaItem>) => {
    try {
      return await fetchJson<MediaItem>('/api/media', {
        method: 'POST',
        body: JSON.stringify(item)
      });
    } catch {
      return clientDb.addMedia(item);
    }
  },
  deleteMedia: async (id: string) => {
    try {
      return await fetchJson<{ success: boolean }>(`/api/media/${id}`, {
        method: 'DELETE'
      });
    } catch {
      return { success: clientDb.deleteMedia(id) };
    }
  },

  // Users
  getUsers: async () => {
    try {
      return await fetchJson<User[]>('/api/admin/users');
    } catch {
      return clientDb.getUsers();
    }
  },
  createUser: async (userData: any) => {
    return fetchJson<User>('/api/admin/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },
  updateUser: async (id: string, userData: any) => {
    return fetchJson<User>(`/api/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  },
  deleteUser: async (id: string) => {
    return fetchJson<{ success: boolean }>(`/api/admin/users/${id}`, {
      method: 'DELETE'
    });
  },

  // CMS
  getCMS: async () => {
    try {
      return await fetchJson<WebsiteContent>('/api/cms');
    } catch {
      return clientDb.getCMS();
    }
  },
  updateCMS: async (content: Partial<WebsiteContent>) => {
    try {
      return await fetchJson<WebsiteContent>('/api/cms', {
        method: 'PUT',
        body: JSON.stringify(content)
      });
    } catch {
      return clientDb.updateCMS(content);
    }
  },

  // Logs
  getActivityLogs: async () => {
    try {
      return await fetchJson<ActivityLog[]>('/api/admin/activity-logs');
    } catch {
      return clientDb.getActivityLogs();
    }
  }
};
