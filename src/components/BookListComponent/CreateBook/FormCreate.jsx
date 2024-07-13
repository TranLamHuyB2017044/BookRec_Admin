import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import BookFormLeft from './BookFormLeft';
import BookFormRight from './BookFormRight';
import RestInfo from './RestInfo';
import Loading from '../../LoadingComponent/Loading';
import MyAlert from '../../AlertComponent/Alert';
import { PublicRequest, UserRequest } from '../../../service/Request'
const schema = yup.object().shape({
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
});

export default function FormCreate({ showToggle }) {
    const [loading, setLoading] = useState(false);
    const user_id = useSelector(state => state.currentUser.user_id)
    const { register, handleSubmit, setValue, getValues, formState: { errors }, control } = useForm({
        defaultValues: {
            books: [{}]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'books',
    });

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        setValue(`books[${index}].${name}`, value);
    };

    const onSubmit = async () => {
        const data = getValues();
        try {
            setLoading(true);
            const rs = await UserRequest.post(`/purchase/${user_id}`,data.books);
            if (rs.status === 200) {
                MyAlert.Alert('success', 'Nhập hàng thành công');
                setTimeout(() => {
                    setLoading(false);
                    showToggle()
                }, 2000)
            }
        } catch (error) {
            setLoading(false);
            MyAlert.Alert('error', 'Có lỗi xảy ra');
            console.log(error.message);
        }
    };
    


    return (
        <div>
            <div className={loading ? `flex items-center justify-center px-40 mt-12 mb-5` : `flex items-center justify-between px-40 mt-12 mb-5`}>
                {loading ? <Loading /> : <div className="border border-black bg-white  flex flex-col gap-4  mx-auto w-[100%] h-fit pb-6 px-6  rounded-lg shadow-md">
                    <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                        {fields.map((field, index) => (
                            <div key={field.id}>
                                <div className='book-form'>
                                    <div className='border-b border-blue-500 mb-2 py-2 flex justify-between items-center'>
                                        <h1 className="text-3xl text-justify  font-bold">
                                            Nhập thông tin sách thứ {index + 1}
                                        </h1>
                                        <div className='flex gap-8'>
                                            <button className='active:translate-y-1 hover:bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 rounded-md border border-white bg-[dodgerblue] text-white flex items-center w-[120px] gap-2 justify-center' type="button" onClick={() => append({})}>
                                                Add Input
                                            </button>
                                            {index > 0 && <button className='active:translate-y-1 hover:bg-gradient-to-r from-red-500 to-red-400 px-4 py-2 rounded-md border border-white bg-red-500 text-white flex items-center w-[120px] gap-2 justify-center' type="button" onClick={() => remove(index)}>
                                                Remove
                                            </button>}
                                        </div>
                                    </div>
                                    <div className='flex justify-between'>
                                        <BookFormLeft onChange={handleChange} errors={errors} register={register} index={index} />
                                        <BookFormRight onChange={handleChange} errors={errors} register={register} index={index} />
                                    </div>
                                </div>
                                <RestInfo onChange={handleChange} errors={errors} register={register} index={index} />
                            </div>
                        ))}
                        <div className='flex gap-8 justify-center mt-8'>
                            <button
                                type='submit'
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                            >
                                Nhập hàng
                            </button>
                            <button onClick={showToggle}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                            >
                                Thoát
                            </button>
                        </div>
                    </form>
                </div>}
            </div>
        </div>
    )
}
