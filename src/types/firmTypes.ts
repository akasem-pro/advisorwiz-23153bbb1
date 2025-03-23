
// Types for financial firms

import { Location } from './locationTypes';

// Financial firm type
export type FinancialFirm = {
  id: string;
  name: string;
  description: string;
  website: string;
  logo?: string;
  industry?: string;
  size?: string;
  assetsUnderManagement?: number;
  employeeCount?: number;
  location?: Location;
  adminId: string; // ID of the user who administers this firm
  advisorIds: string[]; // IDs of advisors in this firm
  createdAt: string;
};
