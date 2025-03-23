
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageSEO from '../components/seo/PageSEO';
import { BlogList } from '../components/blog/BlogList';
import { BlogPost } from '../components/blog/BlogPost';
import { generateBlogListingSchema } from '../utils/schemas/blogSchema';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';

const Blog: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // If we have a slug, show a single blog post, otherwise show the blog listing
  const isSinglePost = !!slug;
  
  // Generate structured data for the blog listing
  const structuredData = !isSinglePost ? generateBlogListingSchema() : undefined;

  const breadcrumbs = isSinglePost 
    ? [
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: slug || "", url: `/blog/${slug}` }
      ]
    : [
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" }
      ];
  
  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <PageSEO
          title={isSinglePost ? undefined : "Financial Advisor Blog"}
          description={isSinglePost ? undefined : "Expert financial advice, industry insights, and resources to help you make informed financial decisions. Regular updates from certified financial advisors."}
          keywords="financial blog, financial advice, financial planning blog, advisor blog, retirement planning, investment strategies, wealth management blog"
          structuredData={structuredData}
        />
        
        <main className="flex-grow pt-20">
          <BreadcrumbNav items={breadcrumbs} />
          
          <div className="container mx-auto px-4 py-8 md:py-12">
            {isSinglePost ? (
              <BlogPost slug={slug} />
            ) : (
              <BlogList />
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default Blog;
