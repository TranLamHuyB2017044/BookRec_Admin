import React from 'react'

export default function UpdateBookLeft({ onChange, register, book }) {
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
                        defaultValue={book.title}
                        {...register(`title`)}
                    />
                </div>
            </div>
            <div className='form-group  flex gap-2 my-6'>
                <label className='min-w-[150px] ' htmlFor="short_description">Tóm tắt nội dung (*)</label>
                <div className=''>

                    <textarea
                        className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                        type="text"
                        id='short_description'
                        defaultValue={book.short_description}
                        {...register(`short_description`)}
                    />
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
                        defaultValue={book.category}
                        {...register(`category`)}
                    />
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
                        defaultValue={book.avg_rating}
                        placeholder='1 -> 5'
                        {...register(`avg_rating`)}
                    />
                </div>
            </div>
        </div>
    )
}
