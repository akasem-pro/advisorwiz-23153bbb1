
import { AdvisorProfile, ConsumerProfile, Chat, Appointment } from '../../types/userTypes';
import { MatchPreferences } from '../../context/UserContextDefinition';
import { CallMetrics } from '../../types/callTypes';

// Mock data imports (these would be replaced with real data in a production environment)
import { mockAdvisors, mockConsumers } from '../../data/mockUsers';

/**
 * Analyzes chat, appointment, and call history to recommend matches
 */
export const getRecommendedProfilesBasedOnActivity = (
  userType: 'consumer' | 'advisor',
  userId: string,
  chats: Chat[],
  appointments: Appointment[],
  preferences: MatchPreferences,
  callMetrics: CallMetrics[] = [] // New parameter
): (AdvisorProfile | ConsumerProfile)[] => {
  // Get user's most active contacts
  const userChats = chats.filter(chat => chat.participants.includes(userId));
  
  // Count messages per contact
  const messageCountByContact: Record<string, number> = {};
  
  userChats.forEach(chat => {
    const contactId = chat.participants.find(id => id !== userId);
    
    if (contactId) {
      // Count messages from this contact
      const messagesFromContact = chat.messages.filter(msg => msg.senderId === contactId).length;
      
      if (!messageCountByContact[contactId]) {
        messageCountByContact[contactId] = 0;
      }
      
      messageCountByContact[contactId] += messagesFromContact;
    }
  });
  
  // Get user's appointments
  const userAppointments = appointments.filter(apt => {
    if (userType === 'consumer') {
      return apt.consumerId === userId;
    } else {
      return apt.advisorId === userId;
    }
  });
  
  // Count appointments per contact
  const appointmentCountByContact: Record<string, number> = {};
  
  userAppointments.forEach(apt => {
    const contactId = userType === 'consumer' ? apt.advisorId : apt.consumerId;
    
    if (!appointmentCountByContact[contactId]) {
      appointmentCountByContact[contactId] = 0;
    }
    
    appointmentCountByContact[contactId] += 1;
  });
  
  // Get call data per contact
  const callScoreByContact: Record<string, number> = {};
  
  if (callMetrics.length > 0) {
    callMetrics.forEach(metric => {
      const contactId = userType === 'consumer' ? metric.advisorId : metric.consumerId;
      
      // Calculate a call engagement score based on calls and duration
      const callCount = metric.totalCalls;
      const callDuration = metric.totalDuration;
      const completionRate = metric.totalCalls > 0 
        ? metric.callOutcomes.completed / metric.totalCalls 
        : 0;
      
      // Calculate a weighted score
      const callScore = (callCount * 2) + (callDuration / 60) + (completionRate * 10);
      
      callScoreByContact[contactId] = callScore;
    });
  }
  
  // Combine activity scores with priority on call interactions
  const activityScores: Record<string, number> = {};
  
  // Merge all contact IDs
  const allContactIds = [
    ...Object.keys(messageCountByContact),
    ...Object.keys(appointmentCountByContact),
    ...Object.keys(callScoreByContact)
  ].filter((id, index, array) => array.indexOf(id) === index);
  
  allContactIds.forEach(contactId => {
    const messageScore = messageCountByContact[contactId] || 0;
    const appointmentScore = (appointmentCountByContact[contactId] || 0) * 3; // Weight appointments higher
    const callScore = (callScoreByContact[contactId] || 0) * 5; // Weight calls highest
    
    activityScores[contactId] = messageScore + appointmentScore + callScore;
  });
  
  // Get contacts with similar activity patterns
  const contactsByActivity = allContactIds
    .sort((a, b) => activityScores[b] - activityScores[a]);
  
  // Find similar profiles based on active contacts
  let recommendedProfiles: (AdvisorProfile | ConsumerProfile)[] = [];
  
  if (userType === 'consumer') {
    // If user is consumer, find advisors similar to their active advisors
    const activeAdvisors = contactsByActivity
      .map(id => mockAdvisors.find(a => a.id === id))
      .filter(Boolean) as AdvisorProfile[];
    
    if (activeAdvisors.length > 0) {
      // Get expertise from active advisors
      const commonExpertise = activeAdvisors.flatMap(a => a.expertise)
        .filter((exp, i, arr) => arr.indexOf(exp) === i);
      
      // Find other advisors with similar expertise
      recommendedProfiles = mockAdvisors
        .filter(a => !contactsByActivity.includes(a.id)) // Exclude already contacted
        .filter(a => a.expertise.some(exp => commonExpertise.includes(exp)))
        .map(advisor => ({
          ...advisor,
          // Calculate match score based on expertise overlap
          compatibilityScores: {
            ...advisor.compatibilityScores,
            [userId]: (advisor.expertise.filter(exp => commonExpertise.includes(exp)).length / 
                      commonExpertise.length) * 100
          }
        }))
        .sort((a, b) => 
          (b.compatibilityScores?.[userId] || 0) - 
          (a.compatibilityScores?.[userId] || 0)
        );
    }
  } else {
    // If user is advisor, find consumers similar to their active consumers
    const activeConsumers = contactsByActivity
      .map(id => mockConsumers.find(c => c.id === id))
      .filter(Boolean) as ConsumerProfile[];
    
    if (activeConsumers.length > 0) {
      // Get common characteristics from active consumers
      const riskTolerances = activeConsumers.map(c => c.riskTolerance);
      const mostCommonRisk = riskTolerances.sort((a, b) => 
        riskTolerances.filter(r => r === a).length - 
        riskTolerances.filter(r => r === b).length
      )[0];
      
      const commonLanguages = activeConsumers.flatMap(c => c.preferredLanguage)
        .filter((lang, i, arr) => arr.indexOf(lang) === i);
      
      // Find other consumers with similar characteristics
      recommendedProfiles = mockConsumers
        .filter(c => !contactsByActivity.includes(c.id)) // Exclude already contacted
        .filter(c => c.riskTolerance === mostCommonRisk || 
                     c.preferredLanguage.some(lang => commonLanguages.includes(lang)))
        .sort((a, b) => {
          // Score based on similarity to active consumers
          const aScore = (a.riskTolerance === mostCommonRisk ? 50 : 0) + 
                         (a.preferredLanguage.filter(lang => commonLanguages.includes(lang)).length * 10);
          
          const bScore = (b.riskTolerance === mostCommonRisk ? 50 : 0) + 
                         (b.preferredLanguage.filter(lang => commonLanguages.includes(lang)).length * 10);
          
          return bScore - aScore;
        });
    }
  }
  
  return recommendedProfiles.slice(0, 5); // Return top 5 recommendations
};
