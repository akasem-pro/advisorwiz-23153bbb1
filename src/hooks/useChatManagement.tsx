
import { useState, useEffect, useRef, useCallback } from 'react';
import { Chat, ChatMessage } from '../types/chatTypes';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface UseChatManagementProps {
  chatId: string;
  chats: Chat[];
  currentUserId?: string;
  currentUserName?: string;
  markChatAsRead: (chatId: string, userId: string) => void;
  addMessage: (chatId: string, message: Omit<ChatMessage, 'id'>) => void;
}

export const useChatManagement = ({
  chatId,
  chats,
  currentUserId,
  currentUserName,
  markChatAsRead,
  addMessage
}: UseChatManagementProps) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const chat = chats.find(c => c.id === chatId);
  
  // Find the other participant ID and name - compensate for potential missing senderName
  const otherParticipantId = chat?.participants.find(id => id !== currentUserId) || '';
  const otherParticipantName = chat?.messages.find(m => 
    m.senderId === otherParticipantId && m.senderName
  )?.senderName || "Chat Participant";
  
  // Group messages by date for display
  const messagesByDate: { [date: string]: ChatMessage[] } = {};
  
  if (chat) {
    chat.messages.forEach(msg => {
      const date = format(new Date(msg.timestamp), 'yyyy-MM-dd');
      if (!messagesByDate[date]) {
        messagesByDate[date] = [];
      }
      messagesByDate[date].push(msg);
    });
  }
  
  // Mark messages as read when chat window opens
  useEffect(() => {
    if (chatId && currentUserId) {
      markChatAsRead(chatId, currentUserId);
    }
  }, [chatId, currentUserId, markChatAsRead]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages]);
  
  // Handle sending a new message
  const handleSendMessage = useCallback((content: string) => {
    if (!chat || !currentUserId || !currentUserName || !otherParticipantId) return;
    
    addMessage(chatId, {
      senderId: currentUserId,
      recipientId: otherParticipantId,
      content,
      timestamp: new Date().toISOString(),
      read: false,
      senderName: currentUserName,
      recipientName: otherParticipantName
    });
  }, [chatId, currentUserId, currentUserName, otherParticipantId, otherParticipantName, addMessage, chat]);
  
  return {
    chat,
    otherParticipantId,
    otherParticipantName,
    messagesByDate,
    handleSendMessage,
    endOfMessagesRef,
    navigate
  };
};
