// src/actions/video.ts
'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

// 1. Toggle the Master Switch
export async function toggleVideoSection(isActive: boolean) {
	const { error } = await supabase
		.from('site_settings')
		.update({ is_active: isActive })
		.eq('key', 'show_short_videos');

	if (error) throw new Error('Gagal mengubah status seksi video');
	revalidatePath('/admin/videos');
	revalidatePath('/');
}

// 2. Save or Update a Video (Upsert)
export async function saveVideo(formData: FormData) {
	const id = formData.get('id') as string;
	const title = formData.get('title') as string;
	const description = formData.get('description') as string;
	const video_url = formData.get('video_url') as string;
	const existing_file_url = formData.get('existing_file_url') as string;
	const videoFile = formData.get('video_file') as File;

	if (!title) throw new Error('Judul wajib diisi');

	let final_file_url = existing_file_url;

	// Handle new file upload if present
	if (videoFile && videoFile.size > 0) {
		const fileExt = videoFile.name.split('.').pop();
		const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
		const filePath = `shorts/${fileName}`;

		const { error: uploadError } = await supabase.storage
			.from('videos')
			.upload(filePath, videoFile);

		if (uploadError) throw new Error('Gagal mengupload video');

		const { data: publicUrlData } = supabase.storage
			.from('videos')
			.getPublicUrl(filePath);

		final_file_url = publicUrlData.publicUrl;
	}

	const payload = {
		title,
		description,
		video_url: video_url || null,
		video_file_url: final_file_url || null,
	};

	let error;
	if (id) {
		// Update existing
		({ error } = await supabase.from('short_videos').update(payload).eq('id', id));
	} else {
		// Insert new
		({ error } = await supabase.from('short_videos').insert([payload]));
	}

	if (error) throw new Error('Gagal menyimpan data video');

	revalidatePath('/admin/videos');
	revalidatePath('/');
}

// 3. Delete a Video
export async function deleteVideo(formData: FormData) {
	const id = formData.get('id') as string;
	if (!id) return;

	const { error } = await supabase.from('short_videos').delete().eq('id', id);
	if (error) throw new Error('Gagal menghapus video');

	revalidatePath('/admin/videos');
	revalidatePath('/');
}