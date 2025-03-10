
import React, { useState, useEffect } from 'react';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import { useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ChatList from '../components/chat/ChatList';
import ChatWindow from '../components/chat/ChatWindow';
import { useUser } from '../context/UserContext';
import { MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

const Chat: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(chatId || null);
  const { userType, consumerProfile, advisorProfile } = useUser();
  
  const chatEnabled = userType === 'consumer' 
    ? consumerProfile?.chatEnabled 
    : advisorProfile?.chatEnabled;
  
  const ChatSettings = () => {
    const { userType, consumerProfile, setConsumerProfile, advisorProfile, setAdvisorProfile } = useUser();
    
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
      }
    };
    
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm mb-6">
        <h3 className="text-lg font-medium text-navy-800 mb-3">Chat Settings</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-700">Enable Chat</p>
            <p className="text-sm text-slate-500">
              When disabled, you won't receive new messages
            </p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={userType === 'consumer' 
                ? consumerProfile?.chatEnabled || false
                : advisorProfile?.chatEnabled || false
              }
              onChange={handleToggleChat}
            />
            <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
          </label>
        </div>
      </div>
    );
  };
  
  useEffect(() => {
    const currentChatEnabled = userType === 'consumer' 
      ? consumerProfile?.chatEnabled 
      : advisorProfile?.chatEnabled;
      
    if (userType === null || (userType === 'consumer' && !consumerProfile) || (userType === 'advisor' && !advisorProfile)) {
      return;
    }
  }, [userType, consumerProfile, advisorProfile]);
  
  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-6 max-w-4xl">
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-2">
                Messages
              </h1>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Chat with your financial advisor or clients in real-time
              </p>
            </div>
            
            <ChatSettings />
            
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
                <div className="h-[600px] flex">
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
        </main>
        
        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default Chat;
