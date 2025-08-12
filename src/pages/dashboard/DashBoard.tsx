import { CiImport } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { Building2 } from "lucide-react";
import Card1 from "../../components/dashboard/Card1/Card1";

const DashBoard = () => {
  return (
    <div className="p-3 flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-[#000000] font-semibold text-2xl">Dashboard</h3>
          <p className="text-[#7D7D7D]">
            Welcome back, Property Owner! Here's what's happening with your
            properties.
          </p>
        </div>
        <div className="flex gap-3 text-white">
          <div className="flex gap-3 items-center border bg-[#B200FF] p-2 rounded-lg">
            <GoPlus size={20} />
            <button>Add Property</button>
          </div>
          <div className="flex gap-3 items-center border bg-[#13A5A5] p-2 rounded-lg">
            <CiImport size={20} />
            <button>Export Report</button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-5 gap-4 ">
        <Card1
          title="Total Properties"
          value={25}
          subText="100 Total Units"
          percentage={8.2}
          icon={<Building2 />}
          iconBg="bg-blue-200"
          iconTextColor="text-blue-600"
        />
        <Card1
          title="Total Tenants"
          value={85}
          subText="85% Occupancy Rate"
          percentage={3.1}
          icon={<Building2 />}
          iconBg="bg-orange-200"
          iconTextColor="text-orange-600"
        />
        <Card1
          title="Total Revenue"
          value={7800000}
          subText="All Time"
          percentage={15.2}
          icon={<Building2 />}
          iconBg="bg-cyan-200"
          iconTextColor="text-cyan-600"
        />
        <Card1
          title="Monthly Revenue"
          value={650000}
          subText="This Month"
          percentage={8.3}
          icon={<Building2 />}
          iconBg="bg-pink-200"
          iconTextColor="text-pink-600"
        />
        <Card1
          title="Monthly Pending"
          value={40000}
          subText="This Month"
          percentage={-8.2}
          icon={<Building2 />}
          iconBg="bg-red-200"
          iconTextColor="text-red-600"
        />
      </div>
    </div>
  );
};

export default DashBoard;
