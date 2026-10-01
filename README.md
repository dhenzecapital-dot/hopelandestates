# HOPELAND ESTATES AND REALTY CORPORATION
## Corporate Website, Real Estate Development & Administrative Management Platform

> **Corporate Tagline:** *"BUILDING STRONG FOUNDATIONS FOR BETTER TOMORROWS."*

Official digital corporate presence and centralized administrative management platform for **Hopeland Estates and Realty Corporation**, a premier Philippine property development firm specializing in masterplanned communities, commercial parks, and sustainable agro-industrial estates.

---

## 1. System Capabilities & Architecture

- **Public Corporate Platform:**
  - Executive Homepage with high-fidelity architectural imagery, logo branding, and live database metrics.
  - Comprehensive Corporate Overview, Vision, Mission, and Core Values.
  - 10 Dedicated Business Divisions (Real Estate Development, Residential, Commercial, Mixed-Use, Engineering, Land Acquisition, Marketing, Property Management, Joint Ventures, Hospitality).
  - Dynamic Project Portfolio with Category Filters and Project Detail Dossiers (Bikal Residential, Taysan Agro-Industrial, Clark Zion Prestige Park, Dhenze SpaceNest Mountain Resort, Integrated Elderly Care Facility).
  - Property Inventory Catalog with Search, Price Filters, and Lot/Floor Area Metrics.
  - Section 6 Investor Inquiry Platform with Automated Reference Generation (`HL-INV-2026-XXXX`).
  - Landowner Partnership Co-Development Evaluation Interface (`HL-LND-2026-XXXX`).
  - Human Capital & Careers Portal with Application Dossier Submission (`HL-APP-2026-XXXX`).
  - Corporate Contact Page with Interactive Clark Headquarters Map Coordinates.
  - Institutional Compliance: Privacy Policy & Terms of Service.

- **Administrative Control Center (`/admin`):**
  - **Secure Authentication & RBAC:** Cryptographic PBKDF2 password hashing with role enforcement (Super Admin, Admin, Project Manager, Marketing, Viewer).
  - **Live Executive Dashboard:** Real-time database metrics (no hardcoded vanity statistics).
  - **Project Management Module:** CRUD operations, stage progression, transparency disclosures, and image management.
  - **Property Inventory Module:** Lot/floor area specifications, pricing, reservation tracking, and visibility toggling.
  - **Inquiry & CRM Module:** Status workflow (New, Under Review, Contacted, In Discussion, Resolved), internal notes, follow-up history logging, and one-click CSV export.
  - **Content Management System (CMS):** Live editing of homepage copy, philosophy, contact details, and SEO metadata.
  - **Corporate Document Management:** Tiered confidentiality repository (Public, Confidential, Strictly Confidential, Board Only) for feasibility studies, CAD drawings, and agreements.
  - **Media Library:** Image asset registry with preview, categorizing, and dimensions tracking.
  - **User Access Governance:** Super Admin user management for provisioning accounts and resetting access keys.
  - **System Audit Logs:** Immutable timestamped security audit trail tracking user actions and IP origins.

---

## 2. Technology Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion.
- **Backend:** Node.js, Express REST API, Server-side role authorization & validation.
- **Data Layer:** Persistent Relational JSON Engine (`/data/database.json`) with atomic write buffers and seeded corporate development records.
- **Build & Development:** Vite 8, TSX runtime (`server.ts`).

---

## 3. Getting Started & Development

### Installation

```bash
npm install
```

### Environment Configuration

Review `.env.example` and set any desired environment variables:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=""
SMTP_HOST=""
```

### Running Locally

```bash
npm run dev
```

The application runs on `http://localhost:3000` (or `http://0.0.0.0:3000`).

### Production Build

```bash
npm run build
npm start
```

---

## 4. Administrative Credentials for Evaluation

The following default accounts are seeded in the secure database:

| Role | Email | Password | Clearances |
|---|---|---|---|
| **Super Admin** | `robertopablo2000@gmail.com` | `Hopeland@2026!` | Full System Control & User Management |
| **Admin** | `admin@hopelandestates.com` | `HopelandAdmin#2026` | Projects, Inventory, Inquiries, CMS |
| **Project Manager** | `pm@hopelandestates.com` | `ProjectMgr#2026` | Projects, Engineering, Corporate Documents |
| **Marketing** | `marketing@hopelandestates.com` | `Marketing#2026` | Property Listings, CMS, Inquiries |
| **Auditor / Viewer** | `investor.viewer@hopelandestates.com` | `Viewer#2026` | Read-Only Audit & Oversight |

---

## 5. REST API Endpoints

- `POST /api/auth/login` - Authenticate administrative session
- `GET /api/auth/me` - Retrieve current authenticated profile
- `GET /api/stats` - Live database metrics
- `GET /api/projects` - Retrieve projects (with category and published filters)
- `POST /api/projects` - Create project dossier (Admin/PM)
- `PUT /api/projects/:id` - Update project record
- `DELETE /api/projects/:id` - Delete project record
- `GET /api/properties` - Retrieve property inventory
- `POST /api/inquiries/general` - Submit general or property inquiry
- `POST /api/inquiries/investment` - Submit investor inquiry (generates reference)
- `POST /api/inquiries/landowner` - Submit landowner proposal (generates reference)
- `GET /api/admin/inquiries/export` - Export inquiries as CSV
- `GET /api/cms` - Retrieve live website copy
- `PUT /api/cms` - Update corporate content
- `GET /api/documents` - Retrieve corporate repository documents
- `GET /api/admin/users` - User management (Super Admin)
- `GET /api/admin/activity-logs` - Audit logs
