import React, { useState } from 'react'
import Navbar from '../../components/NavbarComponent/Navbar'
import Sidebar from '../../components/SideBarComponent/Sidebar'
import Footer from '../../components/FooterComponent/Footer'
import { DataGrid } from '@mui/x-data-grid';
import DiscountTable from '../../components/DiscountComponent/discount_table';
import CreateDiscount from '../../components/DiscountComponent/create_discount';
export default function Discount() {
    const active = 4
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showCreateDiscount, setShowCreateDiscount] = useState(false);
    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
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
                            <h1 className='font-semibold text-5xl ml-16 mt-12'>{showCreateDiscount ? 'Thêm mới mã khuyến mãi' :'Khuyến mãi'}</h1>
                            <button onClick={() => setShowCreateDiscount(!showCreateDiscount)}
                                className={'active:translate-y-1 hover:bg-gradient-to-r from-blue-500 to-cyan-400 px-4  rounded-md border border-white bg-[dodgerblue] text-white w-[150px] py-2 mr-32 mt-[30px]'}
                            >{showCreateDiscount ? 'Trở về' : 'Tạo khuyến mãi'}</button>
                        </div>
                        {showCreateDiscount ? <CreateDiscount/>: <DiscountTable/>}
                    </div>
                    <div className='h-[80px]'><Footer /></div>
                </div>
            </div>
        </div>
    )
}
