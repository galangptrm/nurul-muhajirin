// src/app/admin/videos/VideoManager.tsx
'use client';

import { useState } from 'react';
import { saveVideo, deleteVideo, toggleVideoSection } from '@/actions/video';
import DeleteButton from '@/components/cms/DeleteButton'; // Reusing your delete button

export default function VideoManager({ initialVideos, initialIsActive }: { initialVideos: any[], initialIsActive: boolean }) {
	const [isActive, setIsActive] = useState(initialIsActive);
	const [editingVideo, setEditingVideo] = useState<any | null>(null);

	// Master Toggle Handler
	const handleToggle = async () => {
		const newState = !isActive;
		setIsActive(newState);
		await toggleVideoSection(newState);
	};

	// Reset Form to Create Mode
	const handleCancelEdit = () => {
		setEditingVideo(null);
	};

	return (
		<div className="space-y-8">
			
			{/* MASTER SWITCH */}
			<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
				<div>
					<h2 className="text-lg font-bold text-gray-900">Tampilkan Seksi Video di Homepage?</h2>
					<p className="text-sm text-gray-500">Nyalakan saklar ini untuk memunculkan seksi video di website publik.</p>
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

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				
				{/* LEFT: THE CRUD FORM */}
				<div className="lg:col-span-1">
					<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
						<h3 className="text-xl font-bold text-[#0a2e24] mb-6 border-b pb-3">
							{editingVideo ? 'Edit Video' : 'Tambah Video Baru'}
						</h3>
						
						<form action={saveVideo} className="space-y-4" onSubmit={() => setTimeout(() => setEditingVideo(null), 1000)}>
							{/* Hidden ID for updates */}
							<input type="hidden" name="id" value={editingVideo?.id || ''} />
							<input type="hidden" name="existing_file_url" value={editingVideo?.video_file_url || ''} />

							<div>
								<label className="block text-sm font-semibold text-gray-900 mb-1">Judul Video</label>
								<input 
									type="text" 
									name="title" 
									defaultValue={editingVideo?.title || ''}
									required
									className="w-full px-4 py-2.5 rounded-xl text-black border border-gray-200 focus:ring-2 focus:ring-[#0d9488] outline-none transition-all"
								/>
							</div>

							<div>
								<label className="block text-sm font-semibold text-gray-900 mb-1">Deskripsi</label>
								<textarea 
									name="description" 
									defaultValue={editingVideo?.description || ''}
									rows={3}
									className="w-full px-4 py-2.5 rounded-xl text-black border border-gray-200 focus:ring-2 focus:ring-[#0d9488] outline-none transition-all resize-y"
								></textarea>
							</div>

							<div>
								<label className="block text-sm font-semibold text-gray-900 mb-1">URL Video (Youtube/TikTok)</label>
								<input 
									type="url" 
									name="video_url" 
									defaultValue={editingVideo?.video_url || ''}
									placeholder="https://..."
									className="w-full px-4 py-2.5 rounded-xl text-black border border-gray-200 focus:ring-2 focus:ring-[#0d9488] outline-none transition-all"
								/>
							</div>

							<div className="relative">
								<div className="absolute inset-0 flex items-center" aria-hidden="true">
									<div className="w-full border-t border-gray-200"></div>
								</div>
								<div className="relative flex justify-center">
									<span className="bg-white px-2 text-xs text-gray-500 font-medium">ATAU UPLOAD FILE</span>
								</div>
							</div>

							<div>
								<label className="block text-sm font-semibold text-gray-900 mb-1">Upload File Video (MP4)</label>
								<input 
									type="file" 
									name="video_file" 
									accept="video/mp4,video/x-m4v,video/*"
									className="w-full px-4 py-2.5 rounded-xl text-black border border-gray-200 focus:ring-2 focus:ring-[#0d9488] outline-none transition-all file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-[#0d9488]"
								/>
								{editingVideo?.video_file_url && (
									<p className="text-xs text-[#0d9488] mt-2">✓ File video sudah tersimpan. Upload baru untuk mengganti.</p>
								)}
							</div>

							<div className="pt-4 flex gap-3">
								{editingVideo && (
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
									{editingVideo ? 'Simpan Update' : 'Tambah Video'}
								</button>
							</div>
						</form>
					</div>
				</div>

				{/* RIGHT: THE DATA TABLE */}
				<div className="lg:col-span-2">
					<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full text-left border-collapse">
								<thead>
									<tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
										<th className="px-6 py-4 font-semibold">Video</th>
										<th className="px-6 py-4 font-semibold">Sumber</th>
										<th className="px-6 py-4 font-semibold text-right">Aksi</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-100">
									{initialVideos.length === 0 ? (
										<tr>
											<td colSpan={3} className="px-6 py-12 text-center text-gray-500">
												Belum ada video. Silakan tambah di samping.
											</td>
										</tr>
									) : (
										initialVideos.map((video) => (
											<tr key={video.id} className="hover:bg-gray-50 transition-colors">
												<td className="px-6 py-4">
													<p className="font-bold text-gray-900 line-clamp-1">{video.title}</p>
													<p className="text-xs text-gray-500 line-clamp-1 mt-1">{video.description}</p>
												</td>
												<td className="px-6 py-4 text-sm">
													{video.video_file_url ? (
														<span className="px-2.5 py-1 rounded-md bg-purple-100 text-purple-700 font-medium text-xs">Upload File</span>
													) : video.video_url ? (
														<span className="px-2.5 py-1 rounded-md bg-red-100 text-red-700 font-medium text-xs">Eksternal URL</span>
													) : (
														<span className="text-gray-400">-</span>
													)}
												</td>
												<td className="px-6 py-4 text-right">
													<div className="flex justify-end gap-4 items-center">
														<button 
															onClick={() => setEditingVideo(video)}
															className="text-[#0d9488] hover:text-[#0f766e] font-medium text-sm transition-colors"
														>
															Edit
														</button>
														<form action={deleteVideo}>
															<input type="hidden" name="id" value={video.id} />
															<DeleteButton />
														</form>
													</div>
												</td>
											</tr>
										))
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
}