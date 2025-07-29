import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

interface ModernCardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

interface ModernCardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface ModernCardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const ModernCard: React.FC<ModernCardProps> & {
  Header: React.FC<ModernCardHeaderProps>;
  Content: React.FC<ModernCardContentProps>;
  Footer: React.FC<ModernCardFooterProps>;
} = ({ 
  children, 
  className = '', 
  hover = false, 
  gradient = false,
  padding = 'md'
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  return (
    <div className={`
      ${gradient 
        ? 'bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30' 
        : 'bg-white/80'
      }
      backdrop-blur-sm rounded-2xl shadow-lg border border-white/20
      ${hover ? 'hover:shadow-xl hover:scale-[1.02] transition-all duration-300' : ''}
      ${paddingClasses[padding]}
      ${className}
    `}>
      {children}
    </div>
  );
};

const ModernCardHeader: React.FC<ModernCardHeaderProps> = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  iconColor = 'text-blue-600',
  action,
  children 
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        {Icon && (
          <div className={`p-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 ${iconColor}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          )}
          {children}
        </div>
      </div>
      {action && (
        <div className="flex items-center space-x-2">
          {action}
        </div>
      )}
    </div>
  );
};

const ModernCardContent: React.FC<ModernCardContentProps> = ({ children, className = '' }) => {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
};

const ModernCardFooter: React.FC<ModernCardFooterProps> = ({ children, className = '' }) => {
  return (
    <div className={`mt-6 pt-6 border-t border-gray-200/50 ${className}`}>
      {children}
    </div>
  );
};

ModernCard.Header = ModernCardHeader;
ModernCard.Content = ModernCardContent;
ModernCard.Footer = ModernCardFooter;

export default ModernCard;