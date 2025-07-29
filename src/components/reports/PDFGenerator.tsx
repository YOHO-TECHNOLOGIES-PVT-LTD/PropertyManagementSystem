import React from 'react';
import { Download, FileText, Calendar, IndianRupee } from 'lucide-react';

interface PDFGeneratorProps {
  type: 'rent' | 'financial' | 'tenant' | 'maintenance';
  data: any[];
  filters?: {
    month?: string;
    year?: number;
    propertyId?: string;
    tenantId?: string;
  };
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ type, data, filters }) => {
  const generatePDF = () => {
    // In a real implementation, this would use a library like jsPDF or react-pdf
    const pdfContent = generatePDFContent();
    
    // Create blob and download
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${type}-report-${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generatePDFContent = () => {
    // This is a simplified version. In reality, you'd use a proper PDF library
    const header = `Property Management System - ${type.charAt(0).toUpperCase() + type.slice(1)} Report`;
    const date = new Date().toLocaleDateString();
    
    let content = `${header}\nGenerated on: ${date}\n\n`;
    
    if (type === 'rent') {
      content += generateRentReport();
    } else if (type === 'financial') {
      content += generateFinancialReport();
    } else if (type === 'tenant') {
      content += generateTenantReport();
    } else if (type === 'maintenance') {
      content += generateMaintenanceReport();
    }
    
    return content;
  };

  const generateRentReport = () => {
    let content = 'RENT COLLECTION REPORT\n';
    content += '========================\n\n';
    
    if (filters?.month && filters?.year) {
      content += `Period: ${filters.month} ${filters.year}\n\n`;
    }
    
    const totalDue = data.reduce((sum, payment) => sum + payment.amount, 0);
    const totalPaid = data.filter(p => p.status === 'paid').reduce((sum, payment) => sum + payment.amount, 0);
    const totalPending = totalDue - totalPaid;
    const paidTenants = data.filter(p => p.status === 'paid').length;
    const pendingTenants = data.filter(p => p.status !== 'paid').length;
    
    content += `SUMMARY:\n`;
    content += `Total Rent Due: ₹${totalDue.toLocaleString()}\n`;
    content += `Total Paid: ₹${totalPaid.toLocaleString()}\n`;
    content += `Total Pending: ₹${totalPending.toLocaleString()}\n`;
    content += `Paid Tenants: ${paidTenants}\n`;
    content += `Pending Tenants: ${pendingTenants}\n\n`;
    
    content += `TENANT-WISE DETAILS:\n`;
    content += `${'Tenant Name'.padEnd(20)} ${'Unit'.padEnd(8)} ${'Amount'.padEnd(12)} ${'Status'.padEnd(10)} ${'Due Date'.padEnd(12)}\n`;
    content += '-'.repeat(70) + '\n';
    
    data.forEach(payment => {
      const tenant = payment.tenant || { name: 'Unknown', unitId: 'N/A' };
      content += `${tenant.name.padEnd(20)} ${tenant.unitId.padEnd(8)} ₹${payment.amount.toString().padEnd(10)} ${payment.status.padEnd(10)} ${payment.dueDate.toLocaleDateString().padEnd(12)}\n`;
    });
    
    return content;
  };

  const generateFinancialReport = () => {
    let content = 'FINANCIAL REPORT\n';
    content += '================\n\n';
    
    const totalIncome = data.reduce((sum, item) => sum + (item.income || 0), 0);
    const totalExpenses = data.reduce((sum, item) => sum + (item.expenses || 0), 0);
    const netIncome = totalIncome - totalExpenses;
    
    content += `FINANCIAL SUMMARY:\n`;
    content += `Total Income: ₹${totalIncome.toLocaleString()}\n`;
    content += `Total Expenses: ₹${totalExpenses.toLocaleString()}\n`;
    content += `Net Income: ₹${netIncome.toLocaleString()}\n\n`;
    
    return content;
  };

  const generateTenantReport = () => {
    let content = 'TENANT REPORT\n';
    content += '=============\n\n';
    
    content += `Total Tenants: ${data.length}\n\n`;
    
    content += `TENANT DETAILS:\n`;
    content += `${'Name'.padEnd(20)} ${'Unit'.padEnd(8)} ${'Rent'.padEnd(12)} ${'Status'.padEnd(12)} ${'Lease End'.padEnd(12)}\n`;
    content += '-'.repeat(70) + '\n';
    
    data.forEach(tenant => {
      content += `${tenant.name.padEnd(20)} ${tenant.unitId.padEnd(8)} ₹${tenant.monthlyRent.toString().padEnd(10)} ${tenant.paymentStatus.padEnd(12)} ${tenant.leaseEndDate.toLocaleDateString().padEnd(12)}\n`;
    });
    
    return content;
  };

  const generateMaintenanceReport = () => {
    let content = 'MAINTENANCE REPORT\n';
    content += '==================\n\n';
    
    const openRequests = data.filter(r => r.status === 'open').length;
    const inProgressRequests = data.filter(r => r.status === 'in_progress').length;
    const completedRequests = data.filter(r => r.status === 'completed').length;
    
    content += `SUMMARY:\n`;
    content += `Open Requests: ${openRequests}\n`;
    content += `In Progress: ${inProgressRequests}\n`;
    content += `Completed: ${completedRequests}\n\n`;
    
    content += `REQUEST DETAILS:\n`;
    content += `${'Title'.padEnd(25)} ${'Unit'.padEnd(8)} ${'Category'.padEnd(12)} ${'Priority'.padEnd(10)} ${'Status'.padEnd(12)}\n`;
    content += '-'.repeat(75) + '\n';
    
    data.forEach(request => {
      content += `${request.title.padEnd(25)} ${request.unitId.padEnd(8)} ${request.category.padEnd(12)} ${request.priority.padEnd(10)} ${request.status.padEnd(12)}\n`;
    });
    
    return content;
  };

  const getReportIcon = () => {
    switch (type) {
      case 'rent':
        return IndianRupee;
      case 'financial':
        return FileText;
      case 'tenant':
        return Calendar;
      case 'maintenance':
        return FileText;
      default:
        return FileText;
    }
  };

  const getReportTitle = () => {
    switch (type) {
      case 'rent':
        return 'Rent Collection Report';
      case 'financial':
        return 'Financial Report';
      case 'tenant':
        return 'Tenant Report';
      case 'maintenance':
        return 'Maintenance Report';
      default:
        return 'Report';
    }
  };

  const Icon = getReportIcon();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{getReportTitle()}</h3>
            <p className="text-sm text-gray-600">
              {data.length} records • Generated on {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
        <button
          onClick={generatePDF}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </button>
      </div>

      {/* Report Preview */}
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <h4 className="font-medium text-gray-900 mb-3">Report Preview</h4>
        
        {type === 'rent' && (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Records:</span>
              <span className="font-medium">{data.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-medium">₹{data.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Paid:</span>
              <span className="font-medium text-green-600">
                ₹{data.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pending:</span>
              <span className="font-medium text-yellow-600">
                ₹{data.filter(p => p.status !== 'paid').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {type === 'tenant' && (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Tenants:</span>
              <span className="font-medium">{data.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active Leases:</span>
              <span className="font-medium text-green-600">
                {data.filter(t => t.paymentStatus === 'paid').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pending Payments:</span>
              <span className="font-medium text-yellow-600">
                {data.filter(t => t.paymentStatus === 'pending').length}
              </span>
            </div>
          </div>
        )}

        {type === 'maintenance' && (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Requests:</span>
              <span className="font-medium">{data.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Open:</span>
              <span className="font-medium text-red-600">
                {data.filter(r => r.status === 'open').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Completed:</span>
              <span className="font-medium text-green-600">
                {data.filter(r => r.status === 'completed').length}
              </span>
            </div>
          </div>
        )}

        {filters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h5 className="font-medium text-gray-700 mb-2">Applied Filters:</h5>
            <div className="flex flex-wrap gap-2">
              {filters.month && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                  Month: {filters.month}
                </span>
              )}
              {filters.year && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                  Year: {filters.year}
                </span>
              )}
              {filters.propertyId && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                  Property: {filters.propertyId}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFGenerator;