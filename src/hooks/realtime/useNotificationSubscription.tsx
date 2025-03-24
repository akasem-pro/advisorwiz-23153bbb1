
import { useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '../../integrations/supabase/client';

interface UseNotificationSubscriptionProps {
  userId: string | undefined;
}

/**
 * Hook to handle real-time subscriptions for notifications
 */
export const useNotificationSubscription = ({
  userId
}: UseNotificationSubscriptionProps) => {
  
  useEffect(() => {
    if (!userId) return;

    console.log('[Realtime] Setting up notification subscription for user:', userId);

    // Subscribe to notifications
    const notificationChannel = supabase
      .channel('notifications_channel')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      }, (payload) => {
        console.log('[Realtime] New notification:', payload);
        
        // Make sure notification exists, otherwise use empty object
        const notification = payload.new as Record<string, any> | null || {};
        
        toast(notification.title || 'New Notification', {
          description: notification.message || '',
          action: notification.action_link ? {
            label: 'View',
            onClick: () => window.location.href = notification.action_link
          } : undefined
        });
      });

    // Start subscription
    notificationChannel.subscribe();

    // Cleanup function
    return () => {
      console.log('[Realtime] Cleaning up notification subscription');
      supabase.removeChannel(notificationChannel);
    };
  }, [userId]);

  return null;
};
