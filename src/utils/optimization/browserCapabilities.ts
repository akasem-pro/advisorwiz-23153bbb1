
/**
 * Utility to detect browser capabilities for optimization strategies
 */

/**
 * Checks if the current browser supports various optimization features
 */
export function detectBrowserCapabilities() {
  const capabilities = {
    webWorkers: typeof Worker !== 'undefined',
    sharedArrayBuffer: typeof SharedArrayBuffer !== 'undefined',
    concurrentJS: typeof navigator.hardwareConcurrency !== 'undefined',
    serviceWorker: 'serviceWorker' in navigator,
    indexedDB: 'indexedDB' in window,
    webGPU: 'gpu' in navigator,
    maxWorkers: navigator.hardwareConcurrency || 4
  };
  
  return capabilities;
}

/**
 * Determines the optimal batch size based on device capabilities
 */
export function getOptimalBatchSize(): number {
  const capabilities = detectBrowserCapabilities();
  
  // Use hardware concurrency as a guide if available
  if (capabilities.concurrentJS) {
    // Balance between over-scheduling and under-utilization
    return Math.max(10, Math.min(50, navigator.hardwareConcurrency * 5));
  }
  
  // Default for unknown hardware
  return 20;
}

/**
 * Get recommended optimization strategy based on browser capabilities
 */
export function getRecommendedStrategy(): {
  useWorkers: boolean;
  useBatching: boolean;
  useIndexedDBCache: boolean;
  batchSize: number;
  workerCount: number;
} {
  const capabilities = detectBrowserCapabilities();
  
  return {
    useWorkers: capabilities.webWorkers,
    useBatching: true, // Batching is always beneficial
    useIndexedDBCache: capabilities.indexedDB,
    batchSize: getOptimalBatchSize(),
    workerCount: Math.max(1, Math.min(4, capabilities.maxWorkers - 1)) // Leave one core for main thread
  };
}

/**
 * Detect if the device is low-powered
 */
export function isLowPoweredDevice(): boolean {
  const capabilities = detectBrowserCapabilities();
  
  // Device is considered low-powered if it has few cores
  if (capabilities.concurrentJS && navigator.hardwareConcurrency <= 2) {
    return true;
  }
  
  // Or if it's a mobile device with limited memory
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true;
  }
  
  return false;
}
