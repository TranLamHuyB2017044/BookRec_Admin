import React, { useCallback, useEffect, useState } from 'react'
import { UserRequest } from '../../service/Request'
import { Link } from 'react-router-dom'
export default function OrderBookList() {
    const [purchaseOrders, setPurchaseOrders] = useState([])

    useEffect(() => {
        const getAllPurchaseOrders = async () => {
            const rs = await UserRequest.get('/purchase')
            console.log(rs.data)
            setPurchaseOrders(rs.data)
        }
        getAllPurchaseOrders()
    }, [])

    const TotalPrice = useCallback(items => {
        let total = 0;
        // eslint-disable-next-line array-callback-return
        items.map(item => {
            total += item.unit_price * item.quantity_ordered
        })
        return total
    }, [])

    return (
        <div className='mt-[5rem] px-8'>
            <Link to="/" className='float-end -mt-20 active:translate-y-1 hover:bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 rounded-md border border-white bg-[dodgerblue] text-white flex items-center w-[120px] gap-2 justify-center'>Trở về</Link>
            {
                purchaseOrders.length <= 0 ? (
                    <div className='h-screen'>
                        <div className='grid grid-cols-6 px-4 py-2 mt-16 mx-auto'>
                            <p className='col-span-6'>không có đơn hàng nào</p>
                        </div>
                    </div>
                ) :
                    purchaseOrders.map((order) => (
                        <div key={order.purchase_id} className='py-8 px-8 mt-4 bg-white rounded-lg  '>
                            <div className='grid grid-cols-3 px-4'>
                                <div className='col-span-1'>
                                    <p>Mã đơn hàng</p>
                                </div>
                                <div className='col-span-1'>
                                    <p>Tên người đặt</p>
                                </div>
                                <div className='col-span-1'>
                                    <p>Ngày đặt hàng</p>
                                </div>
                            </div>
                            <div className='grid grid-cols-3 px-4 py-4 '>
                                <div className='col-span-1'>
                                    <p className='text-gray-500'>{order.purchase_id}</p>
                                </div>
                                <div className='col-span-1'>
                                    <p className='text-gray-500'>{order.fullname}</p>
                                </div>
                                <div className='col-span-1'>
                                    <p className='text-gray-500'>{order.order_date.substring(0, order.order_date.indexOf('T'))}</p>
                                </div>
                            </div>
                            {order.items.map((item, id) => (
                                <div key={id} className='grid grid-cols-6 px-4 py-4 mt-4 border-t  bg-white'>
                                    <div className='col-span-2'>
                                        <p className='text-gray-500'>{item.title}</p>
                                    </div>
                                    <div className='col-span-1'>
                                        <p className='text-gray-500'>Số lượng: {item.quantity_ordered}</p>
                                    </div>
                                    <div className='col-span-1'>
                                        <p className='text-gray-500'>Đơn giá: {item.unit_price}</p>
                                    </div>
                                    <div className='col-span-1'>
                                        <p className='text-gray-500'>Nhà cung cấp: {item.publisher_name}</p>
                                    </div>
                                    <div className='col-span-1'>
                                        <p className='text-gray-500'>Thành tiền: {(item.quantity_ordered * item.unit_price).toLocaleString()} &#8363;</p>
                                    </div>
                                </div>
                            ))}

                            <div className='flex flex-col items-end justify-end mt-20 pt-10 border-t'>
                                <div className='flex gap-2  mr-32 mb-4 pr-8'>
                                    <p className='text-3xl text-gray-500'>Tổng tiền: </p>
                                    <p className='text-4xl text-blue-400 text-bold'>{TotalPrice(order.items).toLocaleString()} &#8363;</p>
                                </div>
                            </div>
                        </div>
                    ))
            }
        </div>
    )
}
