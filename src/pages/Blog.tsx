
import React from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import PageSEO from '../components/seo/PageSEO';
import { BlogList } from '../components/blog/BlogList';
import { BlogPost } from '../components/blog/BlogPost';
import { generateBlogListingSchema } from '../utils/schemas/blogSchema';

const Blog: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // If we have a slug, show a single blog post, otherwise show the blog listing
  const isSinglePost = !!slug;
  
  // Generate structured data for the blog listing
  const structuredData = !isSinglePost ? generateBlogListingSchema() : undefined;
  
  return (
    <AppLayout 
      animation="fade" 
      pageTitle={isSinglePost ? undefined : "Financial Advisor Blog | AdvisorWiz"}
    >
      <PageSEO
        title={isSinglePost ? undefined : "Financial Advisor Blog"}
        description={isSinglePost ? undefined : "Expert financial advice, industry insights, and resources to help you make informed financial decisions. Regular updates from certified financial advisors."}
        keywords="financial blog, financial advice, financial planning blog, advisor blog, retirement planning, investment strategies, wealth management blog"
        structuredData={structuredData}
      />
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        {isSinglePost ? (
          <BlogPost slug={slug} />
        ) : (
          <BlogList />
        )}
      </div>
    </AppLayout>
  );
};

export default Blog;
