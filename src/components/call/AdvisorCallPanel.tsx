
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Video, BarChart } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useUser } from '../../context/UserContext';
import { CallType } from '../../types/callTypes';
import CallButton from './CallButton';
import CallInterface from './CallInterface';
import CallMetricsDisplay from './CallMetricsDisplay';

interface AdvisorCallPanelProps {
  consumerId: string;
  consumerName: string;
}

const AdvisorCallPanel: React.FC<AdvisorCallPanelProps> = ({ consumerId, consumerName }) => {
  const { 
    advisorProfile, 
    initiateCall, 
    activeCall, 
    updateCallStatus, 
    callMetrics 
  } = useUser();
  
  const [showCallInterface, setShowCallInterface] = useState(false);
  
  // Filter metrics for this specific consumer
  const consumerMetrics = callMetrics.filter(metric => 
    metric.consumerId === consumerId
  );
  
  const handleCall = (type: CallType) => {
    if (advisorProfile && consumerId) {
      const callSession = initiateCall(consumerId, type);
      if (callSession) {
        setShowCallInterface(true);
      }
    }
  };
  
  return (
    <>
      <div className="flex items-center gap-2 mt-4">
        <CallButton 
          onCall={handleCall} 
          type="audio" 
          variant="default"
          size="sm"
          className="flex items-center gap-2"
        >
          <Phone className="h-4 w-4" />
          <span>Audio Call</span>
        </CallButton>
        
        <CallButton 
          onCall={handleCall} 
          type="video" 
          variant="default"
          size="sm"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
        >
          <Video className="h-4 w-4" />
          <span>Video Call</span>
        </CallButton>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>Interaction Metrics</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Interaction Metrics</SheetTitle>
            </SheetHeader>
            
            <div className="py-4">
              {consumerMetrics.length > 0 ? (
                <CallMetricsDisplay metrics={consumerMetrics} />
              ) : (
                <p className="text-muted-foreground">No call data available for this consumer.</p>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Call Interface */}
      {activeCall && (
        <CallInterface
          callSession={activeCall}
          localUser={advisorProfile}
          remoteUser={{ id: consumerId, name: consumerName } as any}
          isOpen={showCallInterface}
          onClose={() => setShowCallInterface(false)}
          onStatusChange={updateCallStatus}
        />
      )}
    </>
  );
};

export default AdvisorCallPanel;
