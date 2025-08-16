import { Building2 } from "lucide-react";

import Card1 from "../../components/dashboard/card1/Card1";
import Card2 from "../../components/dashboard/Card2/Card2";
import MonthlyRevenueTrendBar from "../../components/dashboard/MonthlyRevenue/BarCharts/Barcharts";
import MonthlyRevenueTrendLine from "../../components/dashboard/MonthlyRevenue/Linecharts/Linecharts";
import OccupancyRateTrend from "../../components/dashboard/OccRate/RateLineCharts";
import PropertyTypesDistribution from "../../components/dashboard/PropertyType/PieCharts";
import RentCollectionRate from "../../components/dashboard/RentChart/Tooltip";
import ActivityTabs from "../../components/dashboard/RecentActivity&task/Activity&task";
import RadialChart from "../../components/dashboard/PaymentCharts/RadicalChart";

import frame1 from "../../assets/Dashboard/smallyellowbg.png";
import frame2 from "../../assets/Dashboard/smallbluebg.png";
import frame3 from "../../assets/Dashboard/smallgreen.png";


// Bar chart data
const barData = [
  { year: "2021", revenue: 450000, netIncome: 250000 },
  { year: "2022", revenue: 600000, netIncome: 400000 },
  { year: "2023", revenue: 650000, netIncome: 500000 },
  { year: "2024", revenue: 700000, netIncome: 550000 },
  { year: "2025", revenue: 750000, netIncome: 600000 },
];

// Line chart data
const lineData = [
  { month: "Jan", revenue: 200000, expenses: 350000 },
  { month: "Feb", revenue: 300000, expenses: 450000 },
  { month: "Mar", revenue: 800000, expenses: 500000 },
  { month: "Apr", revenue: 400000, expenses: 300000 },
  { month: "May", revenue: 350000, expenses: 400000 },
  { month: "Jun", revenue: 300000, expenses: 500000 },
  { month: "Jul", revenue: 280000, expenses: 9500 },
  { month: "Aug", revenue: 320000, expenses: 400000 },
  { month: "Sep", revenue: 400000, expenses: 300000 },
  { month: "Oct", revenue: 200000, expenses: 250000 },
  { month: "Nov", revenue: 250000, expenses: 450000 },
  { month: "Dec", revenue: 220000, expenses: 500000 },
];

const occupancyData = [
  { month: "Jan", rate: 45 },
  { month: "Feb", rate: 52 },
  { month: "Mar", rate: 38 },
  { month: "Apr", rate: 61 },
  { month: "May", rate: 55 },
  { month: "Jun", rate: 67 },
  { month: "Jul", rate: 43 },
  { month: "Aug", rate: 38 },
  { month: "Sep", rate: 25 },
  { month: "Oct", rate: 49 },
  { month: "Nov", rate: 72 },
  { month: "Dec", rate: 65 },
];
const samplePieData = [

  { name: "Commercial", value: 25, color: "#06B6D4" },
  { name: "Land", value: 25, color: "#EC4899" },
  { name: "Villas", value: 10, color: "#EF4444" },
  { name: "Houses", value: 5, color: "#8B5CF6" },
    { name: "Apartment", value: 60, color: "#FACC15" },
];

const chartData = [
  { name: "Paid", value: 80, fill: "#E800DC" ,count: 64},
  { name: "Pending", value: 55, fill: "#006AFF",count: 17 },
  { name: "Overdue", value: 30, fill: "#FF008C",count: 4 },
];

const rentCollectionData = [
  { month: "Jan", paid: 80, pending: 15 },
  { month: "Feb", paid: 50, pending: 30 },
  { month: "Mar", paid: 65, pending: 20 },
  { month: "Apr", paid: 45, pending: 25 },
  { month: "May", paid: 70, pending: 30 },
  { month: "Jun", paid: 60, pending: 25 },
];

const sampleActivityData = [
  {
    id: "1",
    companyName: "Rent Payment Received",
    name: "John Doe",
    unit: "John Doe - Unit 101",
    time: "2 Minutes Ago",
    amount: "₹25,000",
    status: "Completed" as const,
    icon: "pink",
  },
  {
    id: "2",
    companyName: "Maintenance Request",
    name: "Plumbing Issue",
    unit: "Plumbing Issue - Unit 205",
    time: "1 Hour Ago",
    amount: "",
    status: "Pending" as const,
    icon: "blue",
  },
  {
    id: "3",
    companyName: "New Tenant Added",
    name: "Sarah Wilson",
    unit: "Sarah Wilson - Unit 304",
    time: "2 Hour Ago",
    amount: "",
    status: "Urgent" as const,
    icon: "red",
  },
  {
    id: "4",
    companyName: "Lease Renewal",
    name: "Mike Johnson",
    unit: "Mike Johnson - Unit 102",
    time: "3 Hour Ago",
    amount: "",
    status: "Completed" as const,
    icon: "yellow",
  },
];

const sampleTaskData = [
  {
    id: "1",
    companyName: "Lease Renewal - Unit 101",
    name: "John Doe",
    dueDate: "Due: 2024-02-15",
    priority: "Low" as const,
    icon: "pink",
  },
  {
    id: "2",
    companyName: "Rent Collection Follow-Up",
    name: "Sarah Wilson",
    dueDate: "Due: 2024-02-15",
    priority: "Medium" as const,
    icon: "blue",
  },
  {
    id: "3",
    companyName: "Property Inspection",
    name: "Building A",
    dueDate: "Due: 2024-02-15",
    priority: "High" as const,
    icon: "red",
  },
];
const DashBoard = () => {
  return (
    <div className="p-3 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-[#000000] font-semibold text-2xl">Dashboard</h3>
          <p className="text-[#7D7D7D]">
            Welcome back, Property Owner! Here's what's happening with your
            properties.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6">
        <Card1
          title="Total Properties"
          value={25}
          subText="100 Total Units"
          percentage={8.2}
          icon={<Building2 />}
          iconBg="bg-[#3065A426]/15"
          iconTextColor="text-[#3065A4]"
        />
        <Card1
          title="Total Tenants"
          value={85}
          subText="85% Occupancy Rate"
          percentage={3.1}
          icon={<Building2 />}
          iconBg="bg-[#EB821826]/15"
          iconTextColor="text-[#EB8218]"
        />
        <Card1
          title="Total Revenue"
          value={7800000}
          subText="All Time"
          percentage={15.2}
          icon={<Building2 />}
          iconBg="bg-[#2FAD8D26]/15"
          iconTextColor="text-[#2FAD8D]"
        />
        <Card1
          title="Monthly Revenue"
          value={650000}
          subText="This Month"
          percentage={8.3}
          icon={<Building2 />}
          iconBg="bg-[#E500FF26]/15"
          iconTextColor="text-[#B200FF]"
        />
        <Card1
          title="Monthly Pending"
          value={40000}
          subText="This Month"
          percentage={-8.2}
          icon={<Building2 />}
          iconBg="bg-[#FE2F591A]/10"
          iconTextColor="text-[#FE2F59]"
        />
      </div>

      <div className="grid grid-cols-3 gap-6 ">
        <Card2
          bgImage={frame1}
          icon={<Building2 />}
          title="New Tenants"
          subText="This Month"
          value={3}
          iconBg="bg-[#B200FF26]/15"
          iconTextColor="text-[#B200FF]"
        />
        <Card2
          bgImage={frame2}
          icon={<Building2 />}
          title="New Registrations"
          subText="This Week"
          value={7}
          iconBg="bg-[#FFBF0026]/15"
          iconTextColor="text-[#FFBF00]"
        />
        <Card2
          bgImage={frame3}
          icon={<Building2 />}
          title="Pending Payments"
          subText="This Month"
          value="96.2%"
          iconBg="bg-[#3091EB26]/15"
          iconTextColor="text-[#3091EB]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div className="">
          <MonthlyRevenueTrendLine data={lineData} />
        </div>
        <div className="">
          <MonthlyRevenueTrendBar data={barData} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <OccupancyRateTrend data={occupancyData} />
        <PropertyTypesDistribution data={samplePieData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <RadialChart data={chartData} />
        <RentCollectionRate data={rentCollectionData} />
      </div>
      <div>
        <ActivityTabs
          activityData={sampleActivityData}
          taskData={sampleTaskData}
        />
      </div>
    </div>
  );
};

export default DashBoard;