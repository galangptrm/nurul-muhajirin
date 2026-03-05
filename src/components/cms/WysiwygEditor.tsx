// src/components/cms/WysiwygEditor.tsx
'use client';

import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import the official Quill styles

interface WysiwygEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function WysiwygEditor({ value, onChange }: WysiwygEditorProps) {
  // 1. Ref to attach the Quill editor to a specific <div>
  const editorRef = useRef<HTMLDivElement>(null);
  
  // 2. Ref to hold the Quill instance so we don't initialize it twice
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    // Only initialize if the DOM element exists and Quill hasn't been loaded yet
    if (editorRef.current && !quillInstance.current) {
      
      quillInstance.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Tulis isi artikel di sini...',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            ['link', 'clean']
          ],
        },
      });

      // 3. Set the initial value (useful when we build the "Edit Article" page)
      if (value) {
        const clipboard:any = quillInstance.current.getModule('clipboard');
        clipboard.dangerouslyPasteHTML(value);
      }

      // 4. Listen for typing events and send the HTML back to the parent form
      quillInstance.current.on('text-change', () => {
        if (quillInstance.current) {
          // Extract the raw HTML from the editor
          const html = quillInstance.current.root.innerHTML;
          onChange(html);
        }
      });
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="bg-white text-black rounded-xl overflow-hidden border border-gray-200">
      {/* Quill will attach itself to this div */}
      <div ref={editorRef} className="min-h-[300px] text-base" />
    </div>
  );
}