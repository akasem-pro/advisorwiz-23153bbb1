import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Phone, 
  PhoneOff, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  User
} from 'lucide-react';
import { CallSession, CallStatus } from '../../types/callTypes';
import { AdvisorProfile, ConsumerProfile } from '../../types/userTypes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDuration } from '../../utils/formatters';
import { useUser } from '../../context/UserContext';

interface CallInterfaceProps {
  callSession: CallSession | null;
  localUser: AdvisorProfile | ConsumerProfile | null;
  remoteUser: AdvisorProfile | ConsumerProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (callId: string, status: CallStatus) => void;
}

const CallInterface: React.FC<CallInterfaceProps> = ({
  callSession,
  localUser,
  remoteUser,
  isOpen,
  onClose,
  onStatusChange
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  const isVideoCall = callSession?.type === 'video';
  const isConnected = callSession?.status === 'connected';
  const isIncoming = callSession?.recipientId === localUser?.id;
  
  useEffect(() => {
    if (isConnected && !timerRef.current) {
      const startTime = new Date().getTime();
      timerRef.current = setInterval(() => {
        const currentTime = new Date().getTime();
        const duration = Math.floor((currentTime - startTime) / 1000);
        setCallDuration(duration);
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isConnected]);
  
  const endCall = () => {
    if (callSession) {
      onStatusChange(callSession.id, 'completed');
    }
    onClose();
  };
  
  const answerCall = () => {
    if (callSession) {
      onStatusChange(callSession.id, 'connected');
    }
  };
  
  const declineCall = () => {
    if (callSession) {
      onStatusChange(callSession.id, 'declined');
    }
    onClose();
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && endCall()}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center">
            <h3 className="font-semibold text-lg">
              {isConnected ? 'Call in progress' : isIncoming ? 'Incoming Call' : 'Calling...'}
            </h3>
            <p className="text-muted-foreground">
              {remoteUser?.name || 'Unknown User'}
            </p>
            {isConnected && (
              <p className="text-sm text-muted-foreground">
                {formatDuration(callDuration)}
              </p>
            )}
          </div>
          
          <div className={`relative ${isVideoCall && isVideoEnabled ? 'w-full h-64' : 'w-24 h-24'}`}>
            {isVideoCall && isVideoEnabled ? (
              <div className="w-full h-full bg-slate-900 rounded-lg overflow-hidden relative">
                <video
                  ref={remoteVideoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted={false}
                />
                
                <div className="absolute bottom-2 right-2 w-1/4 h-1/4 rounded overflow-hidden border-2 border-background">
                  <video
                    ref={localVideoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                  />
                </div>
              </div>
            ) : (
              <Avatar className="w-24 h-24">
                <AvatarImage src={remoteUser?.profilePicture} />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {remoteUser?.name?.charAt(0) || <User />}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          
          <div className="flex space-x-4 pt-4">
            {isConnected ? (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleMute}
                  className={isMuted ? "bg-amber-100 text-amber-700" : ""}
                >
                  {isMuted ? <MicOff /> : <Mic />}
                </Button>
                
                {isVideoCall && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleVideo}
                    className={!isVideoEnabled ? "bg-amber-100 text-amber-700" : ""}
                  >
                    {isVideoEnabled ? <Video /> : <VideoOff />}
                  </Button>
                )}
                
                <Button 
                  variant="destructive" 
                  size="icon"
                  onClick={endCall}
                >
                  <PhoneOff />
                </Button>
              </>
            ) : isIncoming ? (
              <>
                <Button 
                  variant="destructive" 
                  size="icon"
                  onClick={declineCall}
                >
                  <PhoneOff />
                </Button>
                
                <Button 
                  variant="default" 
                  size="icon"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={answerCall}
                >
                  <Phone />
                </Button>
              </>
            ) : (
              <Button 
                variant="destructive" 
                size="icon"
                onClick={endCall}
              >
                <PhoneOff />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallInterface;
