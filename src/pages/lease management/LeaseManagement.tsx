import { useEffect, useState } from "react"
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
import man from "../../assets/Ellipse 276.png"
import { Leaseviewform } from "../../components/LeaseManagement/Leaseviewform"
import { useDispatch, useSelector } from "react-redux"
import { selectLeasemanagement } from "../../features/Leasemanagement/reducer/selector"
import { getAllLeasemanagementThunk } from "../../features/Leasemanagement/reducer/thunks"

interface LeaseData {
  id: string
  name: string
  unit: string
  avatar: string
  period: string
  duration: string
  rent: string
  deposit: string
  status: string
  expiry: string
  expiryNote: string
  email?: string
  phone?: string
  address?: string
  
}

function LeaseManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showLeaseForm, setShowLeaseForm] = useState(false)
  const [selectedLease, setSelectedLease] = useState<LeaseData | null>(null)

  const dispatch = useDispatch<any>();
  const LeasemanagementData = useSelector(selectLeasemanagement)
  const Leases = LeasemanagementData?.Leases || []
  const statsData = LeasemanagementData || {}
  
  console.log(LeasemanagementData, "sowmiya")
  
  useEffect(() => {
    dispatch(getAllLeasemanagementThunk({}));
  }, [dispatch]);
  
  const handleViewLease = (lease: LeaseData) => {
    setSelectedLease(lease)
    setShowLeaseForm(true)
  }

  const handleCloseForm = () => {
    setShowLeaseForm(false)
    setSelectedLease(null)
  }

  // Helper function to format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  // Helper function to calculate days difference
  const getDaysDifference = (dateString: string) => {
    if (!dateString) return 0
    const targetDate = new Date(dateString)
    const currentDate = new Date()
    const timeDiff = targetDate.getTime() - currentDate.getTime()
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return daysDiff
  }

  // Helper function to get expiry note
  const getExpiryNote = (endDate: string) => {
    if (!endDate) return "N/A"
    const daysDiff = getDaysDifference(endDate)
    if (daysDiff < 0) {
      return `Expired ${Math.abs(daysDiff)} Days Ago`
    } else if (daysDiff === 0) {
      return "Expires Today"
    } else if (daysDiff <= 30) {
      return `Expires in ${daysDiff} Days`
    } else {
      return `${daysDiff} Days Remaining`
    }
  }

  // Transform backend data to frontend format
  const transformedLeaseData: LeaseData[] = Leases.filter((lease: any) => lease.tenantId && lease.tenantId !== null).map((lease: any) => {
    const tenant = lease.tenantId
    const unit = tenant?.unit
    const property = unit?.propertyId
    const personalInfo = tenant?.personal_information
    const leaseDuration = tenant?.lease_duration
    
    // Calculate lease duration properly
    let duration = "N/A"
    let period = "N/A"
    
    if (leaseDuration?.start_date && leaseDuration?.end_date) {
      const start = new Date(leaseDuration.start_date)
      const end = new Date(leaseDuration.end_date)
      
      // If both dates are same, assume it's a 1-year lease from that date
      if (start.getTime() === end.getTime()) {
        const actualEnd = new Date(start)
        actualEnd.setFullYear(actualEnd.getFullYear() + 1)
        period = `${formatDate(leaseDuration.start_date)} - ${formatDate(actualEnd.toISOString())}`
        duration = "1Yr"
      } else {
        period = `${formatDate(leaseDuration.start_date)} - ${formatDate(leaseDuration.end_date)}`
        const monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
        duration = monthsDiff >= 12 ? `${Math.floor(monthsDiff / 12)}Yr` : `${monthsDiff}Mth`
      }
    }

    // Format deposit amount properly
    let formattedDeposit = "N/A"
    if (unit?.unit_deposit) {
      const depositStr = unit.unit_deposit.toString().replace(/,/g, '')
      const depositNum = parseInt(depositStr)
      formattedDeposit = `₹${depositNum.toLocaleString('en-IN')}`
    }
    
   
return {
  id: lease._id || lease.uuid,
  name: personalInfo?.full_name || "No Name",
  unit: `${unit?.unit_name || "N/A"} • ${unit?.unit_sqft ? unit.unit_sqft + ' sqft' : 'Commercial'}`,
  avatar: man,
  period: period,
  duration: duration,
  rent: unit?.unit_rent ? `₹${parseInt(unit.unit_rent).toLocaleString('en-IN')}` : "N/A",
  deposit: formattedDeposit,
  status: lease.status === "active" ? "Active" : lease.status.charAt(0).toUpperCase() + lease.status.slice(1),
  expiry: leaseDuration?.end_date ? 
    (leaseDuration.start_date === leaseDuration.end_date ? 
      formatDate(new Date(new Date(leaseDuration.start_date).setFullYear(new Date(leaseDuration.start_date).getFullYear() + 1)).toISOString()) : 
      formatDate(leaseDuration.end_date)) : "N/A",
  expiryNote: leaseDuration?.end_date ? 
    (leaseDuration.start_date === leaseDuration.end_date ? 
      getExpiryNote(new Date(new Date(leaseDuration.start_date).setFullYear(new Date(leaseDuration.start_date).getFullYear() + 1)).toISOString()) : 
      getExpiryNote(leaseDuration.end_date)) : "N/A",
  email: personalInfo?.email,
  phone: personalInfo?.phone,
  address: personalInfo?.address,

maintenanceCharge: unit?.maintenance_charge ? `₹${parseInt(unit.maintenance_charge).toLocaleString('en-IN')}` : "Not Available",
emergencyContact: {
  name: tenant?.emergency_contact?.name || "",        
  phone: tenant?.emergency_contact?.phone || "",      
  relation: tenant?.emergency_contact?.relation || "" 
},
  
 
bankDetails: {
  accountNumber: tenant?.bank_details?.account_number || "Not Available",
  bankName: tenant?.bank_details?.bank_name || "Not Available", 
  ifscCode: tenant?.bank_details?.ifsc_code || "Not Available",
  accountHolderName: tenant?.bank_details?.account_holder_name || personalInfo?.full_name || "Not Available"
}
}
  })

  // Calculate statistics from the transformed data
  const activeLeasesCount = transformedLeaseData.filter(lease => lease.status === 'Active').length
  const totalDeposits = transformedLeaseData.reduce((total, lease) => {
    const deposit = lease.deposit.replace(/[₹,]/g, '')
    return total + (parseInt(deposit) || 0)
  }, 0)

  const cardData = [
    {
      id: 1,
      title: "Active Leases",
      value: (statsData.activeLeases !== undefined ? statsData.activeLeases : activeLeasesCount).toString(),
      icon: Building2,
      iconBgColor: "bg-purple-500",
      gradient: "from-yellow-100 via-orange-50 to-yellow-50",
      backgroundImage: cardimg1,
    },
    {
      id: 2,
      title: "Expiring Soon",
      value: (statsData.expiringSoonThisMonth || 0).toString(),
      icon: Clock,
      iconBgColor: "bg-orange-500",
      gradient: "from-pink-100 via-purple-50 to-pink-50",
      backgroundImage: cardimg2,
    },
    {
      id: 3,
      title: "Expired",
      value: (statsData.expiredLeases || 0).toString(),
      icon: FileX,
      iconBgColor: "bg-blue-500",
      gradient: "from-green-100 via-teal-50 to-green-50",
      backgroundImage: cardimg3,
    },
    {
      id: 4,
      title: "Security Deposits",
      value: statsData.totalDepositAmount 
        ? `₹${statsData.totalDepositAmount.toLocaleString('en-IN')}`
        : `₹${totalDeposits.toLocaleString('en-IN')}`,
      icon: Shield,
      iconBgColor: "bg-purple-600",
      gradient: "from-purple-100 via-pink-50 to-purple-50",
      backgroundImage: cardimg4,
    },
  ]

  const filteredLeaseData = transformedLeaseData.filter((lease) => {
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
                <CardContent className="relative h-full flex flex-col justify-between pb-5">
                  <div className="flex items-center gap-3 ">
                    <div className={`p-2  ${card.iconBgColor} rounded-lg`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[20px] font-medium text-gray-700">{card.title}</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 pt-4">{card.value}</div>
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
              className="pl-10 w-[400px] h-[48px]  bg-[#B200FF0D]/5 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[140px] bg-[#B200FF1A]/5 border-gray-300   rounded-lg h-10 text-purple-600 font-medium hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 ">
              <SelectValue>
                <span className="text-purple-600">
                  {statusFilter === "all" ? "All Status" : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 rounded-lg shadow-lg">
              <SelectItem value="all" className="text-gray-700 hover:bg-[#B200FF1A]/5">
                All Status
              </SelectItem>
              <SelectItem value="active" className="text-gray-700 hover:bg-[#B200FF1A]/5">
                Active
              </SelectItem>
              <SelectItem value="expired" className="text-gray-700 hover:bg-[#B200FF1A]/5">
                Expired
              </SelectItem>
              <SelectItem value="terminated" className="text-gray-700 hover:bg-[#B200FF1A]/5">
                Terminated
              </SelectItem>
              <SelectItem value="renewed" className="text-gray-700 hover:bg-[#B200FF1A]/5">
                Renewed
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="shadow-lg border rounded-2xl overflow-hidden ">
          <CardContent className="pl-3 pr-3 ">
            {/* Header Section with separate shadow */}
           <div className="border shadow-md rounded-xl mb-[30px] overflow-hidden ">

              <div className="overflow-x-auto ">
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
            <div className="space-y-6 ">
              {filteredLeaseData.length > 0 ? (
                filteredLeaseData.map((lease) => (
                  <div
                    key={lease.id}
                    className="border shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow "
                  >
                    <div className="overflow-x-auto ">
                      <table className="w-full table-fixed ">
                        <colgroup>
                          <col className="w-[25%]" />
                          <col className="w-[20%]" />
                          <col className="w-[18%]" />
                          <col className="w-[12%]" />
                          <col className="w-[15%]" />
                          <col className="w-[10%]" />
                        </colgroup>
                        <tbody>
                          <tr className="hover:bg-gray-50 transition-colors ">
                            <td className="px-6 py-4  ">
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
                                    ? "bg-[#0D35D41A]/10 text-blue-700 border border-blue-200 font-medium px-3 py-1 rounded-lg "
                                    : "bg-[#EE2F2F1A]/10 text-red-700 border border-red-200 font-medium px-3 py-1 rounded-lg"
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
                                  onClick={() => handleViewLease(lease)}
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
     {showLeaseForm && selectedLease && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 backdrop-blur-md" onClick={handleCloseForm} />

          {/* Modal content */}
          <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
            <Leaseviewform leaseData={selectedLease} onClose={handleCloseForm} />
          </div>
        </div>
      )}
    </div>
  )
}

export default LeaseManagement