import { useState, useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { getallactivity } from "../../features/settings/service";

interface TimelineItem {
  title: string;
  details: string;
  date: string;
}

export default function Timeline() {
  const [activityList, setActivityList] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllActivity = async () => {
    try {
      setLoading(true);
      const response = await getallactivity({ page: 1, limit: 50 });

      if (response?.data) {
        const formattedData = response.data.map((item: any) => ({
          title: item.title || "No Title",
          details: item.details || item.message || "",
          date:
            item.createdAt ||
            new Date().toLocaleString(), 
        }));

        setActivityList(formattedData);
      }
    } catch (err) {
      console.error("Error fetching activity:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllActivity();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading activities...</p>;
  }

  if (activityList.length === 0) {
    return <p className="text-gray-500">No activity found.</p>;
  }

  return (
    <div className="space-y-8 relative">
      {activityList.map((item, index) => (
        <div key={index} className="flex items-start gap-4 relative items-center">
          {/* Timeline line and dot */}
          <div className="flex flex-col items-center">
            <div className="bg-teal-600 text-white px-4 py-1 rounded-md font-semibold">
              {item.title}
            </div>
            <div className="w-3 h-3 rounded-full bg-teal-600 mt-2"></div>
            {index !== activityList.length - 1 && (
              <div className="w-[2px] bg-teal-600 flex-grow min-h-[150px]"></div>
            )}
          </div>

          {/* Card content */}
          <Card className="flex-1 border border-teal-500 mt-8">
            <CardContent className="p-4 flex justify-between items-start">
              <div>
                <p className="font-semibold">Note</p>
                <p className="text-sm text-gray-600">{item.details}</p>
              </div>
              <p className="text-xs text-gray-500">{item.date}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
