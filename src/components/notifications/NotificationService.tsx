import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Notification } from '../../types/index';

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  sendRentReminder: (tenantId: string, amount: number, dueDate: Date) => void;
  sendLeaseExpiryNotification: (tenantId: string, unitId: string, expiryDate: Date) => void;
  sendPaymentConfirmation: (tenantId: string, amount: number, paymentMethod: string) => void;
  sendMaintenanceNotification: (tenantId: string, requestType: string, status: string) => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      userId: 'admin',
      type: 'rent_reminder',
      title: 'Rent Payment Overdue',
      message: 'Mike Johnson (Unit 304) has an overdue rent payment of ₹35,000. Payment was due 5 days ago.',
      data: { tenantId: '3', amount: 35000, unitId: '304' },
      status: 'unread',
      priority: 'high',
      channels: ['email', 'sms', 'in_app'],
      createdAt: new Date('2024-02-09T10:30:00')
    },
    {
      id: '2',
      userId: 'admin',
      type: 'payment_confirmation',
      title: 'Payment Received',
      message: 'John Doe (Unit 101) has successfully paid rent of ₹25,000 via UPI.',
      data: { tenantId: '1', amount: 25000, paymentMethod: 'UPI' },
      status: 'unread',
      priority: 'medium',
      channels: ['email', 'in_app'],
      createdAt: new Date('2024-02-09T09:15:00')
    }
  ]);

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  const addNotification = (notificationData: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setNotifications(prev => [newNotification, ...prev]);
    
    // In a real app, this would also trigger push notifications, emails, SMS, etc.
    if (notificationData.priority === 'high') {
      // Trigger immediate notification (browser notification, email, SMS)
      triggerImmediateNotification(newNotification);
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id 
        ? { ...notification, status: 'read', readAt: new Date() }
        : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ 
      ...notification, 
      status: 'read' as const, 
      readAt: new Date() 
    })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Specific notification types
  const sendRentReminder = (tenantId: string, amount: number, dueDate: Date) => {
    const daysOverdue = Math.floor((new Date().getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
    
    let title, message, priority: 'low' | 'medium' | 'high';
    
    if (daysOverdue > 0) {
      title = 'Rent Payment Overdue';
      message = `Rent payment of ₹${amount.toLocaleString()} is ${daysOverdue} days overdue. Please follow up immediately.`;
      priority = 'high';
    } else if (daysOverdue === 0) {
      title = 'Rent Due Today';
      message = `Rent payment of ₹${amount.toLocaleString()} is due today.`;
      priority = 'medium';
    } else {
      title = 'Rent Due Reminder';
      message = `Rent payment of ₹${amount.toLocaleString()} is due in ${Math.abs(daysOverdue)} days.`;
      priority = 'low';
    }

    addNotification({
      userId: 'admin',
      type: 'rent_reminder',
      title,
      message,
      data: { tenantId, amount, daysOverdue },
      status: 'unread',
      priority,
      channels: ['email', 'sms', 'in_app']
    });

    // Send SMS/Email to tenant
    sendSMSNotification(tenantId, message);
    sendEmailNotification(tenantId, title, message);
  };

  const sendLeaseExpiryNotification = (tenantId: string, unitId: string, expiryDate: Date) => {
    const daysUntilExpiry = Math.floor((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    
    let title: string | undefined, message: string | undefined, priority: 'low' | 'medium' | 'high' | undefined;
    
    if (daysUntilExpiry <= 0) {
      title = 'Lease Expired';
      message = `Lease for Unit ${unitId} has expired. Immediate action required.`;
      priority = 'high';
    } else if (daysUntilExpiry <= 30) {
      title = 'Lease Expiring Soon';
      message = `Lease for Unit ${unitId} will expire in ${daysUntilExpiry} days. Consider sending renewal notice.`;
      priority = 'medium';
    } else if (daysUntilExpiry <= 60) {
      title = 'Lease Renewal Reminder';
      message = `Lease for Unit ${unitId} will expire in ${daysUntilExpiry} days. Start renewal process.`;
      priority = 'low';
    }

    if (title && message && priority) {
      addNotification({
        userId: 'admin',
        type: 'lease_expiry',
        title,
        message,
        data: { tenantId, unitId, expiryDate, daysUntilExpiry },
        status: 'unread',
        priority,
        channels: ['email', 'sms', 'in_app']
      });

      // Send notification to tenant
      sendSMSNotification(tenantId, message);
      sendEmailNotification(tenantId, title, message);
    }
  };

  const sendPaymentConfirmation = (tenantId: string, amount: number, paymentMethod: string) => {
    const title = 'Payment Received';
    const message = `Payment of ₹${amount.toLocaleString()} received via ${paymentMethod}. Thank you!`;

    addNotification({
      userId: 'admin',
      type: 'payment_confirmation',
      title,
      message,
      data: { tenantId, amount, paymentMethod },
      status: 'unread',
      priority: 'medium',
      channels: ['email', 'in_app']
    });

    // Send confirmation to tenant
    sendSMSNotification(tenantId, message);
    sendEmailNotification(tenantId, title, message);
  };

  const sendMaintenanceNotification = (tenantId: string, requestType: string, status: string) => {
    let title, message, priority: 'low' | 'medium' | 'high';

    switch (status) {
      case 'registered':
        title = 'Maintenance Request Registered';
        message = `Your request for ${requestType} has been registered and will be addressed soon.`;
        priority = 'low';
        break;
      case 'in_progress':
        title = 'Maintenance Work Started';
        message = `Work on your ${requestType} request has started.`;
        priority = 'medium';
        break;
      case 'completed':
        title = 'Maintenance Work Completed';
        message = `Your ${requestType} request has been completed successfully.`;
        priority = 'low';
        break;
      case 'urgent':
        title = 'Urgent Maintenance Required';
        message = `Urgent ${requestType} issue reported. Immediate attention required.`;
        priority = 'high';
        break;
      default:
        return;
    }

    addNotification({
      userId: 'admin',
      type: 'maintenance_update',
      title,
      message,
      data: { tenantId, requestType, status },
      status: 'unread',
      priority,
      channels: ['email', 'sms', 'in_app']
    });

    // Send notification to tenant
    sendSMSNotification(tenantId, message);
    sendEmailNotification(tenantId, title, message);
  };

  // Mock functions for external notifications
  const triggerImmediateNotification = (notification: Notification) => {
    // Browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico'
      });
    }
    
    // In a real app, this would trigger push notifications, emails, etc.
    console.log('Immediate notification triggered:', notification);
  };

  const sendSMSNotification = (tenantId: string, message: string) => {
    // Mock SMS sending
    console.log(`SMS sent to tenant ${tenantId}: ${message}`);
    
    // In a real implementation, this would integrate with SMS services like:
    // - Twilio
    // - AWS SNS
    // - TextLocal
    // - MSG91
  };

  const sendEmailNotification = (tenantId: string, subject: string, message: string) => {
    // Mock email sending
    console.log(`Email sent to tenant ${tenantId}: ${subject} - ${message}`);
    
    // In a real implementation, this would integrate with email services like:
    // - SendGrid
    // - AWS SES
    // - Mailgun
    // - Nodemailer
  };

  // Auto-generate notifications based on data changes
  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Set up periodic checks for rent due dates, lease expiries, etc.
    const interval = setInterval(() => {
      checkForAutomaticNotifications();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const checkForAutomaticNotifications = () => {
    // This would check the database for:
    // - Rent due dates
    // - Lease expiry dates
    // - Overdue payments
    // - Maintenance request updates
    
    // For demo purposes, we'll just log
    console.log('Checking for automatic notifications...');
  };

  const value: NotificationContextType = {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    sendRentReminder,
    sendLeaseExpiryNotification,
    sendPaymentConfirmation,
    sendMaintenanceNotification,
    unreadCount
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Notification Templates
export const NotificationTemplates = {
  rentReminder: (tenantName: string, unitNumber: string, amount: number, daysOverdue: number) => {
    if (daysOverdue > 0) {
      return {
        title: 'Rent Payment Overdue',
        message: `Dear ${tenantName}, your rent payment of ₹${amount.toLocaleString()} for Unit ${unitNumber} is ${daysOverdue} days overdue. Please pay immediately to avoid late fees.`,
        sms: `Rent overdue: ₹${amount.toLocaleString()} for Unit ${unitNumber}. Pay now to avoid penalties. - Property Management`,
        email: {
          subject: 'Urgent: Rent Payment Overdue',
          body: `Dear ${tenantName},\n\nThis is to remind you that your rent payment of ₹${amount.toLocaleString()} for Unit ${unitNumber} is ${daysOverdue} days overdue.\n\nPlease make the payment immediately to avoid late fees and penalties.\n\nThank you,\nProperty Management Team`
        }
      };
    } else {
      return {
        title: 'Rent Due Reminder',
        message: `Dear ${tenantName}, your rent payment of ₹${amount.toLocaleString()} for Unit ${unitNumber} is due in ${Math.abs(daysOverdue)} days.`,
        sms: `Rent due: ₹${amount.toLocaleString()} for Unit ${unitNumber} in ${Math.abs(daysOverdue)} days. - Property Management`,
        email: {
          subject: 'Rent Payment Reminder',
          body: `Dear ${tenantName},\n\nThis is a friendly reminder that your rent payment of ₹${amount.toLocaleString()} for Unit ${unitNumber} is due in ${Math.abs(daysOverdue)} days.\n\nPlease ensure timely payment.\n\nThank you,\nProperty Management Team`
        }
      };
    }
  },

  leaseExpiry: (tenantName: string, unitNumber: string, daysUntilExpiry: number) => ({
    title: 'Lease Expiry Notice',
    message: `Dear ${tenantName}, your lease for Unit ${unitNumber} will expire in ${daysUntilExpiry} days. Please contact us for renewal.`,
    sms: `Lease expiry: Unit ${unitNumber} expires in ${daysUntilExpiry} days. Contact for renewal. - Property Management`,
    email: {
      subject: 'Lease Expiry Notice',
      body: `Dear ${tenantName},\n\nThis is to inform you that your lease for Unit ${unitNumber} will expire in ${daysUntilExpiry} days.\n\nIf you wish to renew your lease, please contact us at your earliest convenience.\n\nThank you,\nProperty Management Team`
    }
  }),

  paymentConfirmation: (tenantName: string, amount: number, transactionId: string) => ({
    title: 'Payment Confirmation',
    message: `Dear ${tenantName}, we have received your payment of ₹${amount.toLocaleString()}. Transaction ID: ${transactionId}`,
    sms: `Payment received: ₹${amount.toLocaleString()}. Transaction ID: ${transactionId}. Thank you! - Property Management`,
    email: {
      subject: 'Payment Confirmation',
      body: `Dear ${tenantName},\n\nWe have successfully received your payment of ₹${amount.toLocaleString()}.\n\nTransaction ID: ${transactionId}\n\nThank you for your timely payment.\n\nProperty Management Team`
    }
  }),

  maintenanceUpdate: (tenantName: string, requestType: string, status: string) => ({
    title: `Maintenance Update: ${requestType}`,
    message: `Dear ${tenantName}, your ${requestType} request status has been updated to: ${status}`,
    sms: `Maintenance update: ${requestType} - ${status}. - Property Management`,
    email: {
      subject: `Maintenance Update: ${requestType}`,
      body: `Dear ${tenantName},\n\nYour maintenance request for ${requestType} has been updated.\n\nStatus: ${status}\n\nThank you,\nProperty Management Team`
    }
  })
};

export default NotificationProvider;