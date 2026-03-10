import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { stripHtmlTags } from '@/lib/utils';

export default async function ArticlesPage() {
	// Fetch all published articles directly from Supabase
	const { data: articles, error } = await supabase
		.from('articles')
		.select('*')
		.eq('is_published', true)
		.order('created_at', { ascending: false });

	return (
		<main className="min-h-screen bg-[#f9fafb] py-32">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				
				{/* Page Header Section */}
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0a2e24] mb-4">
						Berita & Artikel
					</h1>
					<div className="h-1.5 w-24 bg-[#eab308] rounded-full mx-auto mb-6"></div>
					<p className="text-gray-600 max-w-2xl mx-auto text-lg">
						Kumpulan informasi terbaru, liputan kegiatan, dan artikel keislaman dari Masjid Name.
					</p>
				</div>

				{/* Articles Grid (Responsive: 1 col mobile, 2 tablet, 3 desktop) */}
				{articles && articles.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{articles.map((article) => (
							<Link 
								href={`/article/${article.slug}`} 
								key={article.id} 
								className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
							>
								{/* Image Banner */}
								<div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
									<img 
										src={article.image_url || '/placeholder.jpg'} 
										alt={article.title}
										className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
									/>
									<div className="absolute top-4 left-4 bg-[#eab308] text-[#0a2e24] text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-widest shadow-sm">
										Kabar Masjid
									</div>
								</div>

								{/* Text Content */}
								<div className="p-6 flex flex-col flex-grow">
									<span className="text-gray-500 text-xs mb-3 flex items-center font-medium">
										<svg className="w-3.5 h-3.5 mr-1.5 text-[#0d9488]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
										{new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
									</span>
									
									<h2 className="text-xl font-serif font-bold text-[#0a2e24] mb-3 group-hover:text-[#0d9488] transition-colors line-clamp-2 leading-snug">
										{article.title}
									</h2>
									
									<p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
										{stripHtmlTags(article.content).substring(0, 150)}...
									</p>
									
									{/* Interactive Arrow Link */}
									<div className="mt-auto flex items-center text-[#0d9488] text-sm font-bold group-hover:text-[#0f766e] transition-colors uppercase tracking-wider">
										Baca Selengkapnya 
										<span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
									</div>
								</div>
							</Link>
						))}
					</div>
				) : (
					<div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
						<p className="text-gray-500 text-lg">Belum ada artikel yang dipublikasikan saat ini.</p>
					</div>
				)}

			</div>
		</main>
	);
}