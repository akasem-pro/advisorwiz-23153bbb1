
import { FeeStructureOption } from '../types/advisorTypes';

// Define fee structure options
export const feeStructureOptions: FeeStructureOption[] = [
  { value: 'flat_fee', label: 'Flat Fee', fieldType: 'currency', placeholder: 'e.g., $1,000' },
  { value: 'percent_assets', label: 'Percentage of Assets', fieldType: 'percentage', placeholder: 'e.g., 1.5%' },
  { value: 'hourly', label: 'Hourly Rate', fieldType: 'currency', placeholder: 'e.g., $250/hour' },
  { value: 'subscription', label: 'Subscription-based', fieldType: 'currency', placeholder: 'e.g., $99/month' },
  { value: 'commission', label: 'Commission-based', fieldType: 'percentage', placeholder: 'e.g., 3%' },
  { value: 'hybrid', label: 'Hybrid Model', fieldType: 'text', placeholder: 'Describe your fee structure' }
];

// Define minimum investment options
export const minimumInvestmentOptions = [
  { value: 'entry_level', label: 'Entry-Level Investors', range: '$0 to $50,000' },
  { value: 'mass_affluent', label: 'Mass Affluent Investors', range: '$50,000 to $500,000' },
  { value: 'hnwi', label: 'High-Net-Worth Individuals (HNWIs)', range: '$500,000 to $5 million' },
  { value: 'uhnwi', label: 'Ultra-High-Net-Worth Individuals (UHNWIs)', range: '$5 million and above' }
];
