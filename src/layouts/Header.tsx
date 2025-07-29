import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Bell,
  Menu,
  User,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../components/notifications/NotificationService';

interface HeaderProps {
  onToggleSidebar: () => void;
  onToggleSidebarCollapse: () => void;
  sidebarCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  onToggleSidebarCollapse,
  sidebarCollapsed
}) => {
  const { user } = useAuth();
  const { unreadCount } = useNotifications();

  return (
    <header className="h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center space-x-4">
        {/* Mobile menu toggle */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Desktop sidebar collapse toggle */}
        <button
          onClick={onToggleSidebarCollapse}
          className="hidden lg:flex p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <ChevronsRight className="w-5 h-5" />
          ) : (
            <ChevronsLeft className="w-5 h-5" />
          )}
        </button>
        
        <h1 className="text-lg font-semibold text-gray-900 hidden sm:block">
          Property Management System
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <NavLink
          to="/notifications"
          className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center leading-none">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </NavLink>

        {/* User Info */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-900">
              {user?.name || 'Property Owner'}
            </p>
            <p className="text-xs text-gray-500">
              {user?.email || 'owner@propertyms.com'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;