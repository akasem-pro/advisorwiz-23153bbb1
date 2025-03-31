
import React from 'react';
import { format } from 'date-fns';
import { Chat, ChatMessage } from '../../types/chatTypes';
import { useUser } from '../../context/UserContext';
import { CallType } from '../../types/callTypes';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { useChatManagement } from '../../hooks/useChatManagement';

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
  
  const currentUserId = userType === 'consumer' 
    ? consumerProfile?.id 
    : advisorProfile?.id;
  const currentUserName = userType === 'consumer' 
    ? consumerProfile?.name 
    : advisorProfile?.name;
  
  const {
    chat,
    otherParticipantName,
    messagesByDate,
    handleSendMessage,
    endOfMessagesRef,
    navigate
  } = useChatManagement({
    chatId,
    chats,
    currentUserId,
    currentUserName,
    markChatAsRead,
    addMessage
  });
  
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
  
  // Handle initiating calls
  const handleCall = (callType: CallType) => {
    if (initiateCall && chat) {
      const otherParticipantId = chat.participants.find(id => id !== currentUserId);
      if (otherParticipantId) {
        initiateCall(otherParticipantId, callType);
      }
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <ChatHeader
        otherParticipantName={otherParticipantName}
        userType={userType}
        onBack={onBack}
        onCallInitiate={handleCall}
      />
      
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
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
