export default function SectionServices() {

	return (
		<section id="services" className="py-20 bg-[#f8fafc]">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h2 className="text-4xl font-serif font-bold text-[#0a2e24] mb-12">Layanan Publik Masjid</h2>
			
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{[
					'Masjid',
				 	'Janaiz',
				 	'Tahfiz Quran',
				 	'Zakat dan Wakaf',
				 	'Ambulans',
				 	'Koperasi & Bisnis'
				].map((service, i) => (
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
	);
}