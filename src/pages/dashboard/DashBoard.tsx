import { Building2 } from "lucide-react";
import Card1 from "../../components/dashboard/Card1/Card1";
import Card2 from "../../components/dashboard/Card2/Card2";
import frame1 from "../../assets/Bg_Frames/Frame_1.png";
import frame2 from "../../assets/Bg_Frames/Frame_2.png";
import frame3 from "../../assets/Bg_Frames/Frame_3.png";
import MonthlyRevenueTrendBar from "../../components/dashboard/MonthlyRevenue/BarCharts/Barcharts";
import MonthlyRevenueTrendLine from "../../components/dashboard/MonthlyRevenue/Linecharts/Linecharts";
import OccupancyRateTrend from "../../components/dashboard/OccRate/RateLineCharts";
import PropertyTypesDistribution from "../../components/dashboard/PropertyType/PieCharts";
import RentCollectionRate from "../../components/dashboard/RentChart/Tooltip";
import ActivityTabs from "../../components/dashboard/RecentActivity&task/Activity&task";
import RadialChart from "../../components/dashboard/PaymentCharts/RadicalChart";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { useEffect, useState } from "react";
import { DashboardThunks } from "../../features/Dashboard/Reducer/DashboardThunk";
import { selectDashboardData } from "../../features/Dashboard/Reducer/Selector";
import LoadingOverlay from "../../components/Loading/Loading";

// Types
export interface PropertyTotal {
  _id: string;
  count: number;
}

export interface OccupancyGraph {
  _id: {
    month: number;
    year: number;
  };
  occupiedCount: number;
  month: number;
  year: number;
  occupancyRate: number;
}

export interface DashboardData {
  PropertiesTotal: PropertyTotal[];
  totalTenants: number;
  newTenantsThisMonth: number;
  leasesExpiringSoon: number;
  totalMonthlyRevenue: number;
  totalExpected: number;
  collectionRate: string;
  YearlyRevenue: number;
  OverAllRevenue: number;
  totalMonthlyPending: number;
  monthlyRevenueGraph: any[];
  yearlyRevenueGraph: any[];
  occupancyGraph: OccupancyGraph[];
  paymentStatusBreakdownGraph: any[];
  rentCollectionGraph: any[];
}

export interface DashboardApiResponse {
  data: DashboardData;
}

// Dummy data only for Activity & Task section
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
  const dispatch = useDispatch<AppDispatch>();
   const [loading, setLoading] = useState(true);
  const dashboardData = useSelector(selectDashboardData);

 
  useEffect(() => {
    dispatch(DashboardThunks());

   
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (loading) {
    return <LoadingOverlay />; 
  }

  const totalProperties =
    dashboardData?.PropertiesTotal?.reduce(
      (sum: number, property: PropertyTotal) => sum + (property.count || 0),
      0
    ) || 0;

  // const currentOccupancyRate =
  //   dashboardData?.occupancyGraph?.[0]?.occupancyRate || 0;

  // const radialData =
  //   dashboardData?.paymentStatusBreakdownGraph?.map((item, index) => ({
  //     name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
  //     value: item.count,
  //     fill: ["#E800DC", "#006AFF", "#FF008C"][index % 3],
  //   })) || [];

  const formatIndianCurrency = (value: number): string => {
    if (value === 0) return "₹0";
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
    return `₹${value}`;
  };

  // Process Occupancy Graph
  const processedOccupancyGraph =
    dashboardData?.occupancyGraph?.data?.map((item:any) => ({
      ...item,
      occupancyRate: Number(item.occupancyRate.toFixed(1)), // 1 decimal place
    })) || [];

  // Merge Overdue entries in Payment Status Breakdown
  const mergedPaymentStatus = (() => {
    const statusMap: Record<string, number> = {};

    dashboardData?.paymentStatusBreakdownGraph?.forEach((item) => {
      const key =
        item._id.toLowerCase() === "overdue"
          ? "Overdue"
          : item._id.charAt(0).toUpperCase() + item._id.slice(1);
      statusMap[key] = (statusMap[key] || 0) + item.count;
    });

    return Object.entries(statusMap).map(([name, value], index) => ({
      name,
      value,
      fill: ["#E800DC", "#006AFF", "#FF008C"][index % 3],
    }));
  })();

  // Rent Collection Graph stays the same
  const rentCollectionData =
    dashboardData?.rentCollectionGraph?.data?.map((item:any) => {
      const monthName = new Date(
        item._id.year,
        item._id.month - 1
      ).toLocaleString("default", { month: "short" });

      const paid = item.collected > 0 ? item.collected : 50000;
      const totalExpected = item.totalExpected > 0 ? item.totalExpected : 75000;

      const pending = totalExpected - paid;
      return { month: monthName, paid, pending: pending < 0 ? 0 : pending };
    }) || [];

  // Example of applying 1 decimal for any percentage values you display
  const formatPercent = (value: number) => `${Number(value).toFixed(1)}%`;

  return (
    <div className="p-3 flex flex-col gap-6">
       
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-[#000000] font-semibold text-2xl">Dashboard</h3>
          <p className="text-[#7D7D7D]">
            Welcome back, Property Owner! Here's what's happening with your
            properties.
          </p>
        </div>
      </div>

      {/* Card 1 */}
      <div className="grid grid-cols-5 gap-6">
        <Card1
          title="Total Properties"
          value={totalProperties}
          subText={`${totalProperties} Properties`}
          percentage={8.2}
          icon={<Building2 />}
          iconBg="bg-[#3065A426]/15"
          iconTextColor="text-[#3065A4]"
        />
        <Card1
          title="Total Tenants"
          value={dashboardData?.totalTenants || 0}
          subText={`${dashboardData?.collectionRate || "0%"} Collection Rate`}
          percentage={3.1}
          icon={<Building2 />}
          iconBg="bg-[#EB821826]/15"
          iconTextColor="text-[#EB8218]"
        />
        <Card1
          title="Total Revenue"
          value={formatIndianCurrency(dashboardData?.OverAllRevenue || 0)}
          subText="All Time"
          percentage={15.2}
          icon={<Building2 />}
          iconBg="bg-[#2FAD8D26]/15"
          iconTextColor="text-[#2FAD8D]"
        />
        <Card1
          title="Monthly Revenue"
          value={formatIndianCurrency(dashboardData?.totalMonthlyRevenue || 0)}
          subText="This Month"
          percentage={8.3}
          icon={<Building2 />}
          iconBg="bg-[#E500FF26]/15"
          iconTextColor="text-[#B200FF]"
        />
        <Card1
          title="Monthly Pending"
          value={formatIndianCurrency(dashboardData?.totalMonthlyPending || 0)}
          subText="This Month"
          percentage={-8.2}
          icon={<Building2 />}
          iconBg="bg-[#FE2F591A]/10"
          iconTextColor="text-[#FE2F59]"
        />
      </div>

      {/* Card 2 */}
      <div className="grid grid-cols-3 gap-6">
        <Card2
          bgImage={frame1}
          icon={<Building2 />}
          title="New Tenants"
          subText="This Month"
          value={dashboardData?.newTenantsThisMonth || 0}
          iconBg="bg-[#B200FF26]/15"
          iconTextColor="text-[#B200FF]"
        />
        <Card2
          bgImage={frame2}
          icon={<Building2 />}
          title="Leases Expiring Soon"
          subText="This Month"
          value={dashboardData?.leasesExpiringSoon || 0}
          iconBg="bg-[#FFBF0026]/15"
          iconTextColor="text-[#FFBF00]"
        />
        <Card2
          bgImage={frame3}
          icon={<Building2 />}
          title="Occupancy Rate"
          subText="This Month"
          value={formatPercent(
            processedOccupancyGraph?.[0]?.occupancyRate || 0
          )}
          iconBg="bg-[#3091EB26]/15"
          iconTextColor="text-[#3091EB]"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MonthlyRevenueTrendLine
          data={dashboardData?.monthlyRevenueGraph || []}
        />
        <MonthlyRevenueTrendBar
          data={dashboardData?.yearlyRevenueGraph || []}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OccupancyRateTrend
          data={
            processedOccupancyGraph.map((item) => ({
              month: new Date(0, item.month - 1).toLocaleString("default", {
                month: "short",
              }),
              rate: item.occupancyRate,
            })) || []
          }
        />
        <PropertyTypesDistribution
          data={
            dashboardData?.PropertiesTotal?.map((property, index) => ({
              name:
                property._id.charAt(0).toUpperCase() + property._id.slice(1),
              value: property.count,
              color: ["#06B6D4", "#EC4899", "#EF4444", "#8B5CF6", "#FACC15"][
                index % 5
              ],
            })) || []
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RadialChart data={mergedPaymentStatus} />
        <RentCollectionRate data={rentCollectionData} />
      </div>

      {/* Last section stays dummy */}
      <ActivityTabs
        activityData={sampleActivityData}
        taskData={sampleTaskData}
      />
    </div>
  );
};

export default DashBoard;
