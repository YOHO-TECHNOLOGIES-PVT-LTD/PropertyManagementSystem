import { useState, useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { getallactivity } from "../../features/settings/service";
import { FONTS } from "../../constants/ui constants";

interface TimelineItem {
  title: string;
  details: string;
  date: string;
}

export default function Timeline() {
  const [activityList, setActivityList] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // items per page
  const [totalPages, setTotalPages] = useState(1);

  const fetchAllActivity = async (currentPage: number) => {
    try {
      setLoading(true);
      const response = await getallactivity(
        {page:currentPage}
      );

      console.log('response:',response)

      if (response?.data) {
        const formattedData = response.data.map((item: any) => ({
          title: item.title || "No Title",
          details: item.details || item.message || "",
          date: item.createdAt || new Date().toLocaleString(),
        }));

        setActivityList(formattedData);
        setTotalPages(response?.totalPages ||1); 
      }
    } catch (err) {
      console.error("Error fetching activity:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllActivity(page);
  }, [page]);

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
        
          <div className="flex flex-col items-center">
            <div className="bg-teal-600 text-white px-4 py-1 rounded-md font-semibold"style={{...FONTS.Table_Header}}>
              {item.title}
            </div>
            <div className="w-3 h-3 rounded-full bg-teal-600 mt-2"></div>
            {index !== activityList.length - 1 && (
              <div className="w-[2px] bg-teal-600 flex-grow min-h-[150px]"></div>
            )}
          </div>

      
          <Card className="flex-1 border border-teal-500 mt-8">
            <CardContent className="p-4 flex justify-between items-start">
              <div>
                <p className="font-semibold"style={{...FONTS.Table_Header,fontSize:'20px'}}>Note</p>
                <p className="text-sm text-gray-600"style={{...FONTS.large_card_description3}}>{item.details}</p>
              </div>
              <p className="text-xs text-gray-500"style={{...FONTS.large_card_description3}}>
                {new Date(item.date).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </CardContent>
          </Card>
        </div>
      ))}

      
      <div className="flex justify-center items-center gap-2 mt-6">

  <button
    disabled={page === 1}
    onClick={() => setPage((prev) => prev - 1)}
    className={`px-4 py-2 rounded-full shadow-md transition-all duration-200 ${
      page === 1
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "bg-teal-500 text-white hover:bg-teal-600 active:scale-95"
    }`}
  >
    ⬅ Prev
  </button>

  {/* Page Numbers */}
  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
    <button
      key={pageNum}
      onClick={() => setPage(pageNum)}
      className={`px-3 py-1 rounded-full transition-all duration-200 ${
        page === pageNum
          ? "bg-teal-600 text-white shadow-md"
          : "bg-gray-100 text-gray-700 hover:bg-teal-100"
      }`}
    >
      {pageNum}
    </button>
  ))}

  {/* Next Button */}
  <button
    disabled={page === totalPages}
    onClick={() => setPage((prev) => prev + 1)}
    className={`px-4 py-2 rounded-full shadow-md transition-all duration-200 ${
      page === totalPages
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "bg-teal-500 text-white hover:bg-teal-600 active:scale-95"
    }`}
  >
    Next ➡
  </button>
</div>

    </div>
  );
}
