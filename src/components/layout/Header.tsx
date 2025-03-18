
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import { useIsMobile } from '../../hooks/use-mobile';
import { useUser } from '../../context/UserContext';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '../ui/navigation-menu';
import { cn } from '@/lib/utils';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const { isAuthenticated, userType } = useUser();
  
  const getDashboardLink = () => {
    if (userType === 'consumer') return '/consumer-dashboard';
    if (userType === 'advisor') return '/advisor-dashboard';
    if (userType === 'firm_admin') return '/firm-dashboard';
    return '/sign-in';
  };
  
  // Define navigation links with improved user journey focus
  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'Consumer', 
      path: '/for-consumers',
      subLinks: [
        { name: 'How It Works', path: '/for-consumers#how-it-works' },
        { name: 'Find an Advisor', path: '/matches' },
        { name: 'Success Stories', path: '/for-consumers#testimonials' },
      ]
    },
    { 
      name: 'Advisors', 
      path: '/for-advisors',
      subLinks: [
        { name: 'Benefits', path: '/for-advisors#benefits' },
        { name: 'Join as Advisor', path: '/advisor-profile' },
        { name: 'Success Stories', path: '/for-advisors#testimonials' },
      ]
    },
    { 
      name: 'Firms', 
      path: '/for-firms',
      subLinks: [
        { name: 'Enterprise Solutions', path: '/for-firms#solutions' },
        { name: 'Register Your Firm', path: '/firm-profile' },
        { name: 'Case Studies', path: '/for-firms#case-studies' },
      ]
    },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="fixed w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
            
            {!isMobile && (
              <div className="ml-8">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <Link to="/" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:bg-accent focus:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none bg-background hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent/50 data-[active]:bg-accent/50 h-10 py-2 px-4 group w-max">
                        Home
                      </Link>
                    </NavigationMenuItem>
                    
                    {/* Consumer navigation */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-white hover:text-teal-600">Consumer</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <Link
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-teal-50 to-teal-100 p-6 no-underline outline-none focus:shadow-md"
                                to="/for-consumers"
                              >
                                <div className="mb-2 mt-4 text-lg font-medium text-teal-900">
                                  Start Your Journey
                                </div>
                                <p className="text-sm leading-tight text-teal-800">
                                  Find the perfect financial advisor who understands your needs and goals
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <Link to="/for-consumers#how-it-works" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                              <div className="text-sm font-medium leading-none">How It Works</div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                                Our matching process explained
                              </p>
                            </Link>
                          </li>
                          <li>
                            <Link to="/matches" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                              <div className="text-sm font-medium leading-none">Find an Advisor</div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                                Browse matched advisors now
                              </p>
                            </Link>
                          </li>
                          <li>
                            <Link to="/for-consumers#testimonials" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                              <div className="text-sm font-medium leading-none">Success Stories</div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                                Read how others found their perfect match
                              </p>
                            </Link>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    
                    {/* Advisors navigation */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-white hover:text-teal-600">Advisors</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <Link
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-navy-50 to-navy-100 p-6 no-underline outline-none focus:shadow-md"
                                to="/for-advisors"
                              >
                                <div className="mb-2 mt-4 text-lg font-medium text-navy-900">
                                  Grow Your Practice
                                </div>
                                <p className="text-sm leading-tight text-navy-800">
                                  Connect with ideal clients and expand your advisory business
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <Link to="/for-advisors#benefits" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                              <div className="text-sm font-medium leading-none">Benefits</div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                                Why advisors choose our platform
                              </p>
                            </Link>
                          </li>
                          <li>
                            <Link to="/advisor-profile" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                              <div className="text-sm font-medium leading-none">Join as Advisor</div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                                Create your profile and get matched
                              </p>
                            </Link>
                          </li>
                          <li>
                            <Link to="/for-advisors#testimonials" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                              <div className="text-sm font-medium leading-none">Success Stories</div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                                Read how advisors grew their business
                              </p>
                            </Link>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    
                    {/* Firms navigation */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-white hover:text-teal-600">Firms</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <Link
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-slate-50 to-slate-100 p-6 no-underline outline-none focus:shadow-md"
                                to="/for-firms"
                              >
                                <div className="mb-2 mt-4 text-lg font-medium text-slate-900">
                                  Enterprise Solutions
                                </div>
                                <p className="text-sm leading-tight text-slate-800">
                                  Scale your advisory firm with our comprehensive platform
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <Link to="/for-firms#solutions" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                              <div className="text-sm font-medium leading-none">Enterprise Solutions</div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                                Custom solutions for advisory firms
                              </p>
                            </Link>
                          </li>
                          <li>
                            <Link to="/firm-profile" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                              <div className="text-sm font-medium leading-none">Register Your Firm</div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                                Create your firm profile and onboard advisors
                              </p>
                            </Link>
                          </li>
                          <li>
                            <Link to="/for-firms#case-studies" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                              <div className="text-sm font-medium leading-none">Case Studies</div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                                Success stories from partner firms
                              </p>
                            </Link>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    
                    <NavigationMenuItem>
                      <Link to="/pricing" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:bg-accent focus:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none bg-background hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent/50 data-[active]:bg-accent/50 h-10 py-2 px-4 group w-max">
                        Pricing
                      </Link>
                    </NavigationMenuItem>
                    
                    <NavigationMenuItem>
                      <Link to="/resources" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:bg-accent focus:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none bg-background hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent/50 data-[active]:bg-accent/50 h-10 py-2 px-4 group w-max">
                        Resources
                      </Link>
                    </NavigationMenuItem>
                    
                    <NavigationMenuItem>
                      <Link to="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:bg-accent focus:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none bg-background hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent/50 data-[active]:bg-accent/50 h-10 py-2 px-4 group w-max">
                        Contact
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <Link 
                to={getDashboardLink()}
                className="btn-primary"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  to="/sign-in" 
                  className="hidden md:flex items-center px-4 py-2 text-navy-800 hover:text-navy-900"
                >
                  Sign In
                </Link>
                <Link 
                  to="/onboarding" 
                  className="btn-primary"
                >
                  Get Started
                </Link>
              </>
            )}
            
            {isMobile && (
              <MobileMenu
                isMenuOpen={mobileMenuOpen}
                toggleMenu={toggleMobileMenu}
                links={navLinks}
                isAuthenticated={isAuthenticated}
                showGetStarted={!isAuthenticated}
                onLogout={() => {}}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
