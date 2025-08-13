import React, { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Profileicon from "../../assets/profileicon.png";
import pmsicon from "../../assets/pmsicon (2).png";

export default function Navbar({ isSidebarOpen, toggleSidebar }) {
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  
  const searchSuggestions = [
    { title: "Properties", path: "/properties" },
    { title: "Tenants", path: "/tenants" },
    { title: "Lease Management", path: "/lease" },
    { title: "Rent Management", path: "/rent" },
    { title: "Financial Reports", path: "/finance" },
    { title: "Maintenance", path: "/maintenance" },
    { title: "Settings", path: "/settings" },
  ];
  
  const filteredSuggestions = searchQuery
    ? searchSuggestions.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowNotificationDropdown(false);
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(e.target.value.length > 0);
  };

  const handleSearchItemClick = (path) => {
    setSearchQuery("");
    setShowSearchResults(false);
    navigate(path);
  };

  const handleViewNotification = () => {
    setShowNotificationDropdown(false);
    navigate("/notifications");
  };

  const handleViewProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="flex w-full gap-5">
    <div
  className={`flex items-center justify-start h-[80px] bg-white shadow-md rounded-br-xl rounded-bl-xl  ${isSidebarOpen?"px-4":"px-2"} cursor-pointer transition-all duration-300`}
  style={{ width: isSidebarOpen ? "250px" : "80px" }}
  onClick={toggleSidebar} 
>
  <img
  className="object-fit w-[65px]"
    src={pmsicon}
    alt="logo"
    // style={{ width: isSidebarOpen ? "60px" : "80px",
    //     height: isSidebarOpen ? "25px" : "40px",
    //  }}
    onClick={(e) => e.stopPropagation()} // prevents parent click
  />
  <span
    className={`ml-3 text-lg font-semibold text-gray-800 whitespace-nowrap transition-all duration-300 ${
      isSidebarOpen ? "opacity-100" : "opacity-0"
    }`}
  >
    MGM Properties
  </span>
</div>



      {/* Right: Search + Notification + Profile */}
      <div className="flex items-center justify-between h-[80px] flex-1 bg-white shadow-xl px-6 rounded-br-xl rounded-bl-xl">
        {/* Search */}
        <div className="relative w-[400px]" ref={searchRef}>
          <FiSearch className="absolute left-3 top-7 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search or type"
            className="w-full pl-9 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          
          {/* Search Results Dropdown */}
          {showSearchResults && filteredSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 bg-white rounded-md shadow-lg z-20 border border-gray-200 overflow-hidden">
              {filteredSuggestions.map((item, index) => (
                <div 
                  key={index} 
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => handleSearchItemClick(item.path)}
                >
                  <FiSearch className="mr-3 h-4 w-4 text-gray-500" />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Notification + Profile */}
        <div className="flex items-center gap-6">
          {/* Notification */}
          <div className="relative" ref={notificationRef}>
            <div
              className="h-10 w-10 flex items-center justify-center rounded-full bg-[#B200FF] text-white cursor-pointer hover:bg-purple-700 transition-colors"
              onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
            >
              <FaRegBell className="h-[20px] w-[20px]" />
            </div>

            {showNotificationDropdown && (
              <div className="absolute right-0 mt-2 w-[300px] bg-white rounded-md shadow-lg z-20 p-4">
                <h3 className="font-semibold text-sm mb-2">All Notifications</h3>
                <div className="space-y-3">
                  {[
                    {
                      name: "Chendran",
                      message: "It is a long established fact that...",
                      time: "2 minutes ago",
                    },
                    {
                      name: "Store Verification Done",
                      message: "We have successfully received your request.",
                      time: "1 Month Ago",
                    },
                    {
                      name: "Check Your Mail",
                      message: "All done! Now check your inbox...",
                      time: "4 Months Ago",
                    },
                  ].map((item, i) => (
                    <div key={i} className="border-b pb-2">
                      <div className="text-sm font-medium">{item.name}</div>
                      <p className="text-xs text-gray-600">{item.message}</p>
                      <div className="text-[10px] text-gray-400">{item.time}</div>
                    </div>
                  ))}
                </div>
                <p
                  onClick={handleViewNotification}
                  className="cursor-pointer block mt-4 text-center text-[#68B39F] text-sm font-medium"
                >
                  View All
                </p>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-10 border border-[#B200FF]"></div>

          {/* Profile */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={handleViewProfile}
            ref={profileRef}
          >
            <div className="h-[48px] w-[48px] rounded-full overflow-hidden">
              <img
                src={Profileicon}
                alt="profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-[18px] font-semibold">Property Owner</p>
              <p className="text-[#7D7D7D] text-[14px]">
                propertyowner@example.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
