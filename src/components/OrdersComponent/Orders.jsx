import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import { UserRequest } from '../../service/Request';


export default function Orders(isSidebarOpen) {
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
                        <p>{(params.row.total_price).toLocaleString()}</p>
                    </div>
                );
            },
        },
        {
            field: 'status', headerName: 'Trạng thái', width: 150, renderCell: (params) => {
                return (
                    <div>
                        <p className={params.row.payment_status === 'Chưa thanh toán' ? 'text-[dodgerblue] ' : params.row.payment_status === 'Đã thanh toán' ? 'text-green-500' : 'text-red-500'}>{params.row.status}</p>
                    </div>
                );
            },
        },
        {
            field: 'detail', headerName: '', width: 150, renderCell: (params) => {
                return (
                    <div className=' cursor-pointer flex gap-8'>
                        <button className='px-8 py-2 rounded-lg border border-[dodgerblue] text-[dodgerblue]'>Xem chi tiết</button>
                    </div>
                );
            },
        },
    ];

    // const orders = [
    //     {id:1, time:'2 gio truoc', customer: 'John', total: 123, status: 'Chưa thanh toán', },
    //     {id:2, time:'2 gio truoc', customer: 'John', total: 123, status: 'Đã thanh toán', },
    //     {id:3, time:'2 gio truoc', customer: 'John', total: 123, status: 'Đã thanh toán', },
    //     {id:4, time:'2 gio truoc', customer: 'John', total: 123, status: 'Đã hủy', },
    // ]
    return (
        <div className='flex flex-col   mt-20'>
            <div className='flex px-32 items-center gap-8'>
                <div className='flex gap-4 border border-gray-300 cursor-pointer bg-white p-4 items-center rounded-2xl min-w-[180px]'>
                    <div className='border p-3 bg-purple-200 rounded-xl'>
                        <WidgetsOutlinedIcon fontSize='large' className=' text-purple-500'/>
                    </div>
                    <div className='flex flex-col '>
                        <p className='text-md opacity-80'>Tất cả đơn</p>
                        <h3 className='text-bold text-4xl'>200</h3>
                    </div>
                </div>
                <div className='flex gap-4 border border-gray-300 cursor-pointer bg-white p-4 items-center rounded-2xl min-w-[180px]' >
                    <div className='border p-3 bg-green-200 rounded-xl'>
                        <AssignmentTurnedInOutlinedIcon fontSize='large' className='text-green-600'/>
                    </div>
                    <div className='flex flex-col '>
                        <p className='text-md opacity-80'>Đã xác nhận</p>
                        <h3 className='text-bold text-4xl'>200</h3>
                    </div>
                </div>
                <div className='flex gap-4 border border-gray-300 cursor-pointer bg-white p-4 items-center rounded-2xl min-w-[180px]'>
                    <div className='border p-3 bg-blue-200 rounded-xl'>
                        <AssignmentOutlinedIcon fontSize='large' className='text-blue-500'/>
                    </div>
                    <div className='flex flex-col '>
                        <p className='text-md opacity-80'>Chưa xác nhận</p>
                        <h3 className='text-bold text-4xl'>200</h3>
                    </div>
                </div>
            </div>
            <div  className='mt-20 px-32 w-fit'>
                <DataGrid initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 50,
                        },
                    },
                }}
                pageSizeOptions={[50]} getRowId={(row) => row.order_id} style={{ fontSize: '1.5rem' }} rows={orders} columns={columns} className='bg-white' />

            </div>

        </div>
    )
}
