
import { 
  getFlushTimer, 
  setFlushTimer, 
  shouldFlushImmediately,
  flushBuffer
} from './buffer';
import { FLUSH_INTERVAL } from './types';

/**
 * Schedule a flush of the metrics buffer with debouncing
 */
export const scheduleFlush = (): void => {
  // Don't schedule a flush if one is already pending
  if (getFlushTimer() !== null) {
    return;
  }
  
  // Flush immediately if buffer is getting large or it's been a while since last flush
  if (shouldFlushImmediately()) {
    import('./index').then(module => module.flushMetricsBuffer());
  } else {
    const timer = window.setTimeout(() => {
      import('./index').then(module => module.flushMetricsBuffer());
    }, FLUSH_INTERVAL);
    
    setFlushTimer(timer);
  }
};
