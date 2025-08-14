import { FONTS } from "../../constants/ui constants"
"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../components/ui/chart"
import { BarChart3 } from "lucide-react"
import Buildings from '../../assets/Reports/buildings.png'

const data = [
  { month: "Jan", occupancy: 50 },
  { month: "Feb", occupancy: 80 },
  { month: "Mar", occupancy: 90 },
  { month: "Apr", occupancy: 60 },
  { month: "May", occupancy: 90 },
  { month: "Jun", occupancy: 70 },
  { month: "Jul", occupancy: 10 },
  { month: "Aug", occupancy: 80 },
  { month: "Sep", occupancy: 30 },
  { month: "Oct", occupancy: 49 },
  { month: "Nov", occupancy: 65 },
  { month: "Dec", occupancy: 95 },
]

const chartConfig = {
  occupancy: {
    label: "Occupancy",
    color: "#B200FF", // Changed to vibrant purple to match the original
  },
}

const OccupancyReport = () => {
  const tableHeaders = Array.from({ length: 5 });

  return (
    <div>

      <div className="my-6 shadow-[0px_0px_15px_0px_#0000001A] rounded-lg">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className="flex items-center ">
                <img
                  src={Buildings}
                  alt="btn"
                  className="h-[80px] w-[80px]"
                />              
              <CardTitle className="" style={{ ...FONTS.headers }} >Occupancy Trend</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
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
                      <stop offset="0%" stopColor="#B200FF" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#B200FF" stopOpacity={0.07} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickFormatter={(value) => `${value}%`}
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => [`${value}%`, "Occupancy"]}
                        labelStyle={{ color: "#374151" }}
                        cornerRadius={8}
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="occupancy"
                    stroke="#B200FF"
                    strokeWidth={5}
                    fill="url(#occupancyGradient)"
                    dot={false}
                    activeDot={{ r: 6, stroke: "#FFFFFF", strokeWidth: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>


      <div className='shadow-[0px_0px_15px_0px_#0000001A] rounded-lg p-4 grid gap-6'>
        <h1 style={{ ...FONTS.chart_Header }}>Property Performance</h1>

        <div style={{ ...FONTS.Table_Header }} className='shadow-[0px_0px_15px_0px_#0000001A] rounded-lg p-3 grid grid-cols-4'>
          <p>Property</p>
          <p>Units</p>
          <p>Revenue</p>
          <p>Occupancy</p>
        </div>

        {tableHeaders.map((_, index) => (
          <div className='shadow-[0px_0px_15px_0px_#0000001A] rounded-lg p-4 grid grid-cols-4'>
            <p style={{ ...FONTS.Table_Header }}>Property</p>
            <p style={{ ...FONTS.Table_Body_2 }} className='text-[#7D7D7D]'>24</p>
            <p style={{ ...FONTS.Table_Body_2 }} className='text-[#7D7D7D]'>240k</p>
            <p style={{ ...FONTS.Table_Body_2 }} className='text-[#7D7D7D]'>95%</p>
          </div>))}

      </div>
    </div>
  )
}

export default OccupancyReport