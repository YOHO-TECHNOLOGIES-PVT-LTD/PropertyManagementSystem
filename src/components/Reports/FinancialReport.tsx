"use client"

import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart3, ChevronDown } from "lucide-react"
import { FONTS } from '../../constants/ui constants';

const revenueData = [
    { month: "Jan", series1: 52, series2: 15 },
    { month: "Feb", series2: 35, series1: 42 },
    { month: "Mar", series1: 48, series2: 32 },
    { month: "Apr", series1: 65, series2: 18 },
    { month: "May", series1: 35, series2: 22 },
    { month: "Jun", series1: 28, series2: 45 },
    { month: "Jul", series1: 52, series2: 85 },
    { month: "Aug", series1: 25, series2: 58 },
    { month: "Sep", series1: 45, series2: 65 },
    { month: "Oct", series1: 48, series2: 25 },
    { month: "Nov", series1: 55, series2: 35 },
    { month: "Dec", series1: 42, series2: 38 },
]

const FinancialReport = () => {
    const tableHeaders = Array.from({ length: 5 });

    return (
        <div>

            {/* Graph Data  */}


            <div className=" my-6">
                <div className="max-w-1/2 ">
                    <Card className="w-full ">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <BarChart3 className="w-6 h-6 text-blue-600" />
                                </div>
                                <CardTitle style={{...FONTS.headers}}>Monthly Revenue Trend</CardTitle>
                            </div>
                            <ChevronDown className="w-6 h-6 text-gray-400" />
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={{
                                    series1: {
                                        label: "Revenue Stream 1",
                                        color: "rgb(236, 72, 153)#EF5DA8", // Pink color matching the image
                                    },
                                    series2: {
                                        label: "Revenue Stream 2",
                                        color: "#7B00FF", // Purple color matching the image
                                    },
                                }}
                                className="h-[300px] w-full"
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={revenueData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: "#9ca3af", fontSize: 14 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            domain={[0, 100]}
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: "#9ca3af", fontSize: 14 }}
                                            dx={-10}
                                        />
                                        <ChartTooltip
                                            content={<ChartTooltipContent />}
                                            cursor={{ stroke: "rgba(0,0,0,0.1)", strokeWidth: 10}}
                                            strokeLinecap="rounded"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="series1"
                                            stroke="#EF5DA8"
                                            strokeWidth={8}
                                            fill="transparent"
                                            dot={false}
                                            activeDot={{ r: 6, fill: "#EF5DA8" }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="series2"
                                            stroke="#7B00FF"
                                            strokeWidth={8}
                                            fill="transparent"
                                            dot={false}
                                            activeDot={{ r: 6, fill: "#7B00FF" }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>




                <div>
                    
                </div>
            </div>




            <div className='shadow-[0px_0px_15px_0px_#0000001A] rounded-lg p-3 grid gap-6'>
                <h1 style={{ ...FONTS.chart_Header }}>Property Performance</h1>

                <div style={{ ...FONTS.Table_Header }} className='shadow-[0px_0px_15px_0px_#0000001A] rounded-lg p-3 grid grid-cols-4'>
                    <p>Property</p>
                    <p>Units</p>
                    <p>Revenue</p>
                    <p>Occupancy</p>
                </div>

                {tableHeaders.map((_, index) => (
                    <div className='shadow-[0px_0px_15px_0px_#0000001A] rounded-lg p-3 grid grid-cols-4'>
                        <p style={{ ...FONTS.Table_Header }}>Property</p>
                        <p style={{ ...FONTS.Table_Body_2 }} className='text-[#7D7D7D]'>24</p>
                        <p style={{ ...FONTS.Table_Body_2 }} className='text-[#7D7D7D]'>240k</p>
                        <p style={{ ...FONTS.Table_Body_2 }} className='text-[#7D7D7D]'>95%</p>
                    </div>))}

            </div>
        </div>
    )
}

export default FinancialReport