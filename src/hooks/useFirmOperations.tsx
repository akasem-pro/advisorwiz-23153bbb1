
import { FinancialFirm } from '../types/userTypes';
import { 
  createFirm, 
  getFirmsByAdminId 
} from '../services/firmService';

/**
 * Hook that provides firm-related operations
 */
export const useFirmOperations = (
  firms: FinancialFirm[], 
  setFirms: React.Dispatch<React.SetStateAction<FinancialFirm[]>>
) => {
  const addFirm = (firmData: Omit<FinancialFirm, 'id' | 'createdAt'>) => {
    const newFirm = createFirm(firmData);
    setFirms(prevFirms => [...prevFirms, newFirm]);
  };

  const getFirmByAdmin = (adminId: string) => {
    return getFirmsByAdminId(firms, adminId);
  };

  return {
    addFirm,
    getFirmByAdmin
  };
};
