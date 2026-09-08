'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const isAuth = sessionStorage.getItem('msa_admin_auth');
    if (isAuth === 'true') {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'msa2024admin';
    if (password === adminPass) {
      sessionStorage.setItem('msa_admin_auth', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="card p-6 md:p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Lock size={22} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-400 text-xs mt-1">MSA Traders Dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-100 focus:border-accent-400 outline-none text-sm"
              placeholder="Enter admin password"
              required
            />
          </div>
          {error && (
            <div className="bg-red-50 text-red-600 text-xs font-medium px-3 py-2 rounded-lg border border-red-100">
              {error}
            </div>
          )}
          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 !rounded-xl">
            Login <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
