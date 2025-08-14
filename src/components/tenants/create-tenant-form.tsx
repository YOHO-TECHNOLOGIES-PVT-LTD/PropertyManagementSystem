"use client"

import { useEffect, useState } from "react"
import { Input } from "../../../src/components/ui/input"
import { Label } from "../../../src/components/ui/label"
import { Button } from "../../../src/components/ui/button"
import { Checkbox } from "../../../src/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "../../../src/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../src/components/ui/select"
import { createTenants, getPropertyByIdData, getPropertyData } from "../../features/tenants/services"

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
  hasGst: boolean 
  cgst: string   
  sgst: string
  tds: string
  maintanance: string
  totalmonthlyrent: string
  teamSpecialized: string
  leaseStartDate: string
  leaseEndDate: string
  contactName: string
  contactPhone: string
  relationship: string
  bankName: string
  accountNumber: string
  accountHolder: string
  ifscNumber: string
}

interface AddTenantFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: {
    personal_information: {
      full_name: string
      email: string
      phone: string
      address: string
    }
    lease_duration: {
      start_date: Date | null
      end_date: Date | null
    }
    emergency_contact: {
      name: string
      phone: string
      relation: string
    }
    tenant_type: string
    unit: string
    rent: string
    deposit: string
    financial_information: {
      rent: string
      cgst: string
      sgst: string
      tds: string
      maintenance: string
    }
    bank_details: {
      bank_name: string
      account_number: string
      bank_branch: string
      bank_IFSC: string
    }
  }) => void
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
    hasGst: false,  
    cgst: "",       
    sgst: "",       
    tds: '',
    maintanance: '',
    totalmonthlyrent: '',
    teamSpecialized: "",
    leaseStartDate: "",
    leaseEndDate: "",
    contactName: "",
    contactPhone: "",
    relationship: "",
    bankName: "",
    accountNumber: "",
    accountHolder: "",
    ifscNumber: "",
  })

  const handleInputChange = (field: keyof TenantFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

const [commercial , setCommercial] = useState<any>();
const [unitData, setUnitData] = useState<any>();

// console.log("commer",commercial[0]?.property_name)

const getUnit = async() => {
  const data = {uuid : "e465c027-3ad0-4e94-a755-178a4aa53115"}
  const response = await getPropertyByIdData(data)
  setUnitData(response?.data);
  console.log(response?.data, 'single unit response');
}

const getProperty = async() => {
      const data = {property_type: "commercial"}
      const response = await getPropertyData(data)
      setCommercial(response?.data);
      console.log(response?.data, 'single tenant response');
              
  }

  useEffect(() => {
    getProperty(),getUnit()
  },[])


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // Prevent default form submission behavior
  
  if (!formData.fullName || !formData.emailAddress || !formData.phoneNumber) {
    alert("Please fill in required fields");
    return;
  }

  try {
    // Transform the form data to match the backend schema
    const payload = {
      personal_information: {
        full_name: formData.fullName,
        email: formData.emailAddress,
        phone: formData.phoneNumber,
        address: formData.address
      },
      lease_duration: {
        start_date: formData.leaseStartDate ? new Date(formData.leaseStartDate) : null,
        end_date: formData.leaseEndDate ? new Date(formData.leaseEndDate) : null
      },
      emergency_contact: {
        name: formData.contactName,
        phone: formData.contactPhone,
        relation: formData.relationship || "other"
      },
      tenant_type: formData.tenantType || "rent",
      unit: formData.unit,
      rent: formData.rent,
      deposit: formData.securityDeposit,
      uuid: `tenant-${Math.random().toString(36).substr(2, 9)}`,
      is_active: true,
      is_deleted: false,
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
      }
    };

    console.log("Submitting tenant data:", payload);
    
    // Call the API service
    const response = await createTenants(payload);
    console.log("API Response:", response);
    
    // Call the parent onSubmit callback
    onSubmit(payload);

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
      hasGst: false,  
      cgst: "",       
      sgst: "", 
      tds: '',
      maintanance: '',
      totalmonthlyrent: '',
      teamSpecialized: "",
      leaseStartDate: "",
      leaseEndDate: "",
      contactName: "",
      contactPhone: "",
      relationship: "",
      bankName: "",
      accountNumber: "",
      accountHolder: "",
      ifscNumber: "",
    });

    // Close the form
    onClose();
    
  } catch (error) {
    console.error("Failed to create tenant:", error);
    alert("Failed to create tenant. Please try again.");
  }
};

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
      hasGst: false,  
      cgst: "",       
      sgst: "", 
      tds: '',
    maintanance: '',
    totalmonthlyrent: '',
      teamSpecialized: "",
      leaseStartDate: "",
      leaseEndDate: "",
      contactName: "",
      contactPhone: "",
      relationship: "",
      bankName: "",
      accountNumber: "",
      accountHolder: "",
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
                  <Select
                  
                    value={formData.propertytype}
                    onValueChange={(value) => handleInputChange("propertytype", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Property type" />
                    </SelectTrigger>
                    <SelectContent   >
                      <SelectItem value="all">All Type</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      
                    </SelectContent>
                  </Select>
                </div>
                  
                  <div className="space-y-2">
                  <Label htmlFor="propertyName">Property Name</Label>
                  <Select
                  
                    value={formData.propertyName}
                    onValueChange={(value) => handleInputChange("propertyName", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Property" />
                    </SelectTrigger>
                    <SelectContent   >
                      <SelectItem value="sunrise">{commercial[0]?.property_name}</SelectItem>                                            
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tenantType">Tenant Type</Label>
                  <Select
                  
                    value={formData.tenantType}
                    onValueChange={(value) => handleInputChange("tenantType", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Property" />
                    </SelectTrigger>
                    <SelectContent   >
                      <SelectItem value="lease">Lease</SelectItem>
                      <SelectItem value="rent">Rent</SelectItem>                      
                    </SelectContent>
                  </Select>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select
                  
                    value={formData.unit}
                    onValueChange={(value) => handleInputChange("unit", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Unit" />
                    </SelectTrigger>
                    <SelectContent   >
                    {unitData?.map((item) => (
                      <SelectItem key={item._id} value={item.uuid}>{item.unit_name}</SelectItem>
                      ))}                     
                    </SelectContent>
                  </Select>
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
    <div className="grid grid-cols-3 gap-4">
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
      <div className="space-y-2">
    <Label htmlFor="maintanance">Maintenance Charge</Label>
    <Input
      id="maintanance"
      value={formData.maintanance}
      onChange={(e) => handleInputChange("maintanance", e.target.value)}
      placeholder="-10 %"
    />
  </div>
    </div>
    
    {/* GST Section */}
    <div className="space-y-4 pt-2">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="gstCheckbox" 
          checked={formData.hasGst}
          onCheckedChange={(checked) => handleInputChange("hasGst", checked)}
        />
        <Label htmlFor="gstCheckbox">Include GST</Label>
      </div>
      
      {formData.hasGst && (
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cgst">CGST (%)</Label>
            <Input
              id="cgst"
              value={formData.cgst}
              onChange={(e) => handleInputChange("cgst", e.target.value)}
              placeholder="Enter CGST percentage"
              type="number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sgst">SGST (%)</Label>
            <Input
              id="sgst"
              value={formData.sgst}
              onChange={(e) => handleInputChange("sgst", e.target.value)}
              placeholder="Enter SGST percentage"
              type="number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tds">TDS</Label>
            <Input
              id="tds"
              value={formData.tds}
              onChange={(e) => handleInputChange("tds", e.target.value)}
              placeholder="-10 %"
            />
          </div>
        </div>
      )}
    </div>
    
  <div className="space-y-2 col-span-2"> 
    <Label htmlFor="totalmonthlyrent">Total Monthly Rent</Label>
    <Input
      id="totalmonthlyrent"
      value={formData.totalmonthlyrent}
      onChange={(e) => handleInputChange("totalmonthlyrent", e.target.value)}
      placeholder="Calculated amount"
    />
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
                    <Label htmlFor="accountHolder">Account Holder Name</Label>
                    <Input
                      id="accountHolder"
                      value={formData.accountHolder}
                      onChange={(e) => handleInputChange("accountHolder", e.target.value)}
                      placeholder="Enter Account Holder"
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
              <Button type="button" onClick={handleSubmit} className="px-8 bg-purple-600 hover:bg-purple-700 text-white">
                Add Tenant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
