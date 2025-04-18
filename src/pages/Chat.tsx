
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import ChatList from '../components/chat/ChatList';
import ChatWindow from '../components/chat/ChatWindow';
import { useUser } from '../context/UserContext';
import { MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Switch } from '../components/ui/switch';

const Chat: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const recipientId = searchParams.get('recipient');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(chatId || null);
  const { userType, consumerProfile, setConsumerProfile, advisorProfile, setAdvisorProfile } = useUser();
  
  const chatEnabled = userType === 'consumer' 
    ? consumerProfile?.chatEnabled 
    : advisorProfile?.chatEnabled;

  const handleToggleChat = () => {
    if (userType === 'consumer' && consumerProfile) {
      const newState = !consumerProfile.chatEnabled;
      setConsumerProfile({
        ...consumerProfile,
        chatEnabled: newState
      });
      toast.success(newState ? "Chat enabled successfully" : "Chat disabled");
    } else if (userType === 'advisor' && advisorProfile) {
      const newState = !advisorProfile.chatEnabled;
      setAdvisorProfile({
        ...advisorProfile,
        chatEnabled: newState
      });
      toast.success(newState ? "Chat enabled successfully" : "Chat disabled");
    } else {
      toast.error("Please complete your profile to use chat");
    }
  };

  useEffect(() => {
    // If a recipient ID is provided in the URL, we should find or create a chat with this user
    if (recipientId) {
      // This would be expanded to actually find or create the chat with the recipient
      console.log("Should initiate chat with recipient:", recipientId);
      // For now, we just set it as selected if it matches any existing chat
    }
  }, [recipientId]);

  useEffect(() => {
    if (!userType || (userType === 'consumer' && !consumerProfile) || (userType === 'advisor' && !advisorProfile)) {
      toast.error("Please complete your profile to use chat");
      return;
    }
  }, [userType, consumerProfile, advisorProfile]);

  // Update selectedChatId when chatId changes from the URL
  useEffect(() => {
    if (chatId) {
      setSelectedChatId(chatId);
    }
  }, [chatId]);

  return (
    <div className="pt-6">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-2">
            Messages
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Chat with your financial advisor or clients in real-time
          </p>
        </div>
        
        <div className="glass-card rounded-2xl p-4 bg-white shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-navy-800 mb-1">Chat Settings</h3>
              <p className="text-sm text-slate-500">
                When disabled, you won't receive new messages
              </p>
            </div>
            <Switch 
              checked={chatEnabled || false}
              onCheckedChange={handleToggleChat}
              className="data-[state=checked]:bg-teal-600"
            />
          </div>
        </div>
        
        {!chatEnabled ? (
          <div className="glass-card rounded-2xl p-10 text-center">
            <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-navy-900 mb-2">
              Chat is Disabled
            </h3>
            <p className="text-slate-600 mb-6">
              Enable chat from the settings above to connect with others.
            </p>
          </div>
        ) : (
          <div className="glass-card rounded-2xl overflow-hidden shadow-lg">
            <div className="h-[600px] flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 border-r md:block bg-white">
                {!selectedChatId && (
                  <ChatList onSelectChat={(id) => setSelectedChatId(id)} />
                )}
              </div>
              
              <div className="w-full md:w-2/3 flex-1 bg-slate-50">
                {selectedChatId ? (
                  <ChatWindow 
                    chatId={selectedChatId} 
                    onBack={() => setSelectedChatId(null)} 
                  />
                ) : (
                  <div className="hidden md:flex flex-col items-center justify-center h-full text-center p-4">
                    <div className="text-slate-400 mb-3">
                      <MessageCircle size={48} />
                    </div>
                    <h3 className="text-lg font-medium text-slate-700">Select a conversation</h3>
                    <p className="text-slate-500 text-sm mt-1">Choose a chat from the list to start messaging</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
