
import React, { useEffect } from 'react';
import Preload from '../seo/Preload';

interface ResourcePreloadProps {
  currentRoute: string;
}

/**
 * Component that strategically preloads resources based on current route
 */
const ResourcePreload: React.FC<ResourcePreloadProps> = ({ currentRoute }) => {
  // Determine which resources to preload based on current route
  const getPreloadResources = () => {
    // Base resources to preload on all routes
    const baseResources = [
      {
        url: '/images/logo.png',
        as: 'image' as const,
        importance: 'high' as const
      }
    ];
    
    // Route-specific resources
    switch (currentRoute) {
      case '/':
        // For the home page, preload hero images
        return [
          ...baseResources,
          {
            url: '/images/hero-bg.jpg',
            as: 'image' as const,
            importance: 'high' as const
          }
        ];
      case '/pricing':
        // For pricing page, preload pricing table assets
        return [
          ...baseResources,
          {
            url: '/images/pricing-bg.jpg',
            as: 'image' as const,
            importance: 'auto' as const
          }
        ];
      default:
        return baseResources;
    }
  };
  
  // Determine which domains to preconnect to
  const getPreconnectDomains = () => {
    const domains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];
    
    // Add analytics domains when on important pages
    if (currentRoute === '/' || currentRoute === '/pricing' || currentRoute.startsWith('/for-')) {
      domains.push('https://www.google-analytics.com');
    }
    
    return domains;
  };
  
  // Prefetch likely navigation paths based on current route
  const getPrefetchUrls = () => {
    if (currentRoute === '/') {
      return ['/pricing', '/for-advisors'];
    }
    
    if (currentRoute === '/pricing') {
      return ['/contact'];
    }
    
    return [];
  };
  
  // Run page-specific optimizations
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Run DOM optimizations after render
      requestIdleCallback(() => {
        import('../../utils/mobileDOMOptimization').then(module => {
          module.optimizeMobileDOM();
        });
      });
      
      // Record page navigation performance
      import('../../utils/performance/webVitals').then(module => {
        module.recordPerformanceMark('route-rendered');
      });
    }
  }, [currentRoute]);
  
  return (
    <Preload
      resources={getPreloadResources()}
      preconnect={getPreconnectDomains()}
      prefetch={getPrefetchUrls()}
      dnsPrefetch={['https://api.advisorwiz.com']}
    />
  );
};

export default ResourcePreload;
