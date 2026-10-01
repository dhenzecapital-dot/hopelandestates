import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../../types/index.ts';
import { api } from '../../services/api.ts';
import { useAuth } from '../../context/AuthContext.tsx';
import {
  Users,
  UserPlus,
  Edit2,
  Trash2,
  ShieldCheck,
  KeyRound,
  X,
  CheckCircle2
} from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('ADMIN');
  const [department, setDepartment] = useState('Corporate Operations');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const roles: UserRole[] = [
    'SUPER_ADMIN',
    'ADMIN',
    'PROJECT_MANAGER',
    'MARKETING',
    'VIEWER'
  ];

  const fetchUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    try {
      await api.createUser({ name, email, password, role, department });
      setName('');
      setEmail('');
      setPassword('');
      setIsAdding(false);
      await fetchUsers();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to create user');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      await api.updateUser(editingUser.id, {
        name: editingUser.name,
        role: editingUser.role,
        department: editingUser.department,
        status: editingUser.status,
        password: password || undefined
      });
      setEditingUser(null);
      setPassword('');
      await fetchUsers();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update user');
    }
  };

  const handleDelete = async (id: string, userName: string) => {
    if (id === currentUser?.id) {
      alert('You cannot delete your own administrative account.');
      return;
    }
    if (!confirm(`Delete user account for "${userName}"?`)) return;
    try {
      await api.deleteUser(id);
      await fetchUsers();
    } catch (err: any) {
      alert(err.message || 'Delete failed');
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-semibold text-[#C49A32] uppercase tracking-wider block">
            Access Governance
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#0B2345]">
            Role-Based User Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Super Administrator console for issuing administrative credentials, roles, and department clearances.
          </p>
        </div>

        <button
          onClick={() => {
            setIsAdding(true);
            setErrorMsg(null);
          }}
          className="px-4 py-2 bg-[#0B2345] hover:bg-[#163A63] text-white text-xs font-semibold rounded uppercase tracking-wider transition-colors flex items-center gap-1.5"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add System User</span>
        </button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-500 text-sm">Loading users...</div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B2345] text-white text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role Clearance</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C49A32]" />
                    <span>{u.name}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">{u.email}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-[11px] font-semibold text-[#0B2345]">{u.role}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{u.department}</td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                      u.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingUser(u);
                        setErrorMsg(null);
                      }}
                      className="p-1.5 text-slate-600 hover:text-[#0B2345] rounded"
                      title="Edit User"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {u.id !== currentUser?.id && (
                      <button
                        onClick={() => handleDelete(u.id, u.name)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 rounded"
                        title="Delete User"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add User Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-serif font-bold text-[#0B2345]">Provision Administrative User</h3>
              <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && <div className="p-2 bg-rose-50 text-rose-700 rounded">{errorMsg}</div>}

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Eduardo Ramos"
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@hopelandestates.com"
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Temporary Password *</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Role Clearance</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none font-mono"
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Engineering"
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B2345] text-white font-semibold rounded uppercase tracking-wider"
                >
                  Provision User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-serif font-bold text-[#0B2345]">Edit User Credentials</h3>
              <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && <div className="p-2 bg-rose-50 text-rose-700 rounded">{errorMsg}</div>}

            <form onSubmit={handleUpdate} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Role</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as UserRole })}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none font-mono"
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Status</label>
                  <select
                    value={editingUser.status}
                    onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none font-mono"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Reset Password (leave blank to keep)</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password (optional)"
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#C49A32] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B2345] text-white font-semibold rounded uppercase tracking-wider"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
