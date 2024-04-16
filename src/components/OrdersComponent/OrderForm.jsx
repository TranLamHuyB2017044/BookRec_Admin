import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserRequest } from '../../service/Request'

export default function OrderForm() {
    const [showDropDown, setShowDropDown] = useState(false)
    const [order, setOrder] = useState()
    const params = useParams()
    useEffect(() => {
        const order_id = params.orderId
        const getOrderById = async () => {
            try {
                const rs = await UserRequest.get(`/order/detail/${order_id}`)
                if (rs.status === 200) {
                    setOrder(rs.data)
                }
            } catch (error) {
                console.log(error)
            }

        }
        getOrderById()

    }, [])

    const CaculateSubtotalAndDiscount = useMemo(() => {
        let subTotal = 0;
        let discountTotal = 0;
        order?.orderItems.forEach((orderItem) => {
            subTotal += orderItem.original_price;
            discountTotal += (orderItem.original_price * (orderItem.discount / 100));
        });

        return {
            subTotal: subTotal.toLocaleString(),
            discountTotal: discountTotal.toLocaleString()
        };
    }, [order]);


    return (
        <div>
            <div className='flex justify-between gap-2 mt-16 ml-12 items-center'>
                <div className='flex gap-2'>
                    <p className='text-[#5c6871]'>Thời gian đặt</p>
                    <p>{order?.order_date.substring(0, order.order_date.indexOf('T'))}</p>
                </div>
                <div className='flex gap-8 '>
                    <div className="relative inline-block text-left ">
                        <div>
                            <button onClick={() => setShowDropDown(!showDropDown)} type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                Chỉnh sửa
                                <svg className="-mr-1 h-10 w-10 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        {showDropDown && <div className="duration-300 absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" >
                            <div className="py-1">
                                <p className="text-gray-700 block px-4 py-4 cursor-pointer hover:bg-[#b5d0e8]" id="menu-item-0">Đã thanh toán</p>
                                <p className="text-gray-700 block px-4 py-4 cursor-pointer hover:bg-[#b5d0e8]" id="menu-item-1">Hủy đơn hàng</p>
                            </div>
                        </div>}
                    </div>
                    <Link to='/manageOrders'
                        className='mr-20 active:translate-y-1 hover:bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 rounded-md 
                        border border-white bg-[dodgerblue] text-white flex items-center w-[120px] gap-2 justify-center'
                    >Trở về</Link>

                </div>
            </div>
            {order?.orderItems.map((orderItem, index) => (
                <section key={index} className='grid grid-cols-4 border-[1px] bg-white my-5 w-[95%] mx-auto p-10 rounded-xl'>
                    <div className='col-span-1 w-[200px] h-[200px]'>
                        <img className='w-full h-full' src={orderItem.thumbnail_url} alt="cover-img" />
                    </div>
                    <div className='col-span-1 flex flex-col gap-2'>
                        <h3 className='text-[#84a3be]'>{orderItem.title}</h3>
                        <h3 className='mt-5'>{(orderItem.original_price).toLocaleString()} vnđ </h3>
                        <h3>Số lượng: x{orderItem.quantity}</h3>
                        <h3>Giảm giá: - {orderItem.discount}%</h3>
                    </div>
                    <div className='col-span-1'>
                        <h3 className='text-[#84a3be]'>Địa chỉ</h3>
                        <p className='mt-5'>{order.address}</p>
                    </div>
                    <div className='col-span-1'>
                        <h3 className='text-[#84a3be]'>Trạng thái thanh toán</h3>
                        <div className='mt-5 flex justify-between items-center '>
                            <p className={order.payment_status === 'Chưa thanh toán' ? 'text-[dodgerblue] ' : order.payment_status === 'Đã thanh toán' ? 'text-green-500' : 'text-red-500'}>Chưa thanh toán</p>

                        </div>
                    </div>
                </section>
            ))}
            <section className='grid grid-cols-5 border-[1px] bg-white my-5 w-[95%] mx-auto p-10 rounded-xl'>
                <div className='col-span-1'>
                    <h3 className='text-[#84a3be] my-6'>Địa chỉ</h3>
                    <p className='mt-5'>{order?.address}</p>
                </div>
                <div className='col-span-1'>
                    <h3 className='text-[#84a3be] my-6'>Phương thức thanh toán</h3>
                    <p className='mt-5'>{order?.payment_method}</p>
                </div>
                <div className='col-span-1'>
                    <h3 className='text-[#84a3be] my-6'>Phương thức giao hàng</h3>
                    <p className='mt-5'>{order?.shipping_method}</p>
                </div>
                <div className='col-span-2'>
                    <div className='flex justify-between items-center border-b my-6'>
                        <p className='text-[#84a3be]'>Tạm tính</p>
                        <p>{CaculateSubtotalAndDiscount.subTotal} vnđ</p>
                    </div>
                    <div className='flex justify-between items-center border-b my-6'>
                        <p className='text-[#84a3be]'>{order?.shipping_method}</p>
                        <p>{order?.shipping_method === 'Giao hàng tận nơi' ? '28,000' : '15,000'} vnđ</p>
                    </div>
                    <div className='flex justify-between items-center border-b my-6'>
                        <p className='text-[#84a3be]'>Giảm giá</p>
                        <p>- {CaculateSubtotalAndDiscount.discountTotal} vnđ</p>
                    </div>
                    <div className='flex justify-between items-center border-b my-6'>
                        <p className=''>Tổng cộng</p>
                        <p className='text-purple-500'>{(order?.total_price)?.toLocaleString()} vnđ</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
