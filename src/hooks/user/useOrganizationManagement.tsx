
import React, { useCallback, useState } from 'react';
import { FinancialFirm } from '../../types/firmTypes';
import { toast } from 'sonner';
import { supabase } from '../../integrations/supabase/client';

/**
 * Hook to manage organization-related functionality
 */
export const useOrganizationManagement = () => {
  // Add state management for firms
  const [firms, setFirms] = useState<FinancialFirm[]>([]);

  /**
   * Add a new firm
   */
  const addFirm = useCallback(async (firm: Omit<FinancialFirm, 'id' | 'createdAt'>) => {
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

      // Convert from database format to app format
      const newFirm: FinancialFirm = {
        id: data.id,
        name: data.name,
        description: data.description || '',
        website: data.website || '',
        logo: data.logo,
        industry: data.industry,
        size: data.size,
        city: data.city,
        state: data.state,
        country: data.country || 'US',
        assetsUnderManagement: data.assets_under_management,
        employeeCount: data.employee_count,
        adminId: data.admin_id,
        advisorIds: [], // This would need to be populated separately
        createdAt: data.created_at
      };

      // Update local state
      setFirms(prev => [...prev, newFirm]);
      
      return newFirm;
    } catch (error) {
      console.error("[useOrganizationManagement] Exception adding firm:", error);
      toast.error("Failed to add firm due to an unexpected error");
      return null;
    }
  }, []);

  /**
   * Get firm by admin ID
   */
  const getFirmByAdmin = useCallback(async (adminId: string): Promise<FinancialFirm[]> => {
    try {
      const { data, error } = await supabase
        .from('firms')
        .select('*')
        .eq('admin_id', adminId);

      if (error) {
        console.error("[useOrganizationManagement] Error fetching firm by admin:", error);
        return [];
      }

      if (!data || data.length === 0) {
        return [];
      }

      // Transform database records to FinancialFirm format
      const firmsList = data.map(firm => ({
        id: firm.id,
        name: firm.name,
        description: firm.description || '',
        website: firm.website || '',
        logo: firm.logo,
        industry: firm.industry,
        size: firm.size,
        city: firm.city,
        state: firm.state,
        country: firm.country || 'US',
        assetsUnderManagement: firm.assets_under_management,
        employeeCount: firm.employee_count,
        adminId: firm.admin_id,
        advisorIds: [], // This would need to be populated separately
        createdAt: firm.created_at
      }));
      
      // Update local state
      setFirms(firmsList);
      
      return firmsList;
    } catch (error) {
      console.error("[useOrganizationManagement] Exception fetching firm by admin:", error);
      return [];
    }
  }, []);

  return {
    addFirm,
    getFirmByAdmin,
    firms,
    setFirms
  };
};
