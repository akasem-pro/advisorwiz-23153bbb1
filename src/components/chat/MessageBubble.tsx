
import React from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ChatMessage } from '../../types/userTypes';

interface MessageBubbleProps {
  message: ChatMessage;
  isSender: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isSender }) => {
  return (
    <div className={cn(
      "flex mb-3",
      isSender ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] px-4 py-2 rounded-lg relative",
        isSender 
          ? "bg-teal-500 text-white rounded-br-none" 
          : "bg-white text-slate-800 rounded-bl-none shadow-sm"
      )}>
        <p className="break-words">{message.content}</p>
        <div className={cn(
          "flex items-center text-xs mt-1",
          isSender ? "text-teal-100" : "text-slate-500"
        )}>
          <span>{format(new Date(message.timestamp), 'h:mm a')}</span>
          {isSender && (
            <span className="ml-1 flex items-center">
              {message.read ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="M18 6 7 17l-5-5" />
                  <path d="m22 10-8 8-4-4" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
