export function stripHtmlTags(html: string): string {
    if (!html) return '';
    
    // The Regex: Matches anything starting with < and ending with >
    return html
      .replace(/<[^>]*>?/gm, '') 
      // Optional: Also clean up common HTML entities Quill might generate
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }