
import React from 'react';
import { Helmet } from 'react-helmet';

interface StructuredDataProps {
  data: Record<string, any> | Array<Record<string, any>>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  // Handle both single schema object and array of schema objects
  const content = Array.isArray(data) 
    ? data.map(item => JSON.stringify(item)).join('')
    : JSON.stringify(data);
    
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
