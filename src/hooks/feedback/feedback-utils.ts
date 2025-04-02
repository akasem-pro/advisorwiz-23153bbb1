
import { FeedbackItem, FeedbackVariant } from './types';

/**
 * Generate a unique ID for feedback items
 */
export const generateFeedbackId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Check if a similar message is already active in the feedback history
 */
export const isSimilarMessageActive = (
  description: string, 
  variant: FeedbackVariant, 
  feedbackHistory: FeedbackItem[]
): boolean => {
  for (const item of feedbackHistory) {
    if (
      item.variant === variant && 
      (
        item.description === description ||
        (item.description.length > 10 && description.length > 10 && 
         (item.description.includes(description) || description.includes(item.description)))
      )
    ) {
      return true;
    }
  }
  return false;
};

/**
 * Get toast duration based on severity
 */
export const getSeverityDuration = (severity: string): number => {
  switch (severity) {
    case 'LOW':
      return 3000;
    case 'MEDIUM':
      return 5000;
    case 'HIGH':
      return 7000;
    case 'FATAL':
      return 10000;
    default:
      return 5000;
  }
};
