

import { FaRegBuilding, FaUser, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ViewAllUnits = () => {

    const navigate = useNavigate();

    const unitData = [
        {
            propertyName: "AdamSmith",
            unitName: "101",
            unitSqFeet: "1600",
            unitAddress: "12, Main Road, OMR Chennai",
        },
        {
            propertyName: "Sunrise Apartment",
            unitName: "102",
            unitSqFeet: "1400",
            unitAddress: "14, Main Road, OMR Chennai",
        },
    ];

    return (
        <div>
            <div className="bg-white rounded-lg w-full h-full overflow-y-auto no-scrollbar p-6 relative shadow-lg">
                {/* Close Button */}
                <button
                    onClick={() => navigate(`/properties`)}

                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800"

                >
                    <FaTimes size={14} />
                </button>

                {/* Header */}
                <div className="flex items-center gap-2 mb-4 border-b pb-2">
                    <FaRegBuilding className="text-blue-500" />
                    <h2 className="text-lg font-semibold">Property Details</h2>
                </div>

                {/* Property Information */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <FaRegBuilding className="text-gray-500" />
                        <h3 className="text-base font-semibold">Property Information</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1">Property Name</label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                defaultValue="Sunrise Apartment"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Property Type</label>
                            <select className="w-full border rounded px-3 py-2">
                                <option>Apartment</option>
                                <option>Villa</option>
                                <option>House</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Total Units</label>
                            <input
                                type="number"
                                className="w-full border rounded px-3 py-2"
                                defaultValue="25"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Occupied</label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                defaultValue="Owner Occupied"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Vacant</label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Enter Vacant"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Square Feet</label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                defaultValue="1000 Sq"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm mb-1">Address</label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                defaultValue="123, Main Street OMR, Chennai"
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
                                defaultValue="John Smith"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full border rounded px-3 py-2"
                                defaultValue="john@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Phone</label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                defaultValue="+91 9834656724"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Owner Address</label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                defaultValue="123, Main Street OMR, Chennai"
                            />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="mb-6">
                    <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-[#D600A8] text-white text-sm">
                                <th className="px-4 py-2 text-left">Property Name</th>
                                <th className="px-4 py-2 text-left">Unit Name</th>
                                <th className="px-4 py-2 text-left">Unit Sq Feet</th>
                                <th className="px-4 py-2 text-left">Unit Address</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {unitData.map((unit, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-2">{unit.propertyName}</td>
                                    <td className="px-4 py-2">{unit.unitName}</td>
                                    <td className="px-4 py-2">{unit.unitSqFeet}</td>
                                    <td className="px-4 py-2">{unit.unitAddress}</td>
                                    <td className="px-4 py-2">
                                        <button className="text-blue-500 hover:underline">
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Close Button */}
                <div className="flex justify-end">
                    <button

                        className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewAllUnits;
