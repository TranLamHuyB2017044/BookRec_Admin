import React from 'react'

export default function BookFormRight({ onChange, errors, register, index }) {


    return (
        <div className='form-right'>
            <div className='form-group  flex gap-2 my-6'>
                <label className='min-w-[150px] ' htmlFor="original_price">Giá bán (*)</label>
                <div className=''>
                    <input
                        className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                        type="number"
                        id='original_price'
                        onChange={(e) => onChange(index, e)}
                        min={0}
                        placeholder='vd: 120000'
                        {...register(`books.${index}.original_price`)}
                    />
                    {/* <p className='text-red-500 mt-2 text-xl'>{errors.original_price?.message}</p> */}
                </div>
            </div>
            <div className='form-group  flex gap-2 my-6'>
                <label className='min-w-[150px] ' htmlFor="inStock">Số lượng tồn kho (*)</label>
                <div className=''>
                    <input
                        className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                        type="number"
                        id='inStock'
                        onChange={(e) => onChange(index, e)}
                        min={0}
                        {...register(`books.${index}.inStock`)}
                    />
                    {/* <p className='text-red-500 mt-2 text-xl'>{errors.inStock?.message}</p> */}
                </div>
            </div>
            <div className='form-group  flex gap-2 my-6'>
                <label className='min-w-[150px] ' htmlFor="quantity_sold">Số lượng đã bán (*)</label>
                <div className=''>
                    <input
                        className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                        type="number"
                        id='quantity_sold'
                        onChange={(e) => onChange(index, e)}
                        min={0}
                        {...register(`books.${index}.quantity_sold`)}
                    />
                    {/* <p className='text-red-500 mt-2 text-xl'>{errors.quantity_sold?.message}</p> */}
                </div>
            </div>

            <div className='form-group  flex gap-2 my-6'>
                <label className='min-w-[150px] ' htmlFor="pages">Tổng số trang (*)</label>
                <div className=''>
                    <input
                        className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                        type="number"
                        min={0}
                        id='pages'
                        onChange={(e) => onChange(index, e)}
                        {...register(`books.${index}.pages`)}
                    />
                    {/* <p className='text-red-500 mt-2 text-xl'>{errors.pages?.message}</p> */}
                </div>
            </div>
            <div className='form-group  flex gap-2 my-6'>
                <label className='min-w-[150px] ' htmlFor="discount">Tỉ lệ giảm (*)</label>
                <div className=''>
                    <input
                        className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                        type="number"
                        id='discount'
                        min={0}
                        onChange={(e) => onChange(index, e)}
                        placeholder='vd: 15 <=> 15%'
                        {...register(`books.${index}.discount`)}
                    />
                    {/* <p className='text-red-500 mt-2 text-xl'>{errors.discount?.message}</p> */}
                </div>
            </div>
        </div>
    )
}
