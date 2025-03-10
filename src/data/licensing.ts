
import { LicensingBody } from '../types/advisorTypes';

// Define licensing bodies options
export const licensingBodies: LicensingBody[] = [
  { value: 'mfda', label: 'MFDA (Mutual Fund Dealers Association)' },
  { value: 'iiroc', label: 'IIROC (Investment Industry Regulatory Organization of Canada)' },
  { value: 'cfp', label: 'CFP (Certified Financial Planner)' },
  { value: 'cfa', label: 'CFA (Chartered Financial Analyst)' },
  { value: 'cim', label: 'CIM (Chartered Investment Manager)' },
  { value: 'cpa', label: 'CPA (Chartered Professional Accountant)' },
  { value: 'pfa', label: 'PFA (Professional Financial Advisor)' },
  { value: 'chfc', label: 'ChFC (Chartered Financial Consultant)' },
  { value: 'other', label: 'Other' }
];
