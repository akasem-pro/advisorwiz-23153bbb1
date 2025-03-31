
import React, { ReactNode } from 'react';
import UserContext from './UserContextDefinition';
import { useUserProvider } from '../hooks/user/useUserProvider';
import CallModal from '../components/call/CallModal';
import { ChatMessage } from '../types/chatTypes';

export const UserProviderRefactored = ({ children }: { children: ReactNode }) => {
  // Use our consolidated hook that manages all user state and operations
  const userProviderValue = useUserProvider();
  
  // Destructure just the values needed for the CallModal
  const { activeCall, isCallModalOpen, endCall, closeCallModal } = userProviderValue;

  // Create a properly typed context value by wrapping addMessage to match the expected signature
  const contextValue = {
    ...userProviderValue,
    // Adapt the addMessage function to match the expected type in UserContextDefinition
    addMessage: (chatId: string, message: Omit<ChatMessage, "id">) => {
      // Extract required fields from the message object to call the original function
      userProviderValue.addMessage(
        chatId, 
        message.senderId, 
        message.content || ""
      );
    }
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
      {activeCall && (
        <CallModal 
          callSession={activeCall} 
          isOpen={isCallModalOpen}
          onEnd={() => {
            if (activeCall) {
              endCall(activeCall.id);
            }
            closeCallModal();
          }}
        />
      )}
    </UserContext.Provider>
  );
};
