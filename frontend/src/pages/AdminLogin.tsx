import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Mail, Lock, AlertCircle } from 'lucide-react';
import api from '../services/api';

const AdminLogin: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please fill in both fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/auth/login', { username, password });
      const { accessToken, username: responseUser, role } = response.data;
      
      // Update global context
      login(accessToken, responseUser, role);
      navigate('/admin');
    } catch (err: any) {
      console.error('Authentication failure:', err);
      setError(
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : 'Invalid credentials. Please verify username and password.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12 transition-colors duration-300">
      <div className="glow-spot top-1/4 left-1/4"></div>
      
      <div className="glass-card max-w-md w-full p-8 rounded-3xl space-y-6">
        {/* Brand details */}
        <div className="text-center space-y-2">
          <div className="p-3.5 bg-accent-purple/10 text-accent-purple rounded-full w-fit mx-auto">
            <ShieldCheck className="h-8 w-8 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">Admin Gatekeeper</h2>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Enterprise Security Portal
          </p>
        </div>

        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs flex items-start space-x-2 animate-shake">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Username</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/5 focus:border-accent-purple focus:outline-none text-sm transition-all"
                placeholder="admin"
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/5 focus:border-accent-purple focus:outline-none text-sm transition-all"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-accent-purple to-accent-indigo text-white text-xs font-bold uppercase hover:scale-[1.01] hover:shadow-lg hover:shadow-accent-purple/20 transition-all disabled:opacity-50"
          >
            {loading ? 'Authorizing Session...' : 'Authorize Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
