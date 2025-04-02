
import { useState, useCallback, useRef, useEffect } from 'react';
import { FeedbackItem } from './types';

/**
 * Core hook that manages feedback state and history
 */
export const useFeedbackCore = () => {
  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackItem[]>([]);
  const [inlineFeedback, setInlineFeedback] = useState<FeedbackItem | null>(null);
  const activeToastsRef = useRef<Set<string>>(new Set());
  
  // Expire old feedback items
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setFeedbackHistory(prev => 
        prev.filter(item => 
          !item.autoExpire || 
          now - item.timestamp < (item.expiryMs || 5000)
        )
      );
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Add a feedback item to history
  const addToHistory = useCallback((feedbackItem: FeedbackItem) => {
    setFeedbackHistory(prev => [feedbackItem, ...prev].slice(0, 100)); // Limit history
  }, []);
  
  // Remove a feedback item
  const dismissFeedback = useCallback((id: string) => {
    activeToastsRef.current.delete(id);
    setInlineFeedback(prev => prev && prev.id === id ? null : prev);
    setFeedbackHistory(prev => 
      prev.map(item => 
        item.id === id ? { ...item, autoExpire: true, expiryMs: 0 } : item
      )
    );
  }, []);
  
  // Clear all feedback
  const clearAllFeedback = useCallback(() => {
    setInlineFeedback(null);
    activeToastsRef.current.clear();
    setFeedbackHistory(prev => 
      prev.map(item => ({ ...item, autoExpire: true, expiryMs: 0 }))
    );
  }, []);

  return {
    feedbackHistory,
    inlineFeedback,
    activeToastsRef,
    addToHistory,
    dismissFeedback,
    clearAllFeedback,
    setInlineFeedback
  };
};
