import React from 'react'

export default function BookFormLeft({onChange, errors, register, index}) {

    
    return (
        <div className='form-left'>
            <div className='form-group  flex gap-2 my-6'>
                <label className='min-w-[150px] ' htmlFor="title">Tiêu đề sách (*)</label>
                <div className=''>
                    <input
                        className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                        type="text"
                        id='title'
                        onChange={(e) => onChange(index, e)}
                        {...register(`books.${index}.title`)}
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
                        onChange={(e) => onChange(index, e)}
                        {...register(`books.${index}.short_description`)}
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
                        onChange={(e) => onChange(index, e)}

                        {...register(`books.${index}.category`)}
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
                        onChange={(e) => onChange(index, e)}
                        placeholder='yyyy-mm-dd'
                        {...register(`books.${index}.publication_date`)}
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
                        onChange={(e) => onChange(index, e)}
                        placeholder='1 -> 5'
                        {...register(`books.${index}.avg_rating`)}
                    />
                    <p className='text-red-500 mt-2 text-xl'>{errors.avg_rating?.message}</p>
                </div>
            </div>
            {/* <div className='form-group  flex gap-2 my-6'>
                <label className='min-w-[150px] ' htmlFor="coverBooks">Hình ảnh về sách (*)</label>
                <div className=''>
                    <input
                        className='w-[250px] rounded-md h-[35px] pl-2 '
                        type="file"
                        multiple={true}
                        onChange={(e) => e.target.files}
                        id='coverBooks'
                        name='coverBooks'
                        {...register(`books.${index}.coverBooks`)}
                    />
                    <p className='text-red-500 mt-2 text-xl'>{errors.?.message}</p>
                </div>
            </div> */}

        </div>
    )
}
