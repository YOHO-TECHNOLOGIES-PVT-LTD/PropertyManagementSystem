import { Building2 } from "lucide-react";
import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface RadialChartProps {
  data: { name: string; value: number; fill: string }[];
}

const RadialChart: React.FC<RadialChartProps> = ({ data }) => {
  return (
    <div className="w-full flex flex-col rounded-lg shadow-[2px_2px_5px_rgba(0,0,0,0.25)] p-4 justify-center bg-transparent">
      {/* Title Row */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#289A9A26]/15 shadow-lg">
          <div className="text-[#289A9A]">
            <Building2 />
          </div>
        </div>
        <h2 className="font-semibold text-lg">Payment Status Distribution</h2>
      </div>

      {/* Chart */}
      <div className="flex items-center justify-center">
        <ResponsiveContainer width={300} height={300}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={15}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            {/* Removed background prop here */}
            <RadialBar
              dataKey="value"
              cornerRadius={10}
              // background removed to hide white arcs behind bars
            />
            <Tooltip />
            <Legend
              iconSize={10}
              layout="horizontal"
              verticalAlign="bottom"
              wrapperStyle={{ paddingTop: 20 }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RadialChart;
