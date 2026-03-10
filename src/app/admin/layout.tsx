import { Html } from 'next/document';
import { Geist, Geist_Mono } from "next/font/google";
import "./../globals.css"
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <div className="flex min-h-screen bg-gray-50 font-sans">
          {/* Sidebar */}
          <aside className="w-64 bg-[#0a2e24] text-white hidden md:flex flex-col shadow-xl z-10">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-serif font-bold text-[#eab308]">CMS Masjid</h2>
              <p className="text-xs text-gray-400 mt-1">Admin Dashboard</p>
            </div>
            
            <nav className="flex-1 p-4 space-y-2">
              <Link 
                href="/admin" 
                className="block px-4 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link 
                href="/admin/articles" 
                className="block px-4 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium"
              >
                Kelola Artikel
              </Link>
              <Link 
                href="/admin/profile" 
                className="block px-4 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium"
              >
                Profil Masjid
              </Link>
            </nav>

            <div className="p-4 border-t border-white/10">
              <Link 
                href="/" 
                target="_blank"
                className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Lihat Website Publik
              </Link>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col h-screen overflow-hidden">
            {/* Mobile Header (Visible only on small screens) */}
            <header className="md:hidden bg-[#0a2e24] text-white p-4 flex justify-between items-center">
              <h2 className="text-lg font-serif font-bold text-[#eab308]">CMS Masjid</h2>
              <button className="p-2 bg-white/10 rounded">Menu</button>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}