import { supabase } from '@/lib/supabase';
import { stripHtmlTags } from '@/lib/utils';
import Link from 'next/link';
import { Facebook, } from 'lucide'

interface Article {
  id: string;
  title: string;
  slug: string;
  image_url: string;
  created_at: string;
  content: string; // To show a small excerpt
}

export default async function HomePage() {
  // Fetch the 5 latest published articles
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(5);

    // ADD THIS TEMPORARY CHECK:
  if (error) {
    console.error("Supabase Connection Error:", error.message);
  } else {
    console.log("Supabase Connected! Found articles:", articles?.length);
  }

  const mainArticle = articles?.[0];
  const sideArticles = articles?.slice(1, 5) || [];

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

      {/* 2. Latest Update (Video Terkini) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-serif font-bold text-[#0a2e24] mb-2">Video Terkini</h2>
            <p className="text-gray-500">Momen eksklusif dari YouTube Shorts dan Instagram Reels kami</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[5, 4, 3, 2].map((item, i) => (
            <div key={item} className="group relative aspect-[9/16] bg-gray-900 rounded-2xl overflow-hidden cursor-pointer shadow-lg">
              {/* Image Placeholder */}
              <img src={`/images/h-${item*5}.jpeg`} alt="Reel" className="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>
              
              {/* Play Button Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/50 transition">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1"></div>
                </div>
              </div>

              {/* Tag and Title */}
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider mb-2 inline-block">
                  Study
                </span>
                <h3 className="text-white text-sm font-semibold line-clamp-2">
                  Judul video pendek yang menginspirasi dari kajian rutin masjid.
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Our Services (Layanan Publik) */}
      <section id="services" className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-[#0a2e24] mb-12">Layanan Publik Masjid</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Masjid', 'Janaiz', 'Tahfiz Quran', 'Zakat dan Wakaf', 'Ambulans', 'Koperasi & Bisnis'].map((service, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col items-start text-left border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="h-12 w-12 bg-[#f0fdf4] rounded-xl flex items-center justify-center text-[#166534] mb-6">
                  {/* Placeholder for Icons */}
                  <span className="text-xl font-bold">{i + 1}</span>
                </div>
                <h3 className="font-bold text-xl text-[#0a2e24] mb-3">{service}</h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                  Deskripsi singkat mengenai layanan {service.toLowerCase()} yang disediakan secara profesional untuk umat.
                </p>
                <button className="w-full mt-auto bg-[#0d9488] hover:bg-[#0f766e] text-white font-semibold py-3 rounded-full transition-colors text-sm">
                  PILIH LAYANAN
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Latest News (Artikel & Tulisan Pilihan - 1:4 Layout) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        {/* Section Header with Title and Gold Accent */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0a2e24] mb-3">Berita Terbaru</h2>
            <div className="h-1.5 w-16 bg-[#eab308] rounded-full"></div>
          </div>
          <Link href="/articles" className="text-[#0d9488] font-semibold hover:text-[#0f766e] transition-colors mt-4 md:mt-0 flex items-center text-sm uppercase tracking-wider">
            Lihat Semua Berita <span className="ml-1">→</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: 1 Large Main News Card */}
          {mainArticle ? (
            <div className="lg:col-span-7 group flex flex-col">
              <Link href={`/article/${mainArticle.slug}`} className="block relative overflow-hidden rounded-2xl mb-6 shadow-sm">
                <img 
                  src={mainArticle.image_url || '/placeholder.jpg'} 
                  alt={mainArticle.title}
                  className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute top-4 left-4 bg-[#eab308] text-[#0a2e24] text-xs font-bold px-3 py-1.5 rounded uppercase tracking-widest shadow-md">
                  Kabar Masjid
                </div>
              </Link>
              
              <div className="flex flex-col flex-grow pr-4">
                <span className="text-gray-500 text-sm mb-3 flex items-center font-medium">
                  <svg className="w-4 h-4 mr-2 text-[#0d9488]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  {new Date(mainArticle.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <Link href={`/article/${mainArticle.slug}`}>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#0a2e24] mb-4 group-hover:text-[#0d9488] transition-colors leading-tight">
                    {mainArticle.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                  {stripHtmlTags(mainArticle.content.substring(0, 500))}...
                </p>
                <Link href={`/article/${mainArticle.slug}`} className="mt-auto inline-flex items-center text-[#0d9488] font-bold hover:text-[#0f766e] transition-colors">
                  Baca Selengkapnya <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-7 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 min-h-[400px] border border-gray-100">
              Belum ada berita utama.
            </div>
          )}

          {/* Right: 4 Small List Items */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            {sideArticles.map((article, index) => (
              <Link href={`/article/${article.slug}`} key={article.id} className={`group flex gap-5 items-center py-5 ${index !== 0 ? 'border-t border-gray-100' : 'pt-0'}`}>
                <div className="h-24 w-32 md:w-36 flex-shrink-0 rounded-xl overflow-hidden relative shadow-sm">
                  <img 
                    src={article.image_url || '/placeholder.jpg'} 
                    alt={article.title}
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition duration-700 ease-in-out"
                  />
                </div>
                <div className="flex flex-col justify-center flex-grow">
                  <span className="text-gray-400 text-xs mb-2 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <h4 className="font-serif font-bold text-[#0a2e24] group-hover:text-[#0d9488] transition-colors line-clamp-2 text-base leading-snug">
                    {article.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Petugas Jum'at Pekan Ini */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-[#0a2e24]">Petugas Jumat Masjid Pekan Ini</h2>
          </div>

          <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] relative overflow-hidden">
            <div className="text-center mb-12">
              <span className="bg-[#fef08a] text-[#854d0e] text-sm font-bold px-4 py-1.5 rounded-full mb-4 inline-block">
                Tema Khutbah
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#0a2e24]">
                "Jalan Sunyi Menuju Cinta Ilahi"
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-t border-gray-100 pt-10">
              <div>
                <p className="text-xs font-bold text-[#0d9488] tracking-widest uppercase mb-2">Khatib</p>
                <p className="font-bold text-[#0a2e24]">Habib Fulan bin Fulan</p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#0d9488] tracking-widest uppercase mb-2">Imam 1</p>
                <p className="font-bold text-[#0a2e24]">H. Ahmad Fulan, SQ., MA.</p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#0d9488] tracking-widest uppercase mb-2">Muadzin 1</p>
                <p className="font-bold text-[#0a2e24]">Ust. Ilham, SQ</p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#0d9488] tracking-widest uppercase mb-2">Muadzin 2</p>
                <p className="font-bold text-[#0a2e24]">H. Raden Fulan, S.Q.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Prayer Time (Waktu Sholat) */}
      <section className="py-16 bg-[#0a2e24] relative border-t-4 border-[#eab308]">
        {/* Background Pattern overlay can go here */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-6">Waktu Sholat wilayah Jakarta & Sekitarnya</h2>
          
          <div className="flex flex-col items-center justify-center mb-10">
             <div className="flex items-center text-gray-300 mb-2">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                <span className="font-medium">Bekasi</span>
             </div>
             <div className="bg-[#114638] rounded-full px-6 py-2 inline-flex flex-col border border-white/10">
                <span className="text-xs text-gray-300 uppercase tracking-wider">Menuju Ashar</span>
                <span className="text-xl font-bold text-white">01:10:40</span>
             </div>
             <p className="text-[#eab308] font-semibold mt-4">04 Mar 2026<br/>15 Ramadhan 1447 H</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {[
              { name: 'SUBUH', time: '05:00', active: false },
              { name: 'DZUHUR', time: '12:04', active: false },
              { name: 'ASHAR', time: '15:06', active: true },
              { name: 'MAGHRIB', time: '18:10', active: false },
              { name: 'ISYA', time: '19:08', active: false }
            ].map((prayer) => (
              <div key={prayer.name} className={`rounded-2xl p-6 flex flex-col items-center justify-center transition-all ${
                prayer.active 
                ? 'bg-[#eab308] text-[#0a2e24] scale-105 shadow-xl font-bold' 
                : 'bg-[#114638] text-white border border-white/10 hover:bg-[#155a48]'
              }`}>
                <span className={`text-xs uppercase tracking-widest mb-2 ${prayer.active ? 'text-[#854d0e]' : 'text-gray-300'}`}>
                  {prayer.name}
                </span>
                <span className="text-3xl font-bold">{prayer.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}