
import React from 'react';

interface BlogPostContentProps {
  content: string;
}

export const BlogPostContent: React.FC<BlogPostContentProps> = ({ content }) => {
  return (
    <div 
      className="prose prose-slate max-w-none 
                prose-headings:font-serif prose-headings:text-navy-900 
                prose-p:text-slate-600
                prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline 
                prose-img:rounded-lg
                prose-strong:text-navy-700
                prose-li:text-slate-600
                prose-blockquote:border-l-teal-500 prose-blockquote:text-slate-700 prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-md"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
