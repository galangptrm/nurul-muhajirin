import React from 'react';
import Image from 'next/image';
import { CheckCircle2, Zap, BookOpen, Users } from 'lucide-react';

export default function ServiceDetail() {
	return (
		<main className="bg-white min-h-screen">
			{/* --- SECTION 1: HERO & CORE FEATURES --- */}
			<section className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Left Content: Text & Feature List */}
					<div>
						<span className="text-[#0a2e24] uppercase tracking-widest text-xs font-bold mb-4 block">
							Masjid Al-Muhajirin
						</span>
						<h1 className="text-5xl font-serif font-bold text-[#0a2e24] mb-6 leading-tight">
							Masjid <br /> Al Muhajirin
						</h1>
						<p className="text-gray-600 text-lg mb-10 leading-relaxed max-w-lg">
							Masjid pusat kegiatan dan dakwah islam di lingkungan Perumahan Wahana Pondok Gede, Bekasi
						</p>

						{/* Feature Cards (Stacked) */}
						<div className="space-y-4">
							{[
								{ icon: <Zap className="text-emerald-600" />, 
									title: "Tempat Wudhu", 
									desc: "Menjawab kebutuhan umat secara real-time." 
								},
								{ icon: <BookOpen className="text-emerald-600" />, title: "Edukasi Berkelanjutan", desc: "Program kajian terstruktur dan aplikatif." },
								{ icon: <Users className="text-emerald-600" />, title: "Konsultasi Personal", desc: "Layanan privat tatap muka dengan ahli." }
							].map((item, i) => (
								<div key={i} className="flex items-center p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-sm transition-shadow">
									<div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 shadow-sm">
										{item.icon}
									</div>
									<div>
										<h4 className="font-bold text-[#0a2e24] text-sm">{item.title}</h4>
										<p className="text-xs text-gray-500">{item.desc}</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Right Content: Image Mosaic (Matches Screenshot 1) */}
					<div className="grid grid-cols-2 gap-4">
						<div className="col-span-2 relative h-[350px] rounded-[40px] overflow-hidden shadow-2xl">
							<Image 
								src="/images/mosque-hero.jpg" 
								alt="Main Service" 
								fill 
								className="object-cover"
							/>
						</div>
						<div className="relative h-[200px] rounded-[30px] overflow-hidden shadow-xl">
							<Image 
								src="/images/activity-1.jpg" 
								alt="Activity" 
								fill 
								className="object-cover"
							/>
						</div>
						<div className="relative h-[200px] rounded-[30px] overflow-hidden shadow-xl">
							<Image 
								src="/images/activity-2.jpg" 
								alt="Activity" 
								fill 
								className="object-cover"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* --- SECTION 2: TEAM / STAFF (Matches Screenshot 2) --- */}
			<section className="bg-gray-50 py-20">
				<div className="max-w-7xl mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-3xl font-serif font-bold text-[#0a2e24] mb-2">Tim Kerja Pelayanan</h2>
						<div className="w-24 h-1 bg-amber-400 mx-auto rounded-full"></div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{ name: "Dr. Mahkamah Mahdi, Lc., MA", role: "Ketua Tim Ahli" },
							{ name: "H. Kopri Nurzen, Lc., MA", role: "Anggota Tim Ahli" },
							{ name: "Muh. Hidayatullah, Lc., MA", role: "Anggota Tim Ahli" },
							{ name: "Mohammad Alfin Ni'am, Lc., M.H", role: "Anggota Tim Ahli" }
						].map((member, i) => (
							<div key={i} className="bg-white rounded-[30px] p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:shadow-md transition-all">
								<div className="w-full aspect-square bg-[#e2b08a] rounded-[25px] mb-6 relative overflow-hidden">
									{/* Placeholder for staff image */}
									<div className="absolute inset-0 flex items-end justify-center">
										<div className="w-3/4 h-3/4 bg-gray-200 rounded-t-full transition-transform group-hover:scale-110 duration-500"></div>
									</div>
								</div>
								<h4 className="font-bold text-[#0a2e24] text-sm mb-1">{member.name}</h4>
								<p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest">{member.role}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}