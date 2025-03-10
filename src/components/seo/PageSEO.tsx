
import React from 'react';
import SEO, { SEOProps } from './SEO';
import StructuredData from './StructuredData';

interface PageSEOProps extends SEOProps {
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
  return (
    <>
      <SEO {...seoProps} />
      {structuredData && <StructuredData data={structuredData} />}
    </>
  );
};

export default PageSEO;
