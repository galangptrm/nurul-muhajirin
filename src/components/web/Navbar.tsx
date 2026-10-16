// src/components/web/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SERVICES } from '@/lib/services';

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
		<nav aria-label="Navigasi utama" data-testid="navbar" className={`fixed w-full top-0 z-[9999] transition-all duration-500 ${navClasses}`}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center">

				{/* Logo */}
				<Link href="/" title="Kembali ke Beranda" data-testid="nav-logo" className="flex items-center gap-3 group">
					<div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-[#0a2e24] font-bold text-xl group-hover:scale-105 transition-transform shadow-md">
						<img src={`/images/logo.png`} alt="Logo Nurul Muhajirin" data-testid="nav-logo-img"/>
					</div>
					<div className="drop-shadow-md">
						<p className="text-white font-serif font-bold text-xl leading-none tracking-wide">
							Nurul Muhajirin
						</p>
						<p className="text-[#eab308] text-[10px] uppercase tracking-widest font-semibold mt-0.5">
							Wahana Pondok Gede
						</p>
					</div>
				</Link>

				{/* Desktop Menu */}
				<div data-testid="nav-desktop" className="hidden md:flex items-center space-x-8 drop-shadow-md">
					<Link href="/" data-testid="nav-link-beranda" className="text-white hover:text-[#eab308] text-sm font-semibold tracking-wider transition-colors">
					Beranda
					</Link>

					{/* Layanan: dropdown opens on hover (or keyboard focus) */}
					<div className="relative group" data-testid="nav-layanan">
						<Link href="/#services" aria-haspopup="true" data-testid="nav-link-layanan" className="text-gray-200 hover:text-[#eab308] group-hover:text-[#eab308] text-sm font-medium transition-colors inline-flex items-center">
						Layanan
						<svg aria-hidden="true" className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
						</Link>
						<div
							role="menu"
							aria-label="Daftar layanan"
							data-testid="nav-layanan-dropdown"
							className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-72 invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity duration-200"
						>
							<div className="bg-white rounded-xl shadow-xl py-2 border border-gray-100">
								{SERVICES.map((service) => (
									<Link
										key={service.slug}
										href={service.link}
										role="menuitem"
										data-testid={`nav-layanan-item-${service.slug}`}
										className="block px-4 py-2.5 text-sm text-[#0a2e24] hover:bg-[#f0fdf4] hover:text-[#0d9488] transition-colors"
									>
										{service.name}
									</Link>
								))}
							</div>
						</div>
					</div>

					<Link href="/articles" data-testid="nav-link-berita" className="text-gray-200 hover:text-[#eab308] text-sm font-medium transition-colors">
					Berita
					</Link>
					<Link href="/#kontak" data-testid="nav-link-kontak" className="text-gray-200 hover:text-[#eab308] text-sm font-medium transition-colors">
					Kontak
					</Link>
					{/* <Link href="/admin" className="text-gray-200 hover:text-[#eab308] text-sm font-medium transition-colors">
					Profil
					</Link> */}

					{/* <Link href="#zakat" className="bg-[#eab308] hover:bg-[#ca8a04] text-[#0a2e24] px-5 py-2 rounded-full text-sm font-bold transition-colors shadow-lg">
					Zakat & Infaq
					</Link> */}
				</div>

				{/* Mobile Menu Button */}
				<div className="md:hidden flex items-center">
					<button
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					className="text-white hover:text-[#eab308] focus:outline-none drop-shadow-md transition-colors p-2"
					aria-label="Toggle mobile menu"
					aria-expanded={isMobileMenuOpen}
					aria-controls="mobile-menu"
					data-testid="nav-mobile-toggle"
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
			{/* 'invisible' (visibility: hidden) when closed so tools like Playwright treat it as hidden, not just transparent */}
			<div
				id="mobile-menu"
				data-testid="nav-mobile-menu"
				className={`md:hidden absolute w-full bg-[#0a2e24]/95 backdrop-blur-md border-t border-white/10 overflow-hidden transition-all duration-300 ease-in-out ${
				isMobileMenuOpen ? 'visible max-h-96 opacity-100 shadow-xl' : 'invisible max-h-0 opacity-0'
				}`}
			>
				<div className="px-4 pt-4 pb-8 space-y-2 flex flex-col">
					<Link href="/" data-testid="nav-mobile-link-beranda" className="block px-4 py-3 text-white hover:bg-white/10 hover:text-[#eab308] rounded-lg font-semibold uppercase tracking-wider text-sm transition-colors">
						Beranda
					</Link>
					<Link href="/#services" data-testid="nav-mobile-link-layanan" className="block px-4 py-3 text-gray-200 hover:bg-white/10 hover:text-[#eab308] rounded-lg font-medium text-base transition-colors">
						Layanan
					</Link>
					<Link href="/articles" data-testid="nav-mobile-link-berita" className="block px-4 py-3 text-gray-200 hover:bg-white/10 hover:text-[#eab308] rounded-lg font-medium text-base transition-colors">
						Berita
					</Link>
					<Link href="/#kontak" data-testid="nav-mobile-link-kontak" className="block px-4 py-3 text-gray-200 hover:bg-white/10 hover:text-[#eab308] rounded-lg font-medium text-base transition-colors">
						Kontak
					</Link>
					{/* <Link href="/admin" className="block px-4 py-3 text-gray-200 hover:bg-white/10 hover:text-[#eab308] rounded-lg font-medium text-base transition-colors">
						Profil
					</Link> */}
					{/* <div className="pt-4 pb-2 px-4">
						<Link href="#zakat" className="block w-full text-center bg-[#eab308] hover:bg-[#ca8a04] text-[#0a2e24] px-5 py-3 rounded-full text-sm font-bold transition-colors shadow-lg">
						Zakat & Infaq
						</Link>
					</div> */}
				</div>
			</div>
		</nav>
	);
}
