
import React from 'react';
import { format } from 'date-fns';
import { Appointment } from '../../../context/UserContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DailyAppointmentsDialogProps {
  date: Date | null;
  appointments: Appointment[];
  onOpenChange: (open: boolean) => void;
  onAppointmentClick: (appointment: Appointment) => void;
  formatAppointmentTime: (start: string, end: string) => string;
}

const DailyAppointmentsDialog: React.FC<DailyAppointmentsDialogProps> = ({
  date,
  appointments,
  onOpenChange,
  onAppointmentClick,
  formatAppointmentTime
}) => {
  if (!date) return null;

  return (
    <Dialog open={!!date} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Appointments for {format(date, 'MMMM d, yyyy')}</DialogTitle>
          <DialogDescription>
            {appointments.length > 0 
              ? 'Click on an appointment for more details' 
              : 'No appointments scheduled for this day'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 mt-2">
          {appointments.map((appointment) => (
            <div 
              key={appointment.id}
              className={cn(
                "p-3 rounded-lg border cursor-pointer hover:bg-slate-50",
                appointment.status === 'confirmed' && "border-green-200",
                appointment.status === 'pending' && "border-amber-200",
                appointment.status === 'cancelled' && "border-red-200",
                appointment.status === 'completed' && "border-blue-200"
              )}
              onClick={() => onAppointmentClick(appointment)}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{appointment.title}</h3>
                <Badge 
                  variant="outline"
                  className={cn(
                    appointment.status === 'confirmed' && "bg-green-100 text-green-800",
                    appointment.status === 'pending' && "bg-amber-100 text-amber-800",
                    appointment.status === 'cancelled' && "bg-red-100 text-red-800",
                    appointment.status === 'completed' && "bg-blue-100 text-blue-800"
                  )}
                >
                  {appointment.status}
                </Badge>
              </div>
              <div className="text-sm text-slate-500 flex items-center mt-1">
                <Clock className="h-3 w-3 mr-1" />
                {formatAppointmentTime(appointment.startTime, appointment.endTime)}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DailyAppointmentsDialog;
