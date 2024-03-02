import React from 'react'

export default function UpdateBookRight({ onChange, register, book }) {
    return (
        <div className='form-right'>
            <div className='form-group  flex gap-2 my-6'>
                <label className='min-w-[130px] ' htmlFor="original_price">Giá bán</label>
                <div className=''>

                    <input
                        className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                        type="number"
                        id='original_price'
                        onChange={onChange}
                        defaultValue={book.original_price}
                        placeholder='vd: 120000'
                        {...register(`original_price`)}
                    />
                </div>
            </div>
            <div className='form-group  flex gap-2 my-6'>
                <label className='min-w-[130px] ' htmlFor="inStock">Số lượng tồn kho</label>
                <div className=''>

                    <input
                        className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                        type="number"
                        id='inStock'
                        onChange={onChange}
                        defaultValue={book.inStock}
                        {...register(`inStock`)}
                    />
                </div>
            </div>
            <div className='form-group  flex gap-2 my-6'>
                <label className='min-w-[130px] ' htmlFor="quantity_sold">Số lượng đã bán</label>
                <div className=''>

                    <input
                        className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                        type="number"
                        id='quantity_sold'
                        onChange={onChange}
                        defaultValue={book.quantity_sold}
                        {...register(`quantity_sold`)}
                    />
                </div>
            </div>

            <div className='form-group  flex gap-2 my-6'>
                <label className='min-w-[130px] ' htmlFor="pages">Tổng số trang</label>
                <div className=''>

                    <input
                        className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                        type="number"
                        id='pages'
                        onChange={onChange}
                        defaultValue={book.pages}
                        {...register(`pages`)}
                    />
                </div>
            </div>
            <div className='form-group  flex gap-2 my-6'>
                <label className='min-w-[130px] ' htmlFor="discount">Tỉ lệ giảm</label>
                <div className=''>

                    <input
                        className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                        type="number"
                        id='discount'
                        onChange={onChange}
                        placeholder='vd: 15 <=> 15%'
                        defaultValue={book.discount}
                        {...register(`discount`)}
                    />
                </div>
            </div>
        </div>
    )
}
