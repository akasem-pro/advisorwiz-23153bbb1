
import React from 'react';
import { Helmet } from 'react-helmet';

interface StructuredDataProps {
  data: Record<string, any> | Array<Record<string, any>>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  // Handle both single schema object and array of schema objects
  const formatData = (dataObj: Record<string, any> | Array<Record<string, any>>) => {
    if (Array.isArray(dataObj)) {
      return dataObj.map(item => JSON.stringify(item)).join('');
    }
    return JSON.stringify(dataObj);
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
