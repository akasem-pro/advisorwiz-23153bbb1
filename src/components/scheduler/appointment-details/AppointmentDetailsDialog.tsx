
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
  const { userType, initiateCall } = useUser();

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
                  onClick={() => onUpdateStatus(appointment.id, 'confirmed')}
                >
                  Confirm
                </Button>
              )}
              
              {appointment.status === 'confirmed' && (
                <Button 
                  variant="default" 
                  onClick={() => onUpdateStatus(appointment.id, 'completed')}
                >
                  Mark Completed
                </Button>
              )}
              
              <Button 
                variant="destructive" 
                onClick={() => onUpdateStatus(appointment.id, 'cancelled')}
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
