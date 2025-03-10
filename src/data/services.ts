
import { ServiceCategory } from '../context/UserContext';

// Define service categories with expanded options
export const serviceCategories = [
  { 
    value: 'investment' as ServiceCategory, 
    label: 'Investment Planning & Portfolio Management',
    description: 'Portfolio management, asset allocation, and market analysis'
  },
  { 
    value: 'retirement' as ServiceCategory, 
    label: 'Retirement Planning & Pension Strategies',
    description: 'Retirement planning, pension optimization, and retirement income strategies'
  },
  { 
    value: 'tax' as ServiceCategory, 
    label: 'Tax Optimization & Estate Planning',
    description: 'Tax planning, optimization strategies, and tax implications of investments'
  },
  { 
    value: 'business' as ServiceCategory, 
    label: 'Financial Planning for Business Owners & Entrepreneurs',
    description: 'Business succession planning, business valuation, and key person insurance'
  },
  { 
    value: 'insurance' as ServiceCategory, 
    label: 'Insurance & Risk Management',
    description: 'Life, disability, critical illness, and long-term care insurance needs'
  },
  { 
    value: 'philanthropic' as ServiceCategory, 
    label: 'Philanthropic & Charitable Giving',
    description: 'Charitable giving strategies, donor-advised funds, and foundation setup'
  },
  { 
    value: 'education' as ServiceCategory, 
    label: 'Education Planning',
    description: 'Education savings, RESP optimization, and financial aid planning'
  },
  { 
    value: 'estate' as ServiceCategory, 
    label: 'Estate Planning & Wealth Transfer',
    description: 'Estate planning, wealth transfer, and inheritance tax minimization'
  }
];
