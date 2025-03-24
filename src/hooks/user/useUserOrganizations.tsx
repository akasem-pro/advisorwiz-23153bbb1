
import { useState, useCallback } from 'react';
import { FinancialFirm } from '../../types/firmTypes';

/**
 * Hook to manage organization-related state and operations
 */
export const useUserOrganizations = () => {
  const [firms, setFirms] = useState<FinancialFirm[]>([]);

  const addFirm = useCallback((firm: Omit<FinancialFirm, 'id' | 'createdAt'>) => {
    const newFirm: FinancialFirm = {
      ...firm,
      id: `firm-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    setFirms(prevFirms => [...prevFirms, newFirm]);
  }, []);

  const getFirmByAdmin = useCallback((adminId: string) => {
    return firms.filter(firm => firm.adminId === adminId);
  }, [firms]);

  return {
    firms,
    setFirms,
    addFirm,
    getFirmByAdmin
  };
};
