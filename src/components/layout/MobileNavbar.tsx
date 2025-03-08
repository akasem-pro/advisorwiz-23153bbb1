
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Search, MessageCircle, Calendar, Home } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { cn } from '@/lib/utils';

const MobileNavbar: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, userType, chats, consumerProfile, advisorProfile } = useUser();

  if (!isAuthenticated) return null;

  // Check if there are unread messages
  const hasUnreadMessages = chats.some(chat => {
    const currentUserId = userType === 'consumer' 
      ? consumerProfile?.id 
      : advisorProfile?.id;
    
    return chat.messages.some(msg => 
      msg.recipientId === currentUserId && !msg.read
    );
  });

  const navItems = [
    {
      icon: Home,
      label: 'Home',
      path: '/',
    },
    {
      icon: Search,
      label: 'Matches',
      path: '/matches',
    },
    {
      icon: MessageCircle,
      label: 'Chat',
      path: '/chat',
      badge: hasUnreadMessages
    },
    {
      icon: Calendar,
      label: 'Schedule',
      path: '/schedule',
    },
    {
      icon: User,
      label: 'Profile',
      path: userType === 'consumer' ? '/consumer-profile' : '/advisor-profile',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 h-16 flex items-center justify-around z-50">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full text-xs relative",
            location.pathname === item.path || (location.pathname.startsWith('/chat/') && item.path === '/chat')
              ? "text-teal-600" 
              : "text-slate-500"
          )}
        >
          <item.icon className="w-6 h-6 mb-1" />
          <span>{item.label}</span>
          {item.badge && (
            <span className="absolute top-1 right-6 h-2 w-2 bg-red-500 rounded-full"></span>
          )}
        </Link>
      ))}
    </nav>
  );
};

export default MobileNavbar;
