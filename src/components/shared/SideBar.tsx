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
import { NavLink, useNavigate } from "react-router-dom";
import { FONTS } from "../../constants/ui constants";

const Sidebar = ({ isOpen, setIsOpen } : any) => {
  const menuItems = [
    { icon: LayoutDashboard, path: "/", label: "DashBoard" },
    { icon: LandPlot, path: "/properties", label: "Properties" },
    { icon: FileText, path: "/tenants", label: "Tenants" },
    { icon: BadgeIndianRupee, path: "/rent", label: "Rent Management" },
    { icon: Handshake, path: "/lease", label: "Lease Management" },
    { icon: Handshake, path: "/maintenance", label: "Maintenance" },
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
        {/* Fixed toggle button at top */}
        <div className="py-4 ml-3">
          <div
            className="relative group cursor-pointer flex items-center gap-3 px-2 py-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              className="w-12 h-12 flex items-center justify-center clip-hex 
                         bg-[#F6F6F6] text-[#B200FF] 
                         hover:bg-[#B200FF] hover:text-white 
                         transition-all duration-300"
            >
              <MoveHorizontal size={20} />
            </div>
            {isOpen && (
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Toggle Menu
              </span>
            )}
          </div>
          {/* HR separator */}
          <hr className="border-t border-[#B200FF] my-2 w-[40px] ml-3" />
        </div>

        {/* Scrollable menu area */}
        <div className="flex-1 overflow-y-auto no-scrollbar min-h-0 ml-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

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
                      <span style={{...FONTS.sidebar}} className="text-sm font-medium text-gray-700 whitespace-nowrap font-bold ">
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