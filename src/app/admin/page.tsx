import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function AdminDashboard() {
  // Fetch just the count of articles for a quick dashboard metric
  const { count, error } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true });

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Selamat Datang, Admin</h1>
        <p className="text-gray-500 mt-2">Ringkasan aktivitas website masjid Anda hari ini.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Total Articles Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Total Artikel</h3>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-900">{error ? '0' : count}</p>
          <Link href="/admin/articles" className="mt-4 text-sm font-semibold text-[#0d9488] hover:underline flex items-center">
            Kelola Artikel <span className="ml-1">→</span>
          </Link>
        </div>

        {/* Placeholder Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Kunjungan Hari Ini</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-900">--</p>
          <span className="mt-4 text-sm text-gray-400">Segera hadir</span>
        </div>

        {/* Placeholder Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Status Profil</h3>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
          </div>
          <p className="text-lg font-bold text-gray-900 mt-2">Aktif</p>
          <Link href="/admin/profile" className="mt-auto text-sm font-semibold text-[#0d9488] hover:underline pt-4 flex items-center">
            Edit Profil <span className="ml-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}