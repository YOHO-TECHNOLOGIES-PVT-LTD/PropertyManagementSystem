import { useNavigate } from "react-router-dom";
import { FONTS } from "../../../constants/ui constants";

const ViewAllUnits = () => {

    const units = [
        {
            id: 1,
            property_name: "Adamsmith",
            unit_name: "101",
            unit_sq_feet: 1880,
            unit_address: "12, Main Road, OMR Chennai",
        },
        {
            id: 2,
            property_name: "Sunrise Apartments",
            unit_name: "B-204",
            unit_sq_feet: 1250,
            unit_address: "45, Beach Road, Chennai",
        },
    ];

    const navigate = useNavigate();


    return (
        <div>

                <div className="p-4 rounded-xl  bg-green-200 shadow-lg w-full ">
                    <h2 style={FONTS.headers}>View All Units</h2>

                    <div className="flex justify-end">
                        <button
                            onClick={() => navigate("/properties")}

                            type="button"
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Header */}
                    <div className="grid grid-cols-5 bg-purple-600 text-white rounded-t-xl font-semibold text-center">
                        <div className="py-3 rounded-tl-xl">Property Name</div>
                        <div className="py-3">Unit Name</div>
                        <div className="py-3">Unit Sq Feet</div>
                        <div className="py-3">Unit Address</div>
                        <div className="py-3 rounded-tr-xl">Actions</div>
                    </div>

                    {/* Rows */}
                    {units.map((unit) => (
                        <div
                            key={unit.id}
                            className="grid grid-cols-5 items-center text-center border-t border-gray-200"
                        >
                            <div className="py-4">{unit.property_name}</div>
                            <div className="py-4">{unit.unit_name}</div>
                            <div className="py-4">{unit.unit_sq_feet}</div>
                            <div className="py-4">{unit.unit_address}</div>
                            <div className="py-4">
                                <button
                                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                                >
                                    ✏️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            
        </div>
    )
}
export default ViewAllUnits