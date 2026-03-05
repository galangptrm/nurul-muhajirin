// src/components/web/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  // Check if we are on the homepage
  const isHomepage = pathname === '/';

  // Listen for scroll events to trigger the floating effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic styling: 
  // - Transparent with larger padding at the top of the homepage
  // - Dark green with blur effect when scrolled OR when on other pages (like article details)
  const navClasses = isScrolled || !isHomepage 
    ? 'bg-[#0a2e24]/95 backdrop-blur-md shadow-lg py-4' 
    : 'bg-transparent py-6';

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${navClasses}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 bg-[#eab308] rounded-full flex items-center justify-center text-[#0a2e24] font-bold text-xl group-hover:scale-105 transition-transform">
              NM
            </div>
            <div>
              <h1 className="text-white font-serif font-bold text-xl leading-none tracking-wide">
                Nurul Muhajirin
              </h1>
              <p className="text-[#eab308] text-[10px] uppercase tracking-widest font-semibold mt-0.5">
                Pusat Moderasi
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
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
            
            {/* Call to Action Button */}
            <Link href="#zakat" className="bg-[#eab308] hover:bg-[#ca8a04] text-[#0a2e24] px-5 py-2 rounded-full text-sm font-bold transition-colors shadow-md">
              Zakat & Infaq
            </Link>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button className="text-white hover:text-[#eab308] focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}