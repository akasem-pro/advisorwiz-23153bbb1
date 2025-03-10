
import { CallSession, CallStatus, CallType, CallMetrics } from '../types/callTypes';

// Create a new call session
export const createCallSession = (
  initiatorId: string,
  recipientId: string,
  type: CallType
): CallSession => {
  return {
    id: `call-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    initiatorId,
    recipientId,
    type,
    status: 'initiated',
    startTime: new Date().toISOString(),
  };
};

// Update a call session status
export const updateCallStatus = (
  session: CallSession,
  status: CallStatus
): CallSession => {
  const updatedSession = { ...session, status };
  
  // If the call is completed, calculate duration
  if (status === 'completed' && !session.endTime) {
    const endTime = new Date().toISOString();
    const startTime = new Date(session.startTime);
    const duration = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
    
    return {
      ...updatedSession,
      endTime,
      duration
    };
  }
  
  // If the call is missed or declined, set end time
  if (['missed', 'declined'].includes(status) && !session.endTime) {
    return {
      ...updatedSession,
      endTime: new Date().toISOString()
    };
  }
  
  return updatedSession;
};

// Calculate metrics for a specific advisor-consumer pair
export const calculateCallMetrics = (
  advisorId: string,
  consumerId: string,
  callSessions: CallSession[]
): CallMetrics => {
  // Filter sessions for this advisor-consumer pair
  const relevantSessions = callSessions.filter(
    session => 
      (session.initiatorId === advisorId && session.recipientId === consumerId) ||
      (session.initiatorId === consumerId && session.recipientId === advisorId)
  );
  
  // Calculate total completed calls
  const completedCalls = relevantSessions.filter(session => session.status === 'completed');
  const totalCalls = relevantSessions.length;
  
  // Calculate total duration of completed calls
  const totalDuration = completedCalls.reduce(
    (total, session) => total + (session.duration || 0),
    0
  );
  
  // Get last interaction time
  const lastInteraction = relevantSessions.length > 0 
    ? relevantSessions.sort((a, b) => 
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
      )[0].startTime
    : new Date().toISOString();
  
  // Count call types
  const audioCalls = relevantSessions.filter(session => session.type === 'audio').length;
  const videoCalls = relevantSessions.filter(session => session.type === 'video').length;
  
  // Count call outcomes
  const missedCalls = relevantSessions.filter(session => session.status === 'missed').length;
  const declinedCalls = relevantSessions.filter(session => session.status === 'declined').length;
  const completedCallsCount = completedCalls.length;
  
  // Calculate average call duration
  const averageCallDuration = completedCallsCount > 0 
    ? totalDuration / completedCallsCount 
    : 0;
  
  return {
    advisorId,
    consumerId,
    totalCalls,
    totalDuration,
    lastInteraction,
    callTypes: {
      audio: audioCalls,
      video: videoCalls
    },
    callOutcomes: {
      completed: completedCallsCount,
      missed: missedCalls,
      declined: declinedCalls
    },
    averageCallDuration
  };
};
