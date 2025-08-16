import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdCheckCircle, MdOutlineWatchLater, MdDelete } from "react-icons/md";
import smallyellowbg from "../../assets/Dashboard/smallyellowbg.png"
import smallbluebg from "../../assets/Dashboard/smallbluebg.png"
import smallgreenbg from "../../assets/Dashboard/smallgreen.png"
import yel from "../../assets/Notification/yel-icon.png"
import vi from "../../assets/Notification/vi-icon.png"
import blu from "../../assets/Notification/blu-icon.png"
import rose from "../../assets/Notification/rose-icon.png"

interface StatCardProps {
  label: string;
  value: number;
  bgPattern: string;
  iconColor: string;
  bgImage: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  bgPattern,
  bgImage,
  iconColor,
}) => {
  return (
    <div className="flex flex-col justify-between rounded-xl shadow-sm border w-full p-4 relative overflow-hidden min-h-[90px] bg-white">
      <img
        src={bgImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-[70%] opacity-30 z-5"
        style={{
          backgroundImage: `url(${bgPattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="flex items-center gap-2 z-10 relative">
        <img src={iconColor} className="w-14 h-14" />
        <span className="font-medium">{label}</span>
      </div>

      <div className="text-xl font-bold mt-1 z-10 relative pl-4">{value}</div>
    </div>
  );
};


const Dropdown: React.FC<{
  options: string[];
  selected: string;
  onSelect: (val: string) => void;
}> = ({ options, selected, onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="border rounded-lg px-4 py-2 w-40 text-left focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white"
      >
        {selected}
      </button>
      {open && (
        <div className="absolute mt-2 w-40 bg-white border rounded-lg shadow-lg z-20">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onSelect(opt);
                setOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer border-b last:border-b-0 ${selected === opt
                  ? "bg-purple-500 text-white"
                  : "hover:bg-gray-100"
                }`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Notifications: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    {
      label: "Total",
      value: 8,
      bgPattern: "https://via.placeholder.com/150/FFF7E0",
      bgImage: smallyellowbg,
      iconColor: yel,
    },
    {
      label: "Unread",
      value: 4,
      bgPattern: "https://via.placeholder.com/150/FDE7F3",
      bgImage: smallbluebg,
      iconColor: vi,
    },
    {
      label: "High Priority",
      value: 3,
      bgPattern: "https://via.placeholder.com/150/E3F6F2",
      bgImage: smallgreenbg,
      iconColor: blu,
    },
    {
      label: "Today",
      value: 0,
      bgPattern: "https://via.placeholder.com/150/FDE7F3",
      bgImage: smallbluebg,
      iconColor: rose,
    },
  ];

  const notifications = [
    {
      title: "Rent Payment Overdue",
      description:
        "Mike Johnson (Unit 304) has an overdue rent payment of ₹35,000. Payment was due 5 days ago.",
      date: "2/8/2024",
      priority: "High",
      type: "Rent Reminders",
      status: "Unread",
      border: "border-red-300 bg-red-50",
      tagColor: "bg-red-200 text-red-800",
      nicon: rose,
    },
    {
      title: "Payment Received",
      description:
        "John Doe (Unit 101) has successfully paid rent of ₹25,000 via UPI.",
      date: "2/8/2024",
      priority: "Medium",
      type: "Payment Conformation",
      status: "Read",
      border: "border-yellow-300 bg-yellow-50",
      tagColor: "bg-yellow-200 text-yellow-800",
      nicon: yel,
    },
    {
      title: "Lease Expiring Soon",
      description:
        "Sarah Wilson lease for Unit 305 will expire in 30 days. Consider sending renewal notice.",
      date: "2/8/2024",
      priority: "Medium",
      type: "Lease Expiry",
      status: "Unread",
      border: "border-yellow-300 bg-yellow-50",
      tagColor: "bg-yellow-200 text-yellow-800",
      nicon: yel,
    },
    {
      title: "New Maintenance Request",
      description:
        "Urgent electrical issue reported in Unit 304. Power outlet not working in living room.",
      date: "2/8/2024",
      priority: "High",
      type: "Maintenance",
      status: "Unread",
      border: "border-red-300 bg-red-50",
      tagColor: "bg-red-200 text-red-800",
      nicon: rose,
    },
    {
      title: "Monthly Report Generated",
      description:
        "Your January 2024 financial report is ready for download.",
      date: "2/8/2024",
      priority: "Low",
      type: "System",
      status: "Read",
      border: "border-green-300 bg-green-50",
      tagColor: "bg-green-200 text-green-800",
      nicon: vi,
    },
    {
      title: "Rent Due Reminder",
      description:
        "Sarah Wilson (Unit 205) has rent due tomorrow (₹18,000). Send reminder notification.",
      date: "2/8/2024",
      priority: "Medium",
      type: "Rent Reminders",
      status: "Unread",
      border: "border-yellow-300 bg-yellow-50",
      tagColor: "bg-yellow-200 text-yellow-800",
      nicon: yel,
    },
  ];

  const filteredNotifications = notifications.filter((n) => {
    const matchesType =
      typeFilter === "All Types" || n.type === typeFilter;
    const matchesStatus =
      statusFilter === "All" || n.status === statusFilter;
    const matchesSearch =
      searchTerm === "" ||
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-bold">Notifications</h1>
          <p className="text-sm text-gray-500">
            Stay Updated With Important Alerts And Messages
          </p>
        </div>
        <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          ✓ Mark All Read
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>
        <div className="flex gap-3">
          <Dropdown
            options={[
              "All Types",
              "Rent Reminders",
              "Payment Conformation",
              "Lease Expiry",
              "Maintenance",
              "System",
            ]}
            selected={typeFilter}
            onSelect={setTypeFilter}
          />
          <Dropdown
            options={["All", "Unread", "Read"]}
            selected={statusFilter}
            onSelect={setStatusFilter}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((n, i) => (
            <div
              key={i}
              className={`flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg ${n.border}`}
            >
              <div className="flex items-start gap-3">

                <div className="text-blue-500 flex-shrink-0">
                  <img src={n.nicon} className="w-14 h-14 mt-7" />
                </div>

                <div>
                  <h2 className="font-semibold text-sm">{n.title}</h2>
                  <p className="text-sm text-gray-600">{n.description}</p>
                  <span className="text-xs text-gray-400">{n.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-3 md:mt-0">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${n.tagColor}`}
                >
                  {n.priority}
                </span>
                <button className="text-green-500">
                  <MdCheckCircle size={20} />
                </button>
                <button className="text-yellow-500">
                  <MdOutlineWatchLater size={20} />
                </button>
                <button className="text-red-500">
                  <MdDelete size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No notifications found</p>
        )}
      </div>

    </div>
  );
};

export default Notifications;
