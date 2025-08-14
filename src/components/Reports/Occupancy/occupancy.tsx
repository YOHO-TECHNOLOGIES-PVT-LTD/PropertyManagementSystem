"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../ui/chart"
import { BarChart3 } from "lucide-react"

const data = [
  { month: "Jan", occupancy: 50 },
  { month: "Feb", occupancy: 75 },
  { month: "Mar", occupancy: 68 },
  { month: "Apr", occupancy: 35 },
  { month: "May", occupancy: 40 },
  { month: "Jun", occupancy: 85 },
  { month: "Jul", occupancy: 82 },
  { month: "Aug", occupancy: 65 },
  { month: "Sep", occupancy: 8 },
  { month: "Oct", occupancy: 25 },
  { month: "Nov", occupancy: 70 },
  { month: "Dec", occupancy: 95 },
]

const chartConfig = {
  occupancy: {
    label: "Occupancy",
    color: "#a855f7",
  },
}

export function OccupancyTrendChart() {
  return (
    <div className="bg-white rounded-lg border p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900">Occupancy Trend</h2>
      </div>

      <ChartContainer config={chartConfig} className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="occupancyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#a855f7" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              className="text-xs"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              className="text-xs"
            />
            <ChartTooltip content={<ChartTooltipContent />} formatter={(value) => [`${value}%`, "Occupancy"]} />
            <Area
              type="monotone"
              dataKey="occupancy"
              stroke="#a855f7"
              strokeWidth={3}
              fill="url(#occupancyGradient)"
              dot={false}
              activeDot={{
                r: 4,
                fill: "#a855f7",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
