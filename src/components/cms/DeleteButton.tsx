// src/components/cms/DeleteButton.tsx
'use client';

export default function DeleteButton() {
  return (
    <button 
      type="submit" 
      className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
      onClick={(e) => {
        if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
          e.preventDefault();
        }
      }}
    >
      Hapus
    </button>
  );
}