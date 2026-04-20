import { supabase } from '@/lib/supabase';
import moment from 'moment';

export default async function SectionKhutbahJumat() {
	
	const { data: petugas_jumat, error } = await supabase
		.from('khutbah_profile')
		.select('*')
		.eq('id', 1)
		.single();

	if (error) {
		console.error("Supabase Connection Error Section Khutbah jumat:", error.message);
	}

	const getNextFriday = () => {
		let nextFriday = moment().locale('id');

		// 5 represents Friday (0 is Sunday, 6 is Saturday)
		if (nextFriday.day() > 5) {
			nextFriday.add(1, 'weeks').day(5);
		} else {
			nextFriday.day(5);
		}
		console.log('Next Jumat', nextFriday.format('dddd D MMMM YYYY'));

		return nextFriday.format('dddd, D MMMM YYYY')
	}

	return (
		<section className="py-20 bg-[#f8fafc]">
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="text-center mb-12">
				<h2 className="text-3xl font-serif font-bold text-[#0a2e24]">Petugas Jumat Masjid Pekan Ini</h2>
			</div>

			<div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] relative overflow-hidden">
				<div className="text-center mb-12">
				<span className="bg-[#fef08a] text-[#854d0e] text-sm font-bold px-4 py-1.5 rounded-full mb-4 inline-block">
					Tanggal
				</span>
				<h3 className="text-2xl md:text-3xl font-serif font-bold text-[#0a2e24]">
					{getNextFriday()}
				</h3>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-t border-gray-100 pt-10">
				<div>
					<p className="text-xs font-bold text-[#0d9488] tracking-widest uppercase mb-2">Khatib</p>
					<p className="font-bold text-[#0a2e24]">{petugas_jumat.khotib}</p>
				</div>
				<div>
					<p className="text-xs font-bold text-[#0d9488] tracking-widest uppercase mb-2">Imam</p>
					<p className="font-bold text-[#0a2e24]">{petugas_jumat.imam}</p>
				</div>
				<div>
					<p className="text-xs font-bold text-[#0d9488] tracking-widest uppercase mb-2">Muadzin</p>
					<p className="font-bold text-[#0a2e24]">{petugas_jumat.muadzin}</p>
				</div>
				<div>
					<p className="text-xs font-bold text-[#0d9488] tracking-widest uppercase mb-2">Bilal</p>
					<p className="font-bold text-[#0a2e24]">{petugas_jumat.bilal}</p>
				</div>
				</div>
			</div>
			</div>
		</section>

	);
}