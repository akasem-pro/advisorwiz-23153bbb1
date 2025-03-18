
import React from 'react';
import { Helmet } from 'react-helmet';

interface StructuredDataProps {
  data: Record<string, any> | Array<Record<string, any>>;
}

/**
 * Component for adding structured data (schema.org) to the page
 * Optimized for latest Google structured data guidelines
 */
const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  // Handle both single schema object and array of schema objects
  const formatData = (dataObj: Record<string, any> | Array<Record<string, any>>) => {
    if (Array.isArray(dataObj)) {
      // Process each item for compatibility
      const processedData = dataObj.map(item => {
        // Ensure @context is present
        if (!item['@context'] && item['@type']) {
          return { '@context': 'https://schema.org', ...item };
        }
        return item;
      });
      
      // For multiple schemas, we use a single JSON-LD script with an array (preferred by Google)
      return JSON.stringify(processedData);
    } else {
      // Process single object
      if (!dataObj['@context'] && dataObj['@type']) {
        return JSON.stringify({ '@context': 'https://schema.org', ...dataObj });
      }
      return JSON.stringify(dataObj);
    }
  };
  
  // Format data for insertion
  const content = formatData(data);
    
  return (
    <Helmet>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Helmet>
  );
};

export default StructuredData;
