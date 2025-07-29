import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Users,
  IndianRupee,
  FileText,
  Wrench,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  X,
  User
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../components/notifications/NotificationService';
import LOGO from '../assets/mgm_logo-removebg-preview1.png';
import LOGO2 from '../assets/mgm_logo-removebg-preview.png';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Properties', path: '/properties', icon: Building2 },
  { name: 'Tenants', path: '/tenants', icon: Users },
  { name: 'Rent', path: '/rent', icon: IndianRupee },
  { name: 'Lease', path: '/lease', icon: FileText },
  { name: 'Maintenance', path: '/maintenance', icon: Wrench },
  { name: 'Reports', path: '/reports', icon: BarChart3 },
  { name: 'Notifications', path: '/notifications', icon: Bell },
  { name: 'Settings', path: '/settings', icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  isCollapsed, 
  onClose, 
  onLogout 
}) => {
  const { user } = useAuth();
  const { unreadCount } = useNotifications();

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 bg-white shadow-lg transform transition-all duration-300 ease-in-out
      lg:translate-x-0 lg:static lg:inset-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      ${isCollapsed ? 'lg:w-16' : 'lg:w-64'}
      w-64
    `}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className={`h-16 flex items-center border-b border-gray-200 ${
          isCollapsed ? 'justify-center px-2' : 'justify-center px-4'
        }`}>
          <div className={`flex items-center ${isCollapsed ? '' : 'justify-center w-full'}`}>
            {isCollapsed ? (
              <img 
                src={LOGO} 
                alt="MGM Logo" 
                className="object-contain w-12 h-12"
              />
            ) : (
              <img 
                src={LOGO2} 
                alt="MGM Logo" 
                className="object-contain w-100 h-12"
              />
            )}
          </div>
          {!isCollapsed && (
            <button
              onClick={onClose}
              className="lg:hidden absolute right-4 p-1 rounded-md text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          {isCollapsed && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className={`flex-1 py-4 space-y-1 overflow-y-auto ${
          isCollapsed ? 'px-2' : 'px-3'
        }`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.path} className="relative group">
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center rounded-lg font-medium transition-colors duration-200 ${
                      isCollapsed 
                        ? 'p-3 justify-center' 
                        : 'px-3 py-2'
                    } ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                  end
                >
                  <Icon className={`${
                    isCollapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'
                  }`} />
                  {!isCollapsed && (
                    <>
                      <span>{item.name}</span>
                      {item.name === 'Notifications' && unreadCount > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {unreadCount > 99 ? '99+' : unreadCount}
                        </span>
                      )}
                    </>
                  )}
                  {isCollapsed && item.name === 'Notifications' && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center leading-none">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </NavLink>
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 whitespace-nowrap">
                    {item.name}
                    {item.name === 'Notifications' && unreadCount > 0 && (
                      <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User section */}
        <div className={`border-t border-gray-200 ${
          isCollapsed ? 'p-2' : 'p-4'
        }`}>
          {!isCollapsed ? (
            <>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.role || 'admin'}
                  </p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </>
          ) : (
            <div className="space-y-2">
              <div className="relative group">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mx-auto">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                {/* User tooltip */}
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 whitespace-nowrap">
                  {user?.name || 'Admin User'}
                  <br />
                  <span className="text-xs text-gray-300 capitalize">
                    {user?.role || 'admin'}
                  </span>
                </div>
              </div>
              <div className="relative group">
                <button
                  onClick={onLogout}
                  className="w-10 h-10 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center mx-auto"
                >
                  <LogOut className="w-5 h-5" />
                </button>
                {/* Logout tooltip */}
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 whitespace-nowrap">
                  Logout
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;