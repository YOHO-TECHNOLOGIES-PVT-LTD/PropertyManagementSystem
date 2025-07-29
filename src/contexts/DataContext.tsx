import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Property, Tenant, Payment, MaintenanceRequest, Lease } from '../types';

interface DataContextType {
  // Properties
  properties: Property[];
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  getProperty: (id: string) => Property | undefined;

  // Tenants
  tenants: Tenant[];
  addTenant: (tenant: Omit<Tenant, 'id' | 'createdAt'>) => void;
  updateTenant: (id: string, tenant: Partial<Tenant>) => void;
  deleteTenant: (id: string) => void;
  getTenant: (id: string) => Tenant | undefined;

  // Payments
  payments: Payment[];
  addPayment: (payment: Omit<Payment, 'id'>) => void;
  updatePayment: (id: string, payment: Partial<Payment>) => void;
  deletePayment: (id: string) => void;
  getPayment: (id: string) => Payment | undefined;

  // Maintenance Requests
  maintenanceRequests: MaintenanceRequest[];
  addMaintenanceRequest: (request: Omit<MaintenanceRequest, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateMaintenanceRequest: (id: string, request: Partial<MaintenanceRequest>) => void;
  deleteMaintenanceRequest: (id: string) => void;
  getMaintenanceRequest: (id: string) => MaintenanceRequest | undefined;

  // Leases
  leases: Lease[];
  addLease: (lease: Omit<Lease, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateLease: (id: string, lease: Partial<Lease>) => void;
  deleteLease: (id: string) => void;
  getLease: (id: string) => Lease | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  // Initial mock data
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      name: 'Sunrise Apartments',
      address: '123 Main Street, Downtown',
      type: 'apartment',
      totalUnits: 24,
      occupiedUnits: 20,
      vacantUnits: 4,
      occupancyRate: 83.3,
      monthlyRent: 25000,
      description: 'Modern apartment complex with excellent amenities',
      amenities: ['Parking', 'Gym', 'Swimming Pool', 'Security'],
      images: [],
      ownerId: '1',
      owner: {
        id: '1',
        name: 'John Smith',
        email: 'john@example.com',
        phone: '+1234567890',
        address: '456 Oak Street',
        bankDetails: {
          accountNumber: '1234567890',
          bankName: 'ABC Bank',
          ifscCode: 'ABC0001234',
          accountHolderName: 'John Smith'
        },
        propertyIds: ['1'],
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      units: [],
      location: {
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400001'
      },
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Green Valley Complex',
      address: '789 Park Avenue, Westside',
      type: 'apartment',
      totalUnits: 36,
      occupiedUnits: 34,
      vacantUnits: 2,
      occupancyRate: 94.4,
      monthlyRent: 30000,
      description: 'Premium residential complex in prime location',
      amenities: ['Parking', 'Garden', 'Clubhouse', '24/7 Security'],
      images: [],
      ownerId: '2',
      owner: {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '+1234567891',
        address: '789 Pine Street',
        bankDetails: {
          accountNumber: '2345678901',
          bankName: 'XYZ Bank',
          ifscCode: 'XYZ0001234',
          accountHolderName: 'Sarah Johnson'
        },
        propertyIds: ['2'],
        createdAt: new Date('2023-02-01'),
        updatedAt: new Date('2024-01-01')
      },
      units: [],
      location: {
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400002'
      },
      createdAt: new Date('2023-03-20'),
      updatedAt: new Date('2024-01-10')
    }
  ]);

  const [tenants, setTenants] = useState<Tenant[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1234567890',
      address: '123 Main Street, Apt 101',
      unitId: '101',
      propertyId: '1',
      monthlyRent: 25000,
      securityDeposit: 50000,
      leaseStartDate: new Date('2023-06-01'),
      leaseEndDate: new Date('2024-05-31'),
      rentDueDate: 1,
      paymentStatus: 'paid',
      documents: [],
      emergencyContact: {
        name: 'Jane Doe',
        phone: '+1234567891',
        relationship: 'Spouse'
      },
      occupation: 'Software Engineer',
      company: 'Tech Corp',
      monthlyIncome: 80000,
      createdAt: new Date('2023-06-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+1234567892',
      address: '789 Park Avenue, Unit 205',
      unitId: '205',
      propertyId: '2',
      monthlyRent: 18000,
      securityDeposit: 36000,
      leaseStartDate: new Date('2024-08-15'),
      leaseEndDate: new Date('2025-08-14'),
      rentDueDate: 5,
      paymentStatus: 'pending',
      documents: [],
      emergencyContact: {
        name: 'Robert Wilson',
        phone: '+1234567893',
        relationship: 'Father'
      },
      occupation: 'Marketing Manager',
      company: 'Marketing Inc',
      monthlyIncome: 60000,
      createdAt: new Date('2024-08-15'),
      updatedAt: new Date('2024-08-15')
    }
  ]);

  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      tenantId: '1',
      propertyId: '1',
      unitId: '101',
      amount: 25000,
      type: 'rent',
      status: 'completed',
      paymentMethod: {
        id: '1',
        type: 'upi',
        details: {
          upiId: 'john@paytm',
          upiApp: 'paytm'
        },
        isDefault: true,
        createdAt: new Date('2023-06-01')
      },
      transactionId: 'TXN123456789',
      paymentDate: new Date('2024-01-30'),
      dueDate: new Date('2025-02-01'),
      month: '2024-02',
      year: 2024,
      description: 'Monthly rent payment for February 2024',
      createdAt: new Date('2024-01-30'),
      updatedAt: new Date('2024-01-30')
    },
    {
      id: '2',
      tenantId: '2',
      propertyId: '2',
      unitId: '205',
      amount: 18000,
      type: 'rent',
      status: 'pending',
      paymentMethod: {
        id: '2',
        type: 'netbanking',
        details: {
          bankName: 'HDFC Bank'
        },
        isDefault: true,
        createdAt: new Date('2023-08-15')
      },
      paymentDate: new Date('2025-02-01'),
      dueDate: new Date('2025-02-01'),
      month: '2024-02',
      year: 2024,
      description: 'Monthly rent payment for February 2024',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01')
    }
  ]);

  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([
    {
      id: '1',
      tenantId: '1',
      propertyId: '1',
      unitId: '101',
      title: 'Plumbing Issue',
      description: 'Kitchen sink is leaking and causing water damage',
      category: 'plumbing',
      priority: 'medium',
      status: 'open',
      images: [],
      notes: [],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      tenantId: '2',
      propertyId: '2',
      unitId: '205',
      title: 'AC Not Working',
      description: 'Air conditioning unit is not cooling properly',
      category: 'hvac',
      priority: 'high',
      status: 'in_progress',
      images: [],
      assignedTo: 'tech-001',
      estimatedCost: 5000,
      scheduledDate: new Date('2024-02-10'),
      notes: [
        {
          id: '1',
          requestId: '2',
          userId: '1',
          note: 'Technician assigned and scheduled for repair',
          createdAt: new Date('2024-02-08')
        }
      ],
      createdAt: new Date('2024-02-05'),
      updatedAt: new Date('2024-02-08')
    }
  ]);

  const [leases, setLeases] = useState<Lease[]>([
    {
      id: '1',
      tenantId: '1',
      propertyId: '1',
      unitId: '101',
      startDate: new Date('2023-06-01'),
      endDate: new Date('2024-05-31'),
      monthlyRent: 25000,
      securityDeposit: 50000,
      status: 'active',
      terms: [
        'No pets allowed',
        'No smoking inside the premises',
        'Rent due on 1st of every month',
        'Security deposit refundable after lease termination'
      ],
      documents: [],
      renewalHistory: [],
      createdAt: new Date('2023-06-01'),
      updatedAt: new Date('2023-06-01')
    },
    {
      id: '2',
      tenantId: '2',
      propertyId: '2',
      unitId: '205',
      startDate: new Date('2024-08-15'),
      endDate: new Date('2025-08-14'),
      monthlyRent: 18000,
      securityDeposit: 36000,
      status: 'active',
      terms: [
        'Pets allowed with additional deposit',
        'No smoking inside the premises',
        'Rent due on 5th of every month',
        'Maintenance charges included in rent'
      ],
      documents: [],
      renewalHistory: [],
      createdAt: new Date('2024-08-15'),
      updatedAt: new Date('2024-08-15')
    }
  ]);

  // Property CRUD operations
  const addProperty = (propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProperty: Property = {
      ...propertyData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setProperties(prev => [...prev, newProperty]);
  };

  const updateProperty = (id: string, propertyData: Partial<Property>) => {
    setProperties(prev => prev.map(property => 
      property.id === id 
        ? { ...property, ...propertyData, updatedAt: new Date() }
        : property
    ));
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(property => property.id !== id));
    // Also delete related tenants, payments, etc.
    setTenants(prev => prev.filter(tenant => tenant.unitId !== id));
    setMaintenanceRequests(prev => prev.filter(request => request.propertyId !== id));
    setLeases(prev => prev.filter(lease => lease.propertyId !== id));
  };

  const getProperty = (id: string) => {
    return properties.find(property => property.id === id);
  };

  // Tenant CRUD operations
  const addTenant = (tenantData: Omit<Tenant, 'id' | 'createdAt'>) => {
    const newTenant: Tenant = {
      ...tenantData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setTenants(prev => [...prev, newTenant]);
  };

  const updateTenant = (id: string, tenantData: Partial<Tenant>) => {
    setTenants(prev => prev.map(tenant => 
      tenant.id === id 
        ? { ...tenant, ...tenantData }
        : tenant
    ));
  };

  const deleteTenant = (id: string) => {
    setTenants(prev => prev.filter(tenant => tenant.id !== id));
    // Also delete related payments, maintenance requests, etc.
    setPayments(prev => prev.filter(payment => payment.tenantId !== id));
    setMaintenanceRequests(prev => prev.filter(request => request.tenantId !== id));
    setLeases(prev => prev.filter(lease => lease.tenantId !== id));
  };

  const getTenant = (id: string) => {
    return tenants.find(tenant => tenant.id === id);
  };

  // Payment CRUD operations
  const addPayment = (paymentData: Omit<Payment, 'id'>) => {
    const newPayment: Payment = {
      ...paymentData,
      id: Date.now().toString()
    };
    setPayments(prev => [...prev, newPayment]);
  };

  const updatePayment = (id: string, paymentData: Partial<Payment>) => {
    setPayments(prev => prev.map(payment => 
      payment.id === id 
        ? { ...payment, ...paymentData }
        : payment
    ));
  };

  const deletePayment = (id: string) => {
    setPayments(prev => prev.filter(payment => payment.id !== id));
  };

  const getPayment = (id: string) => {
    return payments.find(payment => payment.id === id);
  };

  // Maintenance Request CRUD operations
  const addMaintenanceRequest = (requestData: Omit<MaintenanceRequest, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRequest: MaintenanceRequest = {
      ...requestData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setMaintenanceRequests(prev => [...prev, newRequest]);
  };

  const updateMaintenanceRequest = (id: string, requestData: Partial<MaintenanceRequest>) => {
    setMaintenanceRequests(prev => prev.map(request => 
      request.id === id 
        ? { ...request, ...requestData, updatedAt: new Date() }
        : request
    ));
  };

  const deleteMaintenanceRequest = (id: string) => {
    setMaintenanceRequests(prev => prev.filter(request => request.id !== id));
  };

  const getMaintenanceRequest = (id: string) => {
    return maintenanceRequests.find(request => request.id === id);
  };

  // Lease CRUD operations
  const addLease = (leaseData: Omit<Lease, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newLease: Lease = {
      ...leaseData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setLeases(prev => [...prev, newLease]);
  };

  const updateLease = (id: string, leaseData: Partial<Lease>) => {
    setLeases(prev => prev.map(lease => 
      lease.id === id 
        ? { ...lease, ...leaseData, updatedAt: new Date() }
        : lease
    ));
  };

  const deleteLease = (id: string) => {
    setLeases(prev => prev.filter(lease => lease.id !== id));
  };

  const getLease = (id: string) => {
    return leases.find(lease => lease.id === id);
  };

  const value: DataContextType = {
    // Properties
    properties,
    addProperty,
    updateProperty,
    deleteProperty,
    getProperty,

    // Tenants
    tenants,
    addTenant,
    updateTenant,
    deleteTenant,
    getTenant,

    // Payments
    payments,
    addPayment,
    updatePayment,
    deletePayment,
    getPayment,

    // Maintenance Requests
    maintenanceRequests,
    addMaintenanceRequest,
    updateMaintenanceRequest,
    deleteMaintenanceRequest,
    getMaintenanceRequest,

    // Leases
    leases,
    addLease,
    updateLease,
    deleteLease,
    getLease
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};