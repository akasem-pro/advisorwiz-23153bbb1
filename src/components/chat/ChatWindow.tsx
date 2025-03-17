
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Send, ArrowLeft, Clock, Phone, Video } from 'lucide-react';
import { Chat, ChatMessage, useUser } from '../../context/UserContext';
import { cn } from '@/lib/utils';
import { CallType } from '../../types/callTypes';
import { Button } from '../ui/button';

interface ChatWindowProps {
  chatId: string;
  onBack?: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatId, onBack }) => {
  const { 
    chats, 
    addMessage, 
    markChatAsRead,
    userType, 
    consumerProfile, 
    advisorProfile,
    initiateCall 
  } = useUser();
  const [message, setMessage] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const chat = chats.find(c => c.id === chatId);
  const currentUserId = userType === 'consumer' 
    ? consumerProfile?.id 
    : advisorProfile?.id;
  const currentUserName = userType === 'consumer' 
    ? consumerProfile?.name 
    : advisorProfile?.name;
  
  if (!chat || !currentUserId || !currentUserName) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-slate-500">Chat not found</p>
        <button 
          className="mt-4 text-teal-600 font-medium"
          onClick={() => navigate('/chat')}
        >
          Back to Chats
        </button>
      </div>
    );
  }
  
  // Find the other participant ID
  const otherParticipantId = chat.participants.find(id => id !== currentUserId) || '';
  
  // Find the other participant name from messages
  const otherParticipantName = chat.messages.find(m => 
    m.senderId === otherParticipantId
  )?.senderName || "Chat Participant";
  
  // Mark messages as read when chat window opens
  useEffect(() => {
    markChatAsRead(chatId, currentUserId);
  }, [chatId, currentUserId, markChatAsRead]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat.messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    addMessage(chatId, {
      senderId: currentUserId,
      senderName: currentUserName,
      recipientId: otherParticipantId,
      content: message,
      timestamp: new Date().toISOString(),
      read: false
    });
    
    setMessage('');
  };

  // Handle initiating calls
  const handleCall = (callType: CallType) => {
    if (initiateCall) {
      initiateCall(otherParticipantId, callType);
    }
  };
  
  // Group messages by date
  const messagesByDate: { [date: string]: ChatMessage[] } = {};
  
  chat.messages.forEach(msg => {
    const date = format(new Date(msg.timestamp), 'yyyy-MM-dd');
    if (!messagesByDate[date]) {
      messagesByDate[date] = [];
    }
    messagesByDate[date].push(msg);
  });
  
  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
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
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
        {Object.keys(messagesByDate).map(date => (
          <div key={date}>
            <div className="flex justify-center my-4">
              <span className="bg-slate-200 text-slate-600 text-xs px-2 py-1 rounded-full">
                {format(new Date(date), 'MMMM d, yyyy')}
              </span>
            </div>
            
            {messagesByDate[date].map((msg) => (
              <MessageBubble 
                key={msg.id} 
                message={msg} 
                isSender={msg.senderId === currentUserId} 
              />
            ))}
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>
      
      {/* Message input */}
      <form onSubmit={handleSendMessage} className="p-3 bg-white border-t flex items-end">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-slate-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
        <button 
          type="submit"
          disabled={!message.trim()}
          className={cn(
            "ml-2 rounded-full p-2",
            message.trim() ? "bg-teal-500 text-white" : "bg-slate-200 text-slate-400"
          )}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

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

export default ChatWindow;
