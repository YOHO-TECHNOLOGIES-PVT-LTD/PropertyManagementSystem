import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Wrench,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  // User,
  // Calendar,
  IndianRupee,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import type { MaintenanceRequest } from '../types';

const Maintenance: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [, setShowAddModal] = useState(false);

  // Mock data
  const maintenanceRequests: MaintenanceRequest[] = [
    {
      id: '1',
      tenantId: '1',
      tenant: {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1234567890',
        unitId: '101',
        monthlyRent: 25000,
        securityDeposit: 50000,
        leaseStartDate: new Date('2023-06-01'),
        leaseEndDate: new Date('2024-05-31'),
        paymentStatus: 'paid',
        documents: [],
        emergencyContact: {
          name: 'Jane Doe',
          phone: '+1234567891',
          relationship: 'Spouse'
        },
        createdAt: new Date('2023-06-01'),
        address: '',
        propertyId: '',
        rentDueDate: 0,
        occupation: '',
        updatedAt: new Date('2023-06-01')
      },
      unitId: '101',
      unit: {
        id: '101',
        unitNumber: '101',
        propertyId: '1',
        type: '2bhk',
        securityDeposit: 50000,
        status: 'occupied',
        area: 1200,
        floor: 1,
        monthlyRent: 0,
        amenities: [],
        createdAt: new Date('2023-06-01'),
        updatedAt: new Date('2023-06-01')
      },
      title: 'Kitchen Sink Leakage',
      description: 'The kitchen sink is leaking from the bottom. Water is dripping continuously and needs immediate attention.',
      category: 'plumbing',
      priority: 'high',
      status: 'in_progress',
      assignedTo: 'Mike Wilson - Plumber',
      estimatedCost: 2500,
      scheduledDate: new Date('2024-02-10'),
      notes: [
        {
          id: 'note-1',
          requestId: '1',
          userId: 'admin',
          note: 'Plumber scheduled to visit on Feb 10th',
          createdAt: new Date('2024-02-08')
        }
      ],
      createdAt: new Date('2024-02-08'),
      updatedAt: new Date('2024-02-09'),
      propertyId: '1',
      images: []
    },
    {
      id: '2',
      tenantId: '2',
      tenant: {
        id: '2',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@email.com',
        phone: '+1234567892',
        unitId: '205',
        monthlyRent: 18000,
        securityDeposit: 36000,
        leaseStartDate: new Date('2023-08-15'),
        leaseEndDate: new Date('2024-08-14'),
        paymentStatus: 'pending',
        documents: [],
        emergencyContact: {
          name: 'Robert Wilson',
          phone: '+1234567893',
          relationship: 'Father'
        },
        createdAt: new Date('2023-08-15'),
        address: '',
        propertyId: '',
        rentDueDate: 0,
        occupation: '',
        updatedAt: new Date('2023-08-15')
      },
      unitId: '205',
      unit: {
        id: '205',
        unitNumber: '205',
        propertyId: '1',
        type: '1bhk',
        securityDeposit: 36000,
        status: 'occupied',
        area: 800,
        floor: 2,
        monthlyRent: 18000,
        amenities: [],
        createdAt: new Date('2023-08-15'),
        updatedAt: new Date('2023-08-15')
      },
      title: 'Air Conditioner Not Working',
      description: 'The AC in the bedroom is not cooling properly. It turns on but no cold air is coming out.',
      category: 'hvac',
      priority: 'medium',
      status: 'open',
      estimatedCost: 3500,
      notes: [
        {
          id: 'note-2',
          requestId: '2',
          userId: 'system',
          note: 'Waiting for technician availability',
          createdAt: new Date('2024-02-07')
        }
      ],
      createdAt: new Date('2024-02-07'),
      updatedAt: new Date('2024-02-07'),
      propertyId: '1',
      images: []
    },
    {
      id: '3',
      tenantId: '3',
      tenant: {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike.johnson@email.com',
        phone: '+1234567894',
        unitId: '304',
        monthlyRent: 35000,
        securityDeposit: 70000,
        leaseStartDate: new Date('2023-04-01'),
        leaseEndDate: new Date('2024-03-31'),
        paymentStatus: 'overdue',
        documents: [],
        emergencyContact: {
          name: 'Lisa Johnson',
          phone: '+1234567895',
          relationship: 'Sister'
        },
        createdAt: new Date('2023-04-01'),
        address: '',
        propertyId: '',
        rentDueDate: 0,
        occupation: '',
        updatedAt: new Date('2023-04-01')
      },
      unitId: '304',
      unit: {
        id: '304',
        unitNumber: '304',
        propertyId: '2',
        type: '3bhk',
        securityDeposit: 70000,
        status: 'occupied',
        area: 1500,
        floor: 3,
        monthlyRent: 35000,
        amenities: [],
        createdAt: new Date('2023-04-01'),
        updatedAt: new Date('2023-04-01')
      },
      title: 'Electrical Outlet Not Working',
      description: 'The power outlet in the living room is not working. Multiple devices tested, no power output.',
      category: 'electrical',
      priority: 'urgent',
      status: 'open',
      estimatedCost: 1500,
      notes: [
        {
          id: 'note-3',
          requestId: '3',
          userId: 'system',
          note: 'Safety concern - needs immediate attention',
          createdAt: new Date('2024-02-09')
        }
      ],
      createdAt: new Date('2024-02-09'),
      updatedAt: new Date('2024-02-09'),
      propertyId: '2',
      images: []
    },
    {
      id: '4',
      tenantId: '1',
      tenant: {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1234567890',
        unitId: '101',
        monthlyRent: 25000,
        securityDeposit: 50000,
        leaseStartDate: new Date('2023-06-01'),
        leaseEndDate: new Date('2024-05-31'),
        paymentStatus: 'paid',
        documents: [],
        emergencyContact: {
          name: 'Jane Doe',
          phone: '+1234567891',
          relationship: 'Spouse'
        },
        createdAt: new Date('2023-06-01'),
        address: '',
        propertyId: '',
        rentDueDate: 0,
        occupation: '',
        updatedAt: new Date('2023-06-01')
      },
      unitId: '101',
      unit: {
        id: '101',
        unitNumber: '101',
        propertyId: '1',
        type: '2bhk',
        securityDeposit: 50000,
        status: 'occupied',
        area: 1200,
        floor: 1,
        monthlyRent: 25000,
        amenities: [],
        createdAt: new Date('2023-06-01'),
        updatedAt: new Date('2023-06-01')
      },
      title: 'Bathroom Door Lock Repair',
      description: 'The bathroom door lock is stuck and cannot be opened from inside.',
      category: 'other',
      priority: 'low',
      status: 'completed',
      assignedTo: 'Tom Brown - Handyman',
      estimatedCost: 800,
      actualCost: 750,
      scheduledDate: new Date('2024-02-05'),
      completedDate: new Date('2024-02-06'),
      notes: [
        {
          id: 'note-4',
          requestId: '4',
          userId: 'system',
          note: 'Lock replaced successfully',
          createdAt: new Date('2024-02-06')
        }
      ],
      createdAt: new Date('2024-02-04'),
      updatedAt: new Date('2024-02-06'),
      propertyId: '1',
      images: []
    }
  ];

  // Calculate summary stats
  const openRequests = maintenanceRequests.filter(r => r.status === 'open').length;
  const inProgressRequests = maintenanceRequests.filter(r => r.status === 'in_progress').length;
  const completedRequests = maintenanceRequests.filter(r => r.status === 'completed').length;
  const urgentRequests = maintenanceRequests.filter(r => r.priority === 'urgent').length;
  const totalEstimatedCost = maintenanceRequests
    .filter(r => r.status !== 'completed')
    .reduce((sum, request) => sum + (request.estimatedCost || 0), 0);

  const filteredRequests = maintenanceRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.tenant?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.unit?.unitNumber.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || request.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'in_progress':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'cancelled':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return Clock;
      case 'in_progress':
        return Wrench;
      case 'completed':
        return CheckCircle;
      case 'cancelled':
        return XCircle;
      default:
        return Clock;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'plumbing':
        return '🔧';
      case 'electrical':
        return '⚡';
      case 'hvac':
        return '❄️';
      case 'appliance':
        return '📱';
      case 'structural':
        return '🏗️';
      default:
        return '🔨';
    }
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maintenance Requests</h1>
          <p className="text-gray-600">Track and manage property maintenance</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Request</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open</p>
              <p className="text-2xl font-bold text-blue-600">{openRequests}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-yellow-600">{inProgressRequests}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Wrench className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedRequests}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Urgent</p>
              <p className="text-2xl font-bold text-red-600">{urgentRequests}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Est. Cost</p>
              <p className="text-2xl font-bold text-purple-600">{formatCurrency(totalEstimatedCost)}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <IndianRupee className="w-6 h-6 text-purple-600" />
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
              placeholder="Search by title, tenant, or unit..."
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
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-gray-400" />
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRequests.map((request) => {
          const StatusIcon = getStatusIcon(request.status);
          
          return (
            <div key={request.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{getCategoryIcon(request.category)}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                    <p className="text-sm text-gray-600">
                      {request.tenant?.name} • Unit {request.unit?.unitNumber}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {request.status.replace('_', ' ').charAt(0).toUpperCase() + request.status.replace('_', ' ').slice(1)}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(request.priority)}`}>
                    {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{request.description}</p>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Category:</span>
                  <span className="font-medium text-gray-900 capitalize">{request.category}</span>
                </div>
                
                {request.assignedTo && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Assigned to:</span>
                    <span className="font-medium text-gray-900">{request.assignedTo}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Created:</span>
                  <span className="font-medium text-gray-900">{formatDate(request.createdAt)}</span>
                </div>
                
                {request.scheduledDate && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Scheduled:</span>
                    <span className="font-medium text-gray-900">{formatDate(request.scheduledDate)}</span>
                  </div>
                )}
                
                {request.completedDate && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Completed:</span>
                    <span className="font-medium text-green-600">{formatDate(request.completedDate)}</span>
                  </div>
                )}
              </div>

              {/* Cost */}
              <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">
                  {request.status === 'completed' ? 'Actual Cost:' : 'Estimated Cost:'}
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {formatCurrency(request.actualCost || request.estimatedCost || 0)}
                </span>
              </div>

              {/* Notes */}
              {request.notes && request.notes.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 italic">"{request.notes[0].note}"</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                {request.status === 'open' && (
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                    Assign
                  </button>
                )}
                
                {request.status === 'in_progress' && (
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                    Complete
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <Wrench className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No maintenance requests found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterStatus !== 'all' || filterPriority !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'No maintenance requests have been submitted yet.'
            }
          </p>
          {!searchTerm && filterStatus === 'all' && filterPriority === 'all' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Request
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Maintenance;