
/**
 * Adaptive optimization utilities
 * Detects device capabilities and adjusts optimization strategies accordingly
 */

/**
 * Get device capability level for adaptive optimization
 */
export function getDeviceCapabilityLevel(): 'high' | 'medium' | 'low' {
  if (typeof window === 'undefined') return 'medium';
  
  // Check for low-end devices
  const isLowEnd = () => {
    // Check for hardware concurrency (CPU cores)
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
      return true;
    }
    
    // Check for device memory API
    if ('deviceMemory' in navigator && (navigator as any).deviceMemory <= 2) {
      return true;
    }
    
    // Check user agent for mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    
    return isMobile;
  };
  
  // Check for high-end devices
  const isHighEnd = () => {
    // Many CPU cores indicates a powerful device
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency >= 8) {
      return true;
    }
    
    // Lots of memory indicates a powerful device
    if ('deviceMemory' in navigator && (navigator as any).deviceMemory >= 8) {
      return true;
    }
    
    return false;
  };
  
  if (isLowEnd()) return 'low';
  if (isHighEnd()) return 'high';
  return 'medium';
}

/**
 * Get optimized image quality based on device and network
 */
export function getOptimalImageQuality(): number {
  if (typeof window === 'undefined') return 80;
  
  const capabilityLevel = getDeviceCapabilityLevel();
  const connection = (navigator as any).connection;
  
  // Check network conditions if available
  if (connection) {
    const saveData = connection.saveData;
    const effectiveType = connection.effectiveType;
    
    // Respect data saver settings
    if (saveData) return 60;
    
    // Adjust based on network speed
    if (effectiveType === '4g' && capabilityLevel === 'high') return 90;
    if (effectiveType === '4g') return 85;
    if (effectiveType === '3g') return 75;
    if (effectiveType === '2g') return 60;
  }
  
  // Default quality based on device capability
  switch (capabilityLevel) {
    case 'high': return 85;
    case 'medium': return 80;
    case 'low': return 70;
    default: return 80;
  }
}

/**
 * Get optimal animation settings based on device capabilities
 */
export function getOptimalAnimationSettings(): {
  reduceMotion: boolean;
  useSimplifiedAnimations: boolean;
  animationDuration: number;
} {
  if (typeof window === 'undefined') {
    return {
      reduceMotion: false,
      useSimplifiedAnimations: false,
      animationDuration: 300
    };
  }
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const capabilityLevel = getDeviceCapabilityLevel();
  
  return {
    reduceMotion: prefersReducedMotion,
    useSimplifiedAnimations: prefersReducedMotion || capabilityLevel === 'low',
    animationDuration: capabilityLevel === 'low' ? 150 : 300
  };
}
