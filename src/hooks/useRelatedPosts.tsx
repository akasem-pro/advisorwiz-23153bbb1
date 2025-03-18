
import { useState, useEffect } from 'react';
import { BlogPost } from '../types/blogTypes';
import { mockBlogPosts } from '../data/blogPosts';

export const useRelatedPosts = (
  currentPostId: string,
  category?: string,
  tags?: string[],
  limit: number = 3
) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, you would fetch from an API here
        // For now, we're using mockBlogPosts and implementing the logic on the client
        
        // Filter out the current post
        const otherPosts = mockBlogPosts.filter(post => post.id !== currentPostId);
        
        // Calculate relevance score for each post
        const scoredPosts = otherPosts.map(post => {
          let score = 0;
          
          // Match by category (highest relevance)
          if (category && post.category === category) {
            score += 3;
          }
          
          // Match by tags
          if (tags && post.tags) {
            const matchingTags = post.tags.filter(tag => tags.includes(tag));
            score += matchingTags.length;
          }
          
          return { post, score };
        });
        
        // Sort by relevance score (highest first)
        scoredPosts.sort((a, b) => b.score - a.score);
        
        // Take the top N posts with a score > 0, or just the most recent if no relevance
        let relatedPosts = scoredPosts
          .filter(item => item.score > 0)
          .map(item => item.post)
          .slice(0, limit);
        
        // If we don't have enough related posts, fill with recent posts
        if (relatedPosts.length < limit) {
          const recentPosts = otherPosts
            .filter(post => !relatedPosts.some(p => p.id === post.id))
            .sort((a, b) => {
              return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
            })
            .slice(0, limit - relatedPosts.length);
          
          relatedPosts = [...relatedPosts, ...recentPosts];
        }
        
        setPosts(relatedPosts);
      } catch (error) {
        console.error('Error fetching related posts:', error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [currentPostId, category, tags, limit]);

  return { posts, isLoading };
};
