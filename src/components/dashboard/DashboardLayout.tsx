
import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight,
  Home, 
  User, 
  MessageCircle, 
  Calendar, 
  Settings, 
  LogOut,
  BellRing,
  Search,
  BarChart3,
  Users,
  HelpCircle
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { Button } from '../ui/button';
import AnimatedRoute from '../ui/AnimatedRoute';
import Logo from '../layout/Logo';
import { useMobile } from '../../hooks/use-mobile';
import MobileNavbar from '../layout/MobileNavbar';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title, 
  subtitle 
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { userType, isAuthenticated, setIsAuthenticated, setUserType } = useUser();
  const navigate = useNavigate();
  const isMobile = useMobile();

  if (!isAuthenticated) {
    navigate('/sign-in');
    return null;
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    navigate('/');
  };

  // Define navigation items based on user type
  const getNavigationItems = () => {
    const commonItems = [
      { label: 'Dashboard', icon: Home, link: getDashboardLink() },
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

  const getDashboardLink = () => {
    if (userType === 'consumer') return '/consumer-dashboard';
    if (userType === 'advisor') return '/advisor-dashboard';
    if (userType === 'firm_admin') return '/firm-dashboard';
    return '/';
  };

  const navigationItems = getNavigationItems();

  // If on mobile, use a simplified layout with the mobile navbar
  if (isMobile) {
    return (
      <AnimatedRoute animation="fade">
        <div className="min-h-screen bg-slate-50 flex flex-col">
          <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
            <Logo />
            <div className="flex items-center space-x-4">
              <button className="relative">
                <BellRing className="h-6 w-6 text-slate-600" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button 
                onClick={() => navigate(userType === 'consumer' 
                  ? '/consumer-profile' 
                  : userType === 'advisor' 
                    ? '/advisor-profile' 
                    : '/firm-profile'
                )}
                className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-medium"
              >
                {userType === 'consumer' ? 'C' : userType === 'advisor' ? 'A' : 'F'}
              </button>
            </div>
          </header>
          
          <main className="flex-grow p-4 mb-16">
            <div className="mb-4">
              <h1 className="text-2xl font-serif font-bold text-navy-900">{title}</h1>
              {subtitle && <p className="text-slate-600 mt-1">{subtitle}</p>}
            </div>
            {children}
          </main>
          
          <MobileNavbar />
        </div>
      </AnimatedRoute>
    );
  }

  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen bg-slate-50 flex">
        {/* Sidebar */}
        <aside 
          className={`bg-navy-900 text-white h-screen fixed transition-all duration-300 ease-in-out z-30 ${
            sidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          <div className="p-4 flex items-center justify-between border-b border-navy-800">
            {!sidebarCollapsed && <Logo isWhite />}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-white hover:bg-navy-800"
            >
              {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </div>
          
          <div className="py-6">
            <nav>
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.label}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-slate-300 hover:text-white hover:bg-navy-800 ${
                        sidebarCollapsed ? 'px-0 justify-center' : 'px-4'
                      }`}
                      onClick={() => navigate(item.link)}
                    >
                      <item.icon className={`h-5 w-5 ${sidebarCollapsed ? 'mr-0' : 'mr-3'}`} />
                      {!sidebarCollapsed && <span>{item.label}</span>}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-navy-800">
            <Button
              variant="ghost"
              className={`w-full justify-start text-slate-300 hover:text-white hover:bg-navy-800 ${
                sidebarCollapsed ? 'px-0 justify-center' : 'px-4'
              }`}
              onClick={handleLogout}
            >
              <LogOut className={`h-5 w-5 ${sidebarCollapsed ? 'mr-0' : 'mr-3'}`} />
              {!sidebarCollapsed && <span>Logout</span>}
            </Button>
          </div>
        </aside>

        {/* Main content */}
        <div 
          className={`transition-all duration-300 ease-in-out ${
            sidebarCollapsed ? 'ml-20' : 'ml-64'
          } flex-1`}
        >
          {/* Top navigation */}
          <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-20">
            <div>
              <h1 className="text-lg font-medium text-navy-900">{title}</h1>
              {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              </div>
              
              <button className="relative">
                <BellRing className="h-6 w-6 text-slate-600" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="relative">
                <HelpCircle className="h-6 w-6 text-slate-600" />
              </button>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => navigate(userType === 'consumer' 
                    ? '/consumer-profile' 
                    : userType === 'advisor' 
                      ? '/advisor-profile' 
                      : '/firm-profile'
                  )}
                  className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-medium"
                >
                  {userType === 'consumer' ? 'C' : userType === 'advisor' ? 'A' : 'F'}
                </button>
                {!sidebarCollapsed && (
                  <div>
                    <p className="text-sm font-medium text-navy-900">
                      {userType === 'consumer' ? 'Consumer' : userType === 'advisor' ? 'Advisor' : 'Firm Admin'}
                    </p>
                    <p className="text-xs text-slate-500">
                      {userType === 'consumer' ? 'Member' : userType === 'advisor' ? 'Professional' : 'Organization'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </header>
          
          {/* Main content */}
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </AnimatedRoute>
  );
};

export default DashboardLayout;
