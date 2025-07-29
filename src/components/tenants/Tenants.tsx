import React, { useState } from 'react';
import { Plus, Search, Mail, Phone, Calendar, Edit, Eye, Trash2, MoreVertical } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import TenantModal from '../../modals/TenantModal';
import type { Tenant } from '../../types';

const Tenants: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');

  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState<Tenant | null>(null);

  const { tenants, addTenant, updateTenant, deleteTenant } = useData();

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.unitId?.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || tenant.paymentStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddTenant = () => {
    setModalMode('create');
    setSelectedTenant(null);
    setShowModal(true);
  };

  const handleEditTenant = (tenant: any) => {
    setModalMode('edit');
    setSelectedTenant(tenant);
    setShowModal(true);
  };

  const handleViewTenant = (tenant: any) => {
    setModalMode('view');
    setSelectedTenant(tenant);
    setShowModal(true);
  };

  const handleDeleteTenant = (tenant: any) => {
    setTenantToDelete(tenant);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (tenantToDelete && typeof tenantToDelete === 'object' && 'id' in tenantToDelete) {
      deleteTenant(tenantToDelete.id);
      setShowDeleteConfirm(false);
      setTenantToDelete(null);
    }
  };

  const handleSaveTenant = (tenantData: any) => {
    if (modalMode === 'create') {
      addTenant(tenantData);
    } else if (modalMode === 'edit' && selectedTenant && 'id' in selectedTenant) {
      updateTenant((selectedTenant as { id: string }).id, tenantData);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilLeaseExpiry = (endDate: Date) => {
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tenants</h1>
          <p className="text-gray-600">Manage tenant information ({tenants.length} tenants)</p>
        </div>
        <button 
          onClick={handleAddTenant}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Tenant</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tenants</p>
              <p className="text-2xl font-bold text-gray-900">{tenants.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Paid This Month</p>
              <p className="text-2xl font-bold text-green-600">
                {tenants.filter(t => t.paymentStatus === 'paid').length}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Payments</p>
              <p className="text-2xl font-bold text-yellow-600">
                {tenants.filter(t => t.paymentStatus === 'pending').length}
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">
                {tenants.filter(t => t.paymentStatus === 'overdue').length}
              </p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <Calendar className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tenants by name, email, or unit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Tenants Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTenants.map((tenant) => {
          const daysUntilExpiry = getDaysUntilLeaseExpiry(tenant.leaseEndDate);
          
          return (
            <div key={tenant.id} className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-md transition-shadow">
              {/* Tenant Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-lg">
                      {tenant.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{tenant.name}</h3>
                    <p className="text-sm text-gray-600">Unit {tenant.unitId}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(tenant.paymentStatus)}`}>
                    {tenant.paymentStatus}
                  </span>
                  <div className="relative">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{tenant.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{tenant.phone}</span>
                </div>
              </div>

              {/* Financial Info */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-600 font-medium">Monthly Rent</p>
                  <p className="text-lg font-bold text-blue-900">₹{tenant.monthlyRent.toLocaleString()}</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-green-600 font-medium">Security Deposit</p>
                  <p className="text-lg font-bold text-green-900">₹{tenant.securityDeposit.toLocaleString()}</p>
                </div>
              </div>

              {/* Lease Info */}
              <div className="p-3 bg-gray-50 rounded-lg mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Lease Period</p>
                    <p className="text-sm text-gray-900 font-semibold">
                      {formatDate(tenant.leaseStartDate)} - {formatDate(tenant.leaseEndDate)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 font-medium">Days Remaining</p>
                    <p className={`text-sm font-bold ${daysUntilExpiry <= 30 ? 'text-red-600' : 'text-green-600'}`}>
                      {daysUntilExpiry > 0 ? `${daysUntilExpiry} days` : 'Expired'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              {tenant.emergencyContact && (
                <div className="p-3 bg-yellow-50 rounded-lg mb-4">
                  <p className="text-xs text-yellow-600 font-medium mb-1">Emergency Contact</p>
                  <p className="text-sm text-yellow-900 font-semibold">{tenant.emergencyContact.name}</p>
                  <p className="text-xs text-yellow-700">{tenant.emergencyContact.phone} ({tenant.emergencyContact.relationship})</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleViewTenant(tenant)}
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button 
                  onClick={() => handleEditTenant(tenant)}
                  className="bg-gray-100 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteTenant(tenant)}
                  className="bg-red-100 text-red-700 py-2 px-3 rounded-md hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredTenants.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tenants found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by adding your first tenant.'
            }
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <button
              onClick={handleAddTenant}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Tenant
            </button>
          )}
        </div>
      )}

      {/* Tenant Modal */}
      <TenantModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveTenant}
        tenant={selectedTenant as Tenant | null | undefined}
        mode={modalMode}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Tenant</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{tenantToDelete && typeof tenantToDelete === 'object' && tenantToDelete !== null && (tenantToDelete as { name?: string }).name ? (tenantToDelete as { name?: string }).name : ''}"? This action cannot be undone and will also remove all associated payments and lease data.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tenants;