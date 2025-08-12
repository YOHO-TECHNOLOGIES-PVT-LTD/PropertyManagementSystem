"use client"

import { useState } from "react"

import {
  Bell,
  Calendar,
  AlertTriangle,
  Search,
  ChevronDown,
  Check,
  X,
  MoreHorizontal,
  Home,
  DollarSign,
  FileText,
  Wrench,
  BarChart3,
  Badge,
} from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"

interface NotificationItem {
  id: string
  type: "rent" | "payment" | "lease" | "maintenance" | "report" | "reminder"
  title: string
  description: string
  timestamp: string
  priority: "High" | "Medium" | "Low"
  isRead: boolean
}

const notifications: NotificationItem[] = [
  {
    id: "1",
    type: "rent",
    title: "Rent Payment Overdue",
    description: "Mike Johnson (Unit 304) has an overdue rent payment of $3,500. Payment was due 5 days ago.",
    timestamp: "5/9/2024",
    priority: "High",
    isRead: false,
  },
  {
    id: "2",
    type: "payment",
    title: "Payment Received",
    description: "John Doe (Unit 101) has successfully paid rent of $2,500 via UPI.",
    timestamp: "5/9/2024",
    priority: "Medium",
    isRead: false,
  },
  {
    id: "3",
    type: "lease",
    title: "Lease Expiring Soon",
    description: "Sarah Wilson (Unit 205) will expire in 30 days. Consider sending renewal notice.",
    timestamp: "5/9/2024",
    priority: "Medium",
    isRead: false,
  },
  {
    id: "4",
    type: "maintenance",
    title: "New Maintenance Request",
    description: "Urgent electrical issue reported in Unit 506. Power outlet not working in living room.",
    timestamp: "5/9/2024",
    priority: "High",
    isRead: false,
  },
  {
    id: "5",
    type: "report",
    title: "Monthly Report Generated",
    description: "Your January 2024 financial report is ready for download.",
    timestamp: "5/8/2024",
    priority: "Low",
    isRead: true,
  },
  {
    id: "6",
    type: "reminder",
    title: "Rent Due Reminder",
    description: "Sarah Wilson (Unit 205) has rent due tomorrow ($4,000). Send reminder notification.",
    timestamp: "5/8/2024",
    priority: "Medium",
    isRead: true,
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "rent":
      return <Home className="h-5 w-5" />
    case "payment":
      return <DollarSign className="h-5 w-5" />
    case "lease":
      return <FileText className="h-5 w-5" />
    case "maintenance":
      return <Wrench className="h-5 w-5" />
    case "report":
      return <BarChart3 className="h-5 w-5" />
    case "reminder":
      return <Bell className="h-5 w-5" />
    default:
      return <Bell className="h-5 w-5" />
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

const getNotificationBackground = (priority: string, isRead: boolean) => {
  if (isRead) return "bg-white"

  switch (priority) {
    case "High":
      return "bg-red-50"
    case "Medium":
      return "bg-yellow-50"
    case "Low":
      return "bg-green-50"
    default:
      return "bg-white"
  }
}

function Notifications() {
  const [searchQuery, setSearchQuery] = useState("")

  const totalNotifications = notifications.length
  const unreadNotifications = notifications.filter((n) => !n.isRead).length
  const highPriorityNotifications = notifications.filter((n) => n.priority === "High").length
  const todayNotifications = 0 // Based on the image showing 0

  return (
    <div className="w-6xl mx-auto ">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-600 mt-1">Stay Updated With Important Alerts And Messages</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">Mark All Read</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 p-6 border-b border-gray-200">
        <Card className="bg-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-200 rounded-lg">
                <Bell className="h-5 w-5 text-yellow-700" />
              </div>
              <div>
                <p className="text-sm text-yellow-700 font-medium">Total</p>
                <p className="text-2xl font-bold text-yellow-900">{totalNotifications}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-pink-100 border-pink-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-200 rounded-lg">
                <Bell className="h-5 w-5 text-pink-700" />
              </div>
              <div>
                <p className="text-sm text-pink-700 font-medium">Unread</p>
                <p className="text-2xl font-bold text-pink-900">{unreadNotifications}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-green-700 font-medium">High Priority</p>
                <p className="text-2xl font-bold text-green-900">{highPriorityNotifications}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-200 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-700" />
              </div>
              <div>
                <p className="text-sm text-purple-700 font-medium">Today</p>
                <p className="text-2xl font-bold text-purple-900">{todayNotifications}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 p-6 border-b border-gray-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e:any) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 bg-transparent">
              All Types
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>All Types</DropdownMenuItem>
            <DropdownMenuItem>High Priority</DropdownMenuItem>
            <DropdownMenuItem>Medium Priority</DropdownMenuItem>
            <DropdownMenuItem>Low Priority</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 bg-transparent">
              All
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>All</DropdownMenuItem>
            <DropdownMenuItem>Read</DropdownMenuItem>
            <DropdownMenuItem>Unread</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="link" className="text-blue-600 hover:text-blue-800">
          View All
        </Button>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-gray-200">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-6 ${getNotificationBackground(notification.priority, notification.isRead)}`}
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                {getNotificationIcon(notification.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{notification.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{notification.description}</p>
                    <p className="text-xs text-gray-500">{notification.timestamp}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                      {notification.priority}
                    </Badge>

                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notifications
