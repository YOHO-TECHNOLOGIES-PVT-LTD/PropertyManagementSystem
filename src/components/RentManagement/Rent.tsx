import React, { useState, useMemo, useRef, useEffect } from "react";
import { Building2, X } from "lucide-react";
import Card2 from "./Card";
import frame1 from "../../assets/Bg_Frames/Frame_1.png";
import frame2 from "../../assets/Bg_Frames/Frame_2.png";
import frame3 from "../../assets/Bg_Frames/Frame_3.png";
import { BiSolidBuildings } from "react-icons/bi";
import { Input } from "../ui/input";
import { FONTS } from "../../constants/ui constants";

interface RentItem {
  id: number;
  fullName: string;
  companyName: string;
  amount: string;
  dueDate: string;
  status: string;
  unit: number;
  email: string;
  phone: string;
  address: string;
  propertyType: string;
  securityDeposit: string;
  leaseStartDate: string;
  leaseEndDate: string;
  emergencyContact: string;
  bankDetails: string;
}

interface FormData {
  emailAddress: string;
  phoneNumber: string;
  propertyName: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  propertyType: string;
  unit: string;
  amount: string;
  dueDate: string;
  status: string;
  securityDeposit: string;
  leaseStartDate: string;
  leaseEndDate: string;
  emergencyContact: string;
  bankDetails: string;
  tenantAddress: string;
  monthlyRent: string;
  paymentStatus: string;
  contactName: string;
  contactNumber: string;
  relationship: string;
  accountNumber: string;
  accountHolderName: string;
  ifscCode: string;
  bankName: string;
}

const Rent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [monthFilter, setMonthFilter] = useState("All Months");
  const [modalData, setModalData] = useState<RentItem | null>(null);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] =
    useState<boolean>(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] =
    useState<boolean>(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [rentData, setRentData] = useState<RentItem[]>([
    {
      id: 1,
      fullName: "John Doe",
      companyName: "John Doe",
      amount: "₹21,000",
      dueDate: "2025-01-30",
      status: "Paid",
      unit: 101,
      email: "john@example.com",
      phone: "+91 9876543210",
      address: "123 Main St",
      propertyType: "Office",
      securityDeposit: "₹42,000",
      leaseStartDate: "2024-01-01",
      leaseEndDate: "2025-01-01",
      emergencyContact: "+91 9876543211",
      bankDetails: "HDFC Bank - 1234567890",
    },
    {
      id: 2,
      fullName: "John DuraiRaj",
      companyName: "John DuraiRaj",
      amount: "₹75,000",
      dueDate: "2025-01-30",
      status: "Overdue",
      unit: 101,
      email: "john@example.com",
      phone: "+91 9876543210",
      address: "123 Main St",
      propertyType: "Office",
      securityDeposit: "₹42,000",
      leaseStartDate: "2024-01-01",
      leaseEndDate: "2025-01-01",
      emergencyContact: "+91 9876543211",
      bankDetails: "HDFC Bank - 1234567890",
    },
    {
      id: 3,
      fullName: "Leo",
      companyName: "Leo",
      amount: "₹18,000",
      dueDate: "2025-01-30",
      status: "Pending",
      unit: 101,
      email: "john@example.com",
      phone: "+91 9876543210",
      address: "123 Main St",
      propertyType: "Office",
      securityDeposit: "₹42,000",
      leaseStartDate: "2024-01-01",
      leaseEndDate: "2025-01-01",
      emergencyContact: "+91 9876543211",
      bankDetails: "HDFC Bank - 1234567890",
    },
  ]);

  const [formData, setFormData] = useState<FormData>({
    emailAddress: "",
    phoneNumber: "",
    propertyName: "",
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    address: "",
    propertyType: "Office",
    unit: "",
    amount: "",
    dueDate: "",
    status: "Pending",
    securityDeposit: "",
    leaseStartDate: "",
    leaseEndDate: "",
    emergencyContact: "",
    bankDetails: "",
    tenantAddress: "",
    monthlyRent: "",
    paymentStatus: "Pending",
    contactName: "",
    contactNumber: "",
    relationship: "",
    accountNumber: "",
    accountHolderName: "",
    ifscCode: "",
    bankName: "",
  });

  const months = [
    "All Months",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const statusOptions = ["Paid", "Pending", "Overdue"];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-[#1CAF191A] border-[#1CAF19] text-[#1CAF19]";
      case "Pending":
        return "bg-[#FFC3001A] border-[#FFC300] text-[#FFC300]";
      case "Overdue":
        return "bg-[#E212691A] border-[#E21269] text-[#E21269]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      if (!openDropdownId) return;
      const target = e.target as Node;
      if (
        badgeRef.current &&
        dropdownRef.current &&
        !badgeRef.current.contains(target) &&
        !dropdownRef.current.contains(target)
      ) {
        setOpenDropdownId(null);
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdownId(null);
    };

    document.addEventListener("mousedown", handleDocClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleDocClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [openDropdownId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields = [
      "fullName",
      "emailAddress",
      "phoneNumber",
      "propertyName",
      "propertyType",
      "unit",
      "tenantAddress",
      "monthlyRent",
      "securityDeposit",
      "paymentStatus",
      "leaseStartDate",
      "leaseEndDate",
      "contactName",
      "contactNumber",
      "relationship",
      "accountNumber",
      "accountHolderName",
      "ifscCode",
      "bankName",
    ];

    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof FormData]
    );

    if (missingFields.length > 0) {
      alert(
        `Please fill in all required fields. Missing: ${missingFields.join(
          ", "
        )}`
      );
      return;
    }

    const newEntry: RentItem = {
      fullName: formData.fullName,
      id: rentData.length + 1,
      companyName: formData.companyName || formData.fullName,
      amount: formData.monthlyRent.startsWith("₹")
        ? formData.monthlyRent
        : `₹${formData.monthlyRent}`,
      dueDate: formData.leaseStartDate,
      status: formData.paymentStatus,
      unit: parseInt(formData.unit || "0"),
      email: formData.emailAddress,
      phone: formData.phoneNumber,
      address: formData.tenantAddress,
      propertyType: formData.propertyType,
      securityDeposit: formData.securityDeposit.startsWith("₹")
        ? formData.securityDeposit
        : `₹${formData.securityDeposit}`,
      leaseStartDate: formData.leaseStartDate,
      leaseEndDate: formData.leaseEndDate,
      emergencyContact: `${formData.contactName} - ${formData.contactNumber}`,
      bankDetails: `${formData.bankName} - ${formData.accountNumber} (${formData.ifscCode})`,
    };

    setRentData((prev) => [...prev, newEntry]);
    setFormData({
      emailAddress: "",
      phoneNumber: "",
      propertyName: "",
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      address: "",
      propertyType: "Office",
      unit: "",
      amount: "",
      dueDate: "",
      status: "Pending",
      securityDeposit: "",
      leaseStartDate: "",
      leaseEndDate: "",
      emergencyContact: "",
      bankDetails: "",
      tenantAddress: "",
      monthlyRent: "",
      paymentStatus: "Pending",
      contactName: "",
      contactNumber: "",
      relationship: "",
      accountNumber: "",
      accountHolderName: "",
      ifscCode: "",
      bankName: "",
    });

    setIsAddFormOpen(false);
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setRentData((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    setOpenDropdownId(null);
  };

  const filteredData = useMemo(() => {
    return rentData.filter((item) => {
      const matchesSearch = item.companyName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All Status" ? true : item.status === statusFilter;
      const matchesMonth =
        monthFilter === "All Months"
          ? true
          : months[new Date(item.dueDate).getMonth() + 1] === monthFilter;
      return matchesSearch && matchesStatus && matchesMonth;
    });
  }, [searchTerm, statusFilter, monthFilter, rentData]);

  const parseAmount = (amt: string) => Number(amt.replace(/[₹,]/g, "")) || 0;

  const totalDue = rentData.reduce(
    (sum, item) => sum + parseAmount(item.amount),
    0
  );
  const totalPaid = rentData
    .filter((item) => item.status === "Paid")
    .reduce((sum, item) => sum + parseAmount(item.amount), 0);
  const totalPending = rentData
    .filter((item) => item.status === "Pending")
    .reduce((sum, item) => sum + parseAmount(item.amount), 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="font-bold">
          <span className="text-3xl"> Rent Management </span>
          <br />
          <span className="text-md font-normal text-gray-600">
            Track and Manage Rent Payments
          </span>
        </div>
      </div>

      <div className="flex mb-6 gap-6">
        <Card2
          bgImage={frame1}
          icon={<Building2 />}
          title="Total Due"
          subText="This Month"
          value={`₹${totalDue.toLocaleString()}`}
          iconBg="bg-pink-200"
          iconTextColor="text-pink-600"
        />
        <Card2
          bgImage={frame2}
          icon={<Building2 />}
          title="Collected"
          subText="This Month"
          value={`₹${totalPaid.toLocaleString()}`}
          iconBg="bg-green-200"
          iconTextColor="text-green-600"
        />
        <Card2
          bgImage={frame3}
          icon={<Building2 />}
          title="Pending"
          subText="This Month"
          value={`₹${totalPending.toLocaleString()}`}
          iconBg="bg-yellow-200"
          iconTextColor="text-yellow-600"
        />
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Header filters */}
        <div className="relative w-28 ml-auto ">
          <div
            className="border border-gray-300 rounded-lg px-3 py-2 w-full cursor-pointer flex items-center  justify-between bg-[#B200FF1A]"
            onClick={() => {
              setIsStatusDropdownOpen((prev) => !prev);
              setStatusFilter((prev) =>
                prev === "All Status" ? "All Status" : prev
              );
            }}
          >
            <span className="text-[#B200FF]">{statusFilter}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {isStatusDropdownOpen && (
            <div className="absolute w-full bg-white text-[#7D7D7D] shadow-xl mt-1 rounded-lg border border-gray-300 z-10 overflow-y-auto p-2 space-y-2">
              {statusOptions.map((status) => (
                <div
                  key={status}
                  onClick={() => {
                    setStatusFilter(status);
                    setIsStatusDropdownOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md active:bg-[#B200FF] active:text-white cursor-pointer border  transition-colors ${
                    statusFilter === status ? "bg-[#B200FF] text-white" : ""
                  }`}
                >
                  {status}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative w-28 ">
          <div
            className="border border-gray-300 rounded-lg px-3 py-2 w-full cursor-pointer flex items-center justify-between bg-[#B200FF1A]"
            onClick={() => {
              setIsMonthDropdownOpen((prev) => !prev);
              setMonthFilter((prev) =>
                prev === "All Months" ? "All Months" : prev
              );
            }}
          >
            <span className="text-[#B200FF]">{monthFilter}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {isMonthDropdownOpen && (
            <div className="absolute w-full text-[#7D7D7D] bg-white shadow-xl rounded-lg mt-1 border border-gray-300 z-10 overflow-y-auto p-2 space-y-2">
              {months.map((month) => (
                <div
                  key={month}
                  onClick={() => {
                    setMonthFilter(month);
                    setIsMonthDropdownOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md active:bg-[#B200FF] active:text-white cursor-pointer border  transition-colors ${
                    monthFilter === month ? "bg-[#B200FF] text-white" : ""
                  }`}
                >
                  {month}
                </div>
              ))}
            </div>
          )}{" "}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl p-3 shadow overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-6">
          <thead className="bg-gray-100" style={{ ...FONTS.Table_Header }}>
            <tr>
              <th className="px-6 py-4 rounded-l-lg">Company Name</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 rounded-r-lg">Actions</th>
            </tr>
          </thead>
          <tbody style={{ ...FONTS.Table_Body }}>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="shadow-sm text-[#7D7D7D] hover:shadow-md transition-shadow"
                >
                  <td className="px-6 py-4 flex rounded-l-lg text-lg border-l border-t border-b border-gray-200">
                    <span
                      className={`rounded p-2 flex items-center justify-center ${getStatusStyle(
                        item.status
                      )}`}
                    >
                      <BiSolidBuildings className="text-2xl" />
                    </span>
                    <div className="grid ml-3">
                      <span className="font-bold text-black">
                        {item.companyName}
                      </span>
                      <span className="text-sm">Unit {item.unit}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 border-t border-b border-gray-200">
                    {item.amount}
                  </td>

                  <td className="px-6 py-4 border-t border-b border-gray-200">
                    {item.dueDate}
                  </td>

                  <td className="px-6 py-4 border-t border-b border-gray-200 relative">
                    <div
                      ref={(el) => {
                        if (openDropdownId === item.id && el)
                          badgeRef.current = el;
                      }}
                      onClick={(e) => {
                        badgeRef.current = e.currentTarget as HTMLDivElement;
                        setOpenDropdownId((prev) =>
                          prev === item.id ? null : item.id
                        );
                      }}
                      className={`inline-flex items-center justify-between cursor-pointer h-10 px-3 py-1 rounded-md border text-sm font-medium ${getStatusStyle(
                        item.status
                      )} min-w-[100px]`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span>{item.status}</span>
                      </span>

                      <svg
                        className={`w-4 h-4 ml-2 transition-transform ${
                          openDropdownId === item.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>

                    {/* dropdown */}
                    {openDropdownId === item.id && (
                      <div
                        ref={dropdownRef}
                        style={{
                          minWidth: badgeRef.current
                            ? `${badgeRef.current.offsetWidth}px`
                            : undefined,
                        }}
                        className="absolute left-0 mt-1 bg-white shadow-xl rounded-lg border border-gray-300 z-10 overflow-y-auto p-2 space-y-2"
                      >
                        {statusOptions.map((s) => (
                          <div
                            key={s}
                            onClick={() => handleStatusChange(item.id, s)}
                            className={`flex items-center px-3 text-[#7D7D7D] py-2 rounded-md cursor-pointer border hover:bg-blue-50 transition-colors ${
                              item.status === s
                                ? "bg-blue-100 text-blue-600"
                                : ""
                            }`}
                          >
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 rounded-r-lg border-r border-t border-b border-gray-200">
                    <div className="flex gap-2">
                      <button
                        className="bg-[#B200FF] text-white px-3 h-10 py-1 rounded-lg  transition-colors"
                        onClick={() => setIsAddFormOpen(true)}
                      >
                        View
                      </button>
                      <button className="bg-[#B200FF] text-white px-3 py-1 rounded-lg  transition-colors">
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center py-8 text-gray-500" colSpan={5}>
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Form Modal */}
      {isAddFormOpen && (
        <div className="fixed text-[#7D7D7D] inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 flex">
                 <span className="bg-[#3065A426] rounded-full h-8 w-8 mr-3"> <Building2 size={20} className="mt-1.5 ml-1.5 text-[]"/></span> Add New Tenant
                </h2>
                <button
                  onClick={() => setIsAddFormOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <h3 className="col-span-2 text-lg font-semibold text-gray-900 flex items-center gap-2 border-b pb-2">
               <span className="bg-[#3065A426] rounded-full h-8 w-8"> <Building2 size={20} className="mt-1.5 ml-1.5 text-[]"/></span>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                {[
                  { label: "Full Name *", name: "fullName", type: "text" },
                  {
                    label: "Email Address *",
                    name: "emailAddress",
                    type: "email",
                  },
                  { label: "Phone Number *", name: "phoneNumber", type: "tel" },
                  { label: "Company Name", name: "companyName", type: "text" },
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <Input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof FormData]}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 h-12 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required={field.label.includes("*")}
                    />
                  </div>
                ))}

                {/* Property Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type *
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 h-12 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="Office">Office</option>
                    <option value="Retail">Retail</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Residential">Residential</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Name *
                  </label>
                  <Input
                    type="text"
                    name="propertyName"
                    value={formData.propertyName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 h-12 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit Number *
                  </label>
                  <Input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 h-12 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tenant Address *
                  </label>
                  <textarea
                    name="tenantAddress"
                    value={formData.tenantAddress}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              {/* Financial Information */}
              <h3 className="col-span-2 text-lg font-semibold text-gray-900 flex items-center gap-2 border-b pb-2 mt-8">
                <span className="bg-[#3065A426] rounded-full h-8 w-8"> <Building2 size={20} className="mt-1.5 ml-1.5 text-[]"/></span>
                Financial Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                {[
                  {
                    label: "Monthly Rent (₹) *",
                    name: "monthlyRent",
                    type: "number",
                  },
                  {
                    label: "Security Deposit (₹) *",
                    name: "securityDeposit",
                    type: "number",
                  },
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <Input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof FormData]}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 h-12 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Status *
                  </label>
                  <select
                    name="paymentStatus"
                    value={formData.paymentStatus}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 h-12 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>

              {/* Lease Information */}
              <h3 className="col-span-2 text-lg font-semibold text-gray-900 flex items-center gap-2 border-b pb-2 mt-8">
                <span className="bg-[#3065A426] rounded-full h-8 w-8"> <Building2 size={20} className="mt-1.5 ml-1.5 text-[]"/></span>
                Lease Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                {[
                  {
                    label: "Lease Start Date *",
                    name: "leaseStartDate",
                    type: "date",
                  },
                  {
                    label: "Lease End Date *",
                    name: "leaseEndDate",
                    type: "date",
                  },
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <Input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof FormData]}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 h-12 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                ))}
              </div>

              {/* Emergency Contact */}
              <h3 className="col-span-2 text-lg font-semibold text-gray-900 flex items-center gap-2 border-b pb-2 mt-8">
                <span className="bg-[#3065A426] rounded-full h-8 w-8"> <Building2 size={20} className="mt-1.5 ml-1.5 text-[]"/></span>
                Emergency Contact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                {[
                  {
                    label: "Contact Name *",
                    name: "contactName",
                    type: "text",
                  },
                  {
                    label: "Contact Number *",
                    name: "contactNumber",
                    type: "tel",
                  },
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <Input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof FormData]}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 h-12 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Relationship *
                  </label>
                  <select
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 h-12 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select Relationship</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Parent">Parent</option>
                    <option value="Friend">Friend</option>
                    <option value="Business Partner">Business Partner</option>
                  </select>
                </div>
              </div>

              {/* Bank Details */}
              <h3 className="col-span-2 text-lg font-semibold text-gray-900 flex items-center gap-2 border-b pb-2 mt-8">
                <span className="bg-[#3065A426] rounded-full h-8 w-8"> <Building2 size={20} className="mt-1.5 ml-1.5 text-[]"/></span>
                Bank Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                {[
                  {
                    label: "Account Number *",
                    name: "accountNumber",
                    type: "text",
                  },
                  {
                    label: "Account Holder Name *",
                    name: "accountHolderName",
                    type: "text",
                  },
                  { label: "Bank Name *", name: "bankName", type: "text" },
                  { label: "IFSC Code *", name: "ifscCode", type: "text" },
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <Input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof FormData]}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 h-12 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsAddFormOpen(false)}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#B200FF] text-white rounded-lg transition-colors font-medium"
                >
                  Add Rent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rent;
