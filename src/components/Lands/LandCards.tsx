import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Badge } from 'lucide-react'
import { Button } from '../ui/button'
import buildingBlue from '../../assets/properties/building-blue.png';
import buildingGreen from '../../assets/properties/building-green.png';
import buildingPink from '../../assets/properties/building-pink.png';
import locationImg from '../../assets/properties/location.png';
import callImg from '../../assets/properties/call.svg';
import editImg from '../../assets/properties/edit.png';
import trashImg from '../../assets/properties/trash.png';
import eyeImg from '../../assets/properties/eye.png';
import type { LandsDetails } from '../../features/lands/type';

type ModalMode = 'add' | 'view' | 'edit';

interface props {
    property: LandsDetails;
    setOpenViewModal: (data: boolean) => void;
    setModalMode: (data: ModalMode) => void;
    setIsDeleteModalOpen: (data: boolean) => void;
    setSelectedProperty: (data: LandsDetails) => void;
    setDeleteUUID: (data: string) => void;
}


const LandCards: React.FC<props> = ({ property, setOpenViewModal, setModalMode, setIsDeleteModalOpen, setSelectedProperty, setDeleteUUID }) => {
    function openEditModal(property: LandsDetails): void {
        setSelectedProperty(property)
        setModalMode('edit')
        setOpenViewModal(true)
    }

    function handleDeleteClick(property: LandsDetails): void {
        setDeleteUUID(property?.uuid ?? '')
        setIsDeleteModalOpen(true)
    }

    function openViewModal(property: LandsDetails): void {
        setSelectedProperty(property)
        setModalMode('view')
        setOpenViewModal(true)
    }

    return (
        <>
            <Card
                key={property?.uuid}
                className='bg-white border-0 shadow-[0px_0px_15px_0px_#0000001A] px-2'
            >
                <CardContent className='p-0'>
                    <div className='flex items-center justify-between mb-3 mx-3 -mt-3'>
                        <div className='flex items-center gap-3'>
                            <div>
                                <p className='font-semibold text-[#000000] text-[22px]'>
                                    {property?.owner_information?.full_name}
                                </p>
                                <div className='flex items-center gap-2 mt-2'>
                                    <img
                                        src={callImg}
                                        alt='phone icon'
                                        className='w-4 h-4 object-cover'
                                    />
                                    <p className='text-[14px] font-medium text-gray-500'>
                                        {property?.owner_information?.phone}
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

                    <div className='relative'>
                        <div className="h-58 w-full">
                            <img
                                src={property?.image ?? undefined}
                                alt={property?.land_name}
                                className='w-full h-58 object-cover rounded-xl'
                            />
                        </div>
                        <Badge
                            className='absolute top-3 right-3 bg-white text-[#B200FF] hover:bg-white/90'
                        >
                            {property?.acre}
                        </Badge>
                    </div>

                    <div className='p-1'>
                        <div className='mb-4 flex items-center justify-between mx-1'>
                            <h3 className='font-semibold text-[#000000] mb-1'>
                                {property?.land_name}
                            </h3>
                            <div className='flex items-center gap-1'>
                                <img
                                    src={locationImg}
                                    alt='location icon'
                                    className='w-4 h-4'
                                />
                                <p className='text-sm text-[#7D7D7D]'>
                                    {property?.land_address}
                                </p>
                            </div>
                        </div>

                        <div className='flex flex-row justify-between gap-4 mb-3 px-2'>
                            <div className='text-center flex items-center gap-2 '>
                                <div className='mb-1 bg-[#006AFF26] p-2 rounded-full'>
                                    <img
                                        src={buildingBlue}
                                        alt='building'
                                        className='w-4 h-4'
                                    />
                                </div>
                                <div className='flex flex-col items-start'>
                                    <p className='font-semibold text-[#716F6F]'>
                                        Total Square Feet
                                    </p>
                                    <p className='text-[#006AFF] ml-1'>
                                        {property?.square_feet}
                                    </p>
                                </div>
                            </div>
                            <div className='text-center flex items-center gap-2 '>
                                <div className='mb-1 bg-[#1EC95A26] p-2 rounded-full'>
                                    <img
                                        src={buildingGreen}
                                        alt='building'
                                        className='w-4 h-4'
                                    />
                                </div>
                                <div className='flex flex-col items-start'>
                                    <p className='font-semibold text-[#716F6F]'>
                                        Total Cent{' '}
                                    </p>
                                    <p className='text-[#1EC95A] ml-1'>
                                        {property?.cent}
                                    </p>
                                </div>
                            </div>
                            <div className='text-center flex items-center gap-2 '>
                                <div className='mb-1 bg-[#FF00E126] p-2 rounded-full'>
                                    <img
                                        src={buildingPink}
                                        alt='building'
                                        className='w-4 h-4'
                                    />
                                </div>
                                <div className='flex flex-col items-start'>
                                    <p className='font-semibold text-[#716F6F]'>
                                        Acear{' '}
                                    </p>
                                    <p className='text-[#FF00E1] ml-1'>
                                        {property?.acre}
                                    </p>
                                </div>
                            </div>
                        </div>

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
        </>
    )
}

export default LandCards