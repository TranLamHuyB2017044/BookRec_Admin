import React from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useState } from 'react';
import { useEffect } from 'react';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
export default function SalesReport({ isSidebarOpen }) {
    const [SalesData, setSalesData] = useState([])
    const [typeStatistics, setTypeStatistics] = useState(false)
    const [chooseTypeStatistics, setChooseTypeStatistics] = useState(false)
    
    // useEffect(() => {
    //     const getSalesData = async () => {
    //         const rs = await UserRequest.get('/')
    //     }
    // }, [])
    return (
        <div className={isSidebarOpen === false ? 'flex justify-start gap-10 mt-16 ml-16 ' : `flex justify-start gap-10 mt-16 ml-8`}>
            <div className={isSidebarOpen === false ? 'border-[1px] bg-white px-6 py-5 w-[300px] h-[150px] rounded-2xl' : 'border-[1px] bg-white px-6 py-5 w-[250px] h-[150px] rounded-2xl'}>
                <div className='flex justify-between items-center relative'>
                    <div className='flex items-center gap-2'>
                        <h3 className='text-3xl text-blue-500'>Đơn hàng |</h3>
                        <p className='text-gray-500 text-2xl mt-1 opacity-80'>Hôm nay</p>
                    </div>
                    <button  onClick={() => setChooseTypeStatistics(!chooseTypeStatistics)}>...</button>
                    {chooseTypeStatistics && <ul className='w-[150px]  bg-white border-[1px] absolute top-12 right-0 '>
                        <p className='py-2 pl-4 cursor-pointer hover:bg-[#e6d8d8]'>Hôm nay</p>
                        <p className='py-2 pl-4 cursor-pointer hover:bg-[#e6d8d8]'>Tháng này</p>
                    </ul>}
                </div>
                <div className='mt-8 flex justify-start gap-8 items-center'>
                    <div className='px-5 py-2 rounded-full bg-slate-100 w-fit text-[40px]'><ShoppingCartOutlinedIcon className='text-[#5e65e2]' fontSize='inherit' /></div>
                    <h3 className='text-4xl text-blue-500'>145 đơn</h3>
                </div>
            </div>
            <div className={isSidebarOpen === false ? 'border-[1px] bg-white px-6 py-5 w-[300px] h-[150px] rounded-2xl' : 'border-[1px] bg-white px-6 py-5 w-[250px] h-[150px] rounded-2xl'}>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                        <h3 className='text-3xl text-blue-500'>Doanh thu |</h3>
                        <p className='text-gray-500 text-2xl mt-1 opacity-80'>Hôm nay</p>
                    </div>
                    <button  onClick={() => setChooseTypeStatistics(!chooseTypeStatistics)}>...</button>
                    {chooseTypeStatistics && <ul className='w-[150px]  bg-white border-[1px] absolute top-12 right-0 '>
                        <p className='py-2 pl-4 cursor-pointer hover:bg-[#e6d8d8]'>Hôm nay</p>
                        <p className='py-2 pl-4 cursor-pointer hover:bg-[#e6d8d8]'>Tháng này</p>
                    </ul>}
                </div>
                <div className='mt-8 flex justify-start gap-8 items-center'>
                    <div className='px-5 pt-1 pb-2 rounded-full bg-[#e2fde3] w-fit text-[40px]'><MonetizationOnOutlinedIcon className='text-[#41c048]' fontSize='inherit' /></div>
                    <h3 className='text-4xl text-blue-500'>145 vnđ</h3>
                </div>
            </div>
            <div className={isSidebarOpen === false ? 'border-[1px] bg-white px-6 py-5 w-[300px] h-[150px] rounded-2xl' : 'border-[1px] bg-white px-6 py-5 w-[250px] h-[150px] rounded-2xl'}>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                        <h3 className='text-3xl text-blue-500'>Khách hàng |</h3>
                        <p className='text-gray-500 text-2xl mt-1 opacity-80'>Tổng cộng</p>
                    </div>

                </div>
                <div className='mt-8 flex justify-start gap-8 items-center'>
                    <div className='px-5 py-2 rounded-full bg-[#f3e2de] w-fit text-[40px]'><PeopleAltOutlinedIcon className='text-[#df7965]' fontSize='inherit' /></div>
                    <h3 className='text-4xl text-blue-500'>145</h3>
                </div>
            </div>
        </div>
    )
}
