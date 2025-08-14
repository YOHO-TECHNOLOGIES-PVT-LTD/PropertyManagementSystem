import { useEffect, useState } from 'react'
import { COLORS, FONTS } from '../../constants/ui constants'
import add from '../../assets/add.png'
import search from '../../assets/search-normal.png'
import LandCards from '../../components/Lands/LandCards'
import LandView from '../../components/Lands/LandView'
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog'
import { DialogHeader } from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'
import { useAppDispatch, useAppSelector } from '../../Hooks/redux'
import { DeleteLandsThunks, GetLandsDetailsThunks } from '../../features/lands/redux/thunks'
import type { LandsDetails } from '../../features/lands/type'
import type { RootState } from '../../store/store'
import toast from 'react-hot-toast'

type ModalMode = 'add' | 'view' | 'edit';

const LandHome = () => {

    const [openViewModal, setOpenViewModal] = useState(false);
    const [selectedProperty, setselectedProperty] = useState<LandsDetails | null>(null);
    const [modalMode, setModalMode] = useState<ModalMode>('add');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [DeleteUUID, setDeleteUUID] = useState('');
    const dispatch = useAppDispatch()

    const landsData: LandsDetails[] = useAppSelector((state: RootState) => state.landstore.lands)


    const handleDeleteProperty = () => {
        dispatch(DeleteLandsThunks(DeleteUUID))
        setIsDeleteModalOpen(false);
        toast.success("land details to deleted successfully.")
    };

    useEffect(() => {
        dispatch(GetLandsDetailsThunks())
    }, [dispatch]);

    return (
        <div>
            <div className="flex flex-col gap-5 px-2">
                <div className='flex flex-row justify-between items-center'>
                    <div>
                        <p style={{ ...FONTS.headers }}>Land</p>
                        <p style={{ ...FONTS.headers_description }} className='!text-[#7D7D7D]'>Manage Your Property Portfolio</p>
                    </div>
                    <div
                        className="flex flex-row p-2 rounded-2xl cursor-pointer"
                        onClick={() => {
                            setModalMode('add')
                            setOpenViewModal(true)
                        }}
                        style={{ background: COLORS.primary_purple }}>
                        <img src={add} alt="" />
                        <p className='text-white px-2'>Add Land</p>
                    </div>
                </div>
                <div className="bg-[#B200FF0D] max-w-max max-h-max flex flex-row items-center rounded-[8px]">
                    <img src={search} alt="" className='p-4' />
                    <input
                        type="text"
                        placeholder='Search'
                        className='h-[48px] w-[400px] rounded-[8px] placeholder:text-[#333333] placeholder:font-medium placeholder:text-[16px] focus:outline-none'
                    />
                </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-5">
                {
                    landsData.map((item, index) => (
                        <div key={index}>
                            <LandCards
                                property={item}
                                setOpenViewModal={setOpenViewModal}
                                setModalMode={setModalMode}
                                setIsDeleteModalOpen={setIsDeleteModalOpen}
                                setSelectedProperty={setselectedProperty}
                                setDeleteUUID={setDeleteUUID}
                            />
                        </div>
                    ))
                }
            </div>

            {
                openViewModal && <LandView
                    openViewModal={openViewModal}
                    setOpenViewModal={setOpenViewModal}
                    modalMode={modalMode}
                    selectedProperty={selectedProperty}
                    setSelectedProperty={setselectedProperty}
                />
            }

            {
                <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                    <DialogContent className='max-w-md fixed top-2/3 left-3/4 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-xl p-6'>
                        <DialogHeader className='space-y-0 pb-2'>
                            <DialogTitle className='text-xl font-semibold text-[#000000]'>
                                Delete Property
                            </DialogTitle>
                        </DialogHeader>

                        <div className='space-y-4'>
                            <p className='text-[#7D7D7D] leading-relaxed'>
                                Are you sure you want to delete ""? This
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
            }
        </div>
    )
}

export default LandHome