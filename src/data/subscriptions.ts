
import { SubscriptionPlan } from '../types/advisorTypes';

// Define subscription plan options
export const subscriptionPlans: SubscriptionPlan[] = [
  { 
    id: 'basic', 
    name: 'Basic Plan', 
    price: 49, 
    features: [
      'Profile listing',
      'Client inquiries',
      'Standard support',
      'Basic match algorithm'
    ] 
  },
  { 
    id: 'professional', 
    name: 'Professional Plan', 
    price: 99, 
    features: [
      'Priority listing in search results',
      'Client insights dashboard',
      'Analytics dashboard',
      'Advanced match algorithm',
      'Priority customer support'
    ] 
  },
  { 
    id: 'premium', 
    name: 'Premium Plan', 
    price: 199, 
    features: [
      'Featured advisor status',
      'Unlimited leads',
      'Marketing tools & resources',
      'VIP access to events',
      'Premium match algorithm',
      'Dedicated account manager',
      'Custom profile branding'
    ] 
  }
];
