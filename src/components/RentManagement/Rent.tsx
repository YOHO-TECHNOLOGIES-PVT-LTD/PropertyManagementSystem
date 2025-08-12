import React, { useState, useMemo } from "react";



const Rent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [monthFilter, setMonthFilter] = useState("All Months");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);

  const rentData = [
    { id: 1, companyName: "John Doe", amount: "₹25,000", dueDate: "2025-01-30", status: "Paid" },
    { id: 2, companyName: "Sarah Wilson", amount: "₹18,000", dueDate: "2025-02-01", status: "Pending" },
    { id: 3, companyName: "Mike Johnson", amount: "₹15,000", dueDate: "2025-03-09", status: "Overdue" },
    { id: 4, companyName: "Emma Brown", amount: "₹20,000", dueDate: "2025-01-15", status: "Pending" },
  ];

  const months = [
    "All Months", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getStatusStyle = (status: any) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-600";
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      case "Overdue":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const filteredData = useMemo(() => {
    return rentData.filter((item) => {
      const matchesSearch = item.companyName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All Status" ? true : item.status === statusFilter;
      const matchesMonth =
        monthFilter === "All Months"
          ? true
          : months[new Date(item.dueDate).getMonth() + 1] === monthFilter;
      return matchesSearch && matchesStatus && matchesMonth;
    });
  }, [searchTerm, statusFilter, monthFilter]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Rent Management</h1>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700">
          Download Report
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by tenant name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-1/3"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-1/4"
        >
          <option>All Status</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Overdue</option>
        </select>
        <select
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-1/4"
        >
          {months.map((month) => (
            <option key={month}>{month}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">Company Name</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Due Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-3">{item.companyName}</td>
                  <td className="px-4 py-3">{item.amount}</td>
                  <td className="px-4 py-3">{item.dueDate}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-md mt-5 text-sm font-medium ${getStatusStyle(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                   
       <td className="px-4 py-3 flex gap-2">
  <button
    className="bg-purple-100 text-purple-600 px-3 py-1 rounded-lg"
  >
    View
  </button>
    <button
    className="bg-purple-100 text-purple-600 px-3 py-1 rounded-lg"
  >
    Download
  </button>

  
</td>


                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center py-4 text-gray-500" colSpan={5}>
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Rent;
