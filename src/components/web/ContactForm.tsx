'use client';

import { useState } from 'react';

const TOPICS = [
	{ value: 'informasi', label: 'Informasi Umum' },
	{ value: 'tahfidz', label: 'Pendaftaran Tahfidz' },
	{ value: 'ambulans', label: 'Layanan Ambulans' },
	{ value: 'zakat', label: 'Konsultasi Zakat & Infaq' },
	{ value: 'lainnya', label: 'Lainnya' },
];

const EMPTY_FORM = { name: '', email: '', topic: '', message: '', consent: false };

// Contact form (client-side only for now: submission is simulated, nothing is sent to a server)
export default function ContactForm() {
	const [form, setForm] = useState(EMPTY_FORM);
	const [error, setError] = useState('');
	const [isSending, setIsSending] = useState(false);
	const [sentTo, setSentTo] = useState('');

	const update = (field: keyof typeof EMPTY_FORM, value: string | boolean) => {
		setForm((prev) => ({ ...prev, [field]: value }));
		setError('');
		setSentTo('');
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!form.name.trim() || !form.email.trim() || !form.topic || !form.message.trim()) {
			setError('Semua kolom wajib diisi.');
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
			setError('Format email tidak valid.');
			return;
		}

		setIsSending(true);
		setTimeout(() => {
			setIsSending(false);
			setSentTo(form.name.trim());
			setForm(EMPTY_FORM);
		}, 800);
	};

	const inputClass = 'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[#0a2e24] placeholder-gray-400 focus:border-[#0d9488] focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20';

	return (
		<section id="kontak" data-testid="section-contact" aria-labelledby="contact-heading" className="py-20 bg-white">
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-10">
					<h2 id="contact-heading" className="text-3xl md:text-4xl font-serif font-bold text-[#0a2e24] mb-3">Hubungi Kami</h2>
					<div className="h-1.5 w-16 bg-[#eab308] rounded-full mx-auto mb-4"></div>
					<p className="text-gray-600">Punya pertanyaan seputar kegiatan dan layanan masjid? Kirimkan pesan Anda.</p>
				</div>

				<form
					onSubmit={handleSubmit}
					noValidate
					aria-label="Formulir kontak"
					data-testid="contact-form"
					className="bg-[#f8fafc] rounded-3xl p-8 md:p-10 border border-gray-100 space-y-6"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label htmlFor="contact-name" className="block text-sm font-semibold text-[#0a2e24] mb-2">Nama Lengkap</label>
							<input
								id="contact-name"
								type="text"
								placeholder="Masukkan nama lengkap"
								value={form.name}
								onChange={(e) => update('name', e.target.value)}
								data-testid="contact-name"
								className={inputClass}
							/>
						</div>
						<div>
							<label htmlFor="contact-email" className="block text-sm font-semibold text-[#0a2e24] mb-2">Email</label>
							<input
								id="contact-email"
								type="email"
								placeholder="Masukkan email Anda"
								value={form.email}
								onChange={(e) => update('email', e.target.value)}
								data-testid="contact-email"
								className={inputClass}
							/>
						</div>
					</div>

					<div>
						<label htmlFor="contact-topic" className="block text-sm font-semibold text-[#0a2e24] mb-2">Keperluan</label>
						<select
							id="contact-topic"
							value={form.topic}
							onChange={(e) => update('topic', e.target.value)}
							data-testid="contact-topic"
							className={inputClass}
						>
							<option value="" disabled>Pilih keperluan</option>
							{TOPICS.map((topic) => (
								<option key={topic.value} value={topic.value}>{topic.label}</option>
							))}
						</select>
					</div>

					<div>
						<label htmlFor="contact-message" className="block text-sm font-semibold text-[#0a2e24] mb-2">Pesan</label>
						<textarea
							id="contact-message"
							rows={5}
							placeholder="Tulis pesan Anda di sini..."
							value={form.message}
							onChange={(e) => update('message', e.target.value)}
							data-testid="contact-message"
							className={inputClass}
						/>
					</div>

					<div className="flex items-start gap-3">
						<input
							id="contact-consent"
							type="checkbox"
							checked={form.consent}
							onChange={(e) => update('consent', e.target.checked)}
							data-testid="contact-consent"
							className="mt-1 h-4 w-4 accent-[#0d9488]"
						/>
						<label htmlFor="contact-consent" className="text-sm text-gray-600">
							Saya setuju data saya digunakan untuk dihubungi kembali oleh pengurus masjid
						</label>
					</div>

					{error && (
						<p role="alert" data-testid="contact-error" className="text-sm font-semibold text-red-600">
							{error}
						</p>
					)}

					{sentTo && (
						<p role="status" data-testid="contact-success" className="rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] px-4 py-3 text-sm font-semibold text-[#166534]">
							Pesan berhasil dikirim. Terima kasih, {sentTo}!
						</p>
					)}

					<button
						type="submit"
						disabled={!form.consent || isSending}
						title={form.consent ? 'Kirim pesan' : 'Centang persetujuan terlebih dahulu'}
						data-testid="contact-submit"
						className="w-full bg-[#0d9488] hover:bg-[#0f766e] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-full transition-colors"
					>
						{isSending ? 'Mengirim...' : 'Kirim Pesan'}
					</button>
				</form>
			</div>
		</section>
	);
}
