import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  // Calendar,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Download,
  Eye,
  Edit,
  XCircle
} from 'lucide-react';
import type { Lease } from '../../types';

const LeaseManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [, setShowAddModal] = useState(false);

  // Mock data
  const leases: Lease[] = [
    {
      id: '1',
      tenantId: '1',
      propertyId: '1',
      unitId: '101',
      tenant: {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1234567890',
        address: '123 Main Street, Apt 101',
        unitId: '101',
        propertyId: '1',
        monthlyRent: 25000,
        securityDeposit: 50000,
        leaseStartDate: new Date('2024-06-01'),
        leaseEndDate: new Date('2025-05-31'),
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
        createdAt: new Date('2024-06-01'),
        updatedAt: new Date('2024-06-01')
      },
      unit: {
        id: '101',
        unitNumber: '101',
        propertyId: '1',
        type: '2bhk',
        area: 1200,
        monthlyRent: 25000,
        securityDeposit: 50000,
        status: 'occupied',
        amenities: [],
        floor: 1,
        createdAt: new Date('2024-06-01'),
        updatedAt: new Date('2024-06-01')
      },
      startDate: new Date('2024-06-01'),
      endDate: new Date('2025-05-31'),
      monthlyRent: 25000,
      securityDeposit: 50000,
      status: 'active',
      renewalHistory: [
        {
          id: '1',
          leaseId: '1',
          previousEndDate: new Date('2024-03-31'),
          newEndDate: new Date('2025-03-31'),
          previousRent: 33000,
          newRent: 35000,
          renewalDate: new Date('2024-03-15'),
          terms: ['Renewed with 6% rent increase']
        }
      ],
      terms: [
        'Monthly rent payment due on 1st of each month',
        'Security deposit refundable upon lease termination',
        'No pets allowed',
        'Tenant responsible for utilities'
      ],
      documents: [],
      createdAt: new Date('2024-06-01'),
      updatedAt: new Date('2024-06-01')
    },
    {
      id: '2',
      tenantId: '2',
      propertyId: '1',
      unitId: '205',
      tenant: {
        id: '2',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@email.com',
        phone: '+1234567892',
        address: '789 Park Avenue, Unit 205',
        unitId: '205',
        propertyId: '1',
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
      },
      unit: {
        id: '205',
        unitNumber: '205',
        propertyId: '1',
        type: '1bhk',
        area: 800,
        monthlyRent: 18000,
        securityDeposit: 36000,
        status: 'occupied',
        amenities: [],
        floor: 2,
        createdAt: new Date('2024-08-15'),
        updatedAt: new Date('2024-08-15')
      },
      startDate: new Date('2024-08-15'),
      endDate: new Date('2025-08-14'),
      monthlyRent: 18000,
      securityDeposit: 36000,
      status: 'active',
      renewalHistory: [],
      terms: [
        'Monthly rent payment due on 15th of each month',
        'Security deposit refundable upon lease termination',
        'Smoking not allowed',
        'Tenant responsible for maintenance of fixtures'
      ],
      documents: [],
      createdAt: new Date('2024-08-15'),
      updatedAt: new Date('2024-08-15')
    },
    {
      id: '3',
      tenantId: '3',
      propertyId: '2',
      unitId: '304',
      tenant: {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike.johnson@email.com',
        phone: '+1234567894',
        address: 'Green Valley Complex, Unit 304',
        unitId: '304',
        propertyId: '2',
        monthlyRent: 35000,
        securityDeposit: 70000,
        leaseStartDate: new Date('2024-04-01'),
        leaseEndDate: new Date('2025-03-31'),
        rentDueDate: 1,
        paymentStatus: 'overdue',
        documents: [],
        emergencyContact: {
          name: 'Lisa Johnson',
          phone: '+1234567895',
          relationship: 'Sister'
        },
        occupation: 'Accountant',
        company: 'Finance Inc',
        monthlyIncome: 70000,
        createdAt: new Date('2024-04-01'),
        updatedAt: new Date('2024-04-01')
      },
      unit: {
        id: '304',
        unitNumber: '304',
        propertyId: '2',
        type: '3bhk',
        area: 1500,
        monthlyRent: 35000,
        securityDeposit: 70000,
        status: 'occupied',
        amenities: [],
        floor: 3,
        createdAt: new Date('2024-04-01'),
        updatedAt: new Date('2024-04-01')
      },
      startDate: new Date('2024-04-01'),
      endDate: new Date('2025-03-31'),
      monthlyRent: 35000,
      securityDeposit: 70000,
      status: 'expired',
      renewalHistory: [],
      terms: [
        'Monthly rent payment due on 1st of each month',
        'Security deposit refundable upon lease termination',
        'Pets allowed with additional deposit',
        'Tenant responsible for all utilities'
      ],
      documents: [],
      createdAt: new Date('2024-04-01'),
      updatedAt: new Date('2024-04-01')
    }
  ];

  // Calculate summary stats
  const activeLeases = leases.filter(l => l.status === 'active').length;
  const expiringLeases = leases.filter(l => {
    const daysUntilExpiry = getDaysUntilExpiry(l.endDate);
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  }).length;
  const expiredLeases = leases.filter(l => l.status === 'expired').length;
  const totalSecurityDeposit = leases.reduce((sum, lease) => sum + lease.securityDeposit, 0);

  const filteredLeases = leases.filter(lease => {
    const matchesSearch = lease.tenant?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lease.unit?.unitNumber.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || lease.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  function getDaysUntilExpiry(endDate: Date): number {
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'expired':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'terminated':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'renewed':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return CheckCircle;
      case 'expired':
        return AlertTriangle;
      case 'terminated':
        return XCircle;
      case 'renewed':
        return RefreshCw;
      default:
        return Clock;
    }
  };

  const getExpiryColor = (daysUntilExpiry: number) => {
    if (daysUntilExpiry <= 0) return 'text-red-600';
    if (daysUntilExpiry <= 30) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDuration = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Calculate total months between dates
    let totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    
    // Add 1 if the end date is on or after the start date of the month
    if (end.getDate() >= start.getDate()) {
      totalMonths += 1;
    }
    
    // Convert to years and months
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    
    let duration = '';
    if (years > 0) {
      duration += `${years}yr`;
    }
    if (months > 0) {
      if (duration) duration += ' ';
      duration += `${months} Month${months > 1 ? 's' : ''}`;
    }
    
    return duration || '0 Months';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lease Management</h1>
          <p className="text-gray-600">Manage tenant leases and agreements</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Lease</span>
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Leases</p>
              <p className="text-2xl font-bold text-green-600">{activeLeases}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-yellow-600">{expiringLeases}</p>
              <p className="text-xs text-gray-500">Next 30 days</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expired</p>
              <p className="text-2xl font-bold text-red-600">{expiredLeases}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Security Deposits</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalSecurityDeposit)}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
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
              placeholder="Search by tenant name or unit number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="terminated">Terminated</option>
              <option value="renewed">Renewed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leases Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tenant & Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lease Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rent & Deposit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeases.map((lease) => {
                const StatusIcon = getStatusIcon(lease.status);
                const daysUntilExpiry = getDaysUntilExpiry(lease.endDate);
                
                return (
                  <tr key={lease.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {lease.tenant?.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{lease.tenant?.name}</div>
                          <div className="text-sm text-gray-500">
                            Unit {lease.unit?.unitNumber} • {lease.unit?.type.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(lease.startDate)} - {formatDate(lease.endDate)}
                      </div>
                      <div className="text-sm text-gray-500">
                        Duration: {formatDuration(lease.startDate, lease.endDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(lease.monthlyRent)}
                      </div>
                      <div className="text-sm text-gray-500">
                        Deposit: {formatCurrency(lease.securityDeposit)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(lease.status)}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {lease.status.charAt(0).toUpperCase() + lease.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(lease.endDate)}
                      </div>
                      <div className={`text-sm ${getExpiryColor(daysUntilExpiry)}`}>
                        {daysUntilExpiry > 0 
                          ? `${daysUntilExpiry} days left`
                          : daysUntilExpiry === 0 
                            ? 'Expires today'
                            : `Expired ${Math.abs(daysUntilExpiry)} days ago`
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        {lease.status === 'active' && daysUntilExpiry <= 60 && (
                          <button className="text-green-600 hover:text-green-900">
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        )}
                        <button className="text-purple-600 hover:text-purple-900">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredLeases.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No leases found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by creating your first lease agreement.'
            }
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Lease
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default LeaseManagement;