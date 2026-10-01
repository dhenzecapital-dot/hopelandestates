import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { db, StoredUser } from './db.ts';
import { UserRole } from '../src/types/index.ts';

// In-memory active session tokens
interface Session {
  userId: string;
  token: string;
  expiresAt: number;
}

const activeSessions = new Map<string, Session>();

export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const generatedSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, generatedSalt, 1000, 64, 'sha512').toString('hex');
  return { hash, salt: generatedSalt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const result = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return result === hash;
}

export function createSession(userId: string): string {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  activeSessions.set(token, { userId, token, expiresAt });
  return token;
}

export function getSessionUser(token: string): StoredUser | null {
  const session = activeSessions.get(token);
  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return null;
  }
  const user = db.getUserById(session.userId);
  return user || null;
}

export function destroySession(token: string): void {
  activeSessions.delete(token);
}

export interface AuthenticatedRequest extends Request {
  user?: StoredUser;
}

// Middleware: extracts Bearer token or authorization header
export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authentication required. No authorization header provided.' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
  const user = getSessionUser(token);

  if (!user || user.status !== 'ACTIVE') {
    return res.status(401).json({ error: 'Session expired or invalid user credentials.' });
  }

  req.user = user;
  next();
}

// Middleware: checks role permissions
export function requireRoles(allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    if (req.user.role === 'SUPER_ADMIN') {
      return next(); // Super admin has full clearance
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Access denied. Requires one of [${allowedRoles.join(', ')}] but your role is '${req.user.role}'.`
      });
    }

    next();
  };
}

// Seed default users if none exist
export function initDefaultUsers() {
  const existingUsers = db.getUsers();
  if (existingUsers.length === 0) {
    const defaultAccounts = [
      {
        id: 'usr-superadmin',
        name: 'Roberto Pablo',
        email: 'robertopablo2000@gmail.com',
        role: 'SUPER_ADMIN' as UserRole,
        department: 'Executive Board',
        status: 'ACTIVE' as const,
        password: 'Hopeland@2026!'
      },
      {
        id: 'usr-admin',
        name: 'Eduardo Ramos',
        email: 'admin@hopelandestates.com',
        role: 'ADMIN' as UserRole,
        department: 'Corporate Administration',
        status: 'ACTIVE' as const,
        password: 'HopelandAdmin#2026'
      },
      {
        id: 'usr-pm',
        name: 'Arch. Raymond Luna',
        email: 'pm@hopelandestates.com',
        role: 'PROJECT_MANAGER' as UserRole,
        department: 'Project Planning & Construction',
        status: 'ACTIVE' as const,
        password: 'ProjectMgr#2026'
      },
      {
        id: 'usr-marketing',
        name: 'Maria Gomez',
        email: 'marketing@hopelandestates.com',
        role: 'MARKETING' as UserRole,
        department: 'Sales & Corporate Communications',
        status: 'ACTIVE' as const,
        password: 'Marketing#2026'
      },
      {
        id: 'usr-viewer',
        name: 'Auditor & Partner Viewer',
        email: 'investor.viewer@hopelandestates.com',
        role: 'VIEWER' as UserRole,
        department: 'External Audit & Oversight',
        status: 'ACTIVE' as const,
        password: 'Viewer#2026'
      }
    ];

    for (const acc of defaultAccounts) {
      const { hash, salt } = hashPassword(acc.password);
      db.saveUser({
        id: acc.id,
        name: acc.name,
        email: acc.email,
        role: acc.role,
        department: acc.department,
        status: acc.status,
        createdAt: new Date().toISOString(),
        passwordHash: hash,
        salt
      });
    }
  }
}
