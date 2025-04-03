
import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import PageSEO from '../components/seo/PageSEO';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';

const Blog: React.FC = () => {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" }
  ];

  return (
    <AppLayout>
      <PageSEO 
        title="Financial Advice Blog | AdvisorWiz"
        description="Explore our collection of articles on personal finance, investment strategies, retirement planning, and more."
        keywords="financial blog, investment advice, retirement planning, financial tips"
        canonicalUrl="https://advisorwiz.com/blog"
      />
      
      <BreadcrumbNav items={breadcrumbs} />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-navy-900 dark:text-white">Financial Wisdom Blog</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* This would normally be populated from a CMS or backend */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white dark:bg-navy-800 rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-slate-200 dark:bg-navy-700"></div>
              <div className="p-6">
                <p className="text-sm text-teal-600 dark:text-teal-400 font-medium">
                  {['Investing', 'Retirement', 'Tax Planning', 'Estate Planning', 'Insurance', 'Budgeting'][i % 6]}
                </p>
                <h2 className="text-xl font-bold mt-2 mb-4 text-navy-900 dark:text-white">
                  Sample Blog Post Title {i}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  This is a short preview of the blog post content. Click to read the full article and learn more about this topic.
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-navy-600"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-navy-900 dark:text-white">Author Name</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">April 3, 2025 · 5 min read</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Blog;
