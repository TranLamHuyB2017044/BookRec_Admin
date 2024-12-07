import React, { useState } from 'react'
import Navbar from '../../components/NavbarComponent/Navbar'
import Sidebar from '../../components/SideBarComponent/Sidebar'
import Footer from '../../components/FooterComponent/Footer'
import SalesReport from '../../components/StatisticComponent/SalesReport'
import Chart from '../../components/StatisticComponent/Chart'
import BestSeller from '../../components/StatisticComponent/BestSeller'
import News from '../../components/StatisticComponent/News'
import PrintIcon from '@mui/icons-material/Print';
import { jsPDF } from 'jspdf';

export default function Statistic() {


    const generatePDF = () => {
        const doc = new jsPDF();
      
        // Them tieu de
        doc.setFontSize(16);
        doc.text('Bao cao doanh thu thang', 20, 20);
      
        // Ngay xuat bao cao
        const currentDate = new Date();
        const dateString = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        doc.setFontSize(12);
        doc.text(`Ngay xuat bao cao: ${dateString}`, 20, 30);
      
        // Them tong thu trong thang
        doc.text(`Tong thu trong thang: 1,000,000 VND`, 20, 40);
        doc.text(`Tong chi trong thang: 500,000 VND`, 20, 50);
        doc.text(`Loi nhuan gop: 500,000 VND`, 20, 60);
      
        // So luong don hang trong thang
        doc.text(`Tong so don hang: 150 don`, 20, 70);
        doc.text(`Don hang bi huy: 10 don`, 20, 80);
        doc.text(`Don hang hoan thanh: 140 don`, 20, 90);
      
        // Doanh thu theo san pham
        doc.text(`San pham 1: 300,000 VND`, 20, 100);
        doc.text(`San pham 2: 200,000 VND`, 20, 110);
        doc.text(`San pham 3: 500,000 VND`, 20, 120);
      
        // Khach hang
        doc.text(`Khach hang moi: 50 khach`, 20, 130);
        doc.text(`Khach hang quay lai: 100 khach`, 20, 140);
      
        // Luu file PDF
        doc.save('bao_cao_doanh_thu_thang.pdf');
      };

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
                        <div className='flex justify-between'>

                            <h1 className='font-semibold text-5xl ml-16 mt-12'>Thống kê doanh thu</h1>
                            <button
                                onClick={generatePDF}
                                className={'mr-16 mt-12 active:translate-y-1 hover:bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 rounded-md border border-white bg-[dodgerblue] text-white flex items-center  gap-2 justify-center'}
                            ><PrintIcon fontSize='large' /> Xuất báo cáo</button>

                        </div>
                        <div>
                            <SalesReport isSidebarOpen={isSidebarOpen} />
                            <Chart isSidebarOpen={isSidebarOpen} />
                            <BestSeller isSidebarOpen={isSidebarOpen} />
                        </div>
                        {/* <div className={isSidebarOpen ? 'flex gap-8' : 'flex gap-16'}> */}

                        {/* <News isSidebarOpen={isSidebarOpen} /> */}
                        {/* </div> */}
                    </div>
                    <div className='h-[80px]'><Footer /></div>
                </div>
            </div>
        </div>
    )
}
