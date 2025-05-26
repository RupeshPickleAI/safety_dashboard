import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  Insights,
  Menu as MenuIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  ViewInAr as ViewIcon
} from '@mui/icons-material';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    // { path: '/', icon: <DashboardIcon />, label: 'Dashboard' },
    { path: '/insights', icon: <Insights />, label: 'Insights' },
    { path: '/reports', icon: <AssessmentIcon />, label: 'Reports' },
    { path: '/ai-screen-view', icon: <ViewIcon />, label: 'AI Screen View' },
    { path: '/settings', icon: <SettingsIcon />, label: 'Settings' },
      // { path: '/aiscreenview', icon: <ViewIcon />, label: 'aiscreen' },
  ];

  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem('isAuthenticated');
    // Redirect to login page
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white"
      >
        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-screen w-64 transform transition-transform duration-300 ease-in-out z-40
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{
          background: 'linear-gradient(90deg,rgb(15, 10, 63),rgb(13, 20, 48),rgb(16, 35, 94), #072266)'
        }}
      >
        {/* Logo Section */}
        <div className="p-4">
          <img
            alt="loadingLogoErr"
            src="https://eimkeia.stripocdn.email/content/guids/CABINET_8270216c780e362a1fbcd636b59c67ae376eb446dc5f95e17700b638b8c3f618/images/indus_logo_dev.png"
            className="w-40 sm:w-45 h-auto"
          />
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-blue-600/10'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-blue-600/10 w-full"
          >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
};

export default Sidebar; 