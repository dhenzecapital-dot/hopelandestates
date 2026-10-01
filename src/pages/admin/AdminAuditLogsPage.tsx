import React, { useState, useEffect } from 'react';
import { ActivityLog } from '../../types/index.ts';
import { api } from '../../services/api.ts';
import { History, Shield, Clock, Search } from 'lucide-react';

export const AdminAuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState('');

  const fetchLogs = async () => {
    try {
      const data = await api.getActivityLogs();
      setLogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(l => {
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    return (
      l.userName.toLowerCase().includes(q) ||
      l.action.toLowerCase().includes(q) ||
      l.details.toLowerCase().includes(q) ||
      l.entity.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-semibold text-[#C49A32] uppercase tracking-wider block">
            Regulatory Compliance
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#0B2345]">
            Corporate Security & Audit Logs
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Immutable log of system logins, development modifications, property updates, and administrative events.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search audit trail..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-[#C49A32]"
          />
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-500 text-sm">Loading audit vaults...</div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B2345] text-white text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Timestamp (PHT)</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Entity</th>
                <th className="py-3 px-4">Transaction Details</th>
                <th className="py-3 px-4">Origin IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-sans font-semibold text-slate-900 whitespace-nowrap">
                    {log.userName}
                  </td>
                  <td className="py-3 px-4 text-[#C49A32] font-semibold">{log.userRole}</td>
                  <td className="py-3 px-4 text-[#0B2345] font-bold">{log.action}</td>
                  <td className="py-3 px-4 text-slate-600">{log.entity}</td>
                  <td className="py-3 px-4 font-sans text-slate-700 max-w-md truncate" title={log.details}>
                    {log.details}
                  </td>
                  <td className="py-3 px-4 text-slate-400">{log.ipAddress || '127.0.0.1'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
