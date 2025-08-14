import { FaEdit, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchUnitsByPropertyId, fetchUpdateUnit } from "../../../features/Properties/Reducers/PropertiesThunk";
import { useEffect, useState } from "react";
import { selectUnits } from "../../../features/Properties/Reducers/Selectors";
import { IoMdArrowBack } from "react-icons/io";
import { Building2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";

const ViewAllUnits = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { property } = location.state || {};
  const dispatch = useDispatch<any>();
  const units = useSelector(selectUnits);

  // Edit Unit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<any>(null);
  const [unitForm, setUnitForm] = useState({
    unit_name: "",
    unit_sqft: "",
    unit_address: "",
  });

  useEffect(() => {
    if (property?._id) {
      dispatch(fetchUnitsByPropertyId(property._id));
    }
  }, [dispatch, property?._id]);

  const handleEditClick = (unit: any) => {
    setEditingUnit(unit);
    setUnitForm({
      unit_name: unit.unit_name,
      unit_sqft: unit.unit_sqft,
      unit_address: unit.unit_address,
    });
    setIsEditModalOpen(true);
  };

  const handleUnitFormChange = (field: string, value: string) => {
    setUnitForm(prev => ({ ...prev, [field]: value }));
  };

  const handleUnitUpdate = async () => {
    try {
      if ( !editingUnit?.uuid) {
        console.error("Unit ID not found");
        return;
      }

      await dispatch(fetchUpdateUnit( editingUnit.uuid, unitForm));
      setIsEditModalOpen(false);
      
      // Refresh units data
      if (property?._id) {
        dispatch(fetchUnitsByPropertyId(property._id));
      }
    } catch (error) {
      console.error("Error updating unit:", error);
    }
  };

  const propertyData = property || {
    name: "Sunrise Apartment",
    tag: "Apartment",
    location: "123, Main Street OMR, Chennai",
    stats: {
      totalUnits: 25,
      occupiedUnits: 1,
      vacantUnits: 24,
      totalSquareFeet: 1000,
    },
    owner: {
      name: "John Smith",
      email: "john@example.com",
      phone: "+91 9834656724",
      address: "123, Main Street OMR, Chennai",
    },
  };

  return (
    <div className="bg-white rounded-lg w-full h-full overflow-y-auto no-scrollbar p-6 relative shadow-lg">
      {/* Close Button */}
      <button
        onClick={() => navigate(`/properties`)}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800"
      >
        <IoMdArrowBack size={14} />
      </button>

      {/* Header */}
      <div className="flex items-center gap-2 mb-4 border-b pb-2">
        <Building2 className="text-blue-500" />
        <h2 className="text-lg font-semibold">{propertyData.name} - Units</h2>
      </div>

      {/* Property Information */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="text-gray-500" />
          <h3 className="text-base font-semibold">Property Information</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Property Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={propertyData.name}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Property Type</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={propertyData.tag}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Total Units</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={propertyData.stats.totalUnits}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Occupied</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={propertyData.stats.occupiedUnits}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Vacant</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={propertyData.stats.vacantUnits}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Square Feet</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={`${propertyData.stats.totalSquareFeet} Sq`}
              readOnly
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm mb-1">Address</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={propertyData.location}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Owner Information */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <FaUser className="text-gray-500" />
          <h3 className="text-base font-semibold">Owner Information</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Owner Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={propertyData.owner.name}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              value={propertyData.owner.email}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Phone</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={propertyData.owner.phone}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Owner Address</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={propertyData.owner.address}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Units Table */}
      <div className="mb-6">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#D600A8] text-white text-sm">
              <th className="px-4 py-2 text-left">Unit Name</th>
              <th className="px-4 py-2 text-left">Square Feet</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Status</th>
              {/* <th className="px-4 py-2 text-left">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {units?.length > 0 ? (
              units?.map((unit: any) => (
                <tr key={unit?._id || unit?.uuid} className="border-t">
                  <td className="px-4 py-2">{unit?.unit_name}</td>
                  <td className="px-4 py-2">{unit?.unit_sqft}</td>
                  <td className="px-4 py-2">{unit?.unit_address}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        unit?.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {unit?.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  {/* <td className="px-4 py-2">
                    <button 
                      className="text-blue-500 hover:underline"
                      onClick={() => handleEditClick(unit)}
                    >
                      <FaEdit size={20}/>
                    </button>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                  No units found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Unit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="min-w-2xl max-h-[90vh] overflow-y-auto fixed top-11/12 left-12/16 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-xl no-scrollbar">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#3065A426] rounded-full">
                <Building2 className="w-4 h-4 text-[#3065A4]" />
              </div>
              <DialogTitle className="text-lg font-semibold">
                Edit Unit
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-4">
            {/* Unit Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-[#3065A426] rounded-full">
                  <Building2 className="w-4 h-4 text-[#3065A4]" />
                </div>
                <h3 className="font-semibold text-[#000000]">
                  Unit Information
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#7D7D7D]">
                    Unit Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Unit Name"
                    value={unitForm.unit_name}
                    onChange={(e) =>
                      handleUnitFormChange("unit_name", e.target.value)
                    }
                    className="bg-white border-[#e5e5e5] focus-visible:ring-[#000] focus-visible:border-[#000]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#7D7D7D]">
                    Square Feet <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Enter Square Feet"
                    value={unitForm.unit_sqft}
                    onChange={(e) =>
                      handleUnitFormChange("unit_sqft", e.target.value)
                    }
                    className="bg-white border-[#e5e5e5] focus-visible:ring-[#000] focus-visible:border-[#000]"
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
                  value={unitForm.unit_address}
                  onChange={(e) =>
                    handleUnitFormChange("unit_address", e.target.value)
                  }
                  className="bg-white border-[#e5e5e5] focus-visible:ring-[#000] focus-visible:border-[#000] min-h-[80px]"
                />
              </div>
            </div>

            <div className="flex justify-between gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
                className="px-6 rounded-lg bg-[#EBEFF3] text-[#7D7D7D] border border-[#7D7D7D] focus-visible:ring-[#000] focus-visible:border-[#000]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUnitUpdate}
                className="bg-[#B200FF] hover:bg-[#B200FF] text-white px-6 rounded-lg border-[#e5e5e5] focus-visible:ring-[#000] focus-visible:border-[#000]"
              >
                Update Unit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Close Button */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate(`/properties`)}
          className="bg-[#B200FF] text-white px-6 py-2 rounded hover:bg-[#B200FF]/90"
        >
          Back to Properties
        </button>
      </div>
    </div>
  );
};

export default ViewAllUnits;