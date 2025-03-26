
import React, { useState } from 'react';
import { MessageCircle, PhoneCall, X, HelpCircle } from 'lucide-react';
import SupportPanel from './SupportPanel';

export const FloatingSupportButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [supportPanelOpen, setSupportPanelOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openSupportPanel = () => {
    setSupportPanelOpen(true);
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2">
        {isOpen && (
          <div className="flex flex-col space-y-2 items-end">
            <button
              onClick={openSupportPanel}
              className="flex items-center justify-center bg-white dark:bg-navy-800 text-teal-600 dark:text-teal-400 p-3 rounded-full shadow-lg hover:bg-teal-50 dark:hover:bg-navy-700 transition-all"
              aria-label="Chat with support"
            >
              <MessageCircle className="h-6 w-6" />
            </button>
            <a
              href="tel:+18005551234"
              className="flex items-center justify-center bg-white dark:bg-navy-800 text-blue-600 dark:text-blue-400 p-3 rounded-full shadow-lg hover:bg-blue-50 dark:hover:bg-navy-700 transition-all"
              aria-label="Call support"
            >
              <PhoneCall className="h-6 w-6" />
            </a>
          </div>
        )}
        
        <button
          onClick={toggleMenu}
          className={`flex items-center justify-center p-4 rounded-full shadow-lg transition-all ${
            isOpen 
              ? 'bg-slate-700 text-white hover:bg-slate-800 dark:bg-slate-200 dark:text-navy-900 dark:hover:bg-white' 
              : 'bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600'
          }`}
          aria-label={isOpen ? 'Close support menu' : 'Open support menu'}
        >
          {isOpen ? <X className="h-6 w-6" /> : <HelpCircle className="h-6 w-6" />}
        </button>
      </div>
      
      <SupportPanel isOpen={supportPanelOpen} onClose={() => setSupportPanelOpen(false)} />
    </>
  );
};

export default FloatingSupportButton;
