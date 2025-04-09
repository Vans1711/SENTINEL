import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Bell, User, LogOut, Globe, UserCircle, LifeBuoy } from 'lucide-react';
import { Button } from './ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getProfileLink = () => {
    if (!user) return '/auth/login';
    return user.userType === 'volunteer' ? '/volunteer/profile' : '/family/profile';
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#121212]/90 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-montserrat font-bold text-white">
            <span className="text-military">Sentinel</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-1">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={`nav-link bg-transparent ${location.pathname.includes('/families') ? 'active' : ''}`}>Families</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-[#1A1A1A]/95 border-[#333333] backdrop-blur-md min-w-[220px]">
                  <ul className="p-2 space-y-1">
                    <li className="w-full">
                      <Link 
                        to="/families" 
                        className="block w-full px-3 py-2 text-white hover:bg-[#333333] rounded-md transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Family List
                      </Link>
                    </li>
                    <li className="w-full">
                      <Link 
                        to="/families/welfare-map" 
                        className="block w-full px-3 py-2 text-white hover:bg-[#333333] rounded-md transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Welfare Map
                      </Link>
                    </li>
                    <li className="w-full">
                      <Link 
                        to="/family/life-navigator" 
                        className="block w-full px-3 py-2 text-white hover:bg-[#333333] rounded-md transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <LifeBuoy className="h-4 w-4 mr-2" />
                          Life Navigator
                        </div>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Link to="/volunteer" className={`nav-link ${isActive('/volunteer') ? 'active' : ''}`}>Volunteers</Link>
          <Link to="/legacy-wall" className={`nav-link ${isActive('/legacy-wall') ? 'active' : ''}`}>Legacy Wall</Link>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="nav-link bg-transparent">Resources</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-[#1A1A1A]/95 border-[#333333] backdrop-blur-md min-w-[220px]">
                  <ul className="p-2 space-y-1">
                    <li className="w-full">
                      <Link 
                        to="/resources/educational-support" 
                        className="block w-full px-3 py-2 text-white hover:bg-[#333333] rounded-md transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t('resources.educational_support')}
                      </Link>
                    </li>
                    <li className="w-full">
                      <Link 
                        to="/resources/financial-aid" 
                        className="block w-full px-3 py-2 text-white hover:bg-[#333333] rounded-md transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t('resources.financial_aid')}
                      </Link>
                    </li>
                    <li className="w-full">
                      <Link 
                        to="/resources/counseling-services" 
                        className="block w-full px-3 py-2 text-white hover:bg-[#333333] rounded-md transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t('resources.counseling_services')}
                      </Link>
                    </li>
                    <li className="w-full">
                      <Link 
                        to="/resources/legal-help" 
                        className="block w-full px-3 py-2 text-white hover:bg-[#333333] rounded-md transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t('resources.legal_help')}
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Link to="/report-concern" className={`nav-link ${isActive('/report-concern') ? 'active' : ''}`}>Contact</Link>
        </div>

        {/* Auth Buttons or User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Language Selector */}
          <LanguageSelector />
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-military text-military hover:bg-military hover:text-white">
                  <User className="h-4 w-4 mr-2" /> {user?.name.split(' ')[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1A1A1A]/95 border-[#333333] backdrop-blur-md">
                <DropdownMenuLabel>Name</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(getProfileLink())}>
                  <User className="h-4 w-4 mr-2" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/auth/login">
                <Button variant="outline" size="sm" className="border-military text-military hover:bg-military hover:text-white">
                  Login
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button size="sm" className="bg-military hover:bg-military-light text-white">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white hover:bg-military/20"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121212]/95 backdrop-blur-md py-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Home</Link>
            
            <div className="relative">
              <button className={`nav-link flex items-center w-full justify-between ${location.pathname.includes('/families') ? 'active' : ''}`} onClick={(e) => {
                e.preventDefault();
                const submenu = e.currentTarget.nextElementSibling;
                if (submenu) {
                  submenu.classList.toggle('hidden');
                }
              }}>
                Families <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="hidden pl-4 pt-2 pb-1 space-y-2">
                <Link 
                  to="/families" 
                  className="block w-full text-white/80 hover:text-white py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Family List
                </Link>
                <Link 
                  to="/families/welfare-map" 
                  className="block w-full text-white/80 hover:text-white py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Welfare Map
                </Link>
                <Link 
                  to="/family/life-navigator" 
                  className="block w-full text-white/80 hover:text-white py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <LifeBuoy className="h-4 w-4 mr-2" />
                    Life Navigator
                  </div>
                </Link>
              </div>
            </div>
            
            <Link to="/volunteer" className={`nav-link ${isActive('/volunteer') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Volunteers</Link>
            <Link to="/legacy-wall" className={`nav-link ${isActive('/legacy-wall') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Legacy Wall</Link>
            
            <div className="relative">
              <button className="nav-link flex items-center w-full justify-between" onClick={(e) => {
                e.preventDefault();
                const submenu = e.currentTarget.nextElementSibling;
                if (submenu) {
                  submenu.classList.toggle('hidden');
                }
              }}>
                Resources <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="hidden pl-4 pt-2 pb-1 space-y-2">
                <Link 
                  to="/resources/educational-support" 
                  className="block w-full text-white/80 hover:text-white py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('resources.educational_support')}
                </Link>
                <Link 
                  to="/resources/financial-aid" 
                  className="block w-full text-white/80 hover:text-white py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('resources.financial_aid')}
                </Link>
                <Link 
                  to="/resources/counseling-services" 
                  className="block w-full text-white/80 hover:text-white py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('resources.counseling_services')}
                </Link>
                <Link 
                  to="/resources/legal-help" 
                  className="block w-full text-white/80 hover:text-white py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('resources.legal_help')}
                </Link>
              </div>
            </div>
            
            <Link to="/report-concern" className={`nav-link ${isActive('/report-concern') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            
            {/* Language Selector for Mobile */}
            <div className="py-2">
              <div className="text-sm text-white/60 mb-2 flex items-center">
                <Globe className="h-4 w-4 mr-1" /> Select Language
              </div>
              <LanguageSelector />
            </div>
            
            {/* Mobile Auth Buttons or Profile Link */}
            {isAuthenticated ? (
              <div className="flex flex-col space-y-2 pt-4">
                <Link to={getProfileLink()} className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="border-military text-military hover:bg-military hover:text-white w-full">
                    <User className="h-4 w-4 mr-2" /> Profile
                  </Button>
                </Link>
                <Button
                  size="sm"
                  className="bg-military hover:bg-military-light text-white w-full"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </Button>
              </div>
            ) : (
              <div className="flex space-x-4 pt-4">
                <Link to="/auth/login" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="border-military text-military hover:bg-military hover:text-white w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/auth/register" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="bg-military hover:bg-military-light text-white w-full">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
