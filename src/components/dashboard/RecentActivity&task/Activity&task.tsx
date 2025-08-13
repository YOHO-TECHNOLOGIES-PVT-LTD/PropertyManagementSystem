import { useState } from "react";
import ActivityList from "./ActivityList";
import TaskList from "./TaskList";

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

interface TaskItem {
  id: string;
  companyName: string;
  name: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  icon: string;
}

interface ActivityTabsProps {
  activityData: ActivityItem[];
  taskData: TaskItem[];
}

export default function ActivityTabs({ activityData, taskData }: ActivityTabsProps) {
  const [activeTab, setActiveTab] = useState<"activity" | "tasks">("activity");

  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 border border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "Urgent":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const getPriorityBadgeStyles = (priority: string) => {
    switch (priority) {
      case "Low":
        return "bg-green-100 text-green-700 border border-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "High":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const getIconStyles = (icon: string) => {
    switch (icon) {
      case "pink":
        return "bg-pink-100 text-pink-600";
      case "blue":
        return "bg-blue-100 text-blue-600";
      case "red":
        return "bg-red-100 text-red-600";
      case "yellow":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="w-full rounded-lg shadow-[2px_2px_5px_rgba(0,0,0,0.25)] border p-4">
      {/* Tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("activity")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "activity"
                ? "bg-[#B200FF] text-white"
                : "bg-[#B200FF1A]/10 text-[#B200FF] border border-pink-200 hover:bg-pink-50"
            }`}
          >
            Recent Activity
          </button>
          <button
            onClick={() => setActiveTab("tasks")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "tasks"
                ? "bg-[#B200FF] text-white"
                : "bg-[#B200FF1A]/10 text-[#B200FF] border border-pink-200 hover:bg-pink-50"
            }`}
          >
            Upcoming Tasks
          </button>
        </div>
        <button className="text-blue-600 font-medium hover:text-blue-700">View All</button>
      </div>

      {/* Conditional Render */}
      {activeTab === "activity" ? (
        <ActivityList
          data={activityData}
          getIconStyles={getIconStyles}
          getStatusBadgeStyles={getStatusBadgeStyles}
        />
      ) : (
        <TaskList
          data={taskData}
          getIconStyles={getIconStyles}
          getPriorityBadgeStyles={getPriorityBadgeStyles}
        />
      )}
    </div>
  );
}
