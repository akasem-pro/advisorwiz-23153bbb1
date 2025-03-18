
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { formatDate } from '../../utils/formatters';
import { BlogPost } from '../../types/blogTypes';

interface BlogPostCardProps {
  post: BlogPost;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow border border-slate-200">
      <Link to={`/blog/${post.slug}`} className="relative">
        <div className="aspect-video overflow-hidden">
          <img 
            src={post.featuredImage} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            loading="lazy"
          />
        </div>
        {post.category && (
          <Badge className="absolute top-4 left-4 bg-teal-600 hover:bg-teal-700">
            {post.category}
          </Badge>
        )}
      </Link>
      <CardContent className="pt-6 flex-grow">
        <Link to={`/blog/${post.slug}`}>
          <h3 className="text-xl font-serif font-semibold line-clamp-2 hover:text-teal-600 transition-colors text-navy-900">
            {post.title}
          </h3>
        </Link>
        <p className="text-sm text-slate-500 mt-2">{formatDate(post.publishDate)}</p>
        <p className="mt-3 text-slate-600 line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Link 
          to={`/blog/${post.slug}`} 
          className="text-teal-600 font-medium text-sm hover:text-teal-700"
        >
          Read more →
        </Link>
      </CardFooter>
    </Card>
  );
};
