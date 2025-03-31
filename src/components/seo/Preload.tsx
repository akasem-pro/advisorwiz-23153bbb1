
import React from 'react';
import { Helmet } from 'react-helmet';

interface PreloadProps {
  resources?: {
    url: string;
    as: 'image' | 'style' | 'script' | 'font' | 'fetch';
    type?: string;
    crossOrigin?: 'anonymous' | 'use-credentials';
    importance?: 'high' | 'low' | 'auto';
  }[];
  preconnect?: string[];
  prefetch?: string[];
  prerender?: string[];
  dnsPrefetch?: string[];
  criticalStyles?: string;
}

const Preload: React.FC<PreloadProps> = ({ 
  resources = [], 
  preconnect = [], 
  prefetch = [],
  prerender = [],
  dnsPrefetch = [],
  criticalStyles
}) => {
  return (
    <Helmet>
      {/* Inline critical CSS if provided */}
      {criticalStyles && (
        <style data-critical="true">{criticalStyles}</style>
      )}

      {/* Preload critical resources */}
      {resources.map((resource, index) => (
        <link 
          key={`preload-${index}-${resource.url}`} 
          rel="preload" 
          href={resource.url} 
          as={resource.as}
          type={resource.type}
          crossOrigin={resource.crossOrigin}
          fetchpriority={resource.importance || "auto"}
        />
      ))}

      {/* Preconnect to critical origins */}
      {preconnect.map((origin, index) => (
        <link 
          key={`preconnect-${index}-${origin}`} 
          rel="preconnect" 
          href={origin} 
          crossOrigin="anonymous" 
        />
      ))}

      {/* Prefetch likely navigation */}
      {prefetch.map((url, index) => (
        <link 
          key={`prefetch-${index}-${url}`} 
          rel="prefetch" 
          href={url} 
          crossOrigin="anonymous"
        />
      ))}

      {/* Prerender likely pages */}
      {prerender.map((url, index) => (
        <link 
          key={`prerender-${index}-${url}`} 
          rel="prerender" 
          href={url} 
        />
      ))}

      {/* DNS prefetch */}
      {dnsPrefetch.map((domain, index) => (
        <link 
          key={`dns-prefetch-${index}-${domain}`} 
          rel="dns-prefetch" 
          href={domain} 
        />
      ))}
    </Helmet>
  );
};

export default React.memo(Preload);
