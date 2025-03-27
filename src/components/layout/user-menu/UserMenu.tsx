
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../features/auth/context/AuthProvider';
import UserMenuTrigger from './UserMenuTrigger';
import UserMenuContent from './UserMenuContent';

interface UserMenuProps {
  getUserName: () => string;
  getInitials: () => string;
  getProfileImage: () => string;
}

const UserMenu: React.FC<UserMenuProps> = ({ 
  getUserName, 
  getInitials, 
  getProfileImage 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const profileImage = getProfileImage();
  const userName = getUserName();
  const initials = getInitials();
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative" ref={menuRef}>
      <UserMenuTrigger 
        isOpen={isOpen}
        onClick={toggleMenu}
        userName={userName}
        profileImage={profileImage}
        initials={initials}
      />
      
      {isOpen && (
        <UserMenuContent 
          userName={userName}
          onClose={() => setIsOpen(false)}
          onSignOut={signOut}
        />
      )}
    </div>
  );
};

export default UserMenu;
