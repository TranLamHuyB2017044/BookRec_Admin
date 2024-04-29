import React, { useState } from 'react'
import Navbar from '../../components/NavbarComponent/Navbar'
import Sidebar from '../../components/SideBarComponent/Sidebar'
import Footer from '../../components/FooterComponent/Footer'
import SalesReport from '../../components/StatisticComponent/SalesReport'
import Chart from '../../components/StatisticComponent/Chart'
import BestSeller from '../../components/StatisticComponent/BestSeller'
import News from '../../components/StatisticComponent/News'
export default function Statistic() {
    const active = 3
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
                        <h1 className='font-semibold text-5xl ml-16 mt-12'>Thống kê doanh thu</h1>
                        <div className={isSidebarOpen ? 'flex gap-8' : 'flex gap-16'}>
                            <div>
                                <SalesReport isSidebarOpen={isSidebarOpen}/>
                                <Chart isSidebarOpen={isSidebarOpen}/>
                                <BestSeller isSidebarOpen={isSidebarOpen}/>
                            </div>
                            <News isSidebarOpen={isSidebarOpen}/>
                        </div>
                    </div>
                    <div className='h-[80px]'><Footer /></div>
                </div>
            </div>
        </div>
    )
}
