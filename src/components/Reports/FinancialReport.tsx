"use client"

import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../components/ui/chart"
import { ChevronDown } from "lucide-react"
import { FONTS } from '../../constants/ui constants';
import ExpenseBreakdown from "./ExpenseChart"
import graphBuilding from '../../assets/Reports/graphBuilding.png'
import { useState } from "react"
import Purple_Building from '../../assets/Reports/purple_building.png'
import Frame_1 from '../../assets/Reports/Frame_1.png'
import Frame_2 from '../../assets/Reports/Frame_2.png'
import { useSelector } from "react-redux"
import { selectDashboardData } from "../../features/Dashboard/Reducer/Selector"

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

const revenueYearData = [
    { month: "Jan", series1: 15, series2: 25 },
    { month: "Feb", series1: 25, series2: 35 },
    { month: "Mar", series1: 20, series2: 30 },
    { month: "Apr", series1: 30, series2: 20 },
    { month: "May", series1: 40, series2: 25 },
    { month: "Jun", series1: 35, series2: 30 },
    { month: "Jul", series1: 45, series2: 40 },
    { month: "Aug", series1: 50, series2: 45 },
    { month: "Sep", series1: 55, series2: 50 },
    { month: "Oct", series1: 60, series2: 55 },
    { month: "Nov", series1: 65, series2: 60 },
    { month: "Dec", series1: 70, series2: 65 },
]

const FinancialReport = () => {
    const tableHeaders = Array.from({ length: 5 });
      const ReportsData = useSelector(selectDashboardData);


    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Monthly");

    const options = ["Monthly", "Yearly"];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option: any) => {
        setSelectedOption(option);
        setIsOpen(false);
    };


    const formatIndianNumber = (num: any) => {
        if (num >= 10000000) {
            return `${(num / 10000000).toFixed(2)} Cr`;
        } else if (num >= 100000) {
            return `${(num / 100000).toFixed(2)} Lakh`;
        }
        return num?.toString();
    };

    console.log("ReportsDataaaaaaaaaaaaaaaa", ReportsData);
    return (
        <div>

            <div className=" my-6 flex gap-6">
                {/* Graph Data  */}

                <div className="w-full ">
                    <section
                        className="w-full flex flex-col justify-center shadow-[0px_0px_40px_0px_#9739E91A] rounded-xl  py-3 my-10"
                        style={{
                            backgroundImage: `url(${Frame_1})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <div className="flex items-center">
                            <img src={Purple_Building} alt="Purp_build" className='w-[90px] h-[90px]' />
                            <p style={{ ...FONTS.card_headers }} className='text-[#7D7D7D]'>Total Revenue</p>
                        </div>
                        <h1 style={{ ...FONTS.headers }} className="px-6">{formatIndianNumber(ReportsData?.totalMonthlyRevenue)}</h1>
                    </section>
                    <Card className=" shadow-[0px_0px_15px_0px_#0000001A] border-0 pt-0 rounded-lg">
                        <CardHeader className="flex items-center justify-between pl-0">
                            <div className="flex items-center">
                                <img src={graphBuilding} alt="pyBuilding" className="h-[90px] w-[90px]" />
                                <CardTitle style={{ ...FONTS.headers }}>{selectedOption === "Monthly" ? "Monthly Revenue Trend" : "Yearly Revenue Trend"}</CardTitle>
                            </div>

                            {/* Dropdown */}
                            <div className="relative">
                                <button
                                    className="bg-[#B200FF1A] px-4 py-2 rounded-md flex items-center justify-between text-[#B200FF]"
                                    style={{ ...FONTS.button_Text }}
                                    onClick={toggleDropdown}
                                >
                                    {selectedOption}
                                    <ChevronDown
                                        className={`ml-2 w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {isOpen && (
                                    <div className="absolute z-10 mt-1 w-[140px] p-2 bg-white rounded-md shadow-[0px_0px_15px_0px_#0000001A] grid gap-2 top-[42px] right-0">
                                        {options.map((option) => (
                                            <div
                                                key={option}
                                                style={{ ...FONTS.headers_description }}
                                                className={`px-4 py-2 hover:bg-[#B200FF1A] border rounded-md cursor-pointer ${selectedOption === option ? "bg-[#B200FF1A]" : ""
                                                    }`}
                                                onClick={() => handleOptionClick(option)}
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={{
                                    series1: {
                                        label: "Revenue Stream 1",
                                        color: "#EF5DA8", // Pink color matching the image
                                    },
                                    series2: {
                                        label: "Revenue Stream 2",
                                        color: "#7B00FF", // Purple color matching the image
                                    },
                                }}
                                className="h-[300px] w-full"
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={selectedOption.toLowerCase() === "monthly" ? revenueData : revenueYearData}
                                        margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                                    >
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
                                            cursor={{ stroke: "rgba(0,0,0,0.1)", strokeWidth: 10 }}
                                            strokeLinecap="round"
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


                <div className='w-full'>
                    <ExpenseBreakdown />
                </div>
            </div>




            <div className='shadow-[0px_0px_15px_0px_#0000001A] rounded-lg p-3 grid gap-6'>
                <h1 style={{ ...FONTS.chart_Header }}>Property Performance</h1>

                <div style={{ ...FONTS.Table_Header }} className='shadow-[0px_0px_15px_0px_#0000001A] rounded-lg p-4 grid grid-cols-4'>
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

export default FinancialReport