// src/app/admin/articles/create/page.tsx
'use client'; // This page must now be a client component to handle the WYSIWYG state

import Link from 'next/link';
import { useState } from 'react';
import { createArticle } from '@/actions/article';
import WysiwygEditor from '@/components/cms/WysiwygEditor';

export default function CreateArticlePage() {
  const [content, setContent] = useState('');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tambah Artikel Baru</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <form action={createArticle} className="p-8 space-y-6">
          
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
              Judul Artikel <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="title" 
              name="title"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-black focus:ring-2 focus:ring-[#0d9488] focus:border-[#0d9488] outline-none transition-all"
            />
          </div>

          {/* Actual File Upload Input */}
          <div>
            <label htmlFor="image_file" className="block text-sm font-semibold text-gray-900 mb-2">
              Upload Gambar Banner (Opsional)
            </label>
            <input 
              type="file" 
              id="image_file" 
              name="image_file" 
              accept="image/*"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-black focus:ring-2 focus:ring-[#0d9488] outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-[#0d9488] hover:file:bg-emerald-100"
            />
          </div>

          {/* WYSIWYG Editor Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Isi Artikel <span className="text-red-500">*</span>
            </label>
            
            {/* The visual editor updates the React state */}
            <WysiwygEditor value={content} onChange={setContent} />
            
            {/* The hidden input secretly passes the state to the Server Action */}
            <input type="hidden" name="content" value={content} />
          </div>

          <div className="flex items-center pt-2">
            <input 
              type="checkbox" 
              id="is_published" 
              name="is_published" 
              className="w-5 h-5 text-[#0d9488] bg-gray-100 border-gray-300 rounded focus:ring-[#0d9488]"
            />
            <label htmlFor="is_published" className="ml-3 text-sm font-medium text-gray-900">
              Langsung Publikasikan?
            </label>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
            <Link 
              href="/admin/articles"
              className="px-6 py-3 rounded-xl font-semibold text-gray-600 border border-gray-200"
            >
              Batal
            </Link>
            <button 
              type="submit"
              className="px-6 py-3 rounded-xl font-semibold text-white bg-[#0a2e24] hover:bg-[#0d9488] transition-colors"
            >
              Simpan Artikel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}