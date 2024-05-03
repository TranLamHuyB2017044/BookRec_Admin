import React from 'react'

export default function BookFormLeft({onChange, errors, register}) {
    return (
        <div className='form-left'>
            <div className='form-group  flex gap-2 my-6'>
                <label className='min-w-[150px] ' htmlFor="title">Tiêu đề sách (*)</label>
                <div className=''>
                    <input
                        className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                        type="text"
                        id='title'
                        onChange={onChange}

                        {...register(`title`)}
                    />
                    <p className='text-red-500 mt-2 text-xl'>{errors.title?.message}</p>
                </div>
            </div>
            <div className='form-group  flex gap-2 my-6'>
                <label className='min-w-[150px] ' htmlFor="short_description">Tóm tắt nội dung (*)</label>
                <div className=''>

                    <textarea
                        className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                        type="text"
                        id='short_description'

                        {...register(`short_description`)}
                    />
                    <p className='text-red-500 mt-2 text-xl'>{errors.short_description?.message}</p>
                </div>
            </div>
            <div className='form-group  flex gap-2 my-6'>
                <label className='min-w-[150px] ' htmlFor="category">Thể loại (*)</label>
                <div className=''>

                    <input
                        className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                        type="text"
                        id='category'
                        onChange={onChange}

                        {...register(`category`)}
                    />
                    <p className='text-red-500 mt-2 text-xl'>{errors.category?.message}</p>
                </div>
            </div>
            <div className='form-group  flex gap-2 my-6'>
                <label className='min-w-[150px] ' htmlFor="publication_date">Ngày xuất bản (*)</label>
                <div className=''>

                    <input
                        className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                        type="text"
                        id='publication_date'
                        onChange={onChange}
                        placeholder='yyyy-mm-dd'
                        {...register(`publication_date`)}
                    />
                    <p className='text-red-500 mt-2 text-xl'>{errors.publication_date?.message}</p>
                </div>
            </div>
            <div className='form-group  flex gap-2 my-6'>
                <label className='min-w-[150px] ' htmlFor="avg_rating">Số sao đánh giá (*)</label>
                <div className=''>

                    <input
                        className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                        type="number"
                        id='avg_rating'
                        onChange={onChange}
                        placeholder='1 -> 5'
                        {...register(`avg_rating`)}
                    />
                    <p className='text-red-500 mt-2 text-xl'>{errors.avg_rating?.message}</p>
                </div>
            </div>
            <div className='form-group  flex gap-2 my-6'>
                <label className='min-w-[150px] ' htmlFor="coverBooks">Hình ảnh về sách (*)</label>
                <div className=''>

                    <input
                        className='w-[250px] rounded-md h-[35px] pl-2 '
                        type="file"
                        multiple={true}
                        id='coverBooks'
                        name='coverBooks'
                        {...register(`coverBooks`)}
                    />
                    {/* <p className='text-red-500 mt-2 text-xl'>{errors.?.message}</p> */}
                </div>
            </div>

        </div>
    )
}
