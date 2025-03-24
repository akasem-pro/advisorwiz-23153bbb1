
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { AdvisorProfile } from '../types/userTypes';
import { useUser } from '../context/UserContext';
import { toast } from 'sonner';
import { extractData, processArrayResponse } from '../lib/supabase/types/databaseHelpers';

export const useAdvisors = (limit: number = 10) => {
  const [advisors, setAdvisors] = useState<AdvisorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userType, matchPreferences } = useUser();

  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch advisor profiles
        const advisorResponse = await supabase
          .from('advisor_profiles')
          .select(`
            id,
            organization,
            is_accredited,
            website,
            languages,
            expertise,
            hourly_rate,
            portfolio_fee,
            assets_under_management,
            years_of_experience,
            average_rating,
            rating_count,
            biography,
            certifications
          `)
          .limit(limit);

        if (advisorResponse.error) {
          throw new Error('Failed to fetch advisor profiles: ' + advisorResponse.error.message);
        }

        const advisorProfiles = advisorResponse.data || [];

        // Fetch profile data for these advisors
        const advisorIds = advisorProfiles.map(advisor => advisor.id);
        
        const profileResponse = await supabase
          .from('profiles')
          .select(`
            id,
            first_name,
            last_name,
            avatar_url,
            online_status,
            last_online,
            show_online_status,
            chat_enabled,
            city,
            state,
            country
          `)
          .in('id', advisorIds);

        if (profileResponse.error) {
          throw new Error('Failed to fetch profile data: ' + profileResponse.error.message);
        }

        const profileData = profileResponse.data || [];

        // Combine the data
        const combinedAdvisors = advisorProfiles.map(advisor => {
          const profile = profileData.find(p => p.id === advisor.id);
          
          if (!profile) return null;

          return {
            id: advisor.id,
            name: `${profile.first_name} ${profile.last_name}`,
            organization: advisor.organization || '',
            isAccredited: advisor.is_accredited || false,
            website: advisor.website || '',
            testimonials: [],
            languages: advisor.languages || [],
            pricing: {
              hourlyRate: advisor.hourly_rate,
              portfolioFee: advisor.portfolio_fee
            },
            assetsUnderManagement: advisor.assets_under_management || 0,
            expertise: advisor.expertise || [],
            yearsOfExperience: advisor.years_of_experience || 0,
            averageRating: advisor.average_rating || 0,
            ratingCount: advisor.rating_count || 0,
            biography: advisor.biography || '',
            certifications: advisor.certifications || [],
            location: {
              city: profile.city || '',
              state: profile.state || '',
              country: profile.country || 'US'
            },
            matches: [],
            chats: [],
            profilePicture: profile.avatar_url,
            chatEnabled: profile.chat_enabled,
            appointmentCategories: [],
            appointments: [],
            onlineStatus: profile.online_status || 'offline',
            lastOnline: profile.last_online || new Date().toISOString(),
            showOnlineStatus: profile.show_online_status
          } as AdvisorProfile;
        }).filter(Boolean) as AdvisorProfile[];

        setAdvisors(combinedAdvisors);
      } catch (error) {
        console.error('Error fetching advisors:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
        toast.error('Failed to load advisors');
      } finally {
        setLoading(false);
      }
    };

    fetchAdvisors();
  }, [limit]);

  return { advisors, loading, error };
};
