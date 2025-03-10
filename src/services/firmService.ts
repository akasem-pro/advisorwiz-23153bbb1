
import { FinancialFirm } from '../types/userTypes';

export const createFirm = (
  firmData: Omit<FinancialFirm, 'id' | 'createdAt'>
): FinancialFirm => {
  return {
    ...firmData,
    id: `firm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
};

export const getFirmsByAdminId = (
  firms: FinancialFirm[], 
  adminId: string
): FinancialFirm[] => {
  return firms.filter(firm => firm.adminId === adminId);
};
