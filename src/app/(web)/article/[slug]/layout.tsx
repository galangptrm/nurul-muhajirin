// src/app/(web)/layout.tsx
import Navbar from '@/components/web/Navbar';

export default function WebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative font-sans antialiased">
      {/* This Navbar will now appear on EVERY page inside the (web) folder, 
        but it will NOT appear in your /admin CMS area! 
      */}
      <Navbar />
      
      {/* The actual page content (homepage, article detail, etc.) */}
      <div className="min-h-screen">
        {children}
      </div>
    </div>
  );
}