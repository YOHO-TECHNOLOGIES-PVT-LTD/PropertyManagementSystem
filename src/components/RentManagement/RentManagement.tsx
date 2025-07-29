import React, { useState } from 'react';
import { Search, IndianRupee, CheckCircle, Clock, AlertCircle, Download, Filter, Calendar, CreditCard } from 'lucide-react';
import PaymentModal from '../../components/payments/PaymentModal';
import PDFGenerator from '../../components/reports/PDFGenerator';
import { useNotifications } from '../../components/notifications/NotificationService';

const RentManagement: React.FC = () => {
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
      paidDate: '2024-01-30'
    },
    {
      id: '2',
      tenant: 'Sarah Wilson',
      unit: '205',
      amount: 18000,
      dueDate: '2025-02-01',
      status: 'pending'
    },
    {
      id: '3',
      tenant: 'Mike Johnson',
      unit: '304',
      amount: 35000,
      dueDate: '2025-02-01',
      status: 'overdue'
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
    // Update payment status
    console.log('Payment processed:', paymentData);
    
    // Send confirmation notification
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
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'overdue':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rent Management</h1>
          <p className="text-gray-600">Track and manage rent payments</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowPDFGenerator(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Due</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalDue.toLocaleString()}</p>
            </div>
            <IndianRupee className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Collected</p>
              <p className="text-2xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">₹{totalPending.toLocaleString()}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
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
              placeholder="Search by tenant or unit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Months</option>
              <option value="2024-01">January 2024</option>
              <option value="2024-02">February 2024</option>
              <option value="2024-03">March 2024</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tenant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPayments.map((payment) => {
              const StatusIcon = getStatusIcon(payment.status);
              
              return (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{payment.tenant}</div>
                      <div className="text-sm text-gray-500">Unit {payment.unit}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">₹{payment.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{payment.dueDate}</div>
                    {payment.paidDate && (
                      <div className="text-sm text-green-600">Paid: {payment.paidDate}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      {payment.status !== 'paid' && (
                        <>
                          <button 
                            onClick={() => handleProcessPayment(payment)}
                            className="text-green-600 hover:text-green-900 flex items-center space-x-1"
                          >
                            <CreditCard className="w-3 h-3" />
                            <span>Pay</span>
                          </button>
                          <button 
                            onClick={() => handleSendReminder(payment)}
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            Remind
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Generate Rent Report</h3>
                <button
                  onClick={() => setShowPDFGenerator(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Download className="w-6 h-6" />
                </button>
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

export default RentManagement;