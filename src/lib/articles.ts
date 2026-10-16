// Sort options for the articles list (shared by the server page and the client filter component)
export const SORT_OPTIONS = [
	{ value: 'terbaru', label: 'Terbaru' },
	{ value: 'terlama', label: 'Terlama' },
	{ value: 'judul', label: 'Judul (A-Z)' },
] as const;

export type SortValue = typeof SORT_OPTIONS[number]['value'];
