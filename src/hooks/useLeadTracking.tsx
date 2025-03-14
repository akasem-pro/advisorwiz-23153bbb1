
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Lead, LeadStatus, LeadSource, LeadStats } from '../types/leadTypes';
import { differenceInDays } from 'date-fns';

export const useLeadTracking = () => {
  const [leads, setLeads] = useState<Lead[]>([]);

  const addLead = (
    advisorId: string, 
    consumerId: string, 
    consumerName: string, 
    matchScore: number,
    source: LeadSource = 'platform_match'
  ): string => {
    // Check if lead already exists for this consumer and advisor
    const existingLead = leads.find(
      lead => lead.consumerId === consumerId && lead.advisorId === advisorId
    );
    
    if (existingLead) {
      console.log('Lead already exists:', existingLead);
      return existingLead.id;
    }
    
    const now = new Date().toISOString();
    const newLead: Lead = {
      id: uuidv4(),
      advisorId,
      consumerId,
      consumerName,
      matchScore,
      source,
      status: 'matched',
      createdAt: now,
      updatedAt: now,
      history: [
        {
          id: uuidv4(),
          timestamp: now,
          status: 'matched',
          notes: 'Initial match created'
        }
      ]
    };
    
    setLeads(prevLeads => [...prevLeads, newLead]);
    return newLead.id;
  };

  const updateLeadStatus = (leadId: string, status: LeadStatus, notes?: string) => {
    setLeads(prevLeads => {
      return prevLeads.map(lead => {
        if (lead.id === leadId) {
          const now = new Date().toISOString();
          const updatedLead = {
            ...lead,
            status,
            updatedAt: now,
            ...(status === 'converted' && { convertedAt: now }),
            history: [
              ...lead.history,
              {
                id: uuidv4(),
                timestamp: now,
                status,
                notes: notes || `Status updated to ${status}`
              }
            ]
          };
          return updatedLead;
        }
        return lead;
      });
    });
  };

  const getLeadByConsumer = (consumerId: string, advisorId?: string) => {
    if (advisorId) {
      return leads.find(
        lead => lead.consumerId === consumerId && lead.advisorId === advisorId
      ) || null;
    }
    
    // If no advisorId specified, just get the first lead for this consumer
    return leads.find(lead => lead.consumerId === consumerId) || null;
  };

  const getAdvisorLeads = (advisorId: string) => {
    return leads.filter(lead => lead.advisorId === advisorId);
  };

  const getLeadStats = (): LeadStats => {
    if (leads.length === 0) {
      return {
        totalLeads: 0,
        activeLeads: 0,
        convertedLeads: 0,
        conversionRate: 0,
        averageTimeToConversion: 0,
        leadsByStatus: {} as Record<LeadStatus, number>,
        leadsBySource: {} as Record<LeadSource, number>
      };
    }
    
    const convertedLeads = leads.filter(lead => lead.status === 'converted');
    const activeLeads = leads.filter(
      lead => lead.status !== 'converted' && lead.status !== 'lost'
    );
    
    // Calculate conversion time in days for converted leads
    const conversionTimes = convertedLeads
      .filter(lead => lead.convertedAt)
      .map(lead => differenceInDays(
        new Date(lead.convertedAt!), 
        new Date(lead.createdAt)
      ));
    
    const totalConversionDays = conversionTimes.reduce((sum, days) => sum + days, 0);
    const averageTimeToConversion = convertedLeads.length 
      ? totalConversionDays / convertedLeads.length 
      : 0;
    
    // Count leads by status
    const leadsByStatus = leads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {} as Record<LeadStatus, number>);
    
    // Count leads by source
    const leadsBySource = leads.reduce((acc, lead) => {
      acc[lead.source] = (acc[lead.source] || 0) + 1;
      return acc;
    }, {} as Record<LeadSource, number>);
    
    return {
      totalLeads: leads.length,
      activeLeads: activeLeads.length,
      convertedLeads: convertedLeads.length,
      conversionRate: leads.length > 0 
        ? (convertedLeads.length / leads.length) * 100 
        : 0,
      averageTimeToConversion,
      leadsByStatus,
      leadsBySource
    };
  };

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
