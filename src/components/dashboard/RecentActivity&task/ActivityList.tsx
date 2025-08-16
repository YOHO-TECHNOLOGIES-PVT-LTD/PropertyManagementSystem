import { Building2 } from "lucide-react";
import dayjs from "dayjs"

interface ActivityItem {
  title: string;
  details: string;
  createdAt: string;
  icon: string;
  action: string;
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
      <div className="hidden md:grid grid-cols-[2fr,3fr,1fr,1fr] gap-4 text-gray-600 font-medium mb-4 border shadow-lg p-4 rounded-lg items-center text-center">
        <div className="text-left">Title</div>
        <div className="text-left">Details</div>
        <div className="text-center">Time</div>
        <div className="text-center">Action</div>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-4 justify-center">
        {data?.slice(0, 5).map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[2fr,3fr,1fr,1fr] gap-4 p-4 border rounded-lg shadow-lg hover:shadow-md transition items-center"
          >
            {/* Title with icon */}
            <div className="flex items-center gap-3 text-left">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconStyles(
                  item.icon
                )}`}
              >
                <Building2 />
              </div>
              <span className="font-medium text-gray-900">{item.title}</span>
            </div>

            {/* Details */}
            <div className="text-gray-700 text-left">{item.details}</div>

            {/* Time */}
            <div className="text-gray-700 text-center">
              {dayjs(item.createdAt).format("hh:mm A")}
            </div>

            {/* Action */}
            <div className="text-center">
              <span
                className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusBadgeStyles(
                  item.action
                )}`}
              >
                {item.action}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
