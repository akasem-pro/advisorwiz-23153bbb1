
import React from 'react';
import BreadcrumbNav from '../navigation/BreadcrumbNav';
import PageSEO from '../seo/PageSEO';

interface LegalPageLayoutProps {
  title: string;
  description: string;
  canonicalUrl: string;
  breadcrumbs: Array<{ name: string; url: string }>;
  lastUpdated: string;
  children: React.ReactNode;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  description,
  canonicalUrl,
  breadcrumbs,
  lastUpdated,
  children
}) => {
  // Generate structured data for legal pages
  const structuredData = {
    "@type": "WebPage",
    "name": title,
    "description": description,
    "dateModified": lastUpdated,
    "mainContentOfPage": {
      "@type": "WebPageElement",
      "cssSelector": ".legal-content"
    }
  };

  return (
    <>
      <PageSEO
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
        structuredData={structuredData}
      />
      
      <BreadcrumbNav items={breadcrumbs} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="section-title">{title}</h1>
          <p className="section-description mb-8">
            {description}
          </p>
          
          <div className="prose prose-slate max-w-none dark:prose-invert legal-content">
            <p className="text-sm text-slate-500 mb-6">Last Updated: {lastUpdated}</p>
            
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default LegalPageLayout;
