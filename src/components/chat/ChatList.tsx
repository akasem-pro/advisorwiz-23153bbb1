
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { useUser } from '../../context/UserContext';
import { Chat } from '../../types/chatTypes';
import { cn } from '@/lib/utils';

interface ChatListProps {
  onSelectChat?: (chatId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ onSelectChat }) => {
  const { chats, userType, consumerProfile, advisorProfile } = useUser();
  
  const currentUserId = userType === 'consumer' 
    ? consumerProfile?.id 
    : advisorProfile?.id;
  
  if (!currentUserId) return null;
  
  // Sort chats by last updated timestamp
  const sortedChats = [...chats].sort((a, b) => 
    new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  );
  
  if (sortedChats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-4">
        <div className="text-slate-400 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
            <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-700">No conversations yet</h3>
        <p className="text-slate-500 text-sm mt-1">Your messages will appear here</p>
      </div>
    );
  }
  
  return (
    <div className="divide-y divide-slate-200">
      {sortedChats.map((chat) => {
        // Find the other participant
        const otherParticipantId = chat.participants.find(id => id !== currentUserId);
        
        // Get the last message
        const lastMessage = chat.messages[chat.messages.length - 1];
        
        // Check if there are unread messages
        const unreadCount = chat.messages.filter(msg => 
          msg.recipientId === currentUserId && !msg.read
        ).length;
        
        // Find participant name
        let participantName = "Unknown";
        if (userType === 'consumer' && otherParticipantId) {
          const advisor = chats.find(c => 
            c.id === chat.id
          )?.messages.find(m => 
            m.senderId === otherParticipantId
          )?.senderName;
          if (advisor) participantName = advisor;
        } else if (userType === 'advisor' && otherParticipantId) {
          const consumer = chats.find(c => 
            c.id === chat.id
          )?.messages.find(m => 
            m.senderId === otherParticipantId
          )?.senderName;
          if (consumer) participantName = consumer;
        }
        
        return (
          <div 
            key={chat.id}
            className={cn(
              "p-4 cursor-pointer hover:bg-slate-50 transition-colors",
              (onSelectChat ? "cursor-pointer" : "")
            )}
            onClick={() => onSelectChat && onSelectChat(chat.id)}
          >
            {onSelectChat ? (
              <div>
                <ChatItem 
                  chat={chat} 
                  participantName={participantName} 
                  lastMessage={lastMessage?.content || "No messages"}
                  unreadCount={unreadCount}
                  lastUpdated={chat.lastUpdated}
                />
              </div>
            ) : (
              <Link to={`/chat/${chat.id}`}>
                <ChatItem 
                  chat={chat} 
                  participantName={participantName} 
                  lastMessage={lastMessage?.content || "No messages"}
                  unreadCount={unreadCount}
                  lastUpdated={chat.lastUpdated}
                />
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

interface ChatItemProps {
  chat: Chat;
  participantName: string;
  lastMessage: string;
  unreadCount: number;
  lastUpdated: string;
}

const ChatItem: React.FC<ChatItemProps> = ({ 
  chat, 
  participantName, 
  lastMessage, 
  unreadCount,
  lastUpdated
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="h-12 w-12 bg-slate-300 rounded-full mr-3 flex items-center justify-center text-white font-medium text-lg">
          {participantName[0]?.toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className={cn(
              "font-medium",
              unreadCount > 0 ? "text-navy-800" : "text-slate-700"
            )}>
              {participantName}
            </h3>
            <span className="text-xs text-slate-500">
              {formatDistanceToNow(new Date(lastUpdated), { addSuffix: true })}
            </span>
          </div>
          <p className={cn(
            "text-sm truncate max-w-[220px]",
            unreadCount > 0 ? "text-slate-800 font-medium" : "text-slate-500"
          )}>
            {lastMessage}
          </p>
        </div>
      </div>
      {unreadCount > 0 && (
        <div className="bg-teal-500 text-white rounded-full h-5 min-w-5 flex items-center justify-center text-xs font-medium px-1 ml-2">
          {unreadCount}
        </div>
      )}
    </div>
  );
};

export default ChatList;
