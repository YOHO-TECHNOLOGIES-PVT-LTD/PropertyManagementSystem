import { useState } from "react"
import {
  Bell,
  ChevronDown,
  Home,
  FileText,
  BarChart3,
  Building2,
} from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import cancelicon from "../../assets/close-circle.png"
import cardimg1 from "../../assets/cardimg1.png"
import cardimg2 from "../../assets/cardimg2.png"
import cardimg3 from "../../assets/cardimg3.png"
import cardimg4 from "../../assets/cardimg4.png"
import  {FONTS } from '../../constants/ui constants'

interface NotificationItem {
  id: string
  type: "rent" | "lease" | "report" | "reminder"
  title: string
  description: string
  timestamp: string
  isRead: boolean
}

const notifications: NotificationItem[] = [
 {
    id: "1",
    type: "rent",
    title: "Rent Payment Overdue",
    description: "Mike Johnson (Unit 304) has an overdue rent payment of $3,500. Payment was due 5 days ago.",
    timestamp: "5/9/2024",
    isRead: false,
  },
  {
    id: "2",
    type: "rent",
    title: "Payment Received",
    description: "John Doe (Unit 101) has successfully paid rent of $2,500 via UPI.",
    timestamp: "5/9/2024",
    isRead: false,
  },
  {
    id: "3",
    type: "lease",
    title: "Lease Expiring Soon",
    description: "Sarah Wilson (Unit 205) will expire in 30 days. Consider sending renewal notice.",
    timestamp: "5/9/2024",
    isRead: false,
  },
  {
    id: "4",
    type: "rent",
    title: "New Maintenance Request",
    description: "Urgent electrical issue reported in Unit 506. Power outlet not working in living room.",
    timestamp: "5/9/2024",
    isRead: false,
  },
  {
    id: "5",
    type: "report",
    title: "Monthly Report Generated",
    description: "Your January 2024 financial report is ready for download.",
    timestamp: "5/8/2024",
    isRead: true,
  },
  {
    id: "6",
    type: "reminder",
    title: "Rent Due Reminder",
    description: "Sarah Wilson (Unit 205) has rent due tomorrow ($4,000). Send reminder notification.",
    timestamp: "5/8/2024",
    isRead: true,
  },
    {
    id: "7",
    type: "rent",
    title: "New Maintenance Request",
    description: "Urgent electrical issue reported in Unit 506. Power outlet not working in living room.",
    timestamp: "5/9/2024",
    isRead: false,
  },
    {
    id: "8",
    type: "rent",
    title: "New Maintenance Request",
    description: "Urgent electrical issue reported in Unit 506. Power outlet not working in living room.",
    timestamp: "5/9/2024",
    isRead: true,
  },
    {
    id: "9",
    type: "rent",
    title: "New Maintenance Request",
    description: "Urgent electrical issue reported in Unit 506. Power outlet not working in living room.",
    timestamp: "5/9/2024",
    isRead: false,
  },
   {
    id: "10",
    type: "reminder",
    title: "Rent Due Reminder",
    description: "Sarah Wilson (Unit 205) has rent due tomorrow ($4,000). Send reminder notification.",
    timestamp: "5/8/2024",
    isRead: true,
  },
   {
    id: "11",
    type: "reminder",
    title: "Rent Due Reminder",
    description: "Sarah Wilson (Unit 205) has rent due tomorrow ($4,000). Send reminder notification.",
    timestamp: "5/8/2024",
    isRead: true,
  },
   {
    id: "12",
    type: "rent",
    title: "Rent Payment Overdue",
    description: "Mike Johnson (Unit 304) has an overdue rent payment of $3,500. Payment was due 5 days ago.",
    timestamp: "5/9/2024",
    isRead: false,
  },
   {
    id: "13",
    type: "rent",
    title: "Rent Payment Overdue",
    description: "Mike Johnson (Unit 304) has an overdue rent payment of $3,500. Payment was due 5 days ago.",
    timestamp: "5/9/2024",
    isRead: false,
  },
]

const cardData = [
  {
    id: 1,
    title: "Total",
    value: "6",
    icon: Building2,
    iconBgColor: "bg-purple-300",
    backgroundImage: cardimg1,
  },
  {
    id: 2,
    title: "UnRead",
    value: "4",
    icon: Building2,
    iconBgColor: "bg-orange-300",
    backgroundImage: cardimg2,
  },
  {
    id: 3,
    title: "Rent Reminders",
    value: "3",
    icon: Building2,
    iconBgColor: "bg-blue-300",
    backgroundImage: cardimg3,
  },
  {
    id: 4,
    title: "Today",
    value: "0",
    icon: Building2,
    iconBgColor: "bg-pink-300",
    backgroundImage: cardimg4,
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "rent":
      return <Home className="h-5 w-5" />
    case "lease":
      return <FileText className="h-5 w-5" />
    case "report":
      return <BarChart3 className="h-5 w-5" />
    case "reminder":
      return <Bell className="h-5 w-5" />
    default:
      return <Bell className="h-5 w-5" />
  }
}

function Notifications() {
  const [readFilter, setReadFilter] = useState<"all" | "read" | "unread">("all")
  const [typeFilter, setTypeFilter] = useState<"all" | "rent" | "lease">("all")
  const [notificationList, setNotificationList] = useState<NotificationItem[]>(notifications)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter logic
  const filteredNotifications = notificationList.filter(notification => {
    const readMatch =
      readFilter === "all" ||
      (readFilter === "read" && notification.isRead) ||
      (readFilter === "unread" && !notification.isRead)

    const typeMatch =
      typeFilter === "all" ||
      notification.type === typeFilter

    return readMatch && typeMatch
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage)
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const markAsRead = (id: string) => {
    setNotificationList(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotificationList(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotificationList(prev =>
      prev.filter(notification => notification.id !== id)
    )
  }

  const handleNotificationClick = (notification: NotificationItem) => {
    if (!notification.isRead) {
      markAsRead(notification.id)
    }
  }

  const updatedCardData = cardData.map(card => {
    if (card.title === "Total") {
      return { ...card, value: notificationList.length.toString() }
    }
    if (card.title === "UnRead") {
      return { ...card, value: notificationList.filter(n => !n.isRead).length.toString() }
    }
    if (card.title === "Rent Reminders") {
      return { ...card, value: notificationList.filter(n => n.type === "rent").length.toString() }
    }
    return card
  })

  return (
    <div className="w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div>
          <h1 className="text-2xl -ml-5 font-semibold text-gray-900"
          style={{...FONTS.headers}}
          >Notifications</h1>
          <p className="text-sm text-gray-600 -ml-5 mt-1">Stay Updated With Important Alerts And Messages</p>
        </div>
        <Button
          className="bg-purple-600 hover:bg-purple-700 -mr-9 text-white"
          onClick={markAllAsRead}
        >
          Mark All Read
        </Button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {updatedCardData.map((card) => {
          const IconComponent = card.icon
          return (
            <Card key={card.id} className="relative overflow-hidden shadow-md border w-[285px] h-[127px]">
              <div
                className="absolute inset-0 bg-no-repeat bg-[length:150%] opacity-35"
                style={{
                  backgroundImage: `url('${card.backgroundImage}')`,
                  backgroundPosition:
                    card.backgroundImage === cardimg1 ? "100px 10px" :
                      card.backgroundImage === cardimg2 ? "-162px -130px" :
                        card.backgroundImage === cardimg3 ? "-340px -110px" :
                          card.backgroundImage === cardimg4 ? "-192px -150px" : "10px 10px",
                  transform:
                    card.backgroundImage === cardimg2 ? "rotate(180deg)" :
                      card.backgroundImage === cardimg3 ? "rotate(180deg)" :
                        card.backgroundImage === cardimg4 ? "rotate(180deg)" : "none",
                  backgroundSize:
                    card.backgroundImage === cardimg2 ? "110%" :
                      card.backgroundImage === cardimg3 ? "185%" :
                        card.backgroundImage === cardimg4 ? "140%" : "none",
                }}
              ></div>

              <div className="absolute inset-0 bg-white opacity-30"></div>

              <CardContent className="relative h-full flex flex-col justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-2 ${card.iconBgColor} rounded-lg`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700" style={{...FONTS.card_headers}}>{card.title}</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{card.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col p-6 border-b border-gray-200">
        <div className="flex items-center justify-end gap-2">
          {/* Type Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-[#B200FF1A]">
                {typeFilter === "all" ? "All Types" : typeFilter === "rent" ? "Rent Reminders" : "Lease Expiry"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-transparent border-none shadow-none p-0 w-48" align="start">
              <div className="flex flex-col gap-2 bg-white p-2">
                <DropdownMenuItem 
                className="rounded-xl border  px-4 py-2 cursor-pointer hover:bg-[#B200FF] hover:text-[white]"
                onClick={() => { setTypeFilter("all"); setCurrentPage(1) }}>All Types</DropdownMenuItem>
                <DropdownMenuItem 
                className="rounded-xl border  px-4 py-2 cursor-pointer hover:bg-[#B200FF] hover:text-[white]"
                onClick={() => { setTypeFilter("rent"); setCurrentPage(1) }}>Rent Reminders</DropdownMenuItem>
                <DropdownMenuItem 
                className="rounded-xl border  px-4 py-2 cursor-pointer hover:bg-[#B200FF] hover:text-[white]"
                onClick={() => { setTypeFilter("lease"); setCurrentPage(1) }}>Lease Expiry</DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Read Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-[#B200FF1A]">
                {readFilter === "all" ? "All" : readFilter === "read" ? "Read" : "Unread"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white  border-none shadow-none p-0 w-48" align="start">
              <div className="flex flex-col gap-2  bg-transparent p-2">
                <DropdownMenuItem 
                className="rounded-xl border border-gray-200 px-4 py-2 cursor-pointer hover:bg-[#B200FF] hover:text-[white]"
                onClick={() => { setReadFilter("all"); setCurrentPage(1) }}>All</DropdownMenuItem>
                <DropdownMenuItem
                className="rounded-xl border border-gray-200 px-4 py-2 cursor-pointer hover:bg-[#B200FF] hover:text-[white]"
                onClick={() => { setReadFilter("read"); setCurrentPage(1) }}>Read</DropdownMenuItem>
                <DropdownMenuItem 
                className="rounded-xl border border-gray-200 px-4 py-2 cursor-pointer hover:bg-[#B200FF] hover:text-[white]"
                onClick={() => { setReadFilter("unread"); setCurrentPage(1) }}>Unread</DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-gray-200">
       {paginatedNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-6 rounded-lg mb-4 transition-all duration-200 ${
              !notification.isRead
                ? "border-2  bg-blue-50 cursor-pointer hover:bg-blue-100 shadow-md"
                : "border border-gray-200 bg-white hover:bg-blue-100 opacity-70"
            }`}
            onClick={() => handleNotificationClick(notification)}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-2 rounded-lg border shadow-sm ${
                  !notification.isRead ? "bg-blue-100 border-blue-300" : "bg-gray-50 border-gray-200"
                }`}
              >
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold ${!notification.isRead ? "text-gray-900" : "text-gray-500"}`}>
                        {notification.title}
                      </h3>
                      {!notification.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>}
                    </div>
                    <p className={`text-sm mb-2 ${!notification.isRead ? "text-gray-700" : "text-gray-500"}`}>
                      {notification.description}
                    </p>
                    <p className={`text-xs ${!notification.isRead ? "text-gray-600" : "text-gray-400"}`}>
                      {notification.timestamp}
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={(e) => {
                        e.stopPropagation() 
                        deleteNotification(notification.id)
                      }}
                    >
                      <img src={cancelicon} className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-4">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          Previous
        </Button>
        <span className="px-3 py-2">Page {currentPage} of {totalPages}</span>
        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default Notifications
