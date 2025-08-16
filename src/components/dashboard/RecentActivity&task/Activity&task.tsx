import { useState } from "react";
import ActivityList from "./ActivityList";
import TaskList from "./TaskList";
import { useNavigate } from "react-router-dom";

interface ActivityItem {
  title: string;
  details: string;
  action: string;
  time: string;
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

export default function ActivityTabs({
  activityData,
  taskData,
}: ActivityTabsProps) {
  const [activeTab, setActiveTab] = useState<"activity">("activity");
  const navigate = useNavigate()

  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case "Create":
        return "bg-[#1CAF191A]/10 text-[#1CAF19] border border-[#1CAF19]";
      case "Update":
        return "bg-[#FFC3001A]/10 text-[#FFC300] border border-[#FFC300]";
      case "Delete":
        return "bg-[#E212691A] text-[#E21269] border border-[#E21269]";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const getPriorityBadgeStyles = (priority: string) => {
    switch (priority) {
      case "Low":
        return "bg-[#1CAF191A]/10 text-[#1CAF19] border border-[#1CAF19]";
      case "Medium":
        return "bg-[#FFC3001A]/10 text-[#FFC300] border border-[#FFC300]";
      case "High":
        return "bg-[#E212691A] text-[#E21269] border border-[#E21269]";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const getIconStyles = (icon: string) => {
    switch (icon) {
      case "pink":
        return "bg-[#B200FF26]/10 text-[#B200FF]";
      case "blue":
        return "bg-[#006AFF26]/10 text-[#006AFF]";
      case "red":
        return "bg-[#FF003C26]/10 text-[#FF003C]";
      case "yellow":
        return "bg-[#FF990026]/15 text-[#FF9900]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleActivity = () => {
    navigate("/settings/timeline")
  }

  return (
    <div className="w-full rounded-lg shadow-[2px_2px_5px_rgba(0,0,0,0.25)] border p-4">
      {/* Tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex justify-between">
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

        </div>
       <button onClick={handleActivity} className="text-blue-700 mr-3">View All</button>
      </div>

      {/* Conditional Render */}
      <div className="h-[400px] overflow-y-auto no-scrollbar">
          <ActivityList
            data={activityData}
            getIconStyles={getIconStyles}
            getStatusBadgeStyles={getStatusBadgeStyles}
          />
      </div>
    </div>
  );
}
