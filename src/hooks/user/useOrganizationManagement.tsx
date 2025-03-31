
import React, { useCallback } from 'react';
import { Firm } from '../../types/firmTypes';
import { toast } from 'sonner';
import { supabase } from '../../integrations/supabase/client';

/**
 * Hook to manage organization-related functionality
 */
export const useOrganizationManagement = () => {
  /**
   * Add a new firm
   */
  const addFirm = useCallback(async (firm: Firm) => {
    try {
      const { data, error } = await supabase
        .from('firms')
        .insert({
          name: firm.name,
          admin_id: firm.adminId,
          description: firm.description,
          website: firm.website,
          logo: firm.logo,
          industry: firm.industry,
          size: firm.size,
          city: firm.city,
          state: firm.state,
          country: firm.country,
          assets_under_management: firm.assetsUnderManagement,
          employee_count: firm.employeeCount
        })
        .select()
        .single();

      if (error) {
        console.error("[useOrganizationManagement] Error adding firm:", error);
        toast.error("Failed to add firm");
        return null;
      }

      return data;
    } catch (error) {
      console.error("[useOrganizationManagement] Exception adding firm:", error);
      toast.error("Failed to add firm due to an unexpected error");
      return null;
    }
  }, []);

  /**
   * Get firm by admin ID
   */
  const getFirmByAdmin = useCallback(async (adminId: string) => {
    try {
      const { data, error } = await supabase
        .from('firms')
        .select('*')
        .eq('admin_id', adminId)
        .single();

      if (error) {
        console.error("[useOrganizationManagement] Error fetching firm by admin:", error);
        return undefined;
      }

      return data;
    } catch (error) {
      console.error("[useOrganizationManagement] Exception fetching firm by admin:", error);
      return undefined;
    }
  }, []);

  return {
    addFirm,
    getFirmByAdmin
  };
};
