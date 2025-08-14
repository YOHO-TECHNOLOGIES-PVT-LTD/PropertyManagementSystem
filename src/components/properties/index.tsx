import React, { useState } from "react";

const AddUnitModal = () => {
  const [unitName, setUnitName] = useState("");
  const [property, setProperty] = useState("");
  const [sqFeet, setSqFeet] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);

  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[650px] max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold flex items-center gap-2">
              🏢 Add New Unit
            </span>
          </div>
          <button  className="text-gray-500 hover:text-gray-700">
            ✖
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          {/* Upload image */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
              {image ? (
                <img src={image} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-3xl">⬤</span>
              )}
            </div>
            <label className="mt-3">
              <input
                type="file"
                className="hidden"
                accept="image/*"
              
              />
              <span className="px-4 py-2 bg-teal-500 text-white rounded cursor-pointer hover:bg-teal-600">
                ⬆ Upload Image
              </span>
            </label>
          </div>

          {/* Unit Information */}
          <h2 className="font-semibold text-lg flex items-center gap-2 mb-4">
            🏢 Unit Information
          </h2>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Property */}
            <div>
              <label className="block text-sm mb-1">Property</label>
              <select
                value={property}
                onChange={(e) => setProperty(e.target.value)}
                className="border rounded-lg px-3 py-2 w-full"
              >
                <option value="">Select Property</option>
                <option value="Property 1">Property 1</option>
                <option value="Property 2">Property 2</option>
              </select>
            </div>

            {/* Unit Name */}
            <div>
              <label className="block text-sm mb-1">Unit Name</label>
              <input
                type="text"
                placeholder="Unit Name"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
                className="border rounded-lg px-3 py-2 w-full"
              />
            </div>
          </div>

          {/* Sq Feet */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Unit Sq Feet</label>
            <input
              type="number"
              placeholder="23456"
              value={sqFeet}
              onChange={(e) => setSqFeet(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full"
            />
          </div>

          {/* Address */}
          <div className="mb-6">
            <label className="block text-sm mb-1">Unit Address</label>
            <textarea
              placeholder="Enter Complete Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full resize-none"
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between border-t px-6 py-4">
          <button
          
            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            
            className="px-6 py-2 rounded-lg text-white"
            style={{ background: "linear-gradient(to right, #9b30ff, #8000ff)" }}
          >
            Create Unit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUnitModal;
