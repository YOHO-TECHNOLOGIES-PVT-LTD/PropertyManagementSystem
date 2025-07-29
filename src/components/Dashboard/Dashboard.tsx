import React, { useState } from 'react';
import {
  Building2,
  Users,
  IndianRupee,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Wrench,
  FileText,
  CheckCircle,
  // Clock,
  // MapPin,
  // Phone,
  // Mail,
  // Eye,
  Plus,
  Download,
  BarChart3,
  PieChart,
  ChevronDown
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedRevenue, setSelectedRevenue] = useState('monthly');
  const [revenueDropdownOpen, setRevenueDropdownOpen] = useState(false);
  const [selectedTotalRevenue, setSelectedTotalRevenue] = useState('total');
  const [totalRevenueDropdownOpen, setTotalRevenueDropdownOpen] = useState(false);
  const [selectedPayments, setSelectedPayments] = useState('monthly_pending');
  const [paymentsDropdownOpen, setPaymentsDropdownOpen] = useState(false);
  const [selectedCollectionRate, setSelectedCollectionRate] = useState('monthly');
  const [collectionRateDropdownOpen, setCollectionRateDropdownOpen] = useState(false);

  // Chart data
  const monthlyRevenueData = [
    { month: 'Jan', revenue: 450000, expenses: 120000, netIncome: 330000 },
    { month: 'Feb', revenue: 480000, expenses: 135000, netIncome: 345000 },
    { month: 'Mar', revenue: 520000, expenses: 140000, netIncome: 380000 },
    { month: 'Apr', revenue: 510000, expenses: 125000, netIncome: 385000 },
    { month: 'May', revenue: 580000, expenses: 150000, netIncome: 430000 },
    { month: 'Jun', revenue: 620000, expenses: 160000, netIncome: 460000 },
    { month: 'Jul', revenue: 640000, expenses: 155000, netIncome: 485000 },
    { month: 'Aug', revenue: 610000, expenses: 145000, netIncome: 465000 },
    { month: 'Sep', revenue: 590000, expenses: 140000, netIncome: 450000 },
    { month: 'Oct', revenue: 630000, expenses: 165000, netIncome: 465000 },
    { month: 'Nov', revenue: 650000, expenses: 170000, netIncome: 480000 },
    { month: 'Dec', revenue: 680000, expenses: 175000, netIncome: 505000 }
  ];

  // Yearly revenue data
  const yearlyRevenueData = [
    { year: '2020', revenue: 58000000, expenses: 15000000, netIncome: 43000000 },
    { year: '2021', revenue: 62000000, expenses: 16500000, netIncome: 45500000 },
    { year: '2022', revenue: 68000000, expenses: 18000000, netIncome: 50000000 },
    { year: '2023', revenue: 74000000, expenses: 19500000, netIncome: 54500000 },
    { year: '2024', revenue: 78000000, expenses: 20000000, netIncome: 58000000 }
  ];

  const occupancyData = [
    { month: 'Jan', occupancyRate: 85, vacantUnits: 15 },
    { month: 'Feb', occupancyRate: 88, vacantUnits: 12 },
    { month: 'Mar', occupancyRate: 92, vacantUnits: 8 },
    { month: 'Apr', occupancyRate: 90, vacantUnits: 10 },
    { month: 'May', occupancyRate: 95, vacantUnits: 5 },
    { month: 'Jun', occupancyRate: 97, vacantUnits: 3 },
    { month: 'Jul', occupancyRate: 98, vacantUnits: 2 },
    { month: 'Aug', occupancyRate: 94, vacantUnits: 6 },
    { month: 'Sep', occupancyRate: 91, vacantUnits: 9 },
    { month: 'Oct', occupancyRate: 96, vacantUnits: 4 },
    { month: 'Nov', occupancyRate: 100, vacantUnits: 0 },
    { month: 'Dec', occupancyRate: 98, vacantUnits: 2 }
  ];

  const propertyTypeData = [
    { name: 'Apartments', value: 60, count: 15, color: '#3b82f6' },
    { name: 'Commercial', value: 25, count: 6, color: '#8b5cf6' },
    { name: 'Villas', value: 10, count: 3, color: '#10b981' },
    { name: 'Houses', value: 5, count: 1, color: '#f59e0b' }
  ];

  const paymentStatusData = [
    { name: 'Paid', value: 75, count: 64, color: '#10b981' },
    { name: 'Pending', value: 20, count: 17, color: '#f59e0b' },
    { name: 'Overdue', value: 5, count: 4, color: '#ef4444' }
  ];


  const rentCollectionData = [
    { month: 'Jan', collected: 92, target: 100 },
    { month: 'Feb', collected: 95, target: 100 },
    { month: 'Mar', collected: 88, target: 100 },
    { month: 'Apr', collected: 96, target: 100 },
    { month: 'May', collected: 94, target: 100 },
    { month: 'Jun', collected: 98, target: 100 }
  ];

  // Calculate yearly revenue
  const currentYearRevenue = yearlyRevenueData[yearlyRevenueData.length - 1].revenue;
  const previousYearRevenue = yearlyRevenueData[yearlyRevenueData.length - 2].revenue;
  const yearlyGrowth = ((currentYearRevenue - previousYearRevenue) / previousYearRevenue * 100).toFixed(1);

  // Total Revenue options for dropdown
  const totalRevenueOptions = [
    { 
      id: 'total', 
      name: 'Total Revenue', 
      value: '₹78,00,000', 
      change: '+15.2%', 
      subtitle: 'All time',
      description: 'Cumulative revenue across all properties'
    },
    { 
      id: 'yearly_total', 
      name: 'Yearly Total', 
      value: `₹${(currentYearRevenue / 10000000).toFixed(1)}Cr`, 
      change: `+${yearlyGrowth}%`, 
      subtitle: '2024 Total',
      description: 'Current year total revenue'
    },
    { 
      id: 'monthly_total', 
      name: 'Monthly Total', 
      value: '₹6,50,000', 
      change: '+12.5%', 
      subtitle: 'This month',
      description: 'Current month total revenue'
    }
  ];

  // Revenue options for dropdown (yearly and monthly breakdown)
  const revenueOptions = [
    { 
      id: 'yearly', 
      name: 'Yearly Revenue', 
      value: `₹${(currentYearRevenue / 10000000).toFixed(1)}Cr`, 
      change: `+${yearlyGrowth}%`, 
      subtitle: '2024 Total',
      description: 'Current year total revenue'
    },
    { 
      id: 'monthly', 
      name: 'Monthly Revenue', 
      value: '₹6,50,000', 
      change: '+12.5%', 
      subtitle: 'This month',
      description: 'Current month revenue'
    }
  ];

  // Payment options for dropdown (only yearly and monthly pending)
  const paymentOptions = [
    { 
      id: 'yearly_pending', 
      name: 'Yearly Pending', 
      value: '₹4,80,000', 
      change: '+8.1%', 
      subtitle: '2024 Total',
      description: 'Total pending payments this year'
    },
    { 
      id: 'monthly_pending', 
      name: 'Monthly Pending', 
      value: '₹40,000', 
      change: '-2.3%', 
      subtitle: 'This month',
      description: 'Pending payments for current month'
    }
  ];

  // Collection Rate options for dropdown
  const collectionRateOptions = [
    {
      id: 'monthly',
      name: 'Monthly Collection Rate',
      value: '96.2%',
      subtitle: 'This month',
      description: 'Collection rate for the current month'
    },
    {
      id: 'yearly',
      name: 'Yearly Collection Rate',
      value: '94.8%',
      subtitle: '2024 Total',
      description: 'Collection rate for the current year'
    }
  ];
  const currentCollectionRate = collectionRateOptions.find(option => option.id === selectedCollectionRate) || collectionRateOptions[0];

  const currentTotalRevenueData = totalRevenueOptions.find(option => option.id === selectedTotalRevenue) || totalRevenueOptions[0];
  const currentRevenueData = revenueOptions.find(option => option.id === selectedRevenue) || revenueOptions[0];
  const currentPaymentData = paymentOptions.find(option => option.id === selectedPayments) || paymentOptions[0];

  // Main stats (first row) - now 5 cards
  const mainStats = [
    {
      title: 'Total Properties',
      value: '25',
      changeType: 'increase',
      icon: Building2,
      color: 'blue',
      subtitle: '100 total units'
    },
    {
      title: 'Total Tenants',
      value: '85',
      // change: '+3.1%',
      changeType: 'increase',
      icon: Users,
      color: 'green',
      subtitle: '85% occupancy rate'
    },
    {
      title: currentTotalRevenueData?.name || 'Total Revenue',
      value: currentTotalRevenueData?.value || '₹0',
      change: currentTotalRevenueData?.change || '0%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'emerald',
      subtitle: currentTotalRevenueData?.subtitle || '',
      hasDropdown: true,
      dropdownType: 'totalRevenue'
    },
    {
      title: currentRevenueData?.name || 'Revenue',
      value: currentRevenueData?.value || '₹0',
      change: currentRevenueData?.change || '0%',
      changeType: 'increase',
      icon: IndianRupee,
      color: 'purple',
      subtitle: currentRevenueData?.subtitle || '',
      hasDropdown: true,
      dropdownType: 'revenue'
    },
    {
      title: currentPaymentData?.name || 'Pending Payments',
      value: currentPaymentData?.value || '₹0',
      change: currentPaymentData?.change || '0%',
      changeType: currentPaymentData?.change?.startsWith('+') ? 'increase' : 'decrease',
      icon: AlertTriangle,
      color: 'red',
      subtitle: currentPaymentData?.subtitle || '',
      hasDropdown: true,
      dropdownType: 'payments'
    }
  ];

  // Secondary stats (second row)
  const secondaryStats = [
    {
      title: 'New Tenants',
      value: '3',
      icon: Users,
      color: 'indigo',
      subtitle: 'This month'
    },
    {
      title: 'Lease Expiring',
      value: '7',
      icon: Calendar,
      color: 'yellow',
      subtitle: 'Next 30 days'
    },
    {
      title: 'Collection Rate',
      value: '96.2%',
      icon: TrendingUp,
      color: 'green',
      subtitle: 'This month'
    }
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'payment',
      title: 'Rent Payment Received',
      description: 'John Doe - Unit 101',
      amount: '₹25,000',
      time: '2 minutes ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'maintenance',
      title: 'Maintenance Request',
      description: 'Plumbing issue - Unit 205',
      time: '1 hour ago',
      status: 'urgent'
    },
    {
      id: 3,
      type: 'tenant',
      title: 'New Tenant Added',
      description: 'Sarah Wilson - Unit 304',
      time: '3 hours ago',
      status: 'completed'
    },
    {
      id: 4,
      type: 'lease',
      title: 'Lease Renewal',
      description: 'Mike Johnson - Unit 102',
      time: '5 hours ago',
      status: 'pending'
    }
  ];

  // Upcoming tasks
  const upcomingTasks = [
    {
      id: 1,
      title: 'Lease Renewal - Unit 101',
      tenant: 'John Doe',
      dueDate: '2024-02-15',
      priority: 'high',
      type: 'lease'
    },
    {
      id: 2,
      title: 'Rent Collection Follow-up',
      tenant: 'Sarah Wilson',
      dueDate: '2024-02-10',
      priority: 'medium',
      type: 'payment'
    },
    {
      id: 3,
      title: 'Property Inspection',
      tenant: 'Building A',
      dueDate: '2024-02-20',
      priority: 'low',
      type: 'maintenance'
    }
  ];

  const formatCurrency = (value: number) => {
    return `₹${(value / 1000).toFixed(0)}K`;
  };

  const formatYearlyCurrency = (value: number) => {
    return `₹${(value / 10000000).toFixed(1)}Cr`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return IndianRupee;
      case 'tenant':
        return Users;
      case 'maintenance':
        return Wrench;
      case 'lease':
        return FileText;
      default:
        return Calendar;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'payment':
        return 'bg-green-100 text-green-600';
      case 'tenant':
        return 'bg-blue-100 text-blue-600';
      case 'maintenance':
        return 'bg-orange-100 text-orange-600';
      case 'lease':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'urgent':
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDropdownClick = (dropdownType: string) => {
    // Close all dropdowns first
    setTotalRevenueDropdownOpen(false);
    setRevenueDropdownOpen(false);
    setPaymentsDropdownOpen(false);

    // Open the specific dropdown
    switch (dropdownType) {
      case 'totalRevenue':
        setTotalRevenueDropdownOpen(true);
        break;
      case 'revenue':
        setRevenueDropdownOpen(true);
        break;
      case 'payments':
        setPaymentsDropdownOpen(true);
        break;
    }
  };

  const closeAllDropdowns = () => {
    setTotalRevenueDropdownOpen(false);
    setRevenueDropdownOpen(false);
    setPaymentsDropdownOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}! Here's what's happening with your properties.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Main Stats - 5 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {mainStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    {stat.hasDropdown && (
                      <div className="relative">
                        <button
                          onClick={() => handleDropdownClick(stat.dropdownType!)}
                          className="flex items-center text-gray-400 hover:text-gray-600"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        
                        {/* Total Revenue Dropdown */}
                        {stat.dropdownType === 'totalRevenue' && totalRevenueDropdownOpen && (
                          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                            <div className="p-2">
                              {totalRevenueOptions.map((option) => (
                                <button
                                  key={option.id}
                                  onClick={() => {
                                    setSelectedTotalRevenue(option.id);
                                    setTotalRevenueDropdownOpen(false);
                                  }}
                                  className={`w-full text-left p-3 rounded-md hover:bg-gray-50 ${
                                    selectedTotalRevenue === option.id ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
                                  }`}
                                >
                                  <div className="font-medium">{option.name}</div>
                                  <div className="text-sm text-gray-500">{option.description}</div>
                                  <div className="text-lg font-bold mt-1">{option.value}</div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Revenue Dropdown */}
                        {stat.dropdownType === 'revenue' && revenueDropdownOpen && (
                          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                            <div className="p-2">
                              {revenueOptions.map((option) => (
                                <button
                                  key={option.id}
                                  onClick={() => {
                                    setSelectedRevenue(option.id);
                                    setRevenueDropdownOpen(false);
                                  }}
                                  className={`w-full text-left p-3 rounded-md hover:bg-gray-50 ${
                                    selectedRevenue === option.id ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
                                  }`}
                                >
                                  <div className="font-medium">{option.name}</div>
                                  <div className="text-sm text-gray-500">{option.description}</div>
                                  <div className="text-lg font-bold mt-1">{option.value}</div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Payments Dropdown */}
                        {stat.dropdownType === 'payments' && paymentsDropdownOpen && (
                          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                            <div className="p-2">
                              {paymentOptions.map((option) => (
                                <button
                                  key={option.id}
                                  onClick={() => {
                                    setSelectedPayments(option.id);
                                    setPaymentsDropdownOpen(false);
                                  }}
                                  className={`w-full text-left p-3 rounded-md hover:bg-gray-50 ${
                                    selectedPayments === option.id ? 'bg-red-50 text-red-700' : 'text-gray-700'
                                  }`}
                                >
                                  <div className="font-medium">{option.name}</div>
                                  <div className="text-sm text-gray-500">{option.description}</div>
                                  <div className="text-lg font-bold mt-1">{option.value}</div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">{stat.subtitle}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${
                  stat.color === 'blue' ? 'bg-blue-50' :
                  stat.color === 'green' ? 'bg-green-50' :
                  stat.color === 'purple' ? 'bg-purple-50' :
                  stat.color === 'emerald' ? 'bg-emerald-50' :
                  'bg-red-50'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'purple' ? 'text-purple-600' :
                    stat.color === 'emerald' ? 'text-emerald-600' :
                    'text-red-600'
                  }`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {secondaryStats.map((stat, index) => {
          if (stat.title === 'Collection Rate') {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <div className="relative">
                        <button
                          onClick={() => setCollectionRateDropdownOpen(!collectionRateDropdownOpen)}
                          className="flex items-center text-gray-400 hover:text-gray-600"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        {collectionRateDropdownOpen && (
                          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                            <div className="p-2">
                              {collectionRateOptions.map((option) => (
                                <button
                                  key={option.id}
                                  onClick={() => {
                                    setSelectedCollectionRate(option.id);
                                    setCollectionRateDropdownOpen(false);
                                  }}
                                  className={`w-full text-left p-3 rounded-md hover:bg-gray-50 ${
                                    selectedCollectionRate === option.id ? 'bg-green-50 text-green-700' : 'text-gray-700'
                                  }`}
                                >
                                  <div className="font-medium">{option.name}</div>
                                  <div className="text-sm text-gray-500">{option.description}</div>
                                  <div className="text-lg font-bold mt-1">{option.value}</div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{currentCollectionRate.value}</p>
                    <p className="text-sm text-gray-500">{currentCollectionRate.subtitle}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    stat.color === 'indigo' ? 'bg-indigo-50' :
                    stat.color === 'yellow' ? 'bg-yellow-50' :
                    'bg-green-50'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      stat.color === 'indigo' ? 'text-indigo-600' :
                      stat.color === 'yellow' ? 'text-yellow-600' :
                      'text-green-600'
                    }`} />
                  </div>
                </div>
              </div>
            );
          }
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.subtitle}</p>
                </div>
                <div className={`p-3 rounded-lg ${
                  stat.color === 'indigo' ? 'bg-indigo-50' :
                  stat.color === 'yellow' ? 'bg-yellow-50' :
                  'bg-green-50'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    stat.color === 'indigo' ? 'text-indigo-600' :
                    stat.color === 'yellow' ? 'text-yellow-600' :
                    'text-green-600'
                  }`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Trend Chart */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
              Monthly Revenue Trend
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Revenue</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Expenses</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} tickFormatter={formatCurrency} />
              <Tooltip formatter={(value: number) => [formatCurrency(value), '']} />
              <Area type="monotone" dataKey="revenue" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="expenses" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Yearly Revenue Trend Chart */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
              Yearly Revenue Growth
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Revenue</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Net Income</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} tickFormatter={formatYearlyCurrency} />
              <Tooltip formatter={(value: number) => [formatYearlyCurrency(value), '']} />
              <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
              <Bar dataKey="netIncome" fill="#f59e0b" name="Net Income" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Occupancy and Property Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Occupancy Rate Chart */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Occupancy Rate Trend
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} domain={[0, 100]} />
              <Tooltip formatter={(value: number) => [`${value}%`, 'Occupancy Rate']} />
              <Line type="monotone" dataKey="occupancyRate" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Property Types Distribution */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-purple-600" />
              Property Types Distribution
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={propertyTypeData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {propertyTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number, name: string) => [`${value}%`, name]} />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            {propertyTypeData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name} ({item.count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Status and Rent Collection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Status Distribution */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <IndianRupee className="w-5 h-5 mr-2 text-green-600" />
              Payment Status Distribution
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={paymentStatusData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {paymentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number, name: string) => [`${value}%`, name]} />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            {paymentStatusData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name} ({item.count})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rent Collection Rate */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
              Rent Collection Rate
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={rentCollectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} domain={[0, 100]} />
              <Tooltip formatter={(value: number) => [`${value}%`, '']} />
              <Bar dataKey="target" fill="#e5e7eb" name="Target" />
              <Bar dataKey="collected" fill="#3b82f6" name="Collected" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity and Tasks Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700">View All</button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-md">
                    <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-400">{activity.time}</span>
                        {activity.amount && (
                          <span className="text-sm font-medium text-green-600">{activity.amount}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{task.tenant}</p>
                  <p className="text-xs text-gray-400">Due: {task.dueDate}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700">View All Tasks</button>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {(totalRevenueDropdownOpen || revenueDropdownOpen || paymentsDropdownOpen) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={closeAllDropdowns}
        />
      )}
    </div>
  );
};

export default Dashboard;