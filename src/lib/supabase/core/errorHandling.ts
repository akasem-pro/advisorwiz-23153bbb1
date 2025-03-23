
import { ERROR_MESSAGES } from './types';

// Error handling utility
export const handleSupabaseError = (error: any, customMessage?: string): string => {
  console.error('Supabase operation error:', error);
  
  // Determine the type of error
  let errorMessage = customMessage || ERROR_MESSAGES.GENERIC;
  
  if (!navigator.onLine) {
    errorMessage = ERROR_MESSAGES.NETWORK;
  } else if (error?.code === 'PGRST301' || error?.code === '42501') {
    errorMessage = ERROR_MESSAGES.PERMISSION;
  } else if (error?.code === '404' || error?.message?.includes('not found')) {
    errorMessage = ERROR_MESSAGES.NOT_FOUND;
  } else if (error?.code === '23514' || error?.message?.includes('validation')) {
    errorMessage = ERROR_MESSAGES.VALIDATION;
  } else if (error?.message?.includes('auth') || error?.message?.includes('JWT')) {
    errorMessage = ERROR_MESSAGES.AUTH;
  }
  
  return errorMessage;
};

// Data validation utility
export const validateData = <T>(data: T, schema: any): { valid: boolean; errors?: string[] } => {
  try {
    if (!schema) return { valid: true };
    
    const result = schema.safeParse(data);
    if (!result.success) {
      return { 
        valid: false, 
        errors: result.error.errors.map((e: any) => `${e.path.join('.')}: ${e.message}`) 
      };
    }
    
    return { valid: true };
  } catch (error) {
    console.error('Validation error:', error);
    return { valid: false, errors: ['Schema validation failed'] };
  }
};
