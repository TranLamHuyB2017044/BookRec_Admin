import React, { useState } from 'react'
import Navbar from '../../components/NavbarComponent/Navbar'
import Sidebar from '../../components/SideBarComponent/Sidebar'
import Footer from '../../components/FooterComponent/Footer'
import { Modal } from '@mui/material';
import CreateDiscount from '../../components/PromotinComponent/create_discount';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CreateCoupon from '../../components/PromotinComponent/create_coupon';
import PromotionTable from '../../components/PromotinComponent/promotion_table';
export default function Promotion() {
    const active = 4
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showCreateDiscount, setShowCreateDiscount] = useState(false);
    const [typeDiscount, setTypeDiscount] = useState(0);
    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);


    const handleSetTypeDiscount = (type) => {
        setTypeDiscount(type)
        handleCloseModal();
        setShowCreateDiscount(!showCreateDiscount);
    }

    return (
        <div>
            <Navbar onToggleSidebar={handleToggleSidebar} />
            <div className='grid grid-cols-5 '>
                <div className={`col-span-1 `}>
                    <Sidebar toggle={isSidebarOpen} active={active} />
                </div>
                <div className={`col-span-4 transition-all ease-in-out duration-300  flex flex-col justify-between ${isSidebarOpen ? ' ' : '-translate-x-[300px] mx-auto w-[98vw]'}`}>
                    <div className=' mt-[60px]'>
                        <div className='flex justify-between '>
                            <h1 className='font-semibold text-5xl ml-16 mt-12'>{showCreateDiscount ? 'Thêm mới mã khuyến mãi' : 'Khuyến mãi'}</h1>
                            {showCreateDiscount ? <button onClick={() => handleSetTypeDiscount(0)}
                                className={'active:translate-y-1 hover:bg-gradient-to-r from-blue-500 to-cyan-400 px-4  rounded-md border border-white bg-[dodgerblue] text-white w-[150px] py-2 mr-32 mt-[30px]'}
                            >Trở về </button> : <button onClick={handleOpenModal}
                                className={'active:translate-y-1 hover:bg-gradient-to-r from-blue-500 to-cyan-400 px-4  rounded-md border border-white bg-[dodgerblue] text-white w-[150px] py-2 mr-32 mt-[30px]'}
                            >Tạo khuyến mãi</button>}
                        </div>
                        {typeDiscount === 0 ? <PromotionTable /> : typeDiscount === 1 ? <CreateCoupon /> : <CreateDiscount setTypeDiscount={() => handleSetTypeDiscount(0)} />}
                        <Modal
                            open={openModal}
                            onClose={handleCloseModal}
                        >
                            <div className='absolute top-[30%] left-[50%] w-[400px] bg-white p-4 transform -translate-x-[50%] -translate-y-[50%]'>
                                <div className='flex justify-between border-b '>
                                    <h2 className='py-3 px-2 text-3xl'>Tạo khuyến mãi</h2>
                                    <button className='text-5xl pr-4 text-gray-500 hover:text-gray-400' onClick={handleCloseModal}>&times;</button>
                                </div>
                                <div onClick={() => handleSetTypeDiscount(1)} className='flex justify-between items-center border-b p-4 cursor-pointer hover:bg-gray-200'>
                                    <div className=''>
                                        <p className='font-bold'>Mã khuyến mãi (coupon)</p>
                                        <p className='text-[15px]'>Tạo mã giảm giá cho khách mua hàng</p>
                                    </div>
                                    <ArrowForwardIosIcon sx={{ fontSize: '15px' }} />
                                </div>
                                <div onClick={() => handleSetTypeDiscount(2)} className='flex justify-between items-center border-b p-4 cursor-pointer hover:bg-gray-200'>
                                    <div className=''>
                                        <p className='font-bold'>Chương trình khuyến mãi (CTKM)</p>
                                        <p className='text-[15px]'>Tạo mã giảm giá trực tiếp trên sản phẩm</p>
                                    </div>
                                    <ArrowForwardIosIcon sx={{ fontSize: '15px' }} />
                                </div>
                                <button onClick={handleCloseModal} className='px-8 py-2 bg-gray-500 rounded-md mt-5 float-right text-white hover:bg-gray-400'>Hủy</button>
                            </div>
                        </Modal>
                    </div>
                    <div className='h-[80px]'><Footer /></div>
                </div>
            </div>
        </div>
    )
}
