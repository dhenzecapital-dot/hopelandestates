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
    return fetchJson<{ token: string; user: User }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },
  getCurrentUser: async () => {
    return fetchJson<{ user: User }>('/api/auth/me');
  },
  logout: async () => {
    try {
      await fetchJson('/api/auth/logout', { method: 'POST' });
    } finally {
      authStorage.clearToken();
    }
  },

  // Stats
  getStats: async () => {
    return fetchJson<DashboardStats>('/api/stats');
  },
  getSystemStatus: async () => {
    return fetchJson<any>('/api/system/status');
  },

  // Projects
  getProjects: async (category?: string, all = false) => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (all) params.set('all', 'true');
    return fetchJson<Project[]>(`/api/projects?${params.toString()}`);
  },
  getProjectBySlug: async (slug: string) => {
    return fetchJson<Project>(`/api/projects/${slug}`);
  },
  createProject: async (project: Partial<Project>) => {
    return fetchJson<Project>('/api/projects', {
      method: 'POST',
      body: JSON.stringify(project)
    });
  },
  updateProject: async (id: string, project: Partial<Project>) => {
    return fetchJson<Project>(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project)
    });
  },
  deleteProject: async (id: string) => {
    return fetchJson<{ success: boolean }>(`/api/projects/${id}`, {
      method: 'DELETE'
    });
  },

  // Properties
  getProperties: async (category?: string, all = false) => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (all) params.set('all', 'true');
    return fetchJson<Property[]>(`/api/properties?${params.toString()}`);
  },
  getPropertyBySlug: async (slug: string) => {
    return fetchJson<Property>(`/api/properties/${slug}`);
  },
  createProperty: async (property: Partial<Property>) => {
    return fetchJson<Property>('/api/properties', {
      method: 'POST',
      body: JSON.stringify(property)
    });
  },
  updateProperty: async (id: string, property: Partial<Property>) => {
    return fetchJson<Property>(`/api/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(property)
    });
  },
  deleteProperty: async (id: string) => {
    return fetchJson<{ success: boolean }>(`/api/properties/${id}`, {
      method: 'DELETE'
    });
  },

  // Inquiries (Public)
  submitGeneralInquiry: async (data: Partial<GeneralInquiry>) => {
    return fetchJson<{ success: boolean; referenceNo: string; message: string }>('/api/inquiries/general', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  submitInvestmentInquiry: async (data: Partial<InvestmentInquiry>) => {
    return fetchJson<{ success: boolean; referenceNo: string; message: string }>('/api/inquiries/investment', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  submitLandownerInquiry: async (data: Partial<LandownerInquiry>) => {
    return fetchJson<{ success: boolean; referenceNo: string; message: string }>('/api/inquiries/landowner', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // Inquiries (Admin)
  getAdminInquiries: async () => {
    return fetchJson<{
      general: GeneralInquiry[];
      investment: InvestmentInquiry[];
      landowner: LandownerInquiry[];
    }>('/api/admin/inquiries');
  },
  updateInquiry: async (type: 'general' | 'investment' | 'landowner', id: string, updates: any) => {
    return fetchJson(`/api/admin/inquiries/${type}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  },
  addFollowUp: async (type: 'general' | 'investment' | 'landowner', id: string, notes: string) => {
    return fetchJson(`/api/admin/inquiries/${type}/${id}/follow-up`, {
      method: 'POST',
      body: JSON.stringify({ notes })
    });
  },

  // Careers & Applications
  getCareers: async () => {
    return fetchJson<Career[]>('/api/careers');
  },
  createCareer: async (career: Partial<Career>) => {
    return fetchJson<Career>('/api/careers', {
      method: 'POST',
      body: JSON.stringify(career)
    });
  },
  deleteCareer: async (id: string) => {
    return fetchJson<{ success: boolean }>(`/api/careers/${id}`, { method: 'DELETE' });
  },
  submitCareerApplication: async (app: Partial<CareerApplication>) => {
    return fetchJson<{ success: boolean; referenceNo: string; message: string }>('/api/careers/apply', {
      method: 'POST',
      body: JSON.stringify(app)
    });
  },
  getCareerApplications: async () => {
    return fetchJson<CareerApplication[]>('/api/admin/career-applications');
  },

  // Documents
  getDocuments: async () => {
    return fetchJson<CorporateDocument[]>('/api/documents');
  },
  uploadDocument: async (doc: Partial<CorporateDocument>) => {
    return fetchJson<CorporateDocument>('/api/documents', {
      method: 'POST',
      body: JSON.stringify(doc)
    });
  },
  deleteDocument: async (id: string) => {
    return fetchJson<{ success: boolean }>(`/api/documents/${id}`, { method: 'DELETE' });
  },

  // Media
  getMedia: async () => {
    return fetchJson<MediaItem[]>('/api/media');
  },
  addMedia: async (item: Partial<MediaItem>) => {
    return fetchJson<MediaItem>('/api/media', {
      method: 'POST',
      body: JSON.stringify(item)
    });
  },
  deleteMedia: async (id: string) => {
    return fetchJson<{ success: boolean }>(`/api/media/${id}`, { method: 'DELETE' });
  },

  // CMS
  getCMS: async () => {
    return fetchJson<WebsiteContent>('/api/cms');
  },
  updateCMS: async (content: Partial<WebsiteContent>) => {
    return fetchJson<WebsiteContent>('/api/cms', {
      method: 'PUT',
      body: JSON.stringify(content)
    });
  },

  // Users (Super Admin)
  getUsers: async () => {
    return fetchJson<User[]>('/api/admin/users');
  },
  createUser: async (user: any) => {
    return fetchJson<User>('/api/admin/users', {
      method: 'POST',
      body: JSON.stringify(user)
    });
  },
  updateUser: async (id: string, updates: any) => {
    return fetchJson<User>(`/api/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  },
  deleteUser: async (id: string) => {
    return fetchJson<{ success: boolean }>(`/api/admin/users/${id}`, { method: 'DELETE' });
  },

  // Audit Logs
  getActivityLogs: async () => {
    return fetchJson<ActivityLog[]>('/api/admin/activity-logs');
  }
};
