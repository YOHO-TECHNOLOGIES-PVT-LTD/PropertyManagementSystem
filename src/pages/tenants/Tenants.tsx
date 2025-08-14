"use client"

import { useEffect, useState } from "react"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Search, Phone, Mail, DollarSign } from "lucide-react"
import AddTenantForm, { type TenantFormData } from "../../components/tenants/create-tenant-form"
import EditTenantForm from "../../components/tenants/edit-tenant-form"
import ViewTenantModal from "../../components/tenants/view-tenant-modal"
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
import { useDispatch, useSelector } from "react-redux"
import { getAllTenantData } from "../../features/tenants/reducers/Thunks"
import { tenantSelector } from "../../features/tenants/reducers/Selector"
import { deleteTenants } from "../../features/tenants/services"

interface Tenant {
  id: string;
  uuid: string;
  personal_information: {
    full_name: string;
    email: string;
    phone: string;
    address: string;
  };
  lease_duration: {
    start_date: string;
    end_date: string;
  };
  emergency_contact: {
    name: string;
    phone: string;
    relation: string;
  };
  tenant_type: string;
  unit: {
    unit_name: string;
  };
  rent: string;
  deposit: string;
  financial_information: {
    rent: string;
    cgst: string;
    sgst: string;
    tds: string;
    maintenance: string;
  };
  bank_details: {
    bank_name: string;
    account_number: string;
    bank_branch: string;
    bank_IFSC: string;
  };
  is_active: boolean;
  is_deleted: boolean;
}

export default function Tenants() {
  const [showForm, setShowForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("All Types")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [tenantToDelete, setTenantToDelete] = useState<Tenant | null>(null)

  const { data, loading, error } = useSelector(tenantSelector)
  const tenantsData = data?.tenants || []

  const stats = [
    {
      label: "Total Tenants",
      value: tenantsData.length.toString(),
      bgColor: "bg-orange-100",
      circleColor1: "bg-orange-200",
      circleColor2: "bg-orange-300",
      backgroundimage: cardimg1,
    },
    {
      label: "Paid this Month",
      value: data?.paidThisMonth?.length.toString(), 
      bgColor: "bg-purple-100",
      circleColor1: "bg-purple-200",
      circleColor2: "bg-purple-300",
      backgroundimage: cardimg2,
    },
    {
      label: "Pending Payments",
      value: data?.pendingThisMonth?.length.toString(), 
      bgColor: "bg-green-100",
      circleColor1: "bg-green-200",
      circleColor2: "bg-green-300",
      backgroundimage: cardimg3,
    },
    {
      label: "Overdue",
      value: data?.overDueThisMonth?.length.toString(), 
      bgColor: "bg-pink-100",
      circleColor1: "bg-pink-200",
      circleColor2: "bg-pink-300",
      backgroundimage: cardimg4,
    },
  ]

  const handleAddTenant = (formData: TenantFormData) => {
    const newTenant = {
      personal_information: {
        full_name: formData.fullName,
        email: formData.emailAddress,
        phone: formData.phoneNumber,
        address: formData.address
      },
      lease_duration: {
        start_date: formData.leaseStartDate || "",
        end_date: formData.leaseEndDate || ""
      },
      emergency_contact: {
        name: formData.contactName,
        phone: formData.contactPhone,
        relation: formData.relationship || "other"
      },
      tenant_type: formData.tenantType || "rent",
      unit: { unit_name: formData.unit },
      rent: formData.rent,
      deposit: formData.securityDeposit,
      financial_information: {
        rent: formData.rent,
        cgst: formData.cgst,
        sgst: formData.sgst,
        tds: formData.tds,
        maintenance: formData.maintanance
      },
      bank_details: {
        bank_name: formData.bankName,
        account_number: formData.accountNumber,
        bank_branch: formData.accountHolder,
        bank_IFSC: formData.ifscNumber
      },
      is_active: true,
      is_deleted: false,
      id: (tenantsData.length + 1).toString(),
      uuid: `tenant-${Math.random().toString(36).substr(2, 9)}`
    }

    // In a real app, you would dispatch an action to add the tenant to Redux
    // For now, we'll just close the form
    setShowForm(false)
  }

  const handleEditTenant = (tenant: Tenant) => {
    setSelectedTenant(tenant)
    setShowEditForm(true)
  }

  const handleUpdateTenant = (id: string, formData: TenantFormData) => {
    // In a real app, you would dispatch an action to update the tenant in Redux
    setShowEditForm(false)
    setSelectedTenant(null)
  }

  const handleDeleteClick = (tenant: Tenant) => {
    setTenantToDelete(tenant)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (tenantToDelete) {
      try {
        await deleteTenants({ uuid: tenantToDelete.uuid })
        setIsDeleteModalOpen(false)
        setTenantToDelete(null)
      } catch (error) {
        console.error("Failed to delete tenant:", error)
      }
    }
  }

  const handleViewTenant = (tenant: Tenant) => {
    setSelectedTenant(tenant)
    setShowViewModal(true)
  }

  const dispatch = useDispatch<any>()

  useEffect(() => {
    const fetchTenants = async () => {
      await dispatch(getAllTenantData(""))
    }
    fetchTenants()
  }, [dispatch])

  if (loading) return <div className="min-h-screen bg-gray-50 p-8">Loading tenants...</div>
  if (error) return <div className="min-h-screen bg-gray-50 p-8">Error loading tenants</div>

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

        <ViewTenantModal isOpen={showViewModal} tenantId={selectedTenant} onClose={() => setShowViewModal(false)} />

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
        <div className="grid grid-cols-2 gap-6">
          {tenantsData.map((tenant) => {
            const daysRemaining = tenant.lease_duration.end_date
              ? Math.ceil((new Date(tenant.lease_duration.end_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
              : 0

            const avatar = tenant.personal_information.full_name
              .split(" ")
              .map(n => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)

            return (
              <div key={tenant.uuid} className="bg-white border border-gray-100 shadow-sm p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                      {avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold">{tenant.personal_information.full_name}</h3>
                      <p className="text-gray-500 text-xs">{tenant.unit?.unit_name || "N/A"}</p>
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
                      {tenant.personal_information.email}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Phone className="w-3 h-3" />
                      {tenant.personal_information.phone}
                    </div>
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
                    <p className="font-bold ml-8 text-lg text-[#006aff]">
                      ₹{Number(tenant.rent).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 bg-green-100 rounded flex items-center justify-center">
                        <DollarSign className="w-3 h-3 text-green-600" />
                      </div>
                      <p className="text-xs text-[#1ec95a]">Security Deposit</p>
                    </div>
                    <p className="font-bold ml-8 text-lg text-[#1ec95a]">
                      ₹{Number(tenant.deposit).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-600">Lease Duration</span>
                    <span className="text-xs text-gray-600">Days Remaining</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-lg font-bold text-gray-700">
                      {new Date(tenant.lease_duration.start_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })} -{" "}
                      {new Date(tenant.lease_duration.end_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </p>
                    <p className="text-xl font-bold text-[#ee2f2f] mt-1">
                      {daysRemaining > 0 ? `${daysRemaining} Days` : "Expired"}
                    </p>
                  </div>
                </div>

                <div className="mb-4 bg-white border border-gray-100 shadow-sm px-4 py-2 rounded-xl">
                  <p className="text-[#ee2f2f] text-lg font-medium mb-1">Emergency</p>
                  <div className="flex justify-between">
                    <p className="text-xs font-bold">{tenant.emergency_contact.name}</p>
                    <p className="text-xs text-gray-500">{tenant.emergency_contact.phone}</p>
                  </div>
                </div>

                <Button
                  onClick={() => handleViewTenant(tenant)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  View
                </Button>
              </div>
            )
          })}
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
              Are you sure you want to delete "{tenantToDelete?.personal_information.full_name}"? This
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