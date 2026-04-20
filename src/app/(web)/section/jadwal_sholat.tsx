import axios from "axios";
import JadwalSholat from '@/components/web/JadwalSholat';

export default async function SectionJadwalSholat() {
	const apiKey = process.env.ISLAMIC_API_KEY || "";
	const lat = '-6.3422537';
	const lon = '106.9371608';

	try {
		const url = 'https://islamicapi.com/api/v1/prayer-time/';
		const response = await axios.get(url, {
			params: { lat, lon, method: '20', school: '1', api_key: apiKey }
		});

		if (response.data.status === 'success') {
			// Pass the server-fetched data to the Client Component
			return (
				<section className="py-16 bg-[#0a2e24] border-t-4 border-[#eab308]">
					<JadwalSholat initialData={response.data.data} />
				</section>
			);
		}
	} catch (error) {
		console.error('SSR Fetch failed:', error);
	}

	return <div className="bg-[#0a2e24] py-10 text-white text-center">...</div>;
}