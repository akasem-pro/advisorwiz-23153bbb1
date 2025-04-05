
import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, HelpCircle, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useToast } from '@/hooks/use-toast';

interface SupportPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportPanel: React.FC<SupportPanelProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Support request sent',
      description: 'Our team will get back to you shortly',
      variant: 'default'
    });
    setEmail('');
    setMessage('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-xl font-serif font-bold">How Can We Help?</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex items-center justify-center py-6 h-auto">
                <Phone className="h-5 w-5 mr-2 text-teal-600" />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Call Us</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Live Support</span>
                </div>
              </Button>
              <Button variant="outline" className="flex items-center justify-center py-6 h-auto">
                <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Live Chat</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Quick Answers</span>
                </div>
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-navy-800 px-2 text-slate-500 dark:text-slate-400">
                  or send a message
                </span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-navy-600 rounded-md dark:bg-navy-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-navy-600 rounded-md dark:bg-navy-700 dark:text-white"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                <Mail className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
            
            <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2">
              <p>Our support team is available 24/7 to assist you</p>
              <a href="/faq" className="text-teal-600 dark:text-teal-400 flex items-center justify-center mt-2">
                <HelpCircle className="h-3 w-3 mr-1" />
                View FAQ
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportPanel;
