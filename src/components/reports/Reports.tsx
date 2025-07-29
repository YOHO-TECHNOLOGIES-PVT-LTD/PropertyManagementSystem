import React, { useState } from 'react';
import {
  Download,
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  IndianRupee,
  Building2,
  Users,
  FileText,
  Shield,
  Lock,
  Eye
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Cell,
  Pie
} from 'recharts';
import { useAuth } from '../../contexts/AuthContext';

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('financial');
  const [dateRange, setDateRange] = useState('last_12_months');
  
  const { user } = useAuth();
  const isOwner = user?.role === 'owner';

  // Mock data for charts
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

  const expenseBreakdownData = [
    { name: 'Maintenance', value: 45, amount: 675000, color: '#ef4444' },
    { name: 'Utilities', value: 25, amount: 375000, color: '#f59e0b' },
    { name: 'Insurance', value: 15, amount: 225000, color: '#3b82f6' },
    { name: 'Property Tax', value: 10, amount: 150000, color: '#10b981' },
    { name: 'Management', value: 5, amount: 75000, color: '#8b5cf6' }
  ];

  const propertyPerformanceData = [
    { property: 'Sunrise Apartments', revenue: 240000, occupancy: 95, units: 24 },
    { property: 'Green Valley Complex', revenue: 360000, occupancy: 98, units: 36 },
    { property: 'Downtown Plaza', revenue: 180000, occupancy: 85, units: 12 },
    { property: 'Riverside Towers', revenue: 420000, occupancy: 92, units: 48 },
    { property: 'Garden View Homes', revenue: 150000, occupancy: 88, units: 15 }
  ];

  // Limited data for Admin/Manager
  const limitedPropertyData = [
    { property: 'Sunrise Apartments', occupancy: 95, units: 24, collections: '98%' },
    { property: 'Green Valley Complex', occupancy: 98, units: 36, collections: '100%' }
  ];

  const formatCurrency = (value: number) => {
    return `₹${(value / 1000).toFixed(0)}K`;
  };

  const formatPercentage = (value: number) => {
    return `${value}%`;
  };

  const getReportTypesForRole = () => {
    if (isOwner) {
      return [
        { id: 'financial', name: 'Financial Report', icon: IndianRupee },
        { id: 'occupancy', name: 'Occupancy Report', icon: Building2 },
        { id: 'tenant', name: 'Tenant Report', icon: Users },
        { id: 'maintenance', name: 'Maintenance Report', icon: FileText }
      ];
    } else {
      return [
        { id: 'occupancy', name: 'Occupancy Report', icon: Building2 },
        { id: 'maintenance', name: 'Maintenance Report', icon: FileText },
        { id: 'performance', name: 'Performance Report', icon: TrendingUp }
      ];
    }
  };

  const reportTypes = getReportTypesForRole();

  const dateRanges = [
    { id: 'last_30_days', name: 'Last 30 Days' },
    { id: 'last_3_months', name: 'Last 3 Months' },
    { id: 'last_6_months', name: 'Last 6 Months' },
    { id: 'last_12_months', name: 'Last 12 Months' },
    { id: 'custom', name: 'Custom Range' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isOwner ? 'Financial Reports & Analytics' : 'Performance Reports'}
          </h1>
          <p className="text-gray-600">
            {isOwner 
              ? 'Comprehensive insights into your property portfolio' 
              : 'Performance insights for your assigned properties'
            }
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
          {isOwner && (
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Excel</span>
            </button>
          )}
        </div>
      </div>

      {/* Role Access Indicator */}
      <div className={`border rounded-lg p-4 ${isOwner ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${isOwner ? 'bg-green-100' : 'bg-yellow-100'}`}>
            {isOwner ? <Shield className="w-5 h-5 text-green-600" /> : <Eye className="w-5 h-5 text-yellow-600" />}
          </div>
          <div>
            <h3 className={`text-sm font-medium ${isOwner ? 'text-green-900' : 'text-yellow-900'}`}>
              {isOwner ? '🏠 Owner Access - Complete Financial Reports' : '👨‍💼 Manager Access - Performance Reports Only'}
            </h3>
            <p className={`text-sm ${isOwner ? 'text-green-700' : 'text-yellow-700'}`}>
              {isOwner 
                ? 'Access to all financial data, revenue reports, expense breakdowns, and profit analysis.'
                : 'Access to occupancy rates, maintenance reports, and performance metrics. Financial details are restricted.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Report Type */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {reportTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setReportType(type.id)}
                    className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                      reportType === type.id
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{type.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Range */}
          <div className="sm:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {dateRanges.map((range) => (
                  <option key={range.id} value={range.id}>
                    {range.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Report - Owner Only */}
      {reportType === 'financial' && isOwner && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">₹69,60,000</p>
                  <p className="text-sm text-green-600">+12.5% from last year</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-600">₹17,80,000</p>
                  <p className="text-sm text-red-600">+8.3% from last year</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <IndianRupee className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Net Income</p>
                  <p className="text-2xl font-bold text-blue-600">₹51,80,000</p>
                  <p className="text-sm text-blue-600">+15.2% from last year</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Profit Margin</p>
                  <p className="text-2xl font-bold text-purple-600">74.4%</p>
                  <p className="text-sm text-purple-600">+2.1% from last year</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <PieChart className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} tickFormatter={formatCurrency} />
                  <Tooltip formatter={(value: number) => [formatCurrency(value), '']} />
                  <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                  <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Expense Breakdown */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={expenseBreakdownData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {expenseBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number, name: string) => [`${value}%`, name]} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Property Performance Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Property Performance</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Units
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Occupancy
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue per Unit
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {propertyPerformanceData.map((property, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{property.property}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{property.units}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(property.revenue)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{property.occupancy}%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(property.revenue / property.units)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Occupancy Report */}
      {reportType === 'occupancy' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Occupancy</p>
                  <p className="text-2xl font-bold text-green-600">93.2%</p>
                  <p className="text-sm text-green-600">+5.1% from last year</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <Building2 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {isOwner ? 'Total Units' : 'My Units'}
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {isOwner ? '135' : '60'}
                  </p>
                  <p className="text-sm text-blue-600">
                    {isOwner ? 'Across 5 properties' : 'Across 2 properties'}
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Occupied Units</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {isOwner ? '126' : '57'}
                  </p>
                  <p className="text-sm text-purple-600">95% occupancy</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Vacant Units</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {isOwner ? '9' : '3'}
                  </p>
                  <p className="text-sm text-yellow-600">5% vacancy</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <Building2 className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Occupancy Trend Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Occupancy Trend</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} tickFormatter={formatPercentage} />
                <Tooltip formatter={(value: number) => [`${value}%`, 'Occupancy Rate']} />
                <Line
                  type="monotone"
                  dataKey="occupancyRate"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Property Performance Table - Limited for Admin/Manager */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {isOwner ? 'Property Performance' : 'My Property Performance'}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Units
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Occupancy
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Collection Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(isOwner ? propertyPerformanceData : limitedPropertyData).map((property, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{property.property}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{property.units}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{property.occupancy}%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {isOwner
                            ? (property as { property: string; revenue: number; occupancy: number; units: number; }).revenue !== undefined
                              ? `${(property as { property: string; revenue: number; occupancy: number; units: number; }).revenue}%`
                              : 'N/A'
                            : (property as { property: string; occupancy: number; units: number; collections: string; }).collections ?? 'N/A'
                          }
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Other report types would be implemented similarly */}
      {reportType === 'tenant' && isOwner && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tenant Report</h3>
          <p className="text-gray-600">Detailed tenant analytics and insights coming soon.</p>
        </div>
      )}

      {reportType === 'maintenance' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Maintenance Report</h3>
          <p className="text-gray-600">
            {isOwner 
              ? 'Maintenance cost analysis and trends coming soon.'
              : 'Your maintenance task performance and completion rates.'
            }
          </p>
        </div>
      )}

      {reportType === 'performance' && !isOwner && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Performance Report</h3>
          <p className="text-gray-600">Your management performance metrics and KPIs.</p>
        </div>
      )}

      {/* Access Denied for Financial Reports - Admin/Manager */}
      {reportType === 'financial' && !isOwner && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-12 text-center">
          <Lock className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-900 mb-2">Access Restricted</h3>
          <p className="text-red-700">Financial reports are only available to property owners. You can access occupancy and performance reports instead.</p>
        </div>
      )}
    </div>
  );
};

export default Reports;