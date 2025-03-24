
import { useState, useEffect } from 'react';
import { CallSession, CallStatus, CallType, CallMetrics } from '../../types/callTypes';
import { useCallManager } from '../useCallManager';

/**
 * Hook to manage calling functionality
 */
export const useCallManagement = (userId: string | undefined, userType: 'consumer' | 'advisor' | null) => {
  const [callSessions, setCallSessions] = useState<CallSession[]>([]);
  
  // Only run call manager if we have a valid userId
  const safeUserId = userId || '';
  const safeUserType = userType || 'consumer';

  const handleMetricsUpdate = (metrics: CallMetrics[]) => {
    // This will be used by the matching algorithm
    console.log("Updated call metrics:", metrics);
  };

  const {
    callSessions: managedCallSessions,
    activeCall,
    callMetrics,
    initiateCall,
    updateCall: updateCallStatus,
    isCallModalOpen,
    closeCallModal,
    endCall
  } = useCallManager(
    safeUserId, 
    safeUserType,
    handleMetricsUpdate
  );

  // Sync call sessions with state
  useEffect(() => {
    setCallSessions(managedCallSessions);
  }, [managedCallSessions]);

  return {
    callSessions,
    setCallSessions,
    activeCall,
    callMetrics,
    initiateCall,
    updateCallStatus,
    isCallModalOpen,
    closeCallModal,
    endCall
  };
};
