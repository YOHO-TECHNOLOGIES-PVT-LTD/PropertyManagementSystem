import React, { useState, useEffect } from 'react';
import { X, User, Phone, DollarSign, Calendar } from 'lucide-react';
import type { Tenant } from '../../types';

interface TenantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tenant: any) => void;
  tenant?: Tenant | null;
  mode: 'create' | 'edit' | 'view';
}

const TenantModal: React.FC<TenantModalProps> = ({
  isOpen,
  onClose,
  onSave,
  tenant,
  mode
}) => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    unitId: '',
    monthlyRent: 0,
    securityDeposit: 0,
    leaseStartDate: '',
    leaseEndDate: '',
    paymentStatus: 'pending',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (tenant && (mode === 'edit' || mode === 'view')) {
      setFormData({
        name: tenant.name,
        email: tenant.email,
        phone: tenant.phone,
        unitId: tenant.unitId || '',
        monthlyRent: tenant.monthlyRent,
        securityDeposit: tenant.securityDeposit,
        leaseStartDate: tenant.leaseStartDate.toISOString().split('T')[0],
        leaseEndDate: tenant.leaseEndDate.toISOString().split('T')[0],
        paymentStatus: tenant.paymentStatus,
        emergencyContact: {
          name: tenant.emergencyContact?.name || '',
          phone: tenant.emergencyContact?.phone || '',
          relationship: tenant.emergencyContact?.relationship || ''
        }
      });
    } else if (mode === 'create') {
      setFormData({
        name: '',
        email: '',
        phone: '',
        unitId: '',
        monthlyRent: 0,
        securityDeposit: 0,
        leaseStartDate: '',
        leaseEndDate: '',
        paymentStatus: 'pending',
        emergencyContact: {
          name: '',
          phone: '',
          relationship: ''
        }
      });
    }
    setErrors({});
  }, [tenant, mode, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Tenant name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.unitId.trim()) newErrors.unitId = 'Unit is required';
    if (formData.monthlyRent <= 0) newErrors.monthlyRent = 'Monthly rent must be greater than 0';
    if (formData.securityDeposit < 0) newErrors.securityDeposit = 'Security deposit cannot be negative';
    if (!formData.leaseStartDate) newErrors.leaseStartDate = 'Lease start date is required';
    if (!formData.leaseEndDate) newErrors.leaseEndDate = 'Lease end date is required';

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate dates
    if (formData.leaseStartDate && formData.leaseEndDate) {
      const startDate = new Date(formData.leaseStartDate);
      const endDate = new Date(formData.leaseEndDate);
      if (endDate <= startDate) {
        newErrors.leaseEndDate = 'End date must be after start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'view') return;
    
    if (!validateForm()) return;

    const tenantData = {
      ...formData,
      monthlyRent: Number(formData.monthlyRent),
      securityDeposit: Number(formData.securityDeposit),
      leaseStartDate: new Date(formData.leaseStartDate),
      leaseEndDate: new Date(formData.leaseEndDate),
      documents: tenant?.documents || []
    };

    onSave(tenantData);
    onClose();
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('emergencyContact.')) {
      const contactField = field.replace('emergencyContact.', '');
      setFormData(prev => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact,
          [contactField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Generate available units (mock data)
  const availableUnits = [
    '101', '102', '103', '201', '202', '203', '301', '302', '303'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              {mode === 'create' ? 'Add New Tenant' : 
               mode === 'edit' ? 'Edit Tenant' : 'Tenant Details'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Enter full name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Enter email address"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Enter phone number"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit *
                </label>
                <select
                  value={formData.unitId}
                  onChange={(e) => handleInputChange('unitId', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                >
                  <option value="">Select Unit</option>
                  {availableUnits.map(unit => (
                    <option key={unit} value={unit}>Unit {unit}</option>
                  ))}
                </select>
                {errors.unitId && <p className="text-red-500 text-xs mt-1">{errors.unitId}</p>}
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-600" />
              Financial Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Rent *
                </label>
                <input
                  type="number"
                  value={formData.monthlyRent}
                  onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                  disabled={mode === 'view'}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Enter monthly rent"
                />
                {errors.monthlyRent && <p className="text-red-500 text-xs mt-1">{errors.monthlyRent}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Security Deposit
                </label>
                <input
                  type="number"
                  value={formData.securityDeposit}
                  onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                  disabled={mode === 'view'}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Enter security deposit"
                />
                {errors.securityDeposit && <p className="text-red-500 text-xs mt-1">{errors.securityDeposit}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Status
                </label>
                <select
                  value={formData.paymentStatus}
                  onChange={(e) => handleInputChange('paymentStatus', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                >
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>
          </div>

          {/* Lease Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-purple-600" />
              Lease Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lease Start Date *
                </label>
                <input
                  type="date"
                  value={formData.leaseStartDate}
                  onChange={(e) => handleInputChange('leaseStartDate', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
                {errors.leaseStartDate && <p className="text-red-500 text-xs mt-1">{errors.leaseStartDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lease End Date *
                </label>
                <input
                  type="date"
                  value={formData.leaseEndDate}
                  onChange={(e) => handleInputChange('leaseEndDate', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
                {errors.leaseEndDate && <p className="text-red-500 text-xs mt-1">{errors.leaseEndDate}</p>}
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-red-600" />
              Emergency Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Name
                </label>
                <input
                  type="text"
                  value={formData.emergencyContact.name}
                  onChange={(e) => handleInputChange('emergencyContact.name', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Enter contact name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={formData.emergencyContact.phone}
                  onChange={(e) => handleInputChange('emergencyContact.phone', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Enter contact phone"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relationship
                </label>
                <select
                  value={formData.emergencyContact.relationship}
                  onChange={(e) => handleInputChange('emergencyContact.relationship', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                >
                  <option value="">Select Relationship</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Friend">Friend</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              {mode === 'view' ? 'Close' : 'Cancel'}
            </button>
            {mode !== 'view' && (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
              >
                {mode === 'create' ? 'Add Tenant' : 'Update Tenant'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenantModal;