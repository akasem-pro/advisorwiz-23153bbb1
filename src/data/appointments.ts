
import { AppointmentCategory } from '../context/UserContext';

// Default appointment categories
export const DEFAULT_CATEGORIES: AppointmentCategory[] = [
  {
    id: 'cat-free_consultation',
    name: 'free_consultation',
    label: 'Free Consultation',
    description: 'A short introductory call to discuss your financial needs.',
    duration: 30,
    enabled: true
  },
  {
    id: 'cat-discovery_call',
    name: 'discovery_call',
    label: 'Discovery Call',
    description: 'An in-depth discussion to understand your financial situation.',
    duration: 60,
    enabled: true
  },
  {
    id: 'cat-investment_call',
    name: 'investment_call',
    label: 'Investment Strategy',
    description: 'Review and discuss your investment portfolio and strategies.',
    duration: 60,
    enabled: true
  },
  {
    id: 'cat-tax_planning',
    name: 'tax_planning',
    label: 'Tax Planning',
    description: 'Consultation for tax optimization strategies.',
    duration: 60,
    enabled: true
  },
  {
    id: 'cat-business_entrepreneurship',
    name: 'business_entrepreneurship',
    label: 'Business & Entrepreneurship',
    description: 'Financial advice for business owners and entrepreneurs.',
    duration: 90,
    enabled: true
  }
];
