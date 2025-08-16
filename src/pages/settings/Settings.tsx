import { Link, Routes, Route, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdOutlineSecurity } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import AccountSettings from "../../components/settings/AccountSettings";
import SecuritySettings from "../../components/settings/SecuritySettings";
import Timeline from "../../components/settings/Timeline";

export default function Settings() {
  const location = useLocation();

  const tabButtonClasses = (path: string) =>
    `flex items-center gap-2 px-3 py-1.5 rounded-md border transition-colors
    ${location.pathname === path
      ? "bg-[#B200FF] text-white font-semibold border-[#B200FF]"
      : "border-[#7D7D7D] text-[#7D7D7D] hover:border-[#B200FF] hover:text-[#B200FF]"
    }`;

  return (
    <div className="p-6 sticky">
      <h1 className="font-bold text-[24px]">Settings</h1>
      <p className="text-[#7D7D7D] mb-6">
        Manage Your Account Settings and Preferences
      </p>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="flex flex-col w-45 gap-3 bg-white rounded-lg shadow p-3 stciky">
          <Link to="/settings/account" className={tabButtonClasses("/settings/account")}>
            <CgProfile size={20} /> Account
          </Link>
          <Link to="/settings/security" className={tabButtonClasses("/settings/security")}>
            <MdOutlineSecurity size={20} /> Security
          </Link>
          <Link to="/settings/timeline" className={tabButtonClasses("/settings/timeline")}>
            <FaRegClock size={20} /> Timeline
          </Link>
        </div>

        {/* Tab Content */}
        <div className="flex-1 bg-white rounded-lg shadow p-6 h-full">
          <Routes>
            <Route path="account" element={<AccountSettings />} />
            <Route path="security" element={<SecuritySettings />} />
            <Route path="timeline" element={<Timeline />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
