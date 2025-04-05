
import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';

interface ActionButtonsProps {
  advisorName: string;
  selectedSlot: string | null;
  onChatClick: () => void;
  onBookingClick: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  advisorName,
  selectedSlot,
  onChatClick,
  onBookingClick
}) => {
  return (
    <div className="flex justify-between">
      <button
        type="button"
        onClick={onChatClick}
        className="btn-outline inline-flex items-center"
      >
        <MessageCircle className="mr-2 w-4 h-4" />
        Message {advisorName}
      </button>

      {selectedSlot && (
        <button
          type="button"
          onClick={onBookingClick}
          className="btn-primary inline-flex items-center"
        >
          Book Consultation
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
