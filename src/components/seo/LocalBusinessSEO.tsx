
import React from 'react';
import SEO from './SEO';
import StructuredData from './StructuredData';
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from '../../utils/jsonLdData';
import BreadcrumbNav from '../navigation/BreadcrumbNav';

interface LocalBusinessSEOProps {
  title: string;
  description: string;
  locations: Array<{
    name: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    telephone: string;
    latitude?: number;
    longitude?: number;
  }>;
  breadcrumbs: Array<{name: string, url: string}>;
  keywords?: string;
  canonicalUrl?: string;
}

const LocalBusinessSEO: React.FC<LocalBusinessSEOProps> = ({
  title,
  description,
  locations,
  breadcrumbs,
  keywords,
  canonicalUrl = 'https://advisorwiz.com',
}) => {
  // Generate local business schema for all locations
  const businessSchema = generateLocalBusinessSchema(locations);
  
  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  
  // Combined structured data
  const structuredData = [
    ...businessSchema,
    breadcrumbSchema
  ];

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={keywords}
        canonicalUrl={canonicalUrl}
      />
      <StructuredData data={structuredData} />
      
      {/* Breadcrumb navigation */}
      <BreadcrumbNav items={breadcrumbs} />
    </>
  );
};

export default LocalBusinessSEO;
