

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
            <label className=" text-base text-gray-500">Full Name</label>
            <input className="border text-[#7D7D7D] p-3 rounded-lg w-full" placeholder="JohnDoe" />
          </div>
          <div>
            <label className=" text-base text-gray-500">Email Address</label>
            <input className="border text-[#7D7D7D] p-3 rounded-lg w-full" placeholder="jondoe@Email.Com" />
          </div>
          <div>
            <label className=" text-base text-gray-500">Phone Number</label>
            <input className="border text-[#7D7D7D] p-3 rounded-lg w-full" placeholder="+9109876543" />
          </div>
          <div>
            <label className=" text-base text-gray-500">Unit</label>
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
            <label className=" text-base text-gray-500">Rent Amount</label>
            <input className="border text-[#7D7D7D] p-3 rounded-lg w-full" placeholder="₹25,000 "/>
          </div>
          <div>
            <label className=" text-base text-gray-500">Security Deposit</label>
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
            <label className=" text-base text-gray-500">Lease Start Date</label>
            <div className="flex items-center border rounded-lg px-3">
              <input className="flex-1 text-[#7D7D7D] p-3 outline-none" placeholder="Jun1,2025" />
              <img src={calendar} alt="calendar" className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className=" text-base text-gray-500">Lease End Date</label>
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
            <label className=" text-base text-gray-500">Contact Name</label>
            <input className="border text-[#7D7D7D] p-3 rounded-lg w-full" placeholder="John Doe" />
          </div>
          <div>
            <label className=" text-base text-gray-500">Contact Phone</label>
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
            <table className="min-w-full text-[18px] text-left border-separate border-spacing-y-4 font-Afacad">
              <thead className="border-b bg-white rounded-xl  shadow-md  text-[#0000000] mb-4">
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
                  <tr key={lease.id} className="bg-white rounded-xl   shadow-md">
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
                            ? "bg-red-100 text-red-600 "
                            : "bg-blue-100 text-blue-600 "
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



















// import { useState } from "react";
// import {
//   Search,
//   Download,
//   Eye,
//   Building2,
//   Clock,
//   FileX,
//   Shield,
// } from "lucide-react";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Card, CardContent } from "../../components/ui/card";
// import { Badge } from "../../components/ui/badge";
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "../../components/ui/avatar";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../../components/ui/select";
// import cardimg1 from "../../assets/cardimg1.png";
// import cardimg2 from "../../assets/cardimg2.png";
// import cardimg3 from "../../assets/cardimg3.png";
// import cardimg4 from "../../assets/cardimg4.png";

// function LeaseManagement() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   const cardData = [
//     {
//       id: 1,
//       title: "Active Leases",
//       value: "2",
//       icon: Building2,
//       iconBgColor: "bg-purple-500",
//       gradient: "from-yellow-100 via-orange-50 to-yellow-50",
//       backgroundImage: cardimg1,
//     },
//     {
//       id: 2,
//       title: "Expiring Soon",
//       value: "1",
//       icon: Clock,
//       iconBgColor: "bg-orange-500",
//       gradient: "from-pink-100 via-purple-50 to-pink-50",
//       backgroundImage: cardimg2,
//     },
//     {
//       id: 3,
//       title: "Expired",
//       value: "1",
//       icon: FileX,
//       iconBgColor: "bg-blue-500",
//       gradient: "from-green-100 via-teal-50 to-green-50",
//       backgroundImage: cardimg3,
//     },
//     {
//       id: 4,
//       title: "Security Deposits",
//       value: "₹1,56,000",
//       icon: Shield,
//       iconBgColor: "bg-purple-600",
//       gradient: "from-purple-100 via-pink-50 to-purple-50",
//       backgroundImage: cardimg4,
//     },
//   ];

//   const leaseData = [
//     {
//       id: 1,
//       name: "John Doe",
//       unit: "Unit 101 • 2BHK",
//       avatar: "/placeholder.svg?height=40&width=40",
//       period: "Jun1, 2025 - May 31, 2025",
//       duration: "1Yr",
//       rent: "₹25,000",
//       deposit: "₹50,000",
//       status: "Active",
//       expiry: "May 31, 2025",
//       expiryNote: "Expired 69 Days Ago",
//     },
//     {
//       id: 2,
//       name: "Sarah Wilson",
//       unit: "Unit 205 • 1BHK",
//       avatar: "/placeholder.svg?height=40&width=40",
//       period: "Aug 15, 2025- Aug 14, 2025",
//       duration: "1Yr",
//       rent: "₹18,000",
//       deposit: "₹36,000",
//       status: "Active",
//       expiry: "May 31, 2025",
//       expiryNote: "6 Days Left",
//     },
//     {
//       id: 3,
//       name: "Mike Johnson",
//       unit: "Unit 304 • 3BHK",
//       avatar: "/placeholder.svg?height=40&width=40",
//       period: "Jun1, 2025 - May 31, 2025",
//       duration: "1Yr",
//       rent: "₹35,000",
//       deposit: "₹70,000",
//       status: "Expired",
//       expiry: "May 31, 2025",
//       expiryNote: "Expired 130 Days Ago",
//     },
//   ];

//   const filteredLeaseData = leaseData.filter((lease) => {
//     const matchesSearch =
//       lease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       lease.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       lease.rent.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesStatus =
//       statusFilter === "all" ||
//       lease.status.toLowerCase() === statusFilter.toLowerCase();

//     return matchesSearch && matchesStatus;
//   });

//   return (
//     <div className="min-h-screen  p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">
//               Lease Management
//             </h1>
//             <p className="text-gray-600 mt-1">
//               Manage Tenant Leases And Agreements
//             </p>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {cardData.map((card) => {
//             const IconComponent = card.icon;
//             return (
//               <Card
//                 key={card.id}
//                 className="relative overflow-hidden shadow-md border w-[298px] h-[127px]"
//               >
//                 {/* Background image with precise positioning */}
//                 <div
//                   className="absolute inset-0 bg-no-repeat bg-[length:150%] opacity-35"
//                   style={{
//                     backgroundImage: `url('${card.backgroundImage}')`,
//                     backgroundPosition:
//                       card.backgroundImage === cardimg1
//                         ? "100px 10px"
//                         : card.backgroundImage === cardimg2
//                         ? "-162px -130px"
//                         : card.backgroundImage === cardimg3
//                         ? "-340px -110px"
//                         : card.backgroundImage === cardimg4
//                         ? "-192px -150px"
//                         : "10px 10px",
//                     transform:
//                       card.backgroundImage === cardimg2
//                         ? "rotate(180deg)"
//                         : card.backgroundImage === cardimg3
//                         ? "rotate(180deg)"
//                         : card.backgroundImage === cardimg4
//                         ? "rotate(180deg)"
//                         : "none",
//                     backgroundSize:
//                       card.backgroundImage === cardimg2
//                         ? "110%"
//                         : card.backgroundImage === cardimg3
//                         ? "185%"
//                         : card.backgroundImage === cardimg4
//                         ? "140%"
//                         : "none",
//                   }}
//                 ></div>

//                 {/* White overlay */}
//                 <div className="absolute inset-0 bg-white opacity-30"></div>

//                 {/* Card content with perfect vertical alignment */}
//                 <CardContent className="relative h-full flex flex-col justify-between p-6">
//                   <div className="flex items-center gap-3">
//                     <div className={`p-2 ${card.iconBgColor} rounded-lg`}>
//                       <IconComponent className="w-5 h-5 text-white" />
//                     </div>
//                     <span className="text-sm font-medium text-gray-700">
//                       {card.title}
//                     </span>
//                   </div>
//                   <div className="text-3xl font-bold text-gray-900">
//                     {card.value}
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>

//         {/* Search and Filter */}
//         <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center sm:justify-between">
//           <div className="relative flex-1 max-w-md  items-center">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400 w-4 h-4 mt-2" />
//             <Input
//               type="text"
//               placeholder="Search"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 w-[50%] bg-white border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
//             />
//           </div>

//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger className="w-full sm:w-[140px] bg-purple-50 border-gray-300   rounded-lg h-10 text-purple-600 font-medium hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 ">
//               <SelectValue>
//                 <span className="text-purple-600">
//                   {statusFilter === "all"
//                     ? "All Status"
//                     : statusFilter.charAt(0).toUpperCase() +
//                       statusFilter.slice(1)}
//                 </span>
//               </SelectValue>
//             </SelectTrigger>
//             <SelectContent className="bg-white border-gray-200 rounded-lg shadow-lg">
//               <SelectItem
//                 value="all"
//                 className="text-gray-700 hover:bg-purple-50"
//               >
//                 All Status
//               </SelectItem>
//               <SelectItem
//                 value="active"
//                 className="text-gray-700 hover:bg-purple-50"
//               >
//                 Active
//               </SelectItem>
//               <SelectItem
//                 value="expired"
//                 className="text-gray-700 hover:bg-purple-50"
//               >
//                 Expired
//               </SelectItem>
//               <SelectItem
//                 value="terminated"
//                 className="text-gray-700 hover:bg-purple-50"
//               >
//                 Terminated
//               </SelectItem>
//               <SelectItem
//                 value="renewed"
//                 className="text-gray-700 hover:bg-purple-50"
//               >
//                 Renewed
//               </SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <Card className="shadow-lg border rounded-2xl overflow-hidden ">
//           <CardContent className="p-6">
//             {/* Header Section with separate shadow */}
//             <div className="border shadow-md rounded-xl mb-4 overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full table-fixed">
//                   <colgroup>
//                     <col className="w-[25%]" />
//                     <col className="w-[20%]" />
//                     <col className="w-[18%]" />
//                     <col className="w-[12%]" />
//                     <col className="w-[15%]" />
//                     <col className="w-[10%]" />
//                   </colgroup>
//                   <thead>
//                     <tr className="text-left ">
//                       <th className="px-6 py-4 font-semibold text-gray-700 text-sm">
//                         Tenant & Unit
//                       </th>
//                       <th className="px-6 py-4 font-semibold text-gray-700 text-sm">
//                         Leases Period
//                       </th>
//                       <th className="px-6 py-4 font-semibold text-gray-700 text-sm">
//                         Rent & Deposit
//                       </th>
//                       <th className="px-6 py-4 font-semibold text-gray-700 text-sm">
//                         Status
//                       </th>
//                       <th className="px-6 py-4 font-semibold text-gray-700 text-sm">
//                         Expiry
//                       </th>
//                       <th className="px-6 py-4 font-semibold text-gray-700 text-sm">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                 </table>
//               </div>
//             </div>

//             {/* Body Section with separate shadow */}
//             <div className="space-y-3">
//               {filteredLeaseData.length > 0 ? (
//                 filteredLeaseData.map((lease) => (
//                   <div
//                     key={lease.id}
//                     className="border shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
//                   >
//                     <div className="overflow-x-auto">
//                       <table className="w-full table-fixed">
//                         <colgroup>
//                           <col className="w-[25%]" />
//                           <col className="w-[20%]" />
//                           <col className="w-[18%]" />
//                           <col className="w-[12%]" />
//                           <col className="w-[15%]" />
//                           <col className="w-[10%]" />
//                         </colgroup>
//                         <tbody>
//                           <tr className="hover:bg-gray-50 transition-colors">
//                             <td className="px-6 py-4">
//                               <div className="flex items-center gap-3">
//                                 <Avatar className="w-10 h-10">
//                                   <AvatarImage
//                                     src={lease.avatar || "/placeholder.svg"}
//                                     alt={lease.name}
//                                   />
//                                   <AvatarFallback className="bg-gray-200 text-gray-600 text-sm font-medium">
//                                     {lease.name
//                                       .split(" ")
//                                       .map((n) => n[0])
//                                       .join("")}
//                                   </AvatarFallback>
//                                 </Avatar>
//                                 <div>
//                                   <p className="font-medium text-gray-900 text-sm">
//                                     {lease.name}
//                                   </p>
//                                   <p className="text-xs text-gray-500">
//                                     {lease.unit}
//                                   </p>
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4">
//                               <p className="text-sm text-gray-900">
//                                 {lease.period}
//                               </p>
//                               <p className="text-xs text-gray-500">
//                                 Duration: {lease.duration}
//                               </p>
//                             </td>
//                             <td className="px-6 py-4">
//                               <p className="text-sm text-gray-900 font-medium">
//                                 {lease.rent}
//                               </p>
//                               <p className="text-sm text-green-600 font-medium">
//                                 Deposit: {lease.deposit}
//                               </p>
//                             </td>
//                             <td className="px-6 py-4">
//                               <Badge
//                                 className={
//                                   lease.status === "Active"
//                                     ? "bg-blue-100 text-blue-700 border border-blue-200 font-medium px-3 py-1 rounded-lg"
//                                     : "bg-red-100 text-red-700 border border-red-200 font-medium px-3 py-1 rounded-lg"
//                                 }
//                               >
//                                 {lease.status}
//                               </Badge>
//                             </td>
//                             <td className="px-6 py-4">
//                               <p className="text-sm text-gray-900">
//                                 {lease.expiry}
//                               </p>
//                               <p className="text-xs text-gray-500">
//                                 {lease.expiryNote}
//                               </p>
//                             </td>
//                             <td className="px-6 py-4">
//                               <div className="flex items-center gap-2">
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-2 h-8 w-8"
//                                 >
//                                   <Eye className="w-4 h-4" />
//                                 </Button>
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   className="text-green-600 hover:text-green-700 hover:bg-green-50 p-2 h-8 w-8"
//                                 >
//                                   <Download className="w-4 h-4" />
//                                 </Button>
//                               </div>
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-8">
//                   <p className="text-gray-500 text-sm">
//                     No leases found matching your search criteria.
//                   </p>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// export default LeaseManagement;
