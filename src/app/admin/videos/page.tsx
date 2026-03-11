// src/app/admin/videos/page.tsx
import { supabase } from '@/lib/supabase';
import VideoManager from './VideoManager';

export default async function AdminVideosPage() {
	// Fetch master setting
	const { data: setting } = await supabase
		.from('site_settings')
		.select('is_active')
		.eq('key', 'show_short_videos')
		.single();

	// Fetch all videos
	const { data: videos } = await supabase
		.from('short_videos')
		.select('*')
		.order('created_at', { ascending: false });

	return (
		<div className="max-w-6xl mx-auto">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Kelola Video Pendek</h1>
				<p className="text-gray-500 mt-1">Atur section reels/shorts dan daftar videonya dalam satu halaman.</p>
			</div>

			{/* We pass the fetched data into our Client Component */}
			<VideoManager 
				initialVideos={videos || []} 
				initialIsActive={setting?.is_active ?? true} 
			/>
		</div>
	);
}