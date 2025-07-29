import React, { useState, useEffect } from 'react';
import { X, DollarSign, CreditCard } from 'lucide-react';
import type { Payment } from '../../types';
import { useData } from '../../contexts/DataContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payment: any) => void;
  payment?: Payment | null;
  mode: 'create' | 'edit' | 'view';
}

interface PaymentFormData {
  tenantId: string;
  amount: number;
  dueDate: string;
  paidDate: string;
  status: string;
  paymentMethod: {
    type: string;
    details: {
      upiId?: string;
      cardLast4?: string;
      bankName?: string;
      chequeNumber?: string;
      [key: string]: any;
    };
  };
  transactionId: string;
  month: string;
  year: number;
  lateFee: number;
  notes: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  payment,
  mode
}) => {
  const { tenants } = useData();
  
  const [formData, setFormData] = useState<PaymentFormData>({
    tenantId: '',
    amount: 0,
    dueDate: '',
    paidDate: '',
    status: 'pending',
    paymentMethod: {
      type: 'upi',
      details: {}
    },
    transactionId: '',
    month: '',
    year: new Date().getFullYear(),
    lateFee: 0,
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (payment && (mode === 'edit' || mode === 'view')) {
      setFormData({
        tenantId: payment.tenantId || '',
        amount: payment.amount,
        dueDate: payment.dueDate.toISOString().split('T')[0],
        paidDate: payment?.paidDate ? payment.paidDate.toISOString().split('T')[0] : '',
        status: payment.status,
        paymentMethod: payment.paymentMethod || { type: 'upi', details: {} },
        transactionId: payment.transactionId || '',
        month: payment.month || '',
        year: payment.year || new Date().getFullYear(),
        lateFee: payment?.lateFee || 0,
        notes: payment?.notes || ''
      });
    } else if (mode === 'create') {
      const currentDate = new Date();
      const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
      
      setFormData({
        tenantId: '',
        amount: 0,
        dueDate: '',
        paidDate: '',
        status: 'pending',
        paymentMethod: {
          type: 'upi',
          details: {}
        },
        transactionId: '',
        month: currentMonth,
        year: currentDate.getFullYear(),
        lateFee: 0,
        notes: ''
      });
    }
    setErrors({});
  }, [payment, mode, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.tenantId) newErrors.tenantId = 'Tenant is required';
    if (formData.amount <= 0) newErrors.amount = 'Amount must be greater than 0';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    if (!formData.month) newErrors.month = 'Month is required';
    if (formData.status === 'paid' && !formData.paidDate) {
      newErrors.paidDate = 'Paid date is required for paid status';
    }
    if (formData.status === 'paid' && !formData.transactionId) {
      newErrors.transactionId = 'Transaction ID is required for paid status';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'view') return;
    
    if (!validateForm()) return;

    const paymentData = {
      ...formData,
      amount: Number(formData.amount),
      lateFee: Number(formData.lateFee),
      year: Number(formData.year),
      dueDate: new Date(formData.dueDate),
      paidDate: formData.paidDate ? new Date(formData.paidDate) : undefined,
      tenant: tenants.find(t => t.id === formData.tenantId)
    };

    onSave(paymentData);
    onClose();
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('paymentMethod.')) {
      const methodField = field.replace('paymentMethod.', '');
      if (methodField === 'type') {
        setFormData(prev => ({
          ...prev,
          paymentMethod: {
            type: value,
            details: {}
          }
        }));
      } else if (methodField.startsWith('details.')) {
        const detailField = methodField.replace('details.', '');
        setFormData(prev => ({
          ...prev,
          paymentMethod: {
            ...prev.paymentMethod,
            details: {
              ...prev.paymentMethod.details,
              [detailField]: value
            }
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          paymentMethod: {
            ...prev.paymentMethod,
            [methodField]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }

    // Auto-populate tenant rent amount
    if (field === 'tenantId') {
      const selectedTenant = tenants.find(t => t.id === value);
      if (selectedTenant) {
        setFormData(prev => ({
          ...prev,
          amount: selectedTenant.monthlyRent
        }));
      }
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const paymentMethods = [
    { value: 'upi', label: 'UPI' },
    { value: 'card', label: 'Credit/Debit Card' },
    { value: 'netbanking', label: 'Net Banking' },
    { value: 'cheque', label: 'Cheque' },
    { value: 'cash', label: 'Cash' },
    { value: 'bank_transfer', label: 'Bank Transfer' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <DollarSign className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              {mode === 'create' ? 'Record Payment' : 
               mode === 'edit' ? 'Edit Payment' : 'Payment Details'}
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
          {/* Payment Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-600" />
              Payment Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tenant *
                </label>
                <select
                  value={formData.tenantId}
                  onChange={(e) => handleInputChange('tenantId', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                >
                  <option value="">Select Tenant</option>
                  {tenants.map(tenant => (
                    <option key={tenant.id} value={tenant.id}>
                      {tenant.name} - Unit {tenant.unitId}
                    </option>
                  ))}
                </select>
                {errors.tenantId && <p className="text-red-500 text-xs mt-1">{errors.tenantId}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount *
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  disabled={mode === 'view'}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Enter amount"
                />
                {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Month *
                </label>
                <select
                  value={formData.month}
                  onChange={(e) => handleInputChange('month', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                >
                  <option value="">Select Month</option>
                  {months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
                {errors.month && <p className="text-red-500 text-xs mt-1">{errors.month}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  disabled={mode === 'view'}
                  min="2020"
                  max="2030"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date *
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
                {errors.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>

              {formData.status === 'paid' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Paid Date
                  </label>
                  <input
                    type="date"
                    value={formData.paidDate}
                    onChange={(e) => handleInputChange('paidDate', e.target.value)}
                    disabled={mode === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  />
                  {errors.paidDate && <p className="text-red-500 text-xs mt-1">{errors.paidDate}</p>}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Late Fee
                </label>
                <input
                  type="number"
                  value={formData.lateFee}
                  onChange={(e) => handleInputChange('lateFee', e.target.value)}
                  disabled={mode === 'view'}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Enter late fee"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
              Payment Method
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Method
                </label>
                <select
                  value={formData.paymentMethod.type}
                  onChange={(e) => handleInputChange('paymentMethod.type', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                >
                  {paymentMethods.map(method => (
                    <option key={method.value} value={method.value}>{method.label}</option>
                  ))}
                </select>
              </div>

              {formData.status === 'paid' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transaction ID
                  </label>
                  <input
                    type="text"
                    value={formData.transactionId}
                    onChange={(e) => handleInputChange('transactionId', e.target.value)}
                    disabled={mode === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    placeholder="Enter transaction ID"
                  />
                  {errors.transactionId && <p className="text-red-500 text-xs mt-1">{errors.transactionId}</p>}
                </div>
              )}

              {/* Payment Method Specific Fields */}
              {formData.paymentMethod.type === 'upi' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    value={formData.paymentMethod.details?.upiId || ''}
                    onChange={(e) => handleInputChange('paymentMethod.details.upiId', e.target.value)}
                    disabled={mode === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    placeholder="Enter UPI ID"
                  />
                </div>
              )}

              {formData.paymentMethod.type === 'card' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Last 4 Digits
                  </label>
                  <input
                    type="text"
                    value={formData.paymentMethod.details?.cardLast4 || ''}
                    onChange={(e) => handleInputChange('paymentMethod.details.cardLast4', e.target.value)}
                    disabled={mode === 'view'}
                    maxLength={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    placeholder="Last 4 digits"
                  />
                </div>
              )}

              {formData.paymentMethod.type === 'netbanking' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={formData.paymentMethod.details?.bankName || ''}
                    onChange={(e) => handleInputChange('paymentMethod.details.bankName', e.target.value)}
                    disabled={mode === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    placeholder="Enter bank name"
                  />
                </div>
              )}

              {formData.paymentMethod.type === 'cheque' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cheque Number
                  </label>
                  <input
                    type="text"
                    value={formData.paymentMethod.details?.chequeNumber || ''}
                    onChange={(e) => handleInputChange('paymentMethod.details.chequeNumber', e.target.value)}
                    disabled={mode === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    placeholder="Enter cheque number"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              disabled={mode === 'view'}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              placeholder="Add any additional notes..."
            />
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
                {mode === 'create' ? 'Record Payment' : 'Update Payment'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;