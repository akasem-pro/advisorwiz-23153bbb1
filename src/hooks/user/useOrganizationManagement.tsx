
import { useState } from 'react';
import { FinancialFirm } from '../../types/firmTypes';

/**
 * Hook to manage organizations (firms)
 */
export const useOrganizationManagement = () => {
  const [firms, setFirms] = useState<FinancialFirm[]>([]);
  
  /**
   * Add a new firm
   */
  const addFirm = (firm: FinancialFirm) => {
    setFirms(prev => [...prev, firm]);
  };
  
  /**
   * Get a firm by admin ID
   * Modified to return an array of firms instead of a Promise to match context type
   */
  const getFirmByAdmin = (adminId: string): FinancialFirm[] => {
    // Return firms matching the adminId as an array
    return firms.filter(firm => firm.adminId === adminId);
  };
  
  return {
    firms,
    setFirms,
    addFirm,
    getFirmByAdmin
  };
};
