"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { FileText, BarChart3, Users, Wrench, Download, FileSpreadsheet, ChevronDown } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"
import { Area, AreaChart } from "recharts"
import emptyImg from "../../assets/empty.png"
// ... existing data arrays remain the same ...
const monthlyData = [
  { month: "Jan", revenue1: 15, revenue2: 52 },
  { month: "Feb", revenue1: 32, revenue2: 42 },
  { month: "Mar", revenue1: 35, revenue2: 65 },
  { month: "Apr", revenue1: 18, revenue2: 58 },
  { month: "May", revenue1: 25, revenue2: 35 },
  { month: "Jun", revenue1: 85, revenue2: 28 },
  { month: "Jul", revenue1: 88, revenue2: 52 },
  { month: "Aug", revenue1: 58, revenue2: 35 },
  { month: "Sep", revenue1: 65, revenue2: 28 },
  { month: "Oct", revenue1: 45, revenue2: 48 },
  { month: "Nov", revenue1: 35, revenue2: 55 },
  { month: "Dec", revenue1: 32, revenue2: 45 },
]

const yearlyData = [
  { year: "2017", revenue1: 68, revenue2: 52 },
  { year: "2018", revenue1: 65, revenue2: 45 },
  { year: "2019", revenue1: 42, revenue2: 38 },
  { year: "2020", revenue1: 35, revenue2: 25 },
  { year: "2021", revenue1: 58, revenue2: 55 },
  { year: "2022", revenue1: 72, revenue2: 48 },
  { year: "2023", revenue1: 95, revenue2: 42 },
  { year: "2024", revenue1: 48, revenue2: 35 },
  { year: "2025", revenue1: 85, revenue2: 95 },
]

const expenseData = [
  { name: "Maintenance", value: 45, color: "#FF6B35" },
  { name: "Management", value: 25, color: "#F7931E" },
  { name: "Property Tax", value: 15, color: "#4F46E5" },
  { name: "Insurance", value: 10, color: "#06B6D4" },
  { name: "Utilities", value: 5, color: "#10B981" },
]

const yearlyExpenseData = [
  { name: "Maintenance", value: 45, color: "#10B981" },
  { name: "Management", value: 25, color: "#A855F7" },
  { name: "Property Tax", value: 15, color: "#06B6D4" },
  { name: "Insurance", value: 10, color: "#EF4444" },
  { name: "Utilities", value: 5, color: "#6366F1" },
]

const propertyData = [
  { name: "Sunrise Apartments", units: 24, revenue: "₹2,400", occupancy: "95%" },
  { name: "Green Valley Complex", units: 36, revenue: "₹3,600", occupancy: "88%" },
  { name: "Downtown Plaza", units: 18, revenue: "₹1,800", occupancy: "92%" },
  { name: "Riverside Towers", units: 12, revenue: "₹4,200", occupancy: "92%" },
  { name: "Garden View Homes", units: 15, revenue: "₹1,500", occupancy: "84%" },
];


const occupancyData = [
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

export default function FinancialDashboard() {
  const [showRevenueDropdown, setShowRevenueDropdown] = useState(false)
  const [showExpenseDropdown, setShowExpenseDropdown] = useState(false)
  const [revenueViewType, setRevenueViewType] = useState("month")
  const [expenseViewType, setExpenseViewType] = useState("month")
  const [activeReport, setActiveReport] = useState("financial")

  const totalRevenue = monthlyData.reduce((sum, month) => sum + month.revenue1 + month.revenue2, 0) * 100
  const totalExpenses = expenseData.reduce((sum, expense) => sum + expense.value, 0) * 100

  const handleRevenueViewChange = (viewType: string) => {
    setRevenueViewType(viewType)
    setShowRevenueDropdown(false)
  }

  const handleExpenseViewChange = (viewType: string) => {
    setExpenseViewType(viewType)
    setShowExpenseDropdown(false)
  }

// Update the renderReportPage function to include the image
const renderReportPage = (reportType: string) => {
  const reportConfig = {
    tenant: {
      title: "Tenant Report",
      description: "Detailed tenant analytics and insights coming soon.",
      icon: emptyImg,
    },
    maintenance: {
      title: "Maintenance Report",
      description: "Comprehensive maintenance tracking and analytics coming soon.",
      icon: emptyImg,
    },
  }

  const config = reportConfig[reportType as keyof typeof reportConfig]

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="mb-8">
        <img 
          src={config.icon} 
          alt="Coming soon" 
          className="w-48 h-48 object-contain opacity-75"
        />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{config.title}</h2>
      <p className="text-gray-600 text-lg max-w-md">{config.description}</p>
    </div>
  )
}
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Financial Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Comprehensive Insights Into Your Property Portfolio</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
          </div>
        </div>

        {/* Owner Access Banner */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">Owner Access - Complete Financial Reports</h3>
                <p className="text-blue-700 text-sm">
                  Access to All Financial Data, Revenue Reports, Expense Breakdowns, And Profit Analysis
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Type and Date Range */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Type</h2>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className={`flex items-center gap-2 ${activeReport === "financial" ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-transparent"}`}
                onClick={() => setActiveReport("financial")}
              >
                <BarChart3 className="w-4 h-4" />
                Financial Report
              </Button>
              <Button
                variant="outline"
                className={`flex items-center gap-2 ${activeReport === "occupancy" ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-transparent"}`}
                onClick={() => setActiveReport("occupancy")}
              >
                <BarChart3 className="w-4 h-4" />
                Occupancy Report
              </Button>
              <Button
                variant="outline"
                className={`flex items-center gap-2 ${activeReport === "tenant" ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-transparent"}`}
                onClick={() => setActiveReport("tenant")}
              >
                <Users className="w-4 h-4" />
                Tenant Report
              </Button>
              <Button
                variant="outline"
                className={`flex items-center gap-2 ${activeReport === "maintenance" ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-transparent"}`}
                onClick={() => setActiveReport("maintenance")}
              >
                <Wrench className="w-4 h-4" />
                Maintenance Report
              </Button>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Date Range</h2>
            <Select defaultValue="12months">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12months">Last 12 Month</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {activeReport === "tenant" || activeReport === "maintenance" ? (
          <Card className="min-h-[500px]">
            <CardContent className="p-8">{renderReportPage(activeReport)}</CardContent>
          </Card>
        ) : (
          <>
            {/* Revenue and Expenses Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-pink-600" />
                    </div>
                    <span className="text-gray-600">Total Revenue</span>
                  </div>
<div className="text-3xl font-bold text-gray-900">
  {totalRevenue.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
</div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-gray-600">Total Expenses</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{totalExpenses.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeReport === "financial" ? (
                <>
                  {/* Monthly Revenue Trend */}
                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100 relative">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-gray-800">
                          <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                            <BarChart3 className="w-4 h-4 text-purple-600" />
                          </div>
                          Monthly Revenue Trend
                        </CardTitle>
                        <button
                          onClick={() => setShowRevenueDropdown((prev) => !prev)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                      {showRevenueDropdown && (
                        <div className="absolute top-14 right-4 bg-white rounded-xl shadow-md border border-gray-200 w-40 z-10">
                          <div
                            className="p-3 hover:bg-gray-50 rounded-t-xl cursor-pointer"
                            onClick={() => handleRevenueViewChange("month")}
                          >
                            Month
                          </div>
                          <div
                            className="p-3 hover:bg-gray-50 rounded-b-xl cursor-pointer"
                            onClick={() => handleRevenueViewChange("year")}
                          >
                            Year
                          </div>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="h-64 -mx-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={revenueViewType === "year" ? yearlyData : monthlyData}
                            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                          >
                            <XAxis
                              dataKey={revenueViewType === "year" ? "year" : "month"}
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 12, fill: "#6B7280" }}
                              dy={10}
                            />
                            <YAxis hide domain={[0, 100]} />
                            <Tooltip />
                            <Line type="monotone" dataKey="revenue1" stroke="#3B82F6" strokeWidth={3} dot={false} />
                            <Line type="monotone" dataKey="revenue2" stroke="#EF4444" strokeWidth={3} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Expense Breakdown */}
                  <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-100 relative">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-gray-800">
                          <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                            <BarChart3 className="w-4 h-4 text-orange-600" />
                          </div>
                          Expense Breakdown
                        </CardTitle>
                        <button
                          onClick={() => setShowExpenseDropdown((prev) => !prev)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                      {showExpenseDropdown && (
                        <div className="absolute top-14 right-4 bg-white rounded-xl shadow-md border border-gray-200 w-40 z-10">
                          <div
                            className="p-3 hover:bg-gray-50 rounded-t-xl cursor-pointer"
                            onClick={() => handleExpenseViewChange("month")}
                          >
                            Month
                          </div>
                          <div
                            className="p-3 hover:bg-gray-50 rounded-b-xl cursor-pointer"
                            onClick={() => handleExpenseViewChange("year")}
                          >
                            Year
                          </div>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <div className="h-48 w-48 relative">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={expenseViewType === "year" ? yearlyExpenseData : expenseData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                dataKey="value"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              >
                                {(expenseViewType === "year" ? yearlyExpenseData : expenseData).map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="space-y-3">
                          {(expenseViewType === "year" ? yearlyExpenseData : expenseData).map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                              <span className="text-sm text-gray-700 font-medium">
                                {item.name}: {item.value}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                // Occupancy Chart - takes full width when active
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-500" />
                      Occupancy Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={occupancyData}
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
                          <Tooltip formatter={(value) => [`${value}%`, "Occupancy"]} />
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
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Property Performance Table */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Property Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-gray-600">Property</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-600">Units</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-600">Revenue</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-600">Occupancy</th>
                        </tr>
                      </thead>
                      <tbody>
                        {propertyData.map((property, index) => (
                          <tr key={index} className="border-b last:border-b-0">
                            <td className="py-3 px-4 text-gray-900">{property.name}</td>
                            <td className="py-3 px-4 text-gray-600">{property.units}</td>
                            <td className="py-3 px-4 text-gray-900 font-medium">{property.revenue}</td>
                            <td className="py-3 px-4 text-gray-600">{property.occupancy}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
