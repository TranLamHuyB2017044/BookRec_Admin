import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { PublicRequest, UserRequest } from '../../../service/Request'
import { useParams } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
export default function PurchaseBookForm() {

    const [bookData, setBookData] = useState({})
    const params = useParams()
    const book_id = params.slug
    const onChange = (e) => {
        setBookData({ [e.target.name]: e.target.value });
    };

    const schema = yup
    .object({
        staff_name: yup.string().required("Tên nhân viên là bắt buộc"),
        publisher_name: yup.string().required("Tên nhà cung cấp là bắt buộc"),
        unit_price: yup.string().required("Đơn giá là bắt buộc"),
        quantity_ordered: yup.string().required("Số lượng là bắt buộc"),
    })
    .required();


    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
    })

    const handlePurchaseBook = (data) => {
        try {
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='mt-[60px]'>
            <h1 className='text-center text-5xl font-semibold'>Nhập thêm sách</h1>
            <form onSubmit={handleSubmit(handlePurchaseBook)} className='border-[1px] bg-white py-8 px-16 mt-20 rounded-2xl'>
                <h1 className='font-bold border-b border-[dodgerblue] text-3xl'>Nhập thông tin</h1>
                <div className='form-group  flex gap-2 mb-6 mt-16'>
                    <label className='min-w-[150px] ' htmlFor="staff_name">Tên nhân viên (*)</label>
                    <div className=''>
                        <input
                            className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                            type="text"
                            id='staff_name'
                            onChange={onChange}
                            {...register(`staff_name`)}
                        />
                        <p className='text-red-500 mt-2 text-xl'>{errors.staff_name?.message}</p>
                    </div>
                </div>
                <div className='form-group  flex gap-2 my-6'>
                    <label className='min-w-[150px] ' htmlFor="quantity_ordered">Số lượng (*)</label>
                    <div className=''>

                        <input
                            className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                            type="number"
                            id='quantity_ordered'
                            onChange={onChange}

                            {...register(`quantity_ordered`)}
                        />
                        <p className='text-red-500 mt-2 text-xl'>{errors.quantity_ordered?.message}</p>
                    </div>
                </div>
                <div className='form-group  flex gap-2 my-6'>
                    <label className='min-w-[150px] ' htmlFor="unit_price">Đơn giá (*)</label>
                    <div className=''>
                        <input
                            className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                            type="number"
                            id='unit_price'
                            onChange={onChange}
                            placeholder='vd: 120000'
                            {...register(`unit_price`)}
                        />
                        <p className='text-red-500 mt-2 text-xl'>{errors.unit_price?.message}</p>
                    </div>
                </div>

                <div className='form-group  flex gap-2 my-6'>
                    <label className='min-w-[150px] ' htmlFor="publisher_name">Tên nhà cung cấp (*)</label>
                    <div className=''>

                        <input
                            className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                            type="text"
                            id='publisher_name'
                            onChange={onChange}

                            {...register(`publisher_name`)}
                        />
                        <p className='text-red-500 mt-2 text-xl'>{errors.publisher_name?.message}</p>
                    </div>
                </div>
                {/* <div className='flex justify-center gap-8 mt-8'>
                    <button className='hover:bg-gradient-to-r from-red-500 to-red-400 px-4 py-2 rounded-md border text-white  w-[120px] bg-[#d84949] ' type='submit' >Nhập hàng</button>
                    <button type='button' className='hover:bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 rounded-md border  w-[120px] bg-[dodgerblue] text-white' onClick={setShowForm}>Trở về</button>
                </div> */}
            </form>
        </div>
    )
}
