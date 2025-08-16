import { Building2 } from "lucide-react";

interface TaskItem {
  id: string;
  companyName: string;
  name: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  icon: string;
}

interface TaskListProps {
  data: TaskItem[];
  getIconStyles: (icon: string) => string;
  getPriorityBadgeStyles: (priority: string) => string;
}

export default function TaskList({
  data,
  getIconStyles,
  getPriorityBadgeStyles,
}: TaskListProps) {
  return (
    <div className="space-y-4">
          <div className="text-left text-gray-600 font-medium border border-gray-200 rounded-lg p-4 pb-2 bg-white shadow-sm grid grid-cols-4 gap-4 items-center">
            <div className="pb-4">Company Name</div>
            <div className="pb-4">Name</div>
            <div className="pb-4">Due Date</div>
            <div className="pb-4">Action</div>
          </div>
      {data.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-4 items-center gap-4 p-4 border  rounded-lg shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconStyles(
                item.icon
              )}`}
            >
              <Building2 />
            </div>
            <span className="font-medium text-gray-900">{item.companyName}</span>
          </div>
          <div className="text-gray-700">{item.name}</div>
          <div className="text-gray-700">{item.dueDate}</div>
          <div>
            <span
              className={`px-3 py-1 rounded-lg text-sm font-medium ${getPriorityBadgeStyles(
                item.priority
              )}`}
            >
              {item.priority}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
