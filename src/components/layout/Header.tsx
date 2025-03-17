
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { initializeTagManager, trackEvent } from '../../utils/tagManager';

const Header: React.FC = () => {
  const { 
    userType, 
    isAuthenticated, 
    setIsAuthenticated, 
    consumerProfile, 
    advisorProfile,
    setConsumerProfile,
    setAdvisorProfile
  } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    setConsumerProfile(null);
    setAdvisorProfile(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    
    trackEvent('logout', {
      user_type: userType,
      timestamp: new Date().toISOString()
    });
    
    navigate('/');
  };
  
  const profile = consumerProfile || advisorProfile;
  
  // Get profile image and email safely
  const profileImage = profile?.profileImage || '';
  const profileEmail = profile?.email || '';
  const profileName = profile?.name || '';

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="text-2xl font-bold text-navy-900 font-serif">
          AdvisorWiz
        </Link>
        
        <nav>
          <ul className="flex items-center space-x-4">
            <li className="mx-1">
              <Link 
                to="/" 
                className="text-navy-900 font-medium hover:text-primary py-2 px-3 rounded-md transition-colors"
              >
                Home
              </Link>
            </li>
            <li className="mx-1">
              <Link 
                to="/pricing" 
                className="text-navy-900 font-medium hover:text-primary py-2 px-3 rounded-md transition-colors"
              >
                Pricing
              </Link>
            </li>
            <li className="mx-1">
              <Link 
                to="/contact" 
                className="text-navy-900 font-medium hover:text-primary py-2 px-3 rounded-md transition-colors"
              >
                Contact
              </Link>
            </li>

            {isAuthenticated ? (
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={profileImage} alt={profileName} />
                        <AvatarFallback>{profileName?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{profileName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {profileEmail}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      Profile
                    </DropdownMenuItem>
                    {userType === 'advisor' && (
                      <DropdownMenuItem onClick={() => navigate('/appointments')}>
                        Appointments
                      </DropdownMenuItem>
                    )}
                    {userType === 'advisor' && (
                      <DropdownMenuItem onClick={() => navigate('/leads')}>
                        Leads
                      </DropdownMenuItem>
                    )}
                    {userType === 'firm_admin' && (
                      <DropdownMenuItem onClick={() => navigate('/firm-profile')}>
                        Firm Profile
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ) : (
              <>
                <li className="mx-1">
                  <Button onClick={() => navigate('/login')} variant="outline">Log In</Button>
                </li>
                <li className="mx-1">
                  <Button onClick={() => navigate('/register')}>Register</Button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
