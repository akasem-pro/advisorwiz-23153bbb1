
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { BlogAuthor } from '../../types/blogTypes';

interface BlogPostAuthorProps {
  author: BlogAuthor;
  className?: string;
}

export const BlogPostAuthor: React.FC<BlogPostAuthorProps> = ({ author, className = '' }) => {
  return (
    <Card className={`p-6 ${className}`}>
      <CardContent className="p-0 flex flex-col md:flex-row gap-4 items-center md:items-start">
        <Avatar className="h-16 w-16">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-serif font-semibold">{author.name}</h3>
          <p className="text-slate-500 text-sm">{author.title}</p>
          {author.bio && <p className="mt-2 text-slate-600">{author.bio}</p>}
          {author.certifications && author.certifications.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
              {author.certifications.map((cert, index) => (
                <span key={index} className="inline-block text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-600">
                  {cert}
                </span>
              ))}
            </div>
          )}
        </div>
        {author.profileLink && (
          <Button variant="outline" asChild className="min-w-[140px]">
            <a href={author.profileLink}>View Profile</a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
