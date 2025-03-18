
import { Home, User, MessageCircle, Calendar, Settings, Search, BarChart3, Users } from 'lucide-react';
import { UserType } from '../../context/UserContext';

export interface NavigationItem {
  label: string;
  icon: React.ElementType;
  link: string;
}

export const getDashboardLink = (userType: UserType): string => {
  if (userType === 'consumer') return '/consumer-dashboard';
  if (userType === 'advisor') return '/advisor-dashboard';
  if (userType === 'firm_admin') return '/firm-dashboard';
  return '/';
};

export const getNavigationItems = (userType: UserType): NavigationItem[] => {
  const commonItems = [
    { label: 'Dashboard', icon: Home, link: getDashboardLink(userType) },
    { label: 'Messages', icon: MessageCircle, link: '/chat' },
    { label: 'Schedule', icon: Calendar, link: '/schedule' },
    { label: 'Settings', icon: Settings, link: '/settings' },
  ];

  if (userType === 'consumer') {
    return [
      ...commonItems,
      { label: 'Find Advisors', icon: Search, link: '/matches' },
      { label: 'My Profile', icon: User, link: '/consumer-profile' },
    ];
  } else if (userType === 'advisor') {
    return [
      ...commonItems,
      { label: 'Leads', icon: Users, link: '/leads' },
      { label: 'Performance', icon: BarChart3, link: '/analytics' },
      { label: 'My Profile', icon: User, link: '/advisor-profile' },
    ];
  } else if (userType === 'firm_admin') {
    return [
      ...commonItems,
      { label: 'Team', icon: Users, link: '/team' },
      { label: 'Analytics', icon: BarChart3, link: '/analytics' },
      { label: 'Firm Profile', icon: User, link: '/firm-profile' },
    ];
  }

  return commonItems;
};
