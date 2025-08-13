import { Building2 } from "lucide-react";

interface ActivityItem {
  id: string;
  companyName: string;
  name: string;
  unit: string;
  time: string;
  amount?: string;
  status: "Completed" | "Pending" | "Urgent";
  icon: string;
}

interface ActivityListProps {
  data: ActivityItem[];
  getIconStyles: (icon: string) => string;
  getStatusBadgeStyles: (status: string) => string;
}

export default function ActivityList({
  data,
  getIconStyles,
  getStatusBadgeStyles,
}: ActivityListProps) {
  return (
    <div>
      {/* Headers */}
      <div className="hidden md:grid grid-cols-[250px_1fr_1fr_1fr_1fr_120px] gap-4 text-gray-600 font-medium mb-4 border shadow-lg p-4 rounded-lg">
        <div>Company Name</div>
        <div>Name</div>
        <div>Unit</div>
        <div>Time</div>
        <div>Amount</div>
        <div>Action</div>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[250px_1fr_1fr_1fr_1fr_120px] gap-4 p-4 border rounded-lg shadow-lg hover:shadow-md transition items-center"
          >
            {/* Company + icon */}
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconStyles(
                  item.icon
                )}`}
              >
                <Building2 />
              </div>
              <span className="font-medium text-gray-900">
                {item.companyName}
              </span>
            </div>

            <div className="text-gray-700">{item.name}</div>
            <div className="text-gray-700">{item.unit}</div>
            <div className="text-gray-700">{item.time}</div>
            <div className="text-gray-900 font-medium">
              {item.amount || "-"}
            </div>

            <div>
              <span
                className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusBadgeStyles(
                  item.status
                )}`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
