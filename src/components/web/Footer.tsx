// src/components/web/Navbar.tsx
'use client';

import moment from "moment";
import {Facebook, Instagram, Tiktok, Youtube} from '@/components/icons/IconSVG';

export default function Footer() {

	return (
		<footer className="bg-[#051f18] text-gray-300 pt-20 pb-10 border-t border-white/5">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12">
			{/* Brand/Logo Col */}
			<div className="md:col-span-4">
				<h3 className="text-2xl font-serif font-bold text-[#eab308] mb-6">Yayasan Nurul Muhajirin</h3>
				<p className="text-sm leading-relaxed mb-6">
				Selamat datang di Masjid Al Muhajirin, pusat dakwah islam di lingkungan Perumahan Wahana Pondok Gede.
				</p>
				<p className="text-xs text-gray-500">© {moment().year()} Yayasan Nurul Muhajirin. All rights reserved.</p>
			</div>

			{/* Contact Col */}
			<div className="md:col-span-5 md:col-start-5">
				<h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Kontak & Lokasi</h4>
				<ul className="space-y-4 text-sm">
				<li className="flex items-start">
					<span className="mr-3 mt-1 text-[#eab308]">📍</span>
					<span>Perumahan Wahana Pondok Gede Blok F RT09/RW07, Jatiranggon, Jatisampurna, Kota Bekasi 17432</span>
				</li>
				<li className="flex items-center">
					<span className="mr-3 text-[#eab308]">📞</span>
					<span>+ 6213811798</span>
				</li>
				<li className="flex items-center">
					<a href="mailto:nurulmuhajirin.yayasan@gmail.com">
						<span className="mr-3 text-[#eab308]">✉️</span>
						<span>nurulmuhajirin.yayasan@gmail.com</span>
					</a>
				</li>
				</ul>
			</div>

			{/* Social Col */}
			<div className="md:col-span-3">
				<h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Ikuti Sosial Media</h4>
				<div className="flex gap-2">
				{/* Placeholders for actual Social Icons */}
				<a href="https://www.instagram.com/nurulmuhajirin.official/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0d9488] transition-colors"><Instagram size={20} color="#ffff"/></a>
				<a href="https://www.youtube.com/@NurulMuhajirin.official" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0d9488] transition-colors"><Youtube size={20} color="#ffff"/></a>
				<a href="https://www.facebook.com/profile.php?id=61585975660877" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0d9488] transition-colors"><Facebook size={20} color="#ffff"/></a>
				<a href="https://www.tiktok.com/@nurulmuhajirin.official" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0d9488] transition-colors"><Tiktok size={20} color="#ffff"/></a>
				</div>
			</div>
			</div>
		</footer>
	);
}