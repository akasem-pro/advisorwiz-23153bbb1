
import { useState, useEffect } from 'react';
import { BlogPost } from '../types/blogTypes';
import { mockBlogPosts } from '../data/blogPosts';

export const useBlogPost = (slug: string) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // In a real app, you would fetch from an API here
        // For now, we're using mockBlogPosts from data/blogPosts.ts
        const foundPost = mockBlogPosts.find(p => p.slug === slug);
        
        if (!foundPost) {
          throw new Error(`Blog post with slug '${slug}' not found`);
        }
        
        setPost(foundPost);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch blog post'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { post, isLoading, error };
};
