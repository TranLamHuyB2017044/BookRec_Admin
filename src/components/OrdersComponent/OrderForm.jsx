import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserRequest } from '../../service/Request'
import myAlert from '../AlertComponent/Alert'
import Swal from "sweetalert2";
import { useSelector } from 'react-redux';

export default function OrderForm() {
    const [order, setOrder] = useState()
    const params = useParams()
    const user = useSelector(state => state.currentUser)
    const navigate = useNavigate()

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


    const handleUpdateStatus = (e) => {
        const status = e.target.value
        const orderId = params.orderId
        const convert_status = status === 'accepted' ? 'đã thanh toán' : 'hủy đơn hàng'
        const convert_status_to_uppercase = status === 'accepted' ? 'Đã thanh toán' : 'Hủy đơn hàng'
        const convert_status_to_update = status === 'accepted' ? 'Đã thanh toán' : 'Đã hủy'
        if(status === 'Chỉnh sửa'){
            return false
        }
        myAlert.Confirm(convert_status_to_uppercase, 'question', 'Xác nhận '+ convert_status + ' cho đơn hàng này', 'Có', 'Thoát')
            .then(async (result) => {
                if (result.value) {
                    const { value: password } = await Swal.fire({
                        title: "Vui lòng nhập password của bạn để xác nhận " + convert_status ,
                        input: "password",
                        inputLabel: "Password",
                        inputPlaceholder: "Enter your password",
                        inputAttributes: {
                            maxlength: "10",
                            autocapitalize: "off",
                            autocorrect: "off"
                        }
                    });
                    if (password) {
                        const response = await UserRequest.post('/user/login/admin', { email: user.email, password: password });
                        if (response.status === 200) {
                            await UserRequest.put(`/order/detail/${orderId}`, {status: convert_status_to_update})
                            myAlert.Alert('success', 'Cập nhật trạng thái đơn hàng thành công')
                            navigate('/manageOrders')
                        } else {
                            Swal.fire(`Sai mật khẩu`);
                        }
                    }

                }
            })
            .catch(error => {
                const errorMessage = error.response?.data || "An error occurred.";
                myAlert.Alert("error", errorMessage);
            });

    }
    return (
        <div  className='mb-[60px]'>
            <div className='flex justify-between gap-2 mt-16 ml-12 items-center'>
                <div className='flex gap-2'>
                    <p className='text-[#5c6871]'>Thời gian đặt</p>
                    <p>{order?.order_date.substring(0, order.order_date.indexOf('T'))}</p>
                </div>
                <div className='flex gap-8 '>
                    {order?.payment_status === 'Chưa thanh toán' && <div className="relative inline-block text-left ">
                        <select onChange={handleUpdateStatus} id="edit" className='px-2 py-3 rounded-md'>
                            <option defaultChecked >Chỉnh sửa</option>
                            <option value="accepted">Đã thanh toán</option>
                            <option value="rejected">Hủy đơn hàng</option>
                        </select>
                    </div>}
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
                            <p className={order.payment_status === 'Chưa thanh toán' ? 'text-[dodgerblue] ' : order.payment_status === 'Đã thanh toán' ? 'text-green-500' : 'text-red-500'}>{order.payment_status}</p>

                        </div>
                    </div>
                </section>
            ))}
            <section className='grid grid-cols-5 border-[1px] bg-white my-5 w-[95%] mx-auto p-10 rounded-xl '>
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
