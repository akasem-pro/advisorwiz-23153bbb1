
import { useState, useCallback } from 'react';
import { CallSession, CallStatus, CallType, CallMetrics } from '../types/callTypes';

/**
 * Hook to handle call session management
 */
export const useCallManager = (
  userId: string, 
  userType: 'consumer' | 'advisor',
  onMetricsUpdate?: (metrics: CallMetrics[]) => void
) => {
  const [callSessions, setCallSessions] = useState<CallSession[]>([]);
  const [activeCall, setActiveCall] = useState<CallSession | null>(null);
  const [callMetrics, setCallMetrics] = useState<CallMetrics[]>([]);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  const initiateCall = useCallback((recipientId: string, type: CallType = 'audio') => {
    if (!userId) return null;
    
    const newCall: CallSession = {
      id: `call-${Date.now()}`,
      initiatorId: userId,
      recipientId,
      type,
      status: 'initiated',
      startTime: new Date().toISOString(),
    };
    
    setCallSessions(prev => [...prev, newCall]);
    setActiveCall(newCall);
    setIsCallModalOpen(true);
    
    return newCall;
  }, [userId]);

  const updateCall = useCallback((callId: string, status: CallStatus) => {
    setCallSessions(prev => 
      prev.map(call => 
        call.id === callId 
          ? {
              ...call,
              status,
              endTime: ['completed', 'missed', 'declined'].includes(status) ? new Date().toISOString() : call.endTime,
              duration: ['completed'].includes(status) && !call.duration ? 
                Math.round((Date.now() - new Date(call.startTime).getTime()) / 1000) : call.duration
            }
          : call
      )
    );
    
    // Update active call if it's the one being updated
    setActiveCall(prev => 
      prev?.id === callId 
        ? {
            ...prev,
            status,
            endTime: ['completed', 'missed', 'declined'].includes(status) ? new Date().toISOString() : prev.endTime,
            duration: ['completed'].includes(status) && !prev.duration ? 
              Math.round((Date.now() - new Date(prev.startTime).getTime()) / 1000) : prev.duration
          }
        : prev
    );
    
    // Close modal when call ends
    if (['completed', 'missed', 'declined'].includes(status)) {
      setIsCallModalOpen(false);
      setActiveCall(null);
      
      // Update metrics
      updateMetrics();
    }
  }, []);

  const closeCallModal = useCallback(() => {
    setIsCallModalOpen(false);
  }, []);

  const endCall = useCallback((callId: string) => {
    updateCall(callId, 'completed');
  }, [updateCall]);

  const updateMetrics = useCallback(() => {
    // In a real implementation, this would calculate metrics from call sessions
    // We just define the function shape here
    const updatedMetrics: CallMetrics[] = [];
    
    // Notify callback if provided
    if (onMetricsUpdate) {
      onMetricsUpdate(updatedMetrics);
    }
    
    setCallMetrics(updatedMetrics);
  }, [onMetricsUpdate]);

  return {
    callSessions,
    setCallSessions,
    activeCall,
    callMetrics,
    initiateCall,
    updateCall,
    isCallModalOpen,
    closeCallModal,
    endCall
  };
};
