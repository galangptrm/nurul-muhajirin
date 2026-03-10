// src/components/web/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();

	return (
		<footer className="bg-[#051f18] text-gray-300 pt-20 pb-10 border-t border-white/5">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12">
			{/* Brand/Logo Col */}
			<div className="md:col-span-4">
				<h3 className="text-2xl font-serif font-bold text-[#eab308] mb-6">Masjid Name</h3>
				<p className="text-sm leading-relaxed mb-6">
				Selamat datang di Masjid Name, simbol kemerdekaan dan pusat moderasi beragama di jantung ibu kota. Merajut ukhuwah, menebar kedamaian untuk seluruh alam.
				</p>
				<p className="text-xs text-gray-500">© 2026 Masjid Name. All rights reserved.</p>
			</div>

			{/* Contact Col */}
			<div className="md:col-span-5 md:col-start-6">
				<h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Kontak & Lokasi</h4>
				<ul className="space-y-4 text-sm">
				<li className="flex items-start">
					<span className="mr-3 mt-1 text-[#eab308]">📍</span>
					<span>Jl. Taman Wijaya Kusuma, Ps. Baru, Kecamatan Sawah Besar, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10710</span>
				</li>
				<li className="flex items-center">
					<span className="mr-3 text-[#eab308]">📞</span>
					<span>+ 6213811798</span>
				</li>
				<li className="flex items-center">
					<span className="mr-3 text-[#eab308]">✉️</span>
					<span>info@masjidname.or.id</span>
				</li>
				</ul>
			</div>

			{/* Social Col */}
			<div className="md:col-span-2">
				<h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Ikuti Sosial Media</h4>
				<div className="flex gap-4">
				{/* Placeholders for actual Social Icons */}
				<a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0d9488] transition-colors"><Instagram/>  </a>
				<a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0d9488] transition-colors"><Youtube /></a>
				<a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0d9488] transition-colors"><Facebook /></a>
				</div>
			</div>
			</div>
		</footer>
	);
}