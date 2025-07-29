// User and Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'owner' | 'tenant';
  phone: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Property Types
export interface Property {
  id: string;
  name: string;
  address: string;
  type: 'apartment' | 'commercial' | 'villa' | 'house';
  totalUnits: number;
  occupiedUnits: number;
  vacantUnits: number;
  occupancyRate: number;
  monthlyRent: number;
  description?: string;
  amenities: string[];
  images: string[];
  ownerId: string;
  owner: PropertyOwner;
  units: Unit[];
  location: {
    latitude?: number;
    longitude?: number;
    city: string;
    state: string;
    zipCode: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyOwner {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  bankDetails: {
    accountNumber: string;
    bankName: string;
    ifscCode: string;
    accountHolderName: string;
  };
  propertyIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Unit {
  id: string;
  unitNumber: string;
  propertyId: string;
  type: 'studio' | '1bhk' | '2bhk' | '3bhk' | 'commercial' | 'other';
  area: number; // in sq ft
  monthlyRent: number;
  securityDeposit: number;
  status: 'occupied' | 'vacant' | 'maintenance';
  tenantId?: string;
  tenant?: Tenant;
  amenities: string[];
  floor: number;
  createdAt: Date;
  updatedAt: Date;
}

// Tenant Types
export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  address: string;
  unitId: string;
  unit?: Unit;
  propertyId: string;
  property?: Property;
  monthlyRent: number;
  securityDeposit: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
  rentDueDate: number; // day of month (1-31)
  paymentStatus: 'paid' | 'pending' | 'overdue';
  documents: TenantDocument[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  occupation: string;
  company?: string;
  monthlyIncome?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TenantDocument {
  id: string;
  tenantId: string;
  type: 'id_proof' | 'address_proof' | 'income_proof' | 'agreement' | 'other';
  fileName: string;
  fileUrl: string;
  uploadedAt: Date;
}

// Payment Types
export interface Payment {
  id: string;
  tenantId: string;
  tenant?: Tenant;
  propertyId: string;
  property?: Property;
  unitId: string;
  amount: number;
  type: 'rent' | 'security_deposit' | 'maintenance' | 'late_fee' | 'other';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: PaymentMethod;
  transactionId?: string;
  paymentDate: Date;
  dueDate: Date;
  paidDate?: Date;
  month: string; // YYYY-MM format
  year: number;
  description?: string;
  notes?: string;
  lateFee?: number;
  receiptUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentMethod {
  id: string;
  type: 'upi' | 'card' | 'netbanking' | 'bank_transfer' | 'cash' | 'cheque' | 'auto_debit';
  details: {
    // For UPI
    upiId?: string;
    upiApp?: 'gpay' | 'phonepe' | 'paytm' | 'other';
    
    // For Card
    cardNumber?: string; // masked
    cardType?: 'credit' | 'debit';
    
    // For Bank Transfer
    bankName?: string;
    accountNumber?: string; // masked
    ifscCode?: string;
    
    // For Cheque
    chequeNumber?: string;
    chequeDate?: Date;
    chequeStatus?: 'pending' | 'cleared' | 'bounced';
    
    // For Auto Debit
    mandateId?: string;
    mandateStatus?: 'active' | 'inactive' | 'pending';
  };
  isDefault: boolean;
  createdAt: Date;
}

// Lease Types
export interface Lease {
  id: string;
  tenantId: string;
  tenant?: Tenant;
  propertyId: string;
  property?: Property;
  unitId: string;
  unit?: Unit;
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
  securityDeposit: number;
  status: 'active' | 'expired' | 'terminated' | 'renewed';
  terms: string[];
  documents: LeaseDocument[];
  renewalHistory: LeaseRenewal[];
  terminationDate?: Date;
  terminationReason?: string;
  refundAmount?: number;
  refundStatus?: 'pending' | 'processed' | 'partial';
  createdAt: Date;
  updatedAt: Date;
}

export interface LeaseDocument {
  id: string;
  leaseId: string;
  type: 'agreement' | 'addendum' | 'renewal' | 'termination' | 'other';
  fileName: string;
  fileUrl: string;
  uploadedAt: Date;
}

export interface LeaseRenewal {
  id: string;
  leaseId: string;
  previousEndDate: Date;
  newEndDate: Date;
  previousRent: number;
  newRent: number;
  renewalDate: Date;
  terms: string[];
}

// Maintenance Types
export interface MaintenanceRequest {
  id: string;
  tenantId: string;
  tenant?: Tenant;
  propertyId: string;
  property?: Property;
  unitId: string;
  unit?: Unit;
  title: string;
  description: string;
  category: 'plumbing' | 'electrical' | 'hvac' | 'appliance' | 'structural' | 'cleaning' | 'painting' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  images: string[];
  assignedTo?: string; // vendor/technician ID
  estimatedCost?: number;
  actualCost?: number;
  scheduledDate?: Date;
  completedDate?: Date;
  notes: MaintenanceNote[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MaintenanceNote {
  id: string;
  requestId: string;
  userId: string;
  user?: User;
  note: string;
  images?: string[];
  createdAt: Date;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  user?: User;
  type: 'rent_reminder' | 'lease_expiry' | 'maintenance_update' | 'payment_confirmation' | 'system' | 'other';
  title: string;
  message: string;
  data?: any; // Additional data for the notification
  status: 'unread' | 'read';
  priority: 'low' | 'medium' | 'high';
  channels: ('email' | 'sms' | 'push' | 'in_app')[];
  scheduledAt?: Date;
  sentAt?: Date;
  readAt?: Date;
  createdAt: Date;
}

// Report Types
export interface Report {
  id: string;
  type: 'rent_collection' | 'occupancy' | 'maintenance' | 'financial' | 'tenant' | 'property';
  title: string;
  description?: string;
  filters: ReportFilters;
  data: any;
  generatedBy: string;
  generatedAt: Date;
  fileUrl?: string;
}

export interface ReportFilters {
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  propertyIds?: string[];
  tenantIds?: string[];
  status?: string[];
  category?: string[];
}

// Dashboard Types
export interface DashboardStats {
  totalProperties: number;
  totalUnits: number;
  occupiedUnits: number;
  vacantUnits: number;
  occupancyRate: number;
  totalTenants: number;
  newTenants: number;
  monthlyRevenue: number;
  pendingPayments: number;
  overduePayments: number;
  maintenanceRequests: {
    total: number;
    open: number;
    inProgress: number;
    urgent: number;
  };
  leaseExpirations: {
    next30Days: number;
    next60Days: number;
    next90Days: number;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface PropertyFormData {
  name: string;
  address: string;
  type: Property['type'];
  totalUnits: number;
  description?: string;
  amenities: string[];
  ownerId: string;
  location: {
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface TenantFormData {
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  address: string;
  unitId: string;
  monthlyRent: number;
  securityDeposit: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
  rentDueDate: number;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  occupation: string;
  company?: string;
  monthlyIncome?: number;
}

export interface PaymentFormData {
  tenantId: string;
  amount: number;
  type: Payment['type'];
  paymentMethod: PaymentMethod;
  dueDate: Date;
  month: string;
  description?: string;
}

export interface MaintenanceFormData {
  tenantId: string;
  propertyId: string;
  unitId: string;
  title: string;
  description: string;
  category: MaintenanceRequest['category'];
  priority: MaintenanceRequest['priority'];
  images?: File[];
}

// Filter and Search Types
export interface PropertyFilters {
  type?: Property['type'];
  occupancyStatus?: 'all' | 'occupied' | 'vacant';
  ownerId?: string;
  city?: string;
  rentRange?: {
    min: number;
    max: number;
  };
}

export interface TenantFilters {
  propertyId?: string;
  paymentStatus?: Tenant['paymentStatus'];
  leaseStatus?: 'active' | 'expiring_soon' | 'expired';
}

export interface PaymentFilters {
  status?: Payment['status'];
  type?: Payment['type'];
  dateRange?: {
    startDate: Date;
    endDate: Date;
  };
  tenantId?: string;
  propertyId?: string;
}

export interface MaintenanceFilters {
  status?: MaintenanceRequest['status'];
  priority?: MaintenanceRequest['priority'];
  category?: MaintenanceRequest['category'];
  propertyId?: string;
  assignedTo?: string;
}

// Utility Types
export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  field: string;
  order: SortOrder;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

// Error Types
export interface ValidationError {
  field: string;
  message: string;
}

export interface AppError {
  code: string;
  message: string;
  details?: any;
}