import { useState } from "react";

import lease1 from "../../assets/lease1.png";
import lease2 from "../../assets/lease2.png";
import lease3 from "../../assets/lease3.png";
import lease4 from "../../assets/lease4.png";
import iconView from "../../assets/iconView.png";
import iconDownload from "../../assets/iconDownload.png";
import iconDownArrow from "../../assets/iconDownArrow.png";
import calendar from "../../assets/calendar.png";
import yellow from "../../assets/yellow.png";
import purple from "../../assets/purple.png";
import green from "../../assets/green.png";
import pink from "../../assets/pink.png";
import image from "../../assets/image.png";

interface LeaseCardProps {
  title: string;
  count: string;
  bg: string;
  icon: string;
  iconBg: string;
}

const LeaseCard = ({ title, count, bg, icon, iconBg }: LeaseCardProps) => {
  return (
    <div
      className="relative bg-[#FFFFFF] rounded-xl shadow p-4 overflow-hidden font-Afacad min-h-[127px]"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10">
        <div className="flex items-center space-x-2 mb-2">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg}`}
          >
            <img src={icon} className="w-5 h-5" alt="icon" />
          </div>
          <p className="font-afacad font-semibold text-[18px] text-[#7D7D7D] leading-[100%] tracking-[0%] capitalize">{title}</p>
        </div>
        <h2 className="text-xl font-semibold">{count}</h2>
      </div>
      <div className="absolute inset-0 bg-white opacity-10 rounded-xl z-0"></div>
    </div>
  );
};

const LeaseManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [selectedLease, setSelectedLease] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState("All Status");

  const leases = [
    {
      id: 1,
      name: "John Doe",
      profilePic: image,
      unit: "Unit 101 · 2BHK",
      leaseStart: "Jun 1, 2025",
      leaseEnd: "May 31, 2025",
      rent: "₹25,000",
      deposit: "₹50,000",
      status: "Active",
      expiry: "Expired 69 Days Ago",
      emergencyContactName: "Jane Doe",
      emergencyContactPhone: "‪‪+91 9876545656‬‬",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      profilePic: image,
      unit: "Unit 205 · 1BHK",
      leaseStart: "Aug 15, 2025",
      leaseEnd: "Aug 14, 2025",
      rent: "₹18,000",
      deposit: "₹36,000",
      status: "Active",
      expiry: "6 Days Left",
      emergencyContactName: "Peter Wilson",
      emergencyContactPhone: "‪‪+91 9854301234‬‬",
    },
    {
      id: 3,
      name: "Mike Johnson",
      profilePic: image,
      unit: "Unit 304 · 3BHK",
      leaseStart: "Jun 1, 2025",
      leaseEnd: "May 31, 2025",
      rent: "₹35,000",
      deposit: "₹70,000",
      status: "Expired",
      expiry: "Expired 130 Days Ago",
    },
  ];

  const filteredLeases = leases.filter((lease) => {
    const matchesSearch = lease.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All Status" || lease.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const LeaseDetailsForm = ({ lease }: { lease: any }) => (
    <div className="bg-white p-6 rounded-lg shadow-md font-Afacad max-h-[90vh] overflow-y-auto">
      {/* Lease Details Header */}
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-3">
          <img src={lease1} alt="icon" className="w-6 h-6" />
          <h2 className="font-semibold text-lg">Lease Details</h2>
        </div>
        <button
          onClick={() => setSelectedLease(null)}
          className="text-gray-500 hover:text-[#7D7D7D] text-xl"
        >
          ✕
        </button>
      </div>

      {/* Personal Information */}
      <div className="mt-4">
        <div className="flex items-center gap-3 mb-3">
          <img src={lease1} alt="icon" className="w-6 h-6" />
          <h3 className="font-semibold">Personal Information</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-base text-gray-500">Full Name</label>
            <input className="border text-[#7D7D7D] p-3 rounded-lg w-full" placeholder="JohnDoe" />
          </div>
          <div>
            <label className="text-sm text-base text-gray-500">Email Address</label>
            <input className="border text-[#7D7D7D] p-3 rounded-lg w-full" placeholder="jondoe@Email.Com" />
          </div>
          <div>
            <label className="text-sm text-base text-gray-500">Phone Number</label>
            <input className="border text-[#7D7D7D] p-3 rounded-lg w-full" placeholder="+9109876543" />
          </div>
          <div>
            <label className="text-sm text-base text-gray-500">Unit</label>
            <input className="border text-[#7D7D7D] p-3 rounded-lg w-full" placeholder="Unit101" />
          </div>
        </div>
      </div>

      {/* Financial Information */}
      <div className="mt-6">
        <div className="flex items-center gap-3 mb-3">
          <img src={lease1} alt="icon" className="w-6 h-6" />
          <h3 className="font-semibold">Financial Information</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-base text-gray-500">Rent Amount</label>
            <input className="border text-[#7D7D7D] p-3 rounded-lg w-full" placeholder="₹25,000 "/>
          </div>
          <div>
            <label className="text-sm text-base text-gray-500">Security Deposit</label>
            <input className="border text-[#7D7D7D] p-3 rounded-lg w-full" placeholder="₹50,000 " />
          </div>
        </div>
      </div>

      {/* Lease Information */}
      <div className="mt-6">
        <div className="flex items-center gap-3 mb-3">
          <img src={lease1} alt="icon" className="w-6 h-6" />
          <h3 className="font-semibold">Lease Information</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm text-base text-gray-500">Lease Start Date</label>
            <div className="flex items-center border rounded-lg px-3">
              <input className="flex-1 text-[#7D7D7D] p-3 outline-none" placeholder="Jun1,2025" />
              <img src={calendar} alt="calendar" className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-base text-gray-500">Lease End Date</label>
            <div className="flex items-center border rounded-lg px-3">
              <input className="flex-1 text-[#7D7D7D] p-3 outline-none" placeholder="May31,2025" />
              <img src={calendar} alt="calendar" className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="mt-6">
        <div className="flex items-center gap-3 mb-3">
          <img src={lease1} alt="icon" className="w-6 h-6" />
          <h3 className="font-semibold">Emergency Contact</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-base text-gray-500">Contact Name</label>
            <input className="border text-[#7D7D7D] p-3 rounded-lg w-full" placeholder="John Doe" />
          </div>
          <div>
            <label className="text-sm text-base text-gray-500">Contact Phone</label>
            <input className="border text-[#7D7D7D] p-3 rounded-lg w-full" placeholder="+91234567890" />
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="mt-6">
        <div className="flex items-center gap-3 mb-3">
          <img src={lease1} alt="icon" className="w-6 h-6" />
          <h3 className="font-semibold">Bank Details</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input className="border p-3 rounded-lg" placeholder="Enter Account Number" />
          <input className="border p-3 rounded-lg" placeholder="Enter Bank Name" />
          <input className="border p-3 rounded-lg" placeholder="Enter IFSC Code" />
          <input className="border p-3 rounded-lg" placeholder="Enter Account Holder Name" />
        </div>
      </div>

      {/* Close Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => setSelectedLease(null)}
          className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-8 font-Afacad bg-[#FFFFFF] min-h-screen">
      {!selectedLease ? (
        <>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-Afacad font-bold">Lease Management</h1>
            <p className="text-gray-500">Manage Tenant Leases And Agreements</p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10 font-Afacad">
            <LeaseCard title="Active Leases" count="2" bg={yellow} icon={lease1} iconBg="bg-purple-100" />
            <LeaseCard title="Expiring Soon" count="1" bg={purple} icon={lease2} iconBg="bg-yellow-100" />
            <LeaseCard title="Expired" count="1" bg={green} icon={lease3} iconBg="bg-green-100" />
            <LeaseCard title="Security Deposits" count="₹1,56,000" bg={pink} icon={lease4} iconBg="bg-pink-100" />
          </div>

          {/* Search + Filter */}
          <div className="flex items-center font-Afacad justify-between mb-8">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-1/3 px-4 py-3 border border-gray-300 rounded-lg bg-purple-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <div className="relative ml-4">
              <button
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                className="flex items-center space-x-1 bg-[#F7E5FF] shadow px-4 py-2 rounded-md text-sm text-purple-600"
              >
                <span>{statusFilter}</span>
                <img src={iconDownArrow} alt="down arrow" className="w-4 h-4" />
              </button>
              {isStatusDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg p-4 space-y-3 font-semibold text-gray-700 z-50">
                  {["All Status", "Active", "Expired", "Terminated", "Renewed"].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setIsStatusDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg border border-gray-300 hover:bg-purple-50 ${
                        statusFilter === status ? "bg-purple-100" : ""
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white p-6 rounded-lg font-Afacad shadow-md overflow-x-auto">
            <table className="min-w-full text-[18px] text-left font-Afacad">
              <thead className="border-b bg-white text-[#0000000] mb-4">
                <tr>
                  <th className="py-4 px-6 font-semibold">Tenant & Unit</th>
                  <th className="py-4 px-6 font-semibold">Leases Period</th>
                  <th className="py-4 px-6 font-semibold">Rent & Deposit</th>
                  <th className="py-4 px-6 font-semibold">Status</th>
                  <th className="py-4 px-6 font-semibold">Expiry</th>
                  <th className="py-4 px-6 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeases.map((lease) => (
                  <tr key={lease.id} className="bg-white rounded-lg shadow-md">
                    <td className="py-5 px-6 flex items-center space-x-4 rounded-lg">
                      <img
                        src={lease.profilePic}
                        alt={`${lease.name} profile`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-[Afacad] font-semibold text-[18px] leading-[100%] tracking-[0%] capitalize">
                          {lease.name}
                        </div>
                        <div className="font-[Afacad] font-normal text-[15px] leading-[100%] tracking-[0%] capitalize text-[#7D7D7D]">
                          {lease.unit}
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-[#7D7D7D] font-[Afacad] font-semibold text-[16px] leading-[100%] tracking-[0%] capitalize">
                      {lease.leaseStart} - {lease.leaseEnd}
                      <div className="font-[Afacad] font-normal text-[18px] leading-[100%] tracking-[0%] capitalize text-[#7D7D7D]">
                        Duration: 1Yr
                      </div>
                    </td>
                    <td className="py-5 px-6 font-[Afacad] font-bold text-[16px] leading-[100%] tracking-[0%] capitalize text-[#7D7D7D]">
                      {lease.rent}
                      <div className="text-[#1CAF19] font-[Afacad] font-normal text-[18px] leading-[100%] tracking-[0%] capitalize">
                        Deposit: {lease.deposit}
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span
                        className={`px-6 py-2 text-sm rounded-lg font-medium ${
                          lease.status === "Expired"
                            ? "bg-red-100 text-red-600 border border-[#EE2F2F]"
                            : "bg-blue-100 text-blue-600 border border-[#0D35D4]"
                        }`}
                      >
                        {lease.status}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-[#7D7D7D] font-[Afacad] font-semibold text-[16px] leading-[100%] tracking-[0%] capitalize">
                      {lease.leaseEnd}
                      <div className="font-[Afacad] font-normal text-[18px] leading-[100%] tracking-[0%] capitalize text-[#7D7D7D]">
                        {lease.expiry}
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={iconView}
                          className="w-6 h-6 cursor-pointer"
                          alt="view"
                          onClick={() => setSelectedLease(lease)}
                        />
                        <img
                          src={iconDownload}
                          className="w-6 h-6 cursor-pointer"
                          alt="download"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
  <LeaseDetailsForm lease={selectedLease} />
      )}
    </div>
  );
};

export default LeaseManagement;