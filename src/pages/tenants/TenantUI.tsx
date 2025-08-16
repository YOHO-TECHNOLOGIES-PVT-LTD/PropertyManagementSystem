import { useState } from 'react';
import { PlusIcon, EnvelopeIcon, PhoneIcon, BuildingOffice2Icon, EyeIcon, MagnifyingGlassIcon, PencilSquareIcon, TrashIcon, XMarkIcon, ChevronDownIcon, BuildingOfficeIcon } from '@heroicons/react/24/solid';

type Tenant = {
  id: number;
  name: string;
  unit: string;
  email: string;
  phone: string;
  monthlyRent: string;
  leasePeriod: string;
  emergencyContact: {
    name: string;
    phone: string;
  };
  securityDeposit: string;
  leaseStatus: string;
  daysRemaining: string;
};

export default function TenantManagement() {
  const [tenants, setTenants] = useState<Tenant[]>([
    {
      id: 1,
      name: 'John Doe',
      unit: 'Unit 101',
      email: 'john.doe@gmail.com',
      phone: '+91 9876564458',
      monthlyRent: '25,000',
      leasePeriod: 'Jun 1, 2025 - May 31, 2025',
      emergencyContact: {
        name: 'Jane Doe',
        phone: '+91 9876567876',
      },
      securityDeposit: '50,000',
      leaseStatus: 'Expired',
      daysRemaining: 'Expired',
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      unit: 'Unit 102',
      email: 'sarah.wilson@email.com',
      phone: '+91 9525666448',
      monthlyRent: '18,000',
      leasePeriod: 'Jun 15, 2025 - Aug 14, 2025',
      emergencyContact: {
        name: 'Robert Wilson',
        phone: '+91 95256647576',
      },
      securityDeposit: '36,000',
      leaseStatus: 'Active',
      daysRemaining: '6 Days',
    },
  ]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState<Tenant | null>(null);
  const [addTenantModalOpen, setAddTenantModalOpen] = useState(false);
  const [viewTenantModalOpen, setViewTenantModalOpen] = useState(false);
  const [editTenantModalOpen, setEditTenantModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All Types');

  // Dropdown options
  const propertyTypes = ['Apartment', 'House', 'Condo', 'Townhouse'];
  const tenantTypes = ['Individual', 'Family', 'Company'];
  const units = ['Unit 101', 'Unit 102', 'Unit 103', 'Unit 201', 'Unit 202'];
  const paymentStatuses = ['Paid', 'Pending', 'Overdue'];
  const relationships = ['Spouse', 'Parent', 'Sibling', 'Friend', 'Other'];

  const stats = {
    totalTenants: tenants.length,
    paidThisMonth: 1,
    pendingPayments: 0,
    overdue: 0,
  };

  const handleDeleteClick = (tenant: Tenant) => {
    setTenantToDelete(tenant);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (tenantToDelete) {
      setTenants(tenants.filter(tenant => tenant.id !== tenantToDelete.id));
    }
    setDeleteModalOpen(false);
    setTenantToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setTenantToDelete(null);
  };

  const handleAddTenantClick = () => {
    setAddTenantModalOpen(true);
  };

  const handleAddTenantClose = () => {
    setAddTenantModalOpen(false);
  };

  const handleViewTenant = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setViewTenantModalOpen(true);
  };

  const handleViewClose = () => {
    setViewTenantModalOpen(false);
    setSelectedTenant(null);
  };

  const handleEditTenant = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setEditTenantModalOpen(true);
  };

  const handleEditClose = () => {
    setEditTenantModalOpen(false);
    setSelectedTenant(null);
  };

  const toggleFilterDropdown = () => {
    setFilterDropdownOpen(!filterDropdownOpen);
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setFilterDropdownOpen(false);
  };

  // Common modal content component
  const TenantModalContent = ({ mode, tenant, onClose }: { mode: 'add' | 'view' | 'edit', tenant: Tenant | null, onClose: () => void }) => {
    return (
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header with building icon */}
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-white py-2">
            <div className="flex items-center">
              <BuildingOfficeIcon className="h-6 w-6 text-gray-600 mr-2" />
              <h2 className="text-xl font-bold">
                {mode === 'add' ? 'Add New Tenant' : mode === 'edit' ? 'Edit Tenant' : 'Tenant Details'}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Gray line divider */}
          <div className="border-t border-gray-300 mb-6"></div>

          {/* Personal Information Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <BuildingOffice2Icon className="h-5 w-5 text-gray-600 mr-2" />
              <h3 className="text-md font-semibold">Personal Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Column */}
              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter Full Name"
                      value={mode === 'view' ? tenant?.name || '' : ''}
                      readOnly={mode === 'view'}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="Enter Phone Number"
                      value={mode === 'view' ? tenant?.phone || '' : ''}
                      readOnly={mode === 'view'}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                    />
                  </div>
                </div>

                {/* Property Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Name</label>
                  <div className="relative">
                    <select
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                      disabled={mode === 'view'}
                    >
                      <option value="">Select Property Name</option>
                      <option value="Property 1">Property 1</option>
                      <option value="Property 2">Property 2</option>
                      <option value="Property 3">Property 3</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Tenants Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tenants Address</label>
                  <textarea
                    placeholder="Enter Tenants Address"
                    rows={3}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                    readOnly={mode === 'view'}
                  />
                </div>
              </div>

              {/* Second Column */}
              <div className="space-y-4">
                {/* Email Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter Email Address"
                      value={mode === 'view' ? tenant?.email || '' : ''}
                      readOnly={mode === 'view'}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                    />
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                  <div className="relative">
                    <select
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                      disabled={mode === 'view'}
                    >
                      <option value="">Select Property Type</option>
                      {propertyTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Unit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <div className="relative">
                    <select
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                      disabled={mode === 'view'}
                    >
                      <option value="">Select Unit</option>
                      {units.map((unit) => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Tenants Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tenants Type</label>
                  <div className="relative">
                    <select
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                      disabled={mode === 'view'}
                    >
                      <option value="">Select Tenants Type</option>
                      {tenantTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Information Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <BuildingOffice2Icon className="h-5 w-5 text-gray-600 mr-2" />
              <h3 className="text-md font-semibold">Financial Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Column */}
              <div className="space-y-4">
                {/* Monthly Rent */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent</label>
                  <input
                    type="text"
                    placeholder="Enter Monthly Rent"
                    value={mode === 'view' ? tenant?.monthlyRent || '' : ''}
                    readOnly={mode === 'view'}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                  />
                </div>
                
                {/* Payment Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                  <div className="relative">
                    <select
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                      disabled={mode === 'view'}
                    >
                      <option value="">Enter Payment Status</option>
                      {paymentStatuses.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Column */}
              <div className="space-y-4">
                {/* Security Deposit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Security Deposit</label>
                  <input
                    type="text"
                    placeholder="Enter Security Deposit"
                    value={mode === 'view' ? tenant?.securityDeposit || '' : ''}
                    readOnly={mode === 'view'}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                  />
                </div>
                
                {/* GST */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GST</label>
                  <input
                    type="text"
                    placeholder="Enter GST"
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                    readOnly={mode === 'view'}
                  />
                </div>
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* First Column */}
              <div className="space-y-4">
                {/* CGST */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CGST</label>
                  <input
                    type="text"
                    placeholder="Enter CGST"
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                    readOnly={mode === 'view'}
                  />
                </div>
                
                {/* Maintenance Charge */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Charge</label>
                  <input
                    type="text"
                    placeholder="Enter Maintenance Charge"
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                    readOnly={mode === 'view'}
                  />
                </div>
              </div>

              {/* Second Column */}
              <div className="space-y-4">
                {/* SGST */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SGST</label>
                  <input
                    type="text"
                    placeholder="Enter SGST"
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                    readOnly={mode === 'view'}
                  />
                </div>
                
                {/* TDS */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">TDS</label>
                  <input
                    type="text"
                    placeholder="Enter TDS"
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                    readOnly={mode === 'view'}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Lease/Rent Information Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <BuildingOffice2Icon className="h-5 w-5 text-gray-600 mr-2" />
              <h3 className="text-md font-semibold">Lease / Rent Information</h3>
            </div>
            
            {/* Lease Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lease Start Date</label>
                <input
                  type="date"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                  readOnly={mode === 'view'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lease End Date</label>
                <input
                  type="date"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                  readOnly={mode === 'view'}
                />
              </div>
            </div>

            {/* Emergency Contact Section */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <BuildingOffice2Icon className="h-5 w-5 text-gray-600 mr-2" />
                <h3 className="text-md font-semibold">Emergency Contact</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                  <input
                    type="text"
                    placeholder="Enter Contact Name"
                    value={mode === 'view' ? tenant?.emergencyContact.name || '' : ''}
                    readOnly={mode === 'view'}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    placeholder="Enter Contact Phone"
                    value={mode === 'view' ? tenant?.emergencyContact.phone || '' : ''}
                    readOnly={mode === 'view'}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center mb-4">
                  <BuildingOffice2Icon className="h-5 w-5 text-gray-600 mr-2" />
                  <h3 className="text-md font-semibold">Relationship</h3>
                </div>
                <div className="relative">
                  <select
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                    disabled={mode === 'view'}
                  >
                    <option value="">Select Relationship</option>
                    {relationships.map((relation) => (
                      <option key={relation} value={relation}>{relation}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Details Section */}
            <div>
              <div className="flex items-center mb-4">
                <BuildingOffice2Icon className="h-5 w-5 text-gray-600 mr-2" />
                <h3 className="text-md font-semibold">Bank Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                  <input
                    type="text"
                    placeholder="Enter Account Number"
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                    readOnly={mode === 'view'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                  <input
                    type="text"
                    placeholder="Enter Bank Name"
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                    readOnly={mode === 'view'}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                  <input
                    type="text"
                    placeholder="Enter IFSC Code"
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                    readOnly={mode === 'view'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
                  <input
                    type="text"
                    placeholder="Enter Account Holder Name"
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${mode === 'view' ? 'bg-gray-100' : 'focus:ring-2 focus:ring-purple-600 focus:border-transparent'}`}
                    readOnly={mode === 'view'}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex justify-end space-x-4 sticky bottom-0 bg-white py-4">
            {mode === 'view' ? (
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 text-sm font-medium"
              >
                Cancel
              </button>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium"
                >
                  {mode === 'add' ? 'Add Tenant' : 'Update Tenant'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Delete Tenant</h2>
            <p className="mb-6">
              Are you sure you want to delete "{tenantToDelete?.name}"? This action cannot be undone and will also remove all associated payments and lease data.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Tenant Modal */}
      {addTenantModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <TenantModalContent mode="add" tenant={null} onClose={handleAddTenantClose} />
        </div>
      )}

      {/* View Tenant Modal */}
      {viewTenantModalOpen && selectedTenant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <TenantModalContent mode="view" tenant={selectedTenant} onClose={handleViewClose} />
        </div>
      )}

      {/* Edit Tenant Modal */}
      {editTenantModalOpen && selectedTenant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <TenantModalContent mode="edit" tenant={selectedTenant} onClose={handleEditClose} />
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow p-3 mb-4 w-full">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-lg font-bold text-gray-800">Tenants</h1>
              <p className="text-xs text-gray-600 mt-1">Manage Tenant Information ({tenants.length} Tenants)</p>
            </div>
            <button 
              onClick={handleAddTenantClick}
              className="flex items-center justify-center gap-2 px-3 py-1 rounded-lg transition-colors hover:bg-purple-800 whitespace-nowrap text-sm"
              style={{
                backgroundColor: '#B200FF',
                color: '#FFFFFF',
                height: '32px',
                width: '110px'
              }}
            >
              <PlusIcon className="h-4 w-4" />
              <span>Add Tenants</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xs font-medium text-gray-500">Total Tenants</h3>
            <p className="text-xl font-semibold">{stats.totalTenants}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xs font-medium text-gray-500">Paid this Month</h3>
            <p className="text-xl font-semibold">{stats.paidThisMonth}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xs font-medium text-gray-500">Pending Payments</h3>
            <p className="text-xl font-semibold">{stats.pendingPayments}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xs font-medium text-gray-500">Overdue</h3>
            <p className="text-xl font-semibold">{stats.overdue}</p>
          </div>
        </div>

        {/* Search and Tenant List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-3 border-b flex justify-between items-center">
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-1.5 border rounded-lg w-full text-sm"
              />
            </div>
            <div className="relative">
              <button 
                onClick={toggleFilterDropdown}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
              >
                <span className="text-[#B200FF]">{selectedFilter}</span>
                <ChevronDownIcon className="h-4 w-4 text-gray-600" />
              </button>
              {filterDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                  <div className="p-2 space-y-2">
                    <button
                      onClick={() => handleFilterSelect('All Types')}
                      className="block w-full px-4 py-2 text-sm text-left text-[#B200FF] hover:bg-gray-50 rounded-md border border-gray-100"
                    >
                      All Types
                    </button>
                    <button
                      onClick={() => handleFilterSelect('Paid')}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 rounded-md border border-gray-100"
                    >
                      Paid
                    </button>
                    <button
                      onClick={() => handleFilterSelect('Pending')}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 rounded-md border border-gray-100"
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => handleFilterSelect('Overdue')}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 rounded-md border border-gray-100"
                    >
                      Overdue
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tenant Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3">
            {tenants.map((tenant) => (
              <div key={tenant.id} className="bg-white p-4 rounded-lg border w-full">
                <div className="flex flex-col">
                  {/* Header with name and action buttons */}
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-gray-600 text-xs">
                            {tenant.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h2 className="font-bold text-base" style={{ fontWeight: 700 }}>
                            {tenant.name}
                          </h2>
                        </div>
                      </div>
                      <p className="font-semibold text-sm text-[#7D7D7D] mt-0 ml-10" style={{ fontWeight: 600 }}>
                        {tenant.unit}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        className="text-gray-500 hover:text-blue-600"
                        onClick={() => handleEditTenant(tenant)}
                      >
                        <PencilSquareIcon className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-gray-500 hover:text-red-600"
                        onClick={() => handleDeleteClick(tenant)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Contact info with more space */}
                  <div className="flex items-center space-x-3 mt-1 ml-10">
                    <div className="flex items-center space-x-1">
                      <EnvelopeIcon className="h-3 w-3 text-[#7D7D7D]" />
                      <span className="font-semibold text-[#7D7D7D] text-xs" style={{ fontWeight: 600 }}>
                        {tenant.email}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <PhoneIcon className="h-3 w-3 text-[#7D7D7D]" />
                      <span className="font-semibold text-[#7D7D7D] text-xs" style={{ fontWeight: 600 }}>
                        {tenant.phone}
                      </span>
                    </div>
                  </div>

                  {/* Rent and Deposit Cards */}
                  <div className="flex gap-3 my-3">
                    <div className="w-40 bg-gray-50 p-1.5 rounded-lg flex items-start gap-1.5">
                      <BuildingOffice2Icon className="h-3 w-3 text-[#7D7D7D] mt-1" />
                      <div>
                        <p className="font-bold text-[11px] text-[#7D7D7D]" style={{ fontWeight: 700 }}>
                          Monthly Rent
                        </p>
                        <p className="font-bold text-[11px] text-[#0062FF]" style={{ fontWeight: 700 }}>
                          ₹{tenant.monthlyRent}
                        </p>
                      </div>
                    </div>
                    <div className="w-40 bg-gray-50 p-1.5 rounded-lg flex items-start gap-1.5 ml-auto">
                      <BuildingOffice2Icon className="h-3 w-3 text-[#7D7D7D] mt-1" />
                      <div>
                        <p className="font-bold text-[11px] text-[#7D7D7D]" style={{ fontWeight: 700 }}>
                          Security Deposit
                        </p>
                        <p className="font-bold text-[11px] text-[#1EC95A]" style={{ fontWeight: 700 }}>
                          ₹{tenant.securityDeposit}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Lease Period and Days Remaining */}
                  <div className="flex justify-between items-center mb-2">
                    <div className="w-40">
                      <p className="font-medium text-[11px] text-[#7D7D7D]" style={{ fontWeight: 500 }}>
                        Lease Period
                      </p>
                      <p className="font-bold text-[13px] text-[#000000] mt-0.5" style={{ fontWeight: 700 }}>
                        {tenant.leasePeriod}
                      </p>
                    </div>
                    <div className="w-40 text-right">
                      <p className="font-medium text-[11px] text-[#7D7D7D]" style={{ fontWeight: 500 }}>
                        Days Remaining
                      </p>
                      <p className={`font-bold text-[13px] text-[#EE2F2F] mt-0.5`} style={{ fontWeight: 700 }}>
                        {tenant.daysRemaining}
                      </p>
                    </div>
                  </div>

                  {/* Emergency Card */}
                  <div className="bg-white border border-gray-200 p-2 rounded-lg mb-2">
                    <div className="flex flex-col">
                      <p className={`font-bold text-[11px] text-[#EE2F2F]`} style={{ fontWeight: 700 }}>
                        Emergency
                      </p>
                      <p className="font-bold text-[12px] text-[#000000] mt-1" style={{ fontWeight: 700 }}>
                        {tenant.emergencyContact.name}
                      </p>
                      <p className="font-bold text-[12px] text-[#000000] mt-1" style={{ fontWeight: 700 }}>
                        {tenant.emergencyContact.phone}
                      </p>
                    </div>
                  </div>

                  {/* View Button */}
                  <div className="mt-1">
                    <button 
                      className="flex items-center justify-center gap-1.5 w-full px-3 py-1 rounded-lg transition-colors hover:bg-purple-800 text-sm"
                      style={{
                        backgroundColor: '#B200FF',
                        color: '#FFFFFF',
                      }}
                      onClick={() => handleViewTenant(tenant)}
                    >
                      <EyeIcon className="h-3.5 w-3.5" />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}