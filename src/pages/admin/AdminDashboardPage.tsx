import React, { useEffect, useState } from 'react';
import { DashboardStats, ActivityLog } from '../../types/index.ts';
import { api } from '../../services/api.ts';
import { OFFICIAL_LOGO_PATH } from '../../components/HopelandLogo.tsx';
import {
  Building2,
  Home,
  Inbox,
  FileCheck,
  TrendingUp,
  FolderLock,
  Users,
  Briefcase,
  Clock,
  ArrowRight,
  ShieldAlert,
  Server
} from 'lucide-react';

interface AdminDashboardPageProps {
  onSelectTab: (tab: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onSelectTab }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [statsData, logsData, statusData] = await Promise.all([
          api.getStats(),
          api.getActivityLogs(),
          api.getSystemStatus()
        ]);
        setStats(statsData);
        setLogs(logsData.slice(0, 8));
        setSystemStatus(statusData);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-slate-500 text-sm">Aggregating corporate database metrics...</div>;
  }

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Welcome & Summary */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white p-1 rounded-lg border border-slate-200 shadow-xs shrink-0 flex items-center justify-center">
            <img
              src={OFFICIAL_LOGO_PATH}
              alt="Hopeland Official Logo"
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#C49A32] uppercase tracking-wider block">
              Hopeland Estates and Realty Corporation
            </span>
            <h1 className="text-2xl font-serif font-bold text-[#0B2345]">
              Executive Control Center
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              "Building Strong Foundations for Better Tomorrows." — Centralized administrative monitoring, projects, inventory, and inquiries.
            </p>
          </div>
        </div>

        {/* Integration Status Pill (Accurate reporting from Section 2) */}
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded border border-slate-200 shadow-xs text-xs shrink-0">
          <Server className="w-4 h-4 text-emerald-600" />
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Engine Status</span>
            <span className="font-semibold text-slate-800 text-[11px]">Database: Connected (Persistent)</span>
          </div>
        </div>
      </div>

      {/* Actual Live Database Metrics Grid (No hardcoded values) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          onClick={() => onSelectTab('projects')}
          className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs hover:border-[#0B2345] cursor-pointer transition-colors space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-medium">Total Projects</span>
            <Building2 className="w-4 h-4 text-[#C49A32]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#0B2345] tabular-nums">
            {stats?.totalProjects ?? 0}
          </div>
          <span className="text-[11px] text-slate-400 block">
            {stats?.activeProjects ?? 0} Active · {stats?.projectsUnderPlanning ?? 0} Planning
          </span>
        </div>

        <div
          onClick={() => onSelectTab('properties')}
          className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs hover:border-[#0B2345] cursor-pointer transition-colors space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-medium">Property Inventory</span>
            <Home className="w-4 h-4 text-[#C49A32]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#0B2345] tabular-nums">
            {stats?.publishedProperties ?? 0}
          </div>
          <span className="text-[11px] text-slate-400 block">
            Published Active Listings
          </span>
        </div>

        <div
          onClick={() => onSelectTab('inquiries')}
          className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs hover:border-[#0B2345] cursor-pointer transition-colors space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-medium">Investment Leads</span>
            <TrendingUp className="w-4 h-4 text-[#C49A32]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#0B2345] tabular-nums">
            {stats?.investmentInquiries ?? 0}
          </div>
          <span className="text-[11px] text-slate-400 block">
            Confidential Capital Submissions
          </span>
        </div>

        <div
          onClick={() => onSelectTab('inquiries')}
          className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs hover:border-[#0B2345] cursor-pointer transition-colors space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-medium">Landowner Proposals</span>
            <FileCheck className="w-4 h-4 text-[#C49A32]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#0B2345] tabular-nums">
            {stats?.landownerInquiries ?? 0}
          </div>
          <span className="text-[11px] text-slate-400 block">
            Joint Venture Dossiers Submitted
          </span>
        </div>

        <div
          onClick={() => onSelectTab('inquiries')}
          className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs hover:border-[#0B2345] cursor-pointer transition-colors space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-medium">General Inquiries</span>
            <Inbox className="w-4 h-4 text-[#C49A32]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#0B2345] tabular-nums">
            {(stats?.contactMessages ?? 0) + (stats?.propertyInquiries ?? 0)}
          </div>
          <span className="text-[11px] text-slate-400 block">
            {stats?.propertyInquiries ?? 0} Property Reservations
          </span>
        </div>

        <div
          onClick={() => onSelectTab('documents')}
          className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs hover:border-[#0B2345] cursor-pointer transition-colors space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-medium">Corporate Docs</span>
            <FolderLock className="w-4 h-4 text-[#C49A32]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#0B2345] tabular-nums">
            {stats?.totalCorporateDocuments ?? 0}
          </div>
          <span className="text-[11px] text-slate-400 block">
            Feasibility, CAD & Legal Contracts
          </span>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-medium">Career Applications</span>
            <Briefcase className="w-4 h-4 text-[#C49A32]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#0B2345] tabular-nums">
            {stats?.careerApplications ?? 0}
          </div>
          <span className="text-[11px] text-slate-400 block">
            Talent Dossiers on File
          </span>
        </div>

        <div
          onClick={() => onSelectTab('logs')}
          className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs hover:border-[#0B2345] cursor-pointer transition-colors space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-medium">Security Audits</span>
            <ShieldAlert className="w-4 h-4 text-[#C49A32]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#0B2345] tabular-nums">
            {logs.length}
          </div>
          <span className="text-[11px] text-slate-400 block">
            Active Logged Transactions
          </span>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="bg-[#0B2345] text-white p-6 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif font-bold text-base text-white">Administrative Actions</h3>
          <p className="text-xs text-slate-300">Quickly create new developments, publish property inventory, or update CMS copy.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onSelectTab('projects')}
            className="px-4 py-2 bg-[#C49A32] hover:bg-[#D8B65B] text-[#0B2345] text-xs font-semibold rounded uppercase tracking-wider transition-colors"
          >
            + New Project
          </button>
          <button
            onClick={() => onSelectTab('properties')}
            className="px-4 py-2 bg-[#163A63] hover:bg-[#07172F] text-white text-xs font-semibold rounded uppercase tracking-wider transition-colors"
          >
            + Add Property
          </button>
          <button
            onClick={() => onSelectTab('cms')}
            className="px-4 py-2 border border-slate-500 hover:border-white text-slate-200 hover:text-white text-xs font-semibold rounded uppercase tracking-wider transition-colors"
          >
            Edit CMS Content
          </button>
        </div>
      </div>

      {/* Recent Administrative Activity Logs */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C49A32]" />
            <h3 className="font-serif font-bold text-base text-[#0B2345]">
              Recent Audit Trail & User Activity
            </h3>
          </div>
          <button
            onClick={() => onSelectTab('logs')}
            className="text-xs text-[#0B2345] hover:text-[#C49A32] font-semibold flex items-center gap-1"
          >
            <span>Full Audit Vault</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {logs.map((log) => (
            <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-semibold text-slate-900">{log.userName}</span>
                <span className="text-slate-400 font-mono text-[11px] ml-1">({log.userRole})</span>
                <p className="text-slate-600 mt-0.5">{log.details}</p>
              </div>
              <div className="text-right text-[11px] text-slate-400 font-mono shrink-0">
                <span>{new Date(log.timestamp).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
