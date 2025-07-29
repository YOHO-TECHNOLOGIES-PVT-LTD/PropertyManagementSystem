import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap: Record<string, string> = {
    dashboard: 'Dashboard',
    properties: 'Properties',
    tenants: 'Tenants',
    rent: 'Rent Management',
    lease: 'Lease Management',
    maintenance: 'Maintenance',
    reports: 'Reports',
    notifications: 'Notifications',
    settings: 'Settings',
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/dashboard' },
    ...pathnames.map((name, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;
      
      return {
        label: breadcrumbNameMap[name] || name.charAt(0).toUpperCase() + name.slice(1),
        path: isLast ? undefined : routeTo,
      };
    }),
  ];

  if (pathnames.length === 0 || (pathnames.length === 1 && pathnames[0] === 'dashboard')) {
    return null; // Don't show breadcrumb on dashboard
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500 mb-4">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="w-4 h-4" />}
          {breadcrumb.path ? (
            <Link
              to={breadcrumb.path}
              className="flex items-center hover:text-gray-700 transition-colors duration-200"
            >
              {index === 0 && <Home className="w-4 h-4 mr-1" />}
              {breadcrumb.label}
            </Link>
          ) : (
            <span className="flex items-center text-gray-900 font-medium">
              {index === 0 && <Home className="w-4 h-4 mr-1" />}
              {breadcrumb.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;