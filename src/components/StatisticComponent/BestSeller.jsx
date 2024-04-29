import React from 'react'
import { BestSellerData } from '../../data'
export default function BestSeller({isSidebarOpen}) {
    return (
        <div className={isSidebarOpen === false ? 'my-16 ml-16 p-16 bg-white w-max rounded-2xl px-[83px]': 'my-12 ml-8 p-8 bg-white w-max rounded-2xl'}>
            <div className='flex items-center gap-2'>
                <h3 className='text-3xl text-blue-500'>Sách bán chạy |</h3>
                <p className='text-gray-500 text-2xl mt-1 opacity-80'>Trong tháng</p>
            </div>
            <div className='my-12'>
                <div className={isSidebarOpen ===false ? 'grid grid-cols-9 my-16' : 'grid grid-cols-8 my-16'}>
                    <div className={isSidebarOpen === false ? 'col-span-2 mr-6':'col-span-1 mr-6'}>Hình ảnh</div>
                    <div className='col-span-4'>Tên Sách</div>
                    <div className='col-span-1'>Giá (vnđ)</div>
                    <div className='col-span-1'>Đã bán</div>
                    <div className='col-span-1'>Tổng (vnđ)</div>
                </div>
                {BestSellerData.map((element) => (
                    <div className={isSidebarOpen ===false ? 'grid grid-cols-9 mb-12' : 'grid grid-cols-8 mb-12'} key={element.id}>
                        <div className={isSidebarOpen === false ? 'col-span-2 mr-6 w-[80px] h-[80px] border-[2px] border-[dodgerblue]':'col-span-1 mr-6 w-[80px] h-[80px] border-[2px] border-[dodgerblue]'}>
                            <img src={element.cover} className='h-full w-full'  alt='cover-book' />
                        </div>
                        <div className='col-span-4 mt-10'>{element.titile}</div>
                        <div className='col-span-1 mt-10'>{(element.price.toLocaleString())}</div>
                        <div className='col-span-1 mt-10'>{element.sold}</div>
                        <div className='col-span-1 mt-10'>{(element.revenue).toLocaleString()}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
