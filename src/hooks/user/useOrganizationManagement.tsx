
import { useState } from 'react';
import { FinancialFirm as Firm } from '../../types/firmTypes';

/**
 * Hook to manage organizations (firms)
 */
export const useOrganizationManagement = () => {
  const [firms, setFirms] = useState<Firm[]>([]);
  
  /**
   * Add a new firm
   */
  const addFirm = (firm: Firm) => {
    setFirms(prev => [...prev, firm]);
  };
  
  /**
   * Get a firm by admin ID
   */
  const getFirmByAdmin = async (adminId: string): Promise<Firm | undefined> => {
    // In a real app, this would likely be an API call
    return firms.find(firm => firm.adminId === adminId);
  };
  
  return {
    firms,
    setFirms,
    addFirm,
    getFirmByAdmin
  };
};
