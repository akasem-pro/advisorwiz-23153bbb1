
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import Logo from '../layout/Logo';
import { UserType } from '../../context/UserContext';

interface SidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  userType: UserType;
  navigationItems: {
    label: string;
    icon: React.ElementType;
    link: string;
  }[];
  handleLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarCollapsed,
  setSidebarCollapsed,
  userType,
  navigationItems,
  handleLogout
}) => {
  const navigate = useNavigate();
  
  return (
    <aside 
      className={`bg-navy-900 text-white h-screen fixed transition-all duration-300 ease-in-out z-30 ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-navy-800">
        {!sidebarCollapsed && <Logo forceLightMode={true} />}
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
  );
};

export default Sidebar;
