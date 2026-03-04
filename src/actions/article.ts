// src/actions/article.ts
'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

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