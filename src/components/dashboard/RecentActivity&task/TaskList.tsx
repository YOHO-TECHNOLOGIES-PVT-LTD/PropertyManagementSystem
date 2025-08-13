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

export default function TaskList({ data, getIconStyles, getPriorityBadgeStyles }: TaskListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-600 font-medium">
            <th className="pb-4">Company Name</th>
            <th className="pb-4">Name</th>
            <th className="pb-4">Due Date</th>
            <th className="pb-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className={index > 0 ? "border-t border-gray-100" : ""}>
              <td className="py-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconStyles(item.icon)}`}>
                    <Building2 />
                  </div>
                  <span className="font-medium text-gray-900">{item.companyName}</span>
                </div>
              </td>
              <td className="py-4 text-gray-700">{item.name}</td>
              <td className="py-4 text-gray-700">{item.dueDate}</td>
              <td className="py-4">
                <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getPriorityBadgeStyles(item.priority)}`}>
                  {item.priority}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
