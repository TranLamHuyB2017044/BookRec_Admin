import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import { UserRequest } from '../../service/Request';
import { Link } from 'react-router-dom';


export default function Orders({isSidebarOpen}) {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        const getAllOrders = async () => {
            const rs = await UserRequest.get('/order')
            setOrders(rs.data)
            console.log(rs.data)
        }

        getAllOrders()
    }, [])

    const columns = [
        {
            field: 'OrderId', headerName: 'OrderId', width: 150, renderCell: (params) => {
                return (
                    <div >
                        <p>{params.row.order_id}</p>
                    </div>
                );
            },
        },
        {
            field: 'created', headerName: 'Thời gian đặt', width: 200, renderCell: (params) => {
                return (
                    <div>
                        <p>{params.row.order_date.substring(0, params.row.order_date.indexOf('T'))}</p>
                    </div>
                );
            },
        },
        {
            field: 'customer', headerName: 'Khách hàng', width: 180, renderCell: (params) => {
                return (
                    <div>
                        <p>{params.row.customer_name}</p>
                    </div>
                );
            },
        },
        {
            field: 'total', headerName: 'Tổng cộng', width: 180, renderCell: (params) => {
                return (
                    <div>
                        <p>{(params.row.total_price).toLocaleString()} vnđ</p>
                    </div>
                );
            },
        },
        {
            field: 'status', headerName: 'Trạng thái', width: 150, renderCell: (params) => {
                return (
                    <div>
                        <p className={getPaymentStatusClass(params.row.payment_status)}>{params.row.payment_status}</p>
                    </div>
                );
            },
        },
        {
            field: 'detail', headerName: '', width: 150, renderCell: (params) => {
                return (
                    <div className=' cursor-pointer flex gap-8'>
                        <Link to={`/manageOrders/${params.row.order_id}`} className='px-8 py-2 rounded-lg border border-[dodgerblue] text-[dodgerblue]'>Xem chi tiết</Link>
                    </div>
                );
            },
        },
    ];
    const getPaymentStatusClass = (status) => {
        switch (status) {
            case 'Đã tạo đơn hàng':
                return 'text-gray-500';
            case 'Đang chuẩn bị hàng':
                return 'text-orange-500';
            case 'Đơn hàng đang được giao':
                return 'text-yellow-500';
            case 'Đã thanh toán':
                return 'text-[dodgerblue]';
            case 'Đã giao':
                return 'text-green-500';
            case 'Đã hủy':
                return 'text-red-500';
            default:
                return 'text-black';
        }
    };
    const order_statistic_list_class = 'flex gap-4 border border-gray-300 cursor-pointer bg-white p-4 items-center rounded-2xl min-w-[180px]'
    const order_statistic_list_full_class = 'flex gap-4 border border-gray-300 cursor-pointer bg-white p-4 items-center rounded-2xl min-w-[250px]'
    const sortedOrders = orders.toSorted((a, b) => new Date(b.order_date) - new Date(a.order_date)); 
    const confirmedOrder = orders.filter((orders) => orders.payment_status === 'Đã giao')
    const checkoutdOrder = orders.filter((orders) => orders.payment_status === 'Đã thanh toán')
    const rejectedOrder = orders.filter((orders) => orders.payment_status === 'Đã hủy')
    return (
        <div className='flex flex-col mt-20'>
            <div className={isSidebarOpen ===true ? 'flex px-32 items-center gap-8' : 'flex px-3 ml-[250px] items-center gap-8'}>
                <div className={ isSidebarOpen === true ? order_statistic_list_class : order_statistic_list_full_class}>
                    <div className='border p-3 bg-purple-200 rounded-xl'>
                        <WidgetsOutlinedIcon fontSize='large' className=' text-purple-500' />
                    </div>
                    <div className='flex flex-col '>
                        <p className='text-md opacity-80'>Tất cả đơn</p>
                        <h3 className='text-bold text-4xl'>{orders.length}</h3>
                    </div>
                </div>
                <div className={ isSidebarOpen === true ? order_statistic_list_class : order_statistic_list_full_class} >
                    <div className='border p-3 bg-green-200 rounded-xl'>
                        <AssignmentTurnedInOutlinedIcon fontSize='large' className='text-green-600' />
                    </div>
                    <div className='flex flex-col '>
                        <p className='text-md opacity-80'>Đã giao</p>
                        <h3 className='text-bold text-4xl'>{confirmedOrder.length}</h3>
                    </div>
                </div>
                <div className={ isSidebarOpen === true ? order_statistic_list_class : order_statistic_list_full_class} >
                    <div className='border p-3 bg-blue-200 rounded-xl'>
                        <AssignmentTurnedInOutlinedIcon fontSize='large' className='text-blue-600' />
                    </div>
                    <div className='flex flex-col '>
                        <p className='text-md opacity-80'>Đã thanh toán</p>
                        <h3 className='text-bold text-4xl'>{checkoutdOrder.length}</h3>
                    </div>
                </div>
                <div className={ isSidebarOpen === true ? order_statistic_list_class : order_statistic_list_full_class}>
                    <div className='border p-3 bg-red-200 rounded-xl'>
                        <AssignmentOutlinedIcon fontSize='large' className='text-red-500' />
                    </div>
                    <div className='flex flex-col '>
                        <p className='text-md opacity-80'>Đã hủy</p>
                        <h3 className='text-bold text-4xl'>{rejectedOrder.length}</h3>
                    </div>
                </div>
            </div>
            <div className={isSidebarOpen === true ? 'mt-20 px-32 w-fit' : 'mt-20 px-32 ml-[180px] w-fit'}>
                <DataGrid initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                    pageSizeOptions={[5]} getRowId={(row) => row.order_id} style={{ fontSize: '1.5rem' }} rows={sortedOrders} columns={columns} className='bg-white' />

            </div>

        </div>
    )
}
