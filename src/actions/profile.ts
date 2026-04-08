// src/actions/video.ts
'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

// 1. Toggle the Master Switch
export async function toggleProfileSection(isActive: boolean) {
	const { error } = await supabase
		.from('site_settings')
		.update({ is_active: isActive })
		.eq('key', 'show_petugas_jumat');

	if (error) throw new Error('Gagal mengubah status seksi petugas jumat');
	revalidatePath('/admin/profile');
	revalidatePath('/');
}

// 2. Save or Update a Video (Upsert)
export async function saveProfile(formData: FormData) {
	const id = formData.get('id') as string;
	const imam = formData.get('imam') as string;
	const khotib = formData.get('khotib') as string;
	const bilal = formData.get('bilal') as string;
	const muadzin = formData.get('muadzin') as string;

	if (!imam) throw new Error('Nama imam wajib diisi');

	const payload = {
		imam,
		khotib,
		bilal,
		muadzin
	};

	let error;
	if (id) {
		// Update existing
		({ error } = await supabase.from('khutbah_profile').update(payload).eq('id', id));
	}

	if (error) throw new Error('Gagal menyimpan data petugas jumat');

	revalidatePath('/admin/profile');
	revalidatePath('/');
}