import React, { useState } from 'react';
import { Plus, Search, Building2, Users, MapPin, Edit, Eye, Trash2, MoreVertical } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import PropertyModal from '../../modals/PropertyModal';

import type { Property } from '../../types';

const Properties: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);

  const { properties, addProperty, updateProperty, deleteProperty } = useData();

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || property.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleAddProperty = () => {
    setModalMode('create');
    setSelectedProperty(null);
    setShowModal(true);
  };

  const handleEditProperty = (property: Property) => {
    setModalMode('edit');
    setSelectedProperty(property);
    setShowModal(true);
  };

  const handleViewProperty = (property: Property) => {
    setModalMode('view');
    setSelectedProperty(property);
    setShowModal(true);
  };

  const handleDeleteProperty = (property: Property) => {
    setPropertyToDelete(property);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (propertyToDelete) {
      deleteProperty(propertyToDelete.id);
      setShowDeleteConfirm(false);
      setPropertyToDelete(null);
    }
  };

  const handleSaveProperty = (propertyData: any) => {
    if (modalMode === 'create') {
      addProperty(propertyData);
    } else if (modalMode === 'edit' && selectedProperty) {
      updateProperty(selectedProperty.id, propertyData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="text-gray-600">Manage your property portfolio ({properties.length} properties)</p>
        </div>
        <button 
          onClick={handleAddProperty}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Property</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="commercial">Commercial</option>
            <option value="villa">Villa</option>
            <option value="house">House</option>
          </select>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
              <div className="absolute top-4 left-4">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-white text-gray-800">
                  {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <div className="relative">
                  <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50">
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold">{property.name}</h3>
                <div className="flex items-center space-x-1 text-sm opacity-90">
                  <MapPin className="w-3 h-3" />
                  <span>{property.address}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-lg mx-auto mb-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{property.totalUnits}</p>
                  <p className="text-xs text-gray-500">Total Units</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-50 rounded-lg mx-auto mb-2">
                    <Users className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{property.occupiedUnits}</p>
                  <p className="text-xs text-gray-500">Occupied</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-8 h-8 bg-yellow-50 rounded-lg mx-auto mb-2">
                    <Building2 className="w-4 h-4 text-yellow-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{property.vacantUnits}</p>
                  <p className="text-xs text-gray-500">Vacant</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Occupancy Rate</span>
                  <span>{property.occupancyRate.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${property.occupancyRate}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Owner</p>
                <p className="text-sm text-gray-600">{property.owner.name}</p>
                <p className="text-xs text-gray-500">{property.owner.phone}</p>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleViewProperty(property)}
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button 
                  onClick={() => handleEditProperty(property)}
                  className="bg-gray-100 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteProperty(property)}
                  className="bg-red-100 text-red-700 py-2 px-3 rounded-md hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterType !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by adding your first property.'
            }
          </p>
          {!searchTerm && filterType === 'all' && (
            <button
              onClick={handleAddProperty}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Property
            </button>
          )}
        </div>
      )}

      {/* Property Modal */}
      <PropertyModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveProperty}
        property={selectedProperty as Property | null | undefined}
        mode={modalMode}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Property</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{propertyToDelete?.name}"? This action cannot be undone and will also remove all associated tenants and data.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;