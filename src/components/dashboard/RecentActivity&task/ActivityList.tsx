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
    <div className="space-y-3">
        <div className="text-left text-gray-600 font-medium border border-gray-200 rounded-lg p-4 bg-white shadow-sm grid grid-cols-6 gap-4 items-center">
            <div className="pb-4">Company Name</div>
            <div className="pb-4">Name</div>
            <div className="pb-4">Unit</div>
            <div className="pb-4">Time</div>
            <div className="pb-4">Amount</div>
            <div className="pb-4">Action</div>
          </div>
      {data.map((item) => (
        
        <div
          key={item.id}
          className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
        >
          <div className="grid grid-cols-6 gap-4 items-center">
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-lg flex items-center justify-center ${getIconStyles(
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
        </div>
      ))}
    </div>
  );
}
