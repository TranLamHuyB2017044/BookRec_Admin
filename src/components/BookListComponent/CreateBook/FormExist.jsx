import React from 'react'
import { Link } from 'react-router-dom'

export default function FormExist() {
    return (
        <div className='border mb-[10rem] border-black bg-white  flex flex-col gap-4  mx-auto w-fit h-fit mt-36 p-6  rounded-lg shadow-md'>
            <form>
                <h1 className="mb-2 py-2 mx-auto text-3xl text-justify border-b border-blue-500 font-bold">
                    Nhập thông tin hóa đơn
                </h1>
                <div className='form-group  flex gap-2 my-6'>
                    <label className='min-w-[150px] ' htmlFor="original_price">Số lượng (*)</label>
                    <div >
                        <input
                            className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                            type="number"
                            id='original_price'
                            // onChange={onChange}
                            placeholder='vd: 120000'
                        // {...register(`original_price`)}
                        />
                        {/* <p className='text-red-500 mt-2 text-xl'>{errors.original_price?.message}</p> */}
                    </div>
                </div>
                <div className='form-group  flex gap-2 my-6'>
                    <label className='min-w-[150px] ' htmlFor="inStock">Đơn Giá (*)</label>
                    <div className=''>
                        <input
                            className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                            type="number"
                            id='inStock'
                        // onChange={onChange}

                        // {...register(`inStock`)}
                        />
                        {/* <p className='text-red-500 mt-2 text-xl'>{errors.inStock?.message}</p> */}
                    </div>
                </div>
                <div className='form-group  flex gap-2 my-6'>
                    <label className='min-w-[150px] ' htmlFor="quantity_sold">Nhà cung cấp (*)</label>
                    <div className=''>

                        <input
                            className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                            type="number"
                            id='quantity_sold'
                        // onChange={onChange}

                        // {...register(`quantity_sold`)}
                        />
                        {/* <p className='text-red-500 mt-2 text-xl'>{errors.quantity_sold?.message}</p> */}
                    </div>
                </div>
                <div className='flex gap-8 justify-center mt-8'>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                            Nhập hàng
                        </button>
                        <Link to ='/check'
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                            Thoát
                        </Link>
                    </div>
            </form>
        </div>
    )
}
