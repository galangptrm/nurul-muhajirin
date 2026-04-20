'use client';

import { useState, useEffect } from 'react';

// 1. Updated Interface based on your JSON reference
interface PrayerTimesData {
	times: {
		Fajr: string;
		Sunrise: string;
		Dhuhr: string;
		Asr: string;
		Sunset: string;
		Maghrib: string;
		Isha: string;
		Imsak: string;
		Midnight: string;
		Firstthird: string;
		Lastthird: string;
	};
	date: {
		readable: string;
		timestamp: string;
		hijri: {
			date: string;
			day: string;
			weekday: { en: string; ar: string };
			month: { number: number; en: string; ar: string; days: number };
			year: string;
			designation: { abbreviated: string; expanded: string };
		};
		gregorian: {
			date: string;
			day: string;
			month: { number: number; en: string };
			year: string;
		};
	};
	timezone: {
		name: string;
		utc_offset: string;
		abbreviation: string;
	};
}

export default function JadwalSholat({ initialData }: { initialData: PrayerTimesData }) {
	// Initialize state with the SSR data
	const [prayerTimes] = useState<PrayerTimesData>(initialData);
    const [timeLeft, setTimeLeft] = useState({ hours: '00', minutes: '00', seconds: '00' });
    const TARGET_TIME = new Date(); 
    let nextPrayer = { name: '-', time: '00:00', active: false }

    function calculateTimeLeft() {
        const difference = +TARGET_TIME - +new Date();
        let timeLeft = { hours: '00', minutes: '00', seconds: '00' };

        if (difference > 0) {
            timeLeft = {
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, '0'),
            minutes: Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, '0'),
            seconds: Math.floor((difference / 1000) % 60).toString().padStart(2, '0'),
            };
        }
        return timeLeft;
    }

    // Helper function to convert "HH:mm" to total minutes
	const getMinutes = (timeStr: string) => {
		const [hours, minutes] = timeStr.split(':').map(Number);
		return hours * 60 + minutes;
	};

	const getNextPrayer = () => {
		const now = new Date();
		const currentMinutes = now.getHours() * 60 + now.getMinutes();

		const prayers = [
			{ name: 'SUBUH', time: prayerTimes.times.Fajr, active: false },
			{ name: 'DZUHUR', time: prayerTimes.times.Dhuhr, active: false },
			{ name: 'ASHAR', time: prayerTimes.times.Asr, active: false },
			{ name: 'MAGHRIB', time: prayerTimes.times.Maghrib, active: false },
			{ name: 'ISYA', time: prayerTimes.times.Isha, active: false },
		];

        for (const pray of prayers) {
            if (getMinutes(pray.time) >= currentMinutes) {

                const [hour, minute] = pray.time.split(':').map(Number);
                
                TARGET_TIME.setHours(hour, minute, 0, 0);
                calculateTimeLeft()

                pray.active = true;
                nextPrayer = pray;
                break;
            }

            if (nextPrayer.name == '-') {
                prayers[4].active = true
                nextPrayer = prayers[4]
            }
        }

		// If no prayer is found (it's after Isha), the next prayer is Subuh tomorrow
		return prayers; 
	};

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
      }, []);

	const prayersData = getNextPrayer();

	return (
		<div className="max-w-7xl mx-auto px-4 text-center">
			<h2 className="text-3xl font-serif font-bold text-white mb-6">
				Waktu Sholat {prayerTimes.timezone.name}
			</h2>

            {nextPrayer &&
                <div className="bg-[#114638] rounded-full px-6 py-2 inline-flex flex-col border border-white/10 ">
                    <span className="text-xs text-gray-300 uppercase tracking-wider">Menuju {nextPrayer.name}</span>
                    <span className="text-xl font-bold text-white">{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}</span>
                </div>
            }
			
			<div className="flex flex-col items-center justify-center mb-10">
				{/* Displaying the Hijri Date using the new interface structure */}
				<p className="text-[#eab308] font-semibold mt-4">
					{prayerTimes.date.readable} <br />
					{prayerTimes.date.hijri.day} {prayerTimes.date.hijri.month.en} {prayerTimes.date.hijri.year} H
				</p>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
				{prayersData.map((prayer) => (
					<div key={prayer.name} className={`text-white p-6 rounded-2xl border border-white/10 ${
                        prayer.active 
                        ? 'bg-[#eab308] text-[#0a2e24] scale-105 shadow-xl font-bold' 
                        : 'bg-[#114638] text-white border border-white/10 hover:bg-[#155a48]'
                    }`}>
						<span className={`text-xs block mb-2 
                            ${prayer.active ? 'text-[#854d0e]' : 'text-gray-300'}`}>{prayer.name}</span>
						<span className="text-3xl font-bold">{prayer.time}</span>
					</div>
				))}
			</div>
		</div>
	);
}