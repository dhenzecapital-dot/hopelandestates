import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { HopelandLogo } from '../../components/HopelandLogo.tsx';
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft, KeyRound } from 'lucide-react';

interface AdminLoginPageProps {
  onSuccess: () => void;
  onNavigatePublic: (path: string) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onSuccess, onNavigatePublic }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#07172F] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C49A32_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 max-w-md w-full space-y-6">
        {/* Back Link */}
        <button
          onClick={() => onNavigatePublic('/')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Corporate Website</span>
        </button>

        {/* Login Card */}
        <div className="bg-[#0B2345] border border-[#163A63] rounded-lg p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <HopelandLogo variant="compact" inverted height={60} className="mx-auto" />
            <div>
              <h1 className="text-lg font-serif font-bold text-white tracking-wide">
                HOPELAND ESTATES AND REALTY CORPORATION
              </h1>
              <p className="text-xs text-[#C49A32] font-semibold uppercase tracking-wider mt-0.5">
                Administrative Control Center
              </p>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-950/80 border border-rose-500/60 rounded text-xs text-rose-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                Corporate Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@hopelandestates.com"
                  className="w-full pl-9 pr-3 py-2 bg-[#07172F] border border-slate-700 rounded text-white focus:outline-none focus:border-[#C49A32]"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                Access Key / Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-[#07172F] border border-slate-700 rounded text-white focus:outline-none focus:border-[#C49A32]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#C49A32] hover:bg-[#D8B65B] text-[#0B2345] font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 mt-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Console'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick-Fill Demo Roles for Testing */}
          <div className="pt-4 border-t border-slate-700/70 space-y-2">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
              Select Role Credentials For Evaluation:
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => handleQuickFill('robertopablo2000@gmail.com', 'Hopeland@2026!')}
                className="p-1.5 bg-[#07172F] border border-slate-700 rounded hover:border-[#C49A32] text-left text-slate-200"
              >
                <strong className="block text-[#D8B65B]">Super Admin</strong>
                <span className="text-[10px] text-slate-400">Full System Control</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('admin@hopelandestates.com', 'HopelandAdmin#2026')}
                className="p-1.5 bg-[#07172F] border border-slate-700 rounded hover:border-[#C49A32] text-left text-slate-200"
              >
                <strong className="block text-slate-200">Admin</strong>
                <span className="text-[10px] text-slate-400">Projects & Content</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('pm@hopelandestates.com', 'ProjectMgr#2026')}
                className="p-1.5 bg-[#07172F] border border-slate-700 rounded hover:border-[#C49A32] text-left text-slate-200"
              >
                <strong className="block text-slate-200">Project Manager</strong>
                <span className="text-[10px] text-slate-400">Engineering & Docs</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('marketing@hopelandestates.com', 'Marketing#2026')}
                className="p-1.5 bg-[#07172F] border border-slate-700 rounded hover:border-[#C49A32] text-left text-slate-200"
              >
                <strong className="block text-slate-200">Marketing</strong>
                <span className="text-[10px] text-slate-400">Listings & Leads</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('investor.viewer@hopelandestates.com', 'Viewer#2026')}
                className="p-1.5 bg-[#07172F] border border-slate-700 rounded hover:border-[#C49A32] text-left text-slate-200 col-span-2"
              >
                <strong className="block text-slate-200">Auditor / Viewer</strong>
                <span className="text-[10px] text-slate-400">Read-Only Oversight Clearance</span>
              </button>
            </div>
          </div>
        </div>

        {/* Security Footer Notice */}
        <p className="text-[11px] text-slate-500 text-center leading-relaxed">
          Authorized administrative personnel only. System activities and IP addresses are monitored and logged to corporate security audit vaults.
        </p>
      </div>
    </div>
  );
};
