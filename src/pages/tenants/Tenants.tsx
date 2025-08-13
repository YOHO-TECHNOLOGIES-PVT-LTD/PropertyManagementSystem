"use client"

import { useState } from "react"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Search, Phone, Mail, DollarSign, Trash2 } from "lucide-react"
import AddTenantForm, { type TenantFormData } from "../../components/tenants/create-tenant-form"
import EditTenantForm from "../../components/tenants/edit-tenant-form"
import ViewTenantModal, { type Tenant } from "../../components/tenants//view-tenant-modal"
import trash from '../../assets/properties/trash.png'
import edit from '../../assets/properties/edit.png'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog"
import cardimg1 from "../../assets/cardimg1.png"
import cardimg2 from "../../assets/cardimg2.png"
import cardimg3 from "../../assets/cardimg3.png"
import cardimg4 from "../../assets/cardimg4.png"


export default function Tenants() {
  const [showForm, setShowForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("All Types")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [tenantToDelete, setTenantToDelete] = useState<Tenant | null>(null)

  const [tenants, setTenants] = useState<Tenant[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@gmail.com",
      phone: "+91 9876543210",
      rent: "₹25,000",
      deposit: "₹50,000",
      leaseStart: "Jun 1, 2025",
      leaseEnd: "May 31, 2025",
      status: "Paid",
      daysRemaining: 0,
      emergency: "Jane Doe",
      emergencyPhone: "+91 9876543211",
      avatar: "JD",
      fullData: {
        fullName: "John Doe",
        emailAddress: "john.doe@gmail.com",
        address: "123 Main Street, City",
        propertytype: "Apartment",
        propertyName: "Sunset Apartments",
        tenantType: "Individual",
        phoneNumber: "+91 9876543210",
        unit: "301",
        propertyInformation: "Modern 2BHK apartment",
        rent: "25000",
        securityDeposit: "50000",
        teamSpecialized: "Property Management Team A",
        leaseStartDate: "2025-06-01",
        leaseEndDate: "2025-05-31",
        contactName: "Jane Doe",
        contactPhone: "+91 9876543211",
        relationship: "Spouse",
        bankName: "State Bank of India",
        accountNumber: "1234567890",
        bankBranch: "Main Branch",
        ifscNumber: "SBIN0001234",
      },
    },
    {
      id: "2",
      name: "Sarah Wilson",
      email: "sarah.wilson@gmail.com",
      phone: "+91 9876543212",
      rent: "₹18,000",
      deposit: "₹36,000",
      leaseStart: "Jun 15, 2025",
      leaseEnd: "Aug 14, 2025",
      status: "Pending",
      daysRemaining: 6,
      emergency: "Robert Wilson",
      emergencyPhone: "+91 9876543213",
      avatar: "SW",
      fullData: {
        fullName: "Sarah Wilson",
        emailAddress: "sarah.wilson@gmail.com",
        address: "456 Oak Avenue, City",
        propertytype: "House",
        propertyName: "Green Valley Homes",
        tenantType: "Individual",
        phoneNumber: "+91 9876543212",
        unit: "15",
        propertyInformation: "Cozy 1BHK house",
        rent: "18000",
        securityDeposit: "36000",
        teamSpecialized: "Property Management Team B",
        leaseStartDate: "2025-06-15",
        leaseEndDate: "2025-08-14",
        contactName: "Robert Wilson",
        contactPhone: "+91 9876543213",
        relationship: "Father",
        bankName: "HDFC Bank",
        accountNumber: "9876543210",
        bankBranch: "City Branch",
        ifscNumber: "HDFC0001234",
      },
    },
  ])

  const stats = [
    {
      label: "Total Tenants",
      value: tenants.length.toString(),
      bgColor: "bg-orange-100",
      circleColor1: "bg-orange-200",
      circleColor2: "bg-orange-300",
      backgroundimage: cardimg1,
    },
    {
      label: "Paid this Month",
      value: tenants.filter((t) => t.status === "Paid").length.toString(),
      bgColor: "bg-purple-100",
      circleColor1: "bg-purple-200",
      circleColor2: "bg-purple-300",
      backgroundimage: cardimg2,
    },
    {
      label: "Pending Payments",
      value: tenants.filter((t) => t.status === "Pending").length.toString(),
      bgColor: "bg-green-100",
      circleColor1: "bg-green-200",
      circleColor2: "bg-green-300",
      backgroundimage: cardimg3,
    },
    {
      label: "Overdue",
      value: tenants.filter((t) => t.status === "Overdue").length.toString(),
      bgColor: "bg-pink-100",
      circleColor1: "bg-pink-200",
      circleColor2: "bg-pink-300",
      backgroundimage: cardimg4,
    },
  ]

  const handleAddTenant = (formData: TenantFormData) => {
    const newTenant: Tenant = {
      id: (tenants.length + 1).toString(),
      name: formData.fullName,
      email: formData.emailAddress,
      phone: formData.phoneNumber,
      rent: formData.rent ? `₹${Number.parseInt(formData.rent).toLocaleString()}` : "₹0",
      deposit: formData.securityDeposit ? `₹${Number.parseInt(formData.securityDeposit).toLocaleString()}` : "₹0",
      leaseStart: formData.leaseStartDate
        ? new Date(formData.leaseStartDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "",
      leaseEnd: formData.leaseEndDate
        ? new Date(formData.leaseEndDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "",
      status: "Pending",
      daysRemaining: formData.leaseEndDate
        ? Math.ceil((new Date(formData.leaseEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        : 0,
      emergency: formData.contactName,
      emergencyPhone: formData.contactPhone,
      avatar: formData.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
      fullData: { ...formData },
    }

    setTenants((prev) => [...prev, newTenant])
    setShowForm(false)
  }

  const handleEditTenant = (tenant: Tenant) => {
    setSelectedTenant(tenant)
    setShowEditForm(true)
  }

  const handleUpdateTenant = (id: string, formData: TenantFormData) => {
    const updatedTenant: Tenant = {
      id,
      name: formData.fullName,
      email: formData.emailAddress,
      phone: formData.phoneNumber,
      rent: formData.rent ? `₹${Number.parseInt(formData.rent).toLocaleString()}` : "₹0",
      deposit: formData.securityDeposit ? `₹${Number.parseInt(formData.securityDeposit).toLocaleString()}` : "₹0",
      leaseStart: formData.leaseStartDate
        ? new Date(formData.leaseStartDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "",
      leaseEnd: formData.leaseEndDate
        ? new Date(formData.leaseEndDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "",
      status: "Pending",
      daysRemaining: formData.leaseEndDate
        ? Math.ceil((new Date(formData.leaseEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        : 0,
      emergency: formData.contactName,
      emergencyPhone: formData.contactPhone,
      avatar: formData.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
      fullData: { ...formData },
    }

    setTenants((prev) => prev.map((tenant) => (tenant.id === id ? updatedTenant : tenant)))
    setShowEditForm(false)
    setSelectedTenant(null)
  }

  const handleDeleteClick = (tenant: Tenant) => {
  setTenantToDelete(tenant)
  setIsDeleteModalOpen(true)
}

const handleConfirmDelete = () => {
  if (tenantToDelete) {
    setTenants((prev) => prev.filter((tenant) => tenant.id !== tenantToDelete.id))
    setIsDeleteModalOpen(false)
    setTenantToDelete(null)
  }
}

  const handleViewTenant = (tenant: Tenant) => {
    setSelectedTenant(tenant)
    setShowViewModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Tenants</h1>
            <p className="text-gray-600">Manage your property tenants</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="bg-[#b200ff] text-white px-6 py-2">
            Add Tenant
          </Button>
        </div>

        <AddTenantForm isOpen={showForm} onClose={() => setShowForm(false)} onSubmit={handleAddTenant} />

        <EditTenantForm
          isOpen={showEditForm}
          tenant={selectedTenant}
          onClose={() => {
            setShowEditForm(false)
            setSelectedTenant(null)
          }}
          onSubmit={handleUpdateTenant}
        />

        <ViewTenantModal isOpen={showViewModal} tenant={selectedTenant} onClose={() => setShowViewModal(false)} />

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.bgColor} rounded-xl p-6 relative overflow-hidden`}>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </div>
              <div
              
                                className="absolute inset-0 bg-no-repeat bg-[length:150%] opacity-35"
                                style={{
                                  backgroundImage: `url('${stat.backgroundimage}')`,
                                  backgroundPosition: stat.backgroundimage === cardimg1 ? "100px 10px" : stat.backgroundimage === cardimg2 ? "-162px -130px" : stat.backgroundimage === cardimg3 ? "-340px -110px" : stat.backgroundimage === cardimg4 ? "-192px -150px" : "10px 10px",
                                  transform: stat.backgroundimage === cardimg2 ? "rotate(180deg)" : stat.backgroundimage === cardimg3 ? "rotate(180deg)" : stat.backgroundimage === cardimg4 ? "rotate(180deg)" : "none",
                                  backgroundSize: stat.backgroundimage === cardimg2 ? "110%" : stat.backgroundimage === cardimg3 ? "185%" : stat.backgroundimage === cardimg4 ? "140%" : "none",
                                }}
                              ></div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 justify-between mb-6">
          <div className="relative flex">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-60 border-gray-200"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48 border-gray-200 bg-white">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="All Types">All Types</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tenant Cards */}
        <div className="grid grid-cols-2 gap-6 ">
          {tenants.map((tenant) => (
            <div key={tenant.id} className=" bg-white border border-gray-100 transition-shadow duration-200 shadow-[0_0_6px_rgba(0,0,0,0.1)] p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                    {tenant.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold">{tenant.name}</h3>
                    <p className="text-gray-500 text-xs">Unit 30{tenant.id}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div
                    className="w-8 h-8 bg-[#0062ff] rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
                    onClick={() => handleEditTenant(tenant)}
                  >
                    <img src={edit} className="w-4 h-4 text-white" />
                  </div>
                  <div
                    className="w-8 h-8 bg-[#ee2f2f] rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors"
                    onClick={() => handleDeleteClick(tenant)}
                  >
                    <img src={trash} className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mb-4">
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Mail className="w-3 h-3" />
                    {tenant.email}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Phone className="w-3 h-3" />
                    {tenant.phone}
                  </div>
                </div>

                <div>
                  <span
                    className={`px-4 py-2 rounded text-xs font-medium ${
                      tenant.status === "Paid"
                        ? "bg-green-100 text-green-600 border border-green-600"
                        : tenant.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600 border border-yellow-600"
                          : "bg-red-100 text-red-600"
                    }`}
                  >
                    {tenant.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
                      <DollarSign className="w-3 h-3 text-blue-600" />
                    </div>
                    <p className="text-xs text-gray-600">Monthly Rent</p>
                  </div>
                  <p className="font-bold ml-8 text-lg text-[#006aff]">{tenant.rent}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 bg-green-100 rounded flex items-center justify-center">
                      <DollarSign className="w-3 h-3 text-green-600" />
                    </div>
                    <p className="text-xs text-[#1ec95a]">Security Deposit</p>
                  </div>
                  <p className="font-bold ml-8 text-lg text-[#1ec95a]">{tenant.deposit}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-600">Lease Duration</span>
                  <span className="text-xs text-gray-600">Days Remaining</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-lg font-bold text-gray-700">
                    {tenant.leaseStart} - {tenant.leaseEnd}
                  </p>
                  {tenant.daysRemaining > 0 ? ( <p className="text-xl font-bold text-[#ee2f2f] mt-1">{tenant.daysRemaining} Days</p>) : <p className="text-xl font-bold text-[#ee2f2f] mt-1"> Expired</p> }
                </div>
              </div>

              <div className="mb-4 bg-white border border-gray-100 transition-shadow duration-200 shadow-[0_0_6px_rgba(0,0,0,0.1)] px-4 py-2 rounded-xl">
                <p className="text-[#ee2f2f] text-lg font-medium mb-1">Emergency</p>
                <div className="flex justify-between">
                  <p className="text-xs font-bold">{tenant.emergency}</p>
                  <p className="text-xs text-gray-500">{tenant.emergencyPhone}</p>
                </div>
              </div>

              <Button
                onClick={() => handleViewTenant(tenant)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                View
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="max-w-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-xl p-6">
          <DialogHeader className="space-y-0 pb-2">
            <DialogTitle className="text-xl font-semibold text-[#000000]">
              Delete Tenant
            </DialogTitle>
          </DialogHeader>
              
          <div className="space-y-4">
            <p className="text-[#7D7D7D] leading-relaxed">
              Are you sure you want to delete "{tenantToDelete?.name}"? This
              action cannot be undone and will also remove all associated data.
            </p>
              
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-6 rounded-lg bg-[#EBEFF3] text-[#7D7D7D] border border-[#7D7D7D] focus-visible:ring-[#000] focus-visible:border-[#000]"
              >
                Cancel
              </Button>
              <Button
                className="bg-[#EE2F2F] hover:bg-[#EE2F2F] text-white focus-visible:ring-[#000] focus-visible:border-[#000] px-6 rounded-lg"
                onClick={handleConfirmDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
