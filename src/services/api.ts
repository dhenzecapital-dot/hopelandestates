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
    } catch (err) {
      // Fallback for static GitHub Pages deployment
      return clientDb.login(email, password);
    }
  },
  getCurrentUser: async () => {
    try {
      return await fetchJson<{ user: User }>('/api/auth/me');
    } catch (err) {
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
      }>('/api/inquiries');
    } catch {
      return clientDb.getInquiries();
    }
  },
  submitGeneralInquiry: async (inquiry: Omit<GeneralInquiry, 'id' | 'dateSubmitted' | 'status'>) => {
    try {
      return await fetchJson<GeneralInquiry>('/api/inquiries/general', {
        method: 'POST',
        body: JSON.stringify(inquiry)
      });
    } catch {
      return clientDb.submitGeneralInquiry(inquiry);
    }
  },
  submitInvestmentInquiry: async (inquiry: Omit<InvestmentInquiry, 'id' | 'dateSubmitted' | 'status'>) => {
    try {
      return await fetchJson<InvestmentInquiry>('/api/inquiries/investment', {
        method: 'POST',
        body: JSON.stringify(inquiry)
      });
    } catch {
      return clientDb.submitInvestmentInquiry(inquiry);
    }
  },
  submitLandownerInquiry: async (inquiry: Omit<LandownerInquiry, 'id' | 'dateSubmitted' | 'status'>) => {
    try {
      return await fetchJson<LandownerInquiry>('/api/inquiries/landowner', {
        method: 'POST',
        body: JSON.stringify(inquiry)
      });
    } catch {
      return clientDb.submitLandownerInquiry(inquiry);
    }
  },
  updateInquiryStatus: async (type: 'general' | 'investment' | 'landowner', id: string, status: any) => {
    try {
      return await fetchJson<any>(`/api/inquiries/${type}/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
    } catch {
      return { success: clientDb.updateInquiryStatus(type, id, status) };
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
  submitCareerApplication: async (application: Omit<CareerApplication, 'id' | 'dateSubmitted' | 'status'>) => {
    try {
      return await fetchJson<CareerApplication>('/api/careers/apply', {
        method: 'POST',
        body: JSON.stringify(application)
      });
    } catch {
      return clientDb.submitCareerApplication(application);
    }
  },
  getCareerApplications: async () => {
    try {
      return await fetchJson<CareerApplication[]>('/api/careers/applications');
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
      return await fetchJson<User[]>('/api/users');
    } catch {
      return clientDb.getUsers();
    }
  },
  createUser: async (userData: any) => {
    return fetchJson<User>('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },
  updateUser: async (id: string, userData: any) => {
    return fetchJson<User>(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  },
  deleteUser: async (id: string) => {
    return fetchJson<{ success: boolean }>(`/api/users/${id}`, {
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
  updateCMS: async (content: WebsiteContent) => {
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
      return await fetchJson<ActivityLog[]>('/api/logs');
    } catch {
      return clientDb.getActivityLogs();
    }
  }
};
