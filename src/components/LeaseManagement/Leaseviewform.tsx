import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Accordion, AccordionContent, AccordionItem } from "../../components/ui/accordion";
import { Calendar, X, User, DollarSign, FileText, Phone, Building } from "lucide-react";

interface LeaseData {
  id: string;
  name: string;
  unit: string;
  avatar: string;
  period: string;
  duration: string;
  rent: string;
  deposit: string;
  status: string;
  expiry: string;
  expiryNote: string;
  email?: string;
  phone?: string;
  address?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
  bankDetails?: {
    accountNumber: string;
    bankName: string;
    ifscCode: string;
    accountHolderName: string;
  };
}

interface LeaseViewFormProps {
  leaseData?: LeaseData;
  onClose: () => void;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  propertyType?: string;
  propertyName?: string;
  unit?: string;
  address?: string;
  monthlyRent?: string;
  securityDeposit?: string;
  paymentStatus?: string;
  maintenanceCharge?: string;
  leaseStartDate?: string;
  leaseEndDate?: string;
  contactName?: string;
  contactPhone?: string;
  relationship?: string;
  accountNumber?: string;
  bankName?: string;
  ifscCode?: string;
  accountHolderName?: string;

  
}

export const Leaseviewform = ({ leaseData, onClose }: LeaseViewFormProps) => {
  // Extract lease period start and end dates
  const extractDatesFromPeriod = (period: string) => {
    if (!period || period === "N/A") return { startDate: "", endDate: "" };
    
    const parts = period.split(" - ");
    if (parts.length === 2) {
      return {
        startDate: parts[0].trim(),
        endDate: parts[1].trim()
      };
    }
    return { startDate: "", endDate: "" };
  };

  const { startDate, endDate } = extractDatesFromPeriod(leaseData?.period || "");

  const [formData, setFormData] = useState({
    fullName: leaseData?.name || "",
    email: leaseData?.email || "",
    phone: leaseData?.phone || "",
    propertyType: "",
    propertyName: "",
    unit: leaseData?.unit || "",
    address: leaseData?.address || "",
    monthlyRent: leaseData?.rent || "",
    securityDeposit: leaseData?.deposit || "",
    paymentStatus: "",
      maintenanceCharge: leaseData?.maintenanceCharge || "Not Available",  

    
    leaseStartDate: startDate,
    leaseEndDate: leaseData?.expiry || endDate,
    contactName: leaseData?.emergencyContact?.name || "Not Available",
    contactPhone: leaseData?.emergencyContact?.phone || "Not Available",
    relationship: leaseData?.emergencyContact?.relation || "Not Available",
    accountNumber: leaseData?.bankDetails?.accountNumber || "Not Available",
    bankName: leaseData?.bankDetails?.bankName || "Not Available",
    ifscCode: leaseData?.bankDetails?.ifscCode || "Not Available",
    accountHolderName: leaseData?.bankDetails?.accountHolderName || "Not Available"
   
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number (10 digits required)";
    }
    if (!formData.propertyType) newErrors.propertyType = "Property type is required";
    if (!formData.propertyName) newErrors.propertyName = "Property name is required";
    if (!formData.unit) newErrors.unit = "Unit is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.monthlyRent.trim()) newErrors.monthlyRent = "Monthly rent is required";
    if (!formData.securityDeposit.trim()) newErrors.securityDeposit = "Security deposit is required";
    if (!formData.paymentStatus) newErrors.paymentStatus = "Payment status is required";
    if (!formData.leaseStartDate.trim()) newErrors.leaseStartDate = "Lease start date is required";
    if (!formData.leaseEndDate.trim()) newErrors.leaseEndDate = "Lease end date is required";
    if (!formData.contactName.trim()) newErrors.contactName = "Contact name is required";
    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = "Contact phone is required";
    } else if (!/^[0-9]{10}$/.test(formData.contactPhone)) {
      newErrors.contactPhone = "Invalid phone number (10 digits required)";
    }
    if (!formData.relationship) newErrors.relationship = "Relationship is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error when user types
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSelectChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user selects
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, proceed with submission
      console.log("Form submitted:", formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <form onSubmit={handleSubmit} className="max-w-[900px] w-full mx-auto bg-white rounded-lg shadow-lg border max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center">
              <FileText className="w-3 h-3 text-white" />
            </div>
            <h1 className="text-lg font-medium text-gray-900">Lease Details</h1>
          </div>            
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose} type="button">
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
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="h-[48px] w-[369px] border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400"
                      readOnly
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm text-gray-600 font-normal">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="JohnDoe@Email.Com"
                      className="h-[48px] w-[369px] border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400"
                      readOnly
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm text-gray-600 font-normal">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 9876543210"
                      className="h-[48px] w-[369px] border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400"
                      readOnly
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertyType" className="text-sm text-gray-600 font-normal">
                      Property Type
                    </Label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) => handleSelectChange("propertyType", value)}
                    >
                      <SelectTrigger className="h-[48px] w-[369px] border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400">
                        <SelectValue placeholder="Flat" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="flat">Flat</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.propertyType && <p className="text-red-500 text-xs mt-1">{errors.propertyType}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertyName" className="text-sm text-gray-600 font-normal">
                      Property Name
                    </Label>
                    <Select
                      value={formData.propertyName}
                      onValueChange={(value) => handleSelectChange("propertyName", value)}
                    >
                      <SelectTrigger className="h-[48px] w-[369px] border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="property1">Property 1</SelectItem>
                        <SelectItem value="property2">Property 2</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.propertyName && <p className="text-red-500 text-xs mt-1">{errors.propertyName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit" className="text-sm text-gray-600 font-normal">
                      Unit
                    </Label>
                    <Input
                      id="unit"
                      value={formData.unit}
                      onChange={handleInputChange}
                      placeholder="Unit 101"
                      className="h-[48px] w-[369px] border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400"
                      readOnly
                    />
                    {errors.unit && <p className="text-red-500 text-xs mt-1">{errors.unit}</p>}
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="address" className="text-sm text-gray-600 font-normal">
                      Tenants Address
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Any Street Address"
                      className="w-[795px] h-[78px] border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400"
                      readOnly
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
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
                      value={formData.monthlyRent}
                      onChange={handleInputChange}
                      placeholder="$10,000"
                      className="h-[48px] w-[369px] border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400"
                      readOnly
                    />
                    {errors.monthlyRent && <p className="text-red-500 text-xs mt-1">{errors.monthlyRent}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="securityDeposit" className="text-sm text-gray-600 font-normal">
                      Security Deposit
                    </Label>
                    <Input
                      id="securityDeposit"
                      value={formData.securityDeposit}
                      onChange={handleInputChange}
                      placeholder="$50,000"
                      className="h-[48px] w-[369px] border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400"
                      readOnly
                    />
                    {errors.securityDeposit && <p className="text-red-500 text-xs mt-1">{errors.securityDeposit}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentStatus" className="text-sm text-gray-600 font-normal">
                      Payment Status
                    </Label>
                    <Select
                      value={formData.paymentStatus}
                      onValueChange={(value) => handleSelectChange("paymentStatus", value)}
                    >
                      <SelectTrigger className="h-[48px] w-[369px] border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400">
                        <SelectValue placeholder="Paid" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.paymentStatus && <p className="text-red-500 text-xs mt-1">{errors.paymentStatus}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maintenanceCharge" className="text-sm text-gray-600 font-normal">
                      Maintenance Charge
                    </Label>
                    <Input
                      id="maintenanceCharge"
                      value={formData.maintenanceCharge}
                      onChange={handleInputChange}
                      placeholder="Free Maintenance Charge"
                      className="h-[48px] w-[369px] border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400"
                    />
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
                      <Input
                        id="leaseStartDate"
                        value={formData.leaseStartDate}
                        onChange={handleInputChange}
                        placeholder="25/05/2025"
                        className="h-[48px] w-[369px] border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400"
                        readOnly
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                    {errors.leaseStartDate && <p className="text-red-500 text-xs mt-1">{errors.leaseStartDate}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leaseEndDate" className="text-sm text-gray-600 font-normal">
                      Lease End Date
                    </Label>
                    <div className="relative">
                      <Input
                        id="leaseEndDate"
                        value={formData.leaseEndDate}
                        onChange={handleInputChange}
                        placeholder="24/05/2025"
                        className="h-[48px] w-[369px] border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400"
                        readOnly
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                    {errors.leaseEndDate && <p className="text-red-500 text-xs mt-1">{errors.leaseEndDate}</p>}
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
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="h-[48px] w-[369px] border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400"
                      readOnly
                    />
                    {errors.contactName && <p className="text-red-500 text-xs mt-1">{errors.contactName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone" className="text-sm text-gray-600 font-normal">
                      Contact Phone
                    </Label>
                    <Input
                      id="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      placeholder="+91 9876543210"
                      className="h-[48px] w-[369px] border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400"
                      readOnly
                    />
                    {errors.contactPhone && <p className="text-red-500 text-xs mt-1">{errors.contactPhone}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relationship" className="text-sm text-gray-600 font-normal">
                      Relationship
                    </Label>
                    <Input
                      id="relationship"
                      value={formData.relationship}
                      onChange={handleInputChange}
                      placeholder="Spouse"
                      className="h-[48px] w-[369px] border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400"
                      readOnly
                    />
                    {errors.relationship && <p className="text-red-500 text-xs mt-1">{errors.relationship}</p>}
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
                    <Input
                      id="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                      placeholder="Your Account Number"
                      className="h-[48px] w-[369px] border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400"
                      readOnly
                    />
                    {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankName" className="text-sm text-gray-600 font-normal">
                      Sort Name
                    </Label>
                    <Input
                      id="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      placeholder="Your Bank Name"
                      className="h-[48px] w-[369px] border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400"
                      readOnly
                    />
                    {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ifscCode" className="text-sm text-gray-600 font-normal">
                      IFSC Code
                    </Label>
                    <Input
                      id="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleInputChange}
                      placeholder="Your IFSC Code"
                      className="h-[48px] w-[369px] border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400"
                      readOnly
                    />
                    {errors.ifscCode && <p className="text-red-500 text-xs mt-1">{errors.ifscCode}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountHolderName" className="text-sm text-gray-600 font-normal">
                      Account Holder Name
                    </Label>
                    <Input
                      id="accountHolderName"
                      value={formData.accountHolderName}
                      onChange={handleInputChange}
                      placeholder="Your Account Holder Name"
                      className="h-[48px] w-[369px] border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400"
                      readOnly
                    />
                    {errors.accountHolderName && <p className="text-red-500 text-xs mt-1">{errors.accountHolderName}</p>}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t bg-white gap-4">
          <Button className="bg-[#EBEFF3] hover:bg-[#EBEFF3] text-[#7D7D7D] px-8 h-10" onClick={onClose} type="button">
            Close
          </Button>
         
        </div>
      </form>
    </div>
  );
};