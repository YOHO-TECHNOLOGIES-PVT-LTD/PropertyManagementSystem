import React, { useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { FONTS } from "../../constants/ui constants";
import pyBuilding from '../../assets/Reports/pyBuilding.png'
import { ChevronDown } from "lucide-react";
import Purple_Building from '../../assets/Reports/purple_building.png'
import Frame_1 from '../../assets/Reports/Frame_1.png'
import Frame_2 from '../../assets/Reports/Frame_2.png'


const expenseData = [
    { name: "Maintenance", value: 40, color: "#FF6B2C" }, // Orange
    { name: "Utilities", value: 15, color: "#8BC34A" },      // Green
    { name: "Insurance", value: 10, color: "#1ECDF4" },    // Cyan
    { name: "Property Tax", value: 15, color: "#6A4CFF" }, // Purple
    { name: "Management", value: 20, color: "#FBC02D" },  // Yellow
];
const expenseYearData = [
    { name: "Maintenance", value: 15, color: "#84D7A5" },
    { name: "Utilities", value: 25, color: "#725ED8" },
    { name: "Insurance", value: 15, color: "#F33942" },
    { name: "Property Tax", value: 25, color: "#18AEA4" },
    { name: "Management", value: 20, color: "#CB3BDB" },
];

const ExpenseBreakdown: React.FC = () => {
    const total = expenseData.reduce((sum, entry) => sum + entry.value, 0);

    // Bottom legend
    const renderLegend = () => {
        const currentData =
            selectedOption.toLowerCase() === "monthly" ? expenseData : expenseYearData;
        const total = currentData.reduce((sum, entry) => sum + entry.value, 0);

        return (
            <div style={{ display: "flex", flexDirection: "column", width: "40%" }}>
                {currentData.map((entry, index) => {
                    const percentage = ((entry.value / total) * 100).toFixed(0);
                    return (
                        <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                            <span
                                style={{
                                    display: "inline-block",
                                    width: 15,
                                    height: 15,
                                    backgroundColor: entry.color,
                                    marginRight: 10,
                                    borderRadius: "2px",
                                }}
                            />
                            {entry.name}: {percentage}%
                        </div>
                    );
                })}
            </div>
        );
    };



    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Monthly");

    const options = ["Monthly", "Yearly"];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option: any) => {
        setSelectedOption(option);
        setIsOpen(false);
    };
    return (
        <div>
            <section
                    className="w-full flex flex-col justify-center shadow-[0px_0px_40px_0px_#9739E91A] rounded-xl  py-3 my-10"
                    style={{
                        backgroundImage: `url(${Frame_2})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className="flex items-center">
                    <img src={Purple_Building} alt="Purp_build" className='w-[90px] h-[90px]' />
                    <p style={{ ...FONTS.card_headers }} className='text-[#7D7D7D]'>Total Expenses</p>
                    </div>
                    <h1 style={{...FONTS.headers}} className="px-6">6000000</h1>
                </section>

        <div className="bg-white rounded-lg shadow-[0px_0px_15px_0px_#0000001A] p-2 h-[437px] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                {/* Left Section */}
                <div className="flex items-center gap-3">
                    <img
                        src={pyBuilding}
                        alt="pyBuilding"
                        className="h-[90px] w-[90px]"
                    />
                    <h3 style={{ ...FONTS.headers }}>Expense Breakdown</h3>
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
            </div>

            {/* Chart and Legend */}
            <div className="flex h-full items-center justify-center ">
                <ResponsiveContainer width="60%" height="100%">
                    <PieChart>
                        <Pie
                            data={selectedOption.toLowerCase() === "monthly" ? expenseData : expenseYearData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={110}
                            paddingAngle={5}
                            labelLine={false}
                            cornerRadius={50}
                        >
                            {(selectedOption.toLowerCase() === "monthly" ? expenseData : expenseYearData).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>

                        <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                </ResponsiveContainer>
                {renderLegend()}
            </div>
        </div>
        </div>
    );
};

export default ExpenseBreakdown;
