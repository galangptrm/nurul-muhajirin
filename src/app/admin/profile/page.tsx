// src/app/admin/videos/page.tsx
import { supabase } from '@/lib/supabase';
import ProfileManager from './ProfileManager';

export default async function AdminProfilePage() {
	// Fetch master setting
	const { data: setting } = await supabase
		.from('site_settings')
		.select('is_active')
		.eq('key', 'show_short_videos')
		.single();

	// Fetch all videos
	const { data: profile } = await supabase
        .from('khutbah_profile')
        .select('*')
        .eq('id', 1)
        .single();

    console.log('setting', setting);
    console.log('Khutbah data', profile);
    

	return (
		<div className="max-w-6xl mx-auto">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Kelola Petugas Jumat</h1>
				<p className="text-gray-500 mt-1">Atur section petugas Jum'at.</p>
			</div>

			{/* We pass the fetched data into our Client Component */}
			<ProfileManager 
				initialProfile={profile || null} 
				initialIsActive={setting?.is_active ?? true} 
			/>
		</div>
	);
}