
import React from 'react';
import SEO from './SEO';
import StructuredData from './StructuredData';
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from '../../utils/jsonLdData';
import { Link } from 'react-router-dom';

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
      <nav className="container mx-auto px-4 py-4" aria-label="Breadcrumb">
        <ol className="flex text-sm text-slate-500 flex-wrap">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <React.Fragment key={crumb.url}>
                <li>
                  {isLast ? (
                    <span className="text-teal-600">{crumb.name}</span>
                  ) : (
                    <Link to={crumb.url.replace('https://advisorwiz.com', '')} className="hover:text-teal-600">
                      {crumb.name}
                    </Link>
                  )}
                </li>
                {!isLast && <li className="mx-2">/</li>}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default LocalBusinessSEO;
