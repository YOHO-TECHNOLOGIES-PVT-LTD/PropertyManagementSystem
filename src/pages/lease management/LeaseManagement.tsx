import { useState } from "react"
import { Search, Download, Eye, Building2, Clock, FileX, Shield } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import cardimg1 from "../../assets/cardimg1.png"
import cardimg2 from "../../assets/cardimg2.png"
import cardimg3 from "../../assets/cardimg3.png"
import cardimg4 from "../../assets/cardimg4.png"

function LeaseManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const cardData = [
    {
      id: 1,
      title: "Active Leases",
      value: "2",
      icon: Building2,
      iconBgColor: "bg-purple-500",
      gradient: "from-yellow-100 via-orange-50 to-yellow-50",
      backgroundImage: cardimg1,
    },
    {
      id: 2,
      title: "Expiring Soon",
      value: "1",
      icon: Clock,
      iconBgColor: "bg-orange-500",
      gradient: "from-pink-100 via-purple-50 to-pink-50",
      backgroundImage: cardimg2,
    },
    {
      id: 3,
      title: "Expired",
      value: "1",
      icon: FileX,
      iconBgColor: "bg-blue-500",
      gradient: "from-green-100 via-teal-50 to-green-50",
      backgroundImage: cardimg3,
    },
    {
      id: 4,
      title: "Security Deposits",
      value: "₹1,56,000",
      icon: Shield,
      iconBgColor: "bg-purple-600",
      gradient: "from-purple-100 via-pink-50 to-purple-50",
      backgroundImage: cardimg4,
    },
  ]

  const leaseData = [
    {
      id: 1,
      name: "John Doe",
      unit: "Unit 101 • 2BHK",
      avatar: "/placeholder.svg?height=40&width=40",
      period: "Jun1, 2025 - May 31, 2025",
      duration: "1Yr",
      rent: "₹25,000",
      deposit: "₹50,000",
      status: "Active",
      expiry: "May 31, 2025",
      expiryNote: "Expired 69 Days Ago",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      unit: "Unit 205 • 1BHK",
      avatar: "/placeholder.svg?height=40&width=40",
      period: "Aug 15, 2025- Aug 14, 2025",
      duration: "1Yr",
      rent: "₹18,000",
      deposit: "₹36,000",
      status: "Active",
      expiry: "May 31, 2025",
      expiryNote: "6 Days Left",
    },
    {
      id: 3,
      name: "Mike Johnson",
      unit: "Unit 304 • 3BHK",
      avatar: "/placeholder.svg?height=40&width=40",
      period: "Jun1, 2025 - May 31, 2025",
      duration: "1Yr",
      rent: "₹35,000",
      deposit: "₹70,000",
      status: "Expired",
      expiry: "May 31, 2025",
      expiryNote: "Expired 130 Days Ago",
    },
  ]

  const filteredLeaseData = leaseData.filter((lease) => {
    const matchesSearch =
      lease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lease.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lease.rent.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || lease.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lease Management</h1>
            <p className="text-gray-600 mt-1">Manage Tenant Leases And Agreements</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card) => {
            const IconComponent = card.icon
            return (
              <Card key={card.id} className="relative overflow-hidden shadow-md border w-[298px] h-[127px]">
                {/* Background image with precise positioning */}
                <div
                  className="absolute inset-0 bg-no-repeat bg-[length:150%] opacity-35"
                  style={{
                    backgroundImage: `url('${card.backgroundImage}')`,
                    backgroundPosition: card.backgroundImage === cardimg1 ? "100px 10px" : card.backgroundImage === cardimg2 ? "-162px -130px" : card.backgroundImage === cardimg3 ? "-340px -110px" : card.backgroundImage === cardimg4 ? "-192px -150px" : "10px 10px",
                    transform: card.backgroundImage === cardimg2 ? "rotate(180deg)" : card.backgroundImage === cardimg3 ? "rotate(180deg)" : card.backgroundImage === cardimg4 ? "rotate(180deg)" : "none",
                    backgroundSize: card.backgroundImage === cardimg2 ? "110%" : card.backgroundImage === cardimg3 ? "185%" : card.backgroundImage === cardimg4 ? "140%" : "none",
                  }}
                ></div>


                {/* White overlay */}
                <div className="absolute inset-0 bg-white opacity-30"></div>

                {/* Card content with perfect vertical alignment */}
                <CardContent className="relative h-full flex flex-col justify-between p-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${card.iconBgColor} rounded-lg`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{card.title}</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{card.value}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md  items-center">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400 w-[19px] h-[19px] mt-2" />
            <Input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-[400px] h-[48px]  bg-white border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[140px] bg-purple-50 border-gray-300   rounded-lg h-10 text-purple-600 font-medium hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 ">
              <SelectValue>
                <span className="text-purple-600">
                  {statusFilter === "all" ? "All Status" : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 rounded-lg shadow-lg">
              <SelectItem value="all" className="text-gray-700 hover:bg-purple-50">
                All Status
              </SelectItem>
              <SelectItem value="active" className="text-gray-700 hover:bg-purple-50">
                Active
              </SelectItem>
              <SelectItem value="expired" className="text-gray-700 hover:bg-purple-50">
                Expired
              </SelectItem>
              <SelectItem value="terminated" className="text-gray-700 hover:bg-purple-50">
                Terminated
              </SelectItem>
              <SelectItem value="renewed" className="text-gray-700 hover:bg-purple-50">
                Renewed
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="shadow-lg border rounded-2xl overflow-hidden ">
          <CardContent className="p-6">
            {/* Header Section with separate shadow */}
            <div className="border shadow-md rounded-xl mb-4 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                  <colgroup>
                    <col className="w-[25%]" />
                    <col className="w-[20%]" />
                    <col className="w-[18%]" />
                    <col className="w-[12%]" />
                    <col className="w-[15%]" />
                    <col className="w-[10%]" />
                  </colgroup>
                  <thead>
                    <tr className="text-left ">
                      <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Tenant & Unit</th>
                      <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Leases Period</th>
                      <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Rent & Deposit</th>
                      <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Status</th>
                      <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Expiry</th>
                      <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Actions</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>

            {/* Body Section with separate shadow */}
            <div className="space-y-3">
              {filteredLeaseData.length > 0 ? (
                filteredLeaseData.map((lease) => (
                  <div
                    key={lease.id}
                    className="border shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="overflow-x-auto">
                      <table className="w-full table-fixed">
                        <colgroup>
                          <col className="w-[25%]" />
                          <col className="w-[20%]" />
                          <col className="w-[18%]" />
                          <col className="w-[12%]" />
                          <col className="w-[15%]" />
                          <col className="w-[10%]" />
                        </colgroup>
                        <tbody>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={lease.avatar || "/placeholder.svg"} alt={lease.name} />
                                  <AvatarFallback className="bg-gray-200 text-gray-600 text-sm font-medium">
                                    {lease.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-gray-900 text-sm">{lease.name}</p>
                                  <p className="text-xs text-gray-500">{lease.unit}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm text-gray-900">{lease.period}</p>
                              <p className="text-xs text-gray-500">Duration: {lease.duration}</p>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm text-gray-900 font-medium">{lease.rent}</p>
                              <p className="text-sm text-green-600 font-medium">Deposit: {lease.deposit}</p>
                            </td>
                            <td className="px-6 py-4">
                              <Badge
                                className={
                                  lease.status === "Active"
                                    ? "bg-blue-100 text-blue-700 border border-blue-200 font-medium px-3 py-1 rounded-lg"
                                    : "bg-red-100 text-red-700 border border-red-200 font-medium px-3 py-1 rounded-lg"
                                }
                              >
                                {lease.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm text-gray-900">{lease.expiry}</p>
                              <p className="text-xs text-gray-500">{lease.expiryNote}</p>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-2 h-8 w-8"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50 p-2 h-8 w-8"
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">No leases found matching your search criteria.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LeaseManagement
