
import React from 'react';
import { Check, X, Edit, CalendarCheck } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Appointment, AppointmentStatus, useUser } from '../../context/UserContext';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface AppointmentDetailsProps {
  appointment: Appointment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus: (appointmentId: string, status: AppointmentStatus) => void;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  appointment,
  open,
  onOpenChange,
  onUpdateStatus
}) => {
  const { advisorProfile } = useUser();

  const formatAppointmentTime = (start: string, end: string) => {
    const formatTime = (time: string) => {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      const period = hour >= 12 ? 'PM' : 'AM';
      const adjustedHour = hour % 12 || 12;
      return `${adjustedHour}:${minutes} ${period}`;
    };

    return `${formatTime(start)} - ${formatTime(end)}`;
  };

  const getStatusClass = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-700 bg-green-100';
      case 'pending':
        return 'text-amber-700 bg-amber-100';
      case 'cancelled':
        return 'text-red-700 bg-red-100';
      case 'completed':
        return 'text-blue-700 bg-blue-100';
      default:
        return 'text-slate-700 bg-slate-100';
    }
  };

  const getCategoryLabel = (appointment: Appointment) => {
    if (advisorProfile) {
      const category = advisorProfile.appointmentCategories.find(
        cat => cat.id === appointment.categoryId
      );
      return category ? category.label : 'Appointment';
    }
    return 'Appointment';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{appointment.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-2">
            <div className="text-sm font-medium text-slate-500">Date:</div>
            <div>{format(parseISO(appointment.date), 'EEEE, MMMM d, yyyy')}</div>
            
            <div className="text-sm font-medium text-slate-500">Time:</div>
            <div>{formatAppointmentTime(appointment.startTime, appointment.endTime)}</div>
            
            <div className="text-sm font-medium text-slate-500">Category:</div>
            <div>{getCategoryLabel(appointment)}</div>
            
            <div className="text-sm font-medium text-slate-500">Status:</div>
            <div>
              <Badge variant="outline" className={cn(getStatusClass(appointment.status), "capitalize")}>
                {appointment.status}
              </Badge>
            </div>
            
            {appointment.location && (
              <>
                <div className="text-sm font-medium text-slate-500">Location:</div>
                <div>{appointment.location}</div>
              </>
            )}
            
            {appointment.notes && (
              <>
                <div className="text-sm font-medium text-slate-500">Notes:</div>
                <div className="text-sm">{appointment.notes}</div>
              </>
            )}
          </div>
          
          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Update Status</h4>
            <div className="flex flex-wrap gap-2">
              {appointment.status !== 'confirmed' && (
                <Button 
                  variant="outline" 
                  className="bg-green-50 text-green-700 hover:bg-green-100"
                  onClick={() => onUpdateStatus(appointment.id, 'confirmed')}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Confirm
                </Button>
              )}
              
              {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                <Button 
                  variant="outline" 
                  className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                  onClick={() => onUpdateStatus(appointment.id, 'completed')}
                >
                  <CalendarCheck className="h-4 w-4 mr-1" />
                  Mark Completed
                </Button>
              )}
              
              {appointment.status !== 'cancelled' && (
                <Button 
                  variant="outline" 
                  className="bg-red-50 text-red-700 hover:bg-red-100"
                  onClick={() => onUpdateStatus(appointment.id, 'cancelled')}
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
              )}
              
              <Button 
                variant="outline"
                className="bg-slate-50 text-slate-700 hover:bg-slate-100"
                onClick={() => toast({
                  title: "Feature Coming Soon",
                  description: "Appointment editing will be available soon.",
                })}
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetails;
