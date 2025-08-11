// Sidebar.jsx
import {
  LandPlot,
  LayoutDashboard,
  FileText,
  Settings,
  Bell,
  TrendingUp,
  BadgeIndianRupee,
  Handshake,
  MoveHorizontal,
  LogOut,
} from "lucide-react";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { icon: MoveHorizontal, onClick: () => setIsOpen(!isOpen) }, // toggle only
    { icon: LayoutDashboard, path: "/", label: "DashBoard" },
    { icon: LandPlot, path: "/properties", label: "Properties" },
    { icon: FileText, path: "/tenants", label: "Tenants" },
    { icon: BadgeIndianRupee, path: "/rent", label: "Rent Management" },
    { icon: Handshake, path: "/lease", label: "Lease Management" },
    { icon: TrendingUp, path: "/finance", label: "Financial Reports" },
    { icon: Bell, path: "/notifications", label: "Notifications" },
    { icon: Settings, path: "/settings", label: "Settings" },
  ];

  const handleLogout = () => {
    toast.success("Logout successfully");
  };

  return (
    <div className="h-full flex">
      <div
        className={`bg-white shadow-xl transition-all duration-300 ease-in-out rounded-tr-xl
          ${isOpen ? "w-64" : "w-[80px]"} flex flex-col h-full `}
      >
        {/* scrollable menu area: flex-1 with min-h-0 + no-scrollbar */}
        <div className="flex-1 py-4 overflow-y-auto no-scrollbar min-h-0 ml-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            // Sidebar toggle button (no path)
            if (!item.path) {
              return (
                <div
                  key={index}
                  className="relative group cursor-pointer flex items-center gap-3 px-2 py-2"
                  onClick={item.onClick}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center clip-hex 
                               bg-[#F6F6F6] text-[#B200FF] 
                               hover:bg-[#B200FF] hover:text-white 
                               transition-all duration-300"
                  >
                    <Icon size={20} />
                  </div>
                  {isOpen && (
                    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </div>
              );
            }

            // Add HR after toggle button (index === 1)
            if (index === 1) {
              return (
                <div key={index}>
                  <hr className="border-t border-[#B200FF] my-2 w-[40px] ml-3" />
                  <NavLink
                    to={item.path}
                    className="relative flex items-center py-2 gap-3 transition-all duration-300 px-2"
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <div className="absolute -right-1 top-0 h-full w-1 bg-[#B200FF] rounded-r" />
                        )}
                        <div
                          className={`w-12 h-12 flex items-center justify-center transition-all duration-300 clip-hex
                            ${
                              isActive
                                ? "bg-[#B200FF] text-white"
                                : "bg-[#F6F6F6] text-gray-500 hover:bg-[#B200FF] hover:text-white"
                            }`}
                        >
                          <Icon size={20} />
                        </div>
                        {isOpen && (
                          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            {item.label}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                </div>
              );
            }

            return (
              <NavLink
                key={index}
                to={item.path}
                className="relative flex py-2 items-center gap-3 transition-all duration-300 px-2"
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute -right-1 top-0 h-full w-1 bg-[#B200FF] rounded-r" />
                    )}
                    <div
                      className={`w-12 h-12 flex items-center justify-center transition-all duration-300 clip-hex
                        ${
                          isActive
                            ? "bg-[#B200FF] text-white"
                            : "bg-[#F6F6F6] text-gray-500 hover:bg-[#B200FF] hover:text-white"
                        }`}
                    >
                      <Icon size={20} />
                    </div>
                    {isOpen && (
                      <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                        {item.label}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}

          {/* Logout */}
          <div className="mt-10 px-2">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={handleLogout}
            >
              <div
                className="w-12 h-12 flex items-center justify-center clip-hex 
                           bg-red-600 text-white 
                           hover:bg-red-700 
                           transition-all duration-300"
              >
                <LogOut size={20} />
              </div>

              {isOpen && (
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Logout
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

