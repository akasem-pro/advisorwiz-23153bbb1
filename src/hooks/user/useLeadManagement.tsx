
import { useState, useCallback } from 'react';
import { Lead, LeadStatus, LeadStats, LeadSource } from '../../types/leadTypes';
import { useLeadTracking } from '../useLeadTracking';

/**
 * Hook to manage lead tracking and operations
 */
export const useLeadManagement = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  
  const { 
    addLead,
    updateLeadStatus,
    getLeadByConsumer,
    getAdvisorLeads,
    getLeadStats
  } = useLeadTracking();

  return {
    leads,
    setLeads,
    addLead,
    updateLeadStatus,
    getLeadByConsumer,
    getAdvisorLeads,
    getLeadStats
  };
};
