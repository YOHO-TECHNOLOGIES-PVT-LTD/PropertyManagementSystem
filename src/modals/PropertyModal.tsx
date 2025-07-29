import React, { useState, useEffect } from 'react';
import { X, Building2, User } from 'lucide-react';
import type { Property } from '../../types';

interface PropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (property: any) => void;
  property?: Property | null;
  mode: 'create' | 'edit' | 'view';
}

const PropertyModal: React.FC<PropertyModalProps> = ({
  isOpen,
  onClose,
  onSave,
  property,
  mode
}) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    type: 'apartment',
    totalUnits: 0,
    owner: {
      name: '',
      email: '',
      phone: '',
      address: '',
      bankDetails: {
        accountNumber: '',
        bankName: '',
        ifscCode: '',
        accountHolderName: ''
      }
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (property && (mode === 'edit' || mode === 'view')) {
      setFormData({
        name: property.name,
        address: property.address,
        type: property.type,
        totalUnits: property.totalUnits,
        owner: {
          name: property.owner.name,
          email: property.owner.email,
          phone: property.owner.phone,
          address: property.owner.address,
          bankDetails: {
            accountNumber: property.owner.bankDetails.accountNumber,
            bankName: property.owner.bankDetails.bankName,
            ifscCode: property.owner.bankDetails.ifscCode,
            accountHolderName: property.owner.bankDetails.accountHolderName
          }
        }
      });
    } else if (mode === 'create') {
      setFormData({
        name: '',
        address: '',
        type: 'apartment',
        totalUnits: 0,
        owner: {
          name: '',
          email: '',
          phone: '',
          address: '',
          bankDetails: {
            accountNumber: '',
            bankName: '',
            ifscCode: '',
            accountHolderName: ''
          }
        }
      });
    }
    setErrors({});
  }, [property, mode, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Property name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (formData.totalUnits <= 0) newErrors.totalUnits = 'Total units must be greater than 0';
    if (!formData.owner.name.trim()) newErrors.ownerName = 'Owner name is required';
    if (!formData.owner.email.trim()) newErrors.ownerEmail = 'Owner email is required';
    if (!formData.owner.phone.trim()) newErrors.ownerPhone = 'Owner phone is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'view') return;
    
    if (!validateForm()) return;

    const propertyData = {
      ...formData,
      occupiedUnits: property?.occupiedUnits || 0,
      vacantUnits: formData.totalUnits - (property?.occupiedUnits || 0),
      occupancyRate: property?.occupiedUnits ? (property.occupiedUnits / formData.totalUnits) * 100 : 0,
      ownerId: property?.ownerId || Date.now().toString(),
      owner: {
        ...formData.owner,
        id: property?.owner.id || Date.now().toString(),
        propertyIds: property?.owner.propertyIds || []
      },
      units: property?.units || []
    };

    onSave(propertyData);
    onClose();
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('owner.')) {
      const ownerField = field.replace('owner.', '');
      if (ownerField.startsWith('bankDetails.')) {
        const bankField = ownerField.replace('bankDetails.', '');
        setFormData(prev => ({
          ...prev,
          owner: {
            ...prev.owner,
            bankDetails: {
              ...prev.owner.bankDetails,
              [bankField]: value
            }
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          owner: {
            ...prev.owner,
            [ownerField]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Building2 className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              {mode === 'create' ? 'Add New Property' : 
               mode === 'edit' ? 'Edit Property' : 'Property Details'}
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
          {/* Property Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-blue-600" />
              Property Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Enter property name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                >
                  <option value="apartment">Apartment</option>
                  <option value="commercial">Commercial</option>
                  <option value="villa">Villa</option>
                  <option value="house">House</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={mode === 'view'}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Enter complete address"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Units *
                </label>
                <input
                  type="number"
                  value={formData.totalUnits}
                  onChange={(e) => handleInputChange('totalUnits', parseInt(e.target.value) || 0)}
                  disabled={mode === 'view'}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Enter total units"
                />
                {errors.totalUnits && <p className="text-red-500 text-xs mt-1">{errors.totalUnits}</p>}
              </div>
            </div>
          </div>

          {/* Owner Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-green-600" />
              Owner Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Owner Name *
                </label>
                <input
                  type="text"
                  value={formData.owner.name}
                  onChange={(e) => handleInputChange('owner.name', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Enter owner name"
                />
                {errors.ownerName && <p className="text-red-500 text-xs mt-1">{errors.ownerName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.owner.email}
                  onChange={(e) => handleInputChange('owner.email', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Enter email address"
                />
                {errors.ownerEmail && <p className="text-red-500 text-xs mt-1">{errors.ownerEmail}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={formData.owner.phone}
                  onChange={(e) => handleInputChange('owner.phone', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Enter phone number"
                />
                {errors.ownerPhone && <p className="text-red-500 text-xs mt-1">{errors.ownerPhone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Owner Address
                </label>
                <input
                  type="text"
                  value={formData.owner.address}
                  onChange={(e) => handleInputChange('owner.address', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Enter owner address"
                />
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Bank Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  value={formData.owner.bankDetails.accountNumber}
                  onChange={(e) => handleInputChange('owner.bankDetails.accountNumber', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Enter account number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  value={formData.owner.bankDetails.bankName}
                  onChange={(e) => handleInputChange('owner.bankDetails.bankName', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Enter bank name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  IFSC Code
                </label>
                <input
                  type="text"
                  value={formData.owner.bankDetails.ifscCode}
                  onChange={(e) => handleInputChange('owner.bankDetails.ifscCode', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Enter IFSC code"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  value={formData.owner.bankDetails.accountHolderName}
                  onChange={(e) => handleInputChange('owner.bankDetails.accountHolderName', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Enter account holder name"
                />
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
                {mode === 'create' ? 'Create Property' : 'Update Property'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyModal;