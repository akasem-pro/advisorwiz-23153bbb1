
import { useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '../../integrations/supabase/client';
import { Appointment, AppointmentStatus } from '../../types/timeTypes';

interface UseAppointmentSubscriptionProps {
  userId: string | undefined;
  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
}

/**
 * Hook to handle real-time subscriptions for appointments
 */
export const useAppointmentSubscription = ({
  userId,
  appointments,
  setAppointments
}: UseAppointmentSubscriptionProps) => {
  
  useEffect(() => {
    if (!userId) return;

    console.log('[Realtime] Setting up appointment subscription for user:', userId);

    // Subscribe to appointment updates
    const appointmentChannel = supabase
      .channel('appointments_channel')
      .on('postgres_changes', {
        event: '*', // Listen to all changes
        schema: 'public',
        table: 'appointments',
        filter: `or(advisor_id.eq.${userId},consumer_id.eq.${userId})`,
      }, (payload) => {
        console.log('[Realtime] Appointment update:', payload);
        
        const { eventType } = payload;
        const payloadNew = payload.new as Record<string, any> | null;
        const payloadOld = payload.old as Record<string, any> | null;
        
        // Handle different event types
        switch (eventType) {
          case 'INSERT': {
            if (!payloadNew) return;
            
            // Create a new appointment object with safe property access
            const scheduledStart = payloadNew.scheduled_start || new Date().toISOString();
            const scheduledEnd = payloadNew.scheduled_end || new Date().toISOString();
            
            const newAppointment: Appointment = {
              id: payloadNew.id || '',
              category: payloadNew.category || '',
              title: payloadNew.title || 'Appointment',
              scheduledStart,
              scheduledEnd,
              advisorId: payloadNew.advisor_id || '',
              consumerId: payloadNew.consumer_id || '',
              status: (payloadNew.status as AppointmentStatus) || 'pending',
              notes: payloadNew.notes || '',
              createdAt: payloadNew.created_at || new Date().toISOString(),
              updatedAt: payloadNew.updated_at || new Date().toISOString(),
              // Add backward compatibility fields
              date: scheduledStart,
              startTime: new Date(scheduledStart).toLocaleTimeString(),
              endTime: new Date(scheduledEnd).toLocaleTimeString(),
              location: payloadNew.meeting_link || '',
            };
            
            // Update state with the new appointment
            const updatedAppointments = [...appointments, newAppointment];
            setAppointments(updatedAppointments);
            
            // Show a notification about the new appointment
            toast('New Appointment', {
              description: `${payloadNew.title || 'Appointment'} scheduled for ${
                payloadNew.scheduled_start 
                  ? new Date(payloadNew.scheduled_start).toLocaleString() 
                  : 'unknown date'
              }`,
              action: {
                label: 'View',
                onClick: () => window.location.href = '/schedule'
              }
            });
            break;
          }
            
          case 'UPDATE': {
            if (!payloadNew) return;
            
            // Update existing appointment in state
            const updatedAppointments = appointments.map(item => {
              if (item.id === payloadNew.id) {
                return {
                  ...item,
                  title: payloadNew.title || item.title,
                  scheduledStart: payloadNew.scheduled_start || item.scheduledStart,
                  scheduledEnd: payloadNew.scheduled_end || item.scheduledEnd,
                  status: (payloadNew.status as AppointmentStatus) || item.status,
                  notes: payloadNew.notes || item.notes,
                  updatedAt: payloadNew.updated_at || new Date().toISOString(),
                  // Update backward compatibility fields
                  date: payloadNew.scheduled_start || item.date,
                  startTime: payloadNew.scheduled_start 
                    ? new Date(payloadNew.scheduled_start).toLocaleTimeString() 
                    : item.startTime,
                  endTime: payloadNew.scheduled_end 
                    ? new Date(payloadNew.scheduled_end).toLocaleTimeString() 
                    : item.endTime,
                  location: payloadNew.meeting_link || item.location,
                };
              }
              return item;
            });
            
            setAppointments(updatedAppointments);
            
            // Show update notification
            toast('Appointment Updated', {
              description: `Status: ${(payloadNew.status || '').toUpperCase()}`,
              action: {
                label: 'View',
                onClick: () => window.location.href = '/schedule'
              }
            });
            break;
          }
            
          case 'DELETE': {
            // Remove deleted appointment from state
            if (payloadOld && payloadOld.id) {
              const filteredAppointments = appointments.filter(item => 
                item.id !== payloadOld.id
              );
              
              setAppointments(filteredAppointments);
              
              // Show cancellation notification
              toast('Appointment Canceled', {
                description: `An appointment has been canceled`,
              });
            }
            break;
          }
        }
      });

    // Start subscription
    appointmentChannel.subscribe();

    // Cleanup function
    return () => {
      console.log('[Realtime] Cleaning up appointment subscription');
      supabase.removeChannel(appointmentChannel);
    };
  }, [userId, appointments, setAppointments]);

  return null;
};
