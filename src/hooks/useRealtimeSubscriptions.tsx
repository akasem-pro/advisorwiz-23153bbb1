
import { useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { useUser } from '../context/UserContext';
import { useChatSubscription } from './realtime/useChatSubscription';
import { useAppointmentSubscription } from './realtime/useAppointmentSubscription';
import { useNotificationSubscription } from './realtime/useNotificationSubscription';

/**
 * Hook that handles all real-time subscriptions for the application
 */
export const useRealtimeSubscriptions = () => {
  const { 
    userType, 
    consumerProfile, 
    advisorProfile, 
    chats, 
    setAppointments, 
    appointments,
    addMessage
  } = useUser();

  // Get the current user ID based on profile type
  const userId = userType === 'consumer' 
    ? consumerProfile?.id 
    : advisorProfile?.id;

  // Use individual subscription hooks
  useChatSubscription({
    userId,
    chats,
    addMessage
  });

  useAppointmentSubscription({
    userId,
    appointments,
    setAppointments
  });

  useNotificationSubscription({
    userId
  });

  useEffect(() => {
    console.log('[Realtime] Subscription setup in useRealtimeSubscriptions');
    return () => {
      console.log('[Realtime] Main realtime subscriptions cleanup');
    };
  }, [userId]);

  return null; // This hook doesn't return anything
};
