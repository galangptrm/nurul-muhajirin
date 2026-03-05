import { supabase } from '@/lib/supabase';
import Link from 'next/link';

// Helper type based on your schema
interface Article {
  id: string;
  title: string;
  slug: string;
  image_url: string;
  created_at: string;
}

export default async function HomePage() {
  // Fetch the 5 latest published articles directly from Supabase
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(5);

  const mainArticle = articles?.[0];
  const sideArticles = articles?.slice(1, 5) || [];

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Header Banner with Video */}
      <section className="relative h-[70vh] w-full overflow-hidden bg-emerald-950">
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        >
          <source src="/mosque-banner.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-amber-400 mb-4 drop-shadow-lg">
              Welcome to Our Mosque
            </h1>
            <p className="text-lg text-white">Serving the community with faith and dedication</p>
          </div>
        </div>
      </section>

      {/* 6. Prayer Time (Jadwal Sholat) - Overlapping the banner slightly */}
      <section className="relative -mt-16 max-w-6xl mx-auto px-4 z-10">
        <div className="bg-emerald-900 rounded-lg shadow-xl p-6 text-white flex flex-col md:flex-row justify-between items-center border border-amber-500/30">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-amber-400">Jadwal Sholat</h3>
            <p className="text-sm">Bekasi, West Java & Sekitarnya</p>
          </div>
          <div className="flex gap-4 md:gap-8 text-center overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {['Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'].map((prayer) => (
              <div key={prayer} className="min-w-[4rem]">
                <p className="text-sm text-emerald-200">{prayer}</p>
                <p className="font-bold text-lg">--:--</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Latest Update (Short Video/Reels Embeds) */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-emerald-900 mb-8 border-b-2 border-amber-400 inline-block pb-2">
          Latest Updates
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="aspect-[9/16] bg-gray-200 rounded-lg overflow-hidden relative shadow-md">
              {/* Replace with actual iframe/embed from Instagram/TikTok */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Reel Embed {item}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Our Services (6 items, 3 per row) */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-emerald-900 mb-8 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Pendidikan Al-Quran', 'Kajian Rutin', 'Penyaluran ZISWAF', 'Konsultasi Syariah', 'Fasilitas Jenazah', 'Pernikahan'].map((service, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-amber-400 text-center hover:shadow-md transition">
                <div className="h-12 w-12 bg-emerald-100 rounded-full mx-auto mb-4 flex items-center justify-center text-emerald-800 font-bold">
                  {i + 1}
                </div>
                <h3 className="font-bold text-lg text-emerald-900">{service}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Latest News (1 Large Left, 4 Small Right) */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-emerald-900 mb-8 border-b-2 border-amber-400 inline-block pb-2">
          Latest News
        </h2>
        
        {mainArticle ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: 1 Large Article */}
            <Link href={`/article/${mainArticle.slug}`} className="lg:col-span-2 group">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={mainArticle.image_url || '/placeholder.jpg'} 
                  alt={mainArticle.title}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/40 to-transparent"></div>
                <div className="absolute bottom-0 p-6">
                  <span className="text-amber-400 text-sm font-bold bg-emerald-900 px-3 py-1 rounded-full mb-3 inline-block">
                    Terbaru
                  </span>
                  <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition">
                    {mainArticle.title}
                  </h3>
                </div>
              </div>
            </Link>

            {/* Right: 4 Small Articles */}
            <div className="flex flex-col gap-4">
              {sideArticles.map((article) => (
                <Link href={`/article/${article.slug}`} key={article.id} className="flex gap-4 group bg-white p-2 rounded-lg hover:bg-emerald-50 transition">
                  <div className="h-24 w-24 flex-shrink-0 rounded-md overflow-hidden">
                    <img 
                      src={article.image_url || '/placeholder.jpg'} 
                      alt={article.title}
                      className="h-full w-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-bold text-emerald-900 group-hover:text-emerald-700 line-clamp-2">
                      {article.title}
                    </h4>
                    <span className="text-xs text-gray-500 mt-1">
                      {new Date(article.created_at).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Belum ada artikel yang dipublikasikan.</p>
        )}
      </section>

      {/* 5. Petugas Jum'at Pekan Ini */}
      <section className="py-16 bg-emerald-900 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-amber-400 mb-6">Petugas Jum'at Pekan Ini</h2>
          
          <blockquote className="max-w-3xl mx-auto mb-10 text-emerald-100 italic">
            "Wahai orang-orang yang beriman! Apabila telah diseru untuk melaksanakan salat pada hari Jum'at, maka segeralah kamu mengingat Allah dan tinggalkanlah jual beli. Yang demikian itu lebih baik bagimu jika kamu mengetahui." 
            <br/><span className="text-sm font-semibold mt-2 block">— QS. Al-Jumu'ah: 9</span>
          </blockquote>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div>
              <p className="text-emerald-300 text-sm uppercase tracking-wider mb-1">Khatib</p>
              <p className="text-xl font-bold">Ustadz Fulan, Lc., M.A.</p>
            </div>
            <div>
              <p className="text-emerald-300 text-sm uppercase tracking-wider mb-1">Imam</p>
              <p className="text-xl font-bold">Syeikh Fulan Al-Hafizh</p>
            </div>
            <div>
              <p className="text-emerald-300 text-sm uppercase tracking-wider mb-1">Muadzin</p>
              <p className="text-xl font-bold">Akhi Fulan</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer (Note: Usually placed in layout.tsx, but added here per request) */}
      <footer className="bg-emerald-950 text-emerald-200 py-12 border-t border-emerald-800">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-amber-400 mb-4">Masjid Name</h3>
            <p className="mb-2">Jl. Contoh Alamat No. 123<br/>Kota, Provinsi, 12345</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-amber-400 mb-4">Contact</h3>
            <p className="mb-2">Telp: (021) 1234-5678</p>
            <p>Email: info@masjidname.com</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-amber-400 mb-4">Social Media</h3>
            <div className="flex gap-4">
              {/* Replace with actual SVG icons */}
              <a href="#" className="hover:text-white transition">Instagram</a>
              <a href="#" className="hover:text-white transition">YouTube</a>
              <a href="#" className="hover:text-white transition">TikTok</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}