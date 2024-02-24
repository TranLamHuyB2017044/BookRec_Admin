import React from 'react'

export default function RestInfo({onChange, errors, register}) {
    return (
        <div>
            <div className='author-form'>
                <h1 className="mb-2 py-2 mx-auto text-3xl text-justify border-b border-blue-500 font-bold">
                    Nhập thông tin tác giả
                </h1>
                <div className='form-group  flex gap-2 my-6'>
                    <label className='min-w-[130px] ' htmlFor="author_name">Tên tác giả</label>
                    <div className=''>
                        <input
                            className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                            type="text"
                            id='author_name'
                            onChange={onChange}

                            {...register(`author_name`)}
                        />
                        <p className='text-red-500 mt-2 text-xl'>{errors.author_name?.message}</p>
                    </div>
                </div>
            </div>
            <div className='manufacturer-form'>
                <h1 className="mb-2 py-2 mx-auto text-3xl text-justify border-b border-blue-500 font-bold">
                    Nhập thông tin nhà xuất bản
                </h1>
                <div className='form-group  flex gap-2 my-6'>
                    <label className='min-w-[130px] ' htmlFor="manufacturer_name">Tên nhà xuất bản</label>
                    <div className=''>
                        <input
                            className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                            type="text"
                            id='manufacturer_name'
                            onChange={onChange}

                            {...register(`manufacturer_name`)}
                        />
                        <p className='text-red-500 mt-2 text-xl'>{errors.manufacturer_name?.message}</p>
                    </div>
                </div>
            </div>
            <div className='publisher-form'>
                <h1 className="mb-2 py-2 mx-auto text-3xl text-justify border-b border-blue-500 font-bold">
                    Nhập thông tin nhà cung cấp
                </h1>
                <div className='form-group  flex gap-2 my-6'>
                    <label className='min-w-[130px] ' htmlFor="publisher_name">Tên nhà cung cấp</label>
                    <div className=''>

                        <input
                            className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                            type="text"
                            id='publisher_name'

                            {...register(`publisher_name`)}
                        />
                        <p className='text-red-500 mt-2 text-xl'>{errors.publisher_name?.message}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
