import React, { useState } from 'react';
import { 
  Search, 
  IndianRupee, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Download, 
  Filter, 
  Calendar, 
  CreditCard,
  TrendingUp,
  Users,
  FileText,
  Send,
  Eye,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import ModernCard from '../../components/ui/ModernCard';
import ModernButton from '../../components/ui/ModernButton';
import PaymentModal from '../../components/payments/PaymentModal';
import PDFGenerator from '../../components/reports/PDFGenerator';
import { useNotifications } from '../../components/notifications/NotificationService';

const ModernRentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMonth, setFilterMonth] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [showPDFGenerator, setShowPDFGenerator] = useState(false);
  
  const { sendPaymentConfirmation, sendRentReminder } = useNotifications();

  const payments = [
    {
      id: '1',
      tenant: 'John Doe',
      unit: '101',
      amount: 25000,
      dueDate: '2025-02-01',
      status: 'paid',
      paidDate: '2024-01-30',
      paymentMethod: 'UPI',
      avatar: 'JD'
    },
    {
      id: '2',
      tenant: 'Sarah Wilson',
      unit: '205',
      amount: 18000,
      dueDate: '2025-02-01',
      status: 'pending',
      avatar: 'SW'
    },
    {
      id: '3',
      tenant: 'Mike Johnson',
      unit: '304',
      amount: 35000,
      dueDate: '2024-01-01',
      status: 'overdue',
      avatar: 'MJ'
    },
    {
      id: '4',
      tenant: 'Emily Davis',
      unit: '102',
      amount: 22000,
      dueDate: '2024-02-05',
      status: 'paid',
      paidDate: '2024-02-03',
      paymentMethod: 'Bank Transfer',
      avatar: 'ED'
    },
    {
      id: '5',
      tenant: 'Robert Brown',
      unit: '301',
      amount: 28000,
      dueDate: '2024-02-10',
      status: 'pending',
      avatar: 'RB'
    }
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.unit.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesMonth = !filterMonth || payment.dueDate.includes(filterMonth);
    return matchesSearch && matchesStatus && matchesMonth;
  });

  const handleProcessPayment = (payment: any) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = (paymentData: any) => {
    console.log('Payment processed:', paymentData);
    sendPaymentConfirmation(
      selectedPayment.id,
      selectedPayment.amount,
      paymentData.paymentMethod.type
    );
    setShowPaymentModal(false);
    setSelectedPayment(null);
  };

  const handleSendReminder = (payment: any) => {
    const dueDate = new Date(payment.dueDate);
    sendRentReminder(payment.id, payment.amount, dueDate);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return CheckCircle;
      case 'pending':
        return Clock;
      case 'overdue':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const totalDue = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalPaid = payments.filter(p => p.status === 'paid').reduce((sum, payment) => sum + payment.amount, 0);
  const totalPending = payments.filter(p => p.status !== 'paid').reduce((sum, payment) => sum + payment.amount, 0);
  const paidCount = payments.filter(p => p.status === 'paid').length;
  const pendingCount = payments.filter(p => p.status !== 'paid').length;

  const collectionRate = ((totalPaid / totalDue) * 100).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Rent Management
          </h1>
          <p className="text-gray-600 mt-2">Track payments, manage collections, and generate reports</p>
        </div>
        <div className="flex items-center space-x-3">
          <ModernButton
            variant="outline"
            icon={FileText}
            onClick={() => setShowPDFGenerator(true)}
          >
            Generate Report
          </ModernButton>
          <ModernButton
            variant="primary"
            gradient
            icon={Download}
            onClick={() => setShowPDFGenerator(true)}
          >
            Export Data
          </ModernButton>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ModernCard hover gradient>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Due</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalDue.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-blue-600 mr-1" />
                <span className="text-sm text-blue-600 font-medium">+12.5%</span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <IndianRupee className="w-6 h-6 text-white" />
            </div>
          </div>
        </ModernCard>

        <ModernCard hover gradient>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Collected</p>
              <p className="text-2xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600 font-medium">{collectionRate}%</span>
                <span className="text-sm text-gray-500 ml-1">collection rate</span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </ModernCard>

        <ModernCard hover gradient>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">₹{totalPending.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <Users className="w-4 h-4 text-yellow-600 mr-1" />
                <span className="text-sm text-yellow-600 font-medium">{pendingCount} tenants</span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </ModernCard>

        <ModernCard hover gradient>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Paid Tenants</p>
              <p className="text-2xl font-bold text-indigo-600">{paidCount}</p>
              <div className="flex items-center mt-2">
                <ArrowDownRight className="w-4 h-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-500">of {payments.length} total</span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </ModernCard>
      </div>

      {/* Filters and Search */}
      <ModernCard>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by tenant name or unit number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 w-full bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 focus:bg-white transition-all duration-200"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 focus:bg-white transition-all duration-200"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 focus:bg-white transition-all duration-200"
              >
                <option value="">All Months</option>
                <option value="2024-01">January 2024</option>
                <option value="2024-02">February 2024</option>
                <option value="2024-03">March 2024</option>
              </select>
            </div>
          </div>
        </div>
      </ModernCard>

      {/* Payments Table */}
      <ModernCard>
        <ModernCard.Header
          title="Payment Records"
          subtitle={`${filteredPayments.length} payments found`}
          icon={CreditCard}
        />
        
        <ModernCard.Content>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-2 font-semibold text-gray-700">Tenant</th>
                  <th className="text-left py-4 px-2 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-4 px-2 font-semibold text-gray-700">Due Date</th>
                  <th className="text-left py-4 px-2 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-2 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => {
                  const StatusIcon = getStatusIcon(payment.status);
                  
                  return (
                    <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white font-semibold text-sm">{payment.avatar}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{payment.tenant}</p>
                            <p className="text-sm text-gray-500">Unit {payment.unit}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div>
                          <p className="font-semibold text-gray-900">₹{payment.amount.toLocaleString()}</p>
                          {payment.paymentMethod && (
                            <p className="text-sm text-gray-500">{payment.paymentMethod}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div>
                          <p className="text-gray-900">{payment.dueDate}</p>
                          {payment.paidDate && (
                            <p className="text-sm text-green-600">Paid: {payment.paidDate}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(payment.status)}`}>
                          <StatusIcon className="w-4 h-4 mr-2" />
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-2">
                          <ModernButton
                            variant="ghost"
                            size="sm"
                            icon={Eye}
                          >
                            View
                          </ModernButton>
                          {payment.status !== 'paid' && (
                            <>
                              <ModernButton
                                variant="success"
                                size="sm"
                                icon={CreditCard}
                                onClick={() => handleProcessPayment(payment)}
                              >
                                Pay
                              </ModernButton>
                              <ModernButton
                                variant="warning"
                                size="sm"
                                icon={Send}
                                onClick={() => handleSendReminder(payment)}
                              >
                                Remind
                              </ModernButton>
                            </>
                          )}
                          <ModernButton
                            variant="ghost"
                            size="sm"
                            icon={MoreVertical} children={undefined}                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </ModernCard.Content>
      </ModernCard>

      {/* Payment Modal */}
      {showPaymentModal && selectedPayment && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSubmit={handlePaymentSubmit}
          tenant={{ 
            id: selectedPayment.id, 
            name: selectedPayment.tenant, 
            unitId: selectedPayment.unit 
          }}
          amount={selectedPayment.amount}
        />
      )}

      {/* PDF Generator Modal */}
      {showPDFGenerator && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="p-6 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Generate Rent Report</h3>
                <ModernButton
                  variant="ghost"
                  icon={Download}
                  onClick={() => setShowPDFGenerator(false)} children={undefined}                />
              </div>
            </div>
            <div className="p-6">
              <PDFGenerator
                type="rent"
                data={filteredPayments}
                filters={{
                  month: filterMonth ? filterMonth.split('-')[1] : undefined,
                  year: filterMonth ? parseInt(filterMonth.split('-')[0]) : undefined
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernRentManagement;