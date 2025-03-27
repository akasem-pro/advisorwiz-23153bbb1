
import React, { ReactNode } from 'react';
import UserContext from './UserContextDefinition';
import { useUserProvider } from '../hooks/user/useUserProvider';
import CallModal from '../components/call/CallModal';

export const UserProviderRefactored = ({ children }: { children: ReactNode }) => {
  // Use our consolidated hook that manages all user state and operations
  const userProviderValue = useUserProvider();
  
  // Destructure just the values needed for the CallModal
  const { activeCall, isCallModalOpen, endCall, closeCallModal } = userProviderValue;

  return (
    <UserContext.Provider value={userProviderValue}>
      {children}
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
    </UserContext.Provider>
  );
};
