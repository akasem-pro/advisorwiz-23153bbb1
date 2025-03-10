
import { AdvisorProfile, ConsumerProfile } from './userTypes';

export type CallType = 'audio' | 'video';
export type CallStatus = 'initiated' | 'connected' | 'missed' | 'completed' | 'declined';

export interface CallSession {
  id: string;
  initiatorId: string;
  recipientId: string;
  type: CallType;
  status: CallStatus;
  startTime: string; // ISO string format
  endTime?: string; // ISO string format
  duration?: number; // in seconds
  notes?: string;
}

export interface CallMetrics {
  advisorId: string;
  consumerId: string;
  totalCalls: number;
  totalDuration: number; // in seconds
  lastInteraction: string; // ISO string format
  callTypes: {
    audio: number;
    video: number;
  };
  callOutcomes: {
    completed: number;
    missed: number;
    declined: number;
  };
  averageCallDuration: number; // in seconds
}
