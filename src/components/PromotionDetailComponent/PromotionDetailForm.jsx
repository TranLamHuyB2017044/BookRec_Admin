import React from 'react'
import { Link } from 'react-router-dom'



export default function PromotionDetailForm() {

    
    return (
        <div className='mb-[60px]'>
            <div className='flex justify-between flex-row-reverse gap-2 mt-16 ml-12 items-center'>
                <Link to='/promotion'
                    className='mr-20 active:translate-y-1 hover:bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 rounded-md 
                border border-white bg-[dodgerblue] text-white flex items-center w-[120px] gap-2 justify-center'
                >Trở về</Link>
            </div>

            <section className='grid grid-cols-5 border-[1px] bg-white my-5 w-[95%] mx-auto p-10 rounded-xl '>
                <div className='col-span-1'>
                    <h3 className='text-[#84a3be] my-6'>Promotion_id</h3>
                    <p className='mt-5'>á</p>
                </div>
                <div className='col-span-1'>
                    <h3 className='text-[#84a3be] my-6'>Tên khuyến mãi</h3>
                    <p className='mt-5'>a</p>
                </div>
                <div className='col-span-1'>
                    <h3 className='text-[#84a3be] my-6'>Phương thức giao hàng</h3>
                    <p className='mt-5'>s</p>
                </div>
                <div className='col-span-2'>
                    <div className='flex justify-between items-center border-b my-6'>
                        <p className='text-[#84a3be]'>Tạm tính</p>
                        <p>ss vnđ</p>
                    </div>
                    <div className='flex justify-between items-center border-b my-6'>
                        <p className='text-[#84a3be]'>sssss</p>
                        <p>svnđ</p>
                    </div>
                    <div className='flex justify-between items-center border-b my-6'>
                        <p className='text-[#84a3be]'>Giảm giá</p>
                        <p>-s vnđ</p>
                    </div>
                    <div className='flex justify-between items-center border-b my-6'>
                        <p className=''>Tổng cộng</p>
                        <p className='text-purple-500'>s vnđ</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
