import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Building2 } from "lucide-react";

interface RentCollectionRateProps {
  data: { month: string; paid: number; pending: number }[];
}

const RentCollectionRate: React.FC<RentCollectionRateProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-[2px_2px_5px_rgba(0,0,0,0.25)] p-6">
      <div className="flex items-center gap-3 mb-4">
        <Building2 className="text-cyan-500" size={24} />
        <h2 className="text-lg font-semibold">Rent Collection Rate</h2>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={30}>
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="pending"
            stackId="a"
            fill="#45B38A"
            radius={[0, 0, 20, 20]}
          />
          <Bar
            dataKey="paid"
            stackId="a"
            fill="#82D8A2"
            radius={[20, 20, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RentCollectionRate;
