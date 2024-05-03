import React from 'react'

export default function BookFormRight({onChange, errors, register}) {
    return (
        <div className='form-right'>
            <div className='form-group  flex gap-2 my-6'>
                <label className='min-w-[150px] ' htmlFor="original_price">Giá bán (*)</label>
                <div className=''>

                    <input
                        className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                        type="number"
                        id='original_price'
                        onChange={onChange}
                        placeholder='vd: 120000'
                        {...register(`original_price`)}
                    />
                    <p className='text-red-500 mt-2 text-xl'>{errors.original_price?.message}</p>
                </div>
            </div>
            <div className='form-group  flex gap-2 my-6'>
                <label className='min-w-[150px] ' htmlFor="inStock">Số lượng tồn kho (*)</label>
                <div className=''>

                    <input
                        className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                        type="number"
                        id='inStock'
                        onChange={onChange}

                        {...register(`inStock`)}
                    />
                    <p className='text-red-500 mt-2 text-xl'>{errors.inStock?.message}</p>
                </div>
            </div>
            <div className='form-group  flex gap-2 my-6'>
                <label className='min-w-[150px] ' htmlFor="quantity_sold">Số lượng đã bán (*)</label>
                <div className=''>

                    <input
                        className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                        type="number"
                        id='quantity_sold'
                        onChange={onChange}

                        {...register(`quantity_sold`)}
                    />
                    <p className='text-red-500 mt-2 text-xl'>{errors.quantity_sold?.message}</p>
                </div>
            </div>

            <div className='form-group  flex gap-2 my-6'>
                <label className='min-w-[150px] ' htmlFor="pages">Tổng số trang (*)</label>
                <div className=''>

                    <input
                        className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                        type="number"
                        id='pages'
                        onChange={onChange}

                        {...register(`pages`)}
                    />
                    <p className='text-red-500 mt-2 text-xl'>{errors.pages?.message}</p>
                </div>
            </div>
            <div className='form-group  flex gap-2 my-6'>
                <label className='min-w-[150px] ' htmlFor="discount">Tỉ lệ giảm (*)</label>
                <div className=''>

                    <input
                        className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                        type="number"
                        id='discount'
                        onChange={onChange}
                        placeholder='vd: 15 <=> 15%'
                        {...register(`discount`)}
                    />
                    <p className='text-red-500 mt-2 text-xl'>{errors.discount?.message}</p>
                </div>
            </div>
        </div>
    )
}
