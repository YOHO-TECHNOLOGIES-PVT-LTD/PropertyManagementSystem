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
      <div className="flex items-center gap-3 mb-6 justify-start">
        <Building2 className="text-cyan-500" size={24} />
        <h2 className="text-lg font-semibold">Payment Status Distribution</h2>
      </div>
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
            <RadialBar
              dataKey="value"
              cornerRadius={10}
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