
import React from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface OnlineStatusSectionProps {
  onlineStatus: 'online' | 'offline' | 'away';
  handleOnlineStatusChange: (status: 'online' | 'offline' | 'away') => void;
}

const OnlineStatusSection: React.FC<OnlineStatusSectionProps> = ({
  onlineStatus,
  handleOnlineStatusChange
}) => {
  return (
    <div>
      <Label>Online Status</Label>
      <div className="flex items-center space-x-4 mt-2">
        <Button
          variant={onlineStatus === 'online' ? 'default' : 'outline'}
          onClick={() => handleOnlineStatusChange('online')}
        >
          Online
        </Button>
        <Button
          variant={onlineStatus === 'away' ? 'default' : 'outline'}
          onClick={() => handleOnlineStatusChange('away')}
        >
          Away
        </Button>
        <Button
          variant={onlineStatus === 'offline' ? 'default' : 'outline'}
          onClick={() => handleOnlineStatusChange('offline')}
        >
          Offline
        </Button>
      </div>
    </div>
  );
};

export default OnlineStatusSection;
