
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Appointment, AppointmentStatus, useUser } from '../../../context/UserContext';
import AppointmentStatusBadge from './AppointmentStatusBadge';
import AppointmentCommunicationButtons from './AppointmentCommunicationButtons';
import AppointmentInfoDisplay from './AppointmentInfoDisplay';
import { trackEvent } from '../../../utils/tagManager';

interface AppointmentDetailsDialogProps {
  appointment: Appointment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus?: (id: string, status: AppointmentStatus) => void;
}

const AppointmentDetailsDialog: React.FC<AppointmentDetailsDialogProps> = ({
  appointment,
  open,
  onOpenChange,
  onUpdateStatus
}) => {
  const { userType, initiateCall, getLeadByConsumer, updateLeadStatus } = useUser();

  const handleStatusUpdate = (id: string, status: AppointmentStatus) => {
    if (onUpdateStatus) {
      onUpdateStatus(id, status);
      
      // Map the status_change to appropriate appointment event type
      const eventAction = status as 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
      
      // Track appointment status change event using the generic trackEvent function
      trackEvent(`appointment_${eventAction}`, { 
        appointment_id: id,
        previous_status: appointment.status
      });
      
      // If this is an advisor updating appointment status, also update lead status
      if (userType === 'advisor') {
        const lead = getLeadByConsumer(appointment.consumerId);
        
        if (lead) {
          if (status === 'confirmed' && lead.status === 'matched') {
            updateLeadStatus(lead.id, 'appointment_scheduled', 'Appointment confirmed');
          } else if (status === 'completed') {
            updateLeadStatus(lead.id, 'appointment_completed', 'Appointment completed');
          } else if (status === 'cancelled' && 
                    (lead.status === 'appointment_scheduled' || lead.status === 'contacted')) {
            updateLeadStatus(lead.id, 'contacted', 'Appointment cancelled');
          }
        }
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogDescription>
            View and manage your appointment.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-6 flex justify-between items-center">
            <AppointmentStatusBadge status={appointment.status} />
            <AppointmentCommunicationButtons 
              appointment={appointment}
              initiateCall={initiateCall}
              userType={userType}
            />
          </div>
          
          <AppointmentInfoDisplay appointment={appointment} />
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          
          {onUpdateStatus && userType === 'advisor' && appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
            <div className="flex gap-2">
              {appointment.status === 'pending' && (
                <Button 
                  variant="default" 
                  onClick={() => handleStatusUpdate(appointment.id, 'confirmed')}
                >
                  Confirm
                </Button>
              )}
              
              {appointment.status === 'confirmed' && (
                <Button 
                  variant="default" 
                  onClick={() => handleStatusUpdate(appointment.id, 'completed')}
                >
                  Mark Completed
                </Button>
              )}
              
              <Button 
                variant="destructive" 
                onClick={() => handleStatusUpdate(appointment.id, 'cancelled')}
              >
                Cancel
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetailsDialog;
