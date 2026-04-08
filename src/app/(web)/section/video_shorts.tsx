import { supabase } from '@/lib/supabase';
import VideoCard from '@/components/web/VideoCard';

export default async function SectionShorts() {
	const { data: videos, error } = await supabase
		.from('short_videos')
		.select('*')
		.order('created_at', { ascending: false })
		.limit(4);

	if (error) {
		console.error("Supabase Connection Error Section Short Videos:", error.message);
	}

	return (
		<section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
			<div className="flex justify-between items-end mb-8">
				<div>
					<h2 className="text-3xl font-serif font-bold text-[#0a2e24] mb-2">Video Terkini</h2>
					<p className="text-gray-500">Momen eksklusif dari YouTube Shorts dan Instagram Reels kami</p>
				</div>
			</div>
			
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
				{videos?.map((video) => (
					<VideoCard key={video.id} video={video} />
				))}
			</div>
		</section>
	);
}