
export type LeadStatus = 
  'matched' | 
  'contacted' | 
  'appointment_scheduled' | 
  'appointment_completed' | 
  'proposal_sent' |
  'converted' | 
  'lost';

export type LeadSource = 
  'platform_match' | 
  'direct_search' | 
  'referral' | 
  'external';

export interface LeadEvent {
  id: string;
  timestamp: string;
  status: LeadStatus;
  notes?: string;
}

export interface Lead {
  id: string;
  advisorId: string;
  consumerId: string;
  consumerName: string;
  matchScore: number;
  source: LeadSource;
  status: LeadStatus;
  currentValue?: number; // Potential value of the lead in dollars
  createdAt: string;
  updatedAt: string;
  convertedAt?: string;
  history: LeadEvent[];
}

export interface LeadStats {
  totalLeads: number;
  activeLeads: number;
  convertedLeads: number;
  conversionRate: number;
  averageTimeToConversion: number; // in days
  leadsByStatus: Record<LeadStatus, number>;
  leadsBySource: Record<LeadSource, number>;
}
