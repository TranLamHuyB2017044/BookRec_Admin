import React, { useState, useEffect } from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { UserRequest } from '../../service/Request'

export default function SalesReport({ isSidebarOpen }) {
    const [chooseTypeStatisticsOrder, setChooseTypeStatisticsOrder] = useState(false)
    const [chooseTypeStatisticsRevenue, setChooseTypeStatisticsRevenue] = useState(false)
    const [chooseTypeStatisticsAmount, setChooseTypeStatisticsAmount] = useState(false)
    const [ordersType, setOrdersType] = useState('Hôm nay')
    const [revenueType, setRevenueType] = useState('Hôm nay')
    const [amountType, setAmountType] = useState('Hôm nay')
    const [statisticsOrder, setStatisticsOrder] = useState()
    const [statisticsRevenue, setStatisticsRevenue] = useState()
    const [statisticsAmountSpent, setStatisticsAmountSpent] = useState()

    const [numUsers, setNumUsers] = useState()
    useEffect(() => {
        const getSalesData = async () => {
            try {
                let orderEndpoint = '/order/statistics/month';
                let revenueEndpoint = '/order/statistics/month';
                let amountEndpoint = '/purchase/getTotalMoutSpent?type=month';
                if (ordersType === 'Hôm nay') {
                    orderEndpoint = '/order/statistics/day';
                }
                if (revenueType === 'Hôm nay') {
                    revenueEndpoint = '/order/statistics/day';
                }
                if (amountType === 'Hôm nay') {
                    amountEndpoint = '/purchase/getTotalMoutSpent?type=day';
                }

                const [orderRS, revenueRS, amountRS] = await Promise.all([
                    UserRequest.get(orderEndpoint),
                    UserRequest.get(revenueEndpoint),
                    UserRequest.get(amountEndpoint)
                ]);

                setStatisticsOrder(orderRS.data.tong_so_don);

                setStatisticsRevenue(revenueRS.data.tong_doanh_thu);
                setStatisticsAmountSpent(amountRS.data)
            }
            catch (error) {
                console.log(error)
            }
        }
        getSalesData()
    }, [ordersType, revenueType, amountType])
    console.log(statisticsAmountSpent)
    useEffect(() => {
        const countNumUsers = async () => {
            const userList = await UserRequest.get('/user')
            setNumUsers(userList.data.length)
        }
        countNumUsers()
    }, [])

    const handleSetValue = (type, option) => {
        if (type === 'revenueType') {
            setRevenueType(option)
            setChooseTypeStatisticsRevenue(false)
        } else if (type === 'amountType') {
            setAmountType(option)
            setChooseTypeStatisticsAmount(false)
        }
        else {
            setOrdersType(option)
            setChooseTypeStatisticsOrder(false)
        }
    }


    return (
        <div className={isSidebarOpen === false ? 'flex justify-start ml-60 gap-10 mt-16 mx-auto ' : `flex justify-start gap-10 mt-16 ml-8`}>
            <div className={isSidebarOpen === false ? 'border-[1px] bg-white px-6 py-5 w-[300px] h-[150px] rounded-2xl' : 'border-[1px] bg-white px-6 py-5 w-[250px] h-[150px] rounded-2xl'}>
                <div className='flex justify-between items-center relative'>
                    <div className='flex items-center gap-2'>
                        <h3 className='text-3xl text-blue-500'>Đơn hàng |</h3>
                        <p className='text-gray-500 text-2xl mt-1 opacity-80'>{ordersType}</p>
                    </div>
                    <button onClick={() => setChooseTypeStatisticsOrder(!chooseTypeStatisticsOrder)}>...</button>
                    {chooseTypeStatisticsOrder && <ul className='w-[150px]  bg-white border-[1px] absolute top-12 right-0 '>
                        <button onClick={() => handleSetValue('orderType', 'Hôm nay')} className='py-2 text-start pl-4 w-full cursor-pointer hover:bg-[#e6d8d8]'>Hôm nay</button>
                        <button onClick={() => handleSetValue('orderType', 'Tháng này')} className='py-2 text-start pl-4 w-full cursor-pointer hover:bg-[#e6d8d8]'>Tháng này</button>
                    </ul>}
                </div>
                <div className='mt-8 flex justify-start gap-8 items-center'>
                    <div className='px-5 py-2 rounded-full bg-slate-100 w-fit text-[40px]'><ShoppingCartOutlinedIcon className='text-[#5e65e2]' fontSize='inherit' /></div>
                    <h3 className='text-4xl text-blue-500'>{statisticsOrder} đơn</h3>
                </div>
            </div>
            <div className={isSidebarOpen === false ? 'border-[1px] bg-white px-6 py-5 w-[300px] h-[150px] rounded-2xl' : 'border-[1px] bg-white px-6 py-5 w-[250px] h-[150px] rounded-2xl'}>
                <div className='flex justify-between items-center relative'>
                    <div className='flex items-center gap-2'>
                        <h3 className='text-3xl text-blue-500'>Doanh thu |</h3>
                        <p className='text-gray-500 text-2xl mt-1 opacity-80'>{revenueType}</p>
                    </div>
                    <button onClick={() => setChooseTypeStatisticsRevenue(!chooseTypeStatisticsRevenue)}>...</button>
                    {chooseTypeStatisticsRevenue && <ul className='w-[150px]  bg-white border-[1px] absolute top-12 right-0 '>
                        <button onClick={() => handleSetValue('revenueType', 'Hôm nay')} className='py-2 text-start pl-4 w-full cursor-pointer hover:bg-[#e6d8d8]'>Hôm nay</button>
                        <button onClick={() => handleSetValue('revenueType', 'Tháng này')} className='py-2 text-start pl-4 w-full cursor-pointer hover:bg-[#e6d8d8]'>Tháng này</button>
                    </ul>}
                </div>
                <div className='mt-8 flex justify-start gap-8 items-center'>
                    <div className='px-5 pt-1 pb-2 rounded-full bg-[#e2fde3] w-fit text-[40px]'><MonetizationOnOutlinedIcon className='text-[#41c048]' fontSize='inherit' /></div>
                    <h3 className='text-4xl text-blue-500'>{(parseInt(statisticsRevenue))?.toLocaleString()} vnđ</h3>
                </div>
            </div>
            <div className={isSidebarOpen === false ? 'border-[1px] bg-white px-6 py-5 w-[300px] h-[150px] rounded-2xl' : 'border-[1px] bg-white px-6 py-5 w-[250px] h-[150px] rounded-2xl'}>
                <div className='flex justify-between items-center relative'>
                    <div className='flex items-center gap-2'>
                        <h3 className='text-3xl text-blue-500'>Tổng chi |</h3>
                        <p className='text-gray-500 text-2xl mt-1 opacity-80'>{amountType}</p>
                    </div>
                    <button onClick={() => setChooseTypeStatisticsAmount(!chooseTypeStatisticsAmount)}>...</button>
                    {chooseTypeStatisticsAmount && <ul className='w-[150px]  bg-white border-[1px] absolute top-12 right-0 '>
                        <button onClick={() => handleSetValue('amountType', 'Hôm nay')} className='py-2 text-start pl-4 w-full cursor-pointer hover:bg-[#e6d8d8]'>Hôm nay</button>
                        <button onClick={() => handleSetValue('amountType', 'Tháng này')} className='py-2 text-start pl-4 w-full cursor-pointer hover:bg-[#e6d8d8]'>Tháng này</button>
                    </ul>}
                </div>
                <div className='mt-8 flex justify-start gap-8 items-center'>
                    <div className='px-5 pt-1 pb-2 rounded-full bg-[#f3e2de] w-fit text-[40px]'><MonetizationOnOutlinedIcon className='text-[#df7965]' fontSize='inherit' /></div>
                    <h3 className='text-4xl text-blue-500'>{(parseInt(statisticsAmountSpent))?.toLocaleString()} vnđ</h3>
                </div>
            </div>
            {/* <div className={isSidebarOpen === false ? 'border-[1px] bg-white px-6 py-5 w-[300px] h-[150px] rounded-2xl' : 'border-[1px] bg-white px-6 py-5 w-[250px] h-[150px] rounded-2xl'}>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                        <h3 className='text-3xl text-blue-500'>Khách hàng |</h3>
                        <p className='text-gray-500 text-2xl mt-1 opacity-80'>Tổng cộng</p>
                    </div>

                </div>
                <div className='mt-8 flex justify-start gap-8 items-center'>
                    <div className='px-5 py-2 rounded-full bg-[#f3e2de] w-fit text-[40px]'><PeopleAltOutlinedIcon className='text-[#df7965]' fontSize='inherit' /></div>
                    <h3 className='text-4xl text-blue-500'>{numUsers}</h3>
                </div>
            </div> */}
        </div>
    )
}
