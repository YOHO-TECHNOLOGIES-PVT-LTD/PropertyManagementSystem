import type React from "react";
import { Building2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DataPoint {
  month: string;
  revenue: number;
  expenses: number;
}

const MonthlyRevenueTrendLine: React.FC<{ data: DataPoint[] }> = ({ data }) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black text-white px-3 py-1.5 rounded-lg shadow-[2px_2px_5px_rgba(0,0,0,0.25)] text-sm font-medium">
          <p>${(payload[0].value / 1000).toFixed(1)}k</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-3 rounded-2xl shadow-lg w-full">
      {/* Header */}
      <div className="flex items-center gap-3 ">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 shadow-sm">
          <Building2 className="text-blue-500 h-5 w-5" />
        </div>
        <h2 className="font-semibold text-lg text-gray-800">
          Monthly Revenue Trend
        </h2>
      </div>

      <ResponsiveContainer width="100%" height={310}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
        >
          <defs>
            {/* Shadow/glow filters for the lines with matching colors */}
            <filter id="blueGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feFlood floodColor="#00BFFF" floodOpacity="0.6" />
              <feComposite in2="coloredBlur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="pinkGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feFlood floodColor="#FF1493" floodOpacity="0.6" />
              <feComposite in2="coloredBlur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Axis */}
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
            tickFormatter={(value) => `${value / 1000}k`}
            domain={[0, 800000]}
            
          />

          {/* Custom Tooltip */}
          <Tooltip content={<CustomTooltip />} />

          {/* Legend */}
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="line"
          />

          <Line
            type="monotone" 
            dataKey="revenue"
            stroke="#36ACD3"
            strokeWidth={5}
            dot={false}
            name="Revenue"
            filter="url(#blueGlow)"
            style={{
              filter: "drop-shadow(0px 2px 8px rgba(0, 191, 255, 0.5))",
              transform: "translateX(10px)" 
            }}
          />

          <Line
            type="monotone" 
            dataKey="expenses"
            stroke="#B200FF"
            strokeWidth={5}
            dot={false}
            name="Expenses"
            filter="url(#pinkGlow)"
            style={{
              filter: "drop-shadow(0px 2px 8px rgba(255, 20, 147, 0.5))",
              transform: "translateX(10px)" 
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyRevenueTrendLine;
