import { Plus, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useEffect, useState } from "react";
import propertyImg1 from "../../assets/properties/property1.png";
import buildingBlue from "../../assets/properties/building-blue.png";
import buildingGreen from "../../assets/properties/building-green.png";
import buildingPink from "../../assets/properties/building-pink.png";
import locationImg from "../../assets/properties/location.png";
import callImg from "../../assets/properties/call.svg";
import editImg from "../../assets/properties/edit.png";
import trashImg from "../../assets/properties/trash.png";
import searchImg from "../../assets/properties/search.png";
import eyeImg from "../../assets/properties/eye.png";
import uploadImg from "../../assets/properties/upload.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Textarea } from "../../components/ui/textarea";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { selectProperties } from "../../features/Properties/Reducers/Selectors";
import {
  fetchGetProperties,
  fetchCreateProperty,
  fetchEditProperty,
  fetchDeleteProperty,
} from "../../features/Properties/Reducers/PropertiesThunk";

type ModalMode = "add" | "view" | "edit";

interface Property {
  id: number;
  uuid?: string;
  name: string;
  location: string;
  image: string;
  tag: string;
  owner: {
    name: string;
    role: string;
    avatar: string;
    phone: string;
    email: string;
    address: string;
  };
  stats: {
    totalUnits: number;
    totalSquareFeet: number;
    occupiedUnits: number;
    vacantUnits: number;
    occupancyRate: number;
  };
}

function Properties() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>("add");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  // const [properties, setProperties] = useState<Property[]>(initialProperties);
  const dispatch = useDispatch<any>();
  const properties = useSelector(selectProperties);

  useEffect(() => {
    dispatch(fetchGetProperties());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    propertyName: "",
    propertyType: "",
    totalUnits: "",
    squareFeet: "",
    address: "",
    ownerName: "",
    email: "",
    phone: "",
    ownerAddress: "",
  });
  const mappedProperties: Property[] =
    properties?.map((p: any, index: number) => ({
      id: index + 1,
      name: p.property_name,
      location: p.property_address || p.owner_information?.address || "",
      image: p.image || propertyImg1,
      tag: p.property_type,
      owner: {
        name: p.owner_information?.full_name || "",
        role: "OWNER/RENTAL",
        avatar: "/professional-man.png",
        phone: p.owner_information?.phone || "",
        email: p.owner_information?.email || "",
        address: p.owner_information?.address || "",
      },
      stats: {
        totalUnits: p.total_units || 0,
        totalSquareFeet: Number(p.square_feet) || 0,
        occupiedUnits: p.occupied_units || 0,
        vacantUnits: p.vacant_units || 0,
        occupancyRate: p.occupancy_rate || 0,
      },
      uuid: p.uuid,
    })) || [];

  // Step 2: Apply your filter
  const filteredProperties = mappedProperties.filter((property) => {
    const propertyTag = property.tag?.toLowerCase() || "";
    const searchTermLower = searchTerm.toLowerCase();

    const typeMatch =
      selectedType === "all" || propertyTag === selectedType.toLowerCase();

    const searchMatch =
      searchTerm === "" ||
      (property.name?.toLowerCase() || "").includes(searchTermLower) ||
      (property.location?.toLowerCase() || "").includes(searchTermLower) ||
      (property.owner?.name?.toLowerCase() || "").includes(searchTermLower);

    return typeMatch && searchMatch;
  });
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      toast.success("Image Uploaded");
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setSelectedProperty(null);
    setFormData({
      propertyName: "",
      propertyType: "",
      totalUnits: "",
      squareFeet: "",
      address: "",
      ownerName: "",
      email: "",
      phone: "",
      ownerAddress: "",
    });
    setUploadedImage(null);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openViewModal = (property: Property) => {
    setModalMode("view");
    setSelectedProperty(property);
    setFormData({
      propertyName: property.name,
      propertyType: property.tag,
      totalUnits: property.stats.totalUnits.toString(),
      squareFeet: property.stats.totalSquareFeet.toString(),
      address: property.location,
      ownerName: property.owner.name,
      email: property.owner.email,
      phone: property.owner.phone,
      ownerAddress: property.owner.address,
    });
    setUploadedImage(property.image);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (property: Property) => {
    setModalMode("edit");
    setSelectedProperty(property);
    setFormData({
      propertyName: property.name,
      propertyType: property.tag,
      totalUnits: property.stats.totalUnits.toString(),
      squareFeet: property.stats.totalSquareFeet.toString(),
      address: property.location,
      ownerName: property.owner.name,
      email: property.owner.email || "",
      phone: property.owner.phone,
      ownerAddress: property.owner.address || "",
    });
    setUploadedImage(property.image);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.propertyName) {
      toast.error("Property name is required");
      return;
    }
    if (!formData.propertyType) {
      toast.error("Property type is required");
      return;
    }
    if (!formData.squareFeet) {
      toast.error("Square feet is required");
      return;
    }
    if (!formData.address) {
      toast.error("Property address is required");
      return;
    }
    if (!formData.ownerName) {
      toast.error("Owner name is required");
      return;
    }

    try {
      const formPayload = {
        property_name: formData.propertyName,
        property_type: formData.propertyType,
        square_feet: formData.squareFeet,
        total_units: formData.totalUnits || "1",
        property_address: formData.address,
        image: uploadedImage || null,
        owner_information: {
          full_name: formData.ownerName,
          email: formData.email || "",
          phone: formData.phone || "",
          address: formData.ownerAddress || formData.address,
        },
      };

      if (modalMode === "edit" && selectedProperty) {
        const params = {
           uuid: selectedProperty?.uuid,
        }

        if (!params) {
          toast.error("Property UUID not found");
          return;
        }

        await dispatch(fetchEditProperty(params, formPayload));
        toast.success(`${formData.propertyName} details updated`);
      } else {
        await dispatch(fetchCreateProperty(formPayload));
        toast.success("New property added successfully!");
      }

      await dispatch(fetchGetProperties());
      setIsModalOpen(false);
      setUploadedImage(null);
      setImageFile(null);
      setFormData({
        propertyName: "",
        propertyType: "",
        totalUnits: "",
        squareFeet: "",
        address: "",
        ownerName: "",
        email: "",
        phone: "",
        ownerAddress: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleDeleteClick = (property: Property) => {
    setPropertyToDelete(property);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteProperty = async () => {
  if (!propertyToDelete?.uuid) {
    toast.error("Property UUID not found");
    return;
  }

  try {
    await dispatch(fetchDeleteProperty(propertyToDelete.uuid));
    // await deleteProperty(propertyToDelete.uuid)
    console.log("Delete UUid",propertyToDelete.uuid)
    toast.success(`${propertyToDelete.name} deleted successfully`);
    setIsDeleteModalOpen(false);
    setPropertyToDelete(null);

    // Refresh the list
    await dispatch(fetchGetProperties());
  } catch (error) {
    console.error("Error deleting property:", error);
    toast.error("Failed to delete property");
  }
};

  const getModalTitle = () => {
    switch (modalMode) {
      case "add":
        return "Add New Property";
      case "view":
        return "Property Details";
      case "edit":
        return "Edit Property";
      default:
        return "Property";
    }
  };

  const resetSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[#000000]">Properties</h1>
              <p className="text-gray-600 text-sm mt-2">
                Manage Your Property Portfolio ({mappedProperties.length}{" "}
                Properties)
              </p>
            </div>

            <Button
              className="bg-[#B200FF] hover:bg-[#B200FF] text-white px-6"
              onClick={openAddModal}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Button>
          </div>

          {/* Search Bar and Filter */}
          <div className="flex items-center gap-4 justify-between">
            <div className="relative max-w-md flex-1">
              <img
                src={searchImg}
                className="absolute left-3 top-7 transform -translate-y-1/2 text-gray-400 w-4 h-4"
              />
              <Input
                placeholder="Search by property, location or owner"
                className="pl-10 h-10 w-[80%] bg-[#b200ff0d] border-[#b200ff0d] text-[#333333] placeholder-[#333333] rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={resetSearch}
                  className="absolute right-24 top-7 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[140px] bg-[#B200FF1A] border-[#B200FF1A] text-[#B200FF] hover:bg-[#B200FF1A]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="all"
                  className="text-[#7D7D7D] font-semibold border-2 border-[#E5E5E5] rounded-lg mb-1"
                >
                  all
                </SelectItem>
                <SelectItem
                  value="apartment"
                  className="text-[#7D7D7D] font-semibold border-2 border-[#E5E5E5] rounded-lg mb-1 bg-white"
                >
                  Apartment
                </SelectItem>
                <SelectItem
                  value="commercial"
                  className="text-[#7D7D7D] font-semibold border-2 border-[#E5E5E5] rounded-lg mb-1 bg-white"
                >
                  Commercial
                </SelectItem>
                <SelectItem
                  value="villa"
                  className="text-[#7D7D7D] font-semibold border-2 border-[#E5E5E5] rounded-lg mb-1 bg-white"
                >
                  Villa
                </SelectItem>
                <SelectItem
                  value="house"
                  className="text-[#7D7D7D] font-semibold border-2 border-[#E5E5E5] rounded-lg mb-1 bg-white"
                >
                  House
                </SelectItem>
                <SelectItem
                  value="land"
                  className="text-[#7D7D7D] font-semibold border-2 border-[#E5E5E5] rounded-lg bg-white"
                >
                  Land
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProperties.length ? (
            filteredProperties?.map((property) => (
              <Card
                key={property.id}
                className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-0">
                  {/* Owner Info */}
                  <div className="flex items-center justify-between mb-3 mx-3 -mt-3">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium text-[#000000] text-sm">
                          {property?.owner?.name}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <img
                            src={callImg}
                            alt="phone icon"
                            className="w-4 h-4 object-cover"
                          />
                          <p className="text-xs text-gray-500">
                            {property?.owner?.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-8 h-8 p-0 rounded-full border-[#0062FF] bg-[#0062FF]"
                        onClick={() => openEditModal(property)}
                      >
                        <img src={editImg} className="w-4 h-4" alt="edit" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-8 h-8 p-0 rounded-full border-[#EE2F2F] bg-[#EE2F2F]"
                        onClick={() => handleDeleteClick(property)}
                      >
                        <img src={trashImg} className="w-4 h-4" alt="trash" />
                      </Button>
                    </div>
                  </div>

                  {/* Property Image */}
                  <div className="relative">
                    <img
                      src={property?.image}
                      alt={property?.name}
                      className="w-full h-58 object-cover rounded-xl"
                    />
                    <Badge
                      variant="secondary"
                      className="absolute top-3 right-3 bg-white text-[#B200FF] hover:bg-white/90"
                    >
                      {property?.tag}
                    </Badge>
                  </div>

                  <div className="p-2">
                    {/* Property Info */}
                    <div className="mb-4 flex items-center justify-between mx-1">
                      <h3 className="font-semibold text-[#000000] mb-1">
                        {property?.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <img
                          src={locationImg}
                          alt="location icon"
                          className="w-4 h-4"
                        />
                        <p className="text-sm text-[#7D7D7D]">
                          {property?.location}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-3 place-items-center">
                      <div className="text-center flex items-center gap-2 w-48">
                        <div className="mb-1 bg-[#006AFF26] p-2 rounded-full">
                          <img
                            src={buildingBlue}
                            alt="building"
                            className="w-4 h-4"
                          />
                        </div>
                        <p className="font-semibold text-[#716F6F]">
                          Total Units{" "}
                          <span className="text-[#006AFF] ml-1">
                            {property?.stats?.totalUnits}
                          </span>
                        </p>
                      </div>
                      <div className="text-center flex items-center gap-2 w-48">
                        <div className="mb-1 bg-[#1EC95A26] p-2 rounded-full">
                          <img
                            src={buildingGreen}
                            alt="building"
                            className="w-4 h-4"
                          />
                        </div>
                        <p className="font-semibold text-[#716F6F]">
                          Total Sq Ft{" "}
                          <span className="text-[#1EC95A] ml-1">
                            {property?.stats?.totalSquareFeet}
                          </span>
                        </p>
                      </div>
                      <div className="text-center flex items-center gap-2 w-48">
                        <div className="mb-1 bg-[#FF00E126] p-2 rounded-full">
                          <img
                            src={buildingPink}
                            alt="building"
                            className="w-4 h-4"
                          />
                        </div>
                        <p className="font-semibold text-[#716F6F]">
                          Occupied{" "}
                          <span className="text-[#FF00E1] ml-1">
                            {property?.stats?.occupiedUnits}
                          </span>
                        </p>
                      </div>
                      <div className="text-center flex items-center gap-2 w-48">
                        <div className="mb-1 bg-[#006AFF26] p-2 rounded-full">
                          <img
                            src={buildingBlue}
                            alt="building"
                            className="w-4 h-4"
                          />
                        </div>
                        <p className="font-semibold text-[#716F6F]">
                          Vacant{" "}
                          <span className="text-[#006AFF] ml-1">
                            {property?.stats?.vacantUnits}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Occupancy Rate */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-600">
                          Occupancy Rate
                        </span>
                        <span className="text-xs font-medium text-[#12804D]">
                          {property?.stats?.occupancyRate}%
                        </span>
                      </div>
                      <Progress
                        value={property?.stats?.occupancyRate}
                        className="h-2 [&>div]:bg-[#12804D]"
                      />
                    </div>

                    {/* View Button */}
                    <Button
                      className="w-full bg-[#B200FF] hover:bg-[#B200FF] text-white"
                      onClick={() => openViewModal(property)}
                    >
                      <img src={eyeImg} alt="eye" className="w-4 h-4" />
                      <p className="">View</p>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-2">
              <Card className="bg-white border-0 shadow-lg hover:shadow-lg transition-shadow p-8 text-center">
                <p className="text-lg">
                  No properties found matching your criteria
                </p>
                <Button
                  variant="ghost"
                  className="text-[#B200FF]"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedType("all");
                  }}
                >
                  Clear filters
                </Button>
              </Card>
            </div>
          )}
        </div>

        {/* Add/Edit/View Property Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="min-w-2xl max-h-[90vh] overflow-y-auto fixed top-11/12 left-12/16 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-xl no-scrollbar">
            <DialogHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#3065A426] rounded-full">
                  <img src={buildingBlue} alt="building" className="w-4 h-4" />
                </div>
                <DialogTitle className="text-lg font-semibold">
                  {getModalTitle()}
                </DialogTitle>
              </div>
            </DialogHeader>

            <div className="space-y-1">
              {/* Image Upload Section */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden">
                  {uploadedImage ? (
                    <img
                      src={uploadedImage}
                      alt="Property preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#D9D9D9] rounded-full"></div>
                  )}
                </div>
                {modalMode !== "view" && (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload">
                      <Button
                        type="button"
                        className="bg-[#13A5A5] hover:bg-[#13A5A5] text-white px-4 py-2 cursor-pointer"
                        asChild
                      >
                        <span>
                          <img
                            src={uploadImg}
                            alt="upload"
                            className="w-4 h-4"
                          />
                          Upload Image
                        </span>
                      </Button>
                    </label>
                  </div>
                )}
              </div>

              {/* Property Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-[#3065A426] rounded-full">
                    <img
                      src={buildingBlue}
                      alt="building"
                      className="w-4 h-4"
                    />
                  </div>
                  <h3 className="font-semibold text-[#000000]">
                    Property Information
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#7D7D7D]">
                      Property Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="Property Name"
                      value={formData?.propertyName}
                      onChange={(e) =>
                        handleInputChange("propertyName", e.target.value)
                      }
                      className="bg-white border-[#e5e5e5] focus-visible:ring-[#000] focus-visible:border-[#000]"
                      disabled={modalMode === "view"}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#7D7D7D]">
                      Property Type <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={formData?.propertyType}
                      onValueChange={(value) =>
                        handleInputChange("propertyType", value)
                      }
                      disabled={modalMode === "view"}
                    >
                      <SelectTrigger className="bg-white border border-[#E5E5E5] shadow-lg text-[#7D7D7D] font-semibold">
                        <SelectValue placeholder="Property Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="apartment"
                          className="text-[#7D7D7D] font-semibold border-2 border-[#E5E5E5] rounded-lg mb-1 bg-white"
                        >
                          Apartment
                        </SelectItem>
                        <SelectItem
                          value="commercial"
                          className="text-[#7D7D7D] font-semibold border-2 border-[#E5E5E5] rounded-lg mb-1 bg-white"
                        >
                          Commercial
                        </SelectItem>
                        <SelectItem
                          value="villa"
                          className="text-[#7D7D7D] font-semibold border-2 border-[#E5E5E5] rounded-lg mb-1 bg-white"
                        >
                          Villa
                        </SelectItem>
                        <SelectItem
                          value="house"
                          className="text-[#7D7D7D] font-semibold border-2 border-[#E5E5E5] rounded-lg mb-1 bg-white"
                        >
                          House
                        </SelectItem>
                        <SelectItem
                          value="land"
                          className="text-[#7D7D7D] font-semibold border-2 border-[#E5E5E5] rounded-lg bg-white"
                        >
                          Land
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#7D7D7D]">
                      Square Feet
                    </label>
                    <Input
                      placeholder="Enter Square Feet"
                      value={formData.squareFeet}
                      onChange={(e) =>
                        handleInputChange("squareFeet", e.target.value)
                      }
                      className="bg-white border-[#e5e5e5] focus-visible:ring-[#000] focus-visible:border-[#000]"
                      disabled={modalMode === "view"}
                      type="number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#7D7D7D]">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    placeholder="Enter Complete Address"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className="bg-white border-[#e5e5e5] focus-visible:ring-[#000] focus-visible:border-[#000] min-h-[80px]"
                    disabled={modalMode === "view"}
                  />
                </div>
              </div>

              {/* Owner Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-[#3065A426] rounded-full">
                    <img
                      src={buildingBlue}
                      alt="building"
                      className="w-4 h-4"
                    />
                  </div>
                  <h3 className="font-semibold text-[#000000]">
                    Owner Information
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#7D7D7D]">
                      Owner Name
                    </label>
                    <Input
                      placeholder="Enter Owner Name"
                      value={formData.ownerName}
                      onChange={(e) =>
                        handleInputChange("ownerName", e.target.value)
                      }
                      className="bg-white border-[#e5e5e5] focus-visible:ring-[#000] focus-visible:border-[#000]"
                      disabled={modalMode === "view"}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#7D7D7D]">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter Email Address"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="bg-white border-[#e5e5e5] focus-visible:ring-[#000] focus-visible:border-[#000]"
                      disabled={modalMode === "view"}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#7D7D7D]">
                      Phone
                    </label>
                    <Input
                      placeholder="Enter Phone Number"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="bg-white border-[#e5e5e5] focus-visible:ring-[#000] focus-visible:border-[#000]"
                      disabled={modalMode === "view"}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#7D7D7D]">
                      Owner Address
                    </label>
                    <Input
                      placeholder="Enter Owner Address"
                      value={formData.ownerAddress}
                      onChange={(e) =>
                        handleInputChange("ownerAddress", e.target.value)
                      }
                      className="bg-white border-[#e5e5e5] focus-visible:ring-[#000] focus-visible:border-[#000]"
                      disabled={modalMode === "view"}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-3 pt-4">
                {modalMode === "view" ? (
                  <div className="flex justify-end w-full">
                    <Button
                      onClick={() => setIsModalOpen(false)}
                      className="bg-[#B200FF] hover:bg-[#B200FF] text-white px-6 rounded-lg"
                    >
                      Close
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 rounded-lg bg-[#EBEFF3] text-[#7D7D7D] border border-[#7D7D7D] focus-visible:ring-[#000] focus-visible:border-[#000]"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      className="bg-[#B200FF] hover:bg-[#B200FF] text-white px-6 rounded-lg border-[#e5e5e5] focus-visible:ring-[#000] focus-visible:border-[#000]"
                    >
                      {modalMode === "edit"
                        ? "Update Property"
                        : "Create Property"}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent className="max-w-md fixed top-2/3 left-3/4 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-xl p-6">
            <DialogHeader className="space-y-0 pb-2">
              <DialogTitle className="text-xl font-semibold text-[#000000]">
                Delete Property
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <p className="text-[#7D7D7D] leading-relaxed">
                Are you sure you want to delete "{propertyToDelete?.name}"? This
                action cannot be undone and will also remove all associated
                tenants and data.
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
                  onClick={handleDeleteProperty}
                >
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Properties;
