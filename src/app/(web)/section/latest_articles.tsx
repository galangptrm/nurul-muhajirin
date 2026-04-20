import { supabase } from '@/lib/supabase';
import { stripHtmlTags } from '@/lib/utils';
import Link from 'next/link';

export default async function SectionArticles() {
	const { data: articles, error } = await supabase
		.from('articles')
		.select('*')
		.eq('is_published', true)
		.order('created_at', { ascending: false })
		.limit(5);

		// ADD THIS TEMPORARY CHECK:
	if (error) {
		console.error("Supabase Connection Error:", error.message);
	} else {
		console.log("Supabase Connected! Found articles:", articles?.length);
	}

	const mainArticle = articles?.[0];
	const sideArticles = articles?.slice(1, 5) || [];

	return (
		<section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
			{/* Section Header with Title and Gold Accent */}
			<div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-gray-200 pb-4">
			<div>
				<h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0a2e24] mb-3">Berita Terbaru</h2>
				<div className="h-1.5 w-16 bg-[#eab308] rounded-full"></div>
			</div>
			<Link href="/articles" className="text-[#0d9488] font-semibold hover:text-[#0f766e] transition-colors mt-4 md:mt-0 flex items-center text-sm uppercase tracking-wider">
				Lihat Semua Berita <span className="ml-1">→</span>
			</Link>
			</div>
			
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
			{/* Left: 1 Large Main News Card */}
			{mainArticle ? (
				<div className="lg:col-span-7 group flex flex-col">
				<Link href={`/article/${mainArticle.slug}`} className="block relative overflow-hidden rounded-2xl mb-6 shadow-sm">
					<img 
					src={mainArticle.image_url || '/placeholder.jpg'} 
					alt={mainArticle.title}
					className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
					/>
					<div className="absolute top-4 left-4 bg-[#eab308] text-[#0a2e24] text-xs font-bold px-3 py-1.5 rounded uppercase tracking-widest shadow-md">
					Kabar Masjid
					</div>
				</Link>
				
				<div className="flex flex-col flex-grow pr-4">
					<span className="text-gray-500 text-sm mb-3 flex items-center font-medium">
					<svg className="w-4 h-4 mr-2 text-[#0d9488]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
					{new Date(mainArticle.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
					</span>
					<Link href={`/article/${mainArticle.slug}`}>
					<h3 className="text-2xl md:text-3xl font-serif font-bold text-[#0a2e24] mb-4 group-hover:text-[#0d9488] transition-colors leading-tight">
						{mainArticle.title}
					</h3>
					</Link>
					<p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
					{stripHtmlTags(mainArticle.content.substring(0, 500))}...
					</p>
					<Link href={`/article/${mainArticle.slug}`} className="mt-auto inline-flex items-center text-[#0d9488] font-bold hover:text-[#0f766e] transition-colors">
					Baca Selengkapnya <span className="ml-2">→</span>
					</Link>
				</div>
				</div>
			) : (
				<div className="lg:col-span-7 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 min-h-[400px] border border-gray-100">
				Belum ada berita utama.
				</div>
			)}

			{/* Right: 4 Small List Items */}
			<div className="lg:col-span-5 flex flex-col justify-between">
				{sideArticles.map((article, index) => (
				<Link href={`/article/${article.slug}`} key={article.id} className={`group flex gap-5 items-center py-5 ${index !== 0 ? 'border-t border-gray-100' : 'pt-0'}`}>
					<div className="h-24 w-32 md:w-36 flex-shrink-0 rounded-xl overflow-hidden relative shadow-sm">
					<img 
						src={article.image_url || '/placeholder.jpg'} 
						alt={article.title}
						className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition duration-700 ease-in-out"
					/>
					</div>
					<div className="flex flex-col justify-center flex-grow">
					<span className="text-gray-400 text-xs mb-2 flex items-center">
						<svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
						{new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
					</span>
					<h4 className="font-serif font-bold text-[#0a2e24] group-hover:text-[#0d9488] transition-colors line-clamp-2 text-base leading-snug">
						{article.title}
					</h4>
					</div>
				</Link>
				))}
			</div>
			</div>
		</section>
	);
}