
import React from 'react';
import SEO from './SEO';
import StructuredData from './StructuredData';

// Import the SEOProps interface directly from the SEO file
import type { SEOProps } from './SEO';

export interface PageSEOProps extends SEOProps {
  structuredData?: Record<string, any> | Array<Record<string, any>>;
  breadcrumbs?: Array<{ name: string; url: string }>;
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
  ...seoProps 
}) => {
  // Generate breadcrumb schema if breadcrumbs are provided but no structured data
  let combinedStructuredData = structuredData;
  
  return (
    <>
      <SEO {...seoProps} />
      {combinedStructuredData && <StructuredData data={combinedStructuredData} />}
    </>
  );
};

export default PageSEO;
