import Link from 'next/link';

import SectionServices from "@/app/(web)/section/services";
import SectionShorts from "@/app/(web)/section/video_shorts";
import SectionArticles from "@/app/(web)/section/latest_articles";
import SectionKhutbahJumat from "@/app/(web)/section/khutbah_jumat";
import SectionJadwalSholat from "@/app/(web)/section/jadwal_sholat";

export default async function HomePage() {

	return (
		<main className="min-h-screen bg-[#f9fafb]">
		{/* 1. Header Banner with Video */}
		<section className="relative h-screen w-full overflow-hidden bg-[#0a2e24]">
			<video 
			autoPlay 
			loop 
			muted 
			className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-overlay"
			>
			<source src={`/videos/masjid_tiny.mp4`} type="video/mp4"/>
			</video>
			<div className="absolute inset-0 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="max-w-2xl mt-20">
				<p className="text-[#eab308] tracking-widest text-sm font-semibold mb-4 uppercase">
				— DKM Al Muhajirin
				</p>
				<h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4 leading-tight">
				Yayasan <br />
				<span className="text-[#5eead4]">Nurul Muhajirin,</span>
				</h1>
				<p className="text-lg text-gray-200 mb-8 leading-relaxed">
				Selamat datang di Masjid Al Muhajirin, pusat moderasi beragama di Perum Wahana Pondok Gede. Merajut ukhuwah, menebar kedamaian untuk seluruh alam.
				</p>
				<Link href="#services" className="inline-flex items-center bg-[#0d9488] hover:bg-[#0f766e] text-white px-8 py-3 rounded-full font-semibold transition-colors">
				Eksplorasi Layanan <span className="ml-2">→</span>
				</Link>
			</div>
			</div>
		</section>
		
		{/* 3. Our Services (Layanan Publik) */}
		<SectionServices/>

		{/* 4. Latest News (Artikel & Tulisan Pilihan - 1:4 Layout) */}
		<SectionArticles/>

		{/* 6. Prayer Time (Waktu Sholat) */}
		<SectionJadwalSholat/>
		
		{/* 2. Latest Update (Video Terkini) */}
		<SectionShorts/>

		{/* 5. Petugas Jum'at Pekan Ini */}
		<SectionKhutbahJumat/>
		
		</main>
	);
}