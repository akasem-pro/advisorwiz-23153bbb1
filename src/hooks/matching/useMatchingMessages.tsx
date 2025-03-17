
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useUser, Chat } from '../../context/UserContext';

export const useMatchingMessages = () => {
  const { userType, consumerProfile, advisorProfile, chats, setChats } = useUser();
  const navigate = useNavigate();

  const handleMessage = (profileId: string) => {
    const currentUserId = userType === 'consumer' 
      ? consumerProfile?.id 
      : advisorProfile?.id;
    
    if (!currentUserId) {
      toast.error("You need to be logged in to send messages");
      return;
    }
    
    // Find the profile for the other participant
    const getOtherProfile = () => {
      if (userType === 'consumer') {
        return import('../../data/mockUsers').then(module => 
          module.mockAdvisors.find((a: any) => a.id === profileId)
        );
      } else {
        return import('../../data/mockUsers').then(module => 
          module.mockConsumers.find((c: any) => c.id === profileId)
        );
      }
    };
    
    getOtherProfile().then(otherProfile => {
      if (!otherProfile) {
        toast.error("Could not find the selected profile");
        return;
      }
      
      if (!otherProfile.chatEnabled) {
        toast.error("Chat is not available for this user");
        return;
      }
      
      let existingChat = chats.find(chat => 
        chat.participants.includes(currentUserId) && 
        chat.participants.includes(profileId)
      );
      
      if (!existingChat) {
        const newChat: Chat = {
          id: `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          participants: [currentUserId, profileId],
          messages: [],
          lastUpdated: new Date().toISOString()
        };
        
        const updatedChats = [...chats, newChat];
        setChats(updatedChats);
        existingChat = newChat;
      }
      
      navigate(`/chat/${existingChat.id}`);
    });
  };

  return { handleMessage };
};
