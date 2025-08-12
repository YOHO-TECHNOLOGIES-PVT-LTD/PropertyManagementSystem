'use client';

import { Search, Plus, MessageCircle, Phone } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';

const properties = [
	{
		id: 1,
		name: 'Sunrise Apartments',
		location: '123 Main Street, Downtown',
		image: '/images/sunrise-apartments.png',
		owner: {
			name: 'John Smith',
			role: 'OWNER/RENTAL',
			avatar: '/professional-man.png',
		},
		stats: {
			totalUnits: 55,
			occupied: 50,
			vacant: 5,
		},
		occupancyRate: 91,
		tag: 'Apartment',
	},
	{
		id: 2,
		name: 'Green Valley Complex',
		location: '789 Pine Avenue, Westside',
		image: '/images/green-valley-complex.png',
		owner: {
			name: 'Sarah Johnson',
			role: 'OWNER/RENTAL',
			avatar: '/professional-woman-diverse.png',
		},
		stats: {
			totalUnits: 36,
			occupied: 34,
			vacant: 2,
		},
		occupancyRate: 94,
		tag: 'Commercial',
	},
	{
		id: 3,
		name: 'Rose Cottage Villa',
		location: '123 Main Street, Downtown',
		image: '/images/rose-cottage-villa.png',
		owner: {
			name: 'William',
			role: 'OWNER/RENTAL',
			avatar: '/professional-bearded-man.png',
		},
		stats: {
			totalUnits: 12,
			occupied: 12,
			vacant: 0,
		},
		occupancyRate: 100,
		tag: 'Villa',
	},
	{
		id: 4,
		name: 'Orchard House',
		location: '789 Pine Avenue, Westside',
		image: '/images/orchard-house.png',
		owner: {
			name: 'Michael',
			role: 'OWNER/RENTAL',
			avatar: '/young-professional-man.png',
		},
		stats: {
			totalUnits: 43,
			occupied: 39,
			vacant: 4,
		},
		occupancyRate: 91,
		tag: 'House',
	},
];

export function Properties() {
	return (
		<div className='min-h-screen bg-gray-50 p-6'>
			<div className='max-w-7xl mx-auto'>
				{/* Header */}
				<div className='mb-8'>
					<div className='flex items-center justify-between mb-4'>
						<div>
							<h1 className='text-2xl font-bold text-gray-900'>Properties</h1>
							<p className='text-gray-600 text-sm'>
								Manage Your Properties, Rent/Sell/Buy Properties
							</p>
						</div>
						<Button className='bg-purple-600 hover:bg-purple-700 text-white px-6'>
							<Plus className='w-4 h-4 mr-2' />
							Add Property
						</Button>
					</div>

					{/* Search Bar */}
					<div className='relative max-w-md'>
						<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
						<Input
							placeholder='Search'
							className='pl-10 bg-white border-gray-200'
						/>
					</div>
				</div>

				{/* Properties Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{properties.map((property) => (
						<Card
							key={property.id}
							className='bg-white border-0 shadow-sm hover:shadow-md transition-shadow'
						>
							<CardContent className='p-0'>
								{/* Property Image */}
								<div className='relative'>
									<img
										src={property.image || '/placeholder.svg'}
										alt={property.name}
										className='w-full h-48 object-cover rounded-t-lg'
									/>
									<Badge
										variant='secondary'
										className='absolute top-3 right-3 bg-white/90 text-gray-700 hover:bg-white/90'
									>
										{property.tag}
									</Badge>
								</div>

								<div className='p-4'>
									{/* Property Info */}
									<div className='mb-4'>
										<h3 className='font-semibold text-gray-900 mb-1'>
											{property.name}
										</h3>
										<p className='text-sm text-gray-500'>{property.location}</p>
									</div>

									{/* Owner Info */}
									<div className='flex items-center justify-between mb-4'>
										<div className='flex items-center gap-3'>
											<Avatar className='w-10 h-10'>
												<AvatarImage
													src={property.owner.avatar || '/placeholder.svg'}
												/>
												<AvatarFallback>
													{property.owner.name
														.split(' ')
														.map((n) => n[0])
														.join('')}
												</AvatarFallback>
											</Avatar>
											<div>
												<p className='font-medium text-gray-900 text-sm'>
													{property.owner.name}
												</p>
												<p className='text-xs text-gray-500'>
													{property.owner.role}
												</p>
											</div>
										</div>
										<div className='flex gap-2'>
											<Button
												size='sm'
												variant='outline'
												className='w-8 h-8 p-0 rounded-full border-blue-200 bg-transparent'
											>
												<MessageCircle className='w-4 h-4 text-blue-600' />
											</Button>
											<Button
												size='sm'
												variant='outline'
												className='w-8 h-8 p-0 rounded-full border-red-200 bg-transparent'
											>
												<Phone className='w-4 h-4 text-red-600' />
											</Button>
										</div>
									</div>

									{/* Stats */}
									<div className='grid grid-cols-3 gap-4 mb-4'>
										<div className='text-center'>
											<div className='flex items-center justify-center gap-1 mb-1'>
												<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
												<span className='text-xs text-gray-600'>
													Total Units
												</span>
											</div>
											<p className='font-semibold text-gray-900'>
												{property.stats.totalUnits}
											</p>
										</div>
										<div className='text-center'>
											<div className='flex items-center justify-center gap-1 mb-1'>
												<div className='w-2 h-2 bg-green-500 rounded-full'></div>
												<span className='text-xs text-gray-600'>Occupied</span>
											</div>
											<p className='font-semibold text-gray-900'>
												{property.stats.occupied}
											</p>
										</div>
										<div className='text-center'>
											<div className='flex items-center justify-center gap-1 mb-1'>
												<div className='w-2 h-2 bg-pink-500 rounded-full'></div>
												<span className='text-xs text-gray-600'>Vacant</span>
											</div>
											<p className='font-semibold text-gray-900'>
												{property.stats.vacant}
											</p>
										</div>
									</div>

									{/* Occupancy Rate */}
									<div className='mb-4'>
										<div className='flex justify-between items-center mb-2'>
											<span className='text-xs text-gray-600'>
												Occupancy Rate
											</span>
											<span className='text-xs font-medium text-gray-900'>
												{property.occupancyRate}%
											</span>
										</div>
										<Progress value={property.occupancyRate} className='h-2' />
									</div>

									{/* View Button */}
									<Button className='w-full bg-purple-600 hover:bg-purple-700 text-white'>
										👁 View
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
