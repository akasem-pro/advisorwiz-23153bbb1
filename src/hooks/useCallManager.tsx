
import { useState, useCallback, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { CallSession, CallType, CallStatus, CallMetrics } from '../types/callTypes';
import { createCallSession, updateCallStatus, calculateCallMetrics } from '../services/callService';

export const useCallManager = (
  userId: string,
  userType: 'consumer' | 'advisor' | 'firm_admin' | null,
  onMetricsUpdate?: (metrics: CallMetrics[]) => void
) => {
  const [callSessions, setCallSessions] = useState<CallSession[]>([]);
  const [activeCall, setActiveCall] = useState<CallSession | null>(null);
  const [callMetrics, setCallMetrics] = useState<CallMetrics[]>([]);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  
  // Initialize call session
  const initiateCall = useCallback((recipientId: string, type: CallType) => {
    if (!userId) {
      toast({
        title: "Error",
        description: "You must be logged in to make calls",
        variant: "destructive"
      });
      return null;
    }
    
    const newSession = createCallSession(userId, recipientId, type);
    setCallSessions(prev => [...prev, newSession]);
    setActiveCall(newSession);
    setIsCallModalOpen(true);
    
    return newSession;
  }, [userId]);
  
  // Update call status
  const updateCall = useCallback((callId: string, status: CallStatus) => {
    setCallSessions(prev => {
      const updatedSessions = prev.map(session => {
        if (session.id === callId) {
          const updatedSession = updateCallStatus(session, status);
          
          // If this is the active call and it's ending, clear active call
          if (activeCall?.id === callId && ['completed', 'missed', 'declined'].includes(status)) {
            setActiveCall(null);
            setIsCallModalOpen(false);
          }
          
          return updatedSession;
        }
        return session;
      });
      
      return updatedSessions;
    });
  }, [activeCall]);
  
  // Answer incoming call
  const answerCall = useCallback((callId: string) => {
    updateCall(callId, 'connected');
  }, [updateCall]);
  
  // Decline incoming call
  const declineCall = useCallback((callId: string) => {
    updateCall(callId, 'declined');
  }, [updateCall]);
  
  // End active call
  const endCall = useCallback((callId: string) => {
    updateCall(callId, 'completed');
  }, [updateCall]);
  
  // Close call modal
  const closeCallModal = useCallback(() => {
    if (activeCall && ['initiated', 'connected'].includes(activeCall.status)) {
      endCall(activeCall.id);
    }
    setIsCallModalOpen(false);
  }, [activeCall, endCall]);
  
  // Calculate metrics when call sessions change
  useEffect(() => {
    if (userType === 'advisor' && userId) {
      // For advisors, calculate metrics for all consumers they've interacted with
      const uniqueConsumerIds = [...new Set(
        callSessions
          .filter(session => session.initiatorId === userId || session.recipientId === userId)
          .map(session => session.initiatorId === userId ? session.recipientId : session.initiatorId)
      )];
      
      const newMetrics = uniqueConsumerIds.map(consumerId => 
        calculateCallMetrics(userId, consumerId, callSessions)
      );
      
      setCallMetrics(newMetrics);
      
      // Trigger callback if provided
      if (onMetricsUpdate) {
        onMetricsUpdate(newMetrics);
      }
    }
  }, [callSessions, userId, userType, onMetricsUpdate]);
  
  return {
    callSessions,
    activeCall,
    callMetrics,
    isCallModalOpen,
    initiateCall,
    updateCall,
    answerCall,
    declineCall,
    endCall,
    closeCallModal
  };
};
