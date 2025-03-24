
import React, { ReactNode } from 'react';
import { useRealtimeSubscriptions } from '../../hooks/useRealtimeSubscriptions';

interface RealtimeSubscriptionProviderProps {
  children: ReactNode;
}

/**
 * Provider component that sets up all real-time subscriptions
 * This component doesn't render anything other than its children
 */
const RealtimeSubscriptionProvider: React.FC<RealtimeSubscriptionProviderProps> = ({
  children
}) => {
  // Initialize the real-time subscriptions hook
  useRealtimeSubscriptions();
  
  // Just render the children as-is
  return <>{children}</>;
};

export default RealtimeSubscriptionProvider;
