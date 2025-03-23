
import React from 'react';
import { useAuth } from '@/features/auth/context/AuthProvider';
import { useFeedback } from '../../context/FeedbackContext';
import FeedbackWidget from './FeedbackWidget';

interface FeedbackContainerProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const FeedbackContainer: React.FC<FeedbackContainerProps> = ({
  position = 'bottom-right'
}) => {
  const { isFeedbackEnabled } = useFeedback();
  const auth = useAuth();
  
  // Only show the feedback widget if feedback is enabled
  if (!isFeedbackEnabled) {
    return null;
  }

  return (
    <FeedbackWidget 
      position={position}
      userId={auth?.user?.id}
      currentPageUrl={window.location.href}
    />
  );
};

export default FeedbackContainer;
