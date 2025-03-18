
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArticleSEO from '../seo/ArticleSEO';
import { useBlogPost } from '../../hooks/useBlogPost';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { formatDate } from '../../utils/formatters';
import SocialShare from '../ui/SocialShare';
import { ChevronLeft } from 'lucide-react';
import { BlogPostAuthor } from './BlogPostAuthor';
import { RelatedPosts } from './RelatedPosts';
import { BlogPostContent } from './BlogPostContent';

interface BlogPostProps {
  slug: string;
}

export const BlogPost: React.FC<BlogPostProps> = ({ slug }) => {
  const { post, isLoading, error } = useBlogPost(slug);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (error) {
      navigate('/blog', { replace: true });
    }
  }, [error, navigate]);
  
  if (isLoading || !post) {
    return (
      <div className="max-w-4xl mx-auto py-8 space-y-8">
        <div className="w-full h-12 bg-slate-100 rounded-lg animate-pulse"></div>
        <div className="w-full h-80 bg-slate-100 rounded-lg animate-pulse"></div>
        <div className="space-y-4">
          <div className="w-full h-6 bg-slate-100 rounded animate-pulse"></div>
          <div className="w-full h-6 bg-slate-100 rounded animate-pulse"></div>
          <div className="w-3/4 h-6 bg-slate-100 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }
  
  // Create breadcrumbs for SEO
  const breadcrumbs = [
    { name: 'Home', url: 'https://advisorwiz.com/' },
    { name: 'Blog', url: 'https://advisorwiz.com/blog' },
    { name: post.title, url: `https://advisorwiz.com/blog/${post.slug}` }
  ];
  
  return (
    <>
      <ArticleSEO
        title={post.title}
        description={post.excerpt}
        authorName={post.author.name}
        publishDate={post.publishDate}
        modifiedDate={post.modifiedDate}
        featuredImage={post.featuredImage}
        category={post.category}
        tags={post.tags}
        slug={`blog/${post.slug}`}
        excerpt={post.excerpt}
        breadcrumbs={breadcrumbs}
      />
      
      <div className="max-w-4xl mx-auto">
        <Link to="/blog" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to all articles
        </Link>
        
        <article className="bg-white rounded-xl overflow-hidden shadow-sm">
          {/* Featured image */}
          <div className="w-full aspect-video relative">
            <img 
              src={post.featuredImage} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
            {post.category && (
              <Badge className="absolute top-4 left-4">
                {post.category}
              </Badge>
            )}
          </div>
          
          <div className="p-6 md:p-8">
            {/* Header */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-slate-500 mb-6">
                <time dateTime={post.publishDate}>{formatDate(post.publishDate)}</time>
                <span>•</span>
                <span>{post.readingTime} min read</span>
              </div>
              
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-navy-900">{post.author.name}</p>
                    <p className="text-sm text-slate-500">{post.author.title}</p>
                  </div>
                </div>
                
                <SocialShare 
                  title={post.title}
                  url={`${window.location.origin}/blog/${post.slug}`}
                />
              </div>
            </header>
            
            {/* Content */}
            <BlogPostContent content={post.content} />
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-sm font-medium text-slate-500 mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
        
        {/* Author bio */}
        <BlogPostAuthor author={post.author} className="mt-8" />
        
        {/* Related posts */}
        <RelatedPosts 
          currentPostId={post.id} 
          category={post.category} 
          tags={post.tags} 
          className="mt-12" 
        />
      </div>
    </>
  );
};
