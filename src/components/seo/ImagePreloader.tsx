
import React, { useEffect } from 'react';

interface ImagePreloaderProps {
  images: string[];
  priority?: 'high' | 'low';
}

/**
 * Component that preloads a set of images without affecting the critical rendering path
 * Used for images that will likely be needed soon but aren't part of the initial viewport
 */
const ImagePreloader: React.FC<ImagePreloaderProps> = ({ 
  images, 
  priority = 'low' 
}) => {
  useEffect(() => {
    // Function to preload images
    const preloadImages = () => {
      images.forEach(src => {
        if (!src) return;
        
        const img = new Image();
        if (priority === 'high') {
          img.fetchPriority = 'high';
        } else {
          img.fetchPriority = 'low';
        }
        img.src = src;
      });
    };
    
    // Use requestIdleCallback for low priority images to avoid impacting page performance
    if (priority === 'low' && 'requestIdleCallback' in window) {
      requestIdleCallback(() => {
        preloadImages();
      }, { timeout: 2000 });
    } else if (priority === 'low') {
      // Fallback for browsers without requestIdleCallback
      setTimeout(preloadImages, 1000);
    } else {
      // High priority images are loaded right away but still off the main thread
      preloadImages();
    }
  }, [images, priority]);

  // This component doesn't render anything
  return null;
};

export default ImagePreloader;
