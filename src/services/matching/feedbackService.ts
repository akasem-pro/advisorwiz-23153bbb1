
import { v4 as uuidv4 } from 'uuid';

export interface MatchFeedback {
  id: string;
  matchId: string;
  userId: string;
  isHelpful: boolean;
  comment?: string;
  createdAt: string;
}

// In a real app, this would be stored in a database
let feedbackStore: MatchFeedback[] = [];

/**
 * Submit feedback for a match
 */
export const submitMatchFeedback = (
  userId: string,
  matchId: string,
  isHelpful: boolean,
  comment?: string
): MatchFeedback => {
  const feedback: MatchFeedback = {
    id: uuidv4(),
    matchId,
    userId,
    isHelpful,
    comment,
    createdAt: new Date().toISOString()
  };
  
  // Store feedback (in real app, this would be a database call)
  feedbackStore.push(feedback);
  
  // In development, log the feedback
  if (process.env.NODE_ENV === 'development') {
    console.log('Match feedback submitted:', feedback);
  }
  
  return feedback;
};

/**
 * Get all feedback for a match
 */
export const getMatchFeedback = (matchId: string): MatchFeedback[] => {
  return feedbackStore.filter(f => f.matchId === matchId);
};

/**
 * Get all feedback from a user
 */
export const getUserFeedback = (userId: string): MatchFeedback[] => {
  return feedbackStore.filter(f => f.userId === userId);
};

/**
 * Get aggregated feedback stats
 */
export const getFeedbackStats = (): { 
  totalFeedback: number;
  helpfulCount: number;
  helpfulPercentage: number;
} => {
  const totalFeedback = feedbackStore.length;
  const helpfulCount = feedbackStore.filter(f => f.isHelpful).length;
  const helpfulPercentage = totalFeedback > 0 
    ? Math.round((helpfulCount / totalFeedback) * 100) 
    : 0;
    
  return {
    totalFeedback,
    helpfulCount,
    helpfulPercentage
  };
};

/**
 * Clear all feedback (for testing)
 */
export const clearFeedbackStore = (): void => {
  feedbackStore = [];
};
