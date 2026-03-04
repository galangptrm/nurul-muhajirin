// src/app/admin/articles/page.tsx
// src/app/admin/articles/page.tsx
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { deleteArticle } from '@/actions/article';
import DeleteButton from '@/components/cms/DeleteButton'; // 1. Import the new button

export default async function AdminArticlesPage() {
  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, title, is_published, created_at')
    .order('created_at', { ascending: false });
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Artikel</h1>
          <p className="text-gray-500 mt-1">Daftar semua berita dan tulisan masjid.</p>
        </div>
        <Link 
          href="/admin/articles/create" 
          className="bg-[#0d9488] hover:bg-[#0f766e] text-white px-6 py-2.5 rounded-lg font-semibold transition-colors flex items-center shadow-sm"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          Tambah Artikel Baru
        </Link>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Judul Artikel</th>
                <th className="px-6 py-4 font-semibold">Tanggal Dibuat</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {articles?.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    Belum ada artikel. Silakan tambah artikel baru.
                  </td>
                </tr>
              ) : (
                articles?.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900 line-clamp-1">{article.title}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(article.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        article.is_published 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {article.is_published ? 'Publik' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3 items-center">
                        <Link 
                          href={`/admin/articles/${article.id}`} 
                          className="text-[#0d9488] hover:text-[#0f766e] font-medium text-sm transition-colors"
                        >
                          Edit
                        </Link>
                        
                        <form action={deleteArticle}>
                          <input type="hidden" name="id" value={article.id} />
                          {/* 2. Use the Client Component here! */}
                          <DeleteButton /> 
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}