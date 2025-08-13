"use client"

import { Button } from "../../components/ui/button"
import { Label } from "../../components/ui/label"
import { X } from "lucide-react"
import type { TenantFormData } from "./create-tenant-form"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

export interface Tenant {
  id: string
  name: string
  email: string
  phone: string
  rent: string
  deposit: string
  leaseStart: string
  leaseEnd: string
  status: "Paid" | "Pending" | "Overdue"
  daysRemaining: number
  emergency: string
  emergencyPhone: string
  avatar: string
  fullData?: TenantFormData
}

interface ViewTenantModalProps {
  isOpen: boolean
  tenant: Tenant | null
  onClose: () => void
}

export default function ViewTenantModal({ isOpen, tenant, onClose }: ViewTenantModalProps) {
  if (!isOpen || !tenant) return null

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40" onClick={onClose}></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="space-y-6 p-6">
            <Card>
              <CardHeader className="bg-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center justify-between text-blue-700">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">
                      <span>👤</span>
                    </div>
                    Tenant Details - {tenant.name}
                  </div>
                  <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <X className="w-5 h-5" />
                  </Button>
                </CardTitle>
              </CardHeader>
            </Card>

            {tenant.fullData && (
              <>
                <Card>
                  <CardHeader className="bg-blue-50 rounded-t-lg">
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <div className="p-2 bg-gray-50 rounded border text-sm">{tenant.fullData.fullName}</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <div className="p-2 bg-gray-50 rounded border text-sm">{tenant.fullData.emailAddress}</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <div className="p-2 bg-gray-50 rounded border text-sm">{tenant.fullData.phoneNumber}</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Address</Label>
                      <div className="p-2 bg-gray-50 rounded border text-sm">
                        {tenant.fullData.address || "Not provided"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Tenant Type</Label>
                      <div className="p-2 bg-gray-50 rounded border text-sm">
                        {tenant.fullData.tenantType || "Not specified"}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-blue-50 rounded-t-lg">
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      Property Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Property Name</Label>
                      <div className="p-2 bg-gray-50 rounded border text-sm">
                        {tenant.fullData.propertyName || "Not provided"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Property Type</Label>
                      <div className="p-2 bg-gray-50 rounded border text-sm">
                        {tenant.fullData.propertytype || "Not specified"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Unit</Label>
                      <div className="p-2 bg-gray-50 rounded border text-sm">{tenant.fullData.unit || "Not provided"}</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Property Information</Label>
                      <div className="p-2 bg-gray-50 rounded border text-sm">
                        {tenant.fullData.propertyInformation || "Not provided"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Team Specialized</Label>
                      <div className="p-2 bg-gray-50 rounded border text-sm">
                        {tenant.fullData.teamSpecialized || "Not assigned"}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-blue-50 rounded-t-lg">
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      Financial Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Monthly Rent</Label>
                      <div className="p-2 bg-gray-50 rounded border text-sm">
                        ₹{tenant.fullData.rent ? Number.parseInt(tenant.fullData.rent).toLocaleString() : "0"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Security Deposit</Label>
                      <div className="p-2 bg-gray-50 rounded border text-sm">
                        ₹
                        {tenant.fullData.securityDeposit
                          ? Number.parseInt(tenant.fullData.securityDeposit).toLocaleString()
                          : "0"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Bank Name</Label>
                      <div className="p-2 bg-gray-50 rounded border text-sm">
                        {tenant.fullData.bankName || "Not provided"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Account Number</Label>
                      <div className="p-2 bg-gray-50 rounded border text-sm">
                        {tenant.fullData.accountNumber || "Not provided"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Bank Branch</Label>
                      <div className="p-2 bg-gray-50 rounded border text-sm">
                        {tenant.fullData.bankBranch || "Not provided"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>IFSC Number</Label>
                      <div className="p-2 bg-gray-50 rounded border text-sm">
                        {tenant.fullData.ifscNumber || "Not provided"}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-blue-50 rounded-t-lg">
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">
                        4
                      </div>
                      Lease & Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Lease Start Date</Label>
                      <div className="p-2 bg-gray-50 rounded border text-sm">
                        {tenant.fullData.leaseStartDate || "Not set"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Lease End Date</Label>
                      <div className="p-2 bg-gray-50 rounded border text-sm">
                        {tenant.fullData.leaseEndDate || "Not set"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Emergency Contact Name</Label>
                      <div className="p-2 bg-gray-50 rounded border text-sm">
                        {tenant.fullData.contactName || "Not provided"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Emergency Contact Phone</Label>
                      <div className="p-2 bg-gray-50 rounded border text-sm">
                        {tenant.fullData.contactPhone || "Not provided"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Relationship</Label>
                      <div className="p-2 bg-gray-50 rounded border text-sm">
                        {tenant.fullData.relationship || "Not specified"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            <div className="flex justify-end pt-4">
              <Button onClick={onClose} className="px-8 bg-purple-600 hover:bg-purple-700 text-white">
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}