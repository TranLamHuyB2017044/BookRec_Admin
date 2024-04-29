import React from 'react'
import {NewsData} from '../../data'
export default function News(isSidebarOpen) {

    return (
        <div className={isSidebarOpen === true ? 'h-fit w-[350px] mt-16 bg-white p-6 rounded-3xl' : 'h-fit w-[450px] mt-16 bg-white p-6 rounded-3xl'}>
            <div className='flex items-center gap-2'>
                <h3 className='text-3xl text-blue-500'>Tin tức và cập nhật |</h3>
                <p className='text-gray-500 text-2xl mt-1 opacity-80'>Hôm nay</p>
            </div>
            <div>
                {NewsData.map(item => (
                    <div key={item.id} className='flex gap-6 items-center mt-8 cursor-pointer'>
                        <div className='w-[150px] h-[80px]'>
                            <img className='w-full h-full rounded-2xl' src={item.image} alt="news-cover" />
                        </div>
                        <div>
                            <h2 className='text-blue-500 mb-3'>{item.titile}</h2>
                            <p className='text-xl'>{item.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
