
import React from 'react';
import { ArrowLeft, Phone, Video } from 'lucide-react';
import { Button } from '../ui/button';
import { CallType } from '../../types/callTypes';
import { useNavigate } from 'react-router-dom';

interface ChatHeaderProps {
  otherParticipantName: string;
  userType: string | null;
  onBack?: () => void;
  onCallInitiate: (callType: CallType) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  otherParticipantName,
  userType,
  onBack,
  onCallInitiate
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center p-4 border-b bg-white sticky top-0 z-10">
      <button 
        onClick={onBack || (() => navigate('/chat'))}
        className="mr-3 text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={20} />
      </button>
      <div className="h-10 w-10 bg-slate-300 rounded-full mr-3 flex items-center justify-center text-white font-medium">
        {otherParticipantName[0]?.toUpperCase()}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-navy-800">{otherParticipantName}</h3>
        <p className="text-xs text-slate-500">
          {userType === 'consumer' ? 'Financial Advisor' : 'Client'}
        </p>
      </div>
      <div className="flex gap-2">
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center gap-1" 
          onClick={() => onCallInitiate('audio')}
        >
          <Phone className="h-4 w-4" />
          <span className="hidden sm:inline">Call</span>
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center gap-1" 
          onClick={() => onCallInitiate('video')}
        >
          <Video className="h-4 w-4" />
          <span className="hidden sm:inline">Video</span>
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
