import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { PublicRequest } from '../../service/Request'
import MyAlert from '../../components/AlertComponent/Alert'
import Loading from '../../components/LoadingComponent/Loading'
import BookFormLeft from './BookFormLeft';
import BookFormRight from './BookFormRight';
import RestInfo from './RestInfo';
export default function FormBook({ handleOutToogle }) {
    const [loading, setLoading] = useState(false)
    const [bookInfo, setBookInfo] = useState({
        title: '',
        short_description: '',
        category: '',
        author_name: '',
        publisher_name: '',
        manufacturer_name: '',
        publication_date: '',
        original_price: 0,
        inStock: 0,
        quantity_sold: 0,
        avg_rating: 0,
        pages: 0,
        discount: 0,
    })

    const schema = yup
        .object({
            title: yup.string().required("Tên sách là bắt buộc"),
            short_description: yup.string().required("Mô tả chung là bắt buộc"),
            category: yup.string().required("Thể loại sách là bắt buộc"),
            author_name: yup.string().required("Tên tác giả là bắt buộc"),
            publisher_name: yup.string().required("Tên nhà cung cấp là bắt buộc"),
            manufacturer_name: yup.string().required("Tên nhà xuất bản là bắt buộc"),
            original_price: yup.string().required("giá bán là bắt buộc"),
            publication_date: yup.string().required("Ngày xuất bản là bắt buộc"),
            inStock: yup.string().required("Tồn kho là bắt buộc"),
            quantity_sold: yup.string().required("Số lượng đã bán là bắt buộc"),
            avg_rating: yup.string().required("Đánh giá là bắt buộc"),
            pages: yup.string().required("Số trang là bắt buộc"),
            discount: yup.string().required("Tỉ lệ giảm là bắt buộc"),
        })
        .required();
        
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
    })

    const onChange = (e) => {
        setBookInfo({ ...bookInfo, [e.target.name]: e.target.value });
    };

    const onSubmit = async (data) => {
        const { title, short_description, category, author_name, publisher_name, publication_date, manufacturer_name, original_price, inStock, quantity_sold, avg_rating, pages, discount, coverBooks } = data;
        window.scrollTo(0, 0);
        setLoading(true)
        try {
            const formData = new FormData()
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(publication_date)) {
                MyAlert.Alert('info', 'Ngày xuất bản không đúng định dạng yyyy-mm-dd');
                setLoading(false);
                return;
            }
            formData.append('title', title)
            formData.append('short_description', short_description)
            formData.append('category', category)
            formData.append('author_name', author_name)
            formData.append('publisher_name', publisher_name)
            formData.append('publication_date', publication_date)
            formData.append('manufacturer_name', manufacturer_name)
            formData.append('inStock', inStock)
            formData.append('quantity_sold', quantity_sold)
            formData.append('avg_rating', avg_rating)
            formData.append('original_price', original_price)
            formData.append('pages', pages)
            formData.append('discount', discount)
            if (coverBooks.length < 4) {
                MyAlert.Alert('info', 'Vui lòng chọn 4 ảnh')
                setLoading(false);
            } else {
                for (let i = 0; i < coverBooks.length; i++) {
                    formData.append('coverBooks', coverBooks[i]);
                }
                await PublicRequest.post('/collection/', formData)
                MyAlert.Alert('success', 'Nhập thông tin sách mới thành công')
                setLoading(false)
                handleOutToogle()
            }
        } catch (error) {
            setLoading(false)
            MyAlert.Alert('error', error.response.data)
        }
    }

    return (
        <div className={loading ? `flex items-center justify-center px-40 mt-12 mb-5` : `flex items-center justify-between px-40 mt-12 mb-5`}>
            {loading ? <Loading /> : <div className="border border-black bg-white  flex flex-col gap-4  mx-auto w-[100%] h-fit p-6  rounded-lg shadow-md">
                <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                    <div className='book-form'>
                        <h1 className="mb-2 py-2 mx-auto text-3xl text-justify border-b border-blue-500 font-bold">
                            Nhập thông tin sách mới
                        </h1>
                        <div className='flex justify-between'>
                            <BookFormLeft onChange={onChange} errors={errors} register={register}/>
                            <BookFormRight onChange={onChange} errors={errors} register={register}/>
                        </div>
                    </div>
                    <RestInfo onChange={onChange} errors={errors} register={register}/>
                    <div className='flex gap-8 justify-center mt-8'>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                            Kiểm tra
                        </button>
                        <button
                            onClick={handleOutToogle}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                            Thoát
                        </button>
                    </div>
                </form>
            </div>}
        </div>
    )
}
