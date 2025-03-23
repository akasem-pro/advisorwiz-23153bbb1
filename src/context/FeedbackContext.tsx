
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface FeedbackContextType {
  isFeedbackEnabled: boolean;
  enableFeedback: () => void;
  disableFeedback: () => void;
  toggleFeedback: () => void;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isFeedbackEnabled, setIsFeedbackEnabled] = useState<boolean>(true);

  const enableFeedback = () => setIsFeedbackEnabled(true);
  const disableFeedback = () => setIsFeedbackEnabled(false);
  const toggleFeedback = () => setIsFeedbackEnabled(prev => !prev);

  return (
    <FeedbackContext.Provider
      value={{
        isFeedbackEnabled,
        enableFeedback,
        disableFeedback,
        toggleFeedback
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = (): FeedbackContextType => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};
