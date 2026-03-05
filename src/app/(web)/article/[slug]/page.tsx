import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import sanitizeHtml from 'sanitize-html';

// 1. Update the type definition so Next.js knows params is a Promise
export default async function ArticleDetailPage({ 
    params 
    }: Readonly<{ 
    params: Promise<{ slug: string }> 
    }>) {
  // 2. Await the params before trying to access the slug
  const { slug } = await params;

  // 3. Use the unwrapped slug in your Supabase query
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !article) {
    notFound();
  }

  const formattedDate = new Date(article.created_at).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const content = ( htmlContent : string ) => {
    // Sanitize the HTML before rendering
    const sanitizedContent = sanitizeHtml(htmlContent, { /* your options */ });
  
    return (
      <div
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    );
  };

  return (
    <main className="min-h-screen bg-[#f9fafb] py-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back Button */}
        <div className="mb-10">
          <Link href="/" className="inline-flex items-center text-sm font-semibold text-[#0d9488] hover:text-[#0f766e] transition-colors uppercase tracking-wider">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Kembali ke Beranda
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <span className="bg-[#eab308] text-[#0a2e24] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest inline-block w-max">
              Kabar Masjid
            </span>
            <span className="text-gray-500 text-sm flex items-center md:justify-end font-medium">
              <svg className="w-4 h-4 mr-2 text-[#0d9488]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              {formattedDate}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0a2e24] leading-tight mb-8">
            {article.title}
          </h1>

          {/* Featured Image */}
          <div className="relative w-full aspect-[16/9] md:aspect-[16/9] rounded-3xl overflow-hidden shadow-lg border border-gray-100">
            <img 
              src={article.image_url || '/placeholder.jpg'} 
              alt={article.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </header>

        {/* Article Content */}
        {/* Using whitespace-pre-wrap so that standard text line breaks are respected */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 mb-12">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap font-serif">
            {content(article.content)}
          </div>
        </div>

        {/* Share / Footer of Article */}
        <div className="flex flex-col sm:flex-row justify-between items-center py-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4 sm:mb-0">
            Bagikan artikel ini untuk menebar manfaat:
          </p>
          <div className="flex gap-3">
            <button className="h-10 px-6 rounded-full bg-[#25D366] hover:bg-[#1ebe57] text-white text-sm font-bold flex items-center transition-colors">
              WhatsApp
            </button>
            <button className="h-10 px-6 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white text-sm font-bold flex items-center transition-colors">
              Facebook
            </button>
          </div>
        </div>

      </article>
    </main>
  );
}