// src/actions/article.ts
'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createArticle(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const is_published = formData.get('is_published') === 'on';
  
  const slug = title.replaceAll(" ", "-").toLowerCase();
  
  // Extract the actual File object from the form
  const imageFile = formData.get('image_file') as File;

  if (!title || !slug || !content) {
    throw new Error('Judul, slug, dan konten wajib diisi');
  }

  let image_url = null;

  // 1. Process Image Upload if a file was selected
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop();
    // Generate a unique filename so we don't overwrite existing images
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `articles/${fileName}`;

    // Upload the file to the 'images' bucket
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error('Gagal mengupload gambar ke penyimpanan');
    }

    // Retrieve the public URL for the newly uploaded file
    const { data: publicUrlData } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    image_url = publicUrlData.publicUrl;
  }

  // 2. Save the Article Data (with the new image URL) to the Database
  const { error } = await supabase
    .from('articles')
    .insert([{ 
      title, 
      slug, 
      content, 
      image_url, 
      is_published 
    }]);

  if (error) {
    console.error('Database error:', error);
    throw new Error('Gagal menyimpan artikel ke database');
  }

  revalidatePath('/admin/articles');
  revalidatePath('/');
  redirect('/admin/articles');
}

// Add this to the bottom of src/actions/article.ts

export async function updateArticle(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const existing_image_url = formData.get('existing_image_url') as string;
  const is_published = formData.get('is_published') === 'on';
  
  const imageFile = formData.get('image_file') as File;

  const slug = title.replaceAll(" ", "-").toLowerCase();

  if (!id || !title || !slug || !content) {
    throw new Error('Data wajib belum lengkap');
  }

  let final_image_url = existing_image_url;

  // If a NEW file was selected, upload it
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `articles/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, imageFile);

    if (uploadError) throw new Error('Gagal mengupload gambar baru');

    const { data: publicUrlData } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    final_image_url = publicUrlData.publicUrl;
  }

  // Update the database row
  const { error } = await supabase
    .from('articles')
    .update({ 
      title, 
      slug, 
      content, 
      image_url: final_image_url, 
      is_published 
    })
    .eq('id', id);

  if (error) throw new Error('Gagal memperbarui artikel di database');

  revalidatePath('/admin/articles');
  revalidatePath('/');
  revalidatePath(`/article/${slug}`); // Revalidate the specific public article page too
  redirect('/admin/articles');
}

// Action to delete an article
export async function deleteArticle(formData: FormData) {
  const id = formData.get('id') as string;

  if (!id) return;

  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting article:', error);
    throw new Error('Gagal menghapus artikel');
  }

  // Tell Next.js to refresh the admin table and the public homepage
  revalidatePath('/admin/articles');
  revalidatePath('/');
}