'use client';

import { useState, useRef } from 'react';

export default function VideoCard({ video }: { video: any }) {
	const [isPlaying, setIsPlaying] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

	const togglePlay = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	return (
		<div 
			onClick={togglePlay} 
			className="group relative aspect-[9/16] bg-gray-900 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
		>
			<video 
				ref={videoRef}
				src={`${video.video_file_url}#t=0.1`} 
				preload="metadata"
				className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${
					isPlaying ? 'opacity-100' : 'opacity-80 group-hover:scale-105'
				}`}
				playsInline
				loop
			/>
			
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>
			
			{!isPlaying && (
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="h-12 w-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/50 transition">
						<div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1"></div>
					</div>
				</div>
			)}

			<div className="absolute bottom-0 left-0 p-4 w-full">
				<h3 className="text-white text-sm font-semibold line-clamp-2">
					{video.title}
				</h3>
			</div>
		</div>
	);
}