
/**
 * Service to manage web worker operations for matching
 */

import { MatchPreferences } from '../../context/UserContextDefinition';

// Type definitions for worker messages
type WorkerRequest = {
  id: string;
  type: 'calculateCompatibility' | 'batchCalculate';
  payload: any;
};

type WorkerResponse = {
  id: string;
  result: any;
  error: string | null;
};

// Store for pending promises
const pendingRequests = new Map<
  string,
  { resolve: (value: any) => void; reject: (reason: any) => void }
>();

// Create the worker
let worker: Worker | null = null;

/**
 * Initialize the matching worker
 */
export function initMatchingWorker(): boolean {
  if (typeof Worker === 'undefined') {
    console.warn('Web Workers are not supported in this environment');
    return false;
  }
  
  try {
    worker = new Worker(new URL('../../workers/matchingWorker.ts', import.meta.url), { type: 'module' });
    
    // Set up message handler
    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const { id, result, error } = event.data;
      
      // Retrieve the pending request
      const request = pendingRequests.get(id);
      if (request) {
        if (error) {
          request.reject(new Error(error));
        } else {
          request.resolve(result);
        }
        pendingRequests.delete(id);
      }
    };
    
    // Set up error handler
    worker.onerror = (error) => {
      console.error('Matching worker error:', error);
    };
    
    return true;
  } catch (error) {
    console.error('Failed to initialize matching worker:', error);
    return false;
  }
}

/**
 * Send a request to the worker
 */
function sendToWorker<T>(type: WorkerRequest['type'], payload: any): Promise<T> {
  if (!worker) {
    return Promise.reject(new Error('Worker not initialized'));
  }
  
  return new Promise<T>((resolve, reject) => {
    const id = crypto.randomUUID();
    
    // Store the promise handlers
    pendingRequests.set(id, { resolve, reject });
    
    // Send the request to the worker
    worker.postMessage({ id, type, payload });
  });
}

/**
 * Calculate compatibility score using the worker
 */
export async function calculateCompatibilityAsync(
  advisorId: string,
  consumerId: string,
  preferences: MatchPreferences
): Promise<{ score: number; matchExplanation: string[] }> {
  return sendToWorker('calculateCompatibility', { 
    advisorId, 
    consumerId, 
    preferences 
  });
}

/**
 * Calculate multiple compatibility scores in batch
 */
export async function calculateBatchCompatibility(
  pairs: Array<{advisorId: string, consumerId: string}>,
  preferences: MatchPreferences
): Promise<Array<{ 
  advisorId: string; 
  consumerId: string; 
  score: number; 
  matchExplanation: string[] 
}>> {
  return sendToWorker('batchCalculate', { pairs, preferences });
}

/**
 * Terminate the worker when no longer needed
 */
export function terminateWorker(): void {
  if (worker) {
    worker.terminate();
    worker = null;
    
    // Reject all pending requests
    pendingRequests.forEach(({ reject }) => {
      reject(new Error('Worker terminated'));
    });
    pendingRequests.clear();
  }
}

/**
 * Check if the browser supports web workers
 */
export function isWorkerSupported(): boolean {
  return typeof Worker !== 'undefined';
}
