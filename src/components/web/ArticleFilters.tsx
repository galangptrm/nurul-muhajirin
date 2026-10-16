'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SORT_OPTIONS, type SortValue } from '@/lib/articles';

// Search bar + sort dropdown for the articles list; state lives in the URL (?q=...&sort=...)
export default function ArticleFilters({ initialQuery, initialSort }: { initialQuery: string; initialSort: SortValue }) {
	const router = useRouter();
	const [query, setQuery] = useState(initialQuery);

	const navigate = (q: string, sort: string) => {
		const params = new URLSearchParams();
		if (q.trim()) params.set('q', q.trim());
		if (sort !== 'terbaru') params.set('sort', sort);
		const qs = params.toString();
		router.push(qs ? `/articles?${qs}` : '/articles');
	};

	return (
		<form
			role="search"
			aria-label="Pencarian artikel"
			data-testid="articles-search-form"
			onSubmit={(e) => {
				e.preventDefault();
				navigate(query, initialSort);
			}}
			className="flex flex-col md:flex-row gap-4 mb-12 items-stretch md:items-end"
		>
			<div className="flex-grow">
				<label htmlFor="article-search" className="block text-sm font-semibold text-[#0a2e24] mb-2">Cari artikel</label>
				<div className="relative">
					<svg aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"></path></svg>
					<input
						id="article-search"
						type="search"
						name="q"
						placeholder="Cari judul artikel..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						data-testid="articles-search-input"
						className="w-full rounded-full border border-gray-200 bg-white pl-11 pr-4 py-3 text-[#0a2e24] placeholder-gray-400 focus:border-[#0d9488] focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20"
					/>
				</div>
			</div>

			<div>
				<label htmlFor="article-sort" className="block text-sm font-semibold text-[#0a2e24] mb-2">Urutkan</label>
				<select
					id="article-sort"
					name="sort"
					value={initialSort}
					onChange={(e) => navigate(query, e.target.value)}
					data-testid="articles-sort-select"
					className="w-full md:w-48 rounded-full border border-gray-200 bg-white px-4 py-3 text-[#0a2e24] focus:border-[#0d9488] focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20"
				>
					{SORT_OPTIONS.map((option) => (
						<option key={option.value} value={option.value}>{option.label}</option>
					))}
				</select>
			</div>

			<button
				type="submit"
				title="Cari artikel"
				data-testid="articles-search-submit"
				className="bg-[#0d9488] hover:bg-[#0f766e] text-white font-semibold px-8 py-3 rounded-full transition-colors"
			>
				Cari
			</button>

			{initialQuery && (
				<button
					type="button"
					title="Hapus pencarian"
					onClick={() => {
						setQuery('');
						navigate('', initialSort);
					}}
					data-testid="articles-search-clear"
					className="border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold px-6 py-3 rounded-full transition-colors"
				>
					Reset
				</button>
			)}
		</form>
	);
}
