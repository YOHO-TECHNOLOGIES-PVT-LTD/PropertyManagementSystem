import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Button } from "../../components/ui/button"
import { Accordion, AccordionContent, AccordionItem } from "../../components/ui/accordion"
import { Calendar, X, User, DollarSign, FileText, Phone, Building } from "lucide-react"

interface LeaseData {
  id: number
  name: string
  unit: string
  period: string
  duration: string
  rent: string
  deposit: string
  status: string
  expiry: string
  expiryNote: string
}

interface LeaseViewFormProps {
  leaseData?: LeaseData
  onClose: () => void
}

export const Leaseviewform = ({ leaseData, onClose }: LeaseViewFormProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="max-w-[900px] w-full mx-auto bg-white rounded-lg shadow-lg border max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center">
              <FileText className="w-3 h-3 text-white" />
            </div>
            <h1 className="text-lg font-medium text-gray-900">Lease Details</h1>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-0">
          <Accordion
            type="multiple"
            defaultValue={["personal", "financial", "lease", "emergency", "bank"]}
            className="w-full"
          >
            {/* Personal Information */}
            <AccordionItem value="personal" className="border-b">
              <div className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center">
                    <User className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-base font-medium text-gray-900">Personal Information</span>
                </div>
              </div>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm text-gray-600 font-normal">
                      Full Name
                    </Label>
                    <Input id="fullName" defaultValue={leaseData?.name || ""} placeholder="John Doe" className="h-[48px] w-[369px]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm text-gray-600 font-normal">
                      Email Address
                    </Label>
                    <Input id="email" placeholder="JohnDoe@Email.Com" className="h-[48px] w-[369px]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm text-gray-600 font-normal">
                      Phone Number
                    </Label>
                    <Input id="phone" placeholder="+91 9876543210" className="h-[48px] w-[369px]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertyType" className="text-sm text-gray-600 font-normal">
                      Property Type
                    </Label>
                    <Select>
                      <SelectTrigger className="h-[48px] w-[369px]">
                        <SelectValue placeholder="Flat " />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="flat">Flat</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertyName" className="text-sm text-gray-600 font-normal">
                      Property Name
                    </Label>
                    <Select>
                      <SelectTrigger className="h-[48px] w-[369px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="property1">Property 1</SelectItem>
                        <SelectItem value="property2">Property 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit" className="text-sm text-gray-600 font-normal">
                      Unit
                    </Label>
                    <Select>
                      <SelectTrigger className="h-[48px] w-[369px]">
                        <SelectValue placeholder={leaseData?.unit || "Unit 101"} />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="101">Unit 101</SelectItem>
                        <SelectItem value="102">Unit 102</SelectItem>
                        <SelectItem value="205">Unit 205</SelectItem>
                        <SelectItem value="304">Unit 304</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="address" className="text-sm text-gray-600 font-normal">
                      Tenants Address
                    </Label>
                    <Input id="address" placeholder="Any Street Address" className="h-[48px] w-[369px]" />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Financial Information */}
            <AccordionItem value="financial" className="border-b">
              <div className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center">
                    <DollarSign className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-base font-medium text-gray-900">Financial Information</span>
                </div>
              </div>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="monthlyRent" className="text-sm text-gray-600 font-normal">
                      Monthly Rent
                    </Label>
                    <Input
                      id="monthlyRent"
                      defaultValue={leaseData?.rent || ""}
                      placeholder="$10,000"
                      className="h-[48px] w-[369px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="securityDeposit" className="text-sm text-gray-600 font-normal">
                      Security Deposit
                    </Label>
                    <Input
                      id="securityDeposit"
                      defaultValue={leaseData?.deposit || ""}
                      placeholder="$50,000"
                      className="h-[48px] w-[369px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentStatus" className="text-sm text-gray-600 font-normal">
                      Payment Status
                    </Label>
                    <Select>
                      <SelectTrigger className="h-[48px] w-[369px]">
                        <SelectValue placeholder="Paid" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maintenanceCharge" className="text-sm text-gray-600 font-normal">
                      Maintenance Charge
                    </Label>
                    <Input id="maintenanceCharge" placeholder="Free Maintenance Charge" className="h-[48px] w-[369px]" />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Lease Information */}
            <AccordionItem value="lease" className="border-b">
              <div className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center">
                    <FileText className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-base font-medium text-gray-900">Lease Information</span>
                </div>
              </div>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="leaseStartDate" className="text-sm text-gray-600 font-normal">
                      Lease Start Date
                    </Label>
                    <div className="relative">
                      <Input id="leaseStartDate" placeholder="25/05/2025" className="h-[48px] w-[369px]" />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leaseEndDate" className="text-sm text-gray-600 font-normal">
                      Lease End Date
                    </Label>
                    <div className="relative">
                      <Input
                        id="leaseEndDate"
                        defaultValue={leaseData?.expiry || ""}
                        placeholder="24/05/2025"
                        className="h-[48px] w-[369px]"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Emergency Contact */}
            <AccordionItem value="emergency" className="border-b">
              <div className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center">
                    <Phone className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-base font-medium text-gray-900">Emergency Contact</span>
                </div>
              </div>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName" className="text-sm text-gray-600 font-normal">
                      Contact Name
                    </Label>
                    <Input id="contactName" placeholder="John Doe" className="h-[48px] w-[369px]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone" className="text-sm text-gray-600 font-normal">
                      Contact Phone
                    </Label>
                    <Input id="contactPhone" placeholder="+91 9876543210" className="h-[48px] w-[369px]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relationship" className="text-sm text-gray-600 font-normal">
                      Relationship
                    </Label>
                    <Select>
                      <SelectTrigger className="h-[48px] w-[369px]">
                        <SelectValue placeholder="Spouse" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="spouse">Spouse</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="sibling">Sibling</SelectItem>
                        <SelectItem value="friend">Friend</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Bank Details */}
            <AccordionItem value="bank" className="border-b-0">
              <div className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center">
                    <Building className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-base font-medium text-gray-900">Bank Details</span>
                </div>
              </div>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber" className="text-sm text-gray-600 font-normal">
                      Account Number
                    </Label>
                    <Input id="accountNumber" placeholder="Your Account Number" className="h-[48px] w-[369px]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankName" className="text-sm text-gray-600 font-normal">
                      Sort Name
                    </Label>
                    <Input id="bankName" placeholder="Your Bank Name" className="h-[48px] w-[369px]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ifscCode" className="text-sm text-gray-600 font-normal">
                      IFSC Code
                    </Label>
                    <Input id="ifscCode" placeholder="Your IFSC Code" className="h-[48px] w-[369px]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountHolderName" className="text-sm text-gray-600 font-normal">
                      Account Holder Name
                    </Label>
                    <Input id="accountHolderName" placeholder="Your Account Holder Name" className="h-[48px] w-[369px]" />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t bg-white">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 h-10" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
