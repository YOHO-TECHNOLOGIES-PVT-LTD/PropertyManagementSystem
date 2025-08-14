

import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { getallactivity } from "../../features/settings/service";

interface TimelineItem {
  title: string;
  description: string;
  date: string;
}

const timelineData: TimelineItem[] = [
  {
    title: "Notes Created",
    description: "Jhgfds - Notes Created",
    date: "July 17, 2025 At 06:13:23 PM",
  },
  {
    title: "Notes Created",
    description: "Jhgfds - Notes Created",
    date: "July 17, 2025 At 06:13:23 PM",
  },
  {
    title: "Notes Created",
    description: "Jhgfds - Notes Created",
    date: "July 17, 2025 At 06:13:23 PM",
  },
  {
    title: "Notes Created",
    description: "Jhgfds - Notes Created",
    date: "July 17, 2025 At 06:13:23 PM",
  },
];

export default function Timeline() {

const[getActivity,setGetActivity]=useState()

const fetchallActivity = async ( data: any) => { 
      const response = await getallactivity(data);
  if (response) {
    return response;
     } }


  return (
    <div className="space-y-8 relative">
      {timelineData.map((item, index) => (
        <div key={index} className="flex items-start gap-4 relative items-center">
          <div className="flex flex-col items-center">
            <div className="bg-teal-600 text-white px-4 py-1 rounded-md font-semibold">
              {item.title}
            </div>
            <div className="w-3 h-3 rounded-full bg-teal-600 mt-2"></div>
            {index !== timelineData.length - 1 && (
              <div className="w-[2px] bg-teal-600 flex-grow min-h-[150px]"></div>
            )}
          </div>

         
          <Card className="flex-1 border border-teal-500 mt-8">
            <CardContent className="p-4 flex justify-between items-start">
              <div>
                <p className="font-semibold">Note</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <p className="text-xs text-gray-500">{item.date}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
