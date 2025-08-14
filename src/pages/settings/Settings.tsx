"use client";

import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineSecurity } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import AccountSettings from "../../components/settings/AccountSettings";
import SecuritySettings from "../../components/settings/SecuritySettings";
import Timeline from "../../components/settings/Timeline";

export default function Settings() {
  const [activeTab, setActiveTab] = useState<"account" | "security" | "timeline">("account");

  const tabButtonClasses = (tab: string) =>
    `flex items-center gap-2 px-3 py-1.5 rounded-md border transition-colors
    ${activeTab === tab
      ? "bg-[#B200FF] text-white font-semibold border-[#B200FF]"
      : "border-[#7D7D7D] text-[#7D7D7D] hover:border-[#B200FF] hover:text-[#B200FF]"
    }`;

  return (
    <div className="p-6">
      <h1 className="font-bold text-[24px]">Settings</h1>
      <p className="text-[#7D7D7D] mb-6">
        Manage Your Account Settings and Preferences
      </p>

      <div className="flex gap-6">
        <div className="flex flex-col w-45 gap-3 bg-white rounded-lg shadow p-3">
          <button onClick={() => setActiveTab("account")} className={tabButtonClasses("account")}>
            <CgProfile size={20} /> Account
          </button>
          <button onClick={() => setActiveTab("security")} className={tabButtonClasses("security")}>
            <MdOutlineSecurity size={20} /> Security
          </button>
          <button onClick={() => setActiveTab("timeline")} className={tabButtonClasses("timeline")}>
            <FaRegClock size={20} /> Timeline
          </button>
        </div>
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          {activeTab === "account" && <AccountSettings />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "timeline" && <Timeline />}
        </div>
      </div>
    </div>
  );
}
