
import React from 'react';
import PageSEO from '../components/seo/PageSEO';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const Messages: React.FC = () => {
  const navigate = useNavigate();
  console.log("Messages page rendering");
  
  return (
    <div className="container max-w-5xl px-4 py-12 mx-auto">
      <PageSEO
        title="Messages | AdvisorWiz"
        description="Manage your communication with financial advisors and clients."
      />
      
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Messages</h1>
      <p className="text-lg mb-8">
        Manage your communications with financial advisors and clients in one place.
      </p>
      
      <div className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-6 text-center">
        <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <MessageCircle className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold mb-3">Your Inbox</h3>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          You have no unread messages at this time.
        </p>
        <button
          onClick={() => navigate('/chat')}
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
        >
          Go to Chat Interface
        </button>
      </div>
    </div>
  );
};

export default Messages;
