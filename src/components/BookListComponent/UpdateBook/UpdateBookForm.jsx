import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { PublicRequest, UserRequest } from '../../../service/Request'
import MyAlert from '../../AlertComponent/Alert'
import Loading from '../../LoadingComponent/Loading'
import UpdateBookLeft from './UpdateBookLeft';
import UpdateBookRight from './UpdateBookRight';
import { useParams } from 'react-router-dom';
export default function UpdateBookForm({ setShowForm }) {

    const [bookData, setBookData] = useState({})
    const params = useParams()
    const book_id = params.slug
    const [loadind, setLoading] = useState(false)
    useEffect(() => {
        const getDataBook = async () => {
            try {
                const response = await PublicRequest.get(`/collection/${book_id}`)
                setBookData(response.data[0])
            } catch (error) {
                console.log(error.response.data)
            }
        }
        getDataBook()
    }, [book_id])


    const { register, handleSubmit } = useForm({})

    const onChange = (e) => {
        setBookData({ [e.target.name]: e.target.value });
    };

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            Object.values(data).map(async (value) => {
                if (value === '') {
                    MyAlert.Alert('info', 'Bạn chưa thay đổi thông tin nào')
                    setLoading(false)
                } else {
                    const response = await UserRequest.put(`/collection/book/${book_id}`, data)
                    if (response) {
                        MyAlert.Alert('success', 'Thay đổi thông tin sách thành công')
                        setLoading(false)
                        setShowForm()
                    }
                }
            })
        } catch (error) {
            MyAlert.Alert('error', 'Có lỗi xảy ra vui lòng thử lại')
            console.log(error.message)
        }
    }

    return (
        <div className='py-20 px-36'>
            <h1 className='text-center text-5xl mb-12 font-semibold'>Chỉnh sửa thông tin về sách</h1>
            {loadind ? <Loading /> :
                <form action="#" onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex justify-center gap-16'>
                        <UpdateBookLeft onChange={onChange} register={register} book={bookData} />
                        <UpdateBookRight onChange={onChange} register={register} book={bookData} />
                    </div>
                    <div className='flex justify-center gap-8 mt-8'>
                        <button className='hover:bg-gradient-to-r from-red-500 to-red-400 px-4 py-2 rounded-md border text-white  w-[120px] bg-[#d84949] ' type='submit'>Chỉnh sửa</button>
                        <button type='button' className='hover:bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 rounded-md border  w-[120px] bg-[dodgerblue] text-white' onClick={setShowForm}>Trở về</button>
                    </div>
                </form>
            }
        </div>
    )
}
