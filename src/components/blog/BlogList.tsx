
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPostCard } from './BlogPostCard';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '../ui/pagination';
import { Badge } from '../ui/badge';

export const BlogList: React.FC = () => {
  const { posts, categories, isLoading, currentPage, totalPages, setCurrentPage, selectedCategory, setSelectedCategory } = useBlogPosts();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="w-full h-48 bg-slate-100 rounded-lg animate-pulse"></div>
        <div className="w-full h-48 bg-slate-100 rounded-lg animate-pulse"></div>
        <div className="w-full h-48 bg-slate-100 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-900">Financial Advisor Blog</h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Expert insights, industry updates, and practical advice to help you navigate your financial journey.
        </p>
      </div>
      
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Badge 
          variant={!selectedCategory ? "default" : "outline"} 
          className="cursor-pointer px-4 py-2 text-sm"
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Badge>
        
        {categories.map(category => (
          <Badge 
            key={category} 
            variant={selectedCategory === category ? "default" : "outline"} 
            className="cursor-pointer px-4 py-2 text-sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
      
      {/* Blog posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
      
      {/* Empty state */}
      {posts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-navy-700">No posts found</h3>
          <p className="text-slate-500 mt-2">
            {selectedCategory 
              ? `No posts found in the ${selectedCategory} category.` 
              : "No blog posts found."}
          </p>
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={() => setCurrentPage(currentPage - 1)} />
              </PaginationItem>
            )}
            
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink 
                  isActive={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
