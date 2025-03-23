
// Setup lazy loading for images
export const setupLazyLoading = () => {
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px 0px',
      threshold: [0.01]
    });
    
    lazyImages.forEach((img) => imageObserver.observe(img));
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach((img: Element) => {
      const imgEl = img as HTMLImageElement;
      if (imgEl.dataset.src) {
        imgEl.src = imgEl.dataset.src;
        imgEl.removeAttribute('data-src');
      }
    });
  }
};

// Optimize images for Core Web Vitals
export const optimizeImagesForCWV = () => {
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img').forEach((img) => {
      if (!img.hasAttribute('loading') && !img.hasAttribute('fetchpriority')) {
        img.setAttribute('loading', 'lazy');
        
        // Add decoding async for better performance
        if (!img.hasAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }
      }
    });
  }
  
  // Add fetchpriority="high" to LCP image
  const heroImages = document.querySelectorAll('.hero-image img, .primary-image img');
  heroImages.forEach((img) => {
    if (!img.hasAttribute('fetchpriority')) {
      img.setAttribute('fetchpriority', 'high');
      img.removeAttribute('loading'); // Don't lazy-load LCP images
    }
  });
};
