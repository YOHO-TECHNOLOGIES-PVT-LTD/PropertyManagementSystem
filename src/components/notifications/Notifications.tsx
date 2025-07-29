import React, { useState } from 'react';
import {
  Bell,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  Info,
  IndianRupee,
  Calendar,
  Wrench,
  MoreVertical,
  Check,
  X,
  
} from 'lucide-react';

// Local notification interface for this page
interface LocalNotification {
  id: string;
  userId: string;
  type: 'rent_reminder' | 'payment_confirmation' | 'lease_expiry' | 'maintenance' | 'system' | 'other';
  title: string;
  message: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  createdAt: Date;
}

const Notifications: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterRead, setFilterRead] = useState('all');

  // Mock data
  const notifications: LocalNotification[] = [
    {
      id: '1',
      userId: 'admin',
      type: 'rent_reminder',
      title: 'Rent Payment Overdue',
      message: 'Mike Johnson (Unit 304) has an overdue rent payment of ₹35,000. Payment was due 5 days ago.',
      isRead: false,
      priority: 'high',
      actionUrl: '/rent?tenant=3',
      createdAt: new Date('2024-02-09T10:30:00')
    },
    {
      id: '2',
      userId: 'admin',
      type: 'payment_confirmation',
      title: 'Payment Received',
      message: 'John Doe (Unit 101) has successfully paid rent of ₹25,000 via UPI.',
      isRead: false,
      priority: 'medium',
      actionUrl: '/rent?tenant=1',
      createdAt: new Date('2024-02-09T09:15:00')
    },
    {
      id: '3',
      userId: 'admin',
      type: 'lease_expiry',
      title: 'Lease Expiring Soon',
      message: 'Sarah Wilson\'s lease for Unit 205 will expire in 30 days. Consider sending renewal notice.',
      isRead: false,
      priority: 'medium',
      actionUrl: '/lease?tenant=2',
      createdAt: new Date('2024-02-09T08:45:00')
    },
    {
      id: '4',
      userId: 'admin',
      type: 'maintenance',
      title: 'New Maintenance Request',
      message: 'Urgent electrical issue reported in Unit 304. Power outlet not working in living room.',
      isRead: true,
      priority: 'high',
      actionUrl: '/maintenance?request=3',
      createdAt: new Date('2024-02-09T07:20:00')
    },
    {
      id: '5',
      userId: 'admin',
      type: 'system',
      title: 'Monthly Report Generated',
      message: 'Your January 2024 financial report is ready for download.',
      isRead: true,
      priority: 'low',
      actionUrl: '/reports',
      createdAt: new Date('2024-02-08T18:00:00')
    },
    {
      id: '6',
      userId: 'admin',
      type: 'rent_reminder',
      title: 'Rent Due Reminder',
      message: 'Sarah Wilson (Unit 205) has rent due tomorrow (₹18,000). Send reminder notification.',
      isRead: true,
      priority: 'medium',
      actionUrl: '/rent?tenant=2',
      createdAt: new Date('2024-02-08T16:30:00')
    },
    {
      id: '7',
      userId: 'admin',
      type: 'maintenance',
      title: 'Maintenance Completed',
      message: 'Kitchen sink repair in Unit 101 has been completed successfully. Cost: ₹750',
      isRead: true,
      priority: 'low',
      actionUrl: '/maintenance?request=1',
      createdAt: new Date('2024-02-08T14:15:00')
    },
    {
      id: '8',
      userId: 'admin',
      type: 'lease_expiry',
      title: 'Lease Renewal Required',
      message: 'Mike Johnson\'s lease for Unit 304 expired yesterday. Immediate action required.',
      isRead: false,
      priority: 'high',
      actionUrl: '/lease?tenant=3',
      createdAt: new Date('2024-02-07T12:00:00')
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesRead = filterRead === 'all' || 
                       (filterRead === 'unread' && !notification.isRead) ||
                       (filterRead === 'read' && notification.isRead);
    return matchesSearch && matchesType && matchesRead;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'rent_reminder':
        return IndianRupee;
      case 'payment_confirmation':
        return CheckCircle;
      case 'lease_expiry':
        return Calendar;
      case 'maintenance':
        return Wrench;
      case 'system':
        return Info;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') return 'border-l-red-500 bg-red-50';
    if (priority === 'medium') return 'border-l-yellow-500 bg-yellow-50';
    if (priority === 'low') return 'border-l-green-500 bg-green-50';
    
    switch (type) {
      case 'rent_reminder':
        return 'border-l-red-500 bg-red-50';
      case 'payment_confirmation':
        return 'border-l-green-500 bg-green-50';
      case 'lease_expiry':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'maintenance':
        return 'border-l-orange-500 bg-orange-50';
      case 'system':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getIconColor = (type: string, priority: string) => {
    if (priority === 'high') return 'text-red-600';
    if (priority === 'medium') return 'text-yellow-600';
    if (priority === 'low') return 'text-green-600';
    
    switch (type) {
      case 'rent_reminder':
        return 'text-red-600';
      case 'payment_confirmation':
        return 'text-green-600';
      case 'lease_expiry':
        return 'text-yellow-600';
      case 'maintenance':
        return 'text-orange-600';
      case 'system':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const markAsRead = (id: string) => {
    // Implementation would update the notification status
    console.log('Mark as read:', id);
  };

  const markAsUnread = (id: string) => {
    // Implementation would update the notification status
    console.log('Mark as unread:', id);
  };

  const deleteNotification = (id: string) => {
    // Implementation would delete the notification
    console.log('Delete notification:', id);
  };

  const markAllAsRead = () => {
    // Implementation would mark all notifications as read
    console.log('Mark all as read');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">
            Stay updated with important alerts and messages
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-medium">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={markAllAsRead}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Check className="w-4 h-4" />
            <span>Mark All Read</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <Bell className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unread</p>
              <p className="text-2xl font-bold text-red-600">{unreadCount}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-orange-600">
                {notifications.filter(n => n.priority === 'high').length}
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today</p>
              <p className="text-2xl font-bold text-blue-600">
                {notifications.filter(n => {
                  const today = new Date();
                  const notificationDate = new Date(n.createdAt);
                  return notificationDate.toDateString() === today.toDateString();
                }).length}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="rent_reminder">Rent Reminders</option>
              <option value="payment_confirmation">Payment Confirmations</option>
              <option value="lease_expiry">Lease Expiry</option>
              <option value="maintenance">Maintenance</option>
              <option value="system">System</option>
            </select>
          </div>

          {/* Read Status Filter */}
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-gray-400" />
            <select
              value={filterRead}
              onChange={(e) => setFilterRead(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => {
          const Icon = getNotificationIcon(notification.type);
          const colorClasses = getNotificationColor(notification.type, notification.priority);
          const iconColor = getIconColor(notification.type, notification.priority);
          
          return (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow-sm border border-gray-200 border-l-4 ${colorClasses} ${
                !notification.isRead ? 'ring-2 ring-blue-100' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${colorClasses.split(' ')[1]}`}>
                      <Icon className={`w-5 h-5 ${iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={`text-sm font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          notification.priority === 'high' ? 'bg-red-100 text-red-600' :
                          notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {notification.priority}
                        </span>
                      </div>
                      <p className={`text-sm ${!notification.isRead ? 'text-gray-700' : 'text-gray-600'}`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center space-x-4 mt-3">
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(notification.createdAt)}
                        </span>
                        {notification.actionUrl && (
                          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                            View Details →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {!notification.isRead ? (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => markAsUnread(notification.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Mark as unread"
                      >
                        <Bell className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
          <p className="text-gray-600">
            {searchTerm || filterType !== 'all' || filterRead !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'You\'re all caught up! No new notifications.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Notifications;