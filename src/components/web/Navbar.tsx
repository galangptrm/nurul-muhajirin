// src/components/web/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
const [isScrolled, setIsScrolled] = useState(false);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const pathname = usePathname();

const isHomepage = pathname === '/';

// Handle scroll effect
useEffect(() => {
	handleScroll(); 
	window.addEventListener('scroll', handleScroll);
}, []);

// Automatically close the mobile menu whenever the user clicks a link and changes the page
useEffect(() => {
	setIsMobileMenuOpen(false);
}, [pathname]);

const handleScroll = () => {
	setIsScrolled(window.scrollY > 20);
};

// Force a solid background if the mobile menu is open, otherwise use the scroll logic
const navClasses = isScrolled || !isHomepage || isMobileMenuOpen
	? 'bg-[#0a2e24]/95 backdrop-blur-md shadow-lg py-4' 
	: 'bg-gradient-to-b from-[#0a2e24]/80 to-transparent py-6';

	return (
		<nav className={`fixed w-full top-0 z-[9999] transition-all duration-500 ${navClasses}`}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center">
				
				{/* Logo */}
				<Link href="/" className="flex items-center gap-3 group">
					<div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-[#0a2e24] font-bold text-xl group-hover:scale-105 transition-transform shadow-md">
						<img src={`/images/logo.png`} alt=""/>
					</div>
					<div className="drop-shadow-md">
						<h1 className="text-white font-serif font-bold text-xl leading-none tracking-wide">
							Nurul Muhajirin
						</h1>
						<p className="text-[#eab308] text-[10px] uppercase tracking-widest font-semibold mt-0.5">
							Wahana Pondok Gede
						</p>
					</div>
				</Link>

				{/* Desktop Menu */}
				<div className="hidden md:flex items-center space-x-8 drop-shadow-md">
					<Link href="/" className="text-white hover:text-[#eab308] text-sm font-semibold uppercase tracking-wider transition-colors">
					Beranda
					</Link>
					<Link href="#services" className="text-gray-200 hover:text-[#eab308] text-sm font-medium transition-colors">
					Layanan
					</Link>
					<Link href="/articles" className="text-gray-200 hover:text-[#eab308] text-sm font-medium transition-colors">
					Berita
					</Link>
					<Link href="/admin" className="text-gray-200 hover:text-[#eab308] text-sm font-medium transition-colors">
					Profil
					</Link>
					
					<Link href="#zakat" className="bg-[#eab308] hover:bg-[#ca8a04] text-[#0a2e24] px-5 py-2 rounded-full text-sm font-bold transition-colors shadow-lg">
					Zakat & Infaq
					</Link>
				</div>

				{/* Mobile Menu Button */}
				<div className="md:hidden flex items-center">
					<button 
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					className="text-white hover:text-[#eab308] focus:outline-none drop-shadow-md transition-colors p-2"
					aria-label="Toggle mobile menu"
					>
					{isMobileMenuOpen ? (
						// "X" Close Icon
						<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					) : (
						// Hamburger Icon
						<svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					)}
					</button>
				</div>

				</div>
			</div>

			{/* Mobile Menu Dropdown Container */}
			<div 
				className={`md:hidden absolute w-full bg-[#0a2e24]/95 backdrop-blur-md border-t border-white/10 overflow-hidden transition-all duration-300 ease-in-out ${
				isMobileMenuOpen ? 'max-h-96 opacity-100 shadow-xl' : 'max-h-0 opacity-0'
				}`}
			>
				<div className="px-4 pt-4 pb-8 space-y-2 flex flex-col">
				<Link href="/" className="block px-4 py-3 text-white hover:bg-white/10 hover:text-[#eab308] rounded-lg font-semibold uppercase tracking-wider text-sm transition-colors">
					Beranda
				</Link>
				<Link href="#services" className="block px-4 py-3 text-gray-200 hover:bg-white/10 hover:text-[#eab308] rounded-lg font-medium text-base transition-colors">
					Layanan
				</Link>
				<Link href="/articles" className="block px-4 py-3 text-gray-200 hover:bg-white/10 hover:text-[#eab308] rounded-lg font-medium text-base transition-colors">
					Berita
				</Link>
				<Link href="/admin" className="block px-4 py-3 text-gray-200 hover:bg-white/10 hover:text-[#eab308] rounded-lg font-medium text-base transition-colors">
					Profil
				</Link>
				<div className="pt-4 pb-2 px-4">
					<Link href="#zakat" className="block w-full text-center bg-[#eab308] hover:bg-[#ca8a04] text-[#0a2e24] px-5 py-3 rounded-full text-sm font-bold transition-colors shadow-lg">
					Zakat & Infaq
					</Link>
				</div>
				</div>
			</div>
		</nav>
	);
}