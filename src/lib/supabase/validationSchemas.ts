
import { z } from 'zod';

// Basic schemas for validation
export const profileSchema = z.object({
  id: z.string().uuid(),
  first_name: z.string().min(1, 'First name is required').max(100),
  last_name: z.string().min(1, 'Last name is required').max(100),
  avatar_url: z.string().url().optional().nullable(),
  email: z.string().email('Invalid email address').optional().nullable(),
  phone: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  country: z.string().default('US'),
  user_type: z.enum(['consumer', 'advisor', 'firm_admin', 'admin']).optional().nullable(),
  online_status: z.enum(['online', 'away', 'offline']).default('offline'),
  show_online_status: z.boolean().default(true),
  chat_enabled: z.boolean().default(true)
});

export const advisorProfileSchema = z.object({
  id: z.string().uuid(),
  is_accredited: z.boolean().default(false),
  organization: z.string().optional().nullable(),
  website: z.string().url().optional().nullable(),
  languages: z.array(z.string()).default([]),
  expertise: z.array(z.string()).default([]),
  hourly_rate: z.number().min(0).optional().nullable(),
  portfolio_fee: z.number().min(0).max(100).optional().nullable(),
  assets_under_management: z.number().min(0).optional().nullable(),
  years_of_experience: z.number().min(0).optional().nullable(),
  biography: z.string().optional().nullable(),
  certifications: z.array(z.string()).default([])
});

export const consumerProfileSchema = z.object({
  id: z.string().uuid(),
  age: z.number().min(18).max(120).optional().nullable(),
  investable_assets: z.number().min(0).optional().nullable(),
  risk_tolerance: z.enum(['low', 'medium', 'high']).default('medium'),
  service_needs: z.array(z.string()).default([]),
  investment_amount: z.number().min(0).optional().nullable(),
  preferred_communication: z.array(z.string()).default([]),
  preferred_language: z.array(z.string()).default([]),
  start_timeline: z.enum(['immediately', 'next_3_months', 'next_6_months', 'not_sure']).default('not_sure'),
  financial_goals: z.array(z.string()).default([]),
  income_bracket: z.string().optional().nullable(),
  preferred_advisor_specialties: z.array(z.string()).default([])
});

export const appointmentSchema = z.object({
  id: z.string().uuid().optional(),
  advisor_id: z.string().uuid(),
  consumer_id: z.string().uuid(),
  scheduled_start: z.string().datetime(),
  scheduled_end: z.string().datetime(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional().nullable(),
  meeting_link: z.string().url().optional().nullable(),
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']).default('pending'),
  notes: z.string().optional().nullable()
});

export const chatMessageSchema = z.object({
  sender_id: z.string().uuid(),
  recipient_id: z.string().uuid(),
  content: z.string().min(1, 'Message cannot be empty')
});

export const matchPreferencesSchema = z.object({
  prioritizeLanguage: z.boolean().default(true),
  prioritizeAvailability: z.boolean().default(true),
  prioritizeExpertise: z.boolean().default(true),
  prioritizeLocation: z.boolean().default(false),
  minimumMatchScore: z.number().min(0).max(100).default(40),
  considerInteractionData: z.boolean().default(true),
  weightFactors: z.record(z.string(), z.number().min(0).max(100)).optional()
});

// Combine schemas for complete validation
export const fullAdvisorProfileSchema = profileSchema.merge(advisorProfileSchema);
export const fullConsumerProfileSchema = profileSchema.merge(consumerProfileSchema);
