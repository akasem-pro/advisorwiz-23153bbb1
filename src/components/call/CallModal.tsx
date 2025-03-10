
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff } from 'lucide-react';
import { CallSession } from '../../types/callTypes';
import { cn } from '@/lib/utils';
import { formatDuration } from '../../utils/formatters';

interface CallModalProps {
  callSession: CallSession | null;
  isOpen: boolean;
  onEnd: () => void;
}

const CallModal: React.FC<CallModalProps> = ({
  callSession,
  isOpen,
  onEnd
}) => {
  const [isMuted, setIsMuted] = React.useState(false);
  const [isVideoOff, setIsVideoOff] = React.useState(false);
  const [callDuration, setCallDuration] = React.useState(0);
  
  // Setup timer for call duration
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isOpen && callSession?.status === 'connected') {
      const startTime = new Date(callSession.startTime).getTime();
      
      interval = setInterval(() => {
        const duration = Math.floor((Date.now() - startTime) / 1000);
        setCallDuration(duration);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen, callSession]);
  
  if (!callSession) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={() => onEnd()}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center pt-6 pb-2">
          <div className="w-20 h-20 bg-navy-100 rounded-full flex items-center justify-center mb-4">
            {callSession.type === 'video' && !isVideoOff ? (
              <Video className="h-10 w-10 text-navy-600" />
            ) : (
              <Phone className="h-10 w-10 text-navy-600" />
            )}
          </div>
          
          <h2 className="text-xl font-semibold mb-1">
            {callSession.status === 'initiated' ? 'Calling...' : 'In Call'}
          </h2>
          
          {callSession.status === 'connected' && (
            <p className="text-slate-500 mb-2">
              {formatDuration(callDuration)}
            </p>
          )}
          
          {callSession.type === 'video' && callSession.status === 'connected' && (
            <div className="relative w-full h-48 bg-slate-200 rounded-lg mb-4 overflow-hidden">
              {!isVideoOff ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-slate-500">Video stream would appear here</p>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-300">
                  <VideoOff className="h-10 w-10 text-slate-500" />
                </div>
              )}
              
              <div className="absolute bottom-4 right-4 w-24 h-24 bg-navy-100 rounded-lg flex items-center justify-center">
                <Phone className="h-8 w-8 text-navy-600" />
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-center space-x-4 py-4">
          {callSession.status === 'connected' && (
            <>
              <Button
                variant="outline"
                className={cn(
                  "rounded-full p-3 h-12 w-12",
                  isMuted && "bg-slate-200"
                )}
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </Button>
              
              {callSession.type === 'video' && (
                <Button
                  variant="outline"
                  className={cn(
                    "rounded-full p-3 h-12 w-12",
                    isVideoOff && "bg-slate-200"
                  )}
                  onClick={() => setIsVideoOff(!isVideoOff)}
                >
                  {isVideoOff ? (
                    <VideoOff className="h-5 w-5" />
                  ) : (
                    <Video className="h-5 w-5" />
                  )}
                </Button>
              )}
            </>
          )}
        </div>
        
        <DialogFooter>
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={onEnd}
          >
            <PhoneOff className="h-4 w-4 mr-2" />
            {callSession.status === 'initiated' ? 'Cancel' : 'End Call'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CallModal;
