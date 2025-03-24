
import React from 'react';
import SEO from './SEO';
import StructuredData from './StructuredData';

// Import the SEOProps interface directly from the SEO file
import type { SEOProps } from './SEO';

export interface PageSEOProps extends SEOProps {
  structuredData?: Record<string, any> | Array<Record<string, any>>;
  breadcrumbs?: Array<{ name: string; url: string }>;
  children?: React.ReactNode;
}

/**
 * A unified SEO component that combines metadata and structured data
 * 
 * @param props - Component properties extending SEOProps with structuredData and breadcrumbs
 * @returns Combined SEO and StructuredData components
 */
const PageSEO: React.FC<PageSEOProps> = ({ 
  structuredData,
  breadcrumbs,
  children,
  ...seoProps 
}) => {
  // Generate breadcrumb schema if breadcrumbs are provided
  let combinedStructuredData = structuredData;
  
  if (breadcrumbs && breadcrumbs.length > 0) {
    const breadcrumbList = {
      '@type': 'BreadcrumbList',
      'itemListElement': breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': `${seoProps.canonicalUrl || 'https://advisorwiz.com'}${item.url}`
      }))
    };
    
    // Combine with existing structured data if present
    if (structuredData) {
      combinedStructuredData = Array.isArray(structuredData) 
        ? [...structuredData, breadcrumbList] 
        : [structuredData, breadcrumbList];
    } else {
      combinedStructuredData = breadcrumbList;
    }
  }
  
  return (
    <>
      <SEO {...seoProps} />
      {combinedStructuredData && <StructuredData data={combinedStructuredData} />}
      {children}
    </>
  );
};

export default PageSEO;
