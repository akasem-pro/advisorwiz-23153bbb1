/**
 * Match List Hook
 * 
 * A reusable hook for handling match lists with filtering, sorting,
 * and pagination capabilities.
 */

import { useState, useCallback, useMemo } from 'react';
import { AdvisorProfile, ConsumerProfile } from '../../types/userTypes';
import { useMatchFiltering } from '../useMatchFiltering';
import { useMatchPersistence } from '../useMatchPersistence';
import { usePagination } from '../usePagination';

/**
 * Options for the match list hook
 */
interface UseMatchListOptions {
  /** User type (consumer or advisor) */
  userType: 'consumer' | 'advisor' | null;
  /** Initial profiles to display */
  initialProfiles?: (AdvisorProfile | ConsumerProfile)[];
  /** Page size for pagination */
  pageSize?: number;
  /** Whether to load matches from persistence on mount */
  loadPersistedMatches?: boolean;
  /** Whether to sort results by match score */
  sortByMatchScore?: boolean;
}

/**
 * Interface for basic profile data when fetching persisted matches
 */
interface BasicProfileData {
  // Basic shared fields
  id: string;
  name: string;
  score: number;
  matches: string[];
  chatEnabled: boolean;
  
  // AdvisorProfile required fields
  organization?: string;
  isAccredited?: boolean;
  website?: string;
  testimonials?: { client: string; text: string }[];
  languages?: string[];
  expertise?: any[];
  specializations?: string[];
  pricing?: { hourlyRate?: number; portfolioFee?: number; };
  assetsUnderManagement?: number;
  yearsOfExperience?: number;
  
  // Required for both profile types
  chats: string[];
  onlineStatus: 'online' | 'offline' | 'away';
  lastOnline: string;
  showOnlineStatus: boolean;
  
  // AdvisorProfile specific
  appointmentCategories?: any[];
  appointments?: string[];
  availability?: any[];
  
  // ConsumerProfile specific
  age?: number;
  status?: string;
  investableAssets?: number;
  riskTolerance?: 'low' | 'medium' | 'high';
  preferredCommunication?: string[];
  preferredLanguage?: string[];
  startTimeline?: 'immediately' | 'next_3_months' | 'next_6_months' | 'not_sure';
}

/**
 * Hook for managing a list of matches with filtering and pagination
 * 
 * @param {UseMatchListOptions} options - Configuration options
 */
export const useMatchList = (options: UseMatchListOptions) => {
  const {
    userType, 
    initialProfiles = [], 
    pageSize = 10,
    loadPersistedMatches = false,
    sortByMatchScore = true
  } = options;
  
  // State for profiles
  const [profiles, setProfiles] = useState<(AdvisorProfile | ConsumerProfile)[]>(initialProfiles);
  const [isLoading, setIsLoading] = useState<boolean>(loadPersistedMatches);
  
  // Use the match filtering hook
  const {
    searchTerm,
    setSearchTerm,
    sortOption,
    sortDirection,
    selectedExpertise,
    setSelectedExpertise,
    selectedLanguages,
    setSelectedLanguages,
    filteredAndSortedProfiles,
    handleSortChange,
    toggleSortDirection,
    clearFilters
  } = useMatchFiltering(profiles, userType);
  
  // Get persistence utilities
  const { getTopMatches: fetchPersistedMatches } = useMatchPersistence();
  
  // Use pagination
  const pagination = usePagination<AdvisorProfile | ConsumerProfile>({
    items: filteredAndSortedProfiles,
    itemsPerPage: pageSize
  });
  
  // Extract pagination values for readability
  const {
    items: paginatedItems,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    isFirstPage,
    isLastPage
  } = pagination;
  
  /**
   * Load matches from persistence
   */
  const loadMatches = useCallback(async (limit?: number) => {
    if (!loadPersistedMatches) return;
    
    setIsLoading(true);
    
    try {
      const persistedMatches = await fetchPersistedMatches(limit || pageSize * 2);
      
      if (persistedMatches.length > 0) {
        // Transform persisted matches to profile format
        // In a real implementation, you would fetch the full profiles
        const matchedProfiles = persistedMatches.map(match => {
          const profile: BasicProfileData = {
            id: match.id,
            name: `Profile ${match.id}`,
            score: match.score,
            
            // Required shared fields
            matches: [],
            chatEnabled: false,
            chats: [],
            onlineStatus: 'offline',
            lastOnline: new Date().toISOString(),
            showOnlineStatus: false,
            
            // Add type-specific fields based on userType
            ...(userType === 'advisor' ? {
              // Consumer-specific fields when viewing as advisor
              age: 30,
              status: 'Active',
              investableAssets: 50000,
              riskTolerance: 'medium',
              preferredCommunication: [],
              preferredLanguage: [],
              startTimeline: 'not_sure'
            } : {
              // Advisor-specific fields when viewing as consumer
              organization: 'Organization',
              isAccredited: false,
              website: '',
              testimonials: [],
              languages: [],
              expertise: [],
              specializations: [],
              pricing: { hourlyRate: 100, portfolioFee: 1 },
              assetsUnderManagement: 1000000,
              yearsOfExperience: 5,
              appointments: [],
              appointmentCategories: [],
              availability: []
            })
          };
          
          // Use type assertion after ensuring all required properties are present
          return userType === 'advisor' 
            ? profile as unknown as ConsumerProfile  
            : profile as unknown as AdvisorProfile;
        });
        
        setProfiles(matchedProfiles);
      }
    } catch (error) {
      console.error('Error loading persisted matches:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchPersistedMatches, loadPersistedMatches, pageSize, userType]);
  
  // Load matches on mount if needed
  useMemo(() => {
    if (loadPersistedMatches && profiles.length === 0) {
      loadMatches();
    }
  }, [loadPersistedMatches, profiles.length, loadMatches]);
  
  /**
   * Update profiles list
   */
  const updateProfiles = useCallback((newProfiles: (AdvisorProfile | ConsumerProfile)[]) => {
    setProfiles(newProfiles);
  }, []);
  
  /**
   * Add a profile to the list
   */
  const addProfile = useCallback((profile: AdvisorProfile | ConsumerProfile) => {
    setProfiles(prev => [...prev, profile]);
  }, []);
  
  /**
   * Remove a profile from the list
   */
  const removeProfile = useCallback((profileId: string) => {
    setProfiles(prev => prev.filter(p => p.id !== profileId));
  }, []);
  
  return {
    // Data
    profiles,
    filteredProfiles: filteredAndSortedProfiles,
    displayedProfiles: paginatedItems,
    isLoading,
    
    // Filtering
    searchTerm,
    setSearchTerm,
    selectedExpertise,
    setSelectedExpertise,
    selectedLanguages,
    setSelectedLanguages,
    clearFilters,
    
    // Sorting
    sortOption,
    sortDirection,
    handleSortChange,
    toggleSortDirection,
    
    // Pagination
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    isFirstPage,
    isLastPage,
    
    // Actions
    updateProfiles,
    addProfile,
    removeProfile,
    loadMatches
  };
};
