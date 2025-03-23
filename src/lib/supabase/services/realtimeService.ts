
import { supabase } from '../../../integrations/supabase/client';

// Subscription utilities
export const subscribeToAppointments = (userId: string, callback: (payload: any) => void) => {
  return supabase
    .channel('appointments')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'appointments',
      filter: `or(advisor_id.eq.${userId},consumer_id.eq.${userId})`,
    }, callback)
    .subscribe();
};
