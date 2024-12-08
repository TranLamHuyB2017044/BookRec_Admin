import React, { useEffect, useState } from 'react'
import Navbar from '../../components/NavbarComponent/Navbar'
import Sidebar from '../../components/SideBarComponent/Sidebar'
import Footer from '../../components/FooterComponent/Footer'
import SalesReport from '../../components/StatisticComponent/SalesReport'
import Chart from '../../components/StatisticComponent/Chart'
import BestSeller from '../../components/StatisticComponent/BestSeller'
import News from '../../components/StatisticComponent/News'
import PrintIcon from '@mui/icons-material/Print';
import { jsPDF } from 'jspdf';
import { UserRequest } from '../../service/Request'

export default function Statistic() {
    const [statisticsOrder, setStatisticsOrder] = useState({})
    const [statisticsRevenue, setStatisticsRevenue] = useState()
    const [statisticsAmountSpent, setStatisticsAmountSpent] = useState()

    useEffect(() => {
        const getSalesData = async () => {
            try {
                const revenueEndpoint = '/order/statistics/month';
                const amountEndpoint = '/purchase/getTotalMoutSpent?type=month';
                const orderStatistic = '/order/report'
                const [orderRS, revenueRS, amountRS] = await Promise.all([
                    UserRequest.get(orderStatistic),
                    UserRequest.get(revenueEndpoint),
                    UserRequest.get(amountEndpoint)
                ]);
                setStatisticsOrder(orderRS.data);
                setStatisticsRevenue(revenueRS.data.tong_doanh_thu);
                setStatisticsAmountSpent(amountRS.data)
            }
            catch (error) {
                console.log(error)
            }
        }
        getSalesData()
    }, [])
    const date = new Date()
    const thisMonth = date.getMonth()

    const generatePDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        doc.setFontSize(16);
        const text = `BAO CAO DOANH THU THANG ${thisMonth}`;
        const textWidth = doc.getTextWidth(text);
        const xPosition = (pageWidth - textWidth) / 2;

        doc.text(text, xPosition, 20);
        const currentDate = new Date();
        const dateString = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        doc.setFontSize(12);
        doc.text(`Ngay xuat bao cao: ${dateString}`, 20, 30);
        doc.text(`Tong doanh thu trong thang: ${parseInt(statisticsRevenue)?.toLocaleString('vi-VN') || '0'} VND`, 20, 40);
        doc.text(`Tong chi trong thang: ${parseInt(statisticsAmountSpent)?.toLocaleString('vi-VN') || '0'} VND`, 20, 50);
        
        const profit = (statisticsRevenue || 0) - (statisticsAmountSpent || 0);
        doc.text(`Loi nhuan: ${profit > 0 ? parseInt(profit).toLocaleString('vi-VN') : '0'} VND`, 20, 60);
        

        doc.text(`Tong so don hang: ${statisticsOrder.tong_so_don}`, 20, 70);
        doc.text(`Don hang bi huy: ${statisticsOrder.so_don_da_huy}`, 20, 80);
        doc.text(`Don hang hoan thanh:  ${statisticsOrder.so_don_da_giao}`, 20, 90);

        const yStart = 110;
        const lineHeight = 10;
        doc.text(`Danh sach san pham da ban: `, 20, 100);

        statisticsOrder.danh_sach_sach.forEach((sach, index) => {
            const lines = [
                `- Ten sach: ${sach.ten_sach}`,
                `- So luong: ${sach.so_luong_da_ban}`,
                `- Tong gia tien: ${sach.tong_gia_tien.toLocaleString('vi-VN')} VND`
            ];
        
            lines.forEach((line, lineIndex) => {
                const yPosition = yStart + (index * (lineHeight * 4)) + (lineIndex * lineHeight); 
                doc.text(line, 20, yPosition);
            });
        });

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
