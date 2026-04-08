// src/app/admin/videos/VideoManager.tsx
'use client';

import { useState } from 'react';
import { saveProfile, toggleProfileSection } from '@/actions/profile';

export default function VideoManager({ initialProfile, initialIsActive }: { initialProfile: any, initialIsActive: boolean }) {
	const [isActive, setIsActive] = useState(initialIsActive);
	const [profileData, setProfileData] = useState(initialProfile);

	// Master Toggle Handler
	const handleToggle = async () => {
		const newState = !isActive;
		setIsActive(newState);
		await toggleProfileSection(newState);
	};

	// Reset Form to Create Mode
	const handleCancelEdit = () => {
		setProfileData([]);
	};

	return (
		<div className="space-y-8">
			
			{/* MASTER SWITCH */}
			<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
				<div>
					<h2 className="text-lg font-bold text-gray-900">Tampilkan Seksi Petugas Sholat Jum'at di Homepage?</h2>
				</div>
				<label className="relative inline-flex items-center cursor-pointer">
					<input 
						type="checkbox" 
						className="sr-only peer" 
						checked={isActive}
						onChange={handleToggle}
					/>
					<div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#0d9488]"></div>
				</label>
			</div>

			<div className="grid gap-8">
				
				{/* LEFT: THE CRUD FORM */}
				<div className="col">
					<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
						<h3 className="text-xl font-bold text-[#0a2e24] mb-6 border-b pb-3">
							Edit Profile Petugas Jum'at
						</h3>
						
						<form action={saveProfile} className="space-y-4" onSubmit={() => setTimeout(() => setProfileData(null), 1000)}>
							{/* Hidden ID for updates */}
							<input type="hidden" name="id" value={profileData?.id || ''} />

							<div>
								<label className="block text-sm font-semibold text-gray-900 mb-1">Imam</label>
								<input 
									type="text" 
									name="imam" 
									defaultValue={profileData?.imam || ''}
									required
									className="w-full px-4 py-2.5 rounded-xl text-black border border-gray-200 focus:ring-2 focus:ring-[#0d9488] outline-none transition-all"
								/>
							</div>

							<div>
								<label className="block text-sm font-semibold text-gray-900 mb-1">Khotib</label>
								<input 
									type="text" 
									name="khotib" 
									defaultValue={profileData?.khotib || ''}
									required
									className="w-full px-4 py-2.5 rounded-xl text-black border border-gray-200 focus:ring-2 focus:ring-[#0d9488] outline-none transition-all"
								/>
							</div>

							<div>
								<label className="block text-sm font-semibold text-gray-900 mb-1">Muadzin</label>
								<input 
									type="text" 
									name="muadzin" 
									defaultValue={profileData?.muadzin || ''}
									required
									className="w-full px-4 py-2.5 rounded-xl text-black border border-gray-200 focus:ring-2 focus:ring-[#0d9488] outline-none transition-all"
								/>
							</div>

							<div>
								<label className="block text-sm font-semibold text-gray-900 mb-1">Bilal</label>
								<input 
									type="text" 
									name="bilal" 
									defaultValue={profileData?.bilal || ''}
									required
									className="w-full px-4 py-2.5 rounded-xl text-black border border-gray-200 focus:ring-2 focus:ring-[#0d9488] outline-none transition-all"
								/>
							</div>

							<div className="pt-4 flex gap-3">
								{profileData && (
									<button 
										type="button" 
										onClick={handleCancelEdit}
										className="w-full py-2.5 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
									>
										Batal
									</button>
								)}
								<button 
									type="submit"
									className="w-full py-2.5 rounded-xl font-semibold text-white bg-[#0a2e24] hover:bg-[#0d9488] transition-colors shadow-sm"
								>
									Simpan Update
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}