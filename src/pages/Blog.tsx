
import React from 'react';
import { useParams } from 'react-router-dom';
import EnhancedBreadcrumbNav from '../components/navigation/EnhancedBreadcrumbNav';
import { InlineFeedback } from '../components/ui/InlineFeedback';
import PageSEO from '../components/seo/PageSEO';

const Blog: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  
  const breadcrumbs = slug 
    ? [
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: slug, url: `/blog/${slug}` }
      ]
    : [
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' }
      ];

  return (
    <>
      <PageSEO
        title={slug ? `${slug} - Financial Insights Blog` : "Financial Insights Blog"}
        description={slug 
          ? `Detailed information about ${slug} and related financial topics.` 
          : 'Stay informed with our latest articles and insights on personal finance and investing.'}
        breadcrumbs={breadcrumbs}
      />
      
      <EnhancedBreadcrumbNav 
        items={breadcrumbs}
        includeHomeIcon={true}
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="section-title">
            {slug ? `Blog Post: ${slug}` : 'Financial Insights Blog'}
          </h1>
          <p className="section-description">
            {slug 
              ? 'Detailed information about this specific financial topic.' 
              : 'Stay informed with our latest articles and insights on personal finance and investing.'}
          </p>
          
          {/* Content will be added in future updates */}
          <div className="mt-8">
            <InlineFeedback 
              variant="info" 
              title="Coming Soon"
              message="This page is under construction. Check back soon for more blog content."
              dismissable={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
