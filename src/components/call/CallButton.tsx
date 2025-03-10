
import React from 'react';
import { Button } from "@/components/ui/button";
import { Phone, Video } from "lucide-react";
import { CallType } from '../../types/callTypes';

interface CallButtonProps {
  onCall: (type: CallType) => void;
  type: CallType;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const CallButton: React.FC<CallButtonProps> = ({ 
  onCall, 
  type, 
  variant = "outline", 
  size = "icon",
  className = ""
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => onCall(type)}
      className={className}
    >
      {type === 'audio' ? <Phone className="h-4 w-4" /> : <Video className="h-4 w-4" />}
    </Button>
  );
};

export default CallButton;
