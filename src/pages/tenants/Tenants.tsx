import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../src/components/ui/card';
import { Input } from '../../../src/components/ui/input';
import { Label } from '../../../src/components/ui/label';
import { Button } from '../../../src/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../src/components/ui/select';
import { Search, Calendar, Phone, Mail, ChevronDown, Users, DollarSign, Clock, AlertCircle } from 'lucide-react';

interface TenantFormData {
  fullName: string;
  emailAddress: string;
  lawOfficial: string;
  phoneNumber: string;
  unit: string;
  propertyInformation: string;
  securityBank: string;
  securityDeposit: string;
  paymentStatus: string;
  teamSpecialized: string;
  leaseStartDate: string;
  leaseEndDate: string;
  contactName: string;
  contactPhone: string;
  relationship: string;
}

interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  rent: string;
  deposit: string;
  leaseStart: string;
  leaseEnd: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  daysRemaining: number;
  emergency: string;
  emergencyPhone: string;
  avatar: string;
}

export default function TenantsApp() {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All Types');
  const [formData, setFormData] = useState<TenantFormData>({
    fullName: '',
    emailAddress: '',
    lawOfficial: '',
    phoneNumber: '',
    unit: '',
    propertyInformation: '',
    securityBank: '',
    securityDeposit: '',
    paymentStatus: '',
    teamSpecialized: '',
    leaseStartDate: '',
    leaseEndDate: '',
    contactName: '',
    contactPhone: '',
    relationship: ''
  });

  const stats = [
    { label: 'Total Tenants', value: '2', bgColor: 'bg-orange-100', circleColor1: 'bg-orange-200', circleColor2: 'bg-orange-300' },
    { label: 'Paid this Month', value: '1', bgColor: 'bg-purple-100', circleColor1: 'bg-purple-200', circleColor2: 'bg-purple-300' },
    { label: 'Pending Payments', value: '1', bgColor: 'bg-green-100', circleColor1: 'bg-green-200', circleColor2: 'bg-green-300' },
    { label: 'Overdue', value: '0', bgColor: 'bg-pink-100', circleColor1: 'bg-pink-200', circleColor2: 'bg-pink-300' }
  ];

  const tenants: Tenant[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phone: '+91 9876543210',
      rent: '₹25,000',
      deposit: '₹50,000',
      leaseStart: 'Jun 1, 2025',
      leaseEnd: 'May 31, 2025',
      status: 'Paid',
      daysRemaining: 0,
      emergency: 'Jane Doe',
      emergencyPhone: '+91 9876543211',
      avatar: 'JD'
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@gmail.com',
      phone: '+91 9876543212',
      rent: '₹18,000',
      deposit: '₹36,000',
      leaseStart: 'Jun 15, 2025',
      leaseEnd: 'Aug 14, 2025',
      status: 'Pending',
      daysRemaining: 6,
      emergency: 'Robert Wilson',
      emergencyPhone: '+91 9876543213',
      avatar: 'SW'
    }
  ];

  const handleInputChange = (field: keyof TenantFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormSubmit = () => {
    console.log('Form submitted:', formData);
    setShowForm(false);
    setFormData({
      fullName: '',
      emailAddress: '',
      lawOfficial: '',
      phoneNumber: '',
      unit: '',
      propertyInformation: '',
      securityBank: '',
      securityDeposit: '',
      paymentStatus: '',
      teamSpecialized: '',
      leaseStartDate: '',
      leaseEndDate: '',
      contactName: '',
      contactPhone: '',
      relationship: ''
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      fullName: '',
      emailAddress: '',
      lawOfficial: '',
      phoneNumber: '',
      unit: '',
      propertyInformation: '',
      securityBank: '',
      securityDeposit: '',
      paymentStatus: '',
      teamSpecialized: '',
      leaseStartDate: '',
      leaseEndDate: '',
      contactName: '',
      contactPhone: '',
      relationship: ''
    });
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-6">
            <Card>
              <CardHeader className="bg-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  Add New Tenant
                </CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="bg-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  Property Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emailAddress">Email Address</Label>
                    <Input
                      id="emailAddress"
                      type="email"
                      value={formData.emailAddress}
                      onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lawOfficial">Law Official</Label>
                    <Input
                      id="lawOfficial"
                      value={formData.lawOfficial}
                      onChange={(e) => handleInputChange('lawOfficial', e.target.value)}
                      placeholder="Enter law official"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select value={formData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unit-a">Unit A</SelectItem>
                        <SelectItem value="unit-b">Unit B</SelectItem>
                        <SelectItem value="unit-c">Unit C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  Financial Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="securityBank">Security Bank</Label>
                    <Input
                      id="securityBank"
                      value={formData.securityBank}
                      onChange={(e) => handleInputChange('securityBank', e.target.value)}
                      placeholder="Enter security bank"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="securityDeposit">Security Deposit</Label>
                    <Input
                      id="securityDeposit"
                      value={formData.securityDeposit}
                      onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                      placeholder="Enter security deposit"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentStatus">Payment Status</Label>
                  <Select value={formData.paymentStatus} onValueChange={(value) => handleInputChange('paymentStatus', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teamSpecialized">Team Specialized</Label>
                  <Select value={formData.teamSpecialized} onValueChange={(value) => handleInputChange('teamSpecialized', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team specialized" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="mixed">Mixed Use</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  Lease Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="leaseStartDate">Lease Start Date</Label>
                    <div className="relative">
                      <Input
                        id="leaseStartDate"
                        type="date"
                        value={formData.leaseStartDate}
                        onChange={(e) => handleInputChange('leaseStartDate', e.target.value)}
                        className="pr-10"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leaseEndDate">Lease End Date</Label>
                    <div className="relative">
                      <Input
                        id="leaseEndDate"
                        type="date"
                        value={formData.leaseEndDate}
                        onChange={(e) => handleInputChange('leaseEndDate', e.target.value)}
                        className="pr-10"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">
                    5
                  </div>
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Name</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      placeholder="Enter contact name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      placeholder="Enter contact phone"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Select value={formData.relationship} onValueChange={(value) => handleInputChange('relationship', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="px-8"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleFormSubmit}
                className="px-8 bg-purple-600 hover:bg-purple-700"
              >
                Add Tenant
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Tenants</h1>
            <p className="text-gray-500 text-sm">Manage Smart Apartments (1 Tenants)</p>
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            Add Tenant
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.bgColor} rounded-xl p-6 relative overflow-hidden`}>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </div>
              <div className={`absolute -top-4 -right-4 w-20 h-20 ${stat.circleColor1} rounded-full opacity-30`}></div>
              <div className={`absolute -bottom-6 -right-6 w-24 h-24 ${stat.circleColor2} rounded-full opacity-20`}></div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-200"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48 border-gray-200">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Types">All Types</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tenant Cards */}
        <div className="grid grid-cols-2 gap-6">
          {tenants.map((tenant) => (
            <div key={tenant.id} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                    {tenant.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold">{tenant.name}</h3>
                    <p className="text-gray-500 text-xs">Unit 30{tenant.id}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mb-4">
                <div className='flex gap-3'>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Mail className="w-3 h-3" />
                  {tenant.email}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Phone className="w-3 h-3" />
                  {tenant.phone}
                </div>
                </div>

                <div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                    tenant.status === 'Paid' ? 'bg-green-100 text-green-600' :
                    tenant.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {tenant.status}
                  </span>
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
                      <DollarSign className="w-3 h-3 text-blue-600" />
                    </div>
                    <p className="text-xs text-gray-600">Monthly Rent</p>
                  </div>
                  <p className="font-bold text-sm">{tenant.rent}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 bg-green-100 rounded flex items-center justify-center">
                      <DollarSign className="w-3 h-3 text-green-600" />
                    </div>
                    <p className="text-xs text-gray-600">Security Deposit</p>
                  </div>
                  <p className="font-bold text-sm">{tenant.deposit}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-600">Lease Duration</span>
                  
                </div>
                <p className="text-xs text-gray-700">{tenant.leaseStart} - {tenant.leaseEnd}</p>
                {tenant.daysRemaining > 0 && (
                  <p className="text-xs text-red-600 mt-1">{tenant.daysRemaining} Days</p>
                )}
              </div>

              <div className="mb-4">
                <p className="text-red-600 text-xs font-medium mb-1">Emergency</p>
                <p className="text-xs">{tenant.emergency}</p>
                <p className="text-xs text-gray-500">{tenant.emergencyPhone}</p>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                View
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}