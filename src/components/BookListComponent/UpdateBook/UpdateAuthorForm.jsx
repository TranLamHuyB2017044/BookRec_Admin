import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { PublicRequest, UserRequest } from '../../../service/Request';
import { useParams } from 'react-router-dom';
import MyAlert from '../../AlertComponent/Alert'

export default function UpdateAuthorForm({ setShowForm }) {
    const [authorkData, setAuthorData] = useState('')
    const params = useParams()
    const book_id = params.slug
    useEffect(() => {
        const getAuthorData = async () => {
            const response = await PublicRequest.get(`/collection/${book_id}`)
            setAuthorData(response.data[0].author_name)
        }
        getAuthorData()
    }, [book_id])
    const schema = yup
        .object({
            author_name: yup.string().required("Tên tác giả là bắt buộc"),
        })
        .required();

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
    })



    const onSubmit = async (data) => {
        console.log(data.author_name)
        console.log(authorkData)
        try {
            if(data.author_name === authorkData){
                MyAlert.Alert('error', 'Không có thay đổi thông tin tác giả')
            }else{
                const response = await UserRequest.put(`/collection/author/${book_id}`, data)
                MyAlert.Alert(response.data.status, 'Cập nhật tên tác giả thành công')
                await setShowForm()
            }
        } catch (error) {
            MyAlert.Alert('error',error.response.data.message)
        }
    }
    return (
        <div>
            <form action="#" onSubmit={handleSubmit(onSubmit)}>
                <div className='author-form'>
                    <h1 className="mb-2 py-2 mx-auto text-3xl text-justify border-b border-blue-500 font-bold">
                       Thay đổi thông tin tác giả
                    </h1>
                    <div className='form-group  flex gap-2 my-6'>
                        <label className='min-w-[130px] ' htmlFor="author_name">Tên tác giả</label>
                        <div className=''>
                            <input
                                className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                                type="text"
                                id='author_name'
                                onChange={(e) => e.target.value}
                                defaultValue={authorkData}
                                {...register(`author_name`)}
                            />
                            <p className='text-red-500 mt-2 text-xl'>{errors.author_name?.message}</p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center gap-8 mt-8'>
                    <button className='hover:bg-gradient-to-r from-red-500 to-red-400 px-4 py-2 rounded-md border text-white  w-[120px] bg-[#d84949] ' type='submit'>Chỉnh sửa</button>
                    <button type='button' className='hover:bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 rounded-md border  w-[120px] bg-[dodgerblue] text-white' onClick={setShowForm}>Trở về</button>
                </div>
            </form>
        </div>
    )
}
