
import React from 'react';
import { useRelatedPosts } from '../../hooks/useRelatedPosts';
import { BlogPostCard } from './BlogPostCard';

interface RelatedPostsProps {
  currentPostId: string;
  category?: string;
  tags?: string[];
  className?: string;
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ 
  currentPostId, 
  category, 
  tags, 
  className = '' 
}) => {
  const { posts, isLoading } = useRelatedPosts(currentPostId, category, tags);
  
  if (isLoading || posts.length === 0) {
    return null;
  }
  
  return (
    <section className={className}>
      <h2 className="text-2xl font-serif font-bold text-navy-900 mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};
