
import React from 'react';
import { Button } from "@/components/ui/button";
import { CallType } from '../../types/callTypes';

interface CallButtonProps {
  onCall: (type: CallType) => void;
  type: CallType;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  children?: React.ReactNode;
}

const CallButton: React.FC<CallButtonProps> = ({ 
  onCall, 
  type, 
  variant = "outline", 
  size = "icon",
  className = "",
  children
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => onCall(type)}
      className={className}
    >
      {children}
    </Button>
  );
};

export default CallButton;

