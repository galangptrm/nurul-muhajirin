// src/app/admin/articles/[id]/EditForm.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { updateArticle } from '@/actions/article';
import dynamic from 'next/dynamic';

const WysiwygEditor = dynamic(() => import('@/components/cms/WysiwygEditor'), { 
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full bg-gray-50 border border-gray-200 rounded-xl animate-pulse flex items-center justify-center text-gray-400">
      Memuat Editor...
    </div>
  )
});

export default function EditForm({ article }: { article: any }) {
  // Initialize the WYSIWYG state with the existing content
  const [content, setContent] = useState(article.content || '');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <form action={updateArticle} className="p-8 space-y-6">
        
        {/* Hidden inputs to pass the ID and the old image URL to the Server Action */}
        <input type="hidden" name="id" value={article.id} />
        <input type="hidden" name="existing_image_url" value={article.image_url || ''} />

        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
            Judul Artikel <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            defaultValue={article.title}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-black focus:ring-2 focus:ring-[#0d9488] outline-none transition-all"
          />
        </div>

        {/* Display current image if it exists */}
        <div>
          <label htmlFor="image_file" className="block text-sm font-semibold text-gray-900 mb-2">
            Gambar Banner
          </label>
          {article.image_url && (
            <div className="mb-4">
              <img src={article.image_url} alt="Current banner" className="h-32 rounded-lg object-cover border border-gray-200" />
              <p className="text-xs text-gray-500 mt-1">Gambar saat ini. Upload file baru di bawah jika ingin mengganti.</p>
            </div>
          )}
          <input 
            type="file" 
            id="image_file" 
            name="image_file" 
            accept="image/*"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-black focus:ring-2 focus:ring-[#0d9488] outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-[#0d9488] hover:file:bg-emerald-100"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Isi Artikel <span className="text-red-500">*</span>
          </label>
          <WysiwygEditor value={content} onChange={setContent} />
          <input type="hidden" name="content" value={content} />
        </div>

        <div className="flex items-center pt-2">
          <input 
            type="checkbox" 
            id="is_published" 
            name="is_published" 
            defaultChecked={article.is_published}
            className="w-5 h-5 text-[#0d9488] bg-gray-100 border-gray-300 rounded focus:ring-[#0d9488]"
          />
          <label htmlFor="is_published" className="ml-3 text-sm font-medium text-gray-900">
            Publikasikan Artikel
          </label>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
          <Link 
            href="/admin/articles"
            className="px-6 py-3 rounded-xl font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Batal
          </Link>
          <button 
            type="submit"
            className="px-6 py-3 rounded-xl font-semibold text-white bg-[#0a2e24] hover:bg-[#0d9488] transition-colors"
          >
            Simpan Perubahan
          </button>
        </div>

      </form>
    </div>
  );
}