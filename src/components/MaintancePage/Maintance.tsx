"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Search, ChevronDown, Eye, Edit, AlertCircle, Wrench, CheckCircle, Clock, DollarSign } from "lucide-react"
import imageUrl from "../../assets/cardimg1.png";
import imageUrl1 from "../../assets/cardimg2.png";
import imageUrl2 from "../../assets/cardimg3.png";

import person from "../../assets/person.png";

interface MaintenanceRequest {
  id: string
  title: string
  description: string
  category: string
  assignedTo: string
  assignedToAvatar?: string
  created: string
  scheduled?: string
  completed?: string
  estimatedCost: number
  actualCost?: number
  status: "Open" | "In Progress" | "Completed" | "Urgent"
  priority: "Low" | "Medium" | "High"
}

const mockRequests: MaintenanceRequest[] = [
  {
    id: "1",
    title: "Kitchen Sink Leakage",
    description:
      "The Kitchen Sink Is Leaking From The Bottom. Water Is Dripping Continuously And Needs Immediate Attention.",
    category: "A/C",
    assignedTo: "Mike Wilson - A/C",
    assignedToAvatar: person,
    created: "Feb 5, 2024",
    scheduled: "Feb 10, 2024",
    estimatedCost: 2500,
    status: "In Progress",
    priority: "High",
  },
  {
    id: "2",
    title: "Air Conditioner Not Working",
    description: "The AC In The Bedroom Is Not Cooling Properly. It Turns On But No Cool Air Is Coming Out.",
    category: "Hvac",
    assignedTo: "",
    assignedToAvatar: person,
    created: "Feb 7, 2024",
    scheduled: "Feb 15, 2024",
    estimatedCost: 3500,
    status: "Open",
    priority: "Medium",
  },
  {
    id: "3",
    title: "Electrical Outlet Not Working",
    description: "The Power Outlet In The Living Room Is Not Working. Multiple Devices Tested, No Power Output.",
    category: "Electrical",
    assignedTo: "Mike Johnson - Unit 304",
    assignedToAvatar: person,
    created: "Feb 9, 2024",
    estimatedCost: 1500,
    status: "Open",
    priority: "High",
  },
  {
    id: "4",
    title: "Bathroom Door Lock Repair",
    description: "The Bathroom Door Lock Is Stuck And Cannot Be Opened From Inside.",
    category: "Other",
    assignedTo: "Tom Brown - Handyman",
    assignedToAvatar: person,
    created: "Feb 6, 2024",
    completed: "Feb 6, 2024",
    estimatedCost: 750,
    actualCost: 750,
    status: "Completed",
    priority: "Low",
  },
]

export default function MaintenanceDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [priorityFilter, setPriorityFilter] = useState("All Priority")
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false)

  const stats = {
    open: mockRequests.filter((r) => r.status === "Open").length,
    inProgress: mockRequests.filter((r) => r.status === "In Progress").length,
    completed: mockRequests.filter((r) => r.status === "Completed").length,
    urgent: mockRequests.filter((r) => r.priority === "High" || r.status === "Urgent").length,
    totalCost: mockRequests.reduce((sum, r) => sum + r.estimatedCost, 0),
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "Urgent":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredRequests = mockRequests.filter((request) => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         request.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "All Status" || request.status === statusFilter
    const matchesPriority = priorityFilter === "All Priority" || request.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="p-6 max-w-7xl mx-auto font-['Afacad']">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maintenance Requests</h1>
          <p className="text-gray-600 mt-1">Track And Manage Property Maintenance</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">New Request</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card className="relative overflow-hidden border-purple-200 bg-white">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <CardContent className="p-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-200/80 backdrop-blur-sm rounded-lg">
                <Wrench className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-purple-700 font-medium">Open</p>
                <p className="text-2xl font-bold text-purple-900">{stats.open}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-yellow-200 bg-white">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${imageUrl1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <CardContent className="p-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-200/80 backdrop-blur-sm rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-yellow-700 font-medium">In Progress</p>
                <p className="text-2xl font-bold text-yellow-900">{stats.inProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-green-200 bg-white">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${imageUrl2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <CardContent className="p-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-200/80 backdrop-blur-sm rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-700 font-medium">Completed</p>
                <p className="text-2xl font-bold text-green-900">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-red-200 bg-white">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${imageUrl1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <CardContent className="p-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-200/80 backdrop-blur-sm rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-red-700 font-medium">Urgent</p>
                <p className="text-2xl font-bold text-red-900">{stats.urgent}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-blue-200 bg-white">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${imageUrl2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <CardContent className="p-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-200/80 backdrop-blur-sm rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-700 font-medium">Est. Cost</p>
                <p className="text-2xl font-bold text-blue-900">₹{stats.totalCost.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 relative">
          {/* Status Filter */}
          <div className="relative">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 bg-transparent"
              onClick={() => {
                setShowStatusDropdown(!showStatusDropdown)
                setShowPriorityDropdown(false)
              }}
            >
              {statusFilter} <ChevronDown className="w-4 h-4" />
            </Button>
            {showStatusDropdown && (
              <div className="absolute z-10 mt-1 w-160px bg-white shadow-lg rounded-md border border-gray-200">
                <div className="flex flex-col p-0 gap-0">
                  <button
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 w-full text-left border-b border-gray-200"
                    onClick={() => {
                      setStatusFilter("All Status")
                      setShowStatusDropdown(false)
                    }}
                  >
                    All Status
                  </button>
                  <button
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 w-full text-left border-b border-gray-200"
                    onClick={() => {
                      setStatusFilter("Open")
                      setShowStatusDropdown(false)
                    }}
                  >
                    Open
                  </button>
                  <button
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 w-full text-left border-b border-gray-200"
                    onClick={() => {
                      setStatusFilter("In Progress")
                      setShowStatusDropdown(false)
                    }}
                  >
                    In Progress
                  </button>
                  <button
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 w-full text-left border-b border-gray-200"
                    onClick={() => {
                      setStatusFilter("Completed")
                      setShowStatusDropdown(false)
                    }}
                  >
                    Completed
                  </button>
                  <button
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      setStatusFilter("Urgent")
                      setShowStatusDropdown(false)
                    }}
                  >
                    Urgent
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Priority Filter */}
          <div className="relative">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 bg-transparent"
              onClick={() => {
                setShowPriorityDropdown(!showPriorityDropdown)
                setShowStatusDropdown(false)
              }}
            >
              {priorityFilter} <ChevronDown className="w-4 h-4" />
            </Button>
            {showPriorityDropdown && (
              <div className="absolute z-10 mt-1 w-160px bg-white shadow-lg rounded-md border border-gray-200">
                <div className="flex flex-col p-0 gap-0">
                  <button
                    className="flex items-center bg- #B200FF px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 w-full text-left border-b border-gray-200"
                    onClick={() => {
                      setPriorityFilter("All Priority")
                      setShowPriorityDropdown(false)
                    }}
                  >
                    All Priority
                  </button>
                  <button
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 w-full text-left border-b border-gray-200"
                    onClick={() => {
                      setPriorityFilter("High")
                      setShowPriorityDropdown(false)
                    }}
                  >
                    High
                  </button>
                  <button
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 w-full text-left border-b border-gray-200"
                    onClick={() => {
                      setPriorityFilter("Medium")
                      setShowPriorityDropdown(false)
                    }}
                  >
                    Medium
                  </button>
                  <button
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      setPriorityFilter("Low")
                      setShowPriorityDropdown(false)
                    }}
                  >
                    Low
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

     {/* Request Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="w-full h-[477px] shadow-[0px_0px_15px_rgba(0,0,0,0.1)] rounded-[16px]">
            <CardContent className="p-4 h-full flex flex-col">
              {/* Header Section */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={request.assignedToAvatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gray-200">
                      {request.title
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-[22px] font-semibold leading-[29px] text-black">
                      {request.title}
                    </h3>
                    <p className="text-[14px] leading-[19px] text-[#7D7D7D]">
                      {request.assignedTo || "Unassigned"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0">
                  <Button size="sm" variant="outline" className="w-10 h-10 p-0 bg-[#0062FF] rounded-full">
                    <Edit className="w-6 h-6 text-white" />
                  </Button>
                  <Button size="sm" variant="outline" className="w-10 h-10 p-0 bg-[#EE2F2F] rounded-full">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </Button>
                </div>
              </div>

              {/* Description */}
              <p className="text-[14px] leading-[19px] text-[#7D7D7D] mb-6">
                {request.description}
              </p>

              {/* Details Card */}
              <div className="bg-white shadow-[0px_0px_13px_rgba(0,0,0,0.1)] rounded-[12px] p-4 mb-6 flex-1">
                <div className="space-y-4">
                  {/* Category */}
                  <div className="flex justify-between items-center">
                    <span className="text-[18px] leading-[24px] text-[#7D7D7D]">Category:</span>
                    <span className="text-[16px] font-bold leading-[21px] text-black">
                      {request.category}
                    </span>
                  </div>

                  {/* Assigned To */}
                  <div className="flex justify-between items-center">
                    <span className="text-[18px] leading-[24px] text-[#7D7D7D]">Assigned to:</span>
                    <span className="text-[16px] font-bold leading-[21px] text-black">
                      {request.assignedTo || "Unassigned"}
                    </span>
                  </div>

                  {/* Created */}
                  <div className="flex justify-between items-center">
                    <span className="text-[18px] leading-[24px] text-[#7D7D7D]">Created:</span>
                    <span className="text-[16px] font-bold leading-[21px] text-black">
                      {request.created}
                    </span>
                  </div>

                  {/* Scheduled */}
                  {request.scheduled && (
                    <div className="flex justify-between items-center">
                      <span className="text-[18px] leading-[24px] text-[#7D7D7D]">Scheduled:</span>
                      <span className="text-[16px] font-bold leading-[21px] text-black">
                        {request.scheduled}
                      </span>
                    </div>
                  )}

                  {/* Cost Section */}
                  <div className="bg-[#F4F7F9] rounded-[12px] p-3 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[18px] leading-[24px] text-black">
                        {request.actualCost ? "Actual Cost:" : "Estimated Cost:"}
                      </span>
                      <span className="text-[20px] font-bold leading-[27px] text-black">
                        ₹{(request.actualCost || request.estimatedCost).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Button */}
              {request.status === "Completed" ? (
                <Button className="w-full h-[45px] bg-[#1CAF19] hover:bg-[#1CAF19] text-white rounded-lg">
                  Completed
                </Button>
              ) : request.status === "In Progress" ? (
                <Button className="w-full h-[45px] bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
                  Assign
                </Button>
              ) : (
                <Button className="w-full h-[45px] bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
                  Assign
                </Button>
              )}

              {/* Status Message */}
              {request.status !== "Completed" && (
                <p className="text-[14px] leading-[19px] text-[#7D7D7D] mt-1 text-center">
                  {request.status === "In Progress"
                    ? '"Plumber scheduled to visit on Feb 10th"'
                    : '"Waiting for technician availability"'}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}