import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { stripHtmlTags } from '@/lib/utils';
import ArticleFilters from '@/components/web/ArticleFilters';
import { SORT_OPTIONS, type SortValue } from '@/lib/articles';

export default async function ArticlesPage({
	searchParams,
}: {
	searchParams: Promise<{ page?: string; q?: string; sort?: string }>
}) {
	// 1. Await the searchParams and calculate pagination limits
	const resolvedParams = await searchParams;
	const currentPage = Number(resolvedParams.page) || 1;
	const query = (resolvedParams.q || '').trim();
	const sort: SortValue = SORT_OPTIONS.some((o) => o.value === resolvedParams.sort)
		? resolvedParams.sort as SortValue
		: 'terbaru';
	const ITEMS_PER_PAGE = 9;
	
	const from = (currentPage - 1) * ITEMS_PER_PAGE;
	const to = from + ITEMS_PER_PAGE - 1;

	// 2. Fetch data using .range() and request the exact total count
	let request = supabase
		.from('articles')
		.select('*', { count: 'exact' })
		.eq('is_published', true);

	if (query) {
		request = request.ilike('title', `%${query}%`);
	}

	request = sort === 'judul'
		? request.order('title', { ascending: true })
		: request.order('created_at', { ascending: sort === 'terlama' });

	const { data: articles, count, error } = await request.range(from, to);

	// 3. Calculate total pages
	const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);

	// Keep search & sort when moving between pages
	const pageHref = (page: number) => {
		const params = new URLSearchParams();
		if (query) params.set('q', query);
		if (sort !== 'terbaru') params.set('sort', sort);
		params.set('page', String(page));
		return `/articles?${params.toString()}`;
	};

	return (
		<main data-testid="articles-page" className="min-h-screen bg-[#f9fafb] py-32">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				
				{/* Page Header Section */}
				<div className="text-center mb-16">
					<h1 data-testid="articles-title" className="text-4xl md:text-5xl font-serif font-bold text-[#0a2e24] mb-4">
						Berita & Artikel
					</h1>
					<div className="h-1.5 w-24 bg-[#eab308] rounded-full mx-auto mb-6"></div>
					<p className="text-gray-600 max-w-2xl mx-auto text-lg">
						Kumpulan informasi terbaru, liputan kegiatan, dan artikel keislaman dari Masjid Name.
					</p>
				</div>

				{/* Search & Sort */}
				<ArticleFilters key={`${query}|${sort}`} initialQuery={query} initialSort={sort} />

				{query && (
					<p role="status" data-testid="articles-result-count" className="text-gray-600 mb-8">
						Ditemukan {count || 0} artikel untuk &quot;{query}&quot;
					</p>
				)}

				{/* Articles Grid */}
				{articles && articles.length > 0 ? (
					<>
						<div data-testid="articles-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{articles.map((article) => (
								<Link 
									href={`/article/${article.slug}`} 
									key={article.id} 
									data-testid="article-card"
									className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
								>
									{/* Image Banner */}
									<div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
										<img 
											src={article.image_url} 
											alt={article.title}
											data-testid="article-card-image"
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
										
										<h2 data-testid="article-card-title" className="text-xl font-serif font-bold text-[#0a2e24] mb-3 group-hover:text-[#0d9488] transition-colors line-clamp-2 leading-snug">
											{article.title}
										</h2>
										
										<p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
											{stripHtmlTags(article.content).substring(0, 150)}...
										</p>
										
										<div className="mt-auto flex items-center text-[#0d9488] text-sm font-bold group-hover:text-[#0f766e] transition-colors uppercase tracking-wider">
											Baca Selengkapnya 
											<span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
										</div>
									</div>
								</Link>
							))}
						</div>

						{/* Pagination UI */}
						{totalPages > 1 && (
							<nav aria-label="Navigasi halaman" data-testid="articles-pagination" className="mt-16 flex justify-center items-center space-x-2">
								{/* Previous Button */}
								{currentPage > 1 ? (
									<Link 
										href={pageHref(currentPage - 1)}
										title="Halaman sebelumnya"
										data-testid="pagination-prev"
										className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-[#0d9488] font-medium transition-colors"
									>
										&laquo; Sebelumnya
									</Link>
								) : (
									<span className="px-4 py-2 border border-gray-100 rounded-lg text-gray-300 font-medium cursor-not-allowed">
										&laquo; Sebelumnya
									</span>
								)}

								{/* Page Numbers */}
								<div className="hidden sm:flex space-x-2">
									{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
										<Link
											key={page}
											href={pageHref(page)}
											aria-label={`Halaman ${page}`}
											aria-current={currentPage === page ? 'page' : undefined}
											data-testid={`pagination-page-${page}`}
											className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${
												currentPage === page
													? 'bg-[#0a2e24] text-white shadow-md'
													: 'border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-[#0d9488]'
											}`}
										>
											{page}
										</Link>
									))}
								</div>
								
								{/* Mobile Page Indicator */}
								<span className="sm:hidden text-sm text-gray-500 font-medium px-4">
									Halaman {currentPage} dari {totalPages}
								</span>

								{/* Next Button */}
								{currentPage < totalPages ? (
									<Link 
										href={pageHref(currentPage + 1)}
										title="Halaman selanjutnya"
										data-testid="pagination-next"
										className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-[#0d9488] font-medium transition-colors"
									>
										Selanjutnya &raquo;
									</Link>
								) : (
									<span className="px-4 py-2 border border-gray-100 rounded-lg text-gray-300 font-medium cursor-not-allowed">
										Selanjutnya &raquo;
									</span>
								)}
							</nav>
						)}
					</>
				) : (
					<div data-testid="articles-empty" className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
						<p className="text-gray-500 text-lg">
							{query
								? `Tidak ada artikel yang cocok dengan "${query}".`
								: 'Belum ada artikel yang dipublikasikan saat ini.'}
						</p>
					</div>
				)}

			</div>
		</main>
	);
}