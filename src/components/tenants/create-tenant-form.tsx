"use client"

import { useState } from "react"
import { Input } from "../../../src/components/ui/input"
import { Label } from "../../../src/components/ui/label"
import { Button } from "../../../src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../src/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../src/components/ui/select"

export interface TenantFormData {
  fullName: string
  emailAddress: string
  address: string
  propertytype: string
  propertyName: string
  tenantType: string
  phoneNumber: string
  unit: string
  propertyInformation: string
  rent: string
  securityDeposit: string
  teamSpecialized: string
  leaseStartDate: string
  leaseEndDate: string
  contactName: string
  contactPhone: string
  relationship: string
  bankName: string
  accountNumber: string
  bankBranch: string
  ifscNumber: string
}

interface AddTenantFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: TenantFormData) => void
}

export default function AddTenantForm({ isOpen, onClose, onSubmit }: AddTenantFormProps) {
  const [formData, setFormData] = useState<TenantFormData>({
    fullName: "",
    emailAddress: "",
    address: "",
    phoneNumber: "",
    unit: "",
    propertytype: "",
    propertyName: "",
    tenantType: "",
    propertyInformation: "",
    rent: "",
    securityDeposit: "",
    teamSpecialized: "",
    leaseStartDate: "",
    leaseEndDate: "",
    contactName: "",
    contactPhone: "",
    relationship: "",
    bankName: "",
    accountNumber: "",
    bankBranch: "",
    ifscNumber: "",
  })

  const handleInputChange = (field: keyof TenantFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = () => {
    if (!formData.fullName || !formData.emailAddress || !formData.phoneNumber) {
      alert("Please fill in required fields")
      return
    }

    onSubmit(formData)

    // Reset form
    setFormData({
      fullName: "",
      emailAddress: "",
      address: "",
      phoneNumber: "",
      unit: "",
      propertytype: "",
      propertyName: "",
      tenantType: "",
      propertyInformation: "",
      rent: "",
      securityDeposit: "",
      teamSpecialized: "",
      leaseStartDate: "",
      leaseEndDate: "",
      contactName: "",
      contactPhone: "",
      relationship: "",
      bankName: "",
      accountNumber: "",
      bankBranch: "",
      ifscNumber: "",
    })
  }

  const handleCancel = () => {
    // Reset form
    setFormData({
      fullName: "",
      emailAddress: "",
      address: "",
      phoneNumber: "",
      unit: "",
      propertytype: "",
      propertyName: "",
      tenantType: "",
      propertyInformation: "",
      rent: "",
      securityDeposit: "",
      teamSpecialized: "",
      leaseStartDate: "",
      leaseEndDate: "",
      contactName: "",
      contactPhone: "",
      relationship: "",
      bankName: "",
      accountNumber: "",
      bankBranch: "",
      ifscNumber: "",
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40" onClick={handleCancel}></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="space-y-6 p-6">
            <Card>
              <CardHeader className="bg-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  Add New Tenant
                </CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="bg-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emailAddress">Email Address</Label>
                    <Input
                      id="emailAddress"
                      type="email"
                      value={formData.emailAddress}
                      onChange={(e) => handleInputChange("emailAddress", e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Enter address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertytype">Property Type</Label>
                    <Input
                      id="propertytype"
                      value={formData.propertytype}
                      onChange={(e) => handleInputChange("propertytype", e.target.value)}
                      placeholder="Enter property type"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertyName">Property Name</Label>
                    <Input
                      id="propertyName"
                      value={formData.propertyName}
                      onChange={(e) => handleInputChange("propertyName", e.target.value)}
                      placeholder="Enter property name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tenantType">Tenant Type</Label>
                    <Input
                      id="tenantType"
                      value={formData.tenantType}
                      onChange={(e) => handleInputChange("tenantType", e.target.value)}
                      placeholder="Enter tenant type"
                    />
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
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rent">Monthly Rent</Label>
                    <Input
                      id="rent"
                      value={formData.rent}
                      onChange={(e) => handleInputChange("rent", e.target.value)}
                      placeholder="Enter monthly rent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="securityDeposit">Security Deposit</Label>
                    <Input
                      id="securityDeposit"
                      value={formData.securityDeposit}
                      onChange={(e) => handleInputChange("securityDeposit", e.target.value)}
                      placeholder="Enter security deposit"
                    />
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
                  Lease Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="leaseStartDate">Lease Start Date</Label>
                    <Input
                      id="leaseStartDate"
                      type="date"
                      value={formData.leaseStartDate}
                      onChange={(e) => handleInputChange("leaseStartDate", e.target.value)}
                      className="pr-10 gap-3"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leaseEndDate">Lease End Date</Label>
                    <Input
                      id="leaseEndDate"
                      type="date"
                      value={formData.leaseEndDate}
                      onChange={(e) => handleInputChange("leaseEndDate", e.target.value)}
                      className="pr-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">
                    5
                  </div>
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Name</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange("contactName", e.target.value)}
                      placeholder="Enter contact name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                      placeholder="Enter contact phone"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Select
                    value={formData.relationship}
                    onValueChange={(value) => handleInputChange("relationship", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">
                    6
                  </div>
                  Bank Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      value={formData.bankName}
                      onChange={(e) => handleInputChange("bankName", e.target.value)}
                      placeholder="Enter Bank name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      value={formData.accountNumber}
                      onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                      placeholder="Enter Account Number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankBranch">Bank Branch</Label>
                    <Input
                      id="bankBranch"
                      value={formData.bankBranch}
                      onChange={(e) => handleInputChange("bankBranch", e.target.value)}
                      placeholder="Enter Bank Branch"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ifscNumber">IFSC Code</Label>
                    <Input
                      id="ifscNumber"
                      value={formData.ifscNumber}
                      onChange={(e) => handleInputChange("ifscNumber", e.target.value)}
                      placeholder="Enter IFSC code"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between gap-4 pt-4">
              <Button type="button" variant="outline" onClick={handleCancel} className="px-8 bg-transparent">
                Cancel
              </Button>
              <Button type="button" onClick={handleSubmit} className="px-8 bg-purple-600 hover:bg-purple-700">
                Add Tenant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
