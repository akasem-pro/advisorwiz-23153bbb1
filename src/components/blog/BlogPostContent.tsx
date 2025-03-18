
import React from 'react';

interface BlogPostContentProps {
  content: string;
}

export const BlogPostContent: React.FC<BlogPostContentProps> = ({ content }) => {
  return (
    <div 
      className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-navy-900 
                prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
