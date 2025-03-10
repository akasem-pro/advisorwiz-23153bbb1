
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Video } from 'lucide-react';
import { Appointment } from '../../../context/UserContext';
import { CallType } from '../../../types/callTypes';
import { UserType } from '../../../types/userTypes';

interface AppointmentCommunicationButtonsProps {
  appointment: Appointment;
  initiateCall?: (recipientId: string, callType: CallType) => void;
  userType: UserType;
}

const AppointmentCommunicationButtons: React.FC<AppointmentCommunicationButtonsProps> = ({
  appointment,
  initiateCall,
  userType
}) => {
  // Handle initiating calls
  const handleCall = (callType: CallType) => {
    if (initiateCall) {
      const recipientId = userType === 'advisor' 
        ? appointment.consumerId 
        : appointment.advisorId;
      
      initiateCall(recipientId, callType);
    }
  };

  return (
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
  );
};

export default AppointmentCommunicationButtons;
