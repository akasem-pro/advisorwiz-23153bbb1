
// Implement resource hints
export const implementResourceHints = () => {
  const head = document.head;
  
  // Common domains to preconnect to
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.google-analytics.com'
  ];
  
  // Add preconnect hints
  preconnectDomains.forEach(domain => {
    if (!document.querySelector(`link[rel="preconnect"][href="${domain}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      head.appendChild(link);
    }
  });
};
