
import React from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';

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
    <AppLayout>
      <BreadcrumbNav items={breadcrumbs} />
      
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
          <div className="mt-8 p-8 bg-slate-50 dark:bg-navy-800/50 rounded-lg text-center">
            <p className="text-lg text-navy-700 dark:text-slate-300">
              This page is under construction. Check back soon for more blog content.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Blog;
