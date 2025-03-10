
import React from 'react';
import { format } from 'date-fns';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Phone, Video, User } from 'lucide-react';
import { Appointment, AppointmentStatus, useUser } from '../../context/UserContext';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CallType } from '../../types/callTypes';

interface AppointmentDetailsProps {
  appointment: Appointment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus?: (id: string, status: AppointmentStatus) => void;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  appointment,
  open,
  onOpenChange,
  onUpdateStatus
}) => {
  const { userType, initiateCall, consumerProfile, advisorProfile } = useUser();

  // Find consumer and advisor names
  const getConsumerName = () => {
    if (consumerProfile && consumerProfile.id === appointment.consumerId) {
      return consumerProfile.name;
    }
    return "Consumer";
  };

  const getAdvisorName = () => {
    if (advisorProfile && advisorProfile.id === appointment.advisorId) {
      return advisorProfile.name;
    }
    return "Advisor";
  };

  // Handle initiating calls
  const handleCall = (callType: CallType) => {
    if (initiateCall) {
      const recipientId = userType === 'advisor' 
        ? appointment.consumerId 
        : appointment.advisorId;
      
      initiateCall(recipientId, callType);
    }
  };

  const getStatusBadgeColor = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
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
            <Badge className={cn("capitalize", getStatusBadgeColor(appointment.status))}>
              {appointment.status}
            </Badge>
            
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={() => handleCall('audio')}
              >
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Call</span>
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={() => handleCall('video')}
              >
                <Video className="h-4 w-4" />
                <span className="hidden sm:inline">Video</span>
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-slate-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-navy-700" />
              </div>
              <div>
                <h4 className="font-medium">Date</h4>
                <p className="text-sm text-slate-600">
                  {format(new Date(appointment.date), 'MMMM d, yyyy')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-slate-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-navy-700" />
              </div>
              <div>
                <h4 className="font-medium">Time</h4>
                <p className="text-sm text-slate-600">
                  {format(new Date(`${appointment.date}T${appointment.startTime}`), 'h:mm a')} - 
                  {format(new Date(`${appointment.date}T${appointment.endTime}`), 'h:mm a')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-slate-100 p-2 rounded-full">
                <User className="h-5 w-5 text-navy-700" />
              </div>
              <div>
                <h4 className="font-medium">
                  {userType === 'advisor' ? 'Client' : 'Advisor'}
                </h4>
                <p className="text-sm text-slate-600">
                  {userType === 'advisor' ? getConsumerName() : getAdvisorName()}
                </p>
              </div>
            </div>
            
            {appointment.location && (
              <div className="flex items-start gap-3">
                <div className="bg-slate-100 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-navy-700" />
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-sm text-slate-600">
                    {appointment.location}
                  </p>
                </div>
              </div>
            )}
            
            {appointment.notes && (
              <div className="mt-4 p-3 bg-slate-50 rounded-md">
                <h4 className="font-medium mb-1">Notes</h4>
                <p className="text-sm text-slate-600">{appointment.notes}</p>
              </div>
            )}
          </div>
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

export default AppointmentDetails;
