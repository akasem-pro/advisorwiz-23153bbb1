
import { useState, useEffect } from 'react';
import { BlogPost } from '../types/blogTypes';
import { mockBlogPosts } from '../data/blogPosts';

export const useBlogPosts = (postsPerPage: number = 9) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch from an API here
        // For now, we're using mockBlogPosts from data/blogPosts.ts
        const data = mockBlogPosts;
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(
            data
              .map(post => post.category)
              .filter(Boolean) as string[]
          )
        );
        
        setAllPosts(data);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts by category and apply pagination
  useEffect(() => {
    if (allPosts.length > 0) {
      // Filter by category if selected
      const filteredPosts = selectedCategory
        ? allPosts.filter(post => post.category === selectedCategory)
        : allPosts;
      
      // Calculate total pages
      const total = Math.ceil(filteredPosts.length / postsPerPage);
      setTotalPages(total || 1);
      
      // Ensure current page is valid after filtering
      const validPage = Math.min(currentPage, total || 1);
      if (validPage !== currentPage) {
        setCurrentPage(validPage);
      }
      
      // Apply pagination
      const start = (validPage - 1) * postsPerPage;
      const paginatedPosts = filteredPosts.slice(start, start + postsPerPage);
      
      setPosts(paginatedPosts);
    }
  }, [allPosts, currentPage, selectedCategory, postsPerPage]);

  return { 
    posts, 
    categories, 
    isLoading, 
    currentPage, 
    totalPages, 
    setCurrentPage,
    selectedCategory,
    setSelectedCategory
  };
};
