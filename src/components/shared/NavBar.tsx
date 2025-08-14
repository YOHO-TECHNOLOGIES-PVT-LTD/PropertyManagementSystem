import { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Profileicon from "../../assets/profileicon.png";
import pmsicon from "../../assets/pmsicon (2).png";
import { useDispatch, useSelector } from "react-redux";
import { selectNotification } from "../../features/notification/redecures/selectors";

export default function Navbar({ isSidebarOpen, toggleSidebar }) {
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const notifications = useSelector(selectNotification) || [];

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.is_read).length;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotificationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleViewNotification = () => {
    setShowNotificationDropdown(false);
    navigate("/notifications");
  };

  const handleViewProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="flex w-full gap-5">
      {/* Left: Logo + Name */}
      <div
        className={`flex items-center justify-start h-[80px] bg-white shadow-md rounded-br-xl rounded-bl-xl  ${isSidebarOpen ? "px-4" : "px-2"} cursor-pointer transition-all duration-300`}
        style={{ width: isSidebarOpen ? "250px" : "80px" }}
        onClick={toggleSidebar}
      >
        <img
          className="object-fit w-[65px]"
          src={pmsicon}
          alt="logo"
          onClick={(e) => e.stopPropagation()}
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
        <div className="relative w-[400px]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search or type"
            className="w-full pl-9 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* Notification + Profile */}
        <div className="flex items-center gap-6">
          <div className="relative" ref={notificationRef}>
            <div
              className="h-10 w-10 flex items-center justify-center rounded-full bg-[#B200FF] text-white cursor-pointer hover:bg-purple-700 transition-colors relative"
              onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
            >
              <FaRegBell className="h-[20px] w-[20px]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>

            {showNotificationDropdown && (
              <div className="absolute right-0 mt-2 w-[300px] bg-white rounded-md shadow-lg z-20 p-4">
                <h3 className="font-semibold text-sm mb-2">Recent Notifications</h3>
                <div className="space-y-3">
                  {notifications.length > 0 ? (
                    [...notifications]
                      .sort(
                        (a, b) =>
                          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                      )
                      .slice(0, 3)
                      .map((item, i) => (
                        <div key={item._id || i} className="border-b pb-2">
                          <div className="text-sm font-medium">
                            {item.title || "No Title"}
                          </div>
                          <p className="text-xs text-gray-600">
                            {item.message || item.description || ""}
                          </p>
                          <div className="text-[10px] text-gray-400">
                            {item.createdAt
                              ? new Date(item.createdAt).toLocaleString()
                              : ""}
                          </div>
                        </div>
                      ))
                  ) : (
                    <p className="text-xs text-gray-500">No notifications found</p>
                  )}
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
