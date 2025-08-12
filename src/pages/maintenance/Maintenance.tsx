import React from 'react'

import { FiSearch } from "react-icons/fi";


const Maintenance = () => {
    return (
        <div>
            <div className='flex justify-between'>

                <div className="relative w-full max-w-sm">
                    {/* Icon container */}
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-500">
                            <FiSearch size={14} />
                        </div>
                    </div>

                    {/* Input */}
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                </div>

                <div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            All Status
                        </button>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                            All Priority
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Maintenance