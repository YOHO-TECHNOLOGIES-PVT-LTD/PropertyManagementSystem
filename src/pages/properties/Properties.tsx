import { Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../components/ui/select';
import { useState } from 'react';
import propertyImg1 from '../../assets/properties/property1.png';
import propertyImg2 from '../../assets/properties/property2.png';
import propertyImg3 from '../../assets/properties/property3.png';
import propertyImg4 from '../../assets/properties/property4.png';
import buildingBlue from '../../assets/properties/building-blue.png';
import buildingGreen from '../../assets/properties/building-green.png';
import buildingPink from '../../assets/properties/building-pink.png';
import locationImg from '../../assets/properties/location.png';
import callImg from '../../assets/properties/call.svg';
import editImg from '../../assets/properties/edit.png';
import trashImg from '../../assets/properties/trash.png';
import searchImg from '../../assets/properties/search.png';
import eyeImg from '../../assets/properties/eye.png';
import uploadImg from '../../assets/properties/upload.png';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../../components/ui/dialog';
import { Textarea } from '../../components/ui/textarea';

type ModalMode = 'add' | 'view' | 'edit';

const properties = [
	{
		id: 1,
		name: 'Sunrise Apartments',
		location: '123 Main Street, Downtown',
		image: propertyImg1,
		tag: 'Apartments',
		owner: {
			name: 'John Smith',
			role: 'OWNER/RENTAL',
			avatar: '/professional-man.png',
			phone: '+91 9876543210',
			email: 'john@example.com',
			address: '123 Owner Street, Downtown',
		},
		stats: {
			totalUnits: 55,
			totalSquareFeet: 3000,
			occupiedUnits: 50,
			vacantUnits: 5,
			occupancyRate: 83.3,
		},
	},
	{
		id: 2,
		name: 'Green Valley Complex',
		location: '789 Pine Avenue, Westside',
		image: propertyImg2,
		tag: 'Apartments',
		owner: {
			name: 'Sarah Johnson',
			role: 'OWNER/RENTAL',
			avatar: '/professional-woman-diverse.png',
			phone: '+91 9876543210',
			email: 'sarah@example.com',
			address: '789 Owner Avenue, Westside',
		},
		stats: {
			totalUnits: 36,
			totalSquareFeet: 4500,
			occupiedUnits: 34,
			vacantUnits: 2,
			occupancyRate: 94.4,
		},
	},
	{
		id: 3,
		name: 'Rose Cottage Villa',
		location: '123 Main Street, Downtown',
		image: propertyImg3,
		tag: 'Villa',
		owner: {
			name: 'William',
			role: 'OWNER/RENTAL',
			avatar: '/bearded-man.png',
			phone: '+91 9876543210',
			email: 'william@example.com',
			address: '123 Owner Street, Downtown',
		},
		stats: {
			totalUnits: 12,
			totalSquareFeet: 6000,
			occupiedUnits: 12,
			vacantUnits: 0,
			occupancyRate: 48.3,
		},
	},
	{
		id: 4,
		name: 'Orchard House',
		location: '789 Pine Avenue, Westside',
		image: propertyImg4,
		tag: 'House',
		owner: {
			name: 'Michael',
			role: 'OWNER/RENTAL',
			avatar: '/young-professional-man.png',
			phone: '+91 9876543210',
			email: 'michael@example.com',
			address: '789 Owner Avenue, Westside',
		},
		stats: {
			totalUnits: 43,
			totalSquareFeet: 2000,
			occupiedUnits: 39,
			vacantUnits: 4,
			occupancyRate: 72.3,
		},
	},
];

function Properties() {
	const [selectedType, setSelectedType] = useState<string>('All Types');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [propertyToDelete, setPropertyToDelete] = useState<
		(typeof properties)[0] | null
	>(null);
	const [modalMode, setModalMode] = useState<ModalMode>('add');
	const [selectedProperty, setSelectedProperty] = useState<
		(typeof properties)[0] | null
	>(null);
	const [uploadedImage, setUploadedImage] = useState<string | null>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [formData, setFormData] = useState({
		propertyName: '',
		propertyType: '',
		totalUnits: '',
		squareFeet: '',
		address: '',
		ownerName: '',
		email: '',
		phone: '',
		ownerAddress: '',
	});

	const filteredProperties = properties.filter((property) => {
		if (selectedType === 'All Types') return true;
		if (selectedType === 'Apartments') return property.tag === 'Apartment';
		return property.tag === selectedType;
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
		}
	};

	const openAddModal = () => {
		setModalMode('add');
		setSelectedProperty(null);
		setFormData({
			propertyName: '',
			propertyType: '',
			totalUnits: '',
			squareFeet: '',
			address: '',
			ownerName: '',
			email: '',
			phone: '',
			ownerAddress: '',
		});
		setUploadedImage(null);
		setImageFile(null);
		setIsModalOpen(true);
	};

	const openViewModal = (property: (typeof properties)[0]) => {
		setModalMode('view');
		setSelectedProperty(property);
		setFormData({
			propertyName: property.name,
			propertyType: property.stats.totalUnits > 0 ? 'Apartments' : 'House',
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

	const openEditModal = (property: (typeof properties)[0]) => {
		setModalMode('edit');
		setSelectedProperty(property);
		setFormData({
			propertyName: property.name,
			propertyType: property.stats.totalUnits > 0 ? 'Apartments' : 'House',
			totalUnits: property.stats.totalUnits.toString(),
			squareFeet: property.stats.totalSquareFeet.toString(),
			address: property.location,
			ownerName: property.owner.name,
			email: property.owner.email || '',
			phone: property.owner.phone,
			ownerAddress: property.owner.address || '',
		});
		setUploadedImage(property.image);
		setImageFile(null);
		setIsModalOpen(true);
	};

	const handleSubmit = async () => {
		const submitFormData = new FormData();

		submitFormData.append('propertyName', formData.propertyName);
		submitFormData.append('propertyType', formData.propertyType);
		submitFormData.append('totalUnits', formData.totalUnits);
		submitFormData.append('squareFeet', formData.squareFeet);
		submitFormData.append('address', formData.address);
		submitFormData.append('ownerName', formData.ownerName);
		submitFormData.append('email', formData.email);
		submitFormData.append('phone', formData.phone);
		submitFormData.append('ownerAddress', formData.ownerAddress);

		if (imageFile) {
			submitFormData.append('propertyImage', imageFile);
		}

		try {
			if (modalMode === 'edit') {
				console.log('Updating property:', selectedProperty?.name);
				console.log('Updated form data:', formData);
			} else {
				console.log('Creating new property');
				console.log('Form data:', formData);
			}

			console.log('Image file:', imageFile);
			console.log('FormData object:', submitFormData);

			setIsModalOpen(false);
			setUploadedImage(null);
			setImageFile(null);
			setFormData({
				propertyName: '',
				propertyType: '',
				totalUnits: '',
				squareFeet: '',
				address: '',
				ownerName: '',
				email: '',
				phone: '',
				ownerAddress: '',
			});
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	const handleDeleteClick = (property: (typeof properties)[0]) => {
		setPropertyToDelete(property);
		setIsDeleteModalOpen(true);
	};

	const handleDeleteProperty = () => {
		if (propertyToDelete) {
			console.log('Deleting property:', propertyToDelete.name);
			setIsDeleteModalOpen(false);
			setPropertyToDelete(null);
		}
	};

	const getModalTitle = () => {
		switch (modalMode) {
			case 'add':
				return 'Add New Property';
			case 'view':
				return 'Property Details';
			case 'edit':
				return 'Edit Property';
			default:
				return 'Property';
		}
	};

	return (
		<div className='min-h-screen bg-gray-50 p-6'>
			<div className='max-w-7xl mx-auto'>
				{/* Header */}
				<div className='mb-8'>
					<div className='flex items-center justify-between mb-4'>
						<div>
							<h1 className='text-2xl font-bold text-[#000000]'>Properties</h1>
							<p className='text-gray-600 text-sm mt-2'>
								Manage Your Property Portfolio (4 Properties)
							</p>
						</div>

						<Button
							className='bg-purple-600 hover:bg-purple-700 text-white px-6'
							onClick={openAddModal}
						>
							<Plus className='w-4 h-4 mr-2' />
							Add Property
						</Button>
					</div>

					{/* Search Bar and Filter */}
					<div className='flex items-center gap-4 justify-between'>
						<div className='relative max-w-md flex-1'>
							<img
								src={searchImg}
								className='absolute left-3 top-6.5 transform -translate-y-1/2 text-gray-400 w-4 h-4'
							/>
							<Input
								placeholder='Search'
								className='pl-10 bg-[#b200ff0d] border-[#b200ff0d] text-[#333333] placeholder-[#333333]'
							/>
						</div>
						<Select value={selectedType} onValueChange={setSelectedType}>
							<SelectTrigger className='w-[140px] bg-[#B200FF1A] border-[#B200FF1A] text-[#B200FF] hover:bg-[#B200FF1A]'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent className='bg-white border border-gray-200 shadow-lg'>
								<SelectItem
									value='All Types'
									className='text-[#7D7D7D] font-semibold border-2 border-[#E5E5E5] rounded-lg mb-1'
								>
									All Types
								</SelectItem>
								<SelectItem
									value='Apartments'
									className='text-[#7D7D7D] font-semibold border-2 border-[#E5E5E5] rounded-lg mb-1'
								>
									Apartments
								</SelectItem>
								<SelectItem
									value='Commercial'
									className='text-[#7D7D7D] font-semibold border-2 border-[#E5E5E5] rounded-lg mb-1'
								>
									Commercial
								</SelectItem>
								<SelectItem
									value='Villa'
									className='text-[#7D7D7D] font-semibold border-2 border-[#E5E5E5] rounded-lg mb-1'
								>
									Villa
								</SelectItem>
								<SelectItem
									value='House'
									className='text-[#7D7D7D] font-semibold border-2 border-[#E5E5E5] rounded-lg mb-1'
								>
									House
								</SelectItem>
								<SelectItem
									value='Land'
									className='text-[#7D7D7D] font-semibold border-2 border-[#E5E5E5] rounded-lg'
								>
									Land
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Properties Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{filteredProperties.map((property) => (
						<Card
							key={property.id}
							className='bg-white border-0 shadow-sm hover:shadow-md transition-shadow'
						>
							<CardContent className='p-0'>
								{/* Owner Info */}
								<div className='flex items-center justify-between mb-3 mx-3 -mt-3'>
									<div className='flex items-center gap-3'>
										<div>
											<p className='font-medium text-[#000000] text-sm'>
												{property.owner.name}
											</p>
											<div className='flex items-center gap-2 mt-2'>
												<img
													src={callImg}
													alt='phone icon'
													className='w-4 h-4 object-cover'
												/>
												<p className='text-xs text-gray-500'>
													{property.owner.phone}
												</p>
											</div>
										</div>
									</div>
									<div className='flex gap-2'>
										<Button
											size='sm'
											variant='outline'
											className='w-8 h-8 p-0 rounded-full border-[#0062FF] bg-[#0062FF]'
											onClick={() => openEditModal(property)}
										>
											<img src={editImg} className='w-4 h-4' alt='edit' />
										</Button>
										<Button
											size='sm'
											variant='outline'
											className='w-8 h-8 p-0 rounded-full border-[#EE2F2F] bg-[#EE2F2F]'
											onClick={() => handleDeleteClick(property)}
										>
											<img src={trashImg} className='w-4 h-4' alt='trash' />
										</Button>
									</div>
								</div>

								{/* Property Image */}
								<div className='relative'>
									<img
										src={property.image}
										alt={property.name}
										className='w-full h-58 object-cover rounded-xl'
									/>
									<Badge
										variant='secondary'
										className='absolute top-3 right-3 bg-white text-[#B200FF] hover:bg-white/90'
									>
										{property.tag}
									</Badge>
								</div>

								<div className='p-2'>
									{/* Property Info */}
									<div className='mb-4 flex items-center justify-between mx-1'>
										<h3 className='font-semibold text-[#000000] mb-1'>
											{property.name}
										</h3>
										<div className='flex items-center gap-1'>
											<img
												src={locationImg}
												alt='location icon'
												className='w-4 h-4'
											/>
											<p className='text-sm text-[#7D7D7D]'>
												{property.location}
											</p>
										</div>
									</div>

									{/* Stats */}
									<div className='grid grid-cols-2 gap-4 mb-3 place-items-center'>
										<div className='text-center flex items-center gap-2 w-48'>
											<div className='mb-1 bg-[#006AFF26] p-2 rounded-full'>
												<img
													src={buildingBlue}
													alt='building'
													className='w-4 h-4'
												/>
											</div>
											<p className='font-semibold text-[#716F6F]'>
												Total Units{' '}
												<span className='text-[#006AFF] ml-1'>
													{property.stats.totalUnits}
												</span>
											</p>
										</div>
										<div className='text-center flex items-center gap-2 w-48'>
											<div className='mb-1 bg-[#1EC95A26] p-2 rounded-full'>
												<img
													src={buildingGreen}
													alt='building'
													className='w-4 h-4'
												/>
											</div>
											<p className='font-semibold text-[#716F6F]'>
												Total Sq Ft{' '}
												<span className='text-[#1EC95A] ml-1'>
													{property.stats.totalSquareFeet}
												</span>
											</p>
										</div>
										<div className='text-center flex items-center gap-2 w-48'>
											<div className='mb-1 bg-[#FF00E126] p-2 rounded-full'>
												<img
													src={buildingPink}
													alt='building'
													className='w-4 h-4'
												/>
											</div>
											<p className='font-semibold text-[#716F6F]'>
												Occupied{' '}
												<span className='text-[#FF00E1] ml-1'>
													{property.stats.occupiedUnits}
												</span>
											</p>
										</div>
										<div className='text-center flex items-center gap-2 w-48'>
											<div className='mb-1 bg-[#006AFF26] p-2 rounded-full'>
												<img
													src={buildingBlue}
													alt='building'
													className='w-4 h-4'
												/>
											</div>
											<p className='font-semibold text-[#716F6F]'>
												Vacant{' '}
												<span className='text-[#006AFF] ml-1'>
													{property.stats.vacantUnits}
												</span>
											</p>
										</div>
									</div>

									{/* Occupancy Rate */}
									<div className='mb-4'>
										<div className='flex justify-between items-center mb-2'>
											<span className='text-xs text-gray-600'>
												Occupancy Rate
											</span>
											<span className='text-xs font-medium text-[#12804D]'>
												{property.stats.occupancyRate}%
											</span>
										</div>
										<Progress
											value={property.stats.occupancyRate}
											className='h-2 [&>div]:bg-[#12804D]'
										/>
									</div>

									{/* View Button */}
									<Button
										className='w-full bg-[#B200FF] hover:bg-[#B200FF] text-white'
										onClick={() => openViewModal(property)}
									>
										<img src={eyeImg} alt='eye' className='w-4 h-4' />
										<p className=''>View</p>
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
					<DialogContent className='min-w-2xl max-h-[90vh] overflow-y-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-xl'>
						<DialogHeader className='flex flex-row items-center justify-between space-y-0'>
							<div className='flex items-center gap-2'>
								<div className='p-2 bg-[#3065A426] rounded-full'>
									<svg
										className='w-4 h-4'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
										/>
									</svg>
								</div>
								<DialogTitle className='text-lg font-semibold'>
									{getModalTitle()}
								</DialogTitle>
							</div>
						</DialogHeader>

						<div className='space-y-1'>
							{/* Image Upload Section */}
							<div className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'>
								<div className='w-16 h-16 rounded-full flex items-center justify-center overflow-hidden'>
									{uploadedImage ? (
										<img
											src={uploadedImage || '/placeholder.svg'}
											alt='Property preview'
											className='w-full h-full object-cover'
										/>
									) : (
										<div className='w-full h-full bg-[#D9D9D9] rounded-full'></div>
									)}
								</div>
								{modalMode !== 'view' && (
									<div>
										<input
											type='file'
											accept='image/*'
											onChange={handleImageUpload}
											className='hidden'
											id='image-upload'
										/>
										<label htmlFor='image-upload'>
											<Button
												type='button'
												className='bg-[#13A5A5] hover:bg-[#13A5A5] text-white px-4 py-2 cursor-pointer'
												asChild
											>
												<span>
													<svg
														className='w-4 h-4 mr-2'
														fill='none'
														stroke='currentColor'
														viewBox='0 0 24 24'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={2}
															d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
														/>
													</svg>
													Upload Image
												</span>
											</Button>
										</label>
									</div>
								)}
							</div>

							{/* Property Information Section */}
							<div className='space-y-4'>
								<div className='flex items-center gap-2 mb-4'>
									<div className='p-2 bg-[#3065A426] rounded-full'>
										<svg
											className='w-4 h-4'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
											/>
										</svg>
									</div>
									<h3 className='font-semibold text-[#000000]'>
										Property Information
									</h3>
								</div>

								<div className='grid grid-cols-2 gap-4'>
									<div className='space-y-2'>
										<label className='text-sm font-medium text-[#7D7D7D]'>
											Property Name
										</label>
										<Input
											placeholder='Property Name'
											value={formData.propertyName}
											onChange={(e) =>
												handleInputChange('propertyName', e.target.value)
											}
											className='bg-white border-[#e5e5e5] focus-visible:ring-[#000] focus-visible:border-[#000]'
											disabled={modalMode === 'view'}
										/>
									</div>
									<div className='space-y-2'>
										<label className='text-sm font-medium text-[#7D7D7D]'>
											Property Type
										</label>
										<Select
											value={formData.propertyType}
											onValueChange={(value) =>
												handleInputChange('propertyType', value)
											}
											disabled={modalMode === 'view'}
										>
											<SelectTrigger className='bg-white text-[#7D7D7D]  border-[#e5e5e5] focus-visible:ring-[#000] focus-visible:border-[#000]'>
												<SelectValue placeholder='Property Type' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='Apartments'>Apartments</SelectItem>
												<SelectItem value='Commercial'>Commercial</SelectItem>
												<SelectItem value='Villa'>Villa</SelectItem>
												<SelectItem value='House'>House</SelectItem>
												<SelectItem value='Land'>Land</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>

								<div className='grid grid-cols-2 gap-4'>
									<div className='space-y-2'>
										<label className='text-sm font-medium text-[#7D7D7D]'>
											Total Units
										</label>
										<Input
											placeholder='Enter Total Units'
											value={formData.totalUnits}
											onChange={(e) =>
												handleInputChange('totalUnits', e.target.value)
											}
											className='bg-white border-[#e5e5e5] focus-visible:ring-[#000] focus-visible:border-[#000]'
											disabled={modalMode === 'view'}
										/>
									</div>
									<div className='space-y-2'>
										<label className='text-sm font-medium text-[#7D7D7D]'>
											Square Feet
										</label>
										<Input
											placeholder='Enter Square Feet'
											value={formData.squareFeet}
											onChange={(e) =>
												handleInputChange('squareFeet', e.target.value)
											}
											className='bg-white border-[#e5e5e5] focus-visible:ring-[#000] focus-visible:border-[#000]'
											disabled={modalMode === 'view'}
										/>
									</div>
								</div>

								<div className='space-y-2'>
									<label className='text-sm font-medium text-[#7D7D7D]'>
										Address
									</label>
									<Textarea
										placeholder='Enter Complete Address'
										value={formData.address}
										onChange={(e) =>
											handleInputChange('address', e.target.value)
										}
										className='bg-white border-[#e5e5e5] focus-visible:ring-[#000] focus-visible:border-[#000] min-h-[80px]'
										disabled={modalMode === 'view'}
									/>
								</div>
							</div>

							{/* Owner Information Section */}
							<div className='space-y-4'>
								<div className='flex items-center gap-2 mb-4'>
									<div className='p-2 bg-[#3065A426] rounded-full'>
										<svg
											className='w-4 h-4'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
											/>
										</svg>
									</div>
									<h3 className='font-semibold text-[#000000]'>
										Owner Information
									</h3>
								</div>

								<div className='grid grid-cols-2 gap-4'>
									<div className='space-y-2'>
										<label className='text-sm font-medium text-[#7D7D7D]'>
											Owner Name
										</label>
										<Input
											placeholder='Enter Owner Name'
											value={formData.ownerName}
											onChange={(e) =>
												handleInputChange('ownerName', e.target.value)
											}
											className='bg-white border-[#e5e5e5] focus-visible:ring-[#000] focus-visible:border-[#000]'
											disabled={modalMode === 'view'}
										/>
									</div>
									<div className='space-y-2'>
										<label className='text-sm font-medium text-[#7D7D7D]'>
											Email
										</label>
										<Input
											type='email'
											placeholder='Enter Email Address'
											value={formData.email}
											onChange={(e) =>
												handleInputChange('email', e.target.value)
											}
											className='bg-white border-[#e5e5e5] focus-visible:ring-[#000] focus-visible:border-[#000]'
											disabled={modalMode === 'view'}
										/>
									</div>
								</div>

								<div className='grid grid-cols-2 gap-4'>
									<div className='space-y-2'>
										<label className='text-sm font-medium text-[#7D7D7D]'>
											Phone
										</label>
										<Input
											placeholder='Enter Phone Number'
											value={formData.phone}
											onChange={(e) =>
												handleInputChange('phone', e.target.value)
											}
											className='bg-white border-[#e5e5e5] focus-visible:ring-[#000] focus-visible:border-[#000]'
											disabled={modalMode === 'view'}
										/>
									</div>
									<div className='space-y-2'>
										<label className='text-sm font-medium text-[#7D7D7D]'>
											Owner Address
										</label>
										<Input
											placeholder='Enter Owner Address'
											value={formData.ownerAddress}
											onChange={(e) =>
												handleInputChange('ownerAddress', e.target.value)
											}
											className='bg-white border-[#e5e5e5] focus-visible:ring-[#000] focus-visible:border-[#000]'
											disabled={modalMode === 'view'}
										/>
									</div>
								</div>
							</div>

							<div className='flex justify-between gap-3 pt-4'>
								{modalMode === 'view' ? (
									<div className='flex justify-end w-full'>
										<Button
											onClick={() => setIsModalOpen(false)}
											className='bg-[#B200FF] hover:bg-[#B200FF] text-white px-6 rounded-lg'
										>
											Close
										</Button>
									</div>
								) : (
									<>
										<Button
											variant='outline'
											onClick={() => setIsModalOpen(false)}
											className='px-6 rounded-lg bg-[#EBEFF3] text-[#7D7D7D] border border-[#7D7D7D] focus-visible:ring-[#000] focus-visible:border-[#000]'
										>
											Cancel
										</Button>
										<Button
											onClick={handleSubmit}
											className='bg-[#B200FF] hover:bg-[#B200FF] text-white px-6 rounded-lg border-[#e5e5e5] focus-visible:ring-[#000] focus-visible:border-[#000]'
										>
											{modalMode === 'edit'
												? 'Update Property'
												: 'Create Property'}
										</Button>
									</>
								)}
							</div>
						</div>
					</DialogContent>
				</Dialog>

				{/* Delete Confirmation Modal */}
				<Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
					<DialogContent className='max-w-md fixed top-2/3 left-3/4 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-xl p-6'>
						<DialogHeader className='space-y-0 pb-2'>
							<DialogTitle className='text-xl font-semibold text-[#000000]'>
								Delete Property
							</DialogTitle>
						</DialogHeader>

						<div className='space-y-4'>
							<p className='text-[#7D7D7D] leading-relaxed'>
								Are you sure you want to delete "{propertyToDelete?.name}"? This
								action cannot be undone and will also remove all associated
								tenants and data.
							</p>

							<div className='flex gap-3 justify-end'>
								<Button
									variant='outline'
									onClick={() => setIsDeleteModalOpen(false)}
									className='px-6 rounded-lg bg-[#EBEFF3] text-[#7D7D7D] border border-[#7D7D7D] focus-visible:ring-[#000] focus-visible:border-[#000]'
								>
									Cancel
								</Button>
								<Button
									className='bg-[#EE2F2F] hover:bg-[#EE2F2F] text-white focus-visible:ring-[#000] focus-visible:border-[#000] px-6 rounded-lg'
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
