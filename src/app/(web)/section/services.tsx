import React from "react";
import { 
	Church, 
	BookOpen, 
	Heart, 
	HeartPulse, 
	Store 
} from 'lucide-react';

export default function SectionServices() {
	return (
		<section id="services" className="py-20 bg-[#f8fafc]">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<h2 className="text-4xl font-serif font-bold text-[#0a2e24] mb-12">Layanan Publik Masjid</h2>
				
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{[
						{ name: 'DKM Almuhajirin', link: '/layanan/masjid', icon: <Church className="w-64 h-64" /> },
						{ name: 'Lembaga Tahfidz Quran', link: '/layanan/tahfidz', icon: <BookOpen className="w-64 h-64" /> },
						{ name: 'LKS Hafara', link: '/layanan/lkshafara', icon: <Heart className="w-64 h-64" /> },
						{ name: 'Lembaga Perawatan Jenazah (Janaiz)', link: '/layanan/janaiz', icon: <HeartPulse className="w-64 h-64" /> },
						{ name: 'Koperasi YAMU Sejahtera', link: '/layanan/koperasi', icon: <Store className="w-64 h-64" /> }
					].map((service, i) => (
						/* Added 'group' and 'relative overflow-hidden' to control the background icon layout and bounds */
						<div 
							key={i} 
							className="group relative overflow-hidden bg-white p-8 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col items-start text-left border border-gray-100 hover:shadow-xl hover:bg-[#0d9488] hover:text-white transition-all duration-300">
							{/* --- LARGE BACKGROUND ICON --- */}
							{/* Default state: low opacity gray/slate. Hover state: turns shaded green and scales slightly */}
							<div className="absolute -right-4 -bottom-4 text-slate-100 group-hover:text-emerald-50/60 pointer-events-none transition-colors duration-500 transform group-hover:scale-105 z-0">
								{service.icon}
							</div>

							{/* Small Decorative Top Icon Container (Kept clean like image_6a16a5.png) */}
							<div className="h-12 w-12 bg-[#f0fdf4] rounded-xl flex items-center justify-center text-[#166534] mb-6 relative z-10">
								{/* Cloning the icon element to render it small at the top too, if you prefer */}
								{React.cloneElement(service.icon, { className: "w-5 h-5" })}
							</div>

							{/* Text Content wrapped in relative z-10 to stay readable on top of the background icon */}
							<div className="relative z-10 flex flex-col flex-grow hover:text-white">
								<h3 className="font-bold text-xl text-[#0a2e24] mb-3">{service.name}</h3>
								<p className="text-gray-500 text-sm mb-8 leading-relaxed">
									Deskripsi singkat mengenai layanan {service.name.toLowerCase()} yang disediakan secara profesional untuk umat.
								</p>
								
								<a 
									href={service.link} 
									className="w-full mt-auto bg-[#0d9488] hover:bg-[#0f766e] text-white text-center font-semibold px-5 py-3 rounded-full transition-colors text-sm"
								>
									PILIH LAYANAN
								</a>
							</div>

							{/* <span className="absolute z-0 w-100 h-100 opacity-0 hover:bg-[#0d9488] hover:bg-opacity-10"></span> */}

						</div>
					))}
				</div>
			</div>
		</section>
	);
}