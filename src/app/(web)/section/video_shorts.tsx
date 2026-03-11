import { supabase } from '@/lib/supabase';

export default async function SectionShorts() {

	// Fetch the 4 latest published videos
	const { data: videos, error } = await supabase
		.from('short_videos')
        .select('*')
		.order('created_at', { ascending: false })
		.limit(4);

	if (error) {
		console.error("Supabase Connection Error Section Short Videos:", error.message);
	} else {
		console.log("Supabase Connected! Section Short Videos:", videos?.length);
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
				{videos && videos.map((video, i) => (
					<div key={video.id} className="group relative aspect-[9/16] bg-gray-900 rounded-2xl overflow-hidden cursor-pointer shadow-lg">
						
						{/* Native HTML5 Video Element (Acts as a thumbnail) */}
						<video 
							src={`${video.video_file_url}#t=0.1`} 
							preload="metadata"
							className="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
							muted 
							playsInline
						/>
						
						<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>
						
						{/* Play Button Icon */}
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="h-12 w-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/50 transition">
								<div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1"></div>
							</div>
						</div>

						{/* Title */}
						<div className="absolute bottom-0 left-0 p-4 w-full">
							<h3 className="text-white text-sm font-semibold line-clamp-2">
								{video.title}
							</h3>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}