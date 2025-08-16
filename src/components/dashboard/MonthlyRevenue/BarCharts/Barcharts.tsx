import React from "react";
import { Building2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface DataPoint {
  year: string;
  revenue: number;
  netIncome: number;
}

const MonthlyRevenueTrendBar: React.FC<{ data: DataPoint[] }> = ({ data }) => {
  return (
    <div className="bg-white p-2 rounded-2xl shadow-[2px_2px_5px_rgba(0,0,0,0.25)] w-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#B200FF26]/15 shadow-lg">
          <div className="text-[#B200FF]"><Building2 /></div>
        </div>
        <h2 className="font-semibold text-lg">Monthly Revenue Trend</h2>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={20}>
          <defs>
            <pattern id="diagonalStripes" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#ECC5FD" strokeWidth="2" />
            </pattern>
          </defs>
          <XAxis dataKey="year"tick={true} axisLine={false} tickLine={false} />
          <YAxis tick={true} axisLine={false} tickLine={false} tickFormatter={(value) => `${value / 1000}K`}/>

          <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />

          <Bar dataKey="revenue" fill="url(#diagonalStripes)" radius={[10, 10, 0, 0]} />
          <Bar dataKey="netIncome" fill="#B200FF" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyRevenueTrendBar;